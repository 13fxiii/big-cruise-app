import { createFileRoute } from "@tanstack/react-router";
import { NotificationsPage } from "@/components/cruise/WorldPages";

export const Route = createFileRoute("/notifications")({ component: NotificationsPage });
