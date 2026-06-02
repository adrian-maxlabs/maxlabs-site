"use client";

import { DotFieldBackground } from "@/components/ui/dot-field-background";
import { cn } from "@/lib/utils";

type LandingDotFieldProps = {
  className?: string;
  variant?: "light" | "dark";
};

const VARIANTS = {
  light: {
    dotAlpha: 0.35,
    linkAlpha: 0.12,
  },
  dark: {
    dotColor: "#94a3b8",
    linkColor: "#38bdf8",
    dotAlpha: 0.4,
    linkAlpha: 0.16,
  },
} as const;

export function LandingDotField({ className, variant = "light" }: LandingDotFieldProps) {
  const colors = VARIANTS[variant];

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
      dotAlpha={colors.dotAlpha}
      linkAlpha={colors.linkAlpha}
      dotColor={"dotColor" in colors ? colors.dotColor : undefined}
      linkColor={"linkColor" in colors ? colors.linkColor : undefined}
      interaction="repel"
      maxDots={90}
    />
  );
}
