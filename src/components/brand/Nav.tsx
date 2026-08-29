"use client";

import { MidnightMark, Wordmark } from "@/components/brand/marks";
import { nav } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("essence");

  useEffect(() => {
    const ids = nav.flatMap((g) => g.items.map((i) => i.id));
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (vis?.target.id) setActive(vis.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0.1, 0.25, 0.5] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const list = (
    <nav className="flex flex-col gap-7">
      <Link
        to="/"
        className="font-display text-lg font-semibold uppercase tracking-[0.08em] text-danfo hover:text-bone"
      >
        Game Room
      </Link>
      {nav.map((group) => (
        <div key={group.label}>
          <p className="mb-2 font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-concrete">
            {group.label}
          </p>
          <ul className="flex flex-col">
            {group.items.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => go(item.id)}
                  className={cn(
                    "flex min-h-11 w-full items-center gap-3 py-1 text-left font-display text-lg font-semibold uppercase tracking-[0.08em] transition-colors duration-150",
                    active === item.id ? "text-danfo" : "text-bone/70 hover:text-bone",
                  )}
                >
                  <span className="w-6 font-mono text-xs font-medium tracking-wider text-danfo/80">{item.n}</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-lane bg-midnight/92 px-4 py-3 backdrop-blur-md md:hidden">
        <button type="button" onClick={() => go("cover")} className="flex items-center gap-2">
          <MidnightMark className="size-8 text-danfo" />
          <Wordmark className="text-xl text-bone" compact />
        </button>
        <button
          type="button"
          className="flex size-11 items-center justify-center text-bone"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open ? (
        <div className="fixed inset-0 z-30 overflow-y-auto bg-midnight px-5 pb-10 pt-20 md:hidden">{list}</div>
      ) : null}

      <aside className="fixed bottom-0 left-0 top-0 z-20 hidden w-64 overflow-y-auto border-r border-lane bg-midnight px-5 py-8 md:block">
        <button type="button" onClick={() => go("cover")} className="mb-8 flex items-center gap-2">
          <MidnightMark className="size-9 text-danfo" />
          <Wordmark className="text-xl text-bone" compact />
        </button>
        {list}
      </aside>
    </>
  );
}
