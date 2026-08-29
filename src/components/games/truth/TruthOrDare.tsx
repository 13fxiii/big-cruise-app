"use client";

import { GameShell } from "@/components/games/Shell";
import { SitDown, type SitDownStart } from "@/components/games/SitDown";
import { Button } from "@/components/ui/button";
import { fisherYates, getGame } from "@/lib/games/catalog";
import { sfx } from "@/lib/games/audio";
import { playIf, usePlayer } from "@/lib/games/player";
import { cn } from "@/lib/utils";
import { useState } from "react";

const game = getGame("truth")!;

const TRUTH = [
  "Who in this room would you call at 3am, no explanation?",
  "Which cruise member changed how you move this year?",
  "What is a lie you still tell the group chat?",
  "Who here has the most dangerous taste in music?",
  "When last did you actually rest?",
  "Which city would you disappear to for a month?",
  "Who would you trust with your phone unlocked?",
  "What job are you pretending not to want?",
  "Which friendship did the cruise accidentally save?",
  "What are you scared to post, even here?",
  "Who in the room do you secretly compete with?",
  "What is your most Lagos habit that followed you abroad?",
  "Which Spaces moment still lives in your head?",
  "Who would you start a business with tonight?",
  "What did you outgrow that you have not admitted?",
];

const DARE = [
  "Send a voice note of your worst shower song.",
  "Give a 20-second toast to the person on your left.",
  "Dance 15 seconds of the last song you played. No skip.",
  "Write a fake LinkedIn headline for someone here and read it.",
  "Do your best danfo conductor call.",
  "Call someone in this room ‘boss’ for the next three rounds.",
  "Post a story that just says ‘the cruise is the people’ and nothing else.",
  "Imitate the last person who spoke until they laugh.",
  "Let the room pick your next display name for 10 minutes.",
  "Give a roast so clean it still feels like love.",
  "Teach the room one dance step you actually know.",
  "Speak only pidgin until your next turn.",
  "Rank three people here by who would survive a Lagos Monday.",
  "Do a 10-second radio ad for BIG CRUISE.",
  "Swap seats with whoever looks most comfortable.",
];

const CRUISE = [
  "Name three people who showed up when it was ugly.",
  "What vendor in the cruise deserves a shoutout right now?",
  "Who is overdue a birthday post?",
  "Confess a time you lurked instead of speaking.",
  "What should the next Spaces actually be about?",
  "Assign everyone a 7 Days energy. No repeats.",
  "Who would host Too Lit Tuesday and not ruin it?",
  "Pitch a merch drop in one sentence.",
];

type Deck = "truth" | "dare" | "cruise";

export function TruthOrDare() {
  const muted = usePlayer((s) => s.muted);
  const [sit, setSit] = useState<SitDownStart | null>(null);
  const [deck, setDeck] = useState<Deck>("truth");
  const [card, setCard] = useState("The wheel is waiting.");
  const [spinning, setSpinning] = useState(false);
  const [angle, setAngle] = useState(0);

  const draw = (d: Deck) => {
    const pool = d === "truth" ? TRUTH : d === "dare" ? DARE : CRUISE;
    setDeck(d);
    setSpinning(true);
    playIf(muted, sfx.dice);
    const extra = 360 * 4 + Math.floor(Math.random() * 360);
    setAngle((a) => a + extra);
    window.setTimeout(() => {
      setCard(fisherYates(pool)[0]);
      setSpinning(false);
      playIf(muted, sfx.play);
    }, 900);
  };

  if (!sit) {
    return (
      <GameShell game={game}>
        <SitDown game={game} defaultSeats={4} minSeats={2} maxSeats={12} onStart={setSit} />
      </GameShell>
    );
  }

  return (
    <GameShell game={game}>
      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center gap-8 px-5 py-10">
        <div
          className="relative size-48 rounded-full border-4 border-danfo"
          style={{
            background:
              "conic-gradient(#FF2B6B 0 120deg, #F5C400 120deg 240deg, #6A2C91 240deg 360deg)",
            transform: `rotate(${angle}deg)`,
            transition: spinning ? "transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)" : "none",
          }}
        >
          <span className="absolute left-1/2 top-3 -translate-x-1/2 font-display text-sm font-bold uppercase text-midnight">
            Truth
          </span>
          <span className="absolute bottom-8 left-6 font-display text-sm font-bold uppercase text-midnight">
            Dare
          </span>
          <span className="absolute bottom-8 right-4 font-display text-sm font-bold uppercase text-bone">
            Cruise
          </span>
        </div>
        <div className="h-0 w-0 border-l-8 border-r-8 border-t-[16px] border-l-transparent border-r-transparent border-t-danfo" />

        <p className="min-h-28 text-center font-display text-3xl font-bold uppercase leading-tight md:text-4xl">{card}</p>
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-concrete">{deck}</p>

        <div className="flex flex-wrap justify-center gap-2">
          <Button onClick={() => draw("truth")}>Truth</Button>
          <Button variant="line" onClick={() => draw("dare")}>
            Dare
          </Button>
          <Button variant="ghost" onClick={() => draw("cruise")}>
            Cruise
          </Button>
        </div>
      </div>
    </GameShell>
  );
}
