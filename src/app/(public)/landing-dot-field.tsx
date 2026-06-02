"use client";

import { DotFieldBackground } from "@/components/ui/dot-field-background";
import { cn } from "@/lib/utils";

type LandingDotFieldProps = {
  className?: string;
};

export function LandingDotField({ className }: LandingDotFieldProps) {
  return (
    <DotFieldBackground
      className={cn("z-0", className)}
      density={0.00008}
      dotSize={1.5}
      linkDistance={110}
      speed={0.25}
      repelRadius={120}
      repelStrength={2.5}
      cursorEase={0.04}
      dotAlpha={0.35}
      linkAlpha={0.12}
      interaction="repel"
      maxDots={90}
    />
  );
}
