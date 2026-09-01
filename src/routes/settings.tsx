"use client";

import { createFileRoute } from "@tanstack/react-router";
import { SettingsPage } from "@/components/cruise/WorldPages";
import { HOUSE_ID, X_COMMUNITY } from "@/lib/cruise/id-card";

export const Route = createFileRoute("/settings")({
  component: () => (
    <>
      <SettingsPage />
      <div className="mx-auto flex max-w-xl flex-col gap-3 px-4 pb-24">
        <a href={X_COMMUNITY} className="week-ink font-display text-lg font-bold uppercase">
          X community
        </a>
        <button
          type="button"
          className="min-h-11 text-left font-mono text-[10px] uppercase tracking-[0.18em] text-concrete"
          onClick={() => {
            const on = localStorage.getItem("bch-house") === "1";
            localStorage.setItem("bch-house", on ? "0" : "1");
            window.location.reload();
          }}
        >
          House crew ID · {HOUSE_ID}
        </button>
      </div>
    </>
  ),
});
