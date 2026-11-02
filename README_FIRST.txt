한국추론능력검사 온라인 v1.0.0 — (사)중앙임상심리연구소 연구실 공통 형식 (예시: 지능검사 v1.0.0)

이 폴더 전체가 GitHub Pages 에 올리는 저장소 내용입니다.

1. 시작: index.html → 표지 → 언어 선택(한국어 / Tiếng Việt: 현재 "준비 중") → 소검사 선택 · 참가자 정보 → 검사 시작
2. 소검사 13개: 핵심 8개(처음부터 선택됨) + 보충 5개(검사자가 눌러서 선택). 선택한 소검사만, 개발시트 '소검사 배열 순서'대로 진행
   소검사 화면은 ko/<검사>/ (index.html + data.js + images/), 공통 엔진은 assets/reasoning/
3. 저장: 검사가 끝나면 결과가 Google 스프레드시트로 자동 전송 → docs/GOOGLE_SHEETS_SETUP.md (웹앱 주소를 source/config.js 에 넣어야 동작)
   DataPipe(OSF)도 쓸 수 있도록 남겨 두었습니다(config.js 의 dataPipeExperimentId).
4. 엑셀: json_to_excel.html 에 결과 JSON 을 넣으면 sessions · trials 시트 엑셀이 만들어집니다.
5. 확인이 필요한 사항(개발시트와 자극책자가 다른 곳 등): docs/CHECK_BEFORE_USE.md  ← 꼭 읽어 주세요
6. 문항·정답·지시문 수정: ko/<검사>/data.js (또는 tools 의 생성 스크립트) / 측정치 정의: source/METRICS.md
7. 베트남어 버전 추가 방법: vi/README.txt
