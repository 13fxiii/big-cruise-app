import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  applySitDown,
  applyWin,
  loadDocument,
  normalizeDocument,
  PERSISTENCE,
  PLACEHOLDER_ID,
  SCHEMA_VERSION,
  type StorageLike,
} from "./persist.ts";

function memory(seed?: Record<string, string>): StorageLike {
  const map = new Map(Object.entries(seed || {}));
  return {
    getItem: (k) => (map.has(k) ? map.get(k)! : null),
    setItem: (k, v) => {
      map.set(k, v);
    },
  };
}

describe("identity persist adapter", () => {
  it("migrates the old local snapshot into a versioned prototype document", () => {
    const doc = normalizeDocument(
      {
        name: "FX",
        cruiseId: "BCH-TEST01",
        joinedAt: "2026-01-01T00:00:00.000Z",
        points: 15,
        badges: ["member", "sat-down"],
        stats: { uno: { played: 1, won: 0 } },
        recent: ["uno"],
      },
      new Date("2026-08-29T00:00:00.000Z"),
    );
    assert.equal(doc.v, SCHEMA_VERSION);
    assert.equal(doc.kind, "local-prototype");
    assert.equal(doc.identity.cruiseId, "BCH-TEST01");
    assert.equal(doc.identity.name, "FX");
    assert.equal(doc.points, 15);
    assert.deepEqual(
      doc.badges.map((b) => b.id),
      ["member", "sat-down"],
    );
    assert.equal(doc.ledger.length, 0);
    assert.equal(doc.matches.length, 0);
  });

  it("does not treat a placeholder id as a real Cruise ID", () => {
    const doc = normalizeDocument({ cruiseId: PLACEHOLDER_ID, name: "Cruise" });
    assert.match(doc.identity.cruiseId, /^BCH-[BCDFGHJKLMNPQRSTVWXYZ23456789]{6}$/);
    assert.notEqual(doc.identity.cruiseId, PLACEHOLDER_ID);
  });

  it("records sit-down as ledger + match without inventing a shop", () => {
    const now = new Date("2026-08-29T12:00:00.000Z");
    const base = normalizeDocument(
      {
        name: "Cruise",
        cruiseId: "BCH-AAAAA2",
        joinedAt: now.toISOString(),
        badges: ["member"],
      },
      now,
    );
    const { doc, events } = applySitDown(base, "uno", false, now);
    assert.equal(doc.stats.uno?.played, 1);
    assert.equal(doc.matches[0]?.result, "sit");
    assert.ok(doc.ledger.some((e) => e.action === "play"));
    assert.ok(events.some((e) => e.type === "badge" && e.id === "sat-down"));
    assert.ok(doc.kind === "local-prototype");
  });

  it("records a win onto the same document", () => {
    const now = new Date("2026-08-29T12:00:00.000Z");
    const seated = applySitDown(
      normalizeDocument({ cruiseId: "BCH-BBBBB3", joinedAt: now.toISOString() }, now),
      "ludo",
      false,
      now,
    ).doc;
    const { doc } = applyWin(seated, "ludo", now);
    assert.equal(doc.stats.ludo?.won, 1);
    assert.ok(doc.badges.some((b) => b.id === "first-win"));
    assert.ok(doc.matches.some((m) => m.result === "win"));
  });

  it("mints and round-trips through a storage adapter", () => {
    const store = memory();
    const a = loadDocument(store, new Date("2026-08-29T00:00:00.000Z"));
    assert.match(a.identity.cruiseId, /^BCH-/);
    const b = loadDocument(store, new Date("2026-08-29T00:00:00.000Z"));
    assert.equal(b.identity.cruiseId, a.identity.cruiseId);
    assert.equal(JSON.parse(store.getItem(PERSISTENCE.storageKey) || "{}").kind, "local-prototype");
  });
});
