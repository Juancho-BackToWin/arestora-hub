// Service worker del Arestora Hub. Estrategia: red primero, caché como respaldo.
// Así el móvil siempre intenta traer la última versión, pero sigue funcionando sin cobertura.
const CACHE = 'arestora-hub-catalogo-externo-1';

// Ficheros de datos: siempre a la red, con la caché solo como red de seguridad.
// Nunca deben servirse de caché estando en línea, o el Hub mostraría un catálogo viejo.
const DATOS = ['version.json', 'catalogo.json', 'logos.json'];

self.addEventListener('install', e => { self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll([
    './hub.html', './manifest.json', './favicon.svg', './catalogo.json', './logos.json',
    './icon-192.png', './icon-512.png', './icon-512-maskable.png', './apple-touch-icon.png'
  ]).catch(()=>{}))); });

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim())); });

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const ruta = new URL(req.url).pathname;
  if (DATOS.some(d => ruta.endsWith(d))) {
    e.respondWith(fetch(req).then(r => {
      const copia = r.clone();
      caches.open(CACHE).then(c => c.put(req, copia)).catch(()=>{});
      return r;
    }).catch(() => caches.match(req)));
    return;
  }
  e.respondWith(fetch(req).then(r => {
      const copia = r.clone();
      caches.open(CACHE).then(c => c.put(req, copia)).catch(()=>{});
      return r;
    }).catch(() => caches.match(req).then(r => r || caches.match('./hub.html'))));
});
