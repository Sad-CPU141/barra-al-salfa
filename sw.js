// Offline support: cache the game and its fonts, then serve from cache and
// refresh in the background. Bump VERSION whenever the game files change.
const VERSION = 'bas-v1';
const SHELL = [
  './',
  'index.html',
  'manifest.webmanifest',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/favicon.png',
  '/khatfa/fonts/anton-latin-400-normal.woff2',
  '/khatfa/fonts/barlow-latin-600-normal.woff2',
  '/khatfa/fonts/barlow-semi-condensed-latin-800-normal.woff2'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(VERSION)
      // Cache what we can; a missing font shouldn't stop the game installing.
      .then((c) => Promise.all(SHELL.map((u) => c.add(u).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('bas-') && k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    caches.open(VERSION).then(async (cache) => {
      const hit = await cache.match(req, { ignoreSearch: true });
      const fresh = fetch(req).then((res) => {
        if (res.ok) cache.put(req, res.clone());
        return res;
      }).catch(() => hit || (req.mode === 'navigate' ? cache.match('index.html') : undefined));
      return hit || fresh;
    })
  );
});
