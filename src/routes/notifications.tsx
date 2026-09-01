"use client";

import { createFileRoute } from "@tanstack/react-router";
import { CruisePage } from "@/components/cruise/CruiseShell";
import { CruiseButton, CruiseCard } from "@/components/cruise/CruiseUI";
import { enableCruiseNotes, ping } from "@/lib/pwa/notify";
import { usePlayer } from "@/lib/games/player";

export const Route = createFileRoute("/notifications")({
  component: NotificationsScreen,
});

function NotificationsScreen() {
  const notices = usePlayer((s) => s.notices);
  return (
    <CruisePage kicker="Alerts" title="Notifications">
      <CruiseCard className="flex flex-col items-start gap-4 py-8">
        <CruiseButton onClick={() => void enableCruiseNotes()}>Enable alerts</CruiseButton>
        <CruiseButton
          variant="line"
          onClick={() => ping("Space is live", "BIG CRUISE is on X audio. Sit down.", "/play")}
        >
          Space is live
        </CruiseButton>
        {!notices.length ? (
          <p className="font-display text-3xl font-bold uppercase">Quiet</p>
        ) : (
          <ul className="w-full space-y-3">
            {notices.map((n) => (
              <li key={n.id} className="border-b border-lane pb-3">
                <p className="font-display text-xl font-bold uppercase">{n.title}</p>
                {n.body ? (
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-concrete">{n.body}</p>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </CruiseCard>
    </CruisePage>
  );
}
