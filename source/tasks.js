/* 한국추론능력검사 — 소검사별 결과 처리 — 소검사 페이지가 보낸 문항별 CSV 를 읽어
   (1) 문항별 기록, (2) 요약 측정치, (3) 결과 JSON 의 한글 항목으로 바꿉니다.
   새 소검사를 추가할 때는 아래 SPEC 에 한 항목만 추가하면 됩니다. */
(function (root) {
  'use strict';

  // ── CSV 읽기 (따옴표·줄바꿈·BOM 처리) ─────────────────────────────
  function parseCSV(text) {
    const rows = []; let row = [], cell = '', q = false;
    text = String(text || '').replace(/^﻿/, '');
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (q) {
        if (c === '"') { if (text[i + 1] === '"') { cell += '"'; i++; } else q = false; } else cell += c;
      } else if (c === '"') q = true;
      else if (c === ',') { row.push(cell); cell = ''; }
      else if (c === '\n' || c === '\r') {
        if (c === '\r' && text[i + 1] === '\n') i++;
        row.push(cell); cell = ''; if (row.some(v => v !== '')) rows.push(row); row = [];
      } else cell += c;
    }
    row.push(cell); if (row.some(v => v !== '')) rows.push(row);
    if (!rows.length) return [];
    const head = rows[0];
    return rows.slice(1).map(r => Object.fromEntries(head.map((h, i) => [h, r[i] === undefined ? '' : r[i]])));
  }

  // ── 값 형 변환: 'true'/'false' → 논리, 숫자 문자열 → 숫자, 빈칸 → null ──
  const TEXT_KEYS = new Set(['code_name', 'language', 'question', 'correct_answer', 'response', 'response_history',
    'grid', 'presentation', 'word_type', 'stimulus_id', 'difficulty']);
  function typed(key, v) {
    if (v === '' || v === undefined || v === null) return null;
    if (v === 'true' || v === 'TRUE') return true;
    if (v === 'false' || v === 'FALSE') return false;
    if (TEXT_KEYS.has(key)) return String(v);
    if (/^-?\d+(\.\d+)?$/.test(String(v))) return Number(v);
    return String(v);
  }

  // ── 소검사별 정의 ─────────────────────────────────────────────────
  // label: 결과 JSON 의 한글 이름, items: 문항별 상세 결과에 넣을 [CSV열, 한글 이름]
  const COMMON_ITEM = [
    ['response', '문항 응답'], ['correct_answer', '정답'], ['correct', '정답 여부'],
    ['omission', '누락오류'], ['false_alarm', '오경보오류'],
    ['valid_trial', '분석 포함 여부'], ['interruption_count', '화면 전환 횟수'],
  ];
  const TIME_ITEM = [['rt', '첫 반응시간'], ['decision_time', '결정시간'], ['total_rt', '총 반응시간']];
  const CHANGE_ITEM = [
    ['change_count', '응답 변경 횟수'], ['change_count_correct', '정반응 시 응답 변경 횟수'],
    ['change_count_false_alarm', '오경보오류 시 응답 변경 횟수'], ['response_history', '응답 이력'],
  ];
  // 한국추론능력검사 13개 소검사 — 모두 같은 열 구성(엔진 assets/reasoning/engine.js 의 CSV_COLUMNS)
  const ITEM_FIELDS = [['difficulty', '난이도'], ['time_limit_sec', '제한시간(초)'], ...COMMON_ITEM, ['score', '문항 점수'], ...TIME_ITEM, ...CHANGE_ITEM];
  const def = (code, label, extra = []) => ({ code, label, score: true, total: 20, items: [...ITEM_FIELDS, ...extra] });
  const SPEC = {
    picture_concepts: def('PC', '공통그림찾기'),
    problem_solving: def('PS', '문제해결'),
    raven: def('RPM', '레이븐 추론'),
    verbal_cue: def('VCI', '언어 단서 결합 추론 과제'),
    pattern: def('PT', '패턴 검사_반복/성장'),
    analogy: def('VA', 'A:B = C:D (단어유추)'),
    rotation: def('ROT', '3차원 회전'),
    picture_arrangement: def('PA', '차례맞추기', [['reset_count', '다시 하기 횟수']]),
    dls: def('DLS', '더비셔 언어 체계 검사'),
    verbal_reasoning: def('VR', '언어적 추론'),
    number_series: def('NS', '숫자연속추론'),
    predictive: def('PI', '예측추론 과제'),
    transitivity: def('PTT', '물리적 길이 전이 과제'),
  };
  const byCode = Object.fromEntries(Object.entries(SPEC).map(([id, s]) => [s.code, id]));

  // ── 문항 기록 ─────────────────────────────────────────────────────
  // 반환: 실시한 문항(administered)만, 열 이름은 CSV 와 같은 영문 키
  function items(taskId, csv) {
    const rows = parseCSV(csv).map(r => Object.fromEntries(Object.entries(r).map(([k, v]) => [k, typed(k, v)])));
    // 문항 문구에 들어 있는 줄바꿈 태그(<br>)·서식 태그는 자료에서 제거
    rows.forEach(r => { if (typeof r.question === 'string') r.question = r.question.replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(); });
    return rows.filter(r => r.administered !== false).map(r => ({ ...r, item_index: r.item_index }));
  }
  function totalItems(taskId, csv) {
    const rows = parseCSV(csv);
    return rows.length && 'administered' in rows[0] ? rows.length : (SPEC[taskId].total || rows.length);
  }

  const num = v => typeof v === 'number' && Number.isFinite(v);
  function mean(list) {
    const v = list.filter(num);
    return v.length ? v.reduce((a, b) => a + b, 0) / v.length : null;
  }
  const sum = list => list.filter(num).reduce((a, b) => a + b, 0);
  const round = (v, d = 3) => (num(v) ? Number(v.toFixed(d)) : null);

  // ── 요약 측정치 (영문 키; 한글 이름은 SUMMARY_LABELS) ───────────────
  // 화면 전환 등으로 제외(valid_trial=false)된 문항은 요약 계산에서 빼고, 개수만 n_invalid 로 남깁니다.
  function summary(taskId, all, total) {
    const spec = SPEC[taskId], list = all.filter(r => r.valid_trial !== false), n = list.length;
    const correct = list.filter(r => r.correct === true).length;
    const omission = list.filter(r => r.omission === true).length;
    const falseAlarm = list.filter(r => r.false_alarm === true).length;
    const out = {
      n_trials: all.length, n_valid: n, n_invalid: all.length - n, n_items_total: total, n_correct: correct,
      n_failures: omission + falseAlarm, n_omissions: omission, n_false_alarms: falseAlarm,
      total_score: spec.score ? sum(list.map(r => r.score)) : correct,
      accuracy: n ? round(correct / n, 6) : null,
      rt_n: list.filter(r => num(r.rt)).length,
      rt_mean: round(mean(list.map(r => r.rt))),
      decision_time_mean: round(mean(list.map(r => r.decision_time))),
      total_rt_mean: round(mean(list.map(r => r.total_rt))),
    };
    out.change_count_correct_sum = sum(list.map(r => r.change_count_correct));
    out.change_count_false_alarm_sum = sum(list.map(r => r.change_count_false_alarm));
    return out;
  }
  const SUMMARY_LABELS = {
    n_trials: '본시행 수', n_valid: '유효 시행 수', n_invalid: '제외 시행 수', n_items_total: '전체 문항 수', n_correct: '정반응 수', n_failures: '실패 횟수',
    n_omissions: '누락오류 수', n_false_alarms: '오경보오류 수', total_score: '총점', accuracy: '정확도',
    rt_n: '반응시간 수', rt_mean: '평균 첫 반응시간', decision_time_mean: '평균 결정시간', total_rt_mean: '평균 총 반응시간',
    change_count_correct_sum: '정반응 시 응답 변경 횟수 합계', change_count_false_alarm_sum: '오경보오류 시 응답 변경 횟수 합계',
  };
  function koSummary(s) {
    return Object.fromEntries(Object.entries(s).filter(([k]) => SUMMARY_LABELS[k]).map(([k, v]) => [SUMMARY_LABELS[k], v]));
  }

  // 결과 JSON 의 문항 한 줄 (한글 이름)
  function koItem(taskId, r, index) {
    const spec = SPEC[taskId];
    const out = { '문항 아이디': spec.code + '_' + String(index + 1).padStart(3, '0'), '문항 번호': r.item_index ?? index + 1 };
    for (const [key, label] of spec.items) out[label] = r[key] === undefined ? null : r[key];
    return out;
  }

  const api = { SPEC, byCode, parseCSV, typed, items, totalItems, summary, koSummary, koItem, SUMMARY_LABELS, mean, round };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.BatteryTasks = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
