const test = require('node:test'), assert = require('node:assert'), T = require('../tasks.js'), { csv } = require('./fixtures.cjs');
test('CSV 읽기: 따옴표 안 쉼표·BOM·CRLF', () => {
  assert.deepStrictEqual(T.parseCSV('﻿a,b\r\n"x, y",2\r\n'), [{ a: 'x, y', b: '2' }]);
});
test('값 형 변환: 응답·정답은 글자로 유지("2-1" 등)', () => {
  assert.strictEqual(T.typed('correct', 'true'), true); assert.strictEqual(T.typed('rt', '120'), 120);
  assert.strictEqual(T.typed('response', '3'), '3'); assert.strictEqual(T.typed('correct_answer', '2-1'), '2-1'); assert.strictEqual(T.typed('rt', ''), null);
});
test('실시하지 않은 문항(administered=false)은 제외, 전체 문항 수는 CSV 행 수', () => {
  assert.strictEqual(T.items('picture_concepts', csv.picture_concepts).length, 3);
  assert.strictEqual(T.totalItems('picture_concepts', csv.picture_concepts), 4);
});
test('요약: 정반응·누락·오경보·실패·총점·응답 변경 합계', () => {
  const l = T.items('picture_concepts', csv.picture_concepts), s = T.summary('picture_concepts', l, 4);
  assert.strictEqual(s.n_correct, 1); assert.strictEqual(s.n_omissions, 1); assert.strictEqual(s.n_false_alarms, 1);
  assert.strictEqual(s.n_failures, 2); assert.strictEqual(s.total_score, 1); assert.strictEqual(s.rt_mean, 2500);
  assert.strictEqual(s.change_count_correct_sum, 1); assert.strictEqual(s.change_count_false_alarm_sum, 0);
});
test('예측추론: 1점 선지는 오경보, 총점은 문항 점수 합(2+1+0)', () => {
  const s = T.summary('predictive', T.items('predictive', csv.predictive), 20);
  assert.strictEqual(s.n_correct, 1); assert.strictEqual(s.n_false_alarms, 2); assert.strictEqual(s.total_score, 3);
});
test('화면 전환 문항은 요약에서 제외', () => {
  const s = T.summary('picture_arrangement', T.items('picture_arrangement', csv.picture_arrangement), 20);
  assert.strictEqual(s.n_trials, 2); assert.strictEqual(s.n_valid, 1); assert.strictEqual(s.n_invalid, 1); assert.strictEqual(s.n_false_alarms, 0);
});
test('문항 한글 항목: 차례맞추기는 다시 하기 횟수 포함', () => {
  const r = T.koItem('picture_arrangement', T.items('picture_arrangement', csv.picture_arrangement)[0], 0);
  assert.strictEqual(r['문항 아이디'], 'PA_001'); assert.strictEqual(r['정답'], '3-1-2'); assert.strictEqual(r['다시 하기 횟수'], 1); assert.strictEqual(r['난이도'], '하');
});
test('검사 코드 ↔ 폴더 매핑 13개', () => {
  assert.deepStrictEqual(Object.keys(T.byCode).sort(), ['DLS', 'NS', 'PA', 'PC', 'PI', 'PS', 'PT', 'PTT', 'ROT', 'RPM', 'VA', 'VCI', 'VR']);
});
