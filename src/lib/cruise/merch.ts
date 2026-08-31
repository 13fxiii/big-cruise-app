/**
 * BIG CRUISE Merch System V1.0
 * Identity: Brand Lock-in V1.1 — do not redesign marks, colours, or type.
 *
 * Figures tagged `researched` were live on Lagos supplier pages in Aug 2026.
 * Figures tagged `estimated` are working ranges for planning, not quotes.
 */

export const merch = {
  version: "1.0",
  identity: "1.1",
  name: "BIG CRUISE Merch System",
  line: "Streetwear that happens to belong to BIG CRUISE.",
  wearer: "I’m part of something.",
  watcher: "That’s hard. What’s BIG CRUISE?",
  insider: "Omo, this is us.",
} as const;

export const merchPhilosophy = {
  is: [
    "A contemporary streetwear label that grew out of a room.",
    "Midnight field, Danfo hit, one honest garment.",
    "Looks good on someone who has never heard of the community.",
    "Rewards the person who looks closer.",
  ],
  isNot: [
    "Corporate staff uniforms",
    "Event T-shirts",
    "Fan merch with a giant logo",
    "Cheap giveaway clothing",
    "Children’s clothing",
    "Generic Naija souvenir prints",
    "A logo slapped on a blank",
  ],
} as const;

/** Flagship garment. Locked for Drop 00. */
export const flagship = {
  name: "BIG CRUISE Heavyweight Oversized Tee",
  skuBlank: "BC-HW-TEE",
  fibre: "100% ring-spun combed cotton",
  gsm: 240,
  gsmAlt: 220,
  fit: "Unisex oversized. Drop shoulder. Boxy body. Slightly cropped hip.",
  collar: "2×1 rib, structured, cover-stitched",
  seams: "Twin-needle hem and sleeve. Shoulder tape.",
  surface: "Smooth face for one-colour print or embroidery.",
  colour: "Lagos Danfo Midnight Black",
  why: "240 GSM holds the oversized silhouette and reads as streetwear, not promo. Dense enough for print. Still wearable in Lagos if the knit is not over-tight. 220 GSM is the heat-safe substitute if a true 240 blank cannot be sourced locally.",
} as const;

export const gsmRows = [
  {
    gsm: 180,
    feel: "Event tee. Thin. Lights through.",
    climate: "Coolest in Lagos heat.",
    street: "Promo. Rejected.",
    print: "Inks show through. Cheap hand.",
    cost: "Lowest. Typical Lagos custom from ₦7,000.",
    verdict: "Never for house merch.",
  },
  {
    gsm: 200,
    feel: "Standard corporate blank.",
    climate: "Fine.",
    street: "Staff shirt energy.",
    print: "Acceptable, no body.",
    cost: "Common ₦7,000–10,000 printed.",
    verdict: "Not this brand.",
  },
  {
    gsm: 220,
    feel: "Light heavyweight. Soft drape.",
    climate: "Best daily wear in humidity.",
    street: "Oversized works if the cut is boxy.",
    print: "Good. Slightly less structure.",
    cost: "Estimated blank ₦4,800–7,000.",
    verdict: "Approved alternate if 240 is unavailable.",
  },
  {
    gsm: 240,
    feel: "Structured. Hangs off the body.",
    climate: "Warm but wearable with an open knit.",
    street: "The oversized silhouette people actually want.",
    print: "Stable face. Screen, DTF, embroidery.",
    cost: "Estimated blank ₦5,500–8,500.",
    verdict: "Flagship. Start here.",
  },
  {
    gsm: 260,
    feel: "Boxy luxury. Heavy in the hand.",
    climate: "Hot for Lagos daily. Harmattan / AC rooms.",
    street: "Premium, but can look costume in 32°.",
    print: "Excellent body.",
    cost: "Highest. Often imported.",
    verdict: "Limited drops only. Not Drop 00.",
  },
] as const;

export const fabrics = [
  {
    name: "Ring-spun combed cotton",
    use: "Flagship tee",
    durability: "High",
    comfort: "High",
    breath: "Good at 220–240",
    print: "Excellent",
    shrink: "3–5% if not pre-shrunk — wash-test",
    cost: "Mid–high",
    nigeria: "Available via premium printers and import blanks. Confirm GSM with a scale.",
    verdict: "House fabric.",
  },
  {
    name: "Carded cotton",
    use: "Budget blanks",
    durability: "Pills",
    comfort: "Rough after wash",
    breath: "Fine",
    print: "Average",
    shrink: "Higher",
    cost: "Low",
    nigeria: "Most ₦7,000 tees.",
    verdict: "Rejected.",
  },
  {
    name: "Cotton-poly blend",
    use: "Sports / promo",
    durability: "High",
    comfort: "Sweaty in Lagos",
    breath: "Poor",
    print: "Very good (sublimation)",
    shrink: "Low",
    cost: "Mid",
    nigeria: "Common for corporate.",
    verdict: "Not house. Caps only if twill needs poly.",
  },
  {
    name: "French terry",
    use: "Crewneck, shorts",
    durability: "High",
    comfort: "Loop back breathes",
    breath: "Better than fleece",
    print: "Good",
    shrink: "Moderate",
    cost: "Mid–high",
    nigeria: "Cut-and-sew or import.",
    verdict: "Crews and shorts. Drop 02+.",
  },
  {
    name: "Fleece",
    use: "Hoodie",
    durability: "High",
    comfort: "Warm",
    breath: "Low",
    print: "Embroidery preferred",
    shrink: "Moderate",
    cost: "High",
    nigeria: "Quality variance is the risk. Sample first.",
    verdict: "Hoodie only. Harmattan / night.",
  },
] as const;

export const printMethods = [
  {
    name: "Screen print",
    cost: "Setup ₦15k–40k estimated. Unit falls after ~30.",
    durability: "Best on cotton if cured.",
    feel: "Sits in the cloth.",
    wash: "Excellent",
    detail: "Spot colour. No hairlines.",
    onBlack: "Danfo as a spot. Underbase if needed — avoid on the stroke.",
    small: "Setup kills MOQ < 20.",
    bulk: "House method from restock.",
    nigeria: "Widely available Yaba / Ojuelegba / Ikeja.",
    use: "Back type and restocks of 30+.",
  },
  {
    name: "DTF",
    cost: "No screen. ₦1,200–4,500 estimated depending on size.",
    durability: "Good if pressed right. Can crack if overcooked.",
    feel: "Slight film. Keep small.",
    wash: "Good at 5+ cycles if QC’d.",
    detail: "High. Fine for type and the stroke.",
    onBlack: "Excellent. True transparent from SVG.",
    small: "Best first-drop method.",
    bulk: "Loses to screen on unit cost.",
    nigeria: "Common 2025–26. Verify press temp on sample.",
    use: "Drop 00 chest spark and back type.",
  },
  {
    name: "DTG",
    cost: "High unit. Needs pretreatment on black.",
    durability: "Softer than DTF, weaker on heavy wash.",
    feel: "Softest print.",
    wash: "Fair on black.",
    detail: "Photo-level — we do not print photos.",
    onBlack: "Needs underbase. Risk of grey halo.",
    small: "Possible.",
    bulk: "Slow.",
    nigeria: "Fewer reliable shops.",
    use: "Not house.",
  },
  {
    name: "Embroidery",
    cost: "Digitise once. ₦1,800–4,000 estimated per cap / chest.",
    durability: "Highest.",
    feel: "Raised. Premium.",
    wash: "Excellent",
    detail: "Use mark-embroidery.svg, stroke 11.5. 8mm min.",
    onBlack: "Danfo thread. One colour.",
    small: "Good.",
    bulk: "Caps, hoodies, left chest.",
    nigeria: "Widely available. Digitise from our SVG, not a PNG.",
    use: "Cap. Hoodie chest. Woven-adjacent hits.",
  },
  {
    name: "Puff print",
    cost: "Higher. Specialty.",
    durability: "Can crush.",
    feel: "3D. Loud.",
    wash: "Fair",
    detail: "Kills the stroke’s open line.",
    onBlack: "Tempting. Rejected for the mark.",
    small: "No.",
    bulk: "Limited only, never on the Cruise Stroke.",
    nigeria: "Some Lagos shops.",
    use: "Not on the signature. Maybe a Dominion bar. Later.",
  },
  {
    name: "Discharge",
    cost: "Mid. Chemistry.",
    durability: "In the fibre. Beautiful.",
    feel: "No hand.",
    wash: "Excellent",
    detail: "Soft type on black.",
    onBlack: "Best in class if the shop can hold Danfo.",
    small: "Risky.",
    bulk: "After a shop is proven.",
    nigeria: "Inconsistent. Sample or skip.",
    use: "Drop 02+ if the sample holds colour.",
  },
  {
    name: "Heat transfer / vinyl",
    cost: "Cheap.",
    durability: "Peels.",
    feel: "Plastic.",
    wash: "Poor",
    detail: "Fine until the first wash.",
    onBlack: "Looks like a staff shirt.",
    small: "Everywhere.",
    bulk: "No.",
    nigeria: "Default for events.",
    use: "Banned for house.",
  },
  {
    name: "Woven patch / label",
    cost: "Researched: ₦65k–95k / 1000 neck labels.",
    durability: "Highest.",
    feel: "Inside the garment. The tell.",
    wash: "Excellent",
    detail: "Convert type to outlines. B at small.",
    onBlack: "Bone on midnight.",
    small: "MOQ 1000 typical. Use DTF neck for Drop 00.",
    bulk: "From Drop 01.",
    nigeria: "Hazken ₦95,000/1000 (7×2.5cm). wovenlabelsnigeria from ₦65,000/1000.",
    use: "Neck. Side seam. Limited hang-in.",
  },
  {
    name: "Silicone / rubber patch",
    cost: "High tooling.",
    durability: "High",
    feel: "Cap / bag hardware.",
    wash: "Excellent",
    detail: "Filled B only. No hairlines.",
    onBlack: "Danfo on midnight.",
    small: "Tooling kills it.",
    bulk: "Caps and bags later.",
    nigeria: "Usually imported tooling.",
    use: "Drop 03+ hardware.",
  },
] as const;

export const placements = [
  {
    id: "left-chest",
    name: "Left chest",
    size: "40–50mm Cruise Stroke (B)",
    why: "The quiet tell. Reads as fashion, not advertisement.",
    standard: "Core default. One location.",
  },
  {
    id: "center-chest",
    name: "Center chest",
    size: "Do not.",
    why: "Event-shirt composition. Giant logo territory.",
    standard: "Banned on house.",
  },
  {
    id: "back",
    name: "Back",
    size: "Type or large B. Max ~300mm wide.",
    why: "The 3-metre read. Statement pieces only.",
    standard: "One graphic. No extra chest logo if the back is large.",
  },
  {
    id: "upper-back",
    name: "Upper back / yoke",
    size: "Small B or one word.",
    why: "Works under a jacket. Keep it a stamp.",
    standard: "Limited.",
  },
  {
    id: "sleeve",
    name: "Left sleeve",
    size: "28–36mm B",
    why: "Secondary hit when the chest is clean.",
    standard: "Never chest + sleeve + back together.",
  },
  {
    id: "hem",
    name: "Lower hem",
    size: "Tiny type or STATE",
    why: "A private line. Dominion territory.",
    standard: "Limited collections only.",
  },
  {
    id: "neck",
    name: "Neck / inner",
    size: "Woven 40–50mm or print 30mm",
    why: "The garment is ours even when the chest is silent.",
    standard: "Always. House name lives here.",
  },
  {
    id: "label",
    name: "Woven side label",
    size: "15–20mm fold",
    why: "Size + spark. Hardware, not a billboard.",
    standard: "From Drop 01 when labels land.",
  },
] as const;

export const placementRule =
  "Maximum two print locations per garment. Usually one. Neck label does not count as a print location.";

export type TeeGraphic =
  | { kind: "spark"; loc: "left-chest" | "back" | "sleeve" }
  | { kind: "wordmark"; loc: "back" | "left-chest" }
  | { kind: "type"; loc: "back" | "left-chest" | "hem"; lines: string[]; slash?: boolean }
  | { kind: "stack"; loc: "back"; lines: string[] }
  | { kind: "handle"; loc: "left-chest"; handle: string }
  | { kind: "none" };

export type TeeConcept = {
  id: string;
  n: string;
  name: string;
  philosophy: string;
  why: string;
  front: TeeGraphic;
  back: TeeGraphic;
  sleeve: TeeGraphic;
  firstDrop: boolean;
  hero: boolean;
  tier: "core" | "culture" | "limited";
};

export const teeConcepts: TeeConcept[] = [
  {
    id: "minimal",
    n: "01",
    name: "Minimal Cruise",
    philosophy: "The garment is the brand. A small signature, nothing else.",
    why: "Someone who does not know the room still looks like they have taste. This is the permanent SKU.",
    front: { kind: "spark", loc: "left-chest" },
    back: { kind: "none" },
    sleeve: { kind: "none" },
    firstDrop: true,
    hero: true,
    tier: "core",
  },
  {
    id: "statement",
    n: "02",
    name: "Back Statement",
    philosophy: "Clean chest. The line lives on the back.",
    why: "Three metres away it should still say WHERE THE CRUISE LIVES. Close up, the spark is the only jewellery.",
    front: { kind: "none" },
    back: { kind: "type", loc: "back", lines: ["WHERE THE", "CRUISE", "LIVES."] },
    sleeve: { kind: "spark", loc: "sleeve" },
    firstDrop: true,
    hero: true,
    tier: "core",
  },
  {
    id: "community",
    n: "03",
    name: "Community",
    philosophy: "Belonging without a membership card on the chest.",
    why: "THESE ARE MY PEOPLE is the feeling. The spark on the chest is the handshake.",
    front: { kind: "spark", loc: "left-chest" },
    back: { kind: "type", loc: "back", lines: ["THESE ARE", "MY PEOPLE."] },
    sleeve: { kind: "none" },
    firstDrop: false,
    hero: false,
    tier: "culture",
  },
  {
    id: "motion",
    n: "04",
    name: "Motion",
    philosophy: "Cruise → Connect → Create → Grow as a type column.",
    why: "The philosophy is the graphic. No extra illustration. The spark sits above the stack like a stamp.",
    front: { kind: "none" },
    back: { kind: "stack", loc: "back", lines: ["CRUISE", "CONNECT", "CREATE", "GROW"] },
    sleeve: { kind: "none" },
    firstDrop: false,
    hero: false,
    tier: "core",
  },
  {
    id: "digital",
    n: "05",
    name: "Digital Street",
    philosophy: "Internet culture as a stamp, not a screenshot.",
    why: "@BCHub_ as a small chest lockup. The handle is the culture. No tweet mock, no UI chrome, no QR on the shirt.",
    front: { kind: "handle", loc: "left-chest", handle: "@BCHub_" },
    back: { kind: "none" },
    sleeve: { kind: "spark", loc: "sleeve" },
    firstDrop: false,
    hero: false,
    tier: "culture",
  },
  {
    id: "type",
    n: "06",
    name: "Typographic",
    philosophy: "The name is the artwork. Barlow Condensed does the work.",
    why: "BIG CRUISE stacked on the back, no trailing spark (the lockup rule: do not double-spark). Chest stays quiet.",
    front: { kind: "none" },
    back: { kind: "type", loc: "back", lines: ["BIG", "CRUISE"] },
    sleeve: { kind: "spark", loc: "sleeve" },
    firstDrop: false,
    hero: false,
    tier: "core",
  },
  {
    id: "signature",
    n: "07",
    name: "Signature",
    philosophy: "The Cruise Stroke as a fashion emblem.",
    why: "Large B on the back. No type. This is the piece that makes a stranger ask the question.",
    front: { kind: "none" },
    back: { kind: "spark", loc: "back" },
    sleeve: { kind: "none" },
    firstDrop: false,
    hero: true,
    tier: "core",
  },
  {
    id: "culture",
    n: "08",
    name: "Culture",
    philosophy: "Pidgin as in-group language, not a souvenir slogan.",
    why: "WE DEY CRUISE. No flags, no green-white-green dump, no ‘Naija to the world’. Just the room talking.",
    front: { kind: "spark", loc: "left-chest" },
    back: { kind: "type", loc: "back", lines: ["WE DEY", "CRUISE."] },
    sleeve: { kind: "none" },
    firstDrop: false,
    hero: false,
    tier: "culture",
  },
];

export const collectionTiers = [
  {
    id: "core",
    name: "Core",
    job: "Permanent or recurring. Minimal identity. The house uniform without looking like one.",
    colour: "Midnight + Danfo only.",
    examples: ["Minimal Cruise tee", "Dad cap", "Tote", "Later: hoodie chest spark"],
  },
  {
    id: "culture",
    name: "Culture",
    job: "Pidgin, belonging, music, games, Spaces, friendship. Still inside the two-colour system.",
    colour: "Midnight + Danfo. Type does the culture.",
    examples: ["We dey cruise", "These are my people", "@BCHub_ stamp"],
  },
  {
    id: "limited",
    name: "Limited",
    job: "Named collections. More room to play. Parent brand stays on the neck.",
    colour: "May borrow a day accent (Dominion burgundy) on B — never a new stroke.",
    examples: ["Dominion State", "later day capsules"],
  },
] as const;

export const catalog = [
  { sku: "BC-HW-TEE", name: "Heavyweight oversized tee", cat: "Tops", drop: "00", spec: "240 GSM ring-spun combed cotton. Midnight. Drop shoulder." },
  { sku: "BC-REG-TEE", name: "Regular-fit tee", cat: "Tops", drop: "02", spec: "220 GSM. Same fibre. For members who do not want boxy." },
  { sku: "BC-LS-TEE", name: "Long-sleeve tee", cat: "Tops", drop: "02", spec: "Cuff spark or cuff type. No chest pile-up." },
  { sku: "BC-HOOD", name: "Hoodie", cat: "Tops", drop: "01", spec: "Fleece. Embroidery chest B. Harmattan / night." },
  { sku: "BC-ZIP", name: "Zip hoodie", cat: "Tops", drop: "03", spec: "Same body as hoodie. Hardware midnight." },
  { sku: "BC-CREW", name: "Crewneck", cat: "Tops", drop: "02", spec: "French terry. Quieter than a hoodie." },
  { sku: "BC-TANK", name: "Sleeveless tee", cat: "Tops", drop: "later", spec: "Only if the cut is grown, not gym-bro." },
  { sku: "BC-SHORT", name: "Shorts", cat: "Bottoms", drop: "02", spec: "French terry. Hem stamp. No all-over." },
  { sku: "BC-JOG", name: "Joggers", cat: "Bottoms", drop: "03", spec: "Street, not gym. Calf or seam graphic." },
  { sku: "BC-SWEAT", name: "Sweatpants", cat: "Bottoms", drop: "03", spec: "Same family as joggers. Heavier." },
  { sku: "BC-CAP-DAD", name: "Dad cap", cat: "Headwear", drop: "00", spec: "Unstructured. Embroidery B. One colour." },
  { sku: "BC-CAP-STR", name: "Structured cap", cat: "Headwear", drop: "01", spec: "Mid crown. Front B. No 3D puff gold." },
  { sku: "BC-CAP-5", name: "5-panel", cat: "Headwear", drop: "03", spec: "Side B. Street, not camp-souvenir." },
  { sku: "BC-BEANIE", name: "Beanie", cat: "Headwear", drop: "later", spec: "Harmattan only. Fold spark." },
  { sku: "BC-TOTE", name: "Tote", cat: "Accessories", drop: "01", spec: "Bone canvas. Midnight stroke. One face." },
  { sku: "BC-CROSS", name: "Crossbody", cat: "Accessories", drop: "03", spec: "Small B. Hardware black." },
  { sku: "BC-PACK", name: "Backpack", cat: "Accessories", drop: "later", spec: "Small B. No full-bleed photo." },
  { sku: "BC-SOCK", name: "Socks", cat: "Accessories", drop: "02", spec: "Rib. Spark at cuff. Midnight." },
  { sku: "BC-KEY", name: "Keychain", cat: "Accessories", drop: "01", spec: "Metal or PVC filled B. 20mm+." },
  { sku: "BC-STK", name: "Sticker pack", cat: "Accessories", drop: "00", spec: "Die-cut midnight mark. True alpha. Pack-in." },
  { sku: "BC-PHONE", name: "Phone accessories", cat: "Accessories", drop: "later", spec: "Only if the object is good without the logo." },
] as const;

export const launchOrder = [
  { drop: "00", name: "House", items: "Oversized tee × 2 graphics + dad cap + sticker pack-in" },
  { drop: "01", name: "Weight", items: "Hoodie + tote + woven labels land + structured cap" },
  { drop: "02", name: "Culture", items: "We dey cruise tee + crew + shorts + socks" },
  { drop: "03", name: "Week", items: "7 Days illustration backs. Full-colour DTF. House spark on the chest." },
] as const;

export const dominion = {
  parent: "BIG CRUISE",
  collection: "DOMINION STATE",
  rule: "The collection never replaces the house. Neck label is always BIG CRUISE. Hang tag may say Dominion State under the house name. Day accent (burgundy) may recolour B — never redraw it.",
  hierarchy: ["BIG CRUISE", "DOMINION STATE", "Garment / design"],
  firstPieces: [
    "Tonal black hoodie, burgundy spark at the chest, STATE at the hem.",
    "Oversized tee. Stacked STATE on the back. Chest spark in burgundy.",
    "Dad cap. Burgundy spark. House neck tape still midnight/bone.",
  ],
} as const;

/** 7 Days illustration capsule. Artwork is the day file. Type is house. Neck is always BIG CRUISE. */
export const dayMerch = [
  {
    id: "mon" as const,
    sku: "BC-DAY-MON",
    src: "/brand/merch/days/src-mon.jpg",
    print: "/brand/merch/days/mon-back.jpg",
    tee: "/brand/merch/days/mon-tee.jpg",
    art: "Lion, king, skyline. Quiet power as a back print.",
    token: "dom-warm",
    retail: 28000,
    method: "Full-colour DTF back. Chest spark in burgundy.",
  },
  {
    id: "tue" as const,
    sku: "BC-DAY-TUE",
    src: "/brand/merch/days/src-tue.jpg",
    print: "/brand/merch/days/tue-back.jpg",
    tee: "/brand/merch/days/tue-tee.jpg",
    art: "The knot. Club energy, not a heart.",
    token: "lit",
    retail: 28000,
    method: "Full-colour DTF back. Chest spark in hot pink.",
  },
  {
    id: "wed" as const,
    sku: "BC-DAY-WED",
    src: "/brand/merch/days/src-wed.jpg",
    print: "/brand/merch/days/wed-back.jpg",
    tee: "/brand/merch/days/wed-tee.jpg",
    art: "She moves different. Wings as motion, not costume.",
    token: "divine",
    retail: 28000,
    method: "Full-colour DTF back. Chest spark in rose.",
  },
  {
    id: "thu" as const,
    sku: "BC-DAY-THU",
    src: "/brand/merch/days/src-thu.jpg",
    print: "/brand/merch/days/thu-back.jpg",
    tee: "/brand/merch/days/thu-tee.jpg",
    art: "The cassette. Echo era. No throwback slogan.",
    token: "echo",
    retail: 28000,
    method: "Full-colour DTF back. Chest spark in sepia.",
  },
  {
    id: "fri" as const,
    sku: "BC-DAY-FRI",
    src: "/brand/merch/days/src-fri.jpg",
    print: "/brand/merch/days/fri-back.jpg",
    tee: "/brand/merch/days/fri-tee.jpg",
    art: "The session. Music as posture.",
    token: "play-cyan",
    retail: 28000,
    method: "Full-colour DTF back. Chest spark in cyan.",
  },
  {
    id: "sat" as const,
    sku: "BC-DAY-SAT",
    src: "/brand/merch/days/src-sat.jpg",
    print: "/brand/merch/days/sat-back.jpg",
    tee: "/brand/merch/days/sat-tee.jpg",
    art: "The unsent. Negative space is the graphic.",
    token: "line",
    retail: 28000,
    method: "Full-colour DTF back. Chest spark in deep red.",
  },
  {
    id: "sun" as const,
    sku: "BC-DAY-SUN",
    src: "/brand/merch/days/src-sun.jpg",
    print: "/brand/merch/days/sun-back.jpg",
    tee: "/brand/merch/days/sun-tee.jpg",
    art: "The blast. Chaos as a room, not a tantrum.",
    token: "chaos",
    retail: 28000,
    method: "Full-colour DTF back. Chest spark in acid.",
  },
] as const;

export const dayMerchRule = {
  collection: "7 Days of Cruise",
  drop: "03 · Week",
  blank: "Same 240 GSM midnight oversized tee as House.",
  type: "Barlow Condensed ExtraBold for the sub-brand. IBM Plex Mono for the day stamp. House lockup at the hem.",
  banned: "Do not print MEN CRUSH MONDAY, TITTY TUESDAY, WCW, or the former community name.",
  identity: "Neck label is always BIG CRUISE. The illustration never redraws the Cruise Stroke. House spark stays on the chest, day-accent only.",
  print: "Full-colour DTF of the typed back file. Not gold foil. Not chrome plating. The warm metal in the drawing is ink, not a finish.",
};
export const sizes = [
  { size: "XS", chest: 104, shoulder: 52, length: 68, sleeve: 21, note: "Skip Drop 00 if cut cost is tight." },
  { size: "S", chest: 112, shoulder: 54, length: 70, sleeve: 22, note: "True small on NG frames; still relaxed." },
  { size: "M", chest: 120, shoulder: 56, length: 72, sleeve: 23, note: "Volume size." },
  { size: "L", chest: 128, shoulder: 58, length: 74, sleeve: 24, note: "Volume size." },
  { size: "XL", chest: 136, shoulder: 60, length: 76, sleeve: 25, note: "Volume size." },
  { size: "2XL", chest: 144, shoulder: 62, length: 78, sleeve: 26, note: "Keep in Drop 00." },
  { size: "3XL", chest: 152, shoulder: 64, length: 80, sleeve: 27, note: "Keep in Drop 00." },
  { size: "4XL", chest: 160, shoulder: 66, length: 82, sleeve: 28, note: "Drop 01+ if demand shows." },
] as const;

export const sizeNote =
  "These are garment measurements for an oversized Nigerian unisex block, not US or EU body charts. Chest is circumference. Shoulder includes the drop. Sample in M and XL and hang after wash before locking.";

export const labels = [
  { id: "neck", name: "Neck label", spec: "Woven damask. Bone on midnight. BIG CRUISE + spark. 40×20mm folded. Drop 00 may use DTF neck while woven MOQ lands." },
  { id: "size", name: "Size label", spec: "Woven or printed on the neck. Size code only. No flag." },
  { id: "care", name: "Care label", spec: "100% cotton. 240 GSM. Cold wash inside-out. Do not iron print. Do not bleach. Line dry. Made in Nigeria (or Cut in Nigeria / fabric imported — tell the truth)." },
  { id: "side", name: "Woven side label", spec: "15mm. Spark + size. Sits at the right seam." },
  { id: "limited", name: "Limited label", spec: "Collection name only. Never bigger than the house neck label. Dominion State lives here." },
] as const;

export const packaging = {
  tee: ["Black poly mailer", "One Danfo slash sticker on the seal", "Bone tissue, unprinted", "Hang tag + spark sticker pack-in"],
  hoodie: ["Heavier black mailer or box only if the hoodie does not crush", "Same tissue", "Hang tag"],
  cap: ["Black dust bag or cardboard insert in the mailer", "Keep the crown"],
  accessory: ["Same mailer family. No extra boxes."],
  skip: ["Gold tissue", "Rainbow packing tape", "Thank-you paragraphs", "Plastic hangers shipped to the customer"],
  hangTag: "Bone board. Horizontal lockup A (wordmark + spark). Size. SKU. QR to big-cruise-app.vercel.app/merch. One line: Where the cruise lives.",
  qr: "https://big-cruise-app.vercel.app/merch",
} as const;

export const photography = {
  studio: "Midnight field. One garment. Side light. No cyclorama smile. Fabric must look heavy.",
  lifestyle: "Lagos night. Street, compound, danfo glow in the distance. Real clothes on real adults. Documentary, not a lookbook imported from Milan.",
  avoid: ["White-studio stock", "Gold reflectors", "Yacht", "Ankara-as-identity", "Children", "Influencer posing with a logo"],
} as const;

export type CostTag = "researched" | "estimated";

export const costNotes = [
  { tag: "researched" as const, text: "Lagos custom tees advertised from ₦7,000 (Hazken, Pziel, Aug 2026). Typical 180–200 GSM, MOQ ~10, DTF. Corporate / sublimation from ₦12,000–14,000." },
  { tag: "researched" as const, text: "Woven neck labels: Hazken ₦95,000 / 1000pcs (7×2.5cm). wovenlabelsnigeria from ₦65,000 / 1000pcs. Size labels from ~₦30,000 / 1000pcs. Yumarib lists from ₦150,000 / 1000." },
  { tag: "estimated" as const, text: "True 220–240 GSM oversized blanks in Lagos are not the ₦7,000 promo tee. Working blank range ₦5,500–8,500 before print, pending sample quotes." },
  { tag: "estimated" as const, text: "DTF chest ~₦1,200–2,500. DTF back type ~₦2,500–4,500. Screen setup ₦15,000–40,000 then ₦800–2,000 / unit at 30+." },
] as const;

export const costBuild = {
  currency: "NGN",
  scenarios: [
    {
      id: "budget",
      name: "Budget",
      note: "Rejected as house. Shown so the math is honest.",
      gsm: 180,
      blank: 3500,
      print: 2000,
      labels: 150,
      pack: 300,
      labour: 400,
      logistics: 400,
      marketing: 800,
      fees: 350,
      contingency: 500,
    },
    {
      id: "standard",
      name: "Standard — Drop 00",
      note: "240 GSM. DTF. DTF neck. This is the working model.",
      gsm: 240,
      blank: 7000,
      print: 2800,
      labels: 250,
      pack: 550,
      labour: 600,
      logistics: 500,
      marketing: 1500,
      fees: 450,
      contingency: 900,
    },
    {
      id: "premium",
      name: "Premium",
      note: "Woven labels amortised. Screen restock. Heavier QC.",
      gsm: 240,
      blank: 8500,
      print: 2200,
      labels: 400,
      pack: 700,
      labour: 800,
      logistics: 500,
      marketing: 1800,
      fees: 500,
      contingency: 1100,
    },
  ],
  wholesaleFactor: 1.45,
  retailTarget: {
    budget: 12000,
    standard: 24500,
    premium: 28500,
  },
} as const;

export function landed(row: (typeof costBuild.scenarios)[number]) {
  return (
    row.blank +
    row.print +
    row.labels +
    row.pack +
    row.labour +
    row.logistics +
    row.marketing +
    row.fees +
    row.contingency
  );
}

export const firstDrop = {
  name: "Drop 00 — House",
  skus: [
    { sku: "BC-HW-01", name: "Minimal Cruise tee", concept: "minimal", colour: "Midnight", print: "DTF left-chest spark", retail: 24500, units: 28 },
    { sku: "BC-HW-02", name: "Back Statement tee", concept: "statement", colour: "Midnight", print: "DTF back type + sleeve spark", retail: 26500, units: 20 },
    { sku: "BC-CAP-01", name: "Dad cap", concept: "minimal", colour: "Midnight", print: "Embroidery B", retail: 18500, units: 24 },
  ],
  sizes: "S–3XL. Skip XS and 4XL on Drop 00.",
  curve: "S 4 · M 10 · L 12 · XL 12 · 2XL 6 · 3XL 4 across both tees.",
  samples: "4 tees (M + XL × 2 concepts) + 2 caps. Wash test before bulk.",
  model: "10-day pre-order in the community, then produce. Cap leftover risk is the only ready-stock.",
  budgetNote: "Estimated production envelope ₦900,000–1,250,000 including samples, DTF neck, mailers, 15% contingency. Not a supplier quote.",
  reason: "Two tee graphics prove whether the room wants quiet or statement. One cap is the cheap extra. No hoodie until the blank is proven.",
} as const;

export const suppliers = [
  {
    name: "Hazken Digital",
    where: "Lagos (public site hazken.com)",
    offers: "Custom tees from ₦7,000. Woven labels ₦95,000 / 1000 (7×2.5cm).",
    tag: "verified" as const,
    note: "Promo-weight tees. Use for labels, not as the 240 GSM mill.",
  },
  {
    name: "Pziel NG",
    where: "Lagos (pzielng.com)",
    offers: "Custom tees from ₦7,000. DTF. MOQ 10.",
    tag: "verified" as const,
    note: "Same band as Hazken. Sample GSM with a scale.",
  },
  {
    name: "Global T-Shirt Factory",
    where: "75 Ojuelegba Road, Lagos. 08077409755 (public listings 2026).",
    offers: "Manufacturing + print. Low minimums advertised.",
    tag: "verified" as const,
    note: "Address and phone from public pages. Capabilities for 240 GSM oversized are unconfirmed — request a blank sample.",
  },
  {
    name: "wovenlabelsnigeria.com",
    where: "Ships from Lagos",
    offers: "Woven labels from ₦65,000 / 1000. Size labels from ₦30,000 / 1000.",
    tag: "verified" as const,
    note: "MOQ is the constraint. Order at Drop 00 for Drop 01.",
  },
  {
    name: "Earnest Printing & Branding",
    where: "Lagos (public social)",
    offers: "DTF + screen + embroidery advertised.",
    tag: "inferred" as const,
    note: "Public posts only. Get a paid sample. Do not assume 240 GSM cut-and-sew.",
  },
  {
    name: "Yaba / Ojuelegba print corridor",
    where: "Lagos",
    offers: "Screen, DTF, embroidery density.",
    tag: "inferred" as const,
    note: "A cluster, not a vendor. Walk with the SVG and a GSM scale.",
  },
  {
    name: "Aba cut-and-sew",
    where: "Abia",
    offers: "Lower blank cost. Quality variance.",
    tag: "inferred" as const,
    note: "Only after a Lagos printer cannot source 240 GSM. Sample or skip.",
  },
] as const;

export const qcSteps = [
  { n: "01", name: "Sample", do: "Two tees per graphic (M, XL) + two caps. Record actual GSM with a 10×10cm cut or a fabric scale." },
  { n: "02", name: "Wash test", do: "Five cold cycles, inside-out, line dry. Measure chest, length, shoulder before and after." },
  { n: "03", name: "Inspection", do: "Shrinkage ≤5%. No twist. Collar stands. Print no crack/peel. Stroke still open. Seams hold a pull. Colourfast Danfo." },
  { n: "04", name: "Revision", do: "If GSM is fake, change mill. If print cracks, change method or press. If fit is not oversized, recut." },
  { n: "05", name: "Approval", do: "FX signs the sample. Photo the approved piece. That photo is the factory brief." },
  { n: "06", name: "Bulk", do: "Only after 05. Inline QC at 10% of units. Reject reprints that redraw the stroke." },
] as const;

export const merchDo = [
  "Midnight as the field. Danfo as the hit. 75–85 / 15–25.",
  "Preserve the Cruise Stroke. Use the SVG. Never redraw.",
  "Clear space X = 20/64 around the mark.",
  "Heavyweight blanks. Comfort in Lagos heat.",
  "Maximum two print locations.",
  "Subtle core pieces. Loud is earned.",
  "Limited collections under the house name.",
  "Tell the truth on care labels (made vs cut vs imported fabric).",
];

export const merchDont = [
  "Redesign the logo or recreate the stroke by hand.",
  "Neon, gold, metallic, chrome, rainbow.",
  "Giant front logo. Logo on front + back + sleeve.",
  "Weekday programming titles as artwork.",
  "Former name. Yacht. Danfo illustration. Children’s graphics.",
  "180–200 GSM promo blanks.",
  "Heat-transfer vinyl as the house method.",
  "Bulk before a washed sample passes.",
  "Yellow tee as a core SKU (that is a limited reverse, not the house).",
  "Founder mark C as a community chest print.",
];

export const recommendation = {
  product: "Heavyweight oversized tee — Midnight — 240 GSM ring-spun combed cotton.",
  fabric: "100% ring-spun combed cotton. Not carded. Not poly.",
  gsm: "240. Alternate 220 if the 240 knit is too dense for Lagos.",
  fit: "Unisex oversized, drop shoulder, boxy, structured rib.",
  print: "Drop 00: DTF. Restock at 30+: screen. Cap: embroidery.",
  design: "BC-HW-01 Minimal Cruise as the permanent core. BC-HW-02 Back Statement as the drop hero.",
  dropSize: "48 tees + 24 caps after a 10-day pre-order. Samples first.",
  budget: "Estimated ₦900,000–1,250,000 all-in for Drop 00. Not a quote.",
  retail: "Tee ₦24,500 / ₦26,500. Cap ₦18,500.",
  margin: "~45–58% gross on the standard build before dead stock and ads.",
  risk: "Fake GSM and shrinkage on local ‘heavyweight’ blanks. Wash-test is the gate.",
  opportunity: "The room already exists. Drop to members first. This is not a cold brand.",
} as const;

export const launchPlan = [
  { n: "01", name: "Idea", do: "This system. Identity locked V1.1." },
  { n: "02", name: "Design", do: "Lock BC-HW-01 and BC-HW-02 art. Export SVG → print PNG 300 DPI transparent." },
  { n: "03", name: "Sample", do: "Three blank mills. Two printers. Pay for samples. Weigh GSM." },
  { n: "04", name: "Test", do: "Five-wash protocol. Fit on Nigerian bodies S–3XL if possible, at least M and XL." },
  { n: "05", name: "Supplier", do: "One blank source. One printer. Written unit cost. No handshake-only." },
  { n: "06", name: "Production", do: "Pre-order closes. Cut / print / embroider. Inline QC." },
  { n: "07", name: "Packaging", do: "Mailer, tissue, hang tag, sticker. Photograph the packed piece." },
  { n: "08", name: "Launch", do: "Community first, then X. Same night Space. No fake scarcity copy." },
  { n: "09", name: "Fulfillment", do: "Lagos pickup + courier. Honest timelines." },
  { n: "10", name: "Feedback", do: "Fit notes. GSM complaints. Which graphic moved. Write it down." },
  { n: "11", name: "Second drop", do: "Hoodie if the blank passed. Culture graphic if 02 sold. Dominion when the house is proven." },
] as const;

export const naira = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});
