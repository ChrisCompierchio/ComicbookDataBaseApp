import {cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';

cleanupOutdatedCaches();

precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});




// self.addEventListener('install', (event) => {
//   console.log('Service Worker installing...');
// });

// self.addEventListener('activate', (event) => {
//   console.log('Service Worker activating...');
//   event.waitUntil(cleanupOutdatedCaches());
// });


// self.addEventListener('fetch', (event) => {
//   const { request } = event;
  
//   if (request.url.includes('googleapis.com')) {
//     return;
//   }
  
//   event.respondsWith(
//     caches.match(request).then((request) => {
//       return response || fetch(request);
//     })
//   )
// })

