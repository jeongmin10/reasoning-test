# 소검사 페이지 ↔ 셸 약속 (CSV_FORMAT)

소검사 화면(`ko/<검사>/index.html`)은 끝날 때 `assets/reasoning/engine.js` 의 `buildFilteredCSVString()` 이 만든 문항별 CSV 를 `assets/flow.js` 를 통해 셸로 보냅니다(예시 지능검사와 같은 방식).

```js
window.parent.postMessage({ vit: true, type: "done", testId, lang, csv }, "*");
```

## CSV 열 (13개 소검사 공통, 본 문항 20행)

`code_name, language, item_index, difficulty, time_limit_sec, correct_answer, response, correct, omission, false_alarm, score, rt, decision_time, total_rt, change_count, change_count_correct, change_count_false_alarm, response_history, reset_count, administered, valid_trial, interruption_count`

응답·정답 표기
- 보기 1개 선택: 보기 번호(`3`) — 길이 전이는 사물 기호(`A`~`E`, 이름은 `ko/transitivity/data.js` 의 `names`)
- 공통그림찾기: 줄마다 고른 칸 번호를 `-` 로 연결(`2-1-3` = 1줄 2번째, 2줄 1번째, 3줄 3번째)
- 차례맞추기: 누른 그림 번호 순서(`3-1-2`)
- 길이 전이 17·18: `가장 짧은 것,가장 긴 것`(`A,E`)
- `response_history`: 선택 순서를 `>` 로 연결 (공통그림찾기는 `줄-칸`, 차례맞추기 초기화는 `reset`, 17·18은 `칸:사물`)
