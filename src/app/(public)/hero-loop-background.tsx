"use client";

import { HERO_BRAND } from "./hero-brand-colors";
import { HeroFlickeringGridBackground } from "./hero-flickering-grid-background";

export function HeroLoopBackground() {
  const { primary, sky, purple, baseFrom, baseMid, baseTo, vignette } = HERO_BRAND;

  return (
    <div aria-hidden="true" className="absolute inset-0 z-0">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: [
            `radial-gradient(ellipse 90% 60% at 50% 38%, ${primary}22, transparent 55%)`,
            `radial-gradient(circle at 14% 18%, ${sky}24, transparent 40%)`,
            `radial-gradient(circle at 88% 10%, ${purple}1a, transparent 38%)`,
            `radial-gradient(circle at 72% 82%, ${primary}14, transparent 44%)`,
            `linear-gradient(165deg, ${baseFrom} 0%, ${baseMid} 44%, ${baseTo} 100%)`,
          ].join(", "),
        }}
      />

      <HeroFlickeringGridBackground />

      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to bottom, ${vignette}a6, ${vignette}80, ${vignette}b3)`,
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(125deg, transparent 15%, ${purple}0a 35%, ${sky}14 52%, transparent 78%)`,
        }}
      />

      <svg
        className="absolute bottom-0 left-0 w-full opacity-20"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,60 C240,100 480,20 720,50 C960,80 1200,30 1440,70 L1440,120 L0,120 Z"
          fill="url(#hero-wave)"
        />
        <defs>
          <linearGradient id="hero-wave" x1="0" y1="0" x2="1440" y2="0">
            <stop offset="0%" stopColor={primary} />
            <stop offset="50%" stopColor={sky} />
            <stop offset="100%" stopColor={purple} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
