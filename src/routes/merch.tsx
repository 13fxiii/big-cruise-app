import { MerchLookbook } from "@/components/cruise/MerchLookbook";
import { listMerchHolds } from "@/lib/cruise/holds";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/merch")({
  loader: () => listMerchHolds(),
  component: MerchPage,
});

function MerchPage() {
  const holds = Route.useLoaderData();
  return <MerchLookbook initialHolds={holds} />;
}
