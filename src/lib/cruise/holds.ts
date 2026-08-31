/**
 * Anonymous merch size-holds. Auth is OFF — no user_id, no names, no emails.
 * Unowned rows: sku + size + timestamp only.
 */
import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";

export const HOLD_SKUS = [
  "BC-HW-01",
  "BC-HW-02",
  "BC-CAP-01",
  "BC-DAY-MON",
  "BC-DAY-TUE",
  "BC-DAY-WED",
  "BC-DAY-THU",
  "BC-DAY-FRI",
  "BC-DAY-SAT",
  "BC-DAY-SUN",
] as const;

export const TEE_HOLD_SIZES = ["S", "M", "L", "XL", "2XL", "3XL"] as const;
export const CAP_HOLD_SIZES = ["OS"] as const;
export const HOLD_SIZES = [...TEE_HOLD_SIZES, ...CAP_HOLD_SIZES] as const;

export const HOLD_STORAGE_KEY = "bc-merch-holds";
export const MAX_HOLDS_PER_SIZE = 400;

export type HoldSku = (typeof HOLD_SKUS)[number];
export type HoldSize = (typeof HOLD_SIZES)[number];
export type HoldCount = { sku: string; size: string; count: number };

const SKU_SET = new Set<string>(HOLD_SKUS);
const TEE_SET = new Set<string>(TEE_HOLD_SIZES);
const CAP_SET = new Set<string>(CAP_HOLD_SIZES);

export function sizesForSku(sku: string): readonly string[] {
  return sku.includes("CAP") ? CAP_HOLD_SIZES : TEE_HOLD_SIZES;
}

function isAllowedHold(sku: string, size: string): boolean {
  if (!SKU_SET.has(sku)) return false;
  return sku.includes("CAP") ? CAP_SET.has(size) : TEE_SET.has(size);
}

function parseHold(data: unknown): { sku: HoldSku; size: HoldSize } {
  if (!data || typeof data !== "object") {
    throw new Error("That piece or size is not on this drop.");
  }
  const sku = "sku" in data ? data.sku : undefined;
  const size = "size" in data ? data.size : undefined;
  if (typeof sku !== "string" || typeof size !== "string" || !isAllowedHold(sku, size)) {
    throw new Error("That piece or size is not on this drop.");
  }
  return { sku: sku as HoldSku, size: size as HoldSize };
}

function userFacing(err: unknown): Error {
  if (err instanceof Error) {
    if (
      err.message.startsWith("That ") ||
      err.message.startsWith("This ") ||
      err.message.startsWith("Hold failed")
    ) {
      return err;
    }
  }
  console.error("[holds]", err);
  return new Error("Hold failed. Try again.");
}

export const listMerchHolds = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  return sql<HoldCount>`
    select sku, size, count(*)::int as count
    from merch_holds
    group by sku, size
    order by sku, size
  `;
});

export const placeMerchHold = createServerFn({ method: "POST" })
  .validator(parseHold)
  .handler(async ({ data }) => {
    try {
      const sql = await getSql();
      const existing = await sql<{ n: number }>`
        select count(*)::int as n
        from merch_holds
        where sku = ${data.sku} and size = ${data.size}
      `;
      if ((existing[0]?.n ?? 0) >= MAX_HOLDS_PER_SIZE) {
        throw new Error("This size is full. Wait for the next cut.");
      }
      await sql`insert into merch_holds (sku, size) values (${data.sku}, ${data.size})`;
      const rows = await sql<HoldCount>`
        select sku, size, count(*)::int as count
        from merch_holds
        where sku = ${data.sku} and size = ${data.size}
        group by sku, size
      `;
      return rows[0] ?? { sku: data.sku, size: data.size, count: 1 };
    } catch (err) {
      throw userFacing(err);
    }
  });
