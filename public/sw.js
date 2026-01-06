self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open("music-cache").then((cache) =>
            cache.addAll([
                "/",
                "/music/hen-yeu.mp3",
                "/music/mot-phut.mp3",
                "/music/roi-xa.mp3",
                "/images/hen-yeu.jpg",
                "/images/mot-phut.jpg",
                "/images/roi-xa.jpg",
            ])
        )
    );
});

self.addEventListener("fetch", (e) => {
    e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});
