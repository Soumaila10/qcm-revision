// Self-destructing Service Worker to clear development cache and unregister itself
self.addEventListener('install', (e) => {
  console.log('SW: Installing self-destructing service worker...');
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  console.log('SW: Activating self-destructing service worker. Clearing all caches...');
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => caches.delete(key)));
    }).then(() => {
      console.log('SW: All caches deleted. Unregistering self...');
      return self.registration.unregister();
    }).then(() => {
      console.log('SW: Unregistered successfully. Reloading clients...');
      return self.clients.matchAll();
    }).then((clients) => {
      clients.forEach((client) => {
        if (client.url && typeof client.navigate === 'function') {
          client.navigate(client.url);
        }
      });
    })
  );
});

// Basic fetch fallback in case unregistration takes a moment
self.addEventListener('fetch', (e) => {
  e.respondWith(fetch(e.request));
});
