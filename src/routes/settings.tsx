import { createFileRoute } from "@tanstack/react-router";
import { SettingsPage } from "@/components/cruise/WorldPages";

export const Route = createFileRoute("/settings")({ component: SettingsPage });
