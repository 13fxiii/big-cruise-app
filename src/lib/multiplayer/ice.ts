/** STUN + TURN. Override with VITE_STUN_URLS / VITE_TURN_URLS / VITE_TURN_USER / VITE_TURN_PASS. */
export function cruiseIceServers(): RTCIceServer[] {
  const stun = (import.meta.env.VITE_STUN_URLS as string | undefined)
    ?.split(",")
    .map((u) => u.trim())
    .filter(Boolean);
  const turnUrls = (import.meta.env.VITE_TURN_URLS as string | undefined)
    ?.split(",")
    .map((u) => u.trim())
    .filter(Boolean) ?? [
    "turn:openrelay.metered.ca:80",
    "turn:openrelay.metered.ca:443",
    "turns:openrelay.metered.ca:443",
  ];
  const turnUser = (import.meta.env.VITE_TURN_USER as string | undefined) || "openrelayproject";
  const turnPass = (import.meta.env.VITE_TURN_PASS as string | undefined) || "openrelayproject";
  return [
    {
      urls: stun?.length ? stun : ["stun:stun.l.google.com:19302", "stun:stun.cloudflare.com:3478"],
    },
    { urls: turnUrls, username: turnUser, credential: turnPass },
  ];
}
