// service-worker.js — simple offline cache for Reisgenoot China 2026
const VERSION = "v7-2026-04-21-gallery-euro-es";
const CACHE = `china2026-${VERSION}`;
const APP_SHELL = [
  "./",
  "./index.html",
  "./config.js",
  "./app.js",
  "./planner.js",
  "./map.js",
  "./supabase-client.js",
  "./help-content.js",
  "./phrases.js",
  "./locations.json",
  "./locales/nl.json",
  "./locales/es.json",
  "./locales/zh.json",
  "./manifest.webmanifest",
  "./icons/icon.svg",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icons-sprite.svg",
  "./icons/logo-mark.svg",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);

  // only handle GETs
  if (e.request.method !== "GET") return;

  // App shell + same-origin: cache-first, network fallback
  if (url.origin === location.origin) {
    e.respondWith(
      caches.match(e.request).then((cached) =>
        cached ||
        fetch(e.request).then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy));
          return res;
        }).catch(() => cached)
      )
    );
    return;
  }

  // CDNs and map tiles: stale-while-revalidate
  if (url.host.includes("unpkg.com") || url.host.includes("cdn.jsdelivr.net") ||
      url.host.includes("tile.openstreetmap.org") || url.host.includes("cdn.tailwindcss.com")) {
    e.respondWith(
      caches.match(e.request).then((cached) => {
        const fetchPromise = fetch(e.request).then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy));
          return res;
        }).catch(() => cached);
        return cached || fetchPromise;
      })
    );
    return;
  }

  // Supabase & weather: network only (live data)
});
