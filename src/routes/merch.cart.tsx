import { createFileRoute } from "@tanstack/react-router";
import { CartPage } from "@/components/cruise/store/CartPage";
export const Route = createFileRoute("/merch/cart")({ component: CartPage });
