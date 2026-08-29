import { createFileRoute } from "@tanstack/react-router";
import { RewardsPage } from "@/components/cruise/WorldPages";

export const Route = createFileRoute("/rewards")({ component: RewardsPage });
