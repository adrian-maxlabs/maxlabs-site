"use client";

import { AuroraText } from "@/components/ui/aurora-text";

const BRAND_AURORA_COLORS = ["#1d4ed8", "#38bdf8", "#0070F3", "#7928CA"] as const;

const PHRASE_CLASS =
  "whitespace-nowrap font-display text-xl font-bold uppercase tracking-[0.04em] text-[var(--foreground)] sm:text-2xl lg:text-3xl";

export function ValuesMarqueePhrase() {
  return (
    <span className="inline-flex shrink-0 items-center gap-10 px-10">
      <span className={PHRASE_CLASS}>
        MAXIMIZE YOUR BUSINESS WITH{" "}
        <span className="inline-flex items-baseline">
          <span>MAX</span>
          <AuroraText className="font-bold" colors={[...BRAND_AURORA_COLORS]}>
            LABS
          </AuroraText>
        </span>
      </span>
      <span className="text-[var(--primary)]" aria-hidden="true">
        ◆
      </span>
    </span>
  );
}
