import { createFileRoute } from "@tanstack/react-router";
import { OrderDetailPage } from "@/components/cruise/store/OrdersPage";
export const Route = createFileRoute("/merch/orders/$id")({ component: OrderDetailPage });
