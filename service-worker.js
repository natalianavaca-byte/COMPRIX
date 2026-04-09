// --- SERVICE WORKER AUTO-ACTUALIZABLE ---

const CACHE_NAME = "comprinx-v3";
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./logo.png",
  "./favicon.ico",
  "./manifest.json",
  "./service-worker.js"
];

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
      .then(response => response)
      .catch(()=>caches.match(event.request))
  );
});
