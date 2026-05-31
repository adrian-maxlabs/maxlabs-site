"use client";

import { useEffect, useState } from "react";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { HERO_BRAND } from "./hero-brand-colors";

export function HeroFlickeringGridBackground() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setReducedMotion(mediaQuery.matches);

    syncPreference();
    mediaQuery.addEventListener("change", syncPreference);
    return () => mediaQuery.removeEventListener("change", syncPreference);
  }, []);

  return (
    <FlickeringGrid
      aria-hidden
      className="absolute inset-0 z-0 size-full [mask-image:radial-gradient(ellipse_88%_78%_at_50%_44%,white,transparent)]"
      squareSize={4}
      gridGap={6}
      color={HERO_BRAND.sky}
      maxOpacity={0.45}
      flickerChance={reducedMotion ? 0 : 0.1}
    />
  );
}
