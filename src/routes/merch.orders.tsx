import { createFileRoute } from "@tanstack/react-router";
import { OrdersListPage } from "@/components/cruise/store/OrdersPage";
export const Route = createFileRoute("/merch/orders")({ component: OrdersListPage });
