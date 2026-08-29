"use client";

import { Spark } from "@/components/brand/marks";
import { Button } from "@/components/ui/button";
import { GameShell } from "@/components/games/Shell";
import { SitDown, type SitDownStart } from "@/components/games/SitDown";
import { BOT_NAMES, fisherYates, getGame } from "@/lib/games/catalog";
import { sfx } from "@/lib/games/audio";
import { playIf, usePlayer } from "@/lib/games/player";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const game = getGame("uno")!;

type Color = "r" | "y" | "g" | "b";
type Card =
  | { id: string; k: "n"; c: Color; n: number }
  | { id: string; k: "skip" | "rev" | "d2"; c: Color }
  | { id: string; k: "wild" | "d4" };

const COL: Record<Color, string> = {
  r: "#9B1228",
  y: "#F5C400",
  g: "#2F6B3A",
  b: "#1B4F8A",
};
const INK: Record<Color, string> = { r: "#F3EFE4", y: "#0B0B0B", g: "#F3EFE4", b: "#F3EFE4" };

let seq = 0;
const id = () => `c${++seq}`;

function buildDeck(): Card[] {
  const colors: Color[] = ["r", "y", "g", "b"];
  const d: Card[] = [];
  for (const c of colors) {
    d.push({ id: id(), k: "n", c, n: 0 });
    for (let n = 1; n <= 9; n++) {
      d.push({ id: id(), k: "n", c, n });
      d.push({ id: id(), k: "n", c, n });
    }
    for (const k of ["skip", "rev", "d2"] as const) {
      d.push({ id: id(), k, c });
      d.push({ id: id(), k, c });
    }
  }
  for (let i = 0; i < 4; i++) {
    d.push({ id: id(), k: "wild" });
    d.push({ id: id(), k: "d4" });
  }
  return fisherYates(d);
}

function label(card: Card) {
  if (card.k === "n") return String(card.n);
  if (card.k === "skip") return "Ø";
  if (card.k === "rev") return "⇄";
  if (card.k === "d2") return "+2";
  if (card.k === "wild") return "W";
  return "+4";
}

function matches(card: Card, top: Card, color: Color) {
  if (card.k === "wild" || card.k === "d4") return true;
  if (top.k === "wild" || top.k === "d4") return "c" in card && card.c === color;
  if ("c" in card && "c" in top && card.c === top.c) return true;
  if (card.k === "n" && top.k === "n" && card.n === top.n) return true;
  if (card.k === top.k && card.k !== "n") return true;
  return false;
}

type Seat = { name: string; bot: boolean; hand: Card[] };

type State = {
  seats: Seat[];
  pile: Card[];
  deck: Card[];
  color: Color;
  turn: number;
  dir: 1 | -1;
  pending: number;
  winner: number | null;
  mustColor: boolean;
  called: boolean;
};

function deal(seats: number, human: string): State {
  const deck = buildDeck();
  const names = [human, ...fisherYates(BOT_NAMES)].slice(0, seats);
  const people: Seat[] = names.map((name, i) => ({
    name,
    bot: i !== 0,
    hand: deck.splice(0, 7),
  }));
  let first = deck.shift()!;
  while (first.k === "d4") {
    deck.push(first);
    first = deck.shift()!;
  }
  const color: Color = "c" in first ? first.c : "y";
  return {
    seats: people,
    pile: [first],
    deck,
    color,
    turn: 0,
    dir: 1,
    pending: first.k === "d2" ? 2 : 0,
    winner: null,
    mustColor: first.k === "wild",
    called: false,
  };
}

function drawFrom(s: State, n: number): Card[] {
  const out: Card[] = [];
  for (let i = 0; i < n; i++) {
    if (s.deck.length === 0) {
      const keep = s.pile[s.pile.length - 1];
      s.deck = fisherYates(s.pile.slice(0, -1));
      s.pile = [keep];
    }
    const c = s.deck.shift();
    if (c) out.push(c);
  }
  return out;
}

function nextTurn(s: State, skip = false) {
  const step = skip ? 2 : 1;
  s.turn = (s.turn + s.dir * step + s.seats.length * 8) % s.seats.length;
}

function applyPlay(s: State, card: Card, chosen?: Color): State {
  const copy: State = {
    ...s,
    seats: s.seats.map((p) => ({ ...p, hand: [...p.hand] })),
    pile: [...s.pile],
    deck: [...s.deck],
  };
  const seat = copy.seats[copy.turn];
  seat.hand = seat.hand.filter((c) => c.id !== card.id);
  copy.pile.push(card);
  copy.called = false;
  if (card.k === "wild" || card.k === "d4") {
    copy.color = chosen ?? copy.color;
    copy.mustColor = !chosen;
  } else if ("c" in card) {
    copy.color = card.c;
    copy.mustColor = false;
  }
  if (seat.hand.length === 0) {
    copy.winner = copy.turn;
    return copy;
  }
  if (card.k === "rev") {
    copy.dir = copy.dir === 1 ? -1 : 1;
    if (copy.seats.length === 2) nextTurn(copy);
    else nextTurn(copy);
  } else if (card.k === "skip") nextTurn(copy, true);
  else if (card.k === "d2") {
    copy.pending += 2;
    nextTurn(copy);
  } else if (card.k === "d4") {
    copy.pending += 4;
    nextTurn(copy);
  } else nextTurn(copy);
  return copy;
}

function botPick(s: State): { card: Card; color?: Color } | "draw" {
  const hand = s.seats[s.turn].hand;
  const top = s.pile[s.pile.length - 1];
  if (s.pending) {
    const stack = hand.find((c) => c.k === "d2" || c.k === "d4");
    if (stack) return { card: stack, color: stack.k === "d4" ? mostColor(hand) : undefined };
    return "draw";
  }
  const playable = hand.filter((c) => matches(c, top, s.color));
  if (!playable.length) return "draw";
  playable.sort((a, b) => rank(b) - rank(a));
  const card = playable[0];
  const color = card.k === "wild" || card.k === "d4" ? mostColor(hand) : undefined;
  return { card, color };
}

function rank(c: Card) {
  if (c.k === "n") return 1;
  if (c.k === "skip" || c.k === "rev") return 2;
  if (c.k === "d2") return 3;
  if (c.k === "wild") return 0;
  return 4;
}

function mostColor(hand: Card[]): Color {
  const tally: Record<Color, number> = { r: 0, y: 0, g: 0, b: 0 };
  for (const c of hand) if ("c" in c) tally[c.c]++;
  return (Object.entries(tally) as [Color, number][]).sort((a, b) => b[1] - a[1])[0][0];
}

function Face({ card, small }: { card: Card; small?: boolean }) {
  const bg = "c" in card ? COL[card.c] : "#0B0B0B";
  const fg = "c" in card ? INK[card.c] : "#F5C400";
  return (
    <div
      className={cn(
        "relative flex flex-col justify-between overflow-hidden border-2 border-bone/20 shadow-[0_10px_24px_rgb(0_0_0/0.45)]",
        small ? "h-16 w-11 rounded-sm p-1" : "h-36 w-24 rounded-md p-2 md:h-40 md:w-28",
      )}
      style={{ background: bg, color: fg }}
    >
      <span className={cn("font-display font-bold leading-none", small ? "text-sm" : "text-2xl")}>{label(card)}</span>
      <Spark className={cn("self-center opacity-90", small ? "size-5" : "size-10")} />
      <span className={cn("self-end font-display font-bold leading-none rotate-180", small ? "text-sm" : "text-2xl")}>
        {label(card)}
      </span>
    </div>
  );
}

function Back({ small }: { small?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center border-2 border-danfo bg-midnight text-danfo",
        small ? "h-16 w-11 rounded-sm" : "h-36 w-24 rounded-md md:h-40 md:w-28",
      )}
    >
      <Spark className={small ? "size-6" : "size-12"} />
    </div>
  );
}

export function Uno() {
  const human = usePlayer((s) => s.name);
  const muted = usePlayer((s) => s.muted);
  const [sit, setSit] = useState<SitDownStart | null>(null);
  const [state, setState] = useState<State | null>(null);
  const [picker, setPicker] = useState<Card | null>(null);
  const busy = useRef(false);

  const start = (opts: SitDownStart) => {
    setSit(opts);
    setState(deal(opts.seats, human));
  };

  const top = state?.pile[state.pile.length - 1];
  const me = state?.seats[0];
  const isMine = state?.turn === 0 && !state.winner && !state.mustColor;

  const legal = useMemo(() => {
    if (!state || !me || !top) return new Set<string>();
    return new Set(me.hand.filter((c) => matches(c, top, state.color)).map((c) => c.id));
  }, [state, me, top]);

  const playCard = useCallback(
    (card: Card, color?: Color) => {
      if (!state || busy.current) return;
      const s = state;
      const seat = s.seats[s.turn];
      if (s.pending && card.k !== "d2" && card.k !== "d4") return;
      if (!matches(card, s.pile[s.pile.length - 1], s.color) && !(s.pending && (card.k === "d2" || card.k === "d4")))
        return;
      if (seat.hand.length === 2 && !s.called && s.turn === 0) {
        playIf(muted, sfx.wrong);
      }
      playIf(muted, sfx.play);
      setState(applyPlay(s, card, color));
      setPicker(null);
    },
    [state, muted],
  );

  const draw = useCallback(() => {
    if (!state || busy.current || state.turn !== 0 || state.winner) return;
    const next = {
      ...state,
      seats: state.seats.map((p) => ({ ...p, hand: [...p.hand] })),
      deck: [...state.deck],
      pile: [...state.pile],
    };
    const n = next.pending || 1;
    next.seats[0].hand.push(...drawFrom(next, n));
    next.pending = 0;
    nextTurn(next);
    playIf(muted, sfx.draw);
    setState(next);
  }, [state, muted]);

  useEffect(() => {
    if (!state || state.winner != null) return;
    const seat = state.seats[state.turn];
    if (!seat.bot || state.mustColor) return;
    busy.current = true;
    const t = window.setTimeout(() => {
      const pick = botPick(state);
      if (pick === "draw") {
        const next = {
          ...state,
          seats: state.seats.map((p) => ({ ...p, hand: [...p.hand] })),
          deck: [...state.deck],
          pile: [...state.pile],
        };
        const n = next.pending || 1;
        next.seats[next.turn].hand.push(...drawFrom(next, n));
        next.pending = 0;
        nextTurn(next);
        playIf(muted, sfx.deal);
        setState(next);
      } else {
        if (seat.hand.length === 2) playIf(muted, sfx.uno);
        playCard(pick.card, pick.color);
      }
      busy.current = false;
    }, 700);
    return () => {
      window.clearTimeout(t);
      busy.current = false;
    };
  }, [state, muted, playCard]);

  useEffect(() => {
    if (state?.winner != null) playIf(muted, state.winner === 0 ? sfx.win : sfx.lose);
  }, [state?.winner, muted]);

  if (!sit || !state) {
    return (
      <GameShell game={game}>
        <SitDown game={game} defaultSeats={4} minSeats={2} maxSeats={4} onStart={start} />
      </GameShell>
    );
  }

  return (
    <GameShell
      game={game}
      status={
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-concrete">
          {state.winner != null
            ? `${state.seats[state.winner].name} takes it`
            : `${state.seats[state.turn].name} · ${state.dir === 1 ? "clockwise" : "reverse"}`}
        </p>
      }
    >
      <div className="flex flex-1 flex-col gap-4 px-4 py-4 md:px-8">
        <div className="flex justify-around gap-2">
          {state.seats.map((p, i) => (
            <div
              key={p.name}
              className={cn(
                "flex min-w-0 flex-1 flex-col items-center gap-2 border px-2 py-3",
                i === state.turn ? "border-danfo pulse-ring" : "border-lane",
              )}
            >
              <p className="truncate font-display text-lg font-bold uppercase">{p.name}</p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-concrete">{p.hand.length} cards</p>
              <div className="flex -space-x-3">
                {p.hand.slice(0, 5).map((c) => (
                  <Back key={c.id} small />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-1 items-center justify-center gap-6">
          <button type="button" onClick={draw} disabled={!isMine} className="disabled:opacity-40">
            <Back />
          </button>
          <div className="relative">
            {top ? <Face card={top} /> : null}
            <span
              className="absolute -right-3 -top-3 size-6 rounded-full border border-midnight"
              style={{ background: COL[state.color] }}
            />
          </div>
        </div>

        {state.pending ? (
          <p className="text-center font-display text-2xl font-bold uppercase text-lit">Stack is +{state.pending}</p>
        ) : null}

        {state.winner != null ? (
          <div className="flex flex-col items-center gap-3 py-4">
            <p className="font-display text-5xl font-bold uppercase">
              {state.winner === 0 ? "You took the room" : `${state.seats[state.winner].name} cooked you`}
            </p>
            <Button onClick={() => setState(deal(sit.seats, human))}>Again</Button>
          </div>
        ) : null}

        <div className="flex items-end justify-center gap-1 overflow-x-auto pb-2 pt-4">
          {me?.hand.map((card, i) => {
            const can = isMine && (legal.has(card.id) || (state.pending > 0 && (card.k === "d2" || card.k === "d4")));
            return (
              <button
                key={card.id}
                type="button"
                disabled={!can}
                onClick={() => {
                  if (card.k === "wild" || card.k === "d4") setPicker(card);
                  else playCard(card);
                }}
                className={cn(
                  "card-in shrink-0 transition-transform hover:-translate-y-3 disabled:opacity-40",
                )}
                style={{ animationDelay: `${i * 30}ms`, rotate: `${(i - (me.hand.length - 1) / 2) * 4}deg` }}
              >
                <Face card={card} />
              </button>
            );
          })}
        </div>

        <div className="flex justify-center gap-3 pb-4">
          <Button
            variant="line"
            onClick={() => {
              playIf(muted, sfx.uno);
              setState({ ...state, called: true });
            }}
            disabled={me?.hand.length !== 2}
          >
            UNO
          </Button>
        </div>
      </div>

      {picker ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-midnight/80 p-6">
          <div className="w-full max-w-sm border border-lane bg-asphalt p-6">
            <p className="mb-4 font-display text-2xl font-bold uppercase">Pick a colour</p>
            <div className="grid grid-cols-2 gap-3">
              {(Object.keys(COL) as Color[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => playCard(picker, c)}
                  className="h-16 border border-bone/10"
                  style={{ background: COL[c] }}
                />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </GameShell>
  );
}
