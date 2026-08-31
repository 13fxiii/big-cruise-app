import { createFileRoute } from "@tanstack/react-router";
import { CheckoutPage } from "@/components/cruise/store/CheckoutPage";
export const Route = createFileRoute("/merch/checkout")({ component: CheckoutPage });
