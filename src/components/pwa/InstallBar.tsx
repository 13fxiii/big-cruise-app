"use client";

import { enableCruiseNotes, isStandalone, notePermission, phoneOs } from "@/lib/pwa/notify";
import { useEffect, useState } from "react";

export function InstallBar() {
  const [os, setOs] = useState<"ios" | "android" | "other">("other");
  const [stand, setStand] = useState(true);
  const [perm, setPerm] = useState<string>("default");
  const [hide, setHide] = useState(false);

  useEffect(() => {
    setOs(phoneOs());
    setStand(isStandalone());
    setPerm(notePermission());
  }, []);

  if (hide) return null;

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-lane bg-asphalt px-3 py-2">
      {!stand ? (
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-concrete">
          {os === "ios" ? "Share → Add to Home Screen" : os === "android" ? "Menu → Add to Home screen" : "Install the app"}
        </p>
      ) : (
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-danfo">Installed</p>
      )}
      <div className="flex gap-2">
        {perm !== "granted" && perm !== "unsupported" ? (
          <button
            type="button"
            className="min-h-11 border border-danfo px-3 font-display text-sm font-bold uppercase tracking-[0.12em] text-danfo"
            onClick={() => {
              void enableCruiseNotes().then((p) => setPerm(p));
            }}
          >
            Alerts
          </button>
        ) : null}
        <button
          type="button"
          className="min-h-11 px-2 font-mono text-[10px] uppercase tracking-[0.16em] text-concrete"
          onClick={() => setHide(true)}
        >
          Close
        </button>
      </div>
    </div>
  );
}
