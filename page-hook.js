(() => {
const RULES=[
/\bpowershell(?:\.exe)?\b/i,/\bpwsh(?:\.exe)?\b/i,/\bcmd(?:\.exe)?\b/i,
/\bwt(?:\.exe)?\b/i,/\bwindows\s+terminal\b/i,
/-executionpolicy\s+(?:bypass|unrestricted|remotesigned|allsigned)/i,
/-encodedcommand\b/i,/\b(?:iex|invoke-expression)\b/i,
/\b(?:iwr|invoke-webrequest)\b/i,/\b(?:irm|invoke-restmethod)\b/i,
/\bdownload(?:string|file)\b/i,/\b(?:mshta|rundll32|regsvr32|wscript|cscript)\b/i,
/\b(?:curl|wget)(?:\.exe)?\b/i,/\b(?:https?|ftp):\/\/\S+/i,
/\.(?:ps1|psm1|bat|cmd|vbs|vbe|js|jse|hta|wsf)\b/i
];
function analyze(text){
 if(typeof text!=="string"||!text.trim())return{blocked:false,score:0};
 let score=0; for(const r of RULES) if(r.test(text)) score++;
 const strong=[/\bpowershell(?:\.exe)?\b/i,/\bpwsh(?:\.exe)?\b/i,/\bcmd(?:\.exe)?\b/i,/-executionpolicy\s+bypass/i,/-encodedcommand\b/i,/\b(?:iwr|irm|iex|invoke-webrequest|invoke-restmethod|invoke-expression)\b/i].some(r=>r.test(text));
 return{blocked:strong||score>=2,score};
}
const show=t=>window.postMessage({source:"terminal-block",type:"BLOCKED",text:String(t||"")},"*");
const clear=async()=>{try{await navigator.clipboard.writeText("")}catch{}};

if(navigator.clipboard?.writeText){
 const original=navigator.clipboard.writeText.bind(navigator.clipboard);
 navigator.clipboard.writeText=async text=>{
   const r=analyze(text);
   if(r.blocked){await clear();show(text);return;}
   return original(text);
 };
}
if(navigator.clipboard?.write){
 const original=navigator.clipboard.write.bind(navigator.clipboard);
 navigator.clipboard.write=async items=>{
   try{
     for(const item of items||[]) for(const type of item.types||[]){
       if(type==="text/plain"){
         const text=await (await item.getType(type)).text();
         if(analyze(text).blocked){await clear();show(text);return;}
       }
     }
   }catch{}
   return original(items);
 };
}
document.addEventListener("paste",async e=>{
 const text=e.clipboardData?.getData("text/plain")||"";
 if(analyze(text).blocked){e.preventDefault();e.stopImmediatePropagation();await clear();show(text);}
},true);
})();