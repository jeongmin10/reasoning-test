자극책자(PDF)·개발시트(엑셀)에서 소검사 데이터(ko/<검사>/data.js, images/)를 만든 스크립트입니다(Python 3, PyMuPDF·OpenCV·Pillow·openpyxl).
순서: parse.py(엑셀 → excel_items.json) → extract.py(PDF 쪽 그림 → 자르기·보기 영역 검출) → ptt2.py(길이 전이 사물 영역·이름) → build_tasks.py(ko/ 생성)
작업 폴더 기준 경로(dev.xlsx, core.pdf, supp.pdf, ab.pdf, hi/)를 쓰므로 그대로 실행하려면 같은 배치가 필요합니다.
지시문·해설 문구만 고칠 때는 이 스크립트 없이 ko/<검사>/data.js 를 직접 고치면 됩니다.
