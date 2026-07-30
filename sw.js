/* ================================================================
   SERVICE WORKER - Subscription Manager
   Possibile SOLO quando l'app è servita da un vero hosting (https://
   o localhost), non da file:// aperto con doppio clic. La registrazione
   in index.html è protetta da un controllo che non fa nulla se il
   contesto non lo supporta: aprire il file in locale continua a
   funzionare esattamente come prima, senza SW.

   Strategia: "network first, cache come fallback".
   - Online: scarica sempre la versione più recente di index.html e
     SOVRASCRIVE la cache con quella appena scaricata. Quindi ogni
     aggiornamento pubblicato arriva subito, senza bisogno di alcuna
     gestione di versione: la cache si "auto-aggiorna" ad ogni visita.
   - Offline: serve l'ultima versione salvata in cache.

   IMPORTANTE PER CHI MANTIENE QUESTO FILE:
   Il nome della cache qui sotto è FISSO e non va più cambiato ad ogni
   aggiornamento di index.html: la strategia network-first sopra
   descritta se ne occupa da sola. Questo file va toccato di nuovo
   SOLO se cambia la strategia di caching stessa (caso raro), non per i
   normali aggiornamenti di contenuto/funzionalità dell'app.
   ================================================================ */

const CACHE_NAME = 'submanager-cache-v1'; // fisso, non richiede più bump ad ogni release
const ASSETS_TO_CACHE = ['./', './index.html', './sw.js'];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
      .catch(() => {})
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
