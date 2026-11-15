/* Yeshua Roots: deliberately conservative service worker.
   Cache only the offline fallback; never cache personal or dynamic pages. */
const CACHE="yeshua-roots-offline-v1";
const OFFLINE="/offline.html";
self.addEventListener("install",event=>{
 event.waitUntil(caches.open(CACHE).then(cache=>cache.add(OFFLINE)).then(()=>self.skipWaiting()));
});
self.addEventListener("activate",event=>{
 event.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))),self.clients.claim()]));
});
self.addEventListener("fetch",event=>{
 if(event.request.mode!=="navigate"||event.request.method!=="GET")return;
 const url=new URL(event.request.url);
 if(url.origin!==self.location.origin)return;
 event.respondWith(fetch(event.request).catch(async()=>await caches.match(OFFLINE)||Response.error()));
});
