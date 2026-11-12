/* Suy luận dãy số — tiếng Việt (tools/build_vi.py 로 생성: 번역 시트 '온라인 검사 베트남어 번역')
   n·diff·answer 등 결과에 기록되는 값은 한국어판과 동일 */
window.TASK = {
 "id": "number_series",
 "code": "NS",
 "lang": "vi",
 "tag": "Suy luận dãy số",
 "title": "Suy luận dãy số",
 "instr": [
  "Bây giờ chúng ta sẽ làm bài về số. Các con số được xếp theo thứ tự.",
  "Hãy xem kỹ các con số nối tiếp nhau theo quy luật nào, rồi chọn một số sẽ đứng tiếp theo ở bên dưới.",
  "Con không cần tính toán khó, chỉ cần quan sát kỹ thứ tự thay đổi của các con số là có thể trả lời đúng."
 ],
 "practice": [
  {
   "n": "예제 1",
   "diff": "연습",
   "limit": null,
   "kind": "ns",
   "mode": "single",
   "seq": [
    "1",
    "2",
    "?"
   ],
   "options": [
    {
     "id": "1",
     "text": "1"
    },
    {
     "id": "2",
     "text": "3"
    },
    {
     "id": "3",
     "text": "2"
    },
    {
     "id": "4",
     "text": "5"
    }
   ],
   "answer": "2",
   "explain": [
    "Nhìn các con số, sau 1 là 2. Bài này có quy luật mỗi số tăng thêm một.",
    "Vì vậy sau 1 là 2, rồi tiếp theo phải là 3. Do đó số ở ô trống là 3."
   ]
  },
  {
   "n": "예제 2",
   "diff": "연습",
   "limit": null,
   "kind": "ns",
   "mode": "single",
   "seq": [
    "2",
    "4",
    "6",
    "?"
   ],
   "options": [
    {
     "id": "1",
     "text": "3"
    },
    {
     "id": "2",
     "text": "8"
    },
    {
     "id": "3",
     "text": "9"
    },
    {
     "id": "4",
     "text": "1"
    }
   ],
   "answer": "2",
   "explain": [
    "Nhìn các con số, sau 2 là 4, rồi tiếp theo là 6. Bài này có quy luật mỗi số tăng thêm hai.",
    "Vì vậy sau 2 là 4, sau đó là 6, rồi tiếp theo phải là 8. Do đó số ở ô trống là 8."
   ]
  }
 ],
 "items": [
  {
   "n": 1,
   "diff": "하",
   "limit": 20,
   "kind": "ns",
   "mode": "single",
   "seq": [
    "1",
    "2",
    "3",
    "4",
    "?"
   ],
   "options": [
    {
     "id": "1",
     "text": "8"
    },
    {
     "id": "2",
     "text": "5"
    },
    {
     "id": "3",
     "text": "7"
    },
    {
     "id": "4",
     "text": "9"
    }
   ],
   "answer": "2"
  },
  {
   "n": 2,
   "diff": "하",
   "limit": 20,
   "kind": "ns",
   "mode": "single",
   "seq": [
    "2",
    "3",
    "4",
    "5",
    "?"
   ],
   "options": [
    {
     "id": "1",
     "text": "6"
    },
    {
     "id": "2",
     "text": "4"
    },
    {
     "id": "3",
     "text": "1"
    },
    {
     "id": "4",
     "text": "2"
    }
   ],
   "answer": "1"
  },
  {
   "n": 3,
   "diff": "하",
   "limit": 20,
   "kind": "ns",
   "mode": "single",
   "seq": [
    "8",
    "9",
    "10",
    "11",
    "?"
   ],
   "options": [
    {
     "id": "1",
     "text": "13"
    },
    {
     "id": "2",
     "text": "12"
    },
    {
     "id": "3",
     "text": "7"
    },
    {
     "id": "4",
     "text": "14"
    }
   ],
   "answer": "2"
  },
  {
   "n": 4,
   "diff": "하",
   "limit": 20,
   "kind": "ns",
   "mode": "single",
   "seq": [
    "1",
    "3",
    "5",
    "7",
    "?"
   ],
   "options": [
    {
     "id": "1",
     "text": "8"
    },
    {
     "id": "2",
     "text": "2"
    },
    {
     "id": "3",
     "text": "4"
    },
    {
     "id": "4",
     "text": "9"
    }
   ],
   "answer": "4"
  },
  {
   "n": 5,
   "diff": "하",
   "limit": 20,
   "kind": "ns",
   "mode": "single",
   "seq": [
    "5",
    "7",
    "9",
    "11",
    "?"
   ],
   "options": [
    {
     "id": "1",
     "text": "13"
    },
    {
     "id": "2",
     "text": "1"
    },
    {
     "id": "3",
     "text": "4"
    },
    {
     "id": "4",
     "text": "6"
    }
   ],
   "answer": "1"
  },
  {
   "n": 6,
   "diff": "하",
   "limit": 20,
   "kind": "ns",
   "mode": "single",
   "seq": [
    "6",
    "8",
    "10",
    "12",
    "?"
   ],
   "options": [
    {
     "id": "1",
     "text": "9"
    },
    {
     "id": "2",
     "text": "4"
    },
    {
     "id": "3",
     "text": "3"
    },
    {
     "id": "4",
     "text": "14"
    }
   ],
   "answer": "4"
  },
  {
   "n": 7,
   "diff": "하",
   "limit": 20,
   "kind": "ns",
   "mode": "single",
   "seq": [
    "13",
    "12",
    "11",
    "10",
    "9",
    "?"
   ],
   "options": [
    {
     "id": "1",
     "text": "14"
    },
    {
     "id": "2",
     "text": "4"
    },
    {
     "id": "3",
     "text": "8"
    },
    {
     "id": "4",
     "text": "6"
    }
   ],
   "answer": "3"
  },
  {
   "n": 8,
   "diff": "하",
   "limit": 20,
   "kind": "ns",
   "mode": "single",
   "seq": [
    "8",
    "7",
    "6",
    "5",
    "4",
    "?"
   ],
   "options": [
    {
     "id": "1",
     "text": "4"
    },
    {
     "id": "2",
     "text": "2"
    },
    {
     "id": "3",
     "text": "3"
    },
    {
     "id": "4",
     "text": "1"
    }
   ],
   "answer": "3"
  },
  {
   "n": 9,
   "diff": "하",
   "limit": 20,
   "kind": "ns",
   "mode": "single",
   "seq": [
    "3",
    "4",
    "6",
    "7",
    "9",
    "?"
   ],
   "options": [
    {
     "id": "1",
     "text": "11"
    },
    {
     "id": "2",
     "text": "8"
    },
    {
     "id": "3",
     "text": "10"
    },
    {
     "id": "4",
     "text": "5"
    }
   ],
   "answer": "3"
  },
  {
   "n": 10,
   "diff": "하",
   "limit": 20,
   "kind": "ns",
   "mode": "single",
   "seq": [
    "1",
    "2",
    "5",
    "6",
    "9",
    "?"
   ],
   "options": [
    {
     "id": "1",
     "text": "10"
    },
    {
     "id": "2",
     "text": "3"
    },
    {
     "id": "3",
     "text": "4"
    },
    {
     "id": "4",
     "text": "7"
    }
   ],
   "answer": "1"
  },
  {
   "n": 11,
   "diff": "상",
   "limit": 50,
   "kind": "ns",
   "mode": "single",
   "seq": [
    "2",
    "4",
    "6",
    "4",
    "?"
   ],
   "options": [
    {
     "id": "1",
     "text": "8"
    },
    {
     "id": "2",
     "text": "1"
    },
    {
     "id": "3",
     "text": "2"
    },
    {
     "id": "4",
     "text": "10"
    },
    {
     "id": "5",
     "text": "6"
    }
   ],
   "answer": "3"
  },
  {
   "n": 12,
   "diff": "상",
   "limit": 50,
   "kind": "ns",
   "mode": "single",
   "seq": [
    "1",
    "4",
    "2",
    "5",
    "3",
    "?"
   ],
   "options": [
    {
     "id": "1",
     "text": "6"
    },
    {
     "id": "2",
     "text": "7"
    },
    {
     "id": "3",
     "text": "8"
    },
    {
     "id": "4",
     "text": "9"
    },
    {
     "id": "5",
     "text": "1"
    }
   ],
   "answer": "1"
  },
  {
   "n": 13,
   "diff": "상",
   "limit": 50,
   "kind": "ns",
   "mode": "single",
   "seq": [
    "5",
    "2",
    "7",
    "2",
    "?"
   ],
   "options": [
    {
     "id": "1",
     "text": "4"
    },
    {
     "id": "2",
     "text": "5"
    },
    {
     "id": "3",
     "text": "2"
    },
    {
     "id": "4",
     "text": "7"
    },
    {
     "id": "5",
     "text": "9"
    }
   ],
   "answer": "2"
  },
  {
   "n": 14,
   "diff": "상",
   "limit": 50,
   "kind": "ns",
   "mode": "single",
   "seq": [
    "12",
    "10",
    "8",
    "6",
    "4",
    "?"
   ],
   "options": [
    {
     "id": "1",
     "text": "8"
    },
    {
     "id": "2",
     "text": "2"
    },
    {
     "id": "3",
     "text": "6"
    },
    {
     "id": "4",
     "text": "11"
    },
    {
     "id": "5",
     "text": "1"
    }
   ],
   "answer": "2"
  },
  {
   "n": 15,
   "diff": "상",
   "limit": 50,
   "kind": "ns",
   "mode": "single",
   "seq": [
    "5",
    "2",
    "7",
    "4",
    "9",
    "?"
   ],
   "options": [
    {
     "id": "1",
     "text": "6"
    },
    {
     "id": "2",
     "text": "11"
    },
    {
     "id": "3",
     "text": "8"
    },
    {
     "id": "4",
     "text": "9"
    },
    {
     "id": "5",
     "text": "1"
    }
   ],
   "answer": "1"
  },
  {
   "n": 16,
   "diff": "상",
   "limit": 50,
   "kind": "ns",
   "mode": "single",
   "seq": [
    "8",
    "10",
    "12",
    "10",
    "?"
   ],
   "options": [
    {
     "id": "1",
     "text": "4"
    },
    {
     "id": "2",
     "text": "8"
    },
    {
     "id": "3",
     "text": "6"
    },
    {
     "id": "4",
     "text": "2"
    },
    {
     "id": "5",
     "text": "10"
    }
   ],
   "answer": "2"
  },
  {
   "n": 17,
   "diff": "상",
   "limit": 50,
   "kind": "ns",
   "mode": "single",
   "seq": [
    "3",
    "6",
    "5",
    "8",
    "7",
    "?"
   ],
   "options": [
    {
     "id": "1",
     "text": "10"
    },
    {
     "id": "2",
     "text": "9"
    },
    {
     "id": "3",
     "text": "4"
    },
    {
     "id": "4",
     "text": "12"
    },
    {
     "id": "5",
     "text": "11"
    }
   ],
   "answer": "1"
  },
  {
   "n": 18,
   "diff": "상",
   "limit": 50,
   "kind": "ns",
   "mode": "single",
   "seq": [
    "1",
    "3",
    "6",
    "8",
    "11",
    "?"
   ],
   "options": [
    {
     "id": "1",
     "text": "12"
    },
    {
     "id": "2",
     "text": "13"
    },
    {
     "id": "3",
     "text": "14"
    },
    {
     "id": "4",
     "text": "15"
    },
    {
     "id": "5",
     "text": "16"
    }
   ],
   "answer": "2"
  },
  {
   "n": 19,
   "diff": "상",
   "limit": 50,
   "kind": "ns",
   "mode": "single",
   "seq": [
    "2",
    "7",
    "4",
    "5",
    "6",
    "3",
    "?"
   ],
   "options": [
    {
     "id": "1",
     "text": "8"
    },
    {
     "id": "2",
     "text": "10"
    },
    {
     "id": "3",
     "text": "4"
    },
    {
     "id": "4",
     "text": "2"
    },
    {
     "id": "5",
     "text": "6"
    }
   ],
   "answer": "1"
  },
  {
   "n": 20,
   "diff": "상",
   "limit": 50,
   "kind": "ns",
   "mode": "single",
   "seq": [
    "2",
    "5",
    "4",
    "7",
    "6",
    "9",
    "?"
   ],
   "options": [
    {
     "id": "1",
     "text": "8"
    },
    {
     "id": "2",
     "text": "11"
    },
    {
     "id": "3",
     "text": "3"
    },
    {
     "id": "4",
     "text": "4"
    },
    {
     "id": "5",
     "text": "9"
    }
   ],
   "answer": "1"
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
