import { createFileRoute } from "@tanstack/react-router";
import { MerchPage } from "@/components/cruise/MerchSystem";

export const Route = createFileRoute("/merch")({ component: MerchPage });
