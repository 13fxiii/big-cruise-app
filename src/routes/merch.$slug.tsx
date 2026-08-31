import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "@/components/cruise/store/ProductPage";
export const Route = createFileRoute("/merch/$slug")({ component: ProductPage });
