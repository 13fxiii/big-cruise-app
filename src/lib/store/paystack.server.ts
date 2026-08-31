import { createHmac } from "node:crypto";
import type { PaymentConfig } from "./types";

function env(key: string): string | undefined {
  const v = process.env[key]?.trim();
  return v || undefined;
}

export function paymentConfig(): PaymentConfig {
  const secret = env("PAYSTACK_SECRET_KEY");
  if (!secret) {
    return {
      provider: "paystack",
      configured: false,
      live: false,
      message: "PAYMENT: NOT LIVE — CREDENTIALS REQUIRED",
    };
  }
  const live = secret.startsWith("sk_live_");
  return {
    provider: "paystack",
    configured: true,
    live,
    message: live ? "Paystack live keys detected" : "Paystack test/sandbox keys detected",
  };
}

export function paystackSecret(): string | undefined {
  return env("PAYSTACK_SECRET_KEY");
}

export async function initializeTransaction(args: {
  email: string;
  amountKobo: number;
  reference: string;
  callbackUrl: string;
  metadata: Record<string, string>;
}) {
  const secret = paystackSecret();
  if (!secret) throw new Error("PAYMENT: NOT LIVE — CREDENTIALS REQUIRED");
  const res = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: { Authorization: `Bearer ${secret}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      email: args.email,
      amount: args.amountKobo,
      reference: args.reference,
      callback_url: args.callbackUrl,
      currency: "NGN",
      metadata: args.metadata,
    }),
  });
  const json = (await res.json()) as {
    status: boolean;
    message?: string;
    data?: { authorization_url: string; access_code: string; reference: string };
  };
  if (!res.ok || !json.status || !json.data) throw new Error(json.message || "Paystack initialize failed");
  return {
    authorizationUrl: json.data.authorization_url,
    accessCode: json.data.access_code,
    reference: json.data.reference,
  };
}

export async function verifyTransaction(reference: string) {
  const secret = paystackSecret();
  if (!secret) throw new Error("PAYMENT: NOT LIVE — CREDENTIALS REQUIRED");
  const res = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
    headers: { Authorization: `Bearer ${secret}` },
  });
  const json = (await res.json()) as {
    status: boolean;
    message?: string;
    data?: { status: string; amount: number; currency: string; reference: string };
  };
  if (!res.ok || !json.status || !json.data) throw new Error(json.message || "Paystack verify failed");
  return {
    status: json.data.status,
    amount: json.data.amount,
    currency: json.data.currency,
    reference: json.data.reference,
    paid: json.data.status === "success",
    raw: json.data as unknown as Record<string, unknown>,
  };
}

export function verifyWebhookSignature(rawBody: string, signature: string | null): boolean {
  const secret = paystackSecret();
  if (!secret || !signature) return false;
  const digest = createHmac("sha512", secret).update(rawBody).digest("hex");
  if (digest.length !== signature.length) return false;
  let mismatch = 0;
  for (let i = 0; i < digest.length; i += 1) mismatch |= digest.charCodeAt(i) ^ signature.charCodeAt(i);
  return mismatch === 0;
}
