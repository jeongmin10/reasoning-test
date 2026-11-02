# 데이터 사전 (DATA_DICTIONARY)

한국추론능력검사가 저장하는 **결과 JSON 1개**의 구조와 항목입니다. 파일 이름: `<코드>_<시작시각>_<세션8자>_results.json`.

```
{
  "result":   { "<검사일>": { "<검사 코드>": [ { 한글 항목… } ] } },   ← 사람이 읽는 결과 (검사마다 기록 1개)
  "analysis": { schema_version "2.0", rt_definitions, session, summary, summary_details, trials }   ← 분석·엑셀 변환용
}
```

## 1. result (한글 항목)

검사 코드: `PC` 공통그림찾기 · `PS` 문제해결 · `RPM` 레이븐 추론 · `VCI` 언어 단서 결합 추론 과제 · `PT` 패턴 검사_반복/성장 · `VA` A:B = C:D(단어유추) · `ROT` 3차원 회전 · `PA` 차례맞추기 · `DLS` 더비셔 언어 체계 검사 · `VR` 언어적 추론 · `NS` 숫자연속추론 · `PI` 예측추론 과제 · `PTT` 물리적 길이 전이 과제.
선택하지 않은 검사는 나타나지 않습니다.

### 검사 기록의 공통 항목

| 항목 | 설명 |
|---|---|
| 참가자 번호 / 이름 / 생년월일 | 입력값 (이름은 비워도 됨) |
| 만 나이 / 총 월령 / 생후 일수 | 검사일(한국 시간) 기준으로 자동 계산 |
| 검사 버전 / 검사 언어 / 세션 아이디 | 앱 버전(`config.js`), `ko`/`vi`, 세션 고유 12자리 |
| 검사명 / 검사일 / 세션 시작·종료 시간 / 표시 시간대 | 한국 시간(Asia/Seoul) |
| 검사 완료 여부 | 해당 검사를 끝까지 마쳤으면 true, 중단했으면 false |
| 총점 · 정반응 수 · 실패 횟수 · 누락오류 수 · 오경보오류 수 · 본시행 수 · 유효/제외 시행 수 | METRICS.md |
| 요약 측정치 → 전체 | 정확도, 평균 첫 반응시간·결정시간·총 반응시간, 정반응/오경보 시 응답 변경 횟수 합계 |
| 문항별 상세 결과 | 실시한 문항마다 1줄 (아래) |

### 문항별 상세 결과 (13개 소검사 공통)

| CSV 열 | 결과 JSON 항목 |
|---|---|
| `difficulty` | 난이도 |
| `time_limit_sec` | 제한시간(초) |
| `response` | 문항 응답 |
| `correct_answer` | 정답 |
| `correct` | 정답 여부 |
| `omission` | 누락오류 |
| `false_alarm` | 오경보오류 |
| `valid_trial` | 분석 포함 여부 |
| `interruption_count` | 화면 전환 횟수 |
| `score` | 문항 점수 |
| `rt` / `decision_time` / `total_rt` | 첫 반응시간 / 결정시간 / 총 반응시간 |
| `change_count` | 응답 변경 횟수 |
| `change_count_correct` | 정반응 시 응답 변경 횟수 |
| `change_count_false_alarm` | 오경보오류 시 응답 변경 횟수 |
| `response_history` | 응답 이력 |
| `reset_count` | 다시 하기 횟수 (차례맞추기만) |

## 2. analysis

| 항목 | 설명 |
|---|---|
| `schema_version` | `"2.0"` (기준 검사와 같은 구조 버전) |
| `rt_definitions` | 시간 항목의 정의(원점·단위) |
| `session` | `participant_id`, `session_id`, `test_date`, `age_years/months/days`, `test_timezone`, `language`, `version`, `session_complete`, `participant_name`, `birth_date`, `started_at`, `completed_at`, `selected_tasks`, `data_role` |
| `summary` | 검사별 1줄(`summary_scope: task`, `condition: overall`, `task_complete`) — 요약 측정치 영문 키는 아래 표 |
| `summary_details` | 이 검사에서는 사용하지 않음(빈 배열). 구조 호환용 |
| `trials` | 실시한 문항마다 1줄, 열 구성은 아래 3절 |

요약 측정치 영문 키 ↔ 한글 이름:

| 영문 키 | 한글 이름 |
|---|---|
| `n_trials` | 본시행 수 |
| `n_items_total` | 전체 문항 수 |
| `n_correct` | 정반응 수 |
| `n_failures` | 실패 횟수 |
| `n_omissions` | 누락오류 수 |
| `n_false_alarms` | 오경보오류 수 |
| `total_score` | 총점 |
| `accuracy` | 정확도 |
| `rt_n` | 반응시간 수 |
| `rt_mean` | 평균 첫 반응시간 |
| `decision_time_mean` | 평균 결정시간 |
| `total_rt_mean` | 평균 총 반응시간 |
| `change_count_correct_sum` | 정반응 시 응답 변경 횟수 합계 |
| `change_count_false_alarm_sum` | 오경보오류 시 응답 변경 횟수 합계 |

## 3. 엑셀 (json_to_excel.html) · 스프레드시트

- **sessions** (참가자·세션당 1행): `participant_id, session_id, test_date, age_years, language, version` (스프레드시트에는 이름·생년월일·시작/종료 시각·실시 소검사가 더 들어감)
- **trials** (실시한 문항당 1행, 22열): `participant_id, session_id,` 공통 11열(`task_name, item_index, response, correct_answer, correct, omission, false_alarm, score, rt, decision_time, total_rt`) + 추론검사 9열(`difficulty, time_limit_sec, change_count, change_count_correct, change_count_false_alarm, response_history, reset_count, valid_trial, interruption_count`). `task_name` 은 폴더 이름.
- **summary** (스프레드시트만, 소검사당 1행): 요약 측정치 영문 키 전체

## 4. 복구용 전체 기록 JSON (`_raw.json`)

세션 정보 + 검사별 원본 CSV(`task_data.<폴더>.csv`) + 화면 전환·창 크기 변경 기록(`interruptions`) + 전송 상태. 결과 JSON 이 만들어지지 않았을 때 이 파일에서 다시 만들 수 있습니다.
