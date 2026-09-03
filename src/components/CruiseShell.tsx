import { LiveMark, Spark, Wordmark } from "@/components/brand/marks";
import { CruiseBackground, type CruiseDensity } from "@/components/cruise/CruiseBackground";
import { CruiseLoader } from "@/components/cruise/CruiseLoader";
import { CruiseAvatar, CruiseModal, CruiseToastRack } from "@/components/cruise/CruiseUI";
import { signOut } from "@/lib/auth/client";
import { usePlayer } from "@/lib/games/player";
import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import { Bell, Disc3, Gamepad2, LogOut, MoreHorizontal, ShoppingBag, UserRound } from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";

const PRIMARY = [
  { to: "/play", label: "Play", icon: Gamepad2 },
  { to: "/merch", label: "Merch", icon: ShoppingBag },
  { to: "/profile", label: "Profile", icon: UserRound },
] as const;

const MORE = [
  { to: "/music", label: "Music", icon: Disc3 },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/rewards", label: "Rewards" },
  { to: "/brand", label: "Brand" },
] as const;

export function CruiseShell({ children, density = "default" }: { children: ReactNode; density?: CruiseDensity }) {
  const routerState = useRouterState();
  const [more, setMore] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMore(false);
  }, [routerState.location.pathname]);

  async function handleSignOut() {
    if (loading) return;
    setLoading(true);
    try {
      await signOut();
      window.location.assign("/");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-ink text-bone">
      <CruiseBackground density={density} />
      <header className="sticky top-0 z-40 border-b border-lane/70 bg-ink/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link to="/" className="shrink-0" aria-label="BIG CRUISE home">
            <Wordmark className="h-8 w-auto" />
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
            {PRIMARY.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="flex min-h-10 items-center gap-2 rounded-full px-4 font-display text-sm font-bold uppercase tracking-[0.08em] text-muted transition hover:bg-lane/50 hover:text-bone data-[status=active]:bg-yellow data-[status=active]:text-ink"
              >
                <Icon size={17} aria-hidden="true" />
                {label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => setMore(true)}
              className="flex min-h-10 items-center gap-2 rounded-full px-4 font-display text-sm font-bold uppercase tracking-[0.08em] text-muted transition hover:bg-lane/50 hover:text-bone"
              aria-haspopup="dialog"
              aria-expanded={more}
            >
              <MoreHorizontal size={17} aria-hidden="true" />
              More
            </button>
          </nav>

          <div className="flex items-center gap-2">
            <LiveMark className="hidden h-7 w-auto sm:block" />
            <CruiseAvatar />
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-4 pb-24 pt-6 sm:px-6 md:pb-10">{children}</main>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-lane/70 bg-ink/95 px-2 py-2 backdrop-blur md:hidden" aria-label="Mobile navigation">
        <div className="mx-auto grid max-w-md grid-cols-4 gap-1">
          {PRIMARY.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl text-muted data-[status=active]:bg-yellow data-[status=active]:text-ink"
            >
              <Icon size={18} aria-hidden="true" />
              <span className="font-display text-[10px] font-bold uppercase tracking-[0.08em]">{label}</span>
            </Link>
          ))}
          <button
            type="button"
            onClick={() => setMore(true)}
            className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl text-muted"
            aria-haspopup="dialog"
            aria-expanded={more}
          >
            <MoreHorizontal size={18} aria-hidden="true" />
            <span className="font-display text-[10px] font-bold uppercase tracking-[0.08em]">More</span>
          </button>
        </div>
      </nav>

      <CruiseModal open={more} onClose={() => setMore(false)} title="More">
        <div className="grid gap-2">
          {MORE.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMore(false)}
              className="flex min-h-12 items-center gap-3 rounded-xl border border-lane bg-lane/20 px-4 font-display text-base font-bold uppercase tracking-[0.08em] text-bone transition hover:bg-lane/50"
            >
              {Icon ? <Icon size={18} aria-hidden="true" /> : <Spark className="h-4 w-4" />}
              {label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          disabled={loading}
          className={cn(
            "mt-4 flex min-h-12 w-full items-center justify-between rounded-xl border border-lane px-4 font-display text-base font-bold uppercase tracking-[0.08em] text-bone transition hover:border-yellow hover:text-yellow disabled:cursor-wait disabled:opacity-60",
          )}
        >
          <span className="flex items-center gap-3">
            <LogOut size={18} aria-hidden="true" />
            {loading ? "Logging out…" : "Log out"}
          </span>
        </button>
      </CruiseModal>

      <CruiseToastRack />
      <CruiseLoader />
    </div>
  );
}
