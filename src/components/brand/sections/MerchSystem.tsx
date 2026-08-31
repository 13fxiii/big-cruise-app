"use client";

import { Chapter, Panel, Prose } from "@/components/brand/Chapter";
import { HangTagCard, HoodieBody, LabelCard, NeckTape, TeeMock } from "@/components/brand/garments";
import { Spark } from "@/components/brand/marks";
import { brand } from "@/lib/brand";
import {
  catalog,
  collectionTiers,
  costBuild,
  costNotes,
  dominion,
  fabrics,
  firstDrop,
  flagship,
  gsmRows,
  labels,
  landed,
  launchOrder,
  launchPlan,
  merch,
  merchDo,
  merchDont,
  merchPhilosophy,
  naira,
  packaging,
  photography,
  placementRule,
  placements,
  printMethods,
  qcSteps,
  recommendation,
  sizes,
  sizeNote,
  suppliers,
  teeConcepts,
} from "@/lib/cruise/merch";

function Tag({ children, tone = "est" }: { children: string; tone?: "est" | "res" | "inf" }) {
  const cls =
    tone === "res"
      ? "text-danfo"
      : tone === "inf"
        ? "text-concrete"
        : "text-bone/70";
  return (
    <span className={`font-mono text-[10px] uppercase tracking-[0.16em] ${cls}`}>{children}</span>
  );
}

export function MerchSystem() {
  const hero = teeConcepts.find((c) => c.id === "minimal")!;
  const statement = teeConcepts.find((c) => c.id === "statement")!;

  return (
    <>
      <Chapter id="merch-philosophy" n="56" kicker="Merch V1.0" title="Do not make merch that looks like merch.">
        <Prose>
          <p>
            Brand identity stays V1.1. This chapter translates it into garments people want to wear — not staff shirts,
            not event giveaways, not a logo on a blank. {merch.line}
          </p>
          <p>
            Live lookbook:{" "}
            <a className="text-danfo underline" href={`${brand.urls.product}/merch`} target="_blank" rel="noreferrer">
              {brand.urls.product.replace("https://", "")}/merch
            </a>
            . Identity:{" "}
            <a className="text-danfo underline" href={brand.urls.brandBook} target="_blank" rel="noreferrer">
              {brand.urls.brandBook.replace("https://", "")}
            </a>
            .
          </p>
        </Prose>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Panel>
            <p className="font-display text-sm font-bold uppercase tracking-[0.14em] text-danfo">It is</p>
            <ul className="mt-3 space-y-2 text-sm text-bone/80">
              {merchPhilosophy.is.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Panel>
          <Panel>
            <p className="font-display text-sm font-bold uppercase tracking-[0.14em] text-concrete">It is not</p>
            <ul className="mt-3 space-y-2 text-sm text-concrete line-through">
              {merchPhilosophy.isNot.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Panel>
        </div>
        <p className="mt-8 font-display text-2xl font-bold uppercase leading-tight text-bone">
          {merch.wearer} · {merch.watcher} · {merch.insider}
        </p>
      </Chapter>

      <Chapter id="fabric" n="57" title="240 GSM. Lagos still has to breathe.">
        <Prose>
          <p>
            Flagship: {flagship.fibre}, {flagship.gsm} GSM, {flagship.fit} {flagship.collar}. Colour: {flagship.colour}.
          </p>
          <p>{flagship.why}</p>
        </Prose>
        <div className="mt-8 overflow-hidden rounded-[20px]">
          <img src="/brand/merch/fabric-gsm.jpg" alt="Black heavyweight cotton knit" className="aspect-[16/9] w-full object-cover" />
        </div>
        <div className="mt-8 overflow-x-auto rounded-[20px] bg-asphalt">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="font-display text-xs uppercase tracking-[0.14em] text-danfo">
                <th className="px-4 py-3">GSM</th>
                <th className="px-4 py-3">Feel</th>
                <th className="px-4 py-3">Lagos</th>
                <th className="px-4 py-3">Street</th>
                <th className="px-4 py-3">Verdict</th>
              </tr>
            </thead>
            <tbody>
              {gsmRows.map((r) => (
                <tr key={r.gsm} className="border-t border-lane">
                  <td className="px-4 py-3 font-display text-lg font-bold">{r.gsm}</td>
                  <td className="px-4 py-3 text-bone/80">{r.feel}</td>
                  <td className="px-4 py-3 text-bone/80">{r.climate}</td>
                  <td className="px-4 py-3 text-bone/80">{r.street}</td>
                  <td className={`px-4 py-3 ${r.gsm === 240 ? "text-danfo" : "text-concrete"}`}>{r.verdict}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {fabrics.map((f) => (
            <Panel key={f.name}>
              <p className="font-display text-lg font-bold uppercase text-bone">{f.name}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-danfo">{f.use}</p>
              <p className="mt-3 text-sm text-bone/75">{f.nigeria}</p>
              <p className="mt-2 text-sm text-concrete">{f.verdict}</p>
            </Panel>
          ))}
        </div>
      </Chapter>

      <Chapter id="print-methods" n="58" title="The method follows the garment.">
        <Prose>
          <p>
            Drop 00 uses DTF because the run is small. Caps use embroidery. Restocks of 30+ move the back type to screen.
            Heat-transfer vinyl is banned. Do not puff the Cruise Stroke.
          </p>
        </Prose>
        <div className="mt-8 grid gap-3">
          {printMethods.map((p) => (
            <Panel key={p.name}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-display text-xl font-bold uppercase">{p.name}</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-danfo">{p.use}</p>
              </div>
              <p className="mt-3 text-sm text-bone/80">{p.nigeria}</p>
              <dl className="mt-4 grid gap-2 sm:grid-cols-3 text-sm">
                <div>
                  <dt className="text-concrete">Cost</dt>
                  <dd>{p.cost}</dd>
                </div>
                <div>
                  <dt className="text-concrete">On black</dt>
                  <dd>{p.onBlack}</dd>
                </div>
                <div>
                  <dt className="text-concrete">Wash</dt>
                  <dd>{p.wash}</dd>
                </div>
              </dl>
            </Panel>
          ))}
        </div>
      </Chapter>

      <Chapter id="placement" n="59" title="Two locations. Usually one.">
        <Prose>
          <p>{placementRule} Center chest is event-shirt composition. Banned on house.</p>
        </Prose>
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {placements.map((p) => (
            <Panel key={p.id}>
              <p className="font-display text-lg font-bold uppercase">{p.name}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-danfo">{p.size}</p>
              <p className="mt-3 text-sm text-bone/80">{p.why}</p>
              <p className="mt-2 text-sm text-concrete">{p.standard}</p>
            </Panel>
          ))}
        </div>
      </Chapter>

      <Chapter id="concepts" n="60" title="Eight philosophies. One mark.">
        <Prose>
          <p>
            None of these are “move the logo around.” The Cruise Stroke is never redrawn. Type is Barlow Condensed.
            Wordmark on a back never adds a second spark.
          </p>
        </Prose>
        <div className="mt-10 grid gap-8">
          {teeConcepts.map((c) => (
            <Panel key={c.id} className="grid items-center gap-6 md:grid-cols-[minmax(0,11rem)_minmax(0,11rem)_1fr]">
              <div>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-concrete">Front</p>
                <TeeMock concept={c} side="front" />
              </div>
              <div>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-concrete">Back</p>
                <TeeMock concept={c} side="back" />
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-danfo">
                  {c.n} · {c.tier}
                  {c.firstDrop ? " · Drop 00" : ""}
                </p>
                <h3 className="mt-2 font-display text-3xl font-extrabold uppercase leading-none">{c.name}</h3>
                <p className="mt-3 text-sm text-bone/80">{c.philosophy}</p>
                <p className="mt-2 text-sm text-concrete">{c.why}</p>
              </div>
            </Panel>
          ))}
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Panel>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-concrete">Black tee</p>
            <TeeMock concept={hero} side="front" className="mt-4" />
          </Panel>
          <Panel className="bg-danfo text-midnight">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-midnight/60">Limited reverse</p>
            <TeeMock concept={hero} side="front" field="danfo" ink="midnight" className="mt-4" />
          </Panel>
          <Panel>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-concrete">Hoodie</p>
            <div className="relative mt-4">
              <HoodieBody className="w-full" />
              <Spark className="absolute left-[32%] top-[36%] size-8 text-danfo" />
            </div>
          </Panel>
          <Panel>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-concrete">Statement back</p>
            <TeeMock concept={statement} side="back" className="mt-4" />
          </Panel>
        </div>
      </Chapter>

      <Chapter id="collection" n="61" title="Core. Culture. Limited.">
        <div className="grid gap-4 md:grid-cols-3">
          {collectionTiers.map((t) => (
            <Panel key={t.id}>
              <p className="font-display text-2xl font-extrabold uppercase text-danfo">{t.name}</p>
              <p className="mt-3 text-sm text-bone/80">{t.job}</p>
              <p className="mt-3 text-sm text-concrete">{t.colour}</p>
              <ul className="mt-4 space-y-1 text-sm text-bone/70">
                {t.examples.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </Panel>
          ))}
        </div>
        <div className="mt-10 overflow-x-auto rounded-[20px] bg-asphalt">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="font-display text-xs uppercase tracking-[0.14em] text-danfo">
                <th className="px-4 py-3">SKU</th>
                <th className="px-4 py-3">Piece</th>
                <th className="px-4 py-3">Drop</th>
                <th className="px-4 py-3">Spec</th>
              </tr>
            </thead>
            <tbody>
              {catalog.map((r) => (
                <tr key={r.sku} className="border-t border-lane">
                  <td className="px-4 py-2.5 font-mono text-[11px] text-danfo">{r.sku}</td>
                  <td className="px-4 py-2.5 font-display font-bold uppercase">{r.name}</td>
                  <td className="px-4 py-2.5 text-concrete">{r.drop}</td>
                  <td className="px-4 py-2.5 text-bone/75">{r.spec}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {launchOrder.map((d) => (
            <Panel key={d.drop}>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-danfo">Drop {d.drop}</p>
              <p className="mt-2 font-display text-2xl font-bold uppercase">{d.name}</p>
              <p className="mt-2 text-sm text-bone/75">{d.items}</p>
            </Panel>
          ))}
        </div>
      </Chapter>

      <Chapter id="dominion-drop" n="62" title="Dominion State is a collection. Not a new brand.">
        <Prose>
          <p>{dominion.rule}</p>
        </Prose>
        <ol className="mt-8 flex flex-col gap-0">
          {dominion.hierarchy.map((line, i) => (
            <li key={line} className="flex items-center gap-4 border-l-2 border-danfo py-3 pl-5">
              <span className="font-mono text-[10px] text-concrete">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-2xl font-extrabold uppercase">{line}</span>
            </li>
          ))}
        </ol>
        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {dominion.firstPieces.map((p) => (
            <Panel key={p}>
              <Spark className="size-8 text-dom" />
              <p className="mt-4 text-sm text-bone/80">{p}</p>
            </Panel>
          ))}
        </div>
      </Chapter>

      <Chapter id="sizing" n="63" title="A Nigerian oversized block.">
        <Prose>
          <p>{sizeNote}</p>
        </Prose>
        <div className="mt-8 overflow-x-auto rounded-[20px] bg-asphalt">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="font-display text-xs uppercase tracking-[0.14em] text-danfo">
                <th className="px-4 py-3">Size</th>
                <th className="px-4 py-3">Chest</th>
                <th className="px-4 py-3">Shoulder</th>
                <th className="px-4 py-3">Length</th>
                <th className="px-4 py-3">Sleeve</th>
                <th className="px-4 py-3">Note</th>
              </tr>
            </thead>
            <tbody className="font-mono text-bone/80">
              {sizes.map((s) => (
                <tr key={s.size} className="border-t border-lane">
                  <td className="px-4 py-2.5 font-display font-bold text-bone">{s.size}</td>
                  <td className="px-4 py-2.5">{s.chest}</td>
                  <td className="px-4 py-2.5">{s.shoulder}</td>
                  <td className="px-4 py-2.5">{s.length}</td>
                  <td className="px-4 py-2.5">{s.sleeve}</td>
                  <td className="px-4 py-2.5 font-sans text-xs text-concrete">{s.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Chapter>

      <Chapter id="labels-pack" n="64" title="The tell is inside.">
        <div className="grid gap-4 md:grid-cols-3">
          {labels.map((l) => (
            <Panel key={l.id}>
              <p className="font-display text-lg font-bold uppercase">{l.name}</p>
              <p className="mt-3 text-sm text-bone/80">{l.spec}</p>
            </Panel>
          ))}
        </div>
        <div className="mt-8 grid items-center gap-4 sm:grid-cols-3">
          <Panel className="flex min-h-40 flex-col items-center justify-center gap-3">
            <LabelCard />
            <p className="text-xs text-concrete">Neck woven</p>
          </Panel>
          <Panel className="flex min-h-40 flex-col items-center justify-center gap-3 bg-bone">
            <HangTagCard />
          </Panel>
          <Panel className="flex min-h-40 flex-col items-center justify-center gap-3">
            <NeckTape />
            <p className="text-xs text-concrete">Drop 00 DTF stand-in</p>
          </Panel>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="relative min-h-56 overflow-hidden rounded-[20px]">
            <img src="/brand/merch/mailer.jpg" alt="Black mailer" className="absolute inset-0 size-full object-cover" />
            <span className="slash-rule absolute left-8 top-10 h-1 w-28 bg-danfo" />
          </div>
          <Panel>
            <p className="font-display text-lg font-bold uppercase">Pack</p>
            <p className="mt-3 text-sm text-bone/80">Tee: {packaging.tee.join(" · ")}</p>
            <p className="mt-2 text-sm text-bone/80">Hang tag: {packaging.hangTag}</p>
            <p className="mt-2 text-sm text-concrete">Skip: {packaging.skip.join(" · ")}</p>
          </Panel>
        </div>
      </Chapter>

      <Chapter id="merch-photo" n="65" title="Lagos night. Real cloth. Adults.">
        <Prose>
          <p>
            {photography.studio} {photography.lifestyle}
          </p>
        </Prose>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="relative min-h-72 overflow-hidden rounded-[20px]">
            <img src="/brand/merch/tee-blank.jpg" alt="Studio hanging tee" className="absolute inset-0 size-full object-cover" />
            <p className="absolute bottom-4 left-4 font-display text-sm uppercase tracking-[0.14em]">Studio</p>
          </div>
          <div className="relative min-h-72 overflow-hidden rounded-[20px]">
            <img src="/brand/merch/street-night.jpg" alt="Lagos night street" className="absolute inset-0 size-full object-cover" />
            <p className="absolute bottom-4 left-4 font-display text-sm uppercase tracking-[0.14em]">Lifestyle field</p>
          </div>
          <div className="relative min-h-56 overflow-hidden rounded-[20px]">
            <img src="/brand/tee-walk.jpg" alt="Oversized tee in Lagos at night" className="absolute inset-0 size-full object-cover" />
          </div>
          <div className="relative min-h-56 overflow-hidden rounded-[20px]">
            <img src="/brand/hoodie.jpg" alt="Black hoodie fabric" className="absolute inset-0 size-full object-cover" />
          </div>
        </div>
        <p className="mt-4 text-sm text-concrete">Avoid: {photography.avoid.join(" · ")}</p>
      </Chapter>

      <Chapter id="pricing" n="66" title="Price it like streetwear. Cost it like Lagos.">
        <Prose>
          <p>
            Promo tees in Lagos advertise from ₦7,000. That is not this garment. Retail has to sit with oversized
            streetwear, not with church-programme shirts.
          </p>
        </Prose>
        <div className="mt-6 space-y-2">
          {costNotes.map((n) => (
            <p key={n.text} className="text-sm text-bone/80">
              <Tag tone={n.tag === "researched" ? "res" : "est"}>{n.tag}</Tag> {n.text}
            </p>
          ))}
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {costBuild.scenarios.map((s) => {
            const cost = landed(s);
            const retail = costBuild.retailTarget[s.id as keyof typeof costBuild.retailTarget];
            const gross = Math.round((1 - cost / retail) * 100);
            return (
              <Panel key={s.id} className={s.id === "standard" ? "shadow-[var(--shadow-border-hover)]" : ""}>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-danfo">{s.name}</p>
                <p className="mt-2 text-sm text-concrete">{s.note}</p>
                <p className="mt-4 font-display text-3xl font-extrabold">{naira.format(cost)}</p>
                <p className="text-xs text-concrete">Landed · estimated</p>
                <p className="mt-3 text-sm">
                  Retail {naira.format(retail)} · gross ~{gross}%
                </p>
                <ul className="mt-4 space-y-1 font-mono text-[11px] text-bone/70">
                  <li>Blank {naira.format(s.blank)}</li>
                  <li>Print {naira.format(s.print)}</li>
                  <li>Labels {naira.format(s.labels)}</li>
                  <li>Pack {naira.format(s.pack)}</li>
                  <li>Labour {naira.format(s.labour)}</li>
                  <li>Mkt + fees + contig. {naira.format(s.marketing + s.fees + s.contingency + s.logistics)}</li>
                </ul>
              </Panel>
            );
          })}
        </div>
      </Chapter>

      <Chapter id="first-drop" n="67" title="Drop 00 is a test, not a warehouse.">
        <Prose>
          <p>
            {firstDrop.reason} {firstDrop.model} {firstDrop.budgetNote}
          </p>
        </Prose>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {firstDrop.skus.map((s) => (
            <Panel key={s.sku}>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-danfo">{s.sku}</p>
              <p className="mt-2 font-display text-2xl font-bold uppercase">{s.name}</p>
              <p className="mt-2 text-sm text-bone/75">{s.print}</p>
              <p className="mt-4 font-display text-xl text-danfo">{naira.format(s.retail)}</p>
              <p className="text-sm text-concrete">{s.units} units planned</p>
            </Panel>
          ))}
        </div>
        <p className="mt-6 text-sm text-concrete">
          {firstDrop.sizes} Curve: {firstDrop.curve} Samples: {firstDrop.samples}
        </p>
      </Chapter>

      <Chapter id="suppliers" n="68" title="Lagos first. Quotes, not rumours.">
        <div className="grid gap-3">
          {suppliers.map((s) => (
            <Panel key={s.name}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-display text-xl font-bold uppercase">{s.name}</p>
                <Tag tone={s.tag === "verified" ? "res" : "inf"}>{s.tag}</Tag>
              </div>
              <p className="mt-1 text-sm text-concrete">{s.where}</p>
              <p className="mt-3 text-sm text-bone/80">{s.offers}</p>
              <p className="mt-2 text-sm text-concrete">{s.note}</p>
            </Panel>
          ))}
        </div>
      </Chapter>

      <Chapter id="qc" n="69" title="No bulk before a washed sample.">
        <ol className="grid gap-3 md:grid-cols-2">
          {qcSteps.map((s) => (
            <li key={s.n}>
              <Panel>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-danfo">{s.n} {s.name}</p>
                <p className="mt-3 text-sm text-bone/80">{s.do}</p>
              </Panel>
            </li>
          ))}
        </ol>
      </Chapter>

      <Chapter id="merch-rules" n="70" title="Merch do / don’t.">
        <div className="grid gap-4 md:grid-cols-2">
          <Panel>
            <p className="font-display text-lg font-bold uppercase text-danfo">Do</p>
            <ul className="mt-4 space-y-2 text-sm text-bone/80">
              {merchDo.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Panel>
          <Panel>
            <p className="font-display text-lg font-bold uppercase text-concrete">Don’t</p>
            <ul className="mt-4 space-y-2 text-sm text-concrete">
              {merchDont.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Panel>
        </div>
      </Chapter>

      <Chapter id="launch" n="71" title="From this page to a packed mailer.">
        <div className="grid gap-3">
          {launchPlan.map((s) => (
            <div key={s.n} className="flex gap-4 border-b border-lane py-4">
              <span className="font-mono text-sm text-danfo">{s.n}</span>
              <div>
                <p className="font-display text-xl font-bold uppercase">{s.name}</p>
                <p className="mt-1 text-sm text-bone/75">{s.do}</p>
              </div>
            </div>
          ))}
        </div>
        <Panel className="mt-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-danfo">Locked recommendation</p>
          <dl className="mt-6 grid gap-4 md:grid-cols-2">
            {Object.entries(recommendation).map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-concrete">{k}</dt>
                <dd className="mt-1 text-sm text-bone/85">{v}</dd>
              </div>
            ))}
          </dl>
        </Panel>
        <p className="mt-8 font-display text-2xl font-extrabold uppercase leading-none text-danfo">
          Where the cruise lives.
        </p>
      </Chapter>
    </>
  );
}
