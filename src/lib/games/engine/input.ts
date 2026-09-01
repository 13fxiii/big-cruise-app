/** Unified pointer/touch for phone and desktop. */
export type Point = { x: number; y: number };

export function clientPoint(e: PointerEvent | React.PointerEvent): Point {
  return { x: e.clientX, y: e.clientY };
}

export function normPoint(e: PointerEvent | React.PointerEvent, el: HTMLElement): Point {
  const r = el.getBoundingClientRect();
  const w = r.width || 1;
  const h = r.height || 1;
  return { x: (e.clientX - r.left) / w, y: (e.clientY - r.top) / h };
}

export const HIT = 44;
