"use client";

import { cn } from "@/lib/utils";
import { type CSSProperties, type ReactNode, useCallback, useEffect, useRef, useState } from "react";
import "./table-stage.css";

/**
 * CSS 3D table (checkpoint 1).
 * Why not WebGL yet: card/board UI stays sharp on type, zero extra bundle,
 * works in reduced-motion, and week theme only tints chrome.
 * Next checkpoint: R3F scene for chess lighting only, same room protocol.
 */
export function TableStage({
  children,
  className,
  felt = "var(--color-asphalt)",
}: {
  children: ReactNode;
  className?: string;
  felt?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 12, y: 0 });
  const current = useRef({ x: 12, y: 0 });
  const [tilt, setTilt] = useState({ x: 12, y: 0 });
  const reduce = useRef(false);

  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce.current) return;
    let raf = 0;
    const tick = () => {
      const c = current.current;
      const t = target.current;
      c.x += (t.x - c.x) * 0.16;
      c.y += (t.y - c.y) * 0.16;
      if (Math.abs(c.x - t.x) > 0.05 || Math.abs(c.y - t.y) > 0.05) {
        setTilt({ x: c.x, y: c.y });
      }
      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, []);

  const aim = useCallback((x: number, y: number) => {
    target.current = { x, y };
    if (reduce.current) setTilt({ x, y });
  }, []);

  const onMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      aim(10 + py * -8, px * 10);
    },
    [aim],
  );

  const stageStyle: CSSProperties = {
    perspective: "1400px",
    perspectiveOrigin: "50% 18%",
    padding: "1.25rem 0.75rem 2.5rem",
  };

  const innerStyle: CSSProperties = {
    transform: reduce.current ? "none" : `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(8px)`,
    transformStyle: "preserve-3d",
    background: felt,
    backfaceVisibility: "hidden",
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={() => aim(12, 0)}
      className={cn("table-stage", className)}
      style={stageStyle}
    >
      <div className="table-stage-inner felt-table" style={innerStyle}>
        {children}
      </div>
    </div>
  );
}
