const VER='3.0.0',C='co-vua-'+VER,A=['./','./index.html'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(A.map(u=>new Request(u,{cache:'reload'}))))));
self.addEventListener('message',e=>{if(e.data==='skip')self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||r.cache==='no-store')return;
  e.respondWith(fetch(r).then(res=>{if(res.ok){const k=res.clone();caches.open(C).then(c=>c.put(r,k))}return res}).catch(()=>caches.match(r,{ignoreSearch:true}).then(x=>x||caches.match('./index.html'))))});
