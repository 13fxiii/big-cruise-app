import { createFileRoute } from "@tanstack/react-router";
import { MusicPage } from "@/components/cruise/WorldPages";

export const Route = createFileRoute("/music")({ component: MusicPage });
