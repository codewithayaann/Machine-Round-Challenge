const CACHE_NAME = 'drag-drop-cache';
const OFFLINE_URL = '/offline.html'
const CAHCE_URLS = [
    '/',
    '/index.html',
    OFFLINE_URL
]


// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(CAHCE_URLS);
            })
    );
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', (event) => {

    if (event.request.mode === 'navigate') {
        // Handle navigation requests
        event.respondWith(
            fetch(event.request)
                .catch(() => caches.match(OFFLINE_URL))
        );

    } else {
        event.respondWith(
            caches.match(event.request)
                .then((response) => {
                    if (response) {
                        return response;
                    }
                    return fetch(event.request);
                })
        );
    }

});

// Activate event - clean up old caches
// eslint-disable-next-line no-restricted-globals
self.addEventListener('activate', (event) => {
    event.waitUntil(caches.keys().then((cacheNames) => {
        return Promise.all(
            cacheNames.filter((cacheName) => cacheName !== CACHE_NAME)
                .map((cacheName) => caches.delete(cacheName))
        );
    }))
})