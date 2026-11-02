import cv2, numpy as np
from PIL import Image
S=4  # analysis downscale
def load(path):
    im=cv2.imread(path, cv2.IMREAD_GRAYSCALE)
    return im
def small(im): return cv2.resize(im,(im.shape[1]//S, im.shape[0]//S), interpolation=cv2.INTER_AREA)
def cells(im, thr=110, klen=30, minw=20, minh=20):
    """return list of hole rects (x,y,w,h) in full-res coords formed by straight lines"""
    g=small(im)
    b=(g<thr).astype(np.uint8)*255
    h=cv2.morphologyEx(b,cv2.MORPH_OPEN,cv2.getStructuringElement(cv2.MORPH_RECT,(klen,1)))
    v=cv2.morphologyEx(b,cv2.MORPH_OPEN,cv2.getStructuringElement(cv2.MORPH_RECT,(1,klen)))
    lines=cv2.dilate(h|v, np.ones((3,3),np.uint8))
    cnts,hier=cv2.findContours(lines,cv2.RETR_CCOMP,cv2.CHAIN_APPROX_SIMPLE)
    out=[]
    if hier is None: return out
    for c,hh in zip(cnts,hier[0]):
        if hh[3]>=0:  # hole
            x,y,w,hgt=cv2.boundingRect(c)
            if w>=minw and hgt>=minh: out.append((x*S,y*S,w*S,hgt*S))
    return out
def comps(im, mask_fn, mindim=15, dil=7):
    g=small(im)
    m=mask_fn(g).astype(np.uint8)*255
    m=cv2.dilate(m,np.ones((dil,dil),np.uint8))
    n,lab,st,_=cv2.connectedComponentsWithStats(m)
    out=[]
    for i in range(1,n):
        x,y,w,h,a=st[i]
        if max(w,h)>=mindim: out.append((x*S,y*S,w*S,h*S))
    return out
def overlay(path, rects, out, labels=None, color=(255,0,0)):
    im=Image.open(path).convert('RGB'); im.thumbnail((1000,1000)); f=im.width/Image.open(path).width
    from PIL import ImageDraw
    d=ImageDraw.Draw(im)
    for i,r in enumerate(rects):
        x,y,w,h=[v*f for v in r]; d.rectangle([x,y,x+w,y+h],outline=color,width=3)
        d.text((x+4,y+4),str(labels[i] if labels else i+1),fill=(0,0,255))
    im.save(out)
