"use client";

import { createFileRoute, Link } from "@tanstack/react-router";
import { CruisePage } from "@/components/cruise/CruiseShell";
import { CruiseButton, CruiseCard } from "@/components/cruise/CruiseUI";
import { loadCrew, parseMember, prettyId, saveCrewMember, type SharedMember } from "@/lib/cruise/share-card";
import { usePlayer } from "@/lib/games/player";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/id")({ component: MemberScanPage });

function MemberScanPage() {
  const search = typeof window !== "undefined" ? window.location.search : "";
  const scanned = useMemo(() => parseMember(search), [search]);
  const self = usePlayer((s) => s.cruiseId);
  const [crew, setCrew] = useState<SharedMember[]>(() => loadCrew());
  const [added, setAdded] = useState(false);

  if (!scanned) {
    return (
      <CruisePage kicker="ID" title="Scan a card">
        <CruiseCard className="space-y-4 py-8">
          <p className="font-display text-2xl font-bold uppercase">No member on this link.</p>
          <Link to="/profile" className="week-ink font-display text-lg font-bold uppercase">
            Open your card
          </Link>
        </CruiseCard>
      </CruisePage>
    );
  }

  const mine = scanned.code === self;

  return (
    <CruisePage kicker="Official member" title={scanned.name}>
      <CruiseCard className="space-y-5 py-8">
        <p className="week-ink font-display text-xl font-bold uppercase">{scanned.rank}</p>
        {scanned.handle ? (
          <p className="font-mono text-xs tracking-[0.16em] text-concrete">@{scanned.handle.replace(/^@/, "")}</p>
        ) : null}
        <p className="font-mono text-sm tracking-[0.2em] text-danfo">{prettyId(scanned.code)}</p>
        <div className="grid grid-cols-2 gap-px bg-lane sm:grid-cols-4">
          <Stat n={String(scanned.level)} l="Level" />
          <Stat n={String(scanned.points)} l="BCH" />
          <Stat n={String(scanned.sits)} l="Sits" />
          <Stat n={String(scanned.wins)} l="Wins" />
        </div>
        {mine ? (
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-concrete">This is you</p>
        ) : (
          <CruiseButton
            onClick={() => {
              setCrew(saveCrewMember(scanned));
              setAdded(true);
            }}
          >
            {added ? "Added" : "Add"}
          </CruiseButton>
        )}
      </CruiseCard>
      {crew.length ? (
        <div className="mt-8 space-y-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-concrete">Crew</p>
          {crew.map((m) => (
            <p key={m.code} className="flex justify-between border-b border-lane py-2 font-display uppercase">
              <span>{m.name}</span>
              <span className="font-mono text-[10px] text-concrete">
                Lv {m.level} · {m.rank}
              </span>
            </p>
          ))}
        </div>
      ) : null}
    </CruisePage>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div className="bg-asphalt px-3 py-3">
      <p className="font-display text-xl font-bold uppercase text-danfo">{n}</p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-concrete">{l}</p>
    </div>
  );
}
