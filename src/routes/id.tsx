import { createFileRoute } from "@tanstack/react-router";
import { IdPage } from "@/components/cruise/WorldPages";

export const Route = createFileRoute("/id")({ component: IdPage });
