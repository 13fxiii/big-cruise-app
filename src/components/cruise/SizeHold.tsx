"use client";

import { CruiseButton } from "@/components/cruise/CruiseUI";
import {
  HOLD_STORAGE_KEY,
  placeMerchHold,
  sizesForSku,
  type HoldCount,
} from "@/lib/cruise/holds";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";

function loadMine(): Set<string> {
  try {
    const raw = localStorage.getItem(HOLD_STORAGE_KEY);
    const arr = raw ? (JSON.parse(raw) as unknown) : [];
    if (!Array.isArray(arr)) return new Set();
    return new Set(arr.filter((x): x is string => typeof x === "string"));
  } catch {
    return new Set();
  }
}

function saveMine(mine: Set<string>) {
  localStorage.setItem(HOLD_STORAGE_KEY, JSON.stringify([...mine]));
}

function countsForSku(rows: HoldCount[], sku: string): Record<string, number> {
  const m: Record<string, number> = {};
  for (const r of rows) {
    if (r.sku === sku) m[r.size] = r.count;
  }
  return m;
}

export function SizeHold({
  sku,
  holds,
  onHeld,
}: {
  sku: string;
  holds: HoldCount[];
  onHeld: (row: HoldCount) => void;
}) {
  const place = useServerFn(placeMerchHold);
  const sizes = sizesForSku(sku);
  const [size, setSize] = useState(sizes[0]!);
  const [mine, setMine] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<string | null>(null);

  useEffect(() => {
    setMine(loadMine());
  }, []);

  useEffect(() => {
    setSize(sizesForSku(sku)[0]!);
    setNote(null);
  }, [sku]);

  const counts = countsForSku(holds, sku);
  const key = `${sku}:${size}`;
  const held = mine.has(key);

  async function hold() {
    if (held || busy) return;
    setBusy(true);
    setNote(null);
    try {
      const row = await place({ data: { sku, size } });
      onHeld(row);
      const next = new Set(mine);
      next.add(`${row.sku}:${row.size}`);
      setMine(next);
      saveMine(next);
      setNote("Held. No name. No email. Just the size.");
    } catch (err) {
      setNote(err instanceof Error ? err.message : "Hold failed. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-concrete">
        Hold a size · no login
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {sizes.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => {
              setSize(s);
              setNote(null);
            }}
            className={`inline-flex min-h-11 min-w-11 items-center justify-center gap-1 rounded-full px-3 font-display text-sm font-bold uppercase tracking-[0.12em] ${
              size === s ? "bg-danfo text-midnight" : "bg-curb text-bone/80"
            }`}
          >
            {s}
            <span className="font-mono text-[10px] font-medium tracking-normal opacity-70">
              {counts[s] ?? 0}
            </span>
          </button>
        ))}
      </div>
      <CruiseButton className="mt-4" disabled={busy || held} onClick={() => void hold()}>
        {held ? "Held on this device" : busy ? "Holding…" : `Hold ${size}`}
      </CruiseButton>
      {note ? <p className="mt-3 text-sm text-bone/70">{note}</p> : null}
    </div>
  );
}
