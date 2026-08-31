import { createFileRoute } from "@tanstack/react-router";
import { verifyWebhookSignature } from "@/lib/store/paystack.server";
import { handlePaystackWebhookOp } from "@/lib/store/ops.server";

export const Route = createFileRoute("/api/store/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const raw = await request.text();
        const signature = request.headers.get("x-paystack-signature");
        if (!verifyWebhookSignature(raw, signature)) {
          return new Response("invalid signature", { status: 401 });
        }
        let event: { event?: string; data?: { reference?: string; amount?: number; currency?: string; status?: string } };
        try {
          event = JSON.parse(raw) as typeof event;
        } catch {
          return new Response("bad json", { status: 400 });
        }
        await handlePaystackWebhookOp(event);
        return new Response("ok", { status: 200 });
      },
    },
  },
});
