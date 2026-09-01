import { createFileRoute } from "@tanstack/react-router";
import { Arcade } from "@/components/games/Arcade";

export const Route = createFileRoute("/play/")({ component: Arcade });
