"use client";

import { GameShell } from "@/components/games/Shell";
import { SitDown, type SitDownStart } from "@/components/games/SitDown";
import { Button } from "@/components/ui/button";
import { BOT_NAMES, fisherYates, getGame } from "@/lib/games/catalog";
import { sfx } from "@/lib/games/audio";
import { playIf, usePlayer } from "@/lib/games/player";
import { cn } from "@/lib/utils";
import { useState } from "react";

const game = getGame("werewolf")!;

type Role = "wolf" | "seer" | "doctor" | "hunter" | "villager";
type Phase = "cover" | "night" | "day" | "end";

type Player = {
  id: number;
  name: string;
  bot: boolean;
  role: Role;
  alive: boolean;
  img: string;
};

const IMGS = [
  "/games/werewolf/wolf.jpg",
  "/games/werewolf/seer.jpg",
  "/games/werewolf/doctor.jpg",
  "/games/werewolf/hunter.jpg",
  "/games/werewolf/villager-m.jpg",
  "/games/werewolf/villager-f.jpg",
  "/games/werewolf/villager-m.jpg",
  "/games/werewolf/villager-f.jpg",
];

const ROLE_IMG: Record<Role, string> = {
  wolf: "/games/werewolf/wolf.jpg",
  seer: "/games/werewolf/seer.jpg",
  doctor: "/games/werewolf/doctor.jpg",
  hunter: "/games/werewolf/hunter.jpg",
  villager: "/games/werewolf/villager-m.jpg",
};

function deal(n: number, human: string): Player[] {
  const names = [human, ...fisherYates(BOT_NAMES)].slice(0, n);
  const roles: Role[] = ["wolf", "wolf", "seer", "doctor", "hunter"];
  while (roles.length < n) roles.push("villager");
  const mixed = fisherYates(roles);
  return names.map((name, i) => ({
    id: i,
    name,
    bot: i !== 0,
    role: mixed[i],
    alive: true,
    img: IMGS[i % IMGS.length],
  }));
}

function winnerOf(players: Player[]): string | null {
  const alive = players.filter((p) => p.alive);
  const wolves = alive.filter((p) => p.role === "wolf");
  if (!wolves.length) return "The village holds the night.";
  if (wolves.length >= alive.length - wolves.length) return "The wolves eat the room.";
  return null;
}

export function Werewolf() {
  const human = usePlayer((s) => s.name);
  const muted = usePlayer((s) => s.muted);
  const [sit, setSit] = useState<SitDownStart | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [phase, setPhase] = useState<Phase>("cover");
  const [act, setAct] = useState<"wolf" | "seer" | "doctor">("wolf");
  const [peek, setPeek] = useState<string | null>(null);
  const [log, setLog] = useState<string[]>([]);
  const [night, setNight] = useState(1);
  const [pendingWolf, setPendingWolf] = useState<number | null>(null);

  const me = players[0];
  const over = winnerOf(players);

  const start = (opts: SitDownStart) => {
    setSit(opts);
    setPlayers(deal(opts.seats, human));
    setPhase("cover");
    setAct("wolf");
    setNight(1);
    setPeek(null);
    setPendingWolf(null);
    setLog(["Night 1. The cruise goes quiet."]);
    playIf(muted, sfx.night);
  };

  const alive = () => players.filter((p) => p.alive);

  const botPrey = (list: Player[]) =>
    fisherYates(list.filter((p) => p.role !== "wolf" && p.alive))[0]?.id ?? null;

  const resolveNight = (wolfTarget: number | null, save: number | null) => {
    const next = players.map((p) => {
      if (wolfTarget == null || p.id !== wolfTarget) return p;
      if (save === wolfTarget) return p;
      return { ...p, alive: false };
    });
    const dead = next.find((p, i) => !p.alive && players[i].alive);
    setPlayers(next);
    if (dead) setLog((l) => [...l, `${dead.name} did not wake.`]);
    else setLog((l) => [...l, "Nobody died. The doctor was correct."]);
    const w = winnerOf(next);
    if (w) {
      setPhase("end");
      playIf(muted, w.startsWith("The village") ? sfx.win : sfx.lose);
    } else setPhase("day");
  };

  const finishNight = (wolfTarget: number | null, save: number | null, peekId?: number) => {
    if (peekId != null) {
      const t = players[peekId];
      setPeek(`${t.name} is ${t.role === "wolf" ? "a wolf" : "not a wolf"}.`);
    }
    const doc = players.find((p) => p.role === "doctor" && p.alive);
    const autoSave = save ?? (doc?.bot ? fisherYates(alive())[0]?.id ?? null : null);
    const wolves = players.filter((p) => p.role === "wolf" && p.alive);
    const autoWolf = wolfTarget ?? (wolves.every((w) => w.bot) ? botPrey(players) : botPrey(players));
    resolveNight(autoWolf, autoSave);
  };

  const afterWolf = (wolfId: number | null) => {
    setPendingWolf(wolfId);
    if (me?.role === "seer" && me.alive) {
      setAct("seer");
      return;
    }
    if (me?.role === "doctor" && me.alive) {
      setAct("doctor");
      return;
    }
    finishNight(wolfId, null);
  };

  const onFace = (id: number) => {
    if (over || phase === "end" || !players[id].alive) return;
    if (phase === "night") {
      if (act === "wolf" && me?.role === "wolf") afterWolf(id);
      else if (act === "seer" && me?.role === "seer") {
        finishNight(pendingWolf, null, id);
      } else if (act === "doctor" && me?.role === "doctor") finishNight(pendingWolf, id);
      return;
    }
    if (phase === "day" && id !== 0) hang(id);
  };

  const hang = (id: number) => {
    const living = alive();
    const votes: Record<number, number> = {};
    living.forEach((p) => {
      const pick = p.bot ? fisherYates(living.filter((x) => x.id !== p.id))[0].id : id;
      votes[pick] = (votes[pick] ?? 0) + 1;
    });
    const hanged = Number(Object.entries(votes).sort((a, b) => b[1] - a[1])[0][0]);
    const next = players.map((p) => (p.id === hanged ? { ...p, alive: false } : p));
    setPlayers(next);
    setLog((l) => [...l, `The room hangs ${next[hanged].name}. They were ${next[hanged].role}.`]);
    playIf(muted, sfx.vote);
    const w = winnerOf(next);
    if (w) {
      setPhase("end");
      playIf(muted, w.startsWith("The village") ? sfx.win : sfx.lose);
      return;
    }
    setNight((n) => n + 1);
    setPhase("night");
    setAct(next[0].role === "wolf" && next[0].alive ? "wolf" : next[0].role === "seer" && next[0].alive ? "seer" : next[0].role === "doctor" && next[0].alive ? "doctor" : "wolf");
    setPeek(null);
    setPendingWolf(null);
    playIf(muted, sfx.night);
  };

  const nightPrompt =
    act === "wolf" && me?.role === "wolf"
      ? "Pick a name for the night."
      : act === "seer" && me?.role === "seer"
        ? "Look at one face."
        : act === "doctor" && me?.role === "doctor"
          ? "Cover one person."
          : "The night is moving. Hold.";

  if (!sit) {
    return (
      <GameShell game={game}>
        <SitDown game={game} defaultSeats={6} minSeats={6} maxSeats={8} onStart={start} />
      </GameShell>
    );
  }

  return (
    <GameShell
      game={game}
      status={
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-concrete">
          Night {night} · {over ? "Over" : phase}
        </p>
      }
    >
      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-5 px-4 py-5">
        {phase === "cover" ? (
          <div className="flex flex-col items-center gap-4 border border-lane bg-asphalt p-8 text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-line">Pass the phone</p>
            <p className="font-display text-4xl font-bold uppercase">{me?.name}</p>
            <p className="text-sm text-concrete">Look at your role. Nobody else.</p>
            <Button
              onClick={() => {
                playIf(muted, sfx.tap);
                setPhase("night");
                setAct(
                  me?.role === "wolf" ? "wolf" : me?.role === "seer" ? "seer" : me?.role === "doctor" ? "doctor" : "wolf",
                );
              }}
            >
              Reveal my role
            </Button>
          </div>
        ) : (
          <>
            {me ? (
              <div className="flex items-center gap-4 border border-lane bg-asphalt p-3">
                <img src={ROLE_IMG[me.role]} alt="" className="size-16 object-cover" />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-concrete">You are</p>
                  <p className="font-display text-3xl font-bold uppercase text-danfo">{me.role}</p>
                </div>
              </div>
            ) : null}

            <p className="font-display text-2xl uppercase">{over ?? (phase === "day" ? "Talk. Then hang a name." : nightPrompt)}</p>
            {peek ? <p className="text-sm text-danfo">{peek}</p> : null}

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {players.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  disabled={!p.alive || (phase === "day" && p.id === 0) || !!over}
                  onClick={() => onFace(p.id)}
                  className={cn(
                    "overflow-hidden border text-left disabled:opacity-40",
                    p.alive ? "border-lane hover:border-danfo" : "border-line",
                  )}
                >
                  <img src={p.img} alt="" className={cn("aspect-square w-full object-cover", !p.alive && "grayscale")} />
                  <div className="p-2">
                    <p className="font-display text-lg font-bold uppercase leading-none">{p.name}</p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-concrete">
                      {p.alive ? (p.bot ? "Bot" : "You") : "Out"}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {phase === "night" && me && me.role === "villager" && !over ? (
              <Button variant="line" onClick={() => finishNight(null, null)}>
                Let the night play
              </Button>
            ) : null}
            {phase === "night" && me && (me.role === "hunter" || !me.alive) && !over ? (
              <Button variant="line" onClick={() => finishNight(null, null)}>
                Let the night play
              </Button>
            ) : null}

            {over || phase === "end" ? (
              <div className="text-center">
                <p className="font-display text-4xl font-bold uppercase">{over}</p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {players.map((p) => (
                    <span key={p.id} className="font-mono text-[10px] uppercase tracking-widest text-concrete">
                      {p.name} · {p.role}
                    </span>
                  ))}
                </div>
                <Button className="mt-4" onClick={() => start(sit)}>
                  New night
                </Button>
              </div>
            ) : null}

            <ul className="space-y-1 font-mono text-[11px] uppercase tracking-widest text-concrete">
              {log.slice(-6).map((l, i) => (
                <li key={i}>{l}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </GameShell>
  );
}
