self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('artikel-cache').then(cache => {
      return cache.addAll([
        './',
        './index.html',
        './app.js',
        './manifest.json',
        './icon-192x192.png',
        './icon-512x512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
