/* 숫자연속추론 — 문구·문항·정답·제한시간 (tools/build_tasks.py 로 생성)
   items[].answer : 정답 / limit : 제한시간(초) / options[].box : 그림에서 누를 영역(가로·세로 비율) */
window.TASK = {
 "id": "number_series",
 "code": "NS",
 "lang": "ko",
 "tag": "숫자연속추론",
 "title": "숫자연속추론",
 "instr": [
  "지금부터 숫자 문제를 풀 거예요.",
  "숫자들이 순서대로 나와 있어요.",
  "숫자들이 어떤 규칙으로 이어지고 있는지 잘 보고, 다음에 올 숫자 하나를 아래에서 골라주세요.",
  "어려운 계산을 할 필요는 없고, 숫자가 바뀌는 순서를 잘 보면 맞힐 수 있어요."
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
    "숫자를 보면 1 다음에 2가 나와 있어요. 이 문제는 숫자가 하나씩 커지는 규칙이에요.",
    "그래서 1 다음은 2, 그 다음은 3이 와야 해요. 따라서 빈칸에 올 숫자는 3이에요."
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
    "숫자를 보면 2 다음에 4, 그 다음에 6이 나와 있어요. 이 문제는 숫자가 두 칸씩 커지는 규칙이에요.",
    "그래서 2 다음은 4, 그 다음은 6, 그 다음은 8이 와야 해요. 따라서 빈칸에 올 숫자는 8이에요."
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
  battery: "한국추론능력검사", start: "시작하기", next: "다음", reset: "다시 하기",
  replay: "설명 다시 보기", begin: "검사하기",
  practiceLabel: (k) => `예제 ${k}`, explainTag: (k) => `예제 ${k} 해설`,
  practiceRight: "<b>잘했어요! 정답이에요.</b>", practiceCheck: "<b>정답을 함께 확인해 볼까요?</b>",
  readyText: ["이제 검사를 시작합니다.", "각 문제는 <b>제한시간이 지나면 자동으로 넘어가고</b>, 다 풀었으면 <b>'다음'</b>을 누르세요.", "설명을 다시 보려면 <b>'설명 다시 보기'</b>를, 검사를 시작하려면 <b>'검사하기'</b>를 눌러주세요."],
  transition1: ["<b>제한시간</b>이 지나면", "자동으로 넘어갑니다.", "다 풀었으면", "<b>'다음'</b>을 누르세요."],
  transition2: ["최대한", "<b>정확하고 빠르게</b>", "문제를 풀어주세요."],
  progress: (i, n) => `문제 ${i} / ${n}`,
};
