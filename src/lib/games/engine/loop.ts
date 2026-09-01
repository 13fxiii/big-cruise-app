/** rAF loop. Pauses when the tab hides. Web + PWA. */
export function startLoop(tick: (dt: number) => void) {
  let raf = 0;
  let last = performance.now();
  let live = true;
  const frame = (now: number) => {
    if (!live) return;
    tick(Math.min(0.05, (now - last) / 1000));
    last = now;
    raf = requestAnimationFrame(frame);
  };
  const onVis = () => {
    last = performance.now();
  };
  document.addEventListener("visibilitychange", onVis);
  raf = requestAnimationFrame(frame);
  return () => {
    live = false;
    cancelAnimationFrame(raf);
    document.removeEventListener("visibilitychange", onVis);
  };
}
