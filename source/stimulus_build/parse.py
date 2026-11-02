import openpyxl, json, re
wb=openpyxl.load_workbook('dev.xlsx', data_only=True)
def rows(name):
    ws=wb[name]; out=[]
    for r in ws.iter_rows(min_row=10):
        d={c.column_letter:c.value for c in r if c.value not in (None,'') and not (isinstance(c.value,str) and not c.value.strip())}
        if d: out.append(d)
    return out
def lab(v):
    if v is None: return None
    s=str(v).strip()
    if s.startswith('연습'): return 'P'+s.replace('연습','').strip()
    try: return str(int(float(s)))
    except: return None
def num(v):
    m=re.match(r'\s*(\d+)', str(v)); return int(m.group(1)) if m else None
def blocks(name, start_col='C'):
    """group rows into items: an item starts when column C has a label"""
    items=[]
    for d in rows(name):
        l=lab(d.get('C'))
        if l:
            items.append({'label':l,'row':d,'sub':[]})
        elif items: items[-1]['sub'].append(d)
    out=[];seen=set()
    for it in items:
        if it['label'] in seen: break
        seen.add(it['label']); out.append(it)
        if it['label']=='20': break
    return out
DIFF={'연습':'practice','하':'low','중':'mid','상':'high','최상':'top'}
def diff(d): return DIFF.get(str(d.get('D','')).strip(),'?')
T={}
# 공통그림찾기
T['picture_concepts']=[]
for it in blocks('1-1. 공통그림찾기'):
    d=it['row']; rws=[[x.strip() for x in line.split('/')] for line in str(d['E']).split('\n') if line.strip()]
    ans=[x.strip() for x in str(d['G']).split('/')]
    idx=[]
    for r in rws:
        hit=[i for i,x in enumerate(r) if re.sub(r'\(.*?\)|\s','',x) in [re.sub(r'\(.*?\)|\s','',a) for a in ans]]
        idx.append(hit[0]+1 if len(hit)==1 else None)
    T['picture_concepts'].append(dict(label=it['label'],diff=diff(d),rows=rws,answer=idx,rule=d.get('F')))
# 문제해결 / DLS / 언어단서 : option rows
def opt_items(name, optcol, flagcol, flagval):
    out=[]
    for it in blocks(name):
        d=it['row']; subs=[d]+it['sub'] if d.get(optcol) and name.startswith('2-2') else it['sub']
        opts=[s.get(optcol) for s in subs if s.get(optcol)]
        flags=[str(s.get(flagcol,'')) for s in subs if s.get(optcol)]
        ans=[i+1 for i,f in enumerate(flags) if flagval in f]
        out.append(dict(label=it['label'],diff=diff(d),prompt=d.get('E') if not name.startswith('4-2') else d.get('E'),options=opts,answer=ans[0] if len(ans)==1 else ans))
    return out
T['problem_solving']=opt_items('4-2. 문제해결','E','G','정답')
T['dls']=opt_items('2-4. 더비셔 언어 체계 검사','E','G','정답')
T['verbal_cue']=opt_items('2-2. 언어 단서 결합 추론 과제','F','G','모두 충족')
for it,b in zip(T['verbal_cue'],blocks('2-2. 언어 단서 결합 추론 과제')):
    it['answer_name']=b['row'].get('H'); it['answer']=[o.strip() for o in it['options']].index(str(it['answer_name']).strip())+1
T['raven']=[dict(label=it['label'],diff=diff(it['row']),answer=num(it['row']['G'])) for it in blocks('3-2. 레이븐 추론')]
T['pattern']=[dict(label=it['label'],diff=diff(it['row']),answer=num(it['row']['H']),desc=it['row'].get('F'),rule=it['row'].get('G')) for it in blocks('1-2. 패턴검사_반복성장')]
T['rotation']=[dict(label=it['label'],diff=diff(it['row']),answer=num(it['row']['G'])) for it in blocks('3-1. 3차원 회전')]
T['analogy']=[]
for it in blocks('2-1. AB = CD'):
    d=it['row']; circ='①②③④'
    T['analogy'].append(dict(label=it['label'],diff=diff(d),stim=d.get('E'),options=[d.get(c) for c in 'KLMN'],answer=circ.index(str(d['O']).strip())+1,rel=d.get('F')))
T['picture_arrangement']=[]
for it in blocks('4-1. 차례맞추기(사회대처)'):
    d=it['row']; subs=it['sub']
    F=[num(s.get('F')) for s in subs if s.get('E')]; Sx=[num(s.get('S')) for s in subs if s.get('E')]
    T['picture_arrangement'].append(dict(label=it['label'],diff=diff(d),title=d.get('E'),panels=[s.get('E') for s in subs if s.get('E')],posF=F,posS=Sx))
T['verbal_reasoning']=[]
for it in blocks('2-3. 언어적 추론'):
    d=it['row']; lines=[l.strip() for l in str(d['E']).split('\n')]
    opts=[re.sub(r'^\d\.\s*','',l) for l in lines if re.match(r'^\d\.',l)]
    prem=[]; 
    for l in lines:
        if re.match(r'^\d\.',l): break
        prem.append(l)
    T['verbal_reasoning'].append(dict(label=it['label'],diff=diff(d),premise=[p for p in prem if p],options=opts,answer=num(d.get('F'))))
T['number_series']=[]
for it in blocks('1-3. 숫자연속추론'):
    d=it['row']; a,b=str(d['E']).split('\n')[:2]
    seq=a.split(); opts=[x.strip() for x in b.split('/')]
    ansval=str(d['G']).split('\n')[0].strip().replace('.0','')
    T['number_series'].append(dict(label=it['label'],diff=diff(d),seq=seq,options=opts,answer=opts.index(ansval)+1))
T['predictive']=[]
for it in blocks('4-3. 예측추론 과제'):
    d=it['row']; ops=[]; sc=[]
    for l in str(d['G']).split('\n'):
        m=re.match(r'\s*\d\.\s*(.*?)\s*\((\d)\)\s*$',l.strip())
        if m: ops.append(m.group(1).strip()); sc.append(int(m.group(2)))
    T['predictive'].append(dict(label=it['label'],diff=diff(d),text=d['E'],options=ops,scores=sc,answer=sc.index(2)+1 if 2 in sc else None))
T['transitivity']=[dict(label=it['label'],diff=diff(it['row']),set=it['row'].get('E'),pairs=it['row'].get('F'),question=it['row'].get('G'),answer_name=it['row'].get('H')) for it in blocks('3-3. 물리적 길이 전이 과제')]
json.dump(T,open('excel_items.json','w'),ensure_ascii=False,indent=1)
for k,v in T.items():
    bad=[x['label'] for x in v if x.get('answer') in (None,[]) or (isinstance(x.get('answer'),list) and None in x['answer'])]
    print(k,len(v),[x['diff'] for x in v].count('practice'),'bad:',bad)
