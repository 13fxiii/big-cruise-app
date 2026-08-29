import { createFileRoute } from "@tanstack/react-router";
import { SpacesPage } from "@/components/cruise/WorldPages";

export const Route = createFileRoute("/spaces")({ component: SpacesPage });
