// 테스트용 가상 자료 — 실제 참가자 자료가 아닙니다. 열 구성은 assets/reasoning/engine.js 의 CSV_COLUMNS 와 같습니다.
const H = 'code_name,language,item_index,difficulty,time_limit_sec,correct_answer,response,correct,omission,false_alarm,score,rt,decision_time,total_rt,change_count,change_count_correct,change_count_false_alarm,response_history,reset_count,administered,valid_trial,interruption_count\n';
const csv = {
  // 공통그림찾기: 1번 정답(줄 1 응답 1회 변경), 2번 오답, 3번 무응답(누락), 4번 실시 안 함(중지 규칙)
  picture_concepts: H +
    'T1,ko,1,하,20,2-1,2-1,true,false,false,1,3000,1000,4000,1,1,,1-1>1-2>2-1,,true,true,0\n' +
    'T1,ko,2,하,20,1-1,1-2,false,false,true,0,2000,500,2500,0,,0,1-1>2-2,,true,true,0\n' +
    'T1,ko,3,하,20,1-2,,false,true,false,0,,,,,,,,,true,true,0\n' +
    'T1,ko,4,하,20,2-2,,,,,,,,,,,,,,false,,\n',
  // 예측추론: 선지별 2/1/0점 — 1점 선지는 오경보, 총점은 점수 합
  predictive: H +
    'T1,ko,1,하,20,1,1,true,false,false,2,4000,800,4800,0,0,,1,,true,true,0\n' +
    'T1,ko,2,하,20,3,4,false,false,true,1,5000,700,5700,1,,1,2>4,,true,true,0\n' +
    'T1,ko,3,하,20,2,1,false,false,true,0,3000,300,3300,0,,0,1,,true,true,0\n',
  // 차례맞추기: 다시 하기 1회 후 정답
  picture_arrangement: H +
    'T1,ko,1,하,20,3-1-2,3-1-2,true,false,false,1,2500,3000,5500,1,1,,1>reset>3>1>2,1,true,true,0\n' +
    'T1,ko,2,하,20,1-3-2,1-2-3,false,false,true,0,2000,2500,4500,0,,0,1>2>3,0,true,false,1\n',
};
function session(selected = ['picture_concepts', 'picture_arrangement', 'predictive'], over = {}) {
  const task_data = Object.fromEntries(selected.map(id => [id, { csv: csv[id], completed: true, started_at: '2026-11-02T01:00:00Z', completed_at: '2026-11-02T01:05:00Z' }]));
  return { session_id: 'a1b2c3d4-0000-4000-8000-123456789abc', participant_id: 'EXAMPLE_P001', participant_name: '예시 참가자', birth_date: '2018-02-15',
    language: 'ko', version: '1.0.0-test', started_at: '2026-11-02T01:00:00Z', completed_at: '2026-11-02T01:30:00Z', session_complete: true,
    filename: 'EXAMPLE_P001_x', selected, task_data, interruptions: [], ...over };
}
module.exports = { csv, session };
