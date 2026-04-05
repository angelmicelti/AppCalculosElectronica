const CACHE_NAME = 'v2_cache_electronica_angelmicelti';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './Transistor.html',
  './Diodo.html',
  './Led.html',
  './Condensador.html',
  './Resistencias.html',
  './images/transistor.png',
  './images/diodo.png',
  './images/led.png',
  './images/condensador.png',
  './images/resistencias.png',
  './images/transistor-symbol.png',
  './images/diodo-symbol.png',
  './images/led-symbol.png',
  './images/condensador-symbol.png',
  './images/resistencias-symbol.png',
  './images/fondo-electronica.jpg'
];

// Instalación: Almacena los archivos estáticos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Activación: Limpia cachés antiguas
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Estrategia: Cache First con Network Fallback
// Si está en caché, lo sirve; si no, lo busca en la red y lo guarda en caché.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) return response;

        return fetch(event.request).then((networkResponse) => {
          // Guardamos en caché lo nuevo que se vaya descargando (como scripts externos)
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
  );
});