import sys, json, os, cv2, numpy as np
sys.path.insert(0,'tools')
from det import *
from PIL import Image
import pymupdf as fitz
T=json.load(open('excel_items.json'))
OUT='build'; os.makedirs(OUT+'/meta',exist_ok=True)
def pages(pre, ex, first): return [f'{pre}{ex[0]:03d}',f'{pre}{ex[1]:03d}']+[f'{pre}{first+i:03d}' for i in range(20)]
CFG={
 'picture_concepts':pages('core',(4,6),8),
 'problem_solving':pages('core',(31,33),35),
 'raven':pages('core',(58,60),62),
 'verbal_cue':pages('core',(85,87),89),
 'pattern':pages('core',(112,114),116),
 'rotation':pages('core',(166,168),170),
 'picture_arrangement':pages('core',(193,195),197),
 'dls':pages('supp',(4,6),8),
 'transitivity':pages('supp',(112,114),116),
 'analogy':pages('ab',(3,5),7),
}
def path(p): return f'hi/{p}.png' if p.startswith('ab') else f'hi/{p}.jpeg'
def label_boxes(im):
    H,W=im.shape
    return [r for r in comps(im,lambda g:g<200,dil=5,mindim=3) if r[0]<0.15*W and r[1]<0.1*H and r[2]<0.1*W and r[3]<0.06*H and r[1]+r[3]<0.11*H]
def whiten(im):
    im=im.copy()
    for x,y,w,h in label_boxes(im): im[max(0,y-8):y+h+8,max(0,x-8):x+w+8]=255
    return im
def content_box(im):
    H,W=im.shape; g=small(im).copy(); h,w=g.shape
    ys,xs=np.where(g<235)
    return np.array([xs.min()*S,ys.min()*S,(xs.max()+1)*S,(ys.max()+1)*S])
def readorder(rs, tol=0.25):
    rs=sorted(rs,key=lambda r:r[1]); rows=[]
    for r in rs:
        if rows and abs(r[1]-rows[-1][0][1])<r[3]*tol: rows[-1].append(r)
        else: rows.append([r])
    return [r for row in rows for r in sorted(row,key=lambda t:t[0])]
def big(rs, im, frac): H,W=im.shape; return [r for r in rs if r[2]*r[3]>frac*H*W]
def opts_for(task, p, im, item):
    H,W=im.shape
    if task=='picture_concepts':
        rows=sorted(big(cells(im),im,0.05),key=lambda r:r[1]); n=len(item['rows'][0])
        assert len(rows)==len(item['rows']),(p,len(rows))
        out=[]
        for ri,(x,y,w,h) in enumerate(rows):
            for c in range(n): out.append(dict(id=f'{ri+1}-{c+1}',row=ri+1,box=[x+w*c/n,y,w/n,h]))
        return out
    if task in ('problem_solving','verbal_cue','picture_arrangement','dls'):
        rs=readorder(big(cells(im),im,0.03))
        n=len(item['options']) if 'options' in item else len(item['panels'])
        assert len(rs)==n,(p,len(rs),n)
        return [dict(id=str(i+1),box=list(r)) for i,r in enumerate(rs)]
    if task=='raven':
        rs=[r for r in comps(im,lambda g:g<200,dil=25) if r[1]+r[3]/2>0.62*H and r[2]*r[3]>0.01*H*W]
        rs=sorted(rs,key=lambda r:r[0]); assert len(rs)==3,(p,rs)
        return [dict(id=str(i+1),box=list(r)) for i,r in enumerate(rs)]
    if task=='pattern':
        outer=max(cells(im),key=lambda r:r[2]*r[3])
        rs=[r for r in comps(im,lambda g:g<100,dil=3) if r[1]>outer[1]+outer[3]*0.4 and 0.08*W<r[2]<0.3*W and r[3]>0.08*H]
        rs=sorted(rs,key=lambda r:r[0]); assert len(rs)==4,(p,rs)
        return [dict(id=str(i+1),box=list(r)) for i,r in enumerate(rs)]
    if task=='rotation':
        box=max(cells(im),key=lambda r:r[2]*r[3]); yb=box[1]+box[3]
        rs=[r for r in comps(im,lambda g:g<200,dil=9) if r[1]>yb+20]
        xs=sorted(rs,key=lambda r:r[0]); groups=[]
        for r in xs:
            if groups and r[0]<groups[-1][0]+groups[-1][2]+40:
                g=groups[-1]; x0=min(g[0],r[0]);y0=min(g[1],r[1]);x1=max(g[0]+g[2],r[0]+r[2]);y1=max(g[1]+g[3],r[1]+r[3]); groups[-1]=(x0,y0,x1-x0,y1-y0)
            else: groups.append(r)
        groups=[g for g in groups if g[2]*g[3]>0.005*H*W]
        assert len(groups)==3,(p,groups)
        return [dict(id=str(i+1),box=list(g)) for i,g in enumerate(groups)]
    if task=='analogy':
        d=fitz.open('ab.pdf'); pg=d[int(p[2:])-1]; k=W/pg.rect.width
        rs=[dr['rect'] for dr in pg.get_drawings() if dr.get('color')==(0.0,0.0,0.0) and dr['rect'].y0>200]
        rs=sorted(rs,key=lambda r:r.x0); assert len(rs)==4,(p,rs)
        return [dict(id=str(i+1),box=[r.x0*k,r.y0*k,r.width*k,r.height*k]) for i,r in enumerate(rs)]
    if task=='transitivity':
        return []
res={}
for task,pl in CFG.items():
    items=T[task]; raw=[load(path(p)) for p in pl]; ims=[whiten(i) for i in raw]; LB={p:label_boxes(i) for p,i in zip(pl,raw)}
    boxes=np.array([content_box(im) for im in ims]); pad=40
    crop=[int(max(0,boxes[:,0].min()-pad)),int(max(0,boxes[:,1].min()-pad)),int(boxes[:,2].max()+pad),int(boxes[:,3].max()+pad)]
    crop[2]=min(crop[2],ims[0].shape[1]); crop[3]=min(crop[3],ims[0].shape[0])
    cw,ch=crop[2]-crop[0],crop[3]-crop[1]
    os.makedirs(f'{OUT}/img/{task}',exist_ok=True); meta=[]
    for p,im,item in zip(pl,ims,items):
        ops=opts_for(task,p,im,item)
        for o in ops:
            x,y,w,h=o['box']; o['box']=[round((x-crop[0])/cw,4),round((y-crop[1])/ch,4),round(w/cw,4),round(h/ch,4)]
        name=('ex'+item['label'][1:] if item['label'].startswith('P') else f"{int(item['label']):02d}")+'.jpg'
        img=Image.open(path(p)).convert('RGB')
        from PIL import ImageDraw
        dr=ImageDraw.Draw(img)
        for x,y,w,h in LB[p]: dr.rectangle([x-8,y-8,x+w+8,y+h+8],fill='white')
        img=img.crop(crop)
        tw=1500; img=img.resize((tw,round(ch*tw/cw)),Image.LANCZOS); img.save(f'{OUT}/img/{task}/{name}',quality=84,optimize=True)
        meta.append(dict(label=item['label'],page=p,img=name,options=ops))
        overlay(f'{OUT}/img/{task}/{name}',[[o['box'][0]*tw,o['box'][1]*img.height,o['box'][2]*tw,o['box'][3]*img.height] for o in ops],f'{OUT}/meta/ov_{task}_{name[:-4]}.png',[o['id'] for o in ops])
    res[task]=dict(crop=crop,size=[1500,round(ch*1500/cw)],items=meta)
    print(task,'ok',crop,res[task]['size'])
json.dump(res,open(f'{OUT}/meta/layout.json','w'),ensure_ascii=False,indent=1)
