"use client";

import { createFileRoute } from "@tanstack/react-router";
import { MemberBeacon } from "@/components/cruise/MemberBeacon";
import { IdPage } from "@/components/cruise/WorldPages";

export const Route = createFileRoute("/profile")({
  component: () => (
    <>
      <MemberBeacon />
      <IdPage />
    </>
  ),
});
