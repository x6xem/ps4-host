// Service worker for offline caching
const CACHE_NAME = 'ps4-host-cache-v1';
const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/exploit.js',
    '/int64.js',
    '/rop.js',
    '/kexploit.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(FILES_TO_CACHE))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (!cacheWhitelist.includes(key)) {
                    return caches.delete(key);
                }
            }));
        })
    );
});