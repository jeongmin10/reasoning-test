/* Bài tập suy luận bắc cầu về độ dài — tiếng Việt (tools/build_vi.py 로 생성: 번역 시트 '온라인 검사 베트남어 번역')
   n·diff·answer 등 결과에 기록되는 값은 한국어판과 동일 */
window.TASK = {
 "id": "transitivity",
 "code": "PTT",
 "lang": "vi",
 "tag": "Bài tập suy luận bắc cầu về độ dài",
 "title": "Bài tập suy luận bắc cầu về độ dài",
 "instr": [
  "Bây giờ chúng ta vừa xem tranh nhiều đồ vật vừa làm bài nhé.",
  "Hãy quan sát kỹ xem ở mỗi tranh, đồ vật nào dài hơn.",
  "Dựa vào mối quan hệ giữa các tranh, con cần phán đoán cả những đồ vật không được so sánh trực tiếp.",
  "Hãy nhìn toàn bộ bức tranh rồi nhấn vào đồ vật đúng với câu hỏi ở trong tranh."
 ],
 "practice": [
  {
   "n": "예제 1",
   "diff": "연습",
   "limit": null,
   "kind": "image",
   "img": "images/ex1.jpg",
   "ar": 1.74419,
   "options": [
    {
     "id": "A",
     "label": "cục tẩy",
     "box": [
      0.2113,
      0.4023,
      0.1146,
      0.2113
     ]
    },
    {
     "id": "B",
     "label": "bút chì",
     "box": [
      0.3911,
      0.3117,
      0.0477,
      0.3024
     ]
    },
    {
     "id": "B",
     "label": "bút chì",
     "box": [
      0.598,
      0.4069,
      0.0477,
      0.2073
     ]
    },
    {
     "id": "C",
     "label": "thước kẻ",
     "box": [
      0.7043,
      0.2245,
      0.0709,
      0.3891
     ]
    }
   ],
   "names": {
    "A": "cục tẩy",
    "B": "bút chì",
    "C": "thước kẻ"
   },
   "mode": "single",
   "answer": "C",
   "excel_item": "P1",
   "explain": [
    "Trong bài này, cần nối các quan hệ so sánh độ dài của đồ vật lại với nhau. Trước tiên, cục tẩy ngắn hơn bút chì, và bút chì ngắn hơn thước kẻ.",
    "Nối hai quan hệ này lại, thứ tự từ ngắn đến dài là cục tẩy < bút chì < thước kẻ. Vì vậy, so sánh cục tẩy và thước kẻ thì thước kẻ dài hơn."
   ],
   "prompt": "<img class=\"q-icon\" src=\"images/ex1_q1.png\" alt=\"\"> và <img class=\"q-icon\" src=\"images/ex1_q2.png\" alt=\"\">, cái nào dài hơn?"
  },
  {
   "n": "예제 2",
   "diff": "연습",
   "limit": null,
   "kind": "image",
   "img": "images/ex2.jpg",
   "ar": 1.74419,
   "options": [
    {
     "id": "A",
     "label": "xe buýt hai tầng",
     "box": [
      0.4752,
      0.041,
      0.1722,
      0.2151
     ]
    },
    {
     "id": "B",
     "label": "xe buýt trường học",
     "box": [
      0.4748,
      0.2561,
      0.2556,
      0.2248
     ]
    },
    {
     "id": "B",
     "label": "xe buýt trường học",
     "box": [
      0.4748,
      0.5612,
      0.104,
      0.2251
     ]
    },
    {
     "id": "C",
     "label": "xe khách đường dài",
     "box": [
      0.4752,
      0.7862,
      0.1825,
      0.2056
     ]
    }
   ],
   "names": {
    "A": "xe buýt hai tầng",
    "B": "xe buýt trường học",
    "C": "xe khách đường dài"
   },
   "mode": "single",
   "answer": "C",
   "excel_item": "P2",
   "explain": [
    "Trong bài này, cần nối các quan hệ so sánh độ dài của đồ vật lại với nhau.",
    "Trước tiên, xe buýt hai tầng ngắn hơn xe buýt trường học, và xe buýt trường học ngắn hơn xe khách đường dài.",
    "Nối hai quan hệ này lại, thứ tự từ ngắn đến dài là xe buýt hai tầng < xe buýt trường học < xe khách đường dài.",
    "Vì vậy, so sánh xe buýt hai tầng và xe khách đường dài thì xe khách đường dài dài hơn."
   ],
   "prompt": "<img class=\"q-icon\" src=\"images/ex2_q1.png\" alt=\"\"> và <img class=\"q-icon\" src=\"images/ex2_q2.png\" alt=\"\">, cái nào dài hơn?"
  }
 ],
 "items": [
  {
   "n": 1,
   "diff": "하",
   "limit": 20,
   "kind": "image",
   "img": "images/01.jpg",
   "ar": 1.74419,
   "options": [
    {
     "id": "A",
     "label": "cây táo",
     "box": [
      0.1023,
      0.4284,
      0.1778,
      0.2303
     ]
    },
    {
     "id": "B",
     "label": "cây bạch quả",
     "box": [
      0.2907,
      0.336,
      0.1755,
      0.3227
     ]
    },
    {
     "id": "B",
     "label": "cây bạch quả",
     "box": [
      0.5457,
      0.3885,
      0.1712,
      0.2696
     ]
    },
    {
     "id": "C",
     "label": "cây phong",
     "box": [
      0.7169,
      0.2569,
      0.1818,
      0.4012
     ]
    }
   ],
   "names": {
    "A": "cây táo",
    "B": "cây bạch quả",
    "C": "cây phong"
   },
   "mode": "single",
   "answer": "C",
   "excel_item": "1",
   "prompt": "<img class=\"q-icon\" src=\"images/01_q1.png\" alt=\"\"> và <img class=\"q-icon\" src=\"images/01_q2.png\" alt=\"\">, cây nào dài hơn?"
  },
  {
   "n": 2,
   "diff": "하",
   "limit": 20,
   "kind": "image",
   "img": "images/02.jpg",
   "ar": 1.74419,
   "options": [
    {
     "id": "A",
     "label": "kẹo mút tròn",
     "box": [
      0.1199,
      0.4069,
      0.1536,
      0.2516
     ]
    },
    {
     "id": "B",
     "label": "kẹo mút ngôi sao",
     "box": [
      0.296,
      0.2701,
      0.1613,
      0.3885
     ]
    },
    {
     "id": "C",
     "label": "kẹo mút trái tim",
     "box": [
      0.5411,
      0.3072,
      0.1536,
      0.3515
     ]
    },
    {
     "id": "B",
     "label": "kẹo mút ngôi sao",
     "box": [
      0.7132,
      0.3995,
      0.1613,
      0.2592
     ]
    }
   ],
   "names": {
    "A": "kẹo mút tròn",
    "B": "kẹo mút ngôi sao",
    "C": "kẹo mút trái tim"
   },
   "mode": "single",
   "answer": "C",
   "excel_item": "2",
   "prompt": "<img class=\"q-icon\" src=\"images/02_q1.png\" alt=\"\"> và <img class=\"q-icon\" src=\"images/02_q2.png\" alt=\"\">, cái nào dài hơn?"
  },
  {
   "n": 3,
   "diff": "하",
   "limit": 20,
   "kind": "image",
   "img": "images/03.jpg",
   "ar": 1.74419,
   "options": [
    {
     "id": "B",
     "label": "ô tô số 5",
     "box": [
      0.3944,
      0.0964,
      0.1536,
      0.1677
     ]
    },
    {
     "id": "C",
     "label": "ô tô số 12",
     "box": [
      0.3454,
      0.2641,
      0.2026,
      0.2018
     ]
    },
    {
     "id": "B",
     "label": "ô tô số 5",
     "box": [
      0.2911,
      0.571,
      0.257,
      0.1809
     ]
    },
    {
     "id": "A",
     "label": "ô tô số 8",
     "box": [
      0.3424,
      0.7519,
      0.206,
      0.1965
     ]
    }
   ],
   "names": {
    "B": "ô tô số 5",
    "C": "ô tô số 12",
    "A": "ô tô số 8"
   },
   "mode": "single",
   "answer": "C",
   "excel_item": "3",
   "prompt": "<img class=\"q-icon\" src=\"images/03_q1.png\" alt=\"\"> và <img class=\"q-icon\" src=\"images/03_q2.png\" alt=\"\">, chiếc nào dài hơn?"
  },
  {
   "n": 4,
   "diff": "하",
   "limit": 20,
   "kind": "image",
   "img": "images/04.jpg",
   "ar": 1.74419,
   "options": [
    {
     "id": "A",
     "label": "hồ dán",
     "box": [
      0.155,
      0.4404,
      0.094,
      0.2188
     ]
    },
    {
     "id": "B",
     "label": "kéo",
     "box": [
      0.2825,
      0.3678,
      0.1695,
      0.2909
     ]
    },
    {
     "id": "B",
     "label": "kéo",
     "box": [
      0.5374,
      0.5005,
      0.1695,
      0.1588
     ]
    },
    {
     "id": "C",
     "label": "quyển vở",
     "box": [
      0.7073,
      0.4549,
      0.1785,
      0.2037
     ]
    }
   ],
   "names": {
    "A": "hồ dán",
    "B": "kéo",
    "C": "quyển vở"
   },
   "mode": "single",
   "answer": "C",
   "excel_item": "4",
   "prompt": "<img class=\"q-icon\" src=\"images/04_q1.png\" alt=\"\"> và <img class=\"q-icon\" src=\"images/04_q2.png\" alt=\"\">, cái nào dài hơn?"
  },
  {
   "n": 5,
   "diff": "중",
   "limit": 30,
   "kind": "image",
   "img": "images/05.jpg",
   "ar": 1.74419,
   "options": [
    {
     "id": "A",
     "label": "cục tẩy",
     "box": [
      0.0275,
      0.4474,
      0.1146,
      0.2101
     ]
    },
    {
     "id": "B",
     "label": "bút bi",
     "box": [
      0.1454,
      0.31,
      0.055,
      0.3475
     ]
    },
    {
     "id": "B",
     "label": "bút bi",
     "box": [
      0.3083,
      0.4538,
      0.055,
      0.2037
     ]
    },
    {
     "id": "C",
     "label": "bút chì",
     "box": [
      0.406,
      0.3551,
      0.0364,
      0.3031
     ]
    },
    {
     "id": "C",
     "label": "bút chì",
     "box": [
      0.5642,
      0.2823,
      0.0364,
      0.3758
     ]
    },
    {
     "id": "D",
     "label": "bút dạ quang",
     "box": [
      0.6311,
      0.1922,
      0.0715,
      0.4658
     ]
    },
    {
     "id": "D",
     "label": "bút dạ quang",
     "box": [
      0.7841,
      0.3429,
      0.0715,
      0.3151
     ]
    },
    {
     "id": "E",
     "label": "thước kẻ",
     "box": [
      0.8722,
      0.0975,
      0.0705,
      0.5605
     ]
    }
   ],
   "names": {
    "A": "cục tẩy",
    "B": "bút bi",
    "C": "bút chì",
    "D": "bút dạ quang",
    "E": "thước kẻ"
   },
   "mode": "single",
   "answer": "C",
   "excel_item": "5",
   "prompt": "<img class=\"q-icon\" src=\"images/05_q1.png\" alt=\"\"> và <img class=\"q-icon\" src=\"images/05_q2.png\" alt=\"\">, cái nào dài hơn?"
  },
  {
   "n": 6,
   "diff": "중",
   "limit": 30,
   "kind": "image",
   "img": "images/06.jpg",
   "ar": 1.74419,
   "options": [
    {
     "id": "B",
     "label": "nĩa",
     "box": [
      0.0546,
      0.2904,
      0.057,
      0.3671
     ]
    },
    {
     "id": "C",
     "label": "đũa",
     "box": [
      0.1434,
      0.138,
      0.0497,
      0.5195
     ]
    },
    {
     "id": "D",
     "label": "cái muôi",
     "box": [
      0.2828,
      0.2408,
      0.0912,
      0.4168
     ]
    },
    {
     "id": "E",
     "label": "cái xẻng lật",
     "box": [
      0.374,
      0.0865,
      0.0952,
      0.571
     ]
    },
    {
     "id": "A",
     "label": "thìa",
     "box": [
      0.5487,
      0.3637,
      0.0656,
      0.2933
     ]
    },
    {
     "id": "B",
     "label": "nĩa",
     "box": [
      0.6401,
      0.2171,
      0.057,
      0.4404
     ]
    },
    {
     "id": "C",
     "label": "đũa",
     "box": [
      0.8063,
      0.4289,
      0.0209,
      0.2286
     ]
    },
    {
     "id": "D",
     "label": "cái muôi",
     "box": [
      0.8272,
      0.2909,
      0.1291,
      0.3671
     ]
    }
   ],
   "names": {
    "B": "nĩa",
    "C": "đũa",
    "D": "cái muôi",
    "E": "cái xẻng lật",
    "A": "thìa"
   },
   "mode": "single",
   "answer": "D",
   "excel_item": "6",
   "prompt": "<img class=\"q-icon\" src=\"images/06_q1.png\" alt=\"\"> và <img class=\"q-icon\" src=\"images/06_q2.png\" alt=\"\">, cái nào dài hơn?"
  },
  {
   "n": 7,
   "diff": "중",
   "limit": 30,
   "kind": "image",
   "img": "images/07.jpg",
   "ar": 1.74419,
   "options": [
    {
     "id": "B",
     "label": "bút chì màu",
     "box": [
      0.0685,
      0.3475,
      0.0348,
      0.3106
     ]
    },
    {
     "id": "C",
     "label": "cọ vẽ",
     "box": [
      0.1434,
      0.1929,
      0.0387,
      0.4653
     ]
    },
    {
     "id": "D",
     "label": "bảng pha màu",
     "box": [
      0.2983,
      0.381,
      0.0907,
      0.277
     ]
    },
    {
     "id": "E",
     "label": "tuýp màu vẽ",
     "box": [
      0.3993,
      0.3244,
      0.0553,
      0.3331
     ]
    },
    {
     "id": "C",
     "label": "cọ vẽ",
     "box": [
      0.5493,
      0.4445,
      0.0387,
      0.213
     ]
    },
    {
     "id": "D",
     "label": "bảng pha màu",
     "box": [
      0.6192,
      0.3741,
      0.0907,
      0.284
     ]
    },
    {
     "id": "A",
     "label": "bút sáp màu",
     "box": [
      0.8149,
      0.403,
      0.0371,
      0.2545
     ]
    },
    {
     "id": "B",
     "label": "bút chì màu",
     "box": [
      0.8974,
      0.3417,
      0.0348,
      0.3163
     ]
    }
   ],
   "names": {
    "B": "bút chì màu",
    "C": "cọ vẽ",
    "D": "bảng pha màu",
    "E": "tuýp màu vẽ",
    "A": "bút sáp màu"
   },
   "mode": "single",
   "answer": "D",
   "excel_item": "7",
   "prompt": "<img class=\"q-icon\" src=\"images/07_q1.png\" alt=\"\"> và <img class=\"q-icon\" src=\"images/07_q2.png\" alt=\"\">, cái nào dài hơn?"
  },
  {
   "n": 8,
   "diff": "중",
   "limit": 30,
   "kind": "image",
   "img": "images/08.jpg",
   "ar": 1.74419,
   "options": [
    {
     "id": "A",
     "label": "chổi lông gà",
     "box": [
      0.0427,
      0.3764,
      0.0719,
      0.2113
     ]
    },
    {
     "id": "B",
     "label": "chổi quét nhà",
     "box": [
      0.1258,
      0.3769,
      0.0894,
      0.2736
     ]
    },
    {
     "id": "B",
     "label": "chổi quét nhà",
     "box": [
      0.2871,
      0.3769,
      0.0857,
      0.2667
     ]
    },
    {
     "id": "C",
     "label": "cái hốt rác",
     "box": [
      0.3728,
      0.3769,
      0.0971,
      0.3239
     ]
    },
    {
     "id": "D",
     "label": "cây lau nhà",
     "box": [
      0.5338,
      0.3769,
      0.0924,
      0.2713
     ]
    },
    {
     "id": "C",
     "label": "cái hốt rác",
     "box": [
      0.6262,
      0.3764,
      0.0969,
      0.2684
     ]
    },
    {
     "id": "D",
     "label": "cây lau nhà",
     "box": [
      0.7733,
      0.3838,
      0.0933,
      0.1222
     ]
    },
    {
     "id": "E",
     "label": "máy hút bụi",
     "box": [
      0.8667,
      0.3838,
      0.0947,
      0.3197
     ]
    }
   ],
   "names": {
    "A": "chổi lông gà",
    "B": "chổi quét nhà",
    "C": "cái hốt rác",
    "D": "cây lau nhà",
    "E": "máy hút bụi"
   },
   "mode": "single",
   "answer": "D",
   "excel_item": "8",
   "prompt": "<img class=\"q-icon\" src=\"images/08_q1.png\" alt=\"\"> và <img class=\"q-icon\" src=\"images/08_q2.png\" alt=\"\">, cái nào dài hơn?"
  },
  {
   "n": 9,
   "diff": "중",
   "limit": 30,
   "kind": "image",
   "img": "images/09.jpg",
   "ar": 1.74419,
   "options": [
    {
     "id": "A",
     "label": "ống hút",
     "box": [
      0.0566,
      0.4676,
      0.0384,
      0.19
     ]
    },
    {
     "id": "B",
     "label": "cốc nước",
     "box": [
      0.1172,
      0.4353,
      0.0877,
      0.2223
     ]
    },
    {
     "id": "B",
     "label": "cốc nước",
     "box": [
      0.2868,
      0.4948,
      0.0877,
      0.1627
     ]
    },
    {
     "id": "C",
     "label": "bình nước",
     "box": [
      0.3758,
      0.3961,
      0.0914,
      0.2615
     ]
    },
    {
     "id": "D",
     "label": "nước cam",
     "box": [
      0.5248,
      0.4306,
      0.0907,
      0.2274
     ]
    },
    {
     "id": "E",
     "label": "máy lọc nước",
     "box": [
      0.6205,
      0.1316,
      0.0977,
      0.5259
     ]
    },
    {
     "id": "C",
     "label": "bình nước",
     "box": [
      0.7874,
      0.4601,
      0.0866,
      0.1974
     ]
    },
    {
     "id": "D",
     "label": "nước cam",
     "box": [
      0.874,
      0.3637,
      0.0859,
      0.2945
     ]
    }
   ],
   "names": {
    "A": "ống hút",
    "B": "cốc nước",
    "C": "bình nước",
    "D": "nước cam",
    "E": "máy lọc nước"
   },
   "mode": "single",
   "answer": "D",
   "excel_item": "10",
   "prompt": "<img class=\"q-icon\" src=\"images/09_q1.png\" alt=\"\"> và <img class=\"q-icon\" src=\"images/09_q2.png\" alt=\"\">, cái nào dài hơn?"
  },
  {
   "n": 10,
   "diff": "중",
   "limit": 30,
   "kind": "image",
   "img": "images/10.jpg",
   "ar": 1.74419,
   "options": [
    {
     "id": "A",
     "label": "dây xoắn",
     "box": [
      0.1957,
      0.138,
      0.1593,
      0.0843
     ]
    },
    {
     "id": "B",
     "label": "dây kẻ sọc",
     "box": [
      0.1957,
      0.3031,
      0.2073,
      0.0884
     ]
    },
    {
     "id": "D",
     "label": "dây kẻ ô",
     "box": [
      0.6338,
      0.1363,
      0.2672,
      0.0865
     ]
    },
    {
     "id": "C",
     "label": "dây chấm bi",
     "box": [
      0.6338,
      0.2973,
      0.1685,
      0.0872
     ]
    },
    {
     "id": "D",
     "label": "dây kẻ ô",
     "box": [
      0.1957,
      0.6166,
      0.2026,
      0.086
     ]
    },
    {
     "id": "E",
     "label": "dây hoa văn trái tim",
     "box": [
      0.1957,
      0.7996,
      0.256,
      0.0814
     ]
    },
    {
     "id": "C",
     "label": "dây chấm bi",
     "box": [
      0.6338,
      0.6142,
      0.1507,
      0.0872
     ]
    },
    {
     "id": "B",
     "label": "dây kẻ sọc",
     "box": [
      0.6338,
      0.7961,
      0.0954,
      0.0884
     ]
    }
   ],
   "names": {
    "A": "dây xoắn",
    "B": "dây kẻ sọc",
    "D": "dây kẻ ô",
    "C": "dây chấm bi",
    "E": "dây hoa văn trái tim"
   },
   "mode": "single",
   "answer": "C",
   "excel_item": "9",
   "prompt": "<img class=\"q-icon\" src=\"images/10_q1.png\" alt=\"\"> và <img class=\"q-icon\" src=\"images/10_q2.png\" alt=\"\">, sợi nào dài hơn?"
  },
  {
   "n": 11,
   "diff": "상",
   "limit": 50,
   "kind": "image",
   "img": "images/11.jpg",
   "ar": 1.74419,
   "options": [
    {
     "id": "A",
     "label": "cái đinh",
     "box": [
      0.0589,
      0.4162,
      0.046,
      0.2413
     ]
    },
    {
     "id": "B",
     "label": "tua vít",
     "box": [
      0.1427,
      0.3089,
      0.0467,
      0.3493
     ]
    },
    {
     "id": "C",
     "label": "kìm",
     "box": [
      0.3076,
      0.4422,
      0.0454,
      0.2154
     ]
    },
    {
     "id": "D",
     "label": "búa",
     "box": [
      0.3606,
      0.3758,
      0.1083,
      0.2818
     ]
    },
    {
     "id": "B",
     "label": "tua vít",
     "box": [
      0.5487,
      0.3487,
      0.045,
      0.3094
     ]
    },
    {
     "id": "C",
     "label": "kìm",
     "box": [
      0.6162,
      0.2557,
      0.0901,
      0.4023
     ]
    },
    {
     "id": "D",
     "label": "búa",
     "box": [
      0.7719,
      0.3493,
      0.1037,
      0.3082
     ]
    },
    {
     "id": "E",
     "label": "cưa",
     "box": [
      0.8756,
      0.1548,
      0.094,
      0.5034
     ]
    }
   ],
   "names": {
    "A": "cái đinh",
    "B": "tua vít",
    "C": "kìm",
    "D": "búa",
    "E": "cưa"
   },
   "mode": "single",
   "answer": "D",
   "excel_item": "11",
   "prompt": "<img class=\"q-icon\" src=\"images/11_q1.png\" alt=\"\"> và <img class=\"q-icon\" src=\"images/11_q2.png\" alt=\"\">, cái nào dài hơn?"
  },
  {
   "n": 12,
   "diff": "상",
   "limit": 50,
   "kind": "image",
   "img": "images/12.jpg",
   "ar": 1.74419,
   "options": [
    {
     "id": "A",
     "label": "cà rốt",
     "box": [
      0.0566,
      0.4428,
      0.043,
      0.2154
     ]
    },
    {
     "id": "B",
     "label": "cà tím",
     "box": [
      0.1325,
      0.3695,
      0.0662,
      0.288
     ]
    },
    {
     "id": "C",
     "label": "dưa chuột",
     "box": [
      0.3007,
      0.4745,
      0.0586,
      0.183
     ]
    },
    {
     "id": "D",
     "label": "củ cải",
     "box": [
      0.3778,
      0.3453,
      0.0818,
      0.3129
     ]
    },
    {
     "id": "B",
     "label": "cà tím",
     "box": [
      0.5503,
      0.4514,
      0.057,
      0.2061
     ]
    },
    {
     "id": "C",
     "label": "dưa chuột",
     "box": [
      0.6411,
      0.3776,
      0.0589,
      0.2806
     ]
    },
    {
     "id": "D",
     "label": "củ cải",
     "box": [
      0.7987,
      0.3961,
      0.0815,
      0.2615
     ]
    },
    {
     "id": "E",
     "label": "hành lá",
     "box": [
      0.8815,
      0.3036,
      0.0745,
      0.3539
     ]
    }
   ],
   "names": {
    "A": "cà rốt",
    "B": "cà tím",
    "C": "dưa chuột",
    "D": "củ cải",
    "E": "hành lá"
   },
   "mode": "single",
   "answer": "D",
   "excel_item": "12",
   "prompt": "<img class=\"q-icon\" src=\"images/12_q1.png\" alt=\"\"> và <img class=\"q-icon\" src=\"images/12_q2.png\" alt=\"\">, củ nào dài hơn?"
  },
  {
   "n": 13,
   "diff": "상",
   "limit": 50,
   "kind": "image",
   "img": "images/13.jpg",
   "ar": 1.74419,
   "options": [
    {
     "id": "A",
     "label": "hoa cẩm tú cầu",
     "box": [
      0.0268,
      0.4099,
      0.1038,
      0.2477
     ]
    },
    {
     "id": "B",
     "label": "hoa bìm bìm",
     "box": [
      0.1306,
      0.3233,
      0.0903,
      0.3343
     ]
    },
    {
     "id": "C",
     "label": "hoa tulip",
     "box": [
      0.2772,
      0.4936,
      0.0894,
      0.1639
     ]
    },
    {
     "id": "D",
     "label": "hoa hồng",
     "box": [
      0.3666,
      0.4076,
      0.1152,
      0.2499
     ]
    },
    {
     "id": "B",
     "label": "hoa bìm bìm",
     "box": [
      0.5427,
      0.4601,
      0.0856,
      0.198
     ]
    },
    {
     "id": "C",
     "label": "hoa tulip",
     "box": [
      0.6283,
      0.3343,
      0.0892,
      0.3233
     ]
    },
    {
     "id": "D",
     "label": "hoa hồng",
     "box": [
      0.7775,
      0.2499,
      0.1175,
      0.4035
     ]
    },
    {
     "id": "E",
     "label": "hoa hướng dương",
     "box": [
      0.895,
      0.2281,
      0.0831,
      0.4295
     ]
    }
   ],
   "names": {
    "A": "hoa cẩm tú cầu",
    "B": "hoa bìm bìm",
    "C": "hoa tulip",
    "D": "hoa hồng",
    "E": "hoa hướng dương"
   },
   "mode": "single",
   "answer": "D",
   "excel_item": "13",
   "prompt": "<img class=\"q-icon\" src=\"images/13_q1.png\" alt=\"\"> và <img class=\"q-icon\" src=\"images/13_q2.png\" alt=\"\">, bông nào dài hơn?"
  },
  {
   "n": 14,
   "diff": "상",
   "limit": 50,
   "kind": "image",
   "img": "images/14.jpg",
   "ar": 1.74419,
   "options": [
    {
     "id": "B",
     "label": "chó Jindo",
     "box": [
      0.0291,
      0.3932,
      0.0955,
      0.2643
     ]
    },
    {
     "id": "C",
     "label": "chó Husky",
     "box": [
      0.1246,
      0.3082,
      0.0986,
      0.3493
     ]
    },
    {
     "id": "D",
     "label": "chó Retriever",
     "box": [
      0.2858,
      0.4601,
      0.0877,
      0.198
     ]
    },
    {
     "id": "E",
     "label": "chó Becgie",
     "box": [
      0.3765,
      0.3688,
      0.0927,
      0.2892
     ]
    },
    {
     "id": "B",
     "label": "chó Jindo",
     "box": [
      0.5315,
      0.3429,
      0.0991,
      0.3146
     ]
    },
    {
     "id": "A",
     "label": "chó Border Collie",
     "box": [
      0.6306,
      0.4237,
      0.0982,
      0.2338
     ]
    },
    {
     "id": "C",
     "label": "chó Husky",
     "box": [
      0.7825,
      0.4174,
      0.0927,
      0.2401
     ]
    },
    {
     "id": "D",
     "label": "chó Retriever",
     "box": [
      0.8752,
      0.3747,
      0.0964,
      0.2835
     ]
    }
   ],
   "names": {
    "B": "chó Jindo",
    "C": "chó Husky",
    "D": "chó Retriever",
    "E": "chó Becgie",
    "A": "chó Border Collie"
   },
   "mode": "single",
   "answer": "E",
   "excel_item": "14",
   "prompt": "<img class=\"q-icon\" src=\"images/14_q1.png\" alt=\"\"> và <img class=\"q-icon\" src=\"images/14_q2.png\" alt=\"\">, con nào to hơn?"
  },
  {
   "n": 15,
   "diff": "상",
   "limit": 50,
   "kind": "image",
   "img": "images/15.jpg",
   "ar": 1.74419,
   "options": [
    {
     "id": "A",
     "label": "hoa văn trái tim",
     "box": [
      0.0305,
      0.3591,
      0.0976,
      0.2985
     ]
    },
    {
     "id": "B",
     "label": "hoa văn ngôi sao",
     "box": [
      0.1281,
      0.2564,
      0.098,
      0.4012
     ]
    },
    {
     "id": "C",
     "label": "kẻ sọc",
     "box": [
      0.2788,
      0.3307,
      0.0965,
      0.3268
     ]
    },
    {
     "id": "D",
     "label": "hoa văn hình vuông",
     "box": [
      0.3753,
      0.2488,
      0.0965,
      0.4088
     ]
    },
    {
     "id": "C",
     "label": "kẻ sọc",
     "box": [
      0.5318,
      0.2725,
      0.0964,
      0.3851
     ]
    },
    {
     "id": "B",
     "label": "hoa văn ngôi sao",
     "box": [
      0.6282,
      0.3405,
      0.0963,
      0.317
     ]
    },
    {
     "id": "E",
     "label": "hoa văn hình tam giác",
     "box": [
      0.7791,
      0.2545,
      0.0969,
      0.403
     ]
    },
    {
     "id": "D",
     "label": "hoa văn hình vuông",
     "box": [
      0.876,
      0.3741,
      0.0965,
      0.2835
     ]
    }
   ],
   "names": {
    "A": "hoa văn trái tim",
    "B": "hoa văn ngôi sao",
    "C": "kẻ sọc",
    "D": "hoa văn hình vuông",
    "E": "hoa văn hình tam giác"
   },
   "mode": "single",
   "answer": "E",
   "excel_item": "15",
   "prompt": "<img class=\"q-icon\" src=\"images/15_q1.png\" alt=\"\"> và <img class=\"q-icon\" src=\"images/15_q2.png\" alt=\"\">, lá cờ nào dài hơn?"
  },
  {
   "n": 16,
   "diff": "상",
   "limit": 50,
   "kind": "image",
   "img": "images/16.jpg",
   "ar": 1.74419,
   "options": [
    {
     "id": "B",
     "label": "cây bạch quả",
     "box": [
      0.0238,
      0.4232,
      0.0987,
      0.2344
     ]
    },
    {
     "id": "C",
     "label": "cây táo",
     "box": [
      0.1225,
      0.3424,
      0.107,
      0.3151
     ]
    },
    {
     "id": "D",
     "label": "cây phong",
     "box": [
      0.28,
      0.3895,
      0.09,
      0.2558
     ]
    },
    {
     "id": "E",
     "label": "cây dừa",
     "box": [
      0.37,
      0.1861,
      0.1047,
      0.4622
     ]
    },
    {
     "id": "C",
     "label": "cây táo",
     "box": [
      0.5245,
      0.3862,
      0.1076,
      0.2719
     ]
    },
    {
     "id": "D",
     "label": "cây phong",
     "box": [
      0.6321,
      0.306,
      0.0984,
      0.3515
     ]
    },
    {
     "id": "A",
     "label": "cây thông",
     "box": [
      0.7858,
      0.4059,
      0.0818,
      0.2516
     ]
    },
    {
     "id": "B",
     "label": "cây bạch quả",
     "box": [
      0.8676,
      0.288,
      0.1089,
      0.3695
     ]
    }
   ],
   "names": {
    "B": "cây bạch quả",
    "C": "cây táo",
    "D": "cây phong",
    "E": "cây dừa",
    "A": "cây thông"
   },
   "mode": "single",
   "answer": "E",
   "excel_item": "16",
   "prompt": "<img class=\"q-icon\" src=\"images/16_q1.png\" alt=\"\"> và <img class=\"q-icon\" src=\"images/16_q2.png\" alt=\"\">, cây nào dài hơn?"
  },
  {
   "n": 17,
   "diff": "최상",
   "limit": 50,
   "kind": "image",
   "img": "images/17.jpg",
   "ar": 1.74419,
   "options": [
    {
     "id": "C",
     "label": "dây hoa văn ngôi sao",
     "box": [
      0.1954,
      0.1167,
      0.1841,
      0.1212
     ]
    },
    {
     "id": "D",
     "label": "dây hoa văn chấm bi",
     "box": [
      0.1954,
      0.3031,
      0.2414,
      0.1224
     ]
    },
    {
     "id": "C",
     "label": "dây hoa văn ngôi sao",
     "box": [
      0.6334,
      0.104,
      0.2129,
      0.1212
     ]
    },
    {
     "id": "B",
     "label": "dây hoa văn trái tim",
     "box": [
      0.6334,
      0.2916,
      0.155,
      0.1201
     ]
    },
    {
     "id": "E",
     "label": "dây kẻ sọc",
     "box": [
      0.1957,
      0.5981,
      0.2411,
      0.1224
     ]
    },
    {
     "id": "D",
     "label": "dây hoa văn chấm bi",
     "box": [
      0.1957,
      0.7869,
      0.1884,
      0.1212
     ]
    },
    {
     "id": "A",
     "label": "dây kẻ ô",
     "box": [
      0.6334,
      0.5981,
      0.1768,
      0.1212
     ]
    },
    {
     "id": "B",
     "label": "dây hoa văn trái tim",
     "box": [
      0.6338,
      0.7869,
      0.2169,
      0.1218
     ]
    }
   ],
   "names": {
    "C": "dây hoa văn ngôi sao",
    "D": "dây hoa văn chấm bi",
    "B": "dây hoa văn trái tim",
    "E": "dây kẻ sọc",
    "A": "dây kẻ ô"
   },
   "mode": "pair",
   "slots": [
    "Ngắn nhất",
    "Dài nhất"
   ],
   "answer": [
    "A",
    "E"
   ],
   "excel_item": "17",
   "prompt": "Dải ruy băng nào ngắn nhất và dải nào dài nhất?"
  },
  {
   "n": 18,
   "diff": "최상",
   "limit": 50,
   "kind": "image",
   "img": "images/18.jpg",
   "ar": 1.74419,
   "options": [
    {
     "id": "B",
     "label": "bàn chải đánh răng",
     "box": [
      0.0596,
      0.4191,
      0.0444,
      0.2384
     ]
    },
    {
     "id": "C",
     "label": "dầu gội",
     "box": [
      0.1205,
      0.3216,
      0.0825,
      0.3366
     ]
    },
    {
     "id": "C",
     "label": "dầu gội",
     "box": [
      0.2831,
      0.4855,
      0.0774,
      0.1726
     ]
    },
    {
     "id": "D",
     "label": "dép nhà tắm",
     "box": [
      0.3605,
      0.4306,
      0.1084,
      0.2269
     ]
    },
    {
     "id": "B",
     "label": "bàn chải đánh răng",
     "box": [
      0.556,
      0.3366,
      0.0493,
      0.3209
     ]
    },
    {
     "id": "A",
     "label": "kem đánh răng",
     "box": [
      0.6275,
      0.4313,
      0.0682,
      0.2262
     ]
    },
    {
     "id": "D",
     "label": "dép nhà tắm",
     "box": [
      0.7808,
      0.5132,
      0.1078,
      0.1443
     ]
    },
    {
     "id": "E",
     "label": "vòi sen",
     "box": [
      0.8886,
      0.3163,
      0.0796,
      0.3412
     ]
    }
   ],
   "names": {
    "B": "bàn chải đánh răng",
    "C": "dầu gội",
    "D": "dép nhà tắm",
    "A": "kem đánh răng",
    "E": "vòi sen"
   },
   "mode": "pair",
   "slots": [
    "Ngắn nhất",
    "Dài nhất"
   ],
   "answer": [
    "A",
    "E"
   ],
   "excel_item": "18",
   "prompt": "Đồ vật nào ngắn nhất và đồ vật nào dài nhất?"
  },
  {
   "n": 19,
   "diff": "최상",
   "limit": 50,
   "kind": "image",
   "img": "images/19.jpg",
   "ar": 1.74419,
   "options": [
    {
     "id": "A",
     "label": "vợt bóng bàn",
     "box": [
      0.0334,
      0.4145,
      0.0871,
      0.243
     ]
    },
    {
     "id": "B",
     "label": "vợt cầu lông",
     "box": [
      0.1205,
      0.254,
      0.108,
      0.4035
     ]
    },
    {
     "id": "C",
     "label": "vợt tennis",
     "box": [
      0.2854,
      0.3112,
      0.1053,
      0.3464
     ]
    },
    {
     "id": "D",
     "label": "gậy bóng chày",
     "box": [
      0.4149,
      0.1102,
      0.0404,
      0.5473
     ]
    },
    {
     "id": "D",
     "label": "gậy bóng chày",
     "box": [
      0.5543,
      0.3949,
      0.0404,
      0.2626
     ]
    },
    {
     "id": "E",
     "label": "gậy khúc côn cầu",
     "box": [
      0.6136,
      0.2725,
      0.0844,
      0.3851
     ]
    },
    {
     "id": "B",
     "label": "vợt cầu lông",
     "box": [
      0.7725,
      0.3209,
      0.0997,
      0.3366
     ]
    },
    {
     "id": "C",
     "label": "vợt tennis",
     "box": [
      0.8722,
      0.2459,
      0.1053,
      0.4116
     ]
    }
   ],
   "names": {
    "A": "vợt bóng bàn",
    "B": "vợt cầu lông",
    "C": "vợt tennis",
    "D": "gậy bóng chày",
    "E": "gậy khúc côn cầu"
   },
   "mode": "single",
   "answer": "B",
   "excel_item": "19",
   "prompt": "Khi xếp theo thứ tự từ ngắn đến dài, đồ vật đứng thứ hai là gì?"
  },
  {
   "n": 20,
   "diff": "최상",
   "limit": 50,
   "kind": "image",
   "img": "images/20.jpg",
   "ar": 1.74419,
   "options": [
    {
     "id": "A",
     "label": "xẻng làm vườn",
     "box": [
      0.0454,
      0.358,
      0.0709,
      0.3002
     ]
    },
    {
     "id": "B",
     "label": "cái cuốc nhỏ (homi)",
     "box": [
      0.1172,
      0.2598,
      0.1046,
      0.3978
     ]
    },
    {
     "id": "D",
     "label": "kéo",
     "box": [
      0.2933,
      0.3954,
      0.0743,
      0.2558
     ]
    },
    {
     "id": "E",
     "label": "cuốc chim",
     "box": [
      0.3676,
      0.3233,
      0.1111,
      0.3278
     ]
    },
    {
     "id": "C",
     "label": "cái cào",
     "box": [
      0.5245,
      0.4069,
      0.1061,
      0.2506
     ]
    },
    {
     "id": "D",
     "label": "kéo",
     "box": [
      0.6306,
      0.3048,
      0.0955,
      0.3527
     ]
    },
    {
     "id": "B",
     "label": "cái cuốc nhỏ (homi)",
     "box": [
      0.7692,
      0.37,
      0.1,
      0.2875
     ]
    },
    {
     "id": "C",
     "label": "cái cào",
     "box": [
      0.8692,
      0.2188,
      0.1043,
      0.4387
     ]
    }
   ],
   "names": {
    "A": "xẻng làm vườn",
    "B": "cái cuốc nhỏ (homi)",
    "D": "kéo",
    "E": "cuốc chim",
    "C": "cái cào"
   },
   "mode": "single",
   "answer": "D",
   "excel_item": "20",
   "prompt": "Khi xếp theo thứ tự từ ngắn đến dài, đồ vật đứng thứ tư là gì?"
  }
 ]
};
window.TASK.ui = {
  battery: "Bài kiểm tra Năng lực Suy luận", start: "Bắt đầu", next: "Tiếp theo", reset: "Làm lại",
  replay: "Xem lại hướng dẫn", begin: "Làm bài",
  practiceLabel: (k) => `Ví dụ ${k}`, explainTag: (k) => `Giải thích ví dụ ${k}`,
  practiceRight: "<b>Giỏi lắm! Con trả lời đúng rồi.</b>", practiceCheck: "<b>Chúng ta cùng xem đáp án nhé?</b>",
  readyText: ["Bây giờ chúng ta bắt đầu làm bài.", "Mỗi câu <b>sẽ tự động chuyển khi hết thời gian giới hạn</b>, nếu con đã làm xong thì hãy nhấn <b>'Tiếp theo'</b>.", "Nếu muốn xem lại hướng dẫn, hãy nhấn <b>'Xem lại hướng dẫn'</b>, nếu muốn bắt đầu, hãy nhấn <b>'Làm bài'</b>."],
  transition1: ["Khi hết <b>thời gian giới hạn</b>", "câu hỏi sẽ tự động chuyển.", "Nếu con đã làm xong,", "hãy nhấn <b>'Tiếp theo'</b>."],
  transition2: ["Hãy làm bài", "<b>thật chính xác và nhanh</b>", "nhất có thể nhé."],
  progress: (i, n) => `Câu ${i} / ${n}`,
};
