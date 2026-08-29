import { createFileRoute } from "@tanstack/react-router";
import { BrandBook } from "@/components/brand/BrandBook";

export const Route = createFileRoute("/brand")({ component: BrandPage });

function BrandPage() {
  return <BrandBook />;
}
