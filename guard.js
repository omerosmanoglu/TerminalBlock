(() => {
function esc(s){return String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}
function show(text){
 document.getElementById("terminal-block-overlay")?.remove();
 const el=document.createElement("div");
 el.id="terminal-block-overlay";
 el.innerHTML=`<div class="tb-card">
 <div class="tb-icon">🛑</div>
 <div class="tb-title">SUPHELI KOMUT ENGELLENDI</div>
 <div class="tb-text">Bu web sitesi panoya PowerShell veya Windows komutu yazmaya calisti. Komut panoya kopyalanmadi ve pano temizlendi.</div>
 <div class="tb-label">Engellenen icerik</div>
 <pre class="tb-code">${esc(String(text||"").slice(0,1800))}</pre>
 <button class="tb-close">Kapat</button></div>`;
 const style=document.createElement("style");
 style.textContent=`#terminal-block-overlay{position:fixed!important;inset:0!important;z-index:2147483647!important;background:rgba(0,0,0,.68)!important;display:flex!important;align-items:center!important;justify-content:center!important;font-family:Arial,sans-serif!important}#terminal-block-overlay .tb-card{width:min(680px,calc(100vw - 32px))!important;max-height:calc(100vh - 32px)!important;overflow:auto!important;background:#fff!important;color:#1f2937!important;border-radius:18px!important;box-shadow:0 24px 80px rgba(0,0,0,.45)!important;padding:28px!important;box-sizing:border-box!important}.tb-icon{font-size:44px!important}.tb-title{font-size:22px!important;font-weight:800!important;margin:8px 0}.tb-text{font-size:15px!important;line-height:1.55!important;margin-bottom:18px}.tb-label{font-size:12px!important;font-weight:700!important;color:#6b7280!important}.tb-code{user-select:none!important;white-space:pre-wrap!important;word-break:break-word!important;background:#111827!important;color:#e5e7eb!important;border-radius:10px!important;padding:14px!important;font:12px/1.45 Consolas,monospace!important;max-height:220px!important;overflow:auto!important}.tb-close{border:0!important;border-radius:9px!important;background:#111827!important;color:#fff!important;padding:10px 18px!important;font-weight:700!important;cursor:pointer!important}`;
 el.appendChild(style);document.documentElement.appendChild(el);
 el.querySelector(".tb-close").onclick=()=>el.remove();
}
addEventListener("message",e=>{if(e.source===window&&e.data?.source==="terminal-block"&&e.data?.type==="BLOCKED")show(e.data.text)});
})();