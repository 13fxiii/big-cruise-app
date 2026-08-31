export function koboFromNaira(naira: number): number {
  if (!Number.isFinite(naira) || naira < 0) return 0;
  return Math.round(naira * 100);
}

export function nairaFromKobo(kobo: number): number {
  if (!Number.isFinite(kobo)) return 0;
  return kobo / 100;
}

export function formatNaira(kobo: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(nairaFromKobo(kobo));
}

export function todayDayId(now = new Date()): "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun" {
  const map = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;
  return map[now.getDay()] ?? "mon";
}

export function isPurchasable(input: {
  productStatus: string;
  variantStatus: string;
  priceKobo: number;
  availableQty: number;
}): boolean {
  return (
    input.productStatus === "active" &&
    input.variantStatus === "active" &&
    input.priceKobo > 0 &&
    input.availableQty > 0
  );
}
