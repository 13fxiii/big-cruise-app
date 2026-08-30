"use client";

import { useMemo, useState } from "react";
import { merchCatalog, type MerchCollection } from "@/lib/merch-catalog";
import { CruisePage } from "@/components/cruise/CruiseShell";
import { CruiseBadge, CruiseCard } from "@/components/cruise/CruiseUI";

const naira = (n: number) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(n);

export function MerchPage() {
  const [day, setDay] = useState<string | null>(null);
  const col = merchCatalog.collections.find((c) => c.id === day) ?? null;
  if (col) return <CollectionView col={col} onBack={() => setDay(null)} />;

  return (
    <CruisePage
      kicker="Merch"
      title="One house. Seven rooms."
      lede="Streetwear capsules under BIG CRUISE. Midnight blanks. Danfo mark. Day color is a hit — never a new brand."
    >
      <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.2em] text-concrete">
        BIG CRUISE → 7 Days of Cruise → Daily subtheme → Merch
      </p>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <HouseCard />
        {merchCatalog.collections.map((c) => (
          <button key={c.id} type="button" onClick={() => setDay(c.id)} className="group block text-left">
            <CruiseCard className="h-full overflow-hidden p-0 md:p-0">
              <div className="relative min-h-[220px] bg-midnight">
                <img
                  src={c.heroArtwork}
                  alt={c.subtheme}
                  className="absolute inset-0 size-full object-contain p-4 opacity-90 transition group-hover:opacity-100"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-midnight via-midnight/80 to-transparent p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-concrete">{c.day}</p>
                  <p className="mt-1 font-display text-2xl font-bold uppercase leading-none" style={{ color: c.accent }}>
                    {c.subtheme}
                  </p>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <CruiseBadge tone={c.status === "preorder" ? "danfo" : "mute"}>{c.status}</CruiseBadge>
                    <span className="font-display text-xs font-bold uppercase tracking-[0.14em] text-danfo">
                      View collection
                    </span>
                  </div>
                </div>
              </div>
            </CruiseCard>
          </button>
        ))}
      </div>
      <HouseSkus />
    </CruisePage>
  );
}

function HouseCard() {
  return (
    <CruiseCard className="h-full">
      <CruiseBadge tone="danfo">house</CruiseBadge>
      <p className="mt-4 font-display text-3xl font-bold uppercase leading-none">House merch</p>
      <p className="mt-3 text-sm leading-relaxed text-bone/75">
        Black heavyweight. Official Cruise Stroke in Danfo Yellow. No day palette. This is the parent.
      </p>
      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-concrete">Tee · Hoodie · Cap · Tote</p>
    </CruiseCard>
  );
}

function HouseSkus() {
  return (
    <div className="mt-10">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-concrete">Architecture</p>
      <h2 className="mt-2 font-display text-3xl font-bold uppercase">Products can be added later.</h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
        {["T-shirt", "Long sleeve", "Hoodie", "Cap", "Shorts", "Joggers", "Tote", "Accessories"].map((s) => (
          <CruiseCard key={s}>
            <p className="font-display text-xl font-bold uppercase">{s}</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-concrete">SKU ready</p>
          </CruiseCard>
        ))}
      </div>
    </div>
  );
}

function CollectionView({ col, onBack }: { col: MerchCollection; onBack: () => void }) {
  const products = useMemo(
    () => merchCatalog.products.filter((p) => p.dayId === col.id),
    [col.id],
  );

  return (
    <CruisePage
      kicker={`7 Days · ${col.day}`}
      title={col.subtheme}
      lede={`${col.line} Capsule under BIG CRUISE. ${col.hero}`}
    >
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <CruiseBadge tone="danfo">BIG CRUISE</CruiseBadge>
        <span className="h-2 w-2 rounded-full" style={{ background: col.accent }} />
        <span className="h-2 w-2 rounded-full" style={{ background: col.accent2 }} />
        <CruiseBadge tone={col.status === "preorder" ? "danfo" : "mute"}>{col.status}</CruiseBadge>
        <button
          type="button"
          onClick={onBack}
          className="font-display text-xs font-bold uppercase tracking-[0.16em] text-concrete"
        >
          All days
        </button>
      </div>

      <div className="relative mb-8 min-h-[280px] overflow-hidden rounded-[20px] bg-midnight">
        <img src={col.heroArtwork} alt={col.subtheme} className="absolute inset-0 size-full object-contain p-6" />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {products.map((p) => (
          <CruiseCard key={p.sku} className="overflow-hidden p-0 md:p-0">
            <div className="bg-asphalt p-3">
              <img src={p.frontImage} alt={p.name} className="mx-auto h-56 w-auto" />
            </div>
            <div className="p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-concrete">{p.sku}</p>
              <p className="mt-1 font-display text-xl font-bold uppercase leading-none">{p.name}</p>
              <p className="mt-2 text-sm text-bone/70">{p.description}</p>
              <p className="mt-3 font-display text-lg font-bold text-danfo">{naira(p.price)}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-concrete">
                {p.productionStatus} · qty {p.availableQuantity}
              </p>
            </div>
          </CruiseCard>
        ))}
      </div>

      <p className="mt-8 max-w-xl text-sm text-concrete">
        Not a checkout. Architecture only. Front: small mark + motif. Back: subtheme artwork. Max two print locations.
      </p>
    </CruisePage>
  );
}
