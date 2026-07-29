/* ================================================================
   SERVICE WORKER - Subscription Manager
   Possibile SOLO quando l'app è servita da un vero hosting (https://
   o localhost), non da file:// aperto con doppio clic. Per questo
   motivo la registrazione in index.html è protetta da un controllo
   che non fa nulla se il contesto non lo supporta: aprire il file
   in locale continua a funzionare esattamente come prima, senza SW.

   Strategia: "network first, cache come fallback".
   - Se c'è connessione: scarica sempre la versione più recente e
     aggiorna la cache. Così ogni aggiornamento pubblicato arriva
     subito a chi ha connessione, senza bisogno di "forzare" nulla.
   - Se non c'è connessione: serve l'ultima versione salvata in cache,
     così l'app resta utilizzabile anche offline dopo la prima visita.

   IMPORTANTE PER CHI MANTIENE QUESTO FILE:
   Ad ogni nuova versione di index.html, cambiare CACHE_NAME qui sotto
   (farlo coincidere con APP_VERSION in index.html è il modo più semplice
   per non dimenticarsene). Le cache vecchie vengono ripulite da sole
   in "activate".
   ================================================================ */

const CACHE_NAME = 'submanager-cache-2026-07-28.9';
const ASSETS_TO_CACHE = ['./', './index.html', './sw.js'];

self.addEventListener('install', (event) => {
  self.skipWaiting(); // attiva subito la nuova versione senza aspettare la chiusura di tutte le schede
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
      .catch(() => {}) // se il precaching fallisce (es. offline al primo avvio), non blocca l'installazione
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      })
      .catch(() =>
        caches.match(event.request).then(cached => cached || caches.match('./index.html'))
      )
  );
});
