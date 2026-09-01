export type NotePerm = NotificationPermission | "unsupported";

export function notePermission(): NotePerm {
  if (typeof window === "undefined" || !("Notification" in window)) return "unsupported";
  return Notification.permission;
}

export async function registerCruisePwa() {
  if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return null;
  try {
    return await navigator.serviceWorker.register("/sw.js", { scope: "/" });
  } catch {
    return null;
  }
}

export async function enableCruiseNotes(): Promise<NotePerm> {
  if (typeof window === "undefined" || !("Notification" in window)) return "unsupported";
  const perm = await Notification.requestPermission();
  try {
    localStorage.setItem("bch-notes", perm);
  } catch {
    /* ignore */
  }
  return perm;
}

export function ping(title: string, body?: string, url = "/play") {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("cruise-note", { detail: { title, body, url, at: Date.now() } }));
  if (!("Notification" in window) || Notification.permission !== "granted") return;
  const payload = { type: "notify", title, body, url, tag: title };
  if (navigator.serviceWorker?.controller) {
    navigator.serviceWorker.controller.postMessage(payload);
    return;
  }
  try {
    new Notification(title, { body, icon: "/__grok/icon-180.png" });
  } catch {
    /* iOS Safari tab may block */
  }
}

export function isStandalone() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.matchMedia("(display-mode: fullscreen)").matches ||
    Boolean((navigator as Navigator & { standalone?: boolean }).standalone)
  );
}

export function phoneOs(): "ios" | "android" | "other" {
  if (typeof navigator === "undefined") return "other";
  const ua = navigator.userAgent;
  if (/iphone|ipad|ipod/i.test(ua)) return "ios";
  if (/android/i.test(ua)) return "android";
  return "other";
}
