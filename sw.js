const CACHE = 'keri-docs-v2';
const ARCHIVOS = [
  '/keri-docs/',
  '/keri-docs/index.html',
  '/keri-docs/manifest.json',
  '/keri-docs/icono-192.png',
  '/keri-docs/icono-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARCHIVOS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).catch(() => caches.match('/keri-docs/index.html'))));
});
