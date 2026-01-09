const CACHE_NAME = "music-app-v1";
const BASE_PATH = "/mp3";

/**
 * Install: cache các file CỐT LÕI (KHÔNG cache nhạc)
 */
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) =>
            cache.addAll([
                `${BASE_PATH}/`,
                `${BASE_PATH}/index.html`,
                `${BASE_PATH}/manifest.json`,
            ])
        )
    );
    self.skipWaiting();
});

/**
 * Activate: dọn cache cũ
 */
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys
                    .filter((key) => key !== CACHE_NAME)
                    .map((key) => caches.delete(key))
            )
        )
    );
    self.clients.claim();
});

/**
 * Fetch:
 * - Nhạc (/mp3/*.mp3) → cache runtime
 * - Ảnh → cache runtime
 * - File khác → network-first
 */
self.addEventListener("fetch", (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // ⚠️ chỉ xử lý request cùng origin
    if (url.origin !== self.location.origin) return;

    // 🎵 AUDIO FILE
    if (url.pathname.startsWith(`${BASE_PATH}/`) && url.pathname.endsWith(".mp3")) {
        event.respondWith(cacheFirst(request));
        return;
    }

    // 🖼 IMAGE
    if (request.destination === "image") {
        event.respondWith(cacheFirst(request));
        return;
    }

    // 🌐 MẶC ĐỊNH
    event.respondWith(networkFirst(request));
});

/* =========================
   STRATEGIES
========================= */

async function cacheFirst(request) {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);

    if (cached) return cached;

    const response = await fetch(request);
    cache.put(request, response.clone());
    return response;
}

async function networkFirst(request) {
    const cache = await caches.open(CACHE_NAME);
    try {
        const response = await fetch(request);
        cache.put(request, response.clone());
        return response;
    } catch {
        return cache.match(request);
    }
}
