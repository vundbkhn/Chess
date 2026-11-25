const VER='3.5.0',C='co-vua-'+VER,A=['./','./index.html'],X=['./manifest.webmanifest','./cv-icon-180.png','./cv-icon-192.png','./cv-icon-512.png','./cv-icon-maskable-512.png'];
const rq=u=>new Request(u,{cache:'reload'});
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(async c=>{await c.addAll(A.map(rq));await Promise.allSettled(X.map(u=>c.add(rq(u))))})));
self.addEventListener('message',e=>{if(e.data==='skip')self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
/* cache-first: chạy offline hoàn toàn; bản mới đến qua đổi VER trong sw.js */
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||r.cache==='no-store'||new URL(r.url).origin!==location.origin)return;
  e.respondWith(caches.match(r,{ignoreSearch:true}).then(x=>x||fetch(r).then(res=>{if(res.status===200){const k=res.clone();e.waitUntil(caches.open(C).then(c=>c.put(r,k)))}return res})
    .catch(()=>r.mode==='navigate'?caches.match('./index.html'):Response.error())))});
