"use client";

import { createFileRoute } from "@tanstack/react-router";
import { X_COMMUNITY } from "@/lib/cruise/id-card";
import { useEffect } from "react";

export const Route = createFileRoute("/community")({
  component: CommunityGate,
});

function CommunityGate() {
  useEffect(() => {
    window.location.assign(X_COMMUNITY);
  }, []);
  return (
    <a href={X_COMMUNITY} className="flex min-h-dvh items-center justify-center font-display text-2xl font-bold uppercase text-danfo">
      Join BIG CRUISE
    </a>
  );
}
