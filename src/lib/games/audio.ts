let ctx: AudioContext | null = null;

export function unlockAudio() {
  if (typeof window === "undefined") return;
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new AC({ latencyHint: "interactive" });
  }
  if (ctx.state === "suspended") void ctx.resume();
}

function weekMul() {
  const id = typeof document !== "undefined" ? document.documentElement.dataset.week : "";
  const map: Record<string, number> = {
    mon: 0.88,
    tue: 1.12,
    wed: 1.02,
    thu: 0.94,
    fri: 1.18,
    sat: 0.9,
    sun: 1.22,
  };
  return map[id ?? ""] ?? 1;
}

function tone(freq: number, dur = 0.12, type: OscillatorType = "square", gain = 0.07) {
  unlockAudio();
  if (!ctx) return;
  const t = ctx.currentTime;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq * weekMul(), t);
  g.gain.setValueAtTime(gain, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g);
  g.connect(ctx.destination);
  o.start(t);
  o.stop(t + dur + 0.02);
}

function chord(freqs: number[], dur = 0.16, gap = 70) {
  freqs.forEach((f, i) => {
    window.setTimeout(() => tone(f, dur, "triangle", 0.06), i * gap);
  });
}

export const sfx = {
  tap: () => tone(420 + Math.random() * 40, 0.05, "square", 0.04),
  play: () => chord([520, 780], 0.09, 45),
  deal: () => tone(260 + Math.random() * 90, 0.045, "square", 0.03),
  draw: () => tone(190, 0.05, "triangle", 0.035),
  uno: () => chord([880, 1174, 1568], 0.12, 55),
  dice: () => tone(160 + Math.random() * 50, 0.09, "sawtooth", 0.045),
  hop: () => tone(640, 0.06, "triangle", 0.04),
  capture: () => tone(96, 0.22, "square", 0.06),
  win: () => chord([523, 659, 784, 1046], 0.18, 90),
  lose: () => tone(130, 0.32, "sawtooth", 0.05),
  tick: () => tone(880, 0.03, "square", 0.03),
  correct: () => chord([660, 990], 0.1, 40),
  wrong: () => tone(180, 0.14, "square", 0.05),
  night: () => tone(90, 0.4, "sine", 0.05),
  vote: () => chord([400, 300], 0.1, 60),
  mic: () => tone(500, 0.08, "sine", 0.04),
};

if (typeof window !== "undefined") {
  const unlock = () => unlockAudio();
  window.addEventListener("pointerdown", unlock, { once: true });
  window.addEventListener("keydown", unlock, { once: true });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") unlockAudio();
  });
}
