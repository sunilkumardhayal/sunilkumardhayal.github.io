const CACHE_NAME = "sunil-portfolio-v4";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./chichlik-cfd.html",
  "./glof-susceptibility.html",
  "./css/tailwind-build.css",
  "./profile.webp",
  "./researchgate_logo2.png",
  "./assets/optimized/chichlik-project-collage.webp",
  "./assets/optimized/cnarmada-project-collage.webp",
  "./assets/optimized/water4change-project-collage.webp",
  "./assets/optimized/glof-project-collage.webp",
  "./assets/optimized/glof-hero-collage.webp",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const acceptsHtml = event.request.headers.get("accept")?.includes("text/html");
  if (event.request.mode === "navigate" || acceptsHtml) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      });
    })
  );
});

