const test = require('node:test'), assert = require('node:assert'), E = require('../export.js'), C = require('../convert.js'), D = require('../data-tables.js'), A = require('../analysis.js'), { session } = require('./fixtures.cjs');
test('결과 JSON 구조: result > 검사일 > 코드 > [기록 1개] + analysis', () => {
  const out = E.cleanResult(session()), date = Object.keys(out.result)[0];
  assert.strictEqual(date, '2026-11-02'); assert.deepStrictEqual(Object.keys(out.result[date]), ['PC', 'PA', 'PI']);
  for (const arr of Object.values(out.result[date])) assert.strictEqual(arr.length, 1);
  const m = out.result[date].PC[0];
  assert.strictEqual(m['검사명'], '공통그림찾기'); assert.strictEqual(m['만 나이'], 8); assert.strictEqual(m['정반응 수'], 1); assert.strictEqual(m['본시행 수'], 3);
  assert.strictEqual(out.analysis.schema_version, '2.0'); assert.strictEqual(out.analysis.session.participant_id, 'EXAMPLE_P001');
});
test('저장 파일은 results JSON 1개', () => {
  const f = E.files(session()); assert.strictEqual(f.length, 1); assert.match(f[0].filename, /_results\.json$/); JSON.parse(f[0].data);
});
test('엑셀: sessions 시트 6열, trials 시트 22열, 실시한 문항만', () => {
  const r = C.convert([JSON.parse(E.files(session())[0].data)]);
  assert.deepStrictEqual(r.sheets.map(s => s.name), ['sessions', 'trials']);
  assert.strictEqual(r.sheets[0].columns.length, 6); assert.strictEqual(r.sheets[1].columns.length, 22);
  assert.strictEqual(r.trialCount, 3 + 2 + 3); assert.ok(r.bytes.length > 1000);
  assert.strictEqual(r.sheets[0].rows[0].age_years, 8);
});
test('중복 파일은 한 번만, 내용이 다르면 오류', () => {
  const a = JSON.parse(E.files(session())[0].data);
  assert.strictEqual(C.convert([a, JSON.parse(JSON.stringify(a))]).duplicates, 1);
  const b = JSON.parse(JSON.stringify(a)); b.analysis.trials[0].rt = 1;
  assert.throws(() => C.convert([a, b]), /값이 다른/);
});
test('잘못된 파일은 거절', () => {
  assert.throws(() => C.convert([{}]), /result/);
  const a = JSON.parse(E.files(session())[0].data); delete a.analysis;
  assert.throws(() => C.convert([a]), /analysis/);
  const b = JSON.parse(E.files(session())[0].data); b.analysis.trials[0].rt = 'x';
  assert.throws(() => C.convert([b]), /숫자 자료형/);
  const c = JSON.parse(E.files(session())[0].data); c.analysis.trials.pop();
  assert.throws(() => C.convert([c]), /본시행 수/);
});
test('중단된 검사는 완료 여부 false 로 표시', () => {
  const s = session(['predictive'], { session_complete: false }); s.task_data.predictive.completed = false;
  const out = E.cleanResult(s), rec = out.result['2026-11-02'].PI[0];
  assert.strictEqual(rec['검사 완료 여부'], false); assert.strictEqual(out.analysis.summary[0].task_complete, false);
  assert.ok(C.convert([JSON.parse(JSON.stringify(out))]).warnings.some(w => /미완료/.test(w)));
});
test('선택하지 않은 검사는 결과에 없음', () => {
  const out = E.cleanResult(session(['predictive'])); assert.deepStrictEqual(Object.keys(out.result['2026-11-02']), ['PI']);
  assert.strictEqual(A.packet(session(['predictive'])).trials.length, 3);
});
test('분석 열 목록 22열(참가자·세션 + 공통 11 + 추론검사 9)', () => { assert.strictEqual(D.trialColumns.length, 22); });
test('스프레드시트 행: sessions 1행 · summary 소검사별 · trials 문항별(열 수 일치)', () => {
  const f = E.files(session())[0].sheets;
  assert.strictEqual(f.sessions.rows.length, 1); assert.strictEqual(f.summary.rows.length, 3); assert.strictEqual(f.trials.rows.length, 8);
  for (const t of Object.values(f)) for (const r of t.rows) assert.strictEqual(r.length, t.columns.length);
});

