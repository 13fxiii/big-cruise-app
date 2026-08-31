import { createFileRoute } from "@tanstack/react-router";
import { AdminPage } from "@/components/cruise/store/AdminPage";
export const Route = createFileRoute("/merch/admin")({ component: AdminPage });
