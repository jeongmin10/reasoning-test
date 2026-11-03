/**
 * 한국추론능력검사 — 결과 저장용 Google Apps Script (스프레드시트에 붙여 넣어 웹 앱으로 배포)
 *
 * 받는 것: 검사 화면(index.html)이 검사 종료 시 보내는 결과 1건
 *   { filename(중복 확인용 고유 이름), drive_name(참가자아이디_이름_실시날짜.json), sheets: { sessions, summary, trials }, result_json }
 * 하는 일:
 *   1) 스프레드시트의 sessions · summary · trials 시트에 행 추가 (시트가 없으면 머리글과 함께 자동 생성)
 *   2) 결과 JSON 원본을 '한국추론능력검사_결과JSON' 폴더에 '참가자아이디_이름_실시날짜.json' 으로 저장
 *      (같은 참가자가 같은 날 다시 검사하면 '_2', '_3' … 을 붙임)
 *   3) uploads 시트에 수신 기록. 같은 파일 이름이 다시 오면 중복 저장하지 않음
 * 설정 방법: docs/GOOGLE_SHEETS_SETUP.md
 */
const SPREADSHEET_ID = '11AmE0bdnTOnXEKPwtAECyVzJlJINaZWqphYSG0bTqq8';   // 공통 계정으로 옮길 때 새 스프레드시트 ID 로 교체
const JSON_FOLDER_NAME = '한국추론능력검사_결과JSON';
// 날짜·숫자로 자동 변환되면 안 되는 열 (예: 응답 "2-1" 이 2월 1일로 바뀌는 것 방지)
const TEXT_COLUMNS = ['participant_id', 'session_id', 'response', 'correct_answer', 'response_history', 'test_date', 'birth_date',
  'difficulty', 'task_name', 'selected_tasks', 'participant_name', 'version', 'language', 'started_at', 'completed_at'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const body = JSON.parse(e.postData.contents);
    if (!body || !body.filename || !body.sheets) return json_({ ok: false, error: 'BAD_REQUEST' });
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const log = sheet_(ss, 'uploads', ['received_at', 'filename', 'status', 'json_file', 'n_trials']);
    const last = log.getLastRow();
    const names = last > 1 ? log.getRange(2, 2, last - 1, 1).getValues().map(r => r[0]) : [];
    if (names.indexOf(body.filename) >= 0) return json_({ ok: true, status: 'duplicate' });
    ['sessions', 'summary', 'trials'].forEach(name => {
      const t = body.sheets[name];
      if (!t || !t.rows || !t.rows.length) return;
      const sh = sheet_(ss, name, t.columns);
      const start = sh.getLastRow() + 1;
      t.columns.forEach((c, i) => { if (TEXT_COLUMNS.indexOf(c) >= 0) sh.getRange(start, i + 1, t.rows.length, 1).setNumberFormat('@'); });
      sh.getRange(start, 1, t.rows.length, t.columns.length)
        .setValues(t.rows.map(r => r.map(v => (v === null || v === undefined ? '' : (typeof v === 'object' ? JSON.stringify(v) : v)))));
    });
    let fileUrl = '';
    try { const f = folder_(ss); fileUrl = f.createFile(uniqueName_(f, body.drive_name || body.filename), body.result_json || '', 'application/json').getUrl(); }
    catch (err) { fileUrl = 'JSON 저장 실패: ' + err; }
    log.appendRow([new Date(), body.filename, 'saved', fileUrl, (body.sheets.trials && body.sheets.trials.rows.length) || 0]);
    return json_({ ok: true, status: 'saved' });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}
// 브라우저에서 웹 앱 주소를 열었을 때 연결 확인용
function doGet() { return json_({ ok: true, service: '한국추론능력검사 결과 저장', spreadsheet: SPREADSHEET_ID }); }

function sheet_(ss, name, columns) {
  let sh = ss.getSheetByName(name);
  if (!sh) sh = ss.insertSheet(name);
  if (sh.getLastRow() === 0) { sh.appendRow(columns); sh.setFrozenRows(1); sh.getRange(1, 1, 1, columns.length).setFontWeight('bold'); }
  return sh;
}
// 폴더 안에 같은 이름이 있으면 '이름_2.json', '이름_3.json' … 으로
function uniqueName_(folder, name) {
  const base = String(name).replace(/\.json$/i, '');
  let candidate = base + '.json', n = 2;
  while (folder.getFilesByName(candidate).hasNext()) candidate = base + '_' + (n++) + '.json';
  return candidate;
}
function folder_(ss) {
  const parents = DriveApp.getFileById(ss.getId()).getParents();
  const parent = parents.hasNext() ? parents.next() : DriveApp.getRootFolder();
  const it = parent.getFoldersByName(JSON_FOLDER_NAME);
  return it.hasNext() ? it.next() : parent.createFolder(JSON_FOLDER_NAME);
}
function json_(obj) { return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON); }
