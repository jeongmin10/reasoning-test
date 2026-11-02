"""소검사 13개 페이지(ko/<폴더>/index.html, data.js, images/) 생성.
   원자료: excel_items.json(개발시트), build/meta/layout.json(자극책자 그림·누를 영역), build/meta/ptt.json(길이 전이 사물)"""
import json, os, re, shutil
from PIL import Image
X = json.load(open('excel_items.json'))
LAY = json.load(open('build/meta/layout.json'))
PTT = json.load(open('build/meta/ptt.json'))
OUT = 'app/ko'
LIMIT = {'low': 20, 'mid': 30, 'high': 50, 'top': 50}
DIFF_KO = {'low': '하', 'mid': '중', 'high': '상', 'top': '최상'}
BR = '<br>'

TASKS = [
 # folder, code, 이름(타이틀·헤더), 지시문(자극책자 문구, 온라인용으로 대면 표현만 수정)
 ('picture_concepts', 'PC', '공통그림찾기', [
   '지금부터 그림 문제를 풀어볼 거예요.', '하나의 줄마다 그림이 여러 개씩 나올 거예요.',
   '서로 잘 어울린다고 생각하는 그림을 각 줄마다 하나씩, 줄의 개수만큼 골라주세요.',
   '고른 그림들은 서로 비슷하거나 같은 점이 하나씩 있어요.',
   '여러가지 비슷한 점이 있을 수 있지만, 가장 중요한 특징을 생각해서 골라주세요.']),
 ('problem_solving', 'PS', '문제해결', [
   '지금부터 그림을 보면서 문제를 풀 거예요.',
   '먼저 어떤 일이 벌어졌는지 자세히 보고, 그 상황을 해결하는 데 가장 잘 맞는 그림 하나를 골라주세요.',
   '그림 속 사람은 무엇을 하려고 하는지,', '그리고 어떤 일이 일어날지 생각해 보세요.']),
 ('raven', 'RPM', '레이븐 추론', [
   '지금부터 그림 문제를 풀 거예요.', '그림들이 어떤 규칙에 따라 놓여 있는지 잘 살펴보세요.',
   '위 그림에서 한 칸이 비어 있는데,', '그 자리에 들어갈 무늬(혹은 그림) 하나를 아래에서 골라주세요.',
   '전체 그림을 잘 보고, 어울리는 규칙을 찾아서 가장 맞는 것을 고르면 됩니다.']),
 ('verbal_cue', 'VCI', '언어 단서 결합 추론 과제', [
   '지금부터 설명을 읽고 문제를 풀 거예요.', '설명에는 몇 가지 조건이 들어 있어요.',
   '그림들을 잘 보고, 설명에 나온 조건을 모두 만족하는 것 하나를 고르세요.',
   '어떤 그림은 조건을 일부만 만족할 수도 있습니다.', '모든 조건을 다 만족하는 것 하나만 선택하면 됩니다.']),
 ('pattern', 'PT', '패턴 검사_반복/성장', [
   '지금부터 그림들이 순서대로 나올 거예요.', '그림이 어떻게 바뀌는지 잘 살펴보세요.',
   '어떤 규칙으로 바뀌는지 생각한 다음에,', '물음표 자리에 올 그림을 아래 보기 중에서 가장 적절한 것 하나를 골라주세요.']),
 ('analogy', 'VA', 'A:B = C:D (단어유추)', [
   '지금부터 단어와 그림 문제를 풀 거예요.', '윗줄의 두 개가 어떤 관계인지를 잘 보고,',
   '똑같은 방법으로 아랫줄의 물음표에 무엇이 와야 할지 생각한 다음,', '아래 네 개 중에서 골라 눌러 보세요.']),
 ('rotation', 'ROT', '3차원 회전', [
   '지금부터 입체 그림 문제를 풀 거예요.', '위에 있는 큐브를 손으로 돌린다고 생각해 보세요.',
   '실제로 돌리지는 말고, 머릿속으로만 돌려서 생각하면 됩니다.',
   '아래에 있는 그림들 중에서, 위 그림을 돌렸을 때 나올 수 있는 모습 하나를 골라주세요.',
   '그림의 방향만 달라질 수 있고, 모양이 달라지면 안 됩니다.']),
 ('picture_arrangement', 'PA', '차례맞추기', [
   '지금부터 그림을 보면서 문제를 풀 거예요.', '그림들은 하나의 이야기를 나타내고 있지만, 순서가 섞여서 나와 있어요.',
   '그림들을 잘 보고, 어떤 일이 먼저 일어나고,', '그 다음에 어떤 일이 일어나는지 생각해보세요.',
   '그림들을 이야기가 자연스럽게 이어지도록 순서대로 눌러 주세요.', "순서를 다시 고르려면 '다시 하기'를 누르면 됩니다."]),
 ('dls', 'DLS', '더비셔 언어 체계 검사', [
   '지금부터 그림을 보면서 질문을 읽어볼 거예요.', '질문을 잘 읽고, 맞는 그림을 눌러 주세요.']),
 ('verbal_reasoning', 'VR', '언어적 추론', [
   '지금부터 글을 보고 문제를 풀 거예요.', '글에 나온 내용을 바탕으로, 확실하게 알 수 있는 것만 선택해 주세요.']),
 ('number_series', 'NS', '숫자연속추론', [
   '지금부터 숫자 문제를 풀 거예요.', '숫자들이 순서대로 나와 있어요.',
   '숫자들이 어떤 규칙으로 이어지고 있는지 잘 보고,', '다음에 올 숫자 하나를 아래에서 골라주세요.',
   '어려운 계산을 할 필요는 없고, 숫자가 바뀌는 순서를 잘 보면 맞힐 수 있어요.']),
 ('predictive', 'PI', '예측추론 과제', [
   '지금부터 한 아이에 대한 이야기를 읽어볼 거예요.', '먼저 그 아이가 어떤 행동을 했는지 두 가지 이야기가 나와요.',
   '이야기를 잘 읽고, 그 다음에 새로운 상황에서 그 아이가 어떻게 할지 생각해 보세요.',
   '아래 네 가지 중에서 그 아이가 할 행동으로 가장 알맞은 것 하나를 골라주세요.']),
 ('transitivity', 'PTT', '물리적 길이 전이 과제', [
   '지금부터 여러 사물 그림을 보면서 문제를 풀 거예요.', '각 그림에서 어떤 물건이 더 긴지 잘 살펴보세요.',
   '그림들 사이의 관계를 바탕으로, 직접 비교되지 않은 사물들도 판단해야 합니다.',
   '전체 그림을 보고 더 길다고 생각하는 것을 그림에서 눌러 골라주세요.']),
]

# 예제 해설(자극책자 해설 페이지 문구; 대면 표현만 온라인용으로 수정)
EXPLAIN = {
 'picture_concepts': ['윗줄에는 사과, 신발, 테이프가 있고,<br>아랫줄에는 달력, 포도, 풍선이 있어요.<br>이 중에서 사과와 포도는 둘 다 과일이에요.<br>그래서 정답은 사과와 포도예요.',
                      '첫 번째 줄에는 나무, 공, 철봉이 있고,<br>두 번째 줄에는 풀잎, 클립, 촛불,<br>세 번째 줄에는 손수건, 자전거, 꽃이 있어요.<br>이 중에서 나무, 풀잎, 꽃은 모두 식물이에요.<br>그래서 정답은 나무와 풀잎과 꽃이에요.'],
 'problem_solving': ['그림을 보면 책상 위에 쓰레기가 있어요.<br>첫 번째 그림은 그냥 지나치는 그림이고,<br>두 번째 그림은 쓰레기를 주워 쓰레기통에 넣은 그림이에요.<br>이 상황을 해결하려면, 두 번째 그림처럼 행동해야 해요.',
                     '그림을 보면 컵이 책상 끝에 있어서 떨어질 수 있어요.<br>첫 번째 그림은 컵이 떨어지지 않게 놔두고 있는 모습이고, 두 번째 그림은 사진을 찍고 있는 모습이에요.<br>세 번째 그림은 컵을 밀어서 떨어뜨리는 모습이고, 네 번째 그림은 가만히 쳐다보고 있는 모습이에요.<br>이 상황을 해결하려면, 첫 번째 그림처럼 행동해야 해요.'],
 'raven': ['이 문제에서는 같은 무늬가 반복되는 규칙을 찾는 것이 중요합니다.<br>제시된 그림들을 보면, 검은 선들이 세로로 곧게 반복되는 줄무늬 모양입니다.<br>따라서 빈칸에도 같은 방향과 모양의 무늬가 들어가야 합니다.<br>세로 방향의 줄무늬가 반복되고 있는 그림을 찾으면, 보기 중 1번이 정답이 됩니다.',
           '이 문제에서는 같은 무늬가 반복되는 규칙을 찾는 것이 중요합니다.<br>제시된 그림들을 보면, 같은 형태와 크기의 별 모양 무늬입니다.<br>따라서 빈칸에도 같은 형태와 크기의 무늬가 들어가야 합니다.<br>별 모양의 무늬가 반복되고 있는 그림을 찾으면, 보기 중 2번이 정답이 됩니다.'],
 'verbal_cue': ["설명에 'ㅂ으로 시작하고, 옷인 것'이라는 조건이 있어요.<br>사과는 ㅂ으로 시작하지 않고 옷도 아니고,<br>핸드폰도 ㅂ으로 시작하지 않고 옷이 아니에요.<br>바지는 ㅂ으로 시작하고 옷이니까, 정답은 '바지'예요.",
                "설명에 'ㄱ으로 시작하고, 동물인 것'이라는 조건이 있어요.<br>고양이는 ㄱ으로 시작하고 동물이지만,<br>의자와 풀잎은 ㄱ으로 시작하지도 않고 동물도 아니에요.<br>고양이는 ㄱ으로 시작하고 동물이니까, 정답은 '고양이'예요."],
 'pattern': ['그림을 보면 빨간색 네모, 파란색 세모, 두 가지 모양이 번갈아서 나오고 있어요.<br>이렇게 빨간색 네모, 파란색 세모가 반복되는 규칙이에요.<br>그래서 빨간색 네모 다음에는 파란색 세모가 와야 해요.<br>따라서 정답은 3번이에요.',
             '그림을 보면 파란색 네모, 노란색 동그라미, 초록색 세모가 한 묶음으로 반복되고 있어요.<br>이렇게 파란색 네모, 노란색 동그라미, 초록색 세모가 반복되는 규칙이에요.<br>그래서 초록색 세모 다음에는 다시 한 묶음이 와야 해요.<br>따라서 정답은 4번이에요.'],
 'analogy': ["양말은 발에 신는 물건이에요.<br>장갑은 어디에 쓰는지 생각해 보면,<br>장갑은 손에 끼니까, 정답은 ③번 '손'이에요.",
             "덥다와 춥다는 반대되는 단어예요.<br>밝다의 반대는 무엇일지 생각해 보면,<br>정답은 ①번 '어둡다'예요."],
 'rotation': ['이 큐브는 오른쪽 방향으로 세 번 돌리면 됩니다.<br>처음에는 윗면에 정사각형, 왼쪽에는 빈 동그라미, 오른쪽에는 엑스가 있습니다.<br>이 상태에서 오른쪽으로 돌리면 윗면의 모양은 그대로지만, 옆면의 모양이 순서대로 바뀌게 됩니다.<br>빈 동그라미와 엑스가 번갈아 나타나는 순서를 따라가면, 보기 중 3번이 같은 모양이 됩니다.',
              '이 큐브는 위쪽 방향으로 세 번 돌리면 됩니다.<br>처음에는 윗면에 동그라미, 왼쪽에는 정사각형, 오른쪽에는 마름모가 있습니다.<br>위로 돌릴 때마다 윗면과 옆면의 모양이 순서대로 바뀝니다.<br>동그라미, 정사각형, 동그라미, 정사각형 순서를 따라가면, 보기 중 2번이 같은 모양이 됩니다.'],
 'picture_arrangement': ['첫 번째 그림을 보면 남자아이가 문 손잡이를 잡고 문을 열고 있어요.<br>두 번째 그림은 문 밖으로 걸어 나가고 있는 모습이에요.<br>세 번째 그림은 문 앞에 서 있는 모습이에요.<br>이 이야기는 남자아이가 문을 열고 나가는 모습을 그려내고 있기 때문에<br>순서는 3번 → 1번 → 2번이에요.',
                         '첫 번째 그림을 보면 책을 손에 들고 있어요.<br>두 번째 그림은 책을 펼쳐 읽기 시작하는 모습이에요.<br>세 번째 그림은 책을 거의 다 읽어서 페이지가 얼마 남지 않은 모습이에요.<br>이 이야기는 책을 읽는 과정을 그려내고 있기 때문에<br>순서는 1번 → 2번 → 3번이에요.'],
 'dls': ["그림을 보면, 공, 블록, 곰 인형, 의자가 있어요.<br>질문은 '공을 눌러 주세요'이니까, 정답은 공이에요.",
         "그림을 보면, 사과, 컵, 모자, 자동차가 있어요.<br>질문은 '자동차를 눌러 주세요'이니까, 정답은 자동차예요."],
 'verbal_reasoning': ['글을 보면, 비가 오는 날에는 우산을 가져온다고 했어요.<br>오늘은 비가 온다고 했으니까,<br>민수는 우산을 가져왔다는 것을 알 수 있어요.<br>따라서 정답은 1번이에요.',
                      '글을 보면, 모든 고양이는 동물이라고 했어요.<br>그리고 구름이는 고양이라고 했으니까,<br>구름이는 동물이라는 것을 알 수 있어요.<br>따라서 정답은 2번이에요.'],
 'number_series': ['숫자를 보면 1 다음에 2가 나와 있어요.<br>이 문제는 숫자가 하나씩 커지는 규칙이에요.<br>그래서 1 다음은 2, 그 다음은 3이 와야 해요.<br>따라서 빈칸에 올 숫자는 3이에요.',
                   '숫자를 보면 2 다음에 4, 그 다음에 6이 나와 있어요.<br>이 문제는 숫자가 두 칸씩 커지는 규칙이에요.<br>그래서 2 다음은 4, 그 다음은 6, 그 다음은 8이 와야 해요.<br>따라서 빈칸에 올 숫자는 8이에요.'],
 'predictive': ['이 아이는 친구에게 사탕을 나누어 주고, 친구가 색연필이 없으면 빌려주는 행동을 해요.<br>그래서 이 아이는 다른 사람과 물건을 나누거나 도와주는 성향이 있어요.<br>이 상황에서도 친구가 지우개가 없으면, 지우개를 빌려주거나 나누어 줄 거예요.',
                '이 아이는 친구가 넘어지면 도와주고, 무거운 가방을 들고 있으면 대신 들어줘요.<br>그래서 이 아이는 친구가 힘들어할 때 도와주는 성향이 있어요.<br>이 상황에서도 친구가 책을 많이 들고 힘들어하면, 책을 대신 들어주거나 함께 들어줄 거예요.'],
 'transitivity': ['이 문제에서는 물건의 길이를 비교한 관계를 연결해서 보아야 합니다.<br>먼저, 지우개는 연필보다 짧고, 연필은 자보다 짧습니다.<br>이 두 관계를 이어서 생각하면, 지우개 &lt; 연필 &lt; 자 순서로 긴 것이 됩니다.<br>따라서, 지우개와 자를 비교하면 자가 더 깁니다.',
                  '이 문제에서는 물건의 길이를 비교한 관계를 연결해서 보아야 합니다.<br>먼저, 이층버스는 스쿨버스보다 짧고, 스쿨버스는 고속버스보다 짧습니다.<br>이 두 관계를 이어서 생각하면, 이층버스 &lt; 스쿨버스 &lt; 고속버스 순서로 긴 것이 됩니다.<br>따라서, 이층버스와 고속버스를 비교하면 고속버스가 더 깁니다.'],
}

UI_KO = r"""{
  battery: "한국추론능력검사", start: "시작하기", next: "다음", reset: "다시 하기",
  replay: "설명 다시 보기", begin: "검사하기",
  practiceLabel: (k) => `예제 ${k}`, explainTag: (k) => `예제 ${k} 해설`,
  practiceRight: "<b>잘했어요! 정답이에요.</b>", practiceCheck: "<b>정답을 함께 확인해 볼까요?</b>",
  readyText: "이제 검사를 시작합니다.<br>각 문제는 <b>제한시간이 지나면 자동으로 넘어가고</b>,<br>다 풀었으면 <b>'다음'</b>을 누르세요.<br><br>설명을 다시 보려면 <b>'설명 다시 보기'</b>를,<br>검사를 시작하려면 <b>'검사하기'</b>를 눌러주세요.",
  transition1: ["<b>제한시간</b>이 지나면", "자동으로 넘어가고,", "다 풀었으면", "<b>'다음'</b>을 누르세요."],
  transition2: ["최대한", "<b>정확하고 빠르게</b>", "문제를 풀어주세요."],
  progress: (i, n) => `문제 ${i} / ${n}`,
}"""

def lab_key(label): return 'ex' + label[1:] if label.startswith('P') else f'{int(label):02d}'

def img_item(task, lay_item, size):
    w, h = size
    return dict(kind='image', img=f"images/{lay_item['img']}", ar=round(w / h, 5))

def recrop_dls(task_dir, lay):
    """더비셔: 그림 아래 질문 문장(대면용 '가리켜 주세요')은 화면 글자로 바꾸므로 그림에서 잘라냄"""
    W, H = lay['size']
    out = {}
    for it in lay['items']:
        bx = [o['box'] for o in it['options']]
        x0 = min(b[0] for b in bx); y0 = min(b[1] for b in bx); x1 = max(b[0] + b[2] for b in bx); y1 = max(b[1] + b[3] for b in bx)
        pad = 0.012
        x0, y0, x1, y1 = max(0, x0 - pad), max(0, y0 - pad), min(1, x1 + pad), min(1, y1 + pad)
        im = Image.open(f"build/img/dls/{it['img']}")
        c = im.crop((round(x0 * W), round(y0 * H), round(x1 * W), round(y1 * H)))
        c.save(f"{task_dir}/images/{it['img']}", quality=86)
        nb = [[round((b[0] - x0) / (x1 - x0), 4), round((b[1] - y0) / (y1 - y0), 4), round(b[2] / (x1 - x0), 4), round(b[3] / (y1 - y0), 4)] for b in bx]
        out[it['label']] = (nb, round(c.width / c.height, 5))
    return out

def build():
    if os.path.exists(OUT): shutil.rmtree(OUT)
    summary = []
    for folder, code, name, instr in TASKS:
        d = f'{OUT}/{folder}'; os.makedirs(d + '/images', exist_ok=True)
        ex = X[folder]; lay = LAY.get(folder)
        if lay and folder != 'dls':
            for it in lay['items']: shutil.copy(f"build/img/{folder}/{it['img']}", f"{d}/images/{it['img']}")
        dls = recrop_dls(d, lay) if folder == 'dls' else None
        items = []
        for k, e in enumerate(ex):
            label = e['label']; practice = label.startswith('P')
            it = dict(n=('예제 ' + label[1:]) if practice else int(label), diff=DIFF_KO.get(e['diff'], '연습'),
                      limit=None if practice else LIMIT[e['diff']])
            li = lay['items'][k] if lay else None
            if li: assert li['label'] == label, (folder, li['label'], label)
            if folder == 'picture_concepts':
                it.update(img_item(folder, li, lay['size']), mode='rows',
                          options=[dict(id=o['id'], row=str(o['row']), box=o['box']) for o in li['options']],
                          rows=[str(r + 1) for r in range(len(e['rows']))],
                          answer=[f"{r + 1}-{c}" for r, c in enumerate(e['answer'])])
            elif folder in ('problem_solving', 'raven', 'verbal_cue', 'pattern', 'analogy', 'rotation'):
                it.update(img_item(folder, li, lay['size']), mode='single',
                          options=[dict(id=o['id'], box=o['box']) for o in li['options']], answer=str(e['answer']))
            elif folder == 'dls':
                nb, ar = dls[label]
                prompt = re.sub(r'가리켜\s*주세요', '눌러 주세요', str(e['prompt']).strip())
                it.update(kind='image', img=f"images/{li['img']}", ar=ar, mode='single', prompt=prompt,
                          options=[dict(id=str(i + 1), box=b) for i, b in enumerate(nb)], answer=str(e['answer']))
            elif folder == 'picture_arrangement':
                order = sorted(range(len(e['posF'])), key=lambda i: e['posF'][i])
                it.update(img_item(folder, li, lay['size']), mode='order',
                          options=[dict(id=o['id'], box=o['box']) for o in li['options']], answer=[str(i + 1) for i in order])
            elif folder == 'transitivity':
                p = PTT[label]
                assert p['excel_label'] == label or label in ('9', '10')
                it.update(img_item(folder, li, lay['size']),
                          options=[dict(id=o['id'], label=o['name'], box=o['box']) for o in p['options']],
                          names={o['id']: o['name'] for o in p['options']})
                ans = p['answer_name'].split('\n')[0].strip()
                inv = {v: k for k, v in it['names'].items()}
                if label in ('17', '18'):
                    m = re.findall(r'(짧은 것|긴 것):\s*(.+)', p['answer_name'])
                    it.update(mode='pair', slots=['가장 짧은 것', '가장 긴 것'], answer=[inv[m[0][1].strip()], inv[m[1][1].strip()]])
                else:
                    it.update(mode='single', answer=inv[ans])
                it['excel_item'] = p['excel_label']
            elif folder == 'verbal_reasoning':
                it.update(kind='vr', mode='single', premise=[l for l in e['premise'] if '알 수 있는 것은' not in l], question='이 내용으로 알 수 있는 것은 무엇일까요?',
                          options=[dict(id=str(i + 1), text=t) for i, t in enumerate(e['options'])], answer=str(e['answer']))
            elif folder == 'number_series':
                it.update(kind='ns', mode='single', seq=[s for s in e['seq'] if s != '?'] + ['?'],
                          options=[dict(id=str(i + 1), text=t) for i, t in enumerate(e['options'])], answer=str(e['answer']))
            elif folder == 'predictive':
                lines = [l.strip().replace('ㅇㅇ', 'ㅇㅇ') for l in str(e['text']).split('\n') if l.strip()]
                lines = [re.sub(r'^예측추론 질문:\s*$', '예측추론 질문:', l) for l in lines]
                # '예측추론 질문:' 뒤에 줄바꿈이 있는 문항은 한 줄로 합침
                merged = []
                for l in lines:
                    if merged and merged[-1].endswith('질문:'): merged[-1] += ' ' + l
                    else: merged.append(l)
                it.update(kind='pi', mode='single', lines=merged,
                          options=[dict(id=str(i + 1), text=t) for i, t in enumerate(e['options'])],
                          scores={str(i + 1): s for i, s in enumerate(e['scores'])}, maxScore=2, answer=str(e['answer']))
            if practice:
                it['explain'] = EXPLAIN[folder][int(label[1:]) - 1]
            items.append(it)
        prac = [i for i in items if isinstance(i['n'], str)]; main = [i for i in items if not isinstance(i['n'], str)]
        assert len(prac) == 2 and len(main) == 20, folder
        task = dict(id=folder, code=code, lang='ko', tag=name, title=name, instr=BR.join(instr), practice=prac, items=main)
        js = ('/* ' + name + ' — 문구·문항·정답·제한시간 (tools/build_tasks.py 로 생성)\n'
              '   items[].answer : 정답 / limit : 제한시간(초) / options[].box : 그림에서 누를 영역(가로·세로 비율) */\n'
              'window.TASK = ' + json.dumps(task, ensure_ascii=False, indent=1) + ';\nwindow.TASK.ui = ' + UI_KO + ';\n')
        open(f'{d}/data.js', 'w').write(js)
        open(f'{d}/index.html', 'w').write(PAGE.replace('{{NAME}}', name))
        cnt = {}
        for i in main: cnt[i['diff']] = cnt.get(i['diff'], 0) + 1
        summary.append((folder, code, name, cnt, sum(i['limit'] for i in main)))
    for s in summary: print(s)

PAGE = """<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>{{NAME}} - 한국추론능력검사</title>
<script src="../../vendor/jspsych.js"></script>
<script src="../../vendor/plugin-html-keyboard-response.js"></script>
<script src="../../assets/flow.js"></script>
<link href="../../vendor/jspsych.css" rel="stylesheet" type="text/css" />
<link href="../../assets/reasoning/engine.css" rel="stylesheet" type="text/css" />
</head>
<body></body>
<!-- 문항·문구는 data.js, 화면 흐름·채점은 assets/reasoning/engine.js -->
<script src="data.js"></script>
<script src="../../assets/reasoning/engine.js"></script>
</html>
"""
if __name__ == '__main__': build()
