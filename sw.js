const C='kikitv-v2';
const A=['./','index.html','manifest.json','icon-192.png','icon-512.png'];
const F=['fonts.googleapis.com','fonts.gstatic.com'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=new URL(e.request.url);
  const put=r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r};
  if(F.includes(u.hostname)){e.respondWith(caches.match(e.request).then(m=>m||fetch(e.request).then(put)));return}
  if(u.origin!==location.origin)return;
  e.respondWith(fetch(e.request).then(put).catch(()=>caches.match(e.request)));
});
