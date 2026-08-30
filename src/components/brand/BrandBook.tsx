"use client";

import { Cover } from "@/components/brand/Cover";
import { Nav } from "@/components/brand/Nav";
import { SiteAtmosphere } from "@/components/brand/NightField";
import { Applications } from "@/components/brand/sections/Applications";
import { AppSystem } from "@/components/brand/sections/AppSystem";
import { Capsules } from "@/components/brand/sections/Capsules";
import { Days } from "@/components/brand/sections/Days";
import { Foundation } from "@/components/brand/sections/Foundation";
import { LogoStudio } from "@/components/brand/sections/LogoStudio";
import { VisualSystem } from "@/components/brand/sections/VisualSystem";
import { Review } from "@/components/brand/sections/Review";
import { SignatureSystem } from "@/components/brand/sections/Signature";
import { Voice } from "@/components/brand/sections/Voice";
import { WeekSocial } from "@/components/brand/sections/WeekSocial";

export function BrandBook() {
  return (
    <div className="relative min-h-dvh bg-midnight text-bone">
      <SiteAtmosphere />
      <div className="relative z-10">
        <Nav />
        <Cover />
        <main className="px-5 pb-24 pt-16 md:ml-64 md:px-12 md:pt-8 lg:px-16">
          <p className="mb-6 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-concrete">
            BIG CRUISE · Brand Lock-in V1.1 · 2026
          </p>
          <Foundation />
          <LogoStudio />
          <VisualSystem />
          <Applications />
          <Voice />
          <Days />
          <Capsules />
          <WeekSocial />
          <Review />
          <AppSystem />
          <SignatureSystem />
        </main>
      </div>
    </div>
  );
}
