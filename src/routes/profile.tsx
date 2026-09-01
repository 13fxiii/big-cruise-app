"use client";

import { createFileRoute } from "@tanstack/react-router";
import { IdDownload } from "@/components/cruise/IdDownload";
import { MemberBeacon } from "@/components/cruise/MemberBeacon";
import { IdPage } from "@/components/cruise/WorldPages";

export const Route = createFileRoute("/profile")({
  component: () => (
    <>
      <MemberBeacon />
      <IdPage />
      <div className="mx-auto max-w-3xl px-4 pb-24">
        <IdDownload />
      </div>
    </>
  ),
});
