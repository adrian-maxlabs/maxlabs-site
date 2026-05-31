"use client";

import { HeroBackgroundTexture } from "./hero-background-texture";
import { HeroDecorativeBg } from "./hero-decorative-bg";

export function HeroLoopBackground() {
  return (
    <div aria-hidden="true" className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#38bdf833,transparent_35%),radial-gradient(circle_at_80%_0%,#1d4ed84d,transparent_32%),linear-gradient(180deg,#0b1220,#111827)]" />

      {/* Subtle texture — behind decorative elements and vignette */}
      <HeroBackgroundTexture />

      <HeroDecorativeBg />

      <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/65 via-[#020617]/50 to-[#020617]/70" />

      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_20%,#38bdf80f_45%,transparent_70%)]" />
    </div>
  );
}
