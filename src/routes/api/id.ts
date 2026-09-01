import { createFileRoute } from "@tanstack/react-router";
import { addCrewLink, selectMemberRow, upsertMemberRow } from "@/lib/cruise/members";

async function handle({ request }: { request: Request }) {
  const url = new URL(request.url);
  try {
    if (request.method === "GET") {
      const code = (url.searchParams.get("c") || "").toUpperCase();
      const member = await selectMemberRow(code);
      return Response.json({ member });
    }
    const body = (await request.json()) as Record<string, unknown>;
    if (body.owner && body.member) {
      await addCrewLink({ data: { owner: body.owner, member: body.member } });
      return Response.json({ ok: true });
    }
    const member = await upsertMemberRow({
      code: String(body.code || "").toUpperCase(),
      name: String(body.name || "Cruiser").slice(0, 18),
      handle: String(body.handle || "").replace(/^@/, ""),
      rank: String(body.rank || "Big Cruiser"),
      points: Number(body.points) || 0,
      level: Number(body.level) || 1,
      sits: Number(body.sits) || 0,
      wins: Number(body.wins) || 0,
    });
    return Response.json({ member });
  } catch (err) {
    const message = err instanceof Error ? err.message : "ID failed";
    return Response.json({ error: message }, { status: 400 });
  }
}

export const Route = createFileRoute("/api/id")({
  server: { handlers: { GET: handle, POST: handle } },
});
