"use client";

import { GameShell } from "@/components/games/Shell";
import { SitDown, type SitDownStart } from "@/components/games/SitDown";
import { Button } from "@/components/ui/button";
import { fisherYates, getGame } from "@/lib/games/catalog";
import { sfx } from "@/lib/games/audio";
import { playIf, usePlayer } from "@/lib/games/player";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

const game = getGame("word-guess")!;

const PACKS: { name: string; words: string[] }[] = [
  {
    name: "Pidgin",
    words: ["ABEG", "SHARP", "WOTIN", "DEY", "KAI", "NWANNE", "ODINMA", "BIKO", "SABI", "YAMUTU", "COMMOT", "GBEDU"],
  },
  {
    name: "Lagos",
    words: ["LEKKI", "IKEJA", "YABA", "OJUELEGBA", "AJAH", "SURULERE", "VICTORIA", "DANFO", "OKADA", "THIRDMAINLAND"],
  },
  {
    name: "Afrobeats",
    words: ["WIZKID", "BURNA", "DAVIDO", "TEMS", "ASAKE", "REMA", "AYRA", "ODUMODUBLVCK", "FIREBOY", "OMAHLAY"],
  },
  {
    name: "Cruise",
    words: ["SPACES", "BANTER", "MOTION", "FAITH", "FAMILY", "TIMELINE", "SHOUTOUT", "VENDOR", "BIRTHDAY", "CONNECT"],
  },
];

const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function pick(pack = fisherYates(PACKS)[0]) {
  return { pack: pack.name, word: fisherYates(pack.words)[0] };
}

export function WordGuess() {
  const muted = usePlayer((s) => s.muted);
  const [sit, setSit] = useState<SitDownStart | null>(null);
  const [seed, setSeed] = useState(pick);
  const [guessed, setGuessed] = useState<string[]>([]);
  const [packName, setPackName] = useState(PACKS[0].name);

  const misses = guessed.filter((l) => !seed.word.includes(l));
  const lives = 6 - misses.length;
  const revealed = seed.word.split("").map((ch) => (/[A-Z]/.test(ch) ? (guessed.includes(ch) ? ch : "_") : ch));
  const won = revealed.join("") === seed.word;
  const lost = lives <= 0;
  const over = won || lost;

  const hang = useMemo(() => {
    const parts = ["base", "pole", "beam", "rope", "head", "body"];
    return parts.slice(0, misses.length);
  }, [misses.length]);

  if (!sit) {
    return (
      <GameShell game={game}>
        <SitDown game={game} defaultSeats={1} minSeats={1} maxSeats={12} onStart={setSit} />
      </GameShell>
    );
  }

  const guess = (l: string) => {
    if (over || guessed.includes(l)) return;
    const next = [...guessed, l];
    setGuessed(next);
    playIf(muted, seed.word.includes(l) ? sfx.correct : sfx.wrong);
    if (seed.word.split("").every((c) => !/[A-Z]/.test(c) || next.includes(c))) playIf(muted, sfx.win);
    if (6 - next.filter((x) => !seed.word.includes(x)).length <= 0) playIf(muted, sfx.lose);
  };

  const reset = (name = packName) => {
    const pack = PACKS.find((p) => p.name === name) ?? PACKS[0];
    setSeed(pick(pack));
    setGuessed([]);
  };

  return (
    <GameShell
      game={game}
      status={
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-concrete">
          {seed.pack} · {lives} lives
        </p>
      }
    >
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center gap-6 px-4 py-8">
        <div className="flex flex-wrap gap-2">
          {PACKS.map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() => {
                setPackName(p.name);
                reset(p.name);
              }}
              className={cn(
                "min-h-11 border px-4 font-display text-sm font-bold uppercase tracking-[0.14em]",
                packName === p.name ? "border-danfo bg-danfo text-midnight" : "border-lane text-bone",
              )}
            >
              {p.name}
            </button>
          ))}
        </div>

        <svg viewBox="0 0 120 140" className="h-40 text-echo">
          <line x1="10" y1="130" x2="70" y2="130" stroke="currentColor" strokeWidth="4" />
          {hang.includes("pole") || lives < 6 ? <line x1="30" y1="130" x2="30" y2="20" stroke="currentColor" strokeWidth="4" /> : null}
          <line x1="30" y1="20" x2="80" y2="20" stroke="currentColor" strokeWidth="4" />
          <line x1="80" y1="20" x2="80" y2="36" stroke="currentColor" strokeWidth="3" />
          {misses.length >= 1 ? <circle cx="80" cy="48" r="12" fill="none" stroke="currentColor" strokeWidth="3" /> : null}
          {misses.length >= 2 ? <line x1="80" y1="60" x2="80" y2="92" stroke="currentColor" strokeWidth="3" /> : null}
          {misses.length >= 3 ? <line x1="80" y1="70" x2="64" y2="84" stroke="currentColor" strokeWidth="3" /> : null}
          {misses.length >= 4 ? <line x1="80" y1="70" x2="96" y2="84" stroke="currentColor" strokeWidth="3" /> : null}
          {misses.length >= 5 ? <line x1="80" y1="92" x2="66" y2="116" stroke="currentColor" strokeWidth="3" /> : null}
          {misses.length >= 6 ? <line x1="80" y1="92" x2="94" y2="116" stroke="currentColor" strokeWidth="3" /> : null}
        </svg>

        <p className="font-display text-4xl font-bold tracking-[0.35em] text-bone md:text-5xl">
          {revealed.join(" ")}
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-concrete">
          {won ? "The word was always in the cruise." : lost ? `It was ${seed.word}.` : "Call a letter."}
        </p>

        <div className="grid w-full grid-cols-9 gap-1.5">
          {ALPHA.map((l) => (
            <button
              key={l}
              type="button"
              disabled={over || guessed.includes(l)}
              onClick={() => guess(l)}
              className={cn(
                "min-h-11 border font-display text-lg font-bold disabled:opacity-30",
                guessed.includes(l) && seed.word.includes(l)
                  ? "border-danfo bg-danfo text-midnight"
                  : guessed.includes(l)
                    ? "border-lane text-concrete line-through"
                    : "border-lane text-bone hover:border-danfo",
              )}
            >
              {l}
            </button>
          ))}
        </div>

        {over ? <Button onClick={() => reset()}>Next word</Button> : null}
      </div>
    </GameShell>
  );
}
