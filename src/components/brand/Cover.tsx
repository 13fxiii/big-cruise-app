"use client";

import { CoverFrame, NightField } from "@/components/brand/NightField";
import { LiveMark, Wordmark } from "@/components/brand/marks";
import { Button } from "@/components/ui/button";

export function Cover() {
  return (
    <section
      id="cover"
      className="relative flex min-h-[100dvh] flex-col justify-between overflow-hidden px-5 pb-6 pt-20 md:px-10 md:py-8 md:pl-72"
    >
      <NightField photo />
      <CoverFrame />

      <header className="relative z-10 flex items-center justify-between gap-4">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.28em] text-concrete">
          Official Brand Lock-in + 7 Days of Cruise
        </p>
        <p className="font-mono text-sm font-medium tracking-[0.22em] text-danfo">V1.0 / 2026</p>
      </header>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center py-12 text-center stagger-in">
        <LiveMark className="mb-8 size-28 text-danfo sm:size-36 md:size-44" />
        <Wordmark className="text-5xl text-bone sm:text-7xl md:text-8xl" />
        <p className="mt-6 max-w-md font-display text-xl font-semibold uppercase tracking-[0.18em] text-danfo sm:text-2xl">
          Where the cruise lives.
        </p>
        <p className="mt-8 max-w-lg text-sm leading-relaxed text-bone/75 sm:text-base">
          A Nigerian internet family, designed like a brand. One house. Seven rooms. Built for the timeline, the Space,
          the tee, and the people who keep showing up.
        </p>
        <Button
          className="mt-10"
          onClick={() => document.getElementById("essence")?.scrollIntoView({ behavior: "smooth" })}
        >
          Enter the system
        </Button>
      </div>

      <footer className="relative z-10 flex flex-wrap items-end justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-concrete">
        <span>FX — @13fxiii</span>
        <span>@BCHub_</span>
        <span>#FXIII</span>
      </footer>
      <div className="relative z-10 mt-4 grid grid-cols-7 gap-1">
        {[
          ["#7A1F33", "Mon"],
          ["#FF2B6B", "Tue"],
          ["#C45A72", "Wed"],
          ["#C4A574", "Thu"],
          ["#6A2C91", "Fri"],
          ["#9B1228", "Sat"],
          ["#C8F542", "Sun"],
        ].map(([c, l]) => (
          <a key={l} href={`#day-${l.toLowerCase()}`} className="flex min-h-10 items-center justify-center font-display text-[10px] font-bold uppercase tracking-[0.12em]" style={{ background: c, color: l === "Thu" || l === "Sun" ? "#0B0B0B" : "#F3EFE4" }}>
            {l}
          </a>
        ))}
      </div>
    </section>
  );
}
