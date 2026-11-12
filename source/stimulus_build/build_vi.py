"""베트남어(vi) 소검사 페이지 생성 — ko/<검사>/data.js 를 바탕으로 '온라인 검사 베트남어 번역' 탭(vi_rows.json)의 번역을 적용.
   - 단어유추(analogy)·언어 단서 결합(verbal_cue)은 베트남어판에서 제외
   - 결과에 기록되는 값(난이도·문항 번호·정답·응답 기호)은 한국어판과 동일하게 유지(결과는 한국어로 저장)
   - 물리적 길이 전이: 그림 아래 한국어 질문 줄을 잘라내고 베트남어 질문(+사물 아이콘)을 화면 글자로 표시"""
import json, os, re, shutil, subprocess, itertools
from PIL import Image
import numpy as np, cv2

R = json.load(open('vi_rows.json'))
ROW = {}
for r in R:
    ROW.setdefault((r['검사 폴더 ID'], str(r['원본 코드 위치'])), str(r['베트남어 번역 입력']).strip())
NAME = 'Bài kiểm tra Năng lực Suy luận'          # 사용자 요청: 'Hàn Quốc' 제외
def fixname(s): return s.replace('Bài kiểm tra Năng lực Suy luận Hàn Quốc', NAME)
EXCLUDE = {'analogy', 'verbal_cue'}
FOLDERS = ['picture_concepts', 'problem_solving', 'raven', 'pattern', 'rotation', 'picture_arrangement',
           'dls', 'verbal_reasoning', 'number_series', 'predictive', 'transitivity']
SRC, OUT = 'app/ko', 'app/vi'
KEEP = {'instr', 'explain', 'n', 'diff', 'id', 'code', 'lang', 'img', 'mode', 'answer', 'excel_item', 'row', 'rows', 'seq'}  # 기록용·구조 값

def lines_of(s): return [l.strip() for l in re.split(r'\n|<br>', s) if l.strip()]
def join_comma(lines):
    out = []
    for l in lines:
        if out and out[-1].endswith(','): out[-1] += ' ' + l
        else: out.append(l)
    return out
def _w(s):
    s = re.sub(r'<[^>]+>', '', s); return sum(0.3 if c == ' ' else 0.55 for c in s)
def sentences(text): return [x.strip() for x in re.split(r'(?<=[.?!])\s+', ' '.join(lines_of(text))) if x.strip()]
def pack(text, cap=78, max_lines=4):
    S = sentences(text); n = len(S); cands = []
    for k in range(min(2, n), n + 1):
        for cuts in itertools.combinations(range(1, n), k - 1):
            b = (0,) + cuts + (n,)
            L = [' '.join(S[b[i]:b[i + 1]]) for i in range(k)]
            cands.append((max(_w(l) for l in L), k, L))
    fit = [c for c in cands if c[0] <= cap]
    if fit: return min(fit, key=lambda c: (c[1], c[0]))[2]
    return min([c for c in cands if c[1] <= max_lines] or cands, key=lambda c: (c[0], c[1]))[2]

def load_ko(folder):
    js = subprocess.run(['node', '-e', f'global.window={{}};require("./{SRC}/{folder}/data.js");const T=window.TASK;delete T.ui;console.log(JSON.stringify(T))'],
                        capture_output=True, text=True, check=True).stdout
    return json.loads(js)

MISSING = []
def tr(folder, path, ko):
    v = ROW.get((folder, path))
    if v is None: MISSING.append((folder, path, ko)); return ko
    return fixname(v)

def walk(folder, obj, path):
    if isinstance(obj, dict):
        return {k: (v if k in KEEP else walk(folder, v, f'{path}.{k}')) for k, v in obj.items()}
    if isinstance(obj, list):
        return [walk(folder, v, f'{path}[{i}]') for i, v in enumerate(obj)]
    if isinstance(obj, str) and re.search(r'[가-힣]', obj):
        return tr(folder, path, obj)
    return obj

# ── 물리적 길이 전이: 질문 줄 잘라내기 + 아이콘 ──
CUT = 860
def ptt_icons(src):
    im = Image.open(src).convert('RGB'); A = np.array(im)[CUT:]
    g = cv2.cvtColor(A, cv2.COLOR_RGB2GRAY); hsv = cv2.cvtColor(A, cv2.COLOR_RGB2HSV)
    m = cv2.dilate((g < 215).astype(np.uint8), np.ones((5, 5), np.uint8))
    k, lab, st, _ = cv2.connectedComponentsWithStats(m)
    parts = []
    for i in range(1, k):
        x, y, w, h, a = st[i]
        if a < 30 or h < 10: continue
        sat = hsv[y:y + h, x:x + w, 1][lab[y:y + h, x:x + w] == i].mean()
        if h > 80 or w > 100 or sat > 40: parts.append((x, y, w, h))
    parts.sort(); groups = []
    for x, y, w, h in parts:
        if groups and x < groups[-1][2] + 15:
            G = groups[-1]; groups[-1] = [min(G[0], x), min(G[1], y), max(G[2], x + w), max(G[3], y + h)]
        else: groups.append([x, y, x + w, y + h])
    return im, groups[:2]

def ptt_item(it, folder_out, key):
    src = f"{SRC}/transitivity/{it['img']}"
    im, icons = ptt_icons(src)
    W, H = im.size
    im.crop((0, 0, W, CUT)).save(f"{folder_out}/{it['img']}", quality=86)
    it['ar'] = round(W / CUT, 5)
    for o in it['options']:
        x, y, w, h = o['box']; o['box'] = [x, round(y * H / CUT, 4), w, round(h * H / CUT, 4)]
    return im, icons

def build():
    # 질문 문장(이미지 안 한국어) — 문항 ID 로 찾기
    PROMPT = {}
    for r in R:
        if r['검사 폴더 ID'] == 'transitivity' and str(r['원본 코드 위치']) == 'image.prompt':
            m = re.search(r'(ex\d|\d\d)\.jpg', str(r['원본 이미지 URL'])); PROMPT[m.group(1)] = str(r['베트남어 번역 입력']).strip()
    if os.path.exists(OUT):
        for f in os.listdir(OUT):
            p = f'{OUT}/{f}'
            if os.path.isdir(p): shutil.rmtree(p)
    for folder in FOLDERS:
        T = load_ko(folder)
        V = walk(folder, T, 'TASK')
        V['lang'] = 'vi'
        name = tr(folder, f'tasks[{folder}].name.ko', T['title'])
        V['tag'] = V['title'] = name
        instr = join_comma(lines_of(tr(folder, 'TASK.instr', '')))
        if folder == 'number_series': instr = [instr[0] + ' ' + instr[1]] + instr[2:]
        if folder == 'picture_concepts': instr = [instr[0] + ' ' + instr[1]] + instr[2:]   # 짧은 두 문장 한 줄로(수정 요청)
        if folder == 'pattern': V['titleHTML'] = name.replace('_', '_<br>', 1)   # 제목은 '_' 뒤에서 줄바꿈
        V['instr'] = instr
        d = f'{OUT}/{folder}'; os.makedirs(d + '/images', exist_ok=True)
        if folder != 'transitivity':
            for f in os.listdir(f'{SRC}/{folder}/images'): shutil.copy(f'{SRC}/{folder}/images/{f}', f'{d}/images/{f}')
        for kind in ('practice', 'items'):
            for i, (ko_it, it) in enumerate(zip(T[kind], V[kind])):
                if 'explain' in ko_it:
                    it['explain'] = sentences(tr(folder, f'TASK.{kind}[{i}].explain', ''))   # 줄 묶기는 화면에서 실제 폭을 재서 처리(engine.js layoutVi)
                if folder == 'transitivity':
                    key = it['img'].split('/')[-1][:-4]
                    im, icons = ptt_item(it, d, key)
                    text = PROMPT[key]
                    if icons and '[' in text:
                        tail = re.sub(r'^\[[^\]]*\]\s*và\s*\[[^\]]*\],?\s*', '', text)
                        for j, (x0, y0, x1, y1) in enumerate(icons):
                            im.crop((x0 - 2, CUT + y0 - 2, x1 + 2, CUT + y1 + 2)).save(f'{d}/images/{key}_q{j + 1}.png')
                        ic = lambda j: f'<img class="q-icon" src="images/{key}_q{j}.png" alt="">'
                        it['prompt'] = f'{ic(1)} và {ic(2)}, {tail}'
                    else:
                        it['prompt'] = text
        js = (f'/* {name} — tiếng Việt (tools/build_vi.py 로 생성: 번역 시트 \'온라인 검사 베트남어 번역\')\n'
              '   n·diff·answer 등 결과에 기록되는 값은 한국어판과 동일 */\n'
              'window.TASK = ' + json.dumps(V, ensure_ascii=False, indent=1) + ';\nwindow.TASK.ui = ' + UI_VI + ';\n')
        open(f'{d}/data.js', 'w').write(js)
        page = open(f'{SRC}/{folder}/index.html').read().replace('<html lang="ko">', '<html lang="vi">')
        page = re.sub(r'<title>.*?</title>', f'<title>{name} - {NAME}</title>', page)
        open(f'{d}/index.html', 'w').write(page)
        print(folder, 'ok', len(V['items']))
    print('missing translations:', len(MISSING))
    for m in MISSING: print('  ', m)

UI_VI = r"""{
  battery: "Bài kiểm tra Năng lực Suy luận", start: "Bắt đầu", next: "Tiếp theo", reset: "Làm lại",
  replay: "Xem lại hướng dẫn", begin: "Làm bài",
  practiceLabel: (k) => `Ví dụ ${k}`, explainTag: (k) => `Giải thích ví dụ ${k}`,
  practiceRight: "<b>Giỏi lắm! Con trả lời đúng rồi.</b>", practiceCheck: "<b>Chúng ta cùng xem đáp án nhé?</b>",
  readyText: ["Bây giờ chúng ta bắt đầu làm bài.", "Mỗi câu <b>sẽ tự động chuyển khi hết thời gian giới hạn</b>, nếu con đã làm xong thì hãy nhấn <b>'Tiếp theo'</b>.", "Nếu muốn xem lại hướng dẫn, hãy nhấn <b>'Xem lại hướng dẫn'</b>, nếu muốn bắt đầu, hãy nhấn <b>'Làm bài'</b>."],
  transition1: ["Khi hết <b>thời gian giới hạn</b>", "câu hỏi sẽ tự động chuyển.", "Nếu con đã làm xong,", "hãy nhấn <b>'Tiếp theo'</b>."],
  transition2: ["Hãy làm bài", "<b>thật chính xác và nhanh</b>", "nhất có thể nhé."],
  progress: (i, n) => `Câu ${i} / ${n}`,
}"""

if __name__ == '__main__': build()
