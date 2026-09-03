// Service worker del Arestora Hub. Estrategia: red primero, caché como respaldo.
// Así el móvil siempre intenta traer la última versión, pero sigue funcionando sin cobertura.
const CACHE = 'arestora-hub-icon-b1';
self.addEventListener('install', e => { self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll([
    './hub.html', './manifest.json', './favicon.svg',
    './icon-192.png', './icon-512.png', './icon-512-maskable.png', './apple-touch-icon.png'
  ]).catch(()=>{}))); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  if (new URL(req.url).pathname.endsWith('version.json')) {
    e.respondWith(fetch(req).catch(() => caches.match(req))); return;
  }
  e.respondWith(fetch(req).then(r => {
      const copia = r.clone();
      caches.open(CACHE).then(c => c.put(req, copia)).catch(()=>{});
      return r;
    }).catch(() => caches.match(req).then(r => r || caches.match('./hub.html'))));
});
