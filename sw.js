// Caches the app so it works offline once added to the iPad home screen.
const CACHE = "morning-checklist-v3";
const FILES = [
  "./", "index.html", "manifest.json",
  "images/pajamas-off.jpg", "images/fold-pajamas.jpg", "images/wash-face.jpg",
  "images/sunscreen.jpg", "images/braid-hair.jpg", "images/breakfast.jpg",
  "images/ready.jpg", "images/charger.jpg", "images/icon-180.png", "images/icon-512.png",
  "fonts/rubik-hebrew.woff2", "fonts/rubik-latin.woff2",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) =>
    Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request)));
});
