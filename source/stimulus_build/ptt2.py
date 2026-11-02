import sys,json,re,cv2,numpy as np
sys.path.insert(0,'tools'); from det import *
T=json.load(open('excel_items.json'))
TT=T['transitivity']; t=TT; i9=[k for k,x in enumerate(t) if x['label']=='9'][0]; i10=i9+1
t[i9],t[i10]=dict(t[i10],label='9',excel_label='10'),dict(t[i9],label='10',excel_label='9'); L=json.load(open('build/meta/layout.json')); lay=L['transitivity']
cx0,cy0,cx1,cy1=lay['crop']; cw,ch=cx1-cx0,cy1-cy0
def objmask(col):
    b,g,r=[col[:,:,i].astype(int) for i in range(3)]
    white=(b>215)&(g>215)&(r>215)
    gray=(abs(b-180)<25)&(abs(g-157)<25)&(abs(r-143)<25)
    return (~white&~gray), gray
out={}; report=[]
MAN={'6':['BC','DE','AB','CD'],'8':['AB','BC','DC','DE'],'11':['AB','CD','BC','DE'],'14':['BC','DE','BA','CD'],
     '16':['BC','DE','CD','AB'],'18':['BC','CD','BA','DE'],'20':['AB','DE','CD','BC'],'19':['AB','CD','DE','BC']}
for it,ex in zip(lay['items'],T['transitivity']):
    p=it['page']; g=load(f'hi/{p}.jpeg'); col=cv2.imread(f'hi/{p}.jpeg'); H,W=g.shape
    panels=sorted([r for r in cells(g) if r[2]*r[3]>0.03*H*W],key=lambda r:(r[1]//300,r[0]))
    objs=[]
    for pi,(x,y,w,h) in enumerate(panels):
        m=25; sub=col[y+m:y+h-m,x+m:x+w-m]; om,gm=objmask(sub)
        om=cv2.morphologyEx(om.astype(np.uint8),cv2.MORPH_OPEN,np.ones((2,2),np.uint8))>0
        colf=gm.mean(axis=0); gx=np.where(colf>0.85)[0]; horiz = len(gx) > (gm.mean(axis=1)>0.85).sum()  # gray strip on a side -> objects horizontal
        axis=0 if horiz else 1   # split along y if horizontal objects
        proj=om.sum(axis=1-axis) if False else (om.sum(axis=1) if horiz else om.sum(axis=0))
        n=len(proj); lo,hi=int(n*0.2),int(n*0.8)
        sm=np.convolve(proj,np.ones(15)/15,'same'); s=lo+int(np.argmin(sm[lo:hi]))
        nc,lab,st,cen=cv2.connectedComponentsWithStats(cv2.dilate(om.astype(np.uint8),np.ones((7,7),np.uint8)))
        big_=[k for k in range(1,nc) if st[k,4]>3000]
        ax=1 if horiz else 0
        if len(big_)>=2:
            cs=sorted(big_,key=lambda k:cen[k][ax])
            # best gap between consecutive component centers weighted
            best=None
            for t in range(1,len(cs)):
                a1=sum(st[k,4] for k in cs[:t]); a2=sum(st[k,4] for k in cs[t:])
                if min(a1,a2)>0.15*(a1+a2):
                    sc=min(a1,a2)
                    if best is None or sc>best[0]: best=(sc,t)
            if best:
                t=best[1]; g1=cs[:t]
                ext1=max(st[k,ax]+st[k,2+ax] for k in g1); s=int(ext1)
        if it['label'] in MAN: s=lo+int(np.argmin(sm[lo:hi]))
        parts=[(0,s),(s,n)]
        side = 'right' if horiz and gx.mean()>gm.shape[1]/2 else 'left'
        for k,(a,bnd) in enumerate(parts):
            mm=np.zeros_like(om); 
            if horiz: mm[a:bnd,:]=om[a:bnd,:]
            else: mm[:,a:bnd]=om[:,a:bnd]
            ys,xs=np.where(mm)
            if len(ys)<200: continue
            X0,Y0,X1,Y1=xs.min(),ys.min(),xs.max(),ys.max()
            # extent: vertical -> height above mask (smaller top = longer); horizontal -> length beyond mask
            if not horiz: ext=-Y0
            else: ext= X1 if side=='left' else -X0
            crop=sub[Y0:Y1+1,X0:X1+1]
            objs.append(dict(panel=pi,box=[x+m+X0,y+m+Y0,X1-X0+1,Y1-Y0+1],ext=int(ext),crop=crop,horiz=horiz))
    # similarity between objects in different panels: hsv hist
    def hist(c):
        hsv=cv2.cvtColor(c,cv2.COLOR_BGR2HSV); msk=((c.min(axis=2)<215)).astype(np.uint8)
        hh=cv2.calcHist([hsv],[0,1],msk,[30,16],[0,180,0,256]); cv2.normalize(hh,hh); return hh
    def tmpl(a,b):
        # compare top 70% region resized
        def prep(c):
            gg=cv2.cvtColor(c,cv2.COLOR_BGR2GRAY)
            return cv2.resize(gg,(64,64)).astype(np.float32)
        A,B=prep(a),prep(b); A=(A-A.mean())/(A.std()+1e-6); B=(B-B.mean())/(B.std()+1e-6); return float((A*B).mean())
    hs=[hist(o['crop']) for o in objs]
    def tsim(a,b,o1,o2):
        ha,wa=a.shape[:2]; hb,wb=b.shape[:2]
        if not o1['horiz']:
            if abs(wa-wb)>0.1*max(wa,wb): return -5
            k=int(min(ha,hb)*0.5); A=a[:k]; B=b[:k]
        else:
            if abs(ha-hb)>0.1*max(ha,hb): return -5
            k=int(min(wa,wb)*0.5)
            A,B=(a[:,-k:],b[:,-k:]) if o1['ext']>=0 else (a[:,:k],b[:,:k])
        A=cv2.resize(A,(64,64)).astype(float); B=cv2.resize(B,(64,64)).astype(float)
        return -np.abs(A-B).mean()/50
    n=len(objs); sim=np.zeros((n,n))
    for i in range(n):
        for j in range(n):
            if objs[i]['panel']!=objs[j]['panel']:
                sim[i,j]=tsim(objs[i]['crop'],objs[j]['crop'],objs[i],objs[j])+0.3*cv2.compareHist(hs[i],hs[j],cv2.HISTCMP_CORREL)
            else: sim[i,j]=-9
    # union-find greedy matching, each object at most one partner, number of identities = n_letters
    letters=re.findall(r'\(([A-E])\)',ex['set']); nid=len(letters)
    parent=list(range(n))
    def f(i):
        while parent[i]!=i: i=parent[i]
        return i
    pairs=sorted([(sim[i,j],i,j) for i in range(n) for j in range(i+1,n)],reverse=True)
    deg=[0]*n; comps=n
    for s,i,j in pairs:
        if comps==nid: break
        if deg[i] or deg[j] or f(i)==f(j): continue
        parent[f(i)]=f(j); deg[i]=deg[j]=1; comps-=1
    ids=sorted(set(f(i) for i in range(n)))
    # order via panel comparisons: within panel, larger ext = longer
    longer=set()
    for pi in set(o['panel'] for o in objs):
        a=[i for i in range(n) if objs[i]['panel']==pi]
        if len(a)==2:
            s,l=sorted(a,key=lambda i:objs[i]['ext']); longer.add((f(s),f(l)))
    # topological rank: count of how many are shorter (transitive)
    import itertools
    order=[]; rem=set(ids); edges=set(longer)
    while rem:
        src=[c for c in rem if not any((a,c) in edges for a in rem)]
        if len(src)!=1: order=None; break
        order.append(src[0]); rem.remove(src[0])
    if it['label'] in MAN:
        seq=''.join(MAN[it['label']]); assert len(seq)==len(objs),(it['label'],len(objs))
        lab=None
    elif order is None or len(order)!=nid:
        report.append((it['label'],'ORDER FAIL',len(objs),nid)); lab={c:'?' for c in ids}
    else: lab={c:letters[k] for k,c in enumerate(order)}
    names={m.group(2):m.group(1).strip() for m in re.finditer(r'([^<\n/]+?)\(([A-E])\)',ex['set'].split('\n')[-1])}
    ops=[]
    for i,o in enumerate(objs):
        x,y,w,h=o['box']; pad=20
        L_= seq[i] if lab is None else lab[f(i)]
        ops.append(dict(id=L_,name=names.get(L_),box=[round((x-pad-cx0)/cw,4),round((y-pad-cy0)/ch,4),round((w+2*pad)/cw,4),round((h+2*pad)/ch,4)]))
    out[it['label']]=dict(options=ops,names=names)
    tw=1500; f2=tw/cw
    overlay(f"build/img/transitivity/{it['img']}",[[o['box'][0]*tw,o['box'][1]*ch*f2,o['box'][2]*tw,o['box'][3]*ch*f2] for o in ops],f"build/meta/ovq_{it['label']}.png",[o['id'] for o in ops])
    report.append((it['label'],len(objs),''.join(sorted(o['id'] for o in ops))))
o20=out['20']['options']; o20[2]['box']=[0.2933,0.302,0.09,0.1954]; o20[3]['box']=[0.352,0.2469,0.1267,0.2504]
for lab_,v in out.items():
    ex_=[x for x in TT if x['label']==lab_][0]; v['question']=ex_['question']; v['answer_name']=ex_['answer_name']; v['diff']=ex_['diff']; v['excel_label']=ex_.get('excel_label',lab_)
json.dump(out,open('build/meta/ptt.json','w'),ensure_ascii=False,indent=1)
for r in report: print(r)
