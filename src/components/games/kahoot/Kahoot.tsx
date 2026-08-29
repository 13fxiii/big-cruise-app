"use client";

import { GameShell } from "@/components/games/Shell";
import { SitDown, type SitDownStart } from "@/components/games/SitDown";
import { Button } from "@/components/ui/button";
import { BOT_NAMES, fisherYates, getGame } from "@/lib/games/catalog";
import { sfx } from "@/lib/games/audio";
import { playIf, usePlayer } from "@/lib/games/player";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const game = getGame("kahoot")!;

type Q = { q: string; a: string[]; w: number };

const PACKS: { name: string; qs: Q[] }[] = [
  {
    name: "BCH culture",
    qs: [
      { q: "What is the official BIG CRUISE tagline?", a: ["Where the cruise lives.", "We move different.", "Stay lit.", "No days off."], w: 0 },
      { q: "The 〽️ mark is treated as…", a: ["A sparkle clipart", "The logo the room already types", "A yacht wheel", "A bus icon"], w: 1 },
      { q: "Which colour is Lagos Danfo Yellow?", a: ["#FFD700", "#F5C400", "#FFFF00", "#C9A000"], w: 1 },
      { q: "Former name that must never return?", a: ["Cruise Connect Hub", "The Room", "Night Bus", "FX Club"], w: 0 },
      { q: "Sunday in the 7 Days system is…", a: ["Dominion", "Playlist", "Chaos", "Divine"], w: 2 },
      { q: "Who leads the cruise?", a: ["A board", "FX", "A brand manager", "Nobody"], w: 1 },
      { q: "Gold in the identity is…", a: ["Required", "Rejected", "The primary", "For merch only"], w: 1 },
      { q: "The cruise is primarily…", a: ["A transport company", "A tourism firm", "A community", "A fintech"], w: 2 },
    ],
  },
  {
    name: "Afrobeats",
    qs: [
      { q: "Wizkid’s first major album is often cited as…", a: ["Made in Lagos", "Superstar", "Ayo", "Sounds from the Other Side"], w: 1 },
      { q: "Burna Boy’s genre tag for himself?", a: ["Afro-fusion", "Highlife", "Juju", "Fuji"], w: 0 },
      { q: "Tems first blew globally via a feature on…", a: ["Essence", "Calm Down", "Love Nwantiti", "Peru"], w: 0 },
      { q: "Asake’s label home at breakout?", a: ["YBNL", "Starboy", "Mavin", "Chocolate City"], w: 0 },
      { q: "Fela’s club in Lagos was called…", a: ["The Shrine", "New Afrika", "Afrika Shrine", "Kalakuta Lounge"], w: 2 },
      { q: "Rema’s breakout single?", a: ["Calm Down", "Dumebi", "Soundgasm", "Woman"], w: 1 },
      { q: "Davido’s 2017 hit with a wedding video energy?", a: ["If", "Fall", "FIA", "Assurance"], w: 1 },
      { q: "Which city is the spiritual home of Afrobeats industry?", a: ["Accra", "Lagos", "London", "Atlanta"], w: 1 },
    ],
  },
  {
    name: "Lagos streets",
    qs: [
      { q: "A danfo is…", a: ["A yellow minibus", "A ferry", "A keke", "A bike"], w: 0 },
      { q: "Third Mainland connects Lagos Island to…", a: ["Lekki", "The mainland", "Ikorodu only", "Badagry"], w: 1 },
      { q: "Suya is typically…", a: ["Grilled spiced meat", "A soup", "A pastry", "A drink"], w: 0 },
      { q: "Okada means…", a: ["Motorcycle taxi", "Shared cab", "Canoe", "Train"], w: 0 },
      { q: "Owambe is…", a: ["A party", "A tax", "A dance only", "A street"], w: 0 },
      { q: "Jollof wars are mostly with…", a: ["Ghana", "Kenya", "SA", "Egypt"], w: 0 },
      { q: "A generator in the compound is nicknamed…", a: ["I pass my neighbour", "The lion", "Yellow fever", "Gbedu box"], w: 0 },
      { q: "Lekki-Ikoyi link is a…", a: ["Bridge", "Market", "Club", "Stadium"], w: 0 },
    ],
  },
];

const PADS = [
  { bg: "#9B1228", shape: "▲" },
  { bg: "#1B4F8A", shape: "◆" },
  { bg: "#C8A000", shape: "●" },
  { bg: "#2F6B3A", shape: "■" },
];

export function Kahoot() {
  const human = usePlayer((s) => s.name);
  const muted = usePlayer((s) => s.muted);
  const [sit, setSit] = useState<SitDownStart | null>(null);
  const [pack, setPack] = useState(0);
  const [i, setI] = useState(0);
  const [clock, setClock] = useState(12);
  const [picked, setPicked] = useState<number | null>(null);
  const [scores, setScores] = useState<{ name: string; bot: boolean; n: number }[]>([]);
  const [done, setDone] = useState(false);

  const qs = PACKS[pack].qs;
  const q = qs[i];

  const start = (opts: SitDownStart) => {
    setSit(opts);
    const bots = fisherYates(BOT_NAMES).slice(0, Math.max(0, opts.seats - 1));
    setScores([{ name: human, bot: false, n: 0 }, ...bots.map((name) => ({ name, bot: true, n: 0 }))]);
    setI(0);
    setClock(12);
    setPicked(null);
    setDone(false);
  };

  useEffect(() => {
    if (!sit || done || picked != null) return;
    if (clock <= 0) {
      lock(-1);
      return;
    }
    const t = window.setTimeout(() => {
      playIf(muted, sfx.tick);
      setClock((c) => c - 1);
    }, 1000);
    return () => window.clearTimeout(t);
  }, [sit, clock, done, picked, muted]);

  const lock = (choice: number) => {
    if (picked != null) return;
    setPicked(choice);
    playIf(muted, choice === q.w ? sfx.correct : sfx.wrong);
    setScores((s) =>
      s.map((row) => {
        if (!row.bot) {
          const pts = choice === q.w ? 100 + clock * 10 : 0;
          return { ...row, n: row.n + pts };
        }
        const botChoice = Math.random() < 0.55 ? q.w : Math.floor(Math.random() * 4);
        const speed = 3 + Math.floor(Math.random() * 8);
        const pts = botChoice === q.w ? 100 + speed * 10 : 0;
        return { ...row, n: row.n + pts };
      }),
    );
  };

  const next = () => {
    if (i + 1 >= qs.length) {
      setDone(true);
      const top = [...scores].sort((a, b) => b.n - a.n)[0];
      playIf(muted, top?.bot ? sfx.lose : sfx.win);
      return;
    }
    setI(i + 1);
    setClock(12);
    setPicked(null);
  };

  if (!sit) {
    return (
      <GameShell game={game}>
        <SitDown game={game} defaultSeats={4} minSeats={1} maxSeats={8} onStart={start} />
      </GameShell>
    );
  }

  const ranked = [...scores].sort((a, b) => b.n - a.n);

  return (
    <GameShell
      game={game}
      status={
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-concrete">
          {PACKS[pack].name} · {i + 1}/{qs.length}
        </p>
      }
    >
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-5 px-4 py-5">
        {!sit ? null : (
          <div className="flex flex-wrap gap-2">
            {PACKS.map((p, idx) => (
              <button
                key={p.name}
                type="button"
                onClick={() => {
                  setPack(idx);
                  start(sit);
                }}
                className={cn(
                  "min-h-11 border px-3 font-display text-sm font-bold uppercase tracking-[0.12em]",
                  pack === idx ? "border-danfo bg-danfo text-midnight" : "border-lane",
                )}
              >
                {p.name}
              </button>
            ))}
          </div>
        )}

        {done ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <p className="font-display text-5xl font-bold uppercase">Podium</p>
            {ranked.map((r, idx) => (
              <div key={r.name} className="flex w-full max-w-md items-center justify-between border border-lane px-4 py-3">
                <span className="font-display text-2xl font-bold uppercase">
                  {idx + 1} · {r.name}
                </span>
                <span className="font-mono text-sm text-danfo">{r.n}</span>
              </div>
            ))}
            <Button onClick={() => start(sit)}>Again</Button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <span className="font-display text-5xl font-bold text-danfo">{clock}</span>
              <span className="font-mono text-sm text-concrete">{scores[0]?.n ?? 0} pts</span>
            </div>
            <h2 className="font-display text-3xl font-bold uppercase leading-tight md:text-4xl">{q.q}</h2>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {q.a.map((ans, idx) => {
                const show = picked != null;
                const ok = idx === q.w;
                return (
                  <button
                    key={ans}
                    type="button"
                    disabled={picked != null}
                    onClick={() => lock(idx)}
                    className={cn(
                      "flex min-h-20 items-center gap-3 px-4 text-left font-display text-xl font-bold uppercase tracking-wide text-bone",
                      show && ok && "ring-2 ring-danfo",
                      show && picked === idx && !ok && "opacity-40",
                    )}
                    style={{ background: PADS[idx].bg }}
                  >
                    <span className="text-2xl">{PADS[idx].shape}</span>
                    {ans}
                  </button>
                );
              })}
            </div>
            {picked != null ? (
              <Button onClick={next}>{i + 1 >= qs.length ? "Podium" : "Next"}</Button>
            ) : null}
          </>
        )}
      </div>
    </GameShell>
  );
}
