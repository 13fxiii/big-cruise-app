import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Chapter({
  id,
  n,
  kicker,
  title,
  children,
  className,
}: {
  id: string;
  n: string;
  kicker?: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-20 border-t border-lane py-16 md:scroll-mt-8 md:py-24", className)}>
      <div className="mb-10 flex flex-col gap-4 md:mb-14">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm font-medium tracking-wider text-danfo">{n}</span>
          <span className="slash-rule" />
          {kicker ? (
            <span className="font-display text-sm font-semibold uppercase tracking-[0.22em] text-concrete">{kicker}</span>
          ) : null}
        </div>
        <h2 className="max-w-3xl font-display text-4xl font-extrabold uppercase leading-[0.92] tracking-[0.02em] text-bone sm:text-5xl md:text-6xl">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("max-w-2xl space-y-4 text-base leading-relaxed text-bone/85", className)}>{children}</div>;
}

export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-[20px] bg-asphalt p-5 shadow-[var(--shadow-border)] md:p-6", className)}>{children}</div>
  );
}
