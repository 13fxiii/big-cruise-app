import { createFileRoute } from "@tanstack/react-router";
import { MerchPage } from "@/components/cruise/WorldPages";

export const Route = createFileRoute("/merch")({ component: MerchPage });
