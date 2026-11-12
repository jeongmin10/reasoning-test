/* ════════════════════════════════════════════════════════════════════════
   한국추론능력검사 — 소검사 공통 엔진 (13개 소검사 페이지가 함께 씁니다)

   ■ 각 소검사 페이지(ko/<검사>/index.html)는
       ① data.js  — window.TASK : 문구·문항·정답·제한시간·누를 영역(자극책자에서 추출)
       ② 이 파일   — 화면 흐름·채점·CSV
     를 불러옵니다. 문구·정답을 고칠 때는 data.js 만 고치면 됩니다.
   ■ 흐름: 타이틀(지시문+시작하기) → 예제 1 → 해설 → 예제 2 → 해설
          → [설명 다시 보기 | 검사하기] → 전환 화면 → 본 문항 20개 (연속 3문항 0점이면 중지) → 종료
   ■ 응답 방식(mode)
       single : 보기 1개 선택                      (대부분의 검사)
       rows   : 줄마다 1개씩 선택, 줄 안에서 다시 고르면 교체   (공통그림찾기)
       order  : 그림을 이야기 순서대로 누름, '다시 하기'로 초기화  (차례맞추기)
       pair   : '가장 짧은 것'·'가장 긴 것'을 각각 선택        (물리적 길이 전이 17·18번)
   ■ 기록 원칙(연구실 공통 형식 = 예시 지능검사와 동일)
       첫 반응시간 = 문항 제시 → 첫 선택, 결정시간 = 첫 선택 → '다음'(또는 시간 종료),
       총 반응시간 = 둘의 합. 누락오류 = 제한시간 동안 아무것도 선택하지 않음,
       오경보오류 = 응답했지만 정답이 아님(예측추론은 1점·0점 선지).
       응답 변경 횟수 = 첫 선택 이후 선택을 바꾼 횟수(2번째 선택부터 1회).
   ════════════════════════════════════════════════════════════════════════ */
const { ParameterType } = jsPsychModule;
const T = window.TASK, UI = T.ui;
const TEST_ID = T.id;
const WARN_SEC = 5;          // 남은 시간 5초부터 카운트다운 표시
const STOP_AFTER = 3;        // 본 문항 연속 3문항 0점이면 중지 (시간 초과·무응답 = 0점)

// ── 고정 프레임(1300×950)을 창 크기에 맞춰 한 번에 축소 ──
const FRAME_W = 1300, FRAME_H = 950;
let currentScale = 1;
function computeScale() {
  const margin = 10;
  currentScale = Math.min((window.innerWidth - margin * 2) / FRAME_W, (window.innerHeight - margin * 2) / FRAME_H);
  applyScale();
}
function applyScale() { document.querySelectorAll(".math-wrap").forEach((w) => { w.style.transform = `scale(${currentScale})`; }); }
new MutationObserver(() => applyScale()).observe(document.body, { childList: true, subtree: true });
window.addEventListener("resize", computeScale);
computeScale();

function randomID(len = 10) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let out = ""; for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}
const subjectId = VIT.code() || randomID(10);
function csvEscape(value) {
  if (value === undefined || value === null) return "";
  const s = String(value);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}
function toCSV(columns, rows) {
  const lines = [columns.join(",")];
  rows.forEach((r) => lines.push(columns.map((c) => csvEscape(r[c])).join(",")));
  return lines.join("\n");
}
// 여러 줄 문구: 줄마다 끊지 않고(문장 단위 줄바꿈) 상자 폭에 맞게 글자 크기를 줄임. 최소 크기에서도 넘치면 자연 줄바꿈
const linesHTML = (lines) => `<div class="fit-lines">${lines.map((l) => `<div class="ln">${l}</div>`).join("")}</div>`;
function fitLines(root, minPx = T.lang === "vi" ? 22 : 19) {   // 베트남어는 문장이 길어 덜 줄이고 줄바꿈
  root.querySelectorAll(".fit-lines").forEach((el) => {
    let size = parseFloat(getComputedStyle(el).fontSize);
    const over = () => [...el.children].some((c) => c.scrollWidth > el.clientWidth + 1);
    while (over() && size > minPx) { size -= 0.5; el.style.fontSize = size + "px"; }
    if (over()) el.classList.add("wrap");
  });
}
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// 이미지 미리 받기
const _pre = [];
[...T.practice, ...T.items].forEach((it) => { if (it.img) { const im = new Image(); im.src = it.img; _pre.push(im); } });
const loadImg = (u) => new Promise((res) => { if (!u) return res(); const im = new Image(); im.onload = im.onerror = () => res(); im.src = u; });

// ════════════════════════════════════════════════════════════
// 문항 화면 그리기 — state: { sel, hl, practice } 에 따라 선택/정답 표시
//   sel: 현재 응답 (mode 별 형태), hl: 정답 강조(해설 화면)
// ════════════════════════════════════════════════════════════
function answerSet(it) {   // 정답을 화면 표시용 형태로
  if (it.mode === "rows") return it.answer.slice();
  if (it.mode === "order") return it.answer.slice();
  if (it.mode === "pair") return it.answer.slice();
  return [it.answer];
}
function hitHTML(it, st) {
  const sel = st.sel, hl = st.hl ? answerSet(it) : null;
  // 큰 영역부터 그려서 작은 영역이 위에 오도록(겹칠 때 작은 쪽이 눌림)
  const ops = it.options.map((o, i) => ({ o, i })).sort((a, b) => b.o.box[2] * b.o.box[3] - a.o.box[2] * a.o.box[3]);
  return ops.map(({ o }) => {
    let cls = "", inner = "";
    if (it.mode === "single") {
      if (sel === o.id) cls = "sel";
      if (hl && hl.includes(o.id)) cls = "hl";
    } else if (it.mode === "rows") {
      if (sel && sel[o.row] === o.id) cls = "sel";
      if (hl && hl.includes(o.id)) cls = "hl";
    } else if (it.mode === "order") {
      const seq = hl ? it.answer : (sel || []);
      const k = seq.indexOf(o.id);
      if (k >= 0) { cls = hl ? "hl" : "sel"; inner = `<span class="ord">${k + 1}</span>`; }
    } else if (it.mode === "pair") {
      const vals = hl ? it.answer : (sel || []);
      const tags = vals.map((v, k) => (v === o.id ? it.slots[k] : null)).filter(Boolean);
      if (tags.length) { cls = hl ? "hl" : "sel"; inner = `<span class="tagl">${tags.join(" · ")}</span>`; }
    }
    const [x, y, w, h] = o.box;
    return `<button class="hit ${cls}" data-id="${o.id}" ${o.row ? `data-row="${o.row}"` : ""} aria-label="${esc(o.label || o.id)}"
      style="left:${x * 100}%;top:${y * 100}%;width:${w * 100}%;height:${h * 100}%">${inner}</button>`;
  }).join("");
}
function imageStage(it, st, maxH) {
  const maxW = 1160;
  let h = Math.min(maxH, maxW / it.ar), w = h * it.ar;
  return `<div class="stage">${it.promptTop ? `<div class="item-prompt top">${it.promptTop}</div>` : ""}<div class="stim-box" style="width:${w}px;height:${h}px">
      <img src="${it.img}" alt="" draggable="false" style="width:${w}px;height:${h}px">${hitHTML(it, st)}</div>
      ${it.prompt ? `<div class="item-prompt">${it.prompt}</div>` : ""}
      ${it.mode === "pair" ? `<div class="below-row">${slotsHTML(it, st)}</div>` : ""}
    </div>`;
}
function slotsHTML(it, st) {
  const vals = st.hl ? it.answer : (st.sel || []);
  const active = st.active || 0;
  return it.slots.map((name, k) => {
    const v = vals[k], label = v ? (it.names[v] || v) : "";
    return `<button class="slot ${!st.hl && k === active ? "active" : ""} ${st.hl ? "hl" : ""}" data-slot="${k}">${name}<span class="val">${esc(label)}</span></button>`;
  }).join("");
}
function textStage(it, st) {
  const isSel = (id) => (st.hl ? id === it.answer : st.sel === id);
  const cls = (id) => (st.hl && id === it.answer ? "hl" : (!st.hl && st.sel === id ? "sel" : ""));
  if (it.kind === "ns") {
    const seq = it.seq.map((v) => `<div class="cell">${v === "?" ? "" : esc(v)}</div>`).join("");
    const ops = it.options.map((o) => `<button class="cell ${cls(o.id)}" data-id="${o.id}">${esc(o.text)}</button>`).join("");
    return `<div class="stage" style="padding-top:70px;padding-bottom:40px"><div class="ns-seq">${seq}</div><div class="ns-opts">${ops}</div></div>`;
  }
  const ops = it.options.map((o) => `<button class="t-opt ${cls(o.id)}" data-id="${o.id}"><span class="num">${o.id}</span><span>${esc(o.text)}</span></button>`).join("");
  if (it.kind === "vr") {
    return `<div class="stage" style="width:100%"><div class="txt-card" style="width:820px">${it.premise.map(esc).join("<br>")}</div>
      <div class="txt-q">${esc(it.question)}</div><div class="opt-list" style="width:820px">${ops}</div></div>`;
  }
  // 예측추론: 전제 2개 + 질문 (자극책자 상자) + 아래 선지 4개
  return `<div class="stage" style="width:100%"><div class="txt-card left" style="width:1080px;font-size:25px;line-height:1.7">${it.lines.map(esc).join("<br>")}</div>
    <div class="opt-list" style="width:1080px;margin-top:22px">${ops}</div></div>`;
}
function stageHTML(it, st, maxH = 700) {
  return it.kind === "image" ? imageStage(it, st, maxH) : textStage(it, st);
}

// ════════════════════════════════════════════════════════════
// 응답 처리 (mode 별)
// ════════════════════════════════════════════════════════════
function newResp(it) {
  return { sel: it.mode === "rows" ? {} : (it.mode === "single" ? null : []), active: 0, history: [], changes: 0, resets: 0 };
}
function complete(it, r) {
  if (it.mode === "single") return r.sel !== null;
  if (it.mode === "rows") return it.rows.every((k) => r.sel[k]);
  if (it.mode === "order") return r.sel.length === it.options.length;
  if (it.mode === "pair") return it.slots.every((_, k) => r.sel[k]);
  return false;
}
function anySelected(it, r) {
  if (it.mode === "single") return r.sel !== null;
  if (it.mode === "rows") return Object.keys(r.sel).length > 0;
  return r.sel.some(Boolean);
}
function respString(it, r) {
  if (!anySelected(it, r)) return "";
  if (it.mode === "single") return String(r.sel);
  if (it.mode === "rows") return it.rows.map((k) => (r.sel[k] ? r.sel[k].split("-")[1] : "")).join("-");
  if (it.mode === "order") return r.sel.join("-");
  if (it.mode === "pair") return it.slots.map((_, k) => r.sel[k] || "").join(",");
}
function answerString(it) {
  if (it.mode === "rows") return it.answer.map((a) => a.split("-")[1]).join("-");
  if (it.mode === "order") return it.answer.join("-");
  if (it.mode === "pair") return it.answer.join(",");
  return String(it.answer);
}
function scoreOf(it, r) {
  if (!anySelected(it, r)) return 0;
  if (it.scores) return it.scores[r.sel] || 0;            // 예측추론: 선지별 2/1/0점
  return respString(it, r) === answerString(it) ? 1 : 0;
}
function isCorrect(it, r) {
  if (!anySelected(it, r)) return false;
  if (it.scores) return (it.scores[r.sel] || 0) === it.maxScore;
  return respString(it, r) === answerString(it);
}
// 클릭 하나 처리 → 화면 갱신 필요 여부
function handleClick(it, r, el) {
  if (el.dataset.slot !== undefined) { r.active = Number(el.dataset.slot); return true; }
  const id = el.dataset.id; if (!id) return false;
  if (it.mode === "single") {
    if (r.sel === id) return false;
    if (r.sel !== null) r.changes++;
    r.sel = id; r.history.push(id); return true;
  }
  if (it.mode === "rows") {
    const row = el.dataset.row;
    if (r.sel[row] === id) return false;
    if (r.sel[row]) r.changes++;
    r.sel[row] = id; r.history.push(id); return true;
  }
  if (it.mode === "order") {
    // 이미 번호가 붙은 그림을 다시 누르면 선택 취소(뒤 번호는 하나씩 당겨짐)
    if (r.sel.includes(id)) { r.sel = r.sel.filter((x) => x !== id); r.changes++; r.history.push(`-${id}`); return true; }
    if (r.sel.length >= it.options.length) return false;
    r.sel.push(id); r.history.push(id); return true;
  }
  if (it.mode === "pair") {
    const k = r.active;
    if (r.sel[k] === id) return false;
    if (r.sel[k]) r.changes++;
    r.sel[k] = id; r.history.push(`${k + 1}:${id}`);
    const empty = it.slots.findIndex((_, j) => !r.sel[j]);
    r.active = empty >= 0 ? empty : k;
    return true;
  }
  return false;
}

// ════════════════════════════════════════════════════════════
// 플러그인
// ════════════════════════════════════════════════════════════
const headerHTML = (right = "") => `<div class="math-header"><div class="math-tag">${T.tag}</div><div class="header-right">${right}</div></div>`;

// 안내 화면(버튼으로 진행)
class InfoScreenPlugin {
  static info = {
    name: "info-screen", version: "2.0.0",
    parameters: {
      body_html: { type: ParameterType.HTML_STRING, default: "" },
      buttons: { type: ParameterType.STRING, array: true, default: ["→"] },
      arrow: { type: ParameterType.BOOL, default: false },
      title: { type: ParameterType.BOOL, default: false },
    },
    data: { response: { type: ParameterType.STRING } },
  };
  constructor(jsPsych) { this.jsPsych = jsPsych; }
  trial(el, trial) {
    const done = (label) => this.jsPsych.finishTrial({ response: label });
    if (trial.title) {
      el.innerHTML = `<div class="math-wrap title-wrap"><div class="title-stage"><div class="title-oval"></div>
        <div class="title-text"><div class="title-badge">${UI.battery}</div><div class="title-name">${T.title}</div>
        <div class="title-instr">${linesHTML(T.instr)}</div>
        <button class="title-start" data-i="0"><span class="play"></span>${UI.start}</button></div></div></div>`;
    } else {
      const multi = trial.buttons.length > 1;
      const btns = trial.arrow
        ? `<button class="nav-arrow-btn" data-i="0" aria-label="next" style="position:absolute;right:-68px;top:50%;transform:translateY(-50%)">→</button>`
        : `<div class="btn-row">${trial.buttons.map((b, i) => `<button class="next-btn ${multi && i === 0 ? "secondary-btn" : ""}" data-i="${i}">${b}</button>`).join("")}</div>`;
      el.innerHTML = `<div class="math-wrap"><div class="content-col">${headerHTML()}
        <div style="position:relative">${trial.body_html}${trial.arrow ? btns : ""}</div>${trial.arrow ? "" : btns}</div></div>`;
    }
    applyScale(); fitLines(el);
    el.querySelectorAll("[data-i]").forEach((b) => b.addEventListener("click", () => done(trial.buttons[b.dataset.i] || UI.start)));
  }
}

// 문항(예제·본 문항 공통)
class ItemPlugin {
  static info = {
    name: "reasoning-item", version: "1.0.0",
    parameters: {
      item: { type: ParameterType.COMPLEX, default: undefined },
      practice: { type: ParameterType.BOOL, default: false },
      limit_ms: { type: ParameterType.INT, default: 0 },
      progress: { type: ParameterType.STRING, default: "" },
    },
    data: {
      response: { type: ParameterType.STRING }, correct: { type: ParameterType.BOOL },
      omission: { type: ParameterType.BOOL }, false_alarm: { type: ParameterType.BOOL }, score: { type: ParameterType.INT },
      rt: { type: ParameterType.INT }, decision_time: { type: ParameterType.INT }, total_rt: { type: ParameterType.INT },
      change_count: { type: ParameterType.INT }, change_count_correct: { type: ParameterType.INT },
      change_count_false_alarm: { type: ParameterType.INT }, response_history: { type: ParameterType.STRING },
      reset_count: { type: ParameterType.INT },
    },
  };
  constructor(jsPsych) { this.jsPsych = jsPsych; }
  trial(el, trial) {
    const it = trial.item, r = newResp(it);
    let finished = false, t0 = 0, firstT = null, timeoutId = null, tickId = null;
    const hasExtra = it.prompt || it.promptTop || it.mode === "pair" || it.mode === "order";
    const maxH = hasExtra ? 620 : 680;
    el.innerHTML = `<div class="math-wrap"><div class="content-col">
        ${headerHTML(`<div class="timer-badge" id="timer-badge"></div>${trial.progress ? `<div class="math-progress">${trial.progress}</div>` : ""}`)}
        <div id="stage-root" style="visibility:hidden"></div>
        <div class="btn-row">${it.mode === "order" ? `<button class="tool-btn" id="reset-btn" style="margin-right:18px">${UI.reset}</button>` : ""}
          <button class="next-btn" id="next-btn" disabled>${UI.next}</button></div>
      </div></div>`;
    applyScale();
    const root = el.querySelector("#stage-root"), nextBtn = el.querySelector("#next-btn"), badge = el.querySelector("#timer-badge");
    const draw = () => { root.innerHTML = stageHTML(it, { sel: r.sel, active: r.active }, maxH); nextBtn.disabled = !complete(it, r); };
    draw();
    const end = () => {
      if (finished) return;
      finished = true; clearTimeout(timeoutId); clearInterval(tickId);
      const endT = performance.now(), answered = anySelected(it, r);
      const rt = answered ? Math.round(firstT - t0) : null;
      const dt = answered ? Math.round(endT - firstT) : null;
      const correct = isCorrect(it, r), score = scoreOf(it, r), changes = answered ? r.changes + r.resets : null;
      this.jsPsych.finishTrial({
        response: respString(it, r), correct, omission: !answered, false_alarm: answered && !correct, score,
        rt, decision_time: dt, total_rt: answered ? rt + dt : null,
        change_count: changes, change_count_correct: correct ? changes : null, change_count_false_alarm: answered && !correct ? changes : null,
        response_history: r.history.join(">"), reset_count: it.mode === "order" ? r.resets : null,
      });
    };
    const start = () => {
      root.style.visibility = "visible";
      t0 = performance.now();                    // 그림이 화면에 모두 그려진 시점
      root.addEventListener("click", (e) => {
        const b = e.target.closest("[data-id],[data-slot]");
        if (!b || finished) return;
        if (b.dataset.id && firstT === null) firstT = performance.now();
        if (handleClick(it, r, b)) draw();
      });
      const rb = el.querySelector("#reset-btn");
      if (rb) rb.addEventListener("click", () => { if (finished || !r.sel.length) return; r.sel = []; r.resets++; r.history.push("reset"); draw(); });
      nextBtn.addEventListener("click", () => { if (complete(it, r)) end(); });
      if (trial.limit_ms > 0) {
        tickId = setInterval(() => {
          const remaining = Math.max(0, Math.ceil((trial.limit_ms - (performance.now() - t0)) / 1000));
          if (remaining <= WARN_SEC && remaining > 0) { badge.textContent = `⏱ ${remaining}`; badge.classList.add("on"); }
        }, 200);
        timeoutId = setTimeout(end, trial.limit_ms);
      }
    };
    loadImg(it.img).then(start);
  }
}

// ── 전환 화면 (예시와 같은 디자인) ──
function transitionScreen(lines) {
  return `<div class="math-wrap"><div class="transition-stage">
      <div class="transition-cloud c1"></div><div class="transition-cloud c2"></div><div class="transition-cloud c3"></div>
      <div class="transition-circle"><div class="transition-text">${lines.join("<br>")}</div></div>
      <div class="transition-badge"><svg viewBox="0 0 24 24"><polygon points="12,3 22,20 2,20" fill="#fff"/>
        <rect x="11" y="9" width="2" height="6" fill="#4a74c4"/><circle cx="12" cy="17" r="1.2" fill="#4a74c4"/></svg></div>
    </div></div>`;
}

// ════════════════════════════════════════════════════════════
// 결과 CSV — 본 문항만, 중지 규칙으로 건너뛴 문항은 administered=false
// ════════════════════════════════════════════════════════════
const CSV_COLUMNS = [
  "code_name", "language", "item_index", "difficulty", "time_limit_sec", "correct_answer", "response",
  "correct", "omission", "false_alarm", "score", "rt", "decision_time", "total_rt",
  "change_count", "change_count_correct", "change_count_false_alarm", "response_history", "reset_count",
  "administered", "valid_trial", "interruption_count",
];
function buildFilteredCSVString() {
  const rows = jsPsych.data.get().filter({ phase: `${TEST_ID}_item` }).values();
  const byIndex = {}; rows.forEach((x) => { byIndex[x.item_index] = x; });
  const out = T.items.map((it) => {
    const base = { code_name: subjectId, language: T.lang, item_index: it.n, difficulty: it.diff, time_limit_sec: it.limit, correct_answer: answerString(it) };
    const x = byIndex[it.n];
    return x ? { ...x, ...base, administered: true } : { ...base, administered: false };
  });
  return toCSV(CSV_COLUMNS, out);
}

// ════════════════════════════════════════════════════════════
// 타임라인
// ════════════════════════════════════════════════════════════
const jsPsych = initJsPsych({ on_finish: () => VIT.finish() });
const timeline = [];
const info = (body, extra = {}) => Object.assign({ type: InfoScreenPlugin, body_html: body, buttons: ["→"], arrow: true }, extra);

// 예제 + 해설 (설명 다시 보기를 누르면 타이틀부터 반복)
const lastPractice = () => jsPsych.data.get().filter({ phase: `${TEST_ID}_practice` }).last(1).values()[0] || {};
const intro = [{ type: InfoScreenPlugin, title: true, buttons: [UI.start] }];
T.practice.forEach((it, k) => {
  intro.push({
    type: ItemPlugin, item: it, practice: true, progress: UI.practiceLabel(k + 1),
    data: { phase: `${TEST_ID}_practice`, practice_index: k + 1 },
  });
  intro.push({
    type: InfoScreenPlugin, arrow: true, buttons: ["→"],
    body_html: () => {
      const res = lastPractice();
      const head = res.correct ? UI.practiceRight : UI.practiceCheck;
      return `<div class="info-box explain-box"><div class="explain-tag">${UI.explainTag(k + 1)}</div><div class="explain-head">${head}</div>${linesHTML(it.explain)}</div>
        <div class="mockup-inert">${stageHTML(it, { hl: true }, it.kind === "image" ? 470 : 470)}</div>`;
    },
  });
});
intro.push(info(`<div class="info-box" style="font-size:27px;padding:56px 40px;line-height:2">${linesHTML(UI.readyText)}</div>`,
  { arrow: false, buttons: [UI.replay, UI.begin] }));
timeline.push({ timeline: intro, loop_function: (d) => { const v = d.values(); return v[v.length - 1].response === UI.replay; } });
timeline.push({ type: jsPsychHtmlKeyboardResponse, stimulus: transitionScreen(UI.transition1), choices: "NO_KEYS", trial_duration: 2500 });
timeline.push({ type: jsPsychHtmlKeyboardResponse, stimulus: transitionScreen(UI.transition2), choices: "NO_KEYS", trial_duration: 2500 });

// 본 문항 (연속 3문항 0점이면 이후 문항 생략)
let consecutiveZero = 0;
T.items.forEach((it) => {
  timeline.push({
    conditional_function: () => consecutiveZero < STOP_AFTER,
    timeline: [{
      type: ItemPlugin, item: it, limit_ms: it.limit * 1000, progress: UI.progress(it.n, T.items.length),
      data: { phase: `${TEST_ID}_item`, item_index: it.n },
      on_finish: (d) => { consecutiveZero = d.score > 0 ? 0 : consecutiveZero + 1; },
    }],
  });
});
timeline.push({ type: jsPsychHtmlKeyboardResponse, stimulus: VIT.endStimulus(), choices: "NO_KEYS", trial_duration: VIT.endDuration() });
jsPsych.run(timeline);
