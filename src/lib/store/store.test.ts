import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { formatNaira, isPurchasable, koboFromNaira, nairaFromKobo } from "./money.ts";

describe("store money", () => {
  it("converts naira and kobo", () => {
    assert.equal(koboFromNaira(28_000), 2_800_000);
    assert.equal(nairaFromKobo(2_800_000), 28_000);
    assert.ok(formatNaira(2_800_000).includes("28"));
  });

  it("never marks lookbook or zero-price items purchasable", () => {
    assert.equal(isPurchasable({ productStatus: "lookbook", variantStatus: "lookbook", priceKobo: 0, availableQty: 0 }), false);
    assert.equal(isPurchasable({ productStatus: "active", variantStatus: "active", priceKobo: 0, availableQty: 10 }), false);
    assert.equal(isPurchasable({ productStatus: "active", variantStatus: "active", priceKobo: 2800000, availableQty: 0 }), false);
    assert.equal(isPurchasable({ productStatus: "active", variantStatus: "active", priceKobo: 2800000, availableQty: 3 }), true);
  });
});
