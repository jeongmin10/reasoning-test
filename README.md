# 한국추론능력검사 (Korean Reasoning Ability Test) — 온라인 버전

(사)중앙임상심리연구소 연구실 공통 형식(예시 지능검사 v1.0.0)을 따라 만든 한국추론능력검사 온라인 실시 프로그램입니다.

## 구성

| 위치 | 내용 |
|---|---|
| `index.html` | 셸: 소검사 선택(핵심/보충)·참가자 정보(오른쪽 위 언어 선택) → 소검사 순차 실행 → 결과 저장. `source/` 로 만든 단일 파일 |
| `ko/<검사>/` | 소검사 13개. `index.html`(공통 틀) + `data.js`(지시문·문항·정답·제한시간·누를 영역) + `images/`(자극책자 그림) |
| `assets/reasoning/` | 소검사 공통 엔진(`engine.js`: 화면 흐름·채점·CSV)과 스타일(`engine.css`) |
| `assets/flow.js` | 소검사 → 셸 결과 전달, 화면 전환 감지(예시와 동일) |
| `apps_script/Code.gs` | Google 스프레드시트 저장 스크립트 (`docs/GOOGLE_SHEETS_SETUP.md`) |
| `json_to_excel.html` | 결과 JSON → 엑셀 변환기 |
| `vi/` | 베트남어 버전 자리 (현재 비어 있음, `vi/README.txt`) |
| `source/` | 셸·변환기 원본, 빌드 스크립트, 테스트, 문서 |
| `examples/` | 가상 예시 JSON·엑셀 |

## 소검사와 실시 순서 (개발시트 '추론능력검사 요약서' 하단 '소검사 배열 순서')

| 순서 | 폴더 | 코드 | 소검사 | 구분 | 문항(하/중/상/최상) | 제한시간(초) |
|---|---|---|---|---|---|---|
| 1 | picture_concepts | PC | 공통그림찾기 | 핵심 | 7/7/6 | 20/30/50 |
| 2 | problem_solving | PS | 문제해결 | 핵심 | 6/7/7 | 20/30/50 |
| 3 | raven | RPM | 레이븐 추론 | 핵심 | 10/5/5 | 20/30/50 |
| 4 | verbal_cue | VCI | 언어 단서 결합 추론 과제 | 핵심 | 6/6/8 | 20/30/50 |
| 5 | pattern | PT | 패턴 검사_반복/성장 | 핵심 | 10/0/10 | 20/–/50 |
| 6 | analogy | VA | A:B = C:D (단어유추) | 핵심 | 7/7/6 | 20/30/50 |
| 7 | rotation | ROT | 3차원 회전 | 핵심 | 8/8/4 | 20/30/50 |
| 8 | picture_arrangement | PA | 차례맞추기 | 핵심 | 8/8/4 | 20/30/50 |
| 9 | dls | DLS | 더비셔 언어 체계 검사 | 보충(만 2~5세) | 10/0/10 | 20/–/50 |
| 10 | verbal_reasoning | VR | 언어적 추론 | 보충(만 6~11세) | 8/0/12 | 20/–/50 |
| 11 | number_series | NS | 숫자연속추론 | 보충 | 10/0/10 | 20/–/50 |
| 12 | predictive | PI | 예측추론 과제 | 보충 | 10/0/10 | 20/–/50 (0/1/2점) |
| 13 | transitivity | PTT | 물리적 길이 전이 과제 | 보충 | 4/6/6/4 | 20/30/50/50 |

각 소검사: 타이틀(지시문 + 시작하기) → 예제 1·해설 → 예제 2·해설 → [설명 다시 보기 / 검사하기] → 안내 전환 화면 → 본 문항 20개.
제한시간은 문항별 **최대** 시간입니다. 다 풀면 '다음'으로 바로 넘어가고, 시간이 지나면 자동으로 넘어갑니다(남은 5초부터 카운트다운).
중지 규칙: 본 문항 연속 3문항 0점(시간 초과·무응답 포함)이면 그 소검사 종료. 예제(연습)는 제한시간 없음·저장하지 않음.
소검사 사이에는 "○○ 검사를 마쳤습니다 / 다음 검사: ○○ / 다음 검사 시작" 화면이 나옵니다.

## 배포 (GitHub Pages)

1. 이 폴더 전체를 저장소 루트에 올립니다(`.nojekyll` 포함, 파일이 많으므로 GitHub Desktop 또는 `git push` 권장). Settings → Pages → Branch: main / root.
2. 접속 주소: `https://<계정>.github.io/<저장소>/` — 이 링크만 있으면 검사 실시와 결과 저장이 됩니다.
3. 결과 저장 연결: `docs/GOOGLE_SHEETS_SETUP.md`

## 로컬 확인·테스트·빌드 (Node 18 이상, 설치할 패키지 없음)

```
node source/serve.cjs          # http://127.0.0.1:4173
node --test source/tests/*.test.cjs
node source/build-single.cjs && node source/build-converter.cjs
node source/make-example.cjs
```

## 문항·문구 수정

- 지시문·해설·선지·정답·제한시간: `ko/<검사>/data.js` (주석 참고). 화면 버튼 문구: 같은 파일 맨 아래 `window.TASK.ui`.
- 셸 문구: `source/i18n.js`, 소검사 목록·설명·저장 주소: `source/config.js` (수정 후 `node source/build-single.cjs`).
