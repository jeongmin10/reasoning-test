/* 결과 전송 — (1) Google 스프레드시트(Apps Script 웹앱) (2) DataPipe(OSF)
   설정(config.js)에 주소/ID가 있는 곳으로만 보냅니다. 둘 다 비어 있으면 전송하지 않고(결과 화면에서 내려받기),
   전송 상태는 session.upload_files 에 저장되어 '전송 다시 시도'로 다시 보낼 수 있습니다. */
(function(root){
'use strict';
const active=new WeakSet();
// ── DataPipe (기준 검사와 같은 방식) ─────────────────────────────
async function dataPipe(session,file,request){
 const response=await request('https://pipe.jspsych.org/api/'+(file.encoding==='base64'?'base64':'data')+'/',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({experimentID:session.dataPipeExperimentId,filename:file.filename,data:file.data}),signal:AbortSignal.timeout(30000)});
 const body=await response.json();
 if(response.status===201&&!body.error)return {status:'saved'};
 if(response.status===202&&!body.error)return {status:'queued'};
 if(body.error==='FILE_EXISTS')return {status:'needs_verify',error:'FILE_EXISTS'};
 const e=Error(body.error||'HTTP_'+response.status);e.definite=true;throw e;
}
// ── Google 스프레드시트 (Apps Script 웹앱, docs/GOOGLE_SHEETS_SETUP.md) ─────
// text/plain 으로 보내 사전 요청(preflight) 없이 전송합니다. 응답을 읽지 못하는 환경(CORS 차단)이면
// no-cors 로 한 번 더 보내고 'queued'(보냄·확인 응답 없음)로 표시합니다. 같은 파일 이름은 스크립트가 중복 저장하지 않습니다.
async function sheets(session,file,request){
 const body=JSON.stringify({filename:file.filename,sheets:file.sheets,result_json:file.data});
 try{
  const response=await request(session.googleSheetsUrl,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body,redirect:'follow',signal:AbortSignal.timeout(45000)});
  const out=await response.json();
  if(out&&out.ok)return {status:'saved',detail:out.status||null};
  const e=Error((out&&out.error)||'HTTP_'+response.status);e.definite=true;throw e;
 }catch(error){
  if(error.definite)throw error;
  await request(session.googleSheetsUrl,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=utf-8'},body,signal:AbortSignal.timeout(45000)});
  return {status:'queued',error:'NO_CONFIRMATION'};
 }
}
async function send(session,files,options={}){
 if(active.has(session))return {busy:true};
 const targets=[];
 if(session.googleSheetsUrl)targets.push('sheets');
 if(session.dataPipeExperimentId)targets.push('datapipe');
 if(session.run_mode==='demo'||!targets.length)return {skipped:true};
 active.add(session);
 const request=options.fetch||fetch,changed=options.onProgress||(()=>{});
 try{
  session.upload_files=session.upload_files||{};
  const jobs=[];
  for(const t of targets)for(const f of files){const key=t+':'+f.key;jobs.push({key,t,f});
   if(session.upload_files[key]?.filename!==f.filename)session.upload_files[key]={filename:f.filename,target:t,status:'not_attempted'};}
  session.upload_status='sending';changed();
  for(const {key,t,f} of jobs){
   const state=session.upload_files[key];
   if(['saved','needs_verify'].includes(state.status))continue;
   state.status='sending';delete state.error;changed();
   try{const r=await (t==='sheets'?sheets:dataPipe)(session,f,request);state.status=r.status;if(r.error)state.error=r.error;else delete state.error;}
   catch(error){state.status=error.definite?'failed':'uncertain';state.error=String(error.message||error);}
   changed();
  }
  const states=jobs.map(j=>session.upload_files[j.key]),unconfirmed=states.some(s=>!['saved','queued'].includes(s.status));
  session.upload_status=unconfirmed?'uncertain':states.some(s=>s.status==='queued')?'queued':'saved';
  session.upload_error=states.filter(s=>s.error&&s.status!=='saved').map(s=>s.target+':'+s.error).join(', ')||null;changed();
  return {status:session.upload_status,files:session.upload_files};
 }finally{active.delete(session);}
}
const api={send};
if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.BatteryUpload=api;
})(typeof globalThis!=='undefined'?globalThis:this);
