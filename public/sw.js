/* BIG CRUISE PWA — iOS + Android. Notifications + instant activate. */
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "/play";
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      const hit = list.find((c) => "focus" in c);
      if (hit) {
        hit.postMessage({ type: "open", url });
        return hit.focus();
      }
      return self.clients.openWindow(url);
    }),
  );
});

self.addEventListener("message", (event) => {
  const data = event.data;
  if (!data || data.type !== "notify") return;
  event.waitUntil(
    self.registration.showNotification(data.title || "BIG CRUISE", {
      body: data.body || "",
      icon: "/__grok/icon-180.png",
      badge: "/__grok/icon-180.png",
      tag: data.tag || "cruise",
      renotify: true,
      data: { url: data.url || "/play" },
    }),
  );
});
