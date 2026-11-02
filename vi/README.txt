베트남어(vi) 버전 소검사 폴더 자리입니다.
베트남어 버전을 만들 때 ko/<검사>/ 폴더를 그대로 복사해 vi/<검사>/ 로 두고,
data.js 의 문구(지시문·해설·선지·window.TASK.ui)와 "lang": "vi" 를 바꾼 뒤,
글자가 들어간 그림(images/)을 베트남어 그림으로 바꾸면 됩니다.
마지막으로 source/config.js 의 languages.vi 를 true 로, 각 검사의 name/desc/meta 의 vi 를 채우고
source/i18n.js 의 vi 문구를 채운 다음 node source/build-single.cjs 로 index.html 을 다시 만드세요.
