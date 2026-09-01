"use client";

import { createFileRoute } from "@tanstack/react-router";
import { brand } from "@/lib/brand";
import { useEffect } from "react";

export const Route = createFileRoute("/community")({
  component: CommunityGate,
});

function CommunityGate() {
  useEffect(() => {
    window.location.assign(brand.urls.community);
  }, []);
  return (
    <a
      href={brand.urls.community}
      className="flex min-h-dvh items-center justify-center font-display text-2xl font-bold uppercase text-danfo"
    >
      Join BIG CRUISE
    </a>
  );
}
