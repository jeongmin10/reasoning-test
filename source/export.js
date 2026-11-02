/* 내보내기 — 결과 JSON(저장·다운로드), 전체 기록 JSON(복구용), 엑셀 */
(function (root) {
  'use strict';
  const node = typeof module !== 'undefined' && module.exports;
  const A = node ? require('./analysis.js') : root.BatteryAnalysis, R = node ? require('./results.js') : root.BatteryResults,
    W = node ? require('./workbook.js') : root.BatteryWorkbook, D = node ? require('./data-tables.js') : root.BatteryDataTables;
  function cleanResult(d) { return { ...R.output(d), analysis: A.packet(d) }; }
  function fileNames(d) { const base = (d.filename || 'recovered').replace(/\.(csv|xlsx|json)$/i, ''); return { results: base + '_results.json', workbook: base + '_results.xlsx', raw: base + '_raw.json' }; }
  // 스프레드시트용 행: sessions(세션 1행) · summary(소검사별 1행) · trials(문항별) — 엑셀 변환기와 같은 열
  function sheetRows(d) {
    const p = A.packet(d), tables = D.sheets([p]), s = tables[0].rows[0] || {};
    const sessCols = [...tables[0].columns, 'participant_name', 'birth_date', 'started_at', 'completed_at', 'session_complete', 'selected_tasks'];
    const sessRow = { ...s, participant_name: p.session.participant_name, birth_date: p.session.birth_date, started_at: p.session.started_at,
      completed_at: p.session.completed_at, session_complete: p.session.session_complete, selected_tasks: p.session.selected_tasks.join(',') };
    const sumCols = ['participant_id', 'session_id', 'task_name', 'task_complete', ...A.summaryKeys];
    const sumRows = p.summary.map(x => ({ ...x, participant_id: s.participant_id, session_id: s.session_id }));
    const pickRow = (cols, r) => cols.map(c => (r[c] === undefined ? null : r[c]));
    return {
      sessions: { columns: sessCols, rows: [pickRow(sessCols, sessRow)] },
      summary: { columns: sumCols, rows: sumRows.map(r => pickRow(sumCols, r)) },
      trials: { columns: tables[1].columns, rows: tables[1].rows.map(r => pickRow(tables[1].columns, r)) },
    };
  }
  function files(d) { return [{ key: 'results', filename: fileNames(d).results, encoding: 'text', data: JSON.stringify(cleanResult(d), null, 2), sheets: sheetRows(d) }]; }
  function rawSession(d) { return { ...d, csv_session_id: A.sessionId(d) }; }
  function workbookBytes(d) { return W.workbook(D.sheets([A.packet(d)])); }
  const api = { cleanResult, fileNames, files, sheetRows, rawSession, workbookBytes };
  if (node) module.exports = api; else root.BatteryExport = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
