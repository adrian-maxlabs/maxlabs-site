import Link from "next/link";
import { Building2, Layers, Route } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type TrustStat = {
  icon: LucideIcon;
  value: string;
  label: string;
  href?: string;
};

const TRUST_STATS: TrustStat[] = [
  { icon: Layers, value: "6", label: "Service Areas", href: "#services" },
  { icon: Route, value: "5", label: "Delivery Stages", href: "#process" },
  { icon: Building2, value: "PH", label: "SME Focus", href: "#about" },
];

function TrustStatItem({ icon: Icon, value, label, href }: TrustStat) {
  const content = (
    <div className="flex items-center justify-center gap-3 sm:gap-3.5">
      <div
        className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[var(--footer-divider)] bg-[var(--footer-surface)] sm:size-11"
        aria-hidden="true"
      >
        <Icon className="size-5 text-[var(--footer-accent-soft)] sm:size-6" />
      </div>
      <div className="min-w-0 text-left">
        <p className="font-display text-xl font-bold leading-none text-[var(--footer-foreground)] sm:text-2xl">
          <span className="text-[var(--footer-accent)]">{value}</span>
        </p>
        <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-[var(--footer-muted)] sm:text-sm sm:tracking-[0.14em]">
          {label}
        </p>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="group flex justify-center transition-colors hover:bg-[var(--footer-surface)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--footer-accent)]"
      >
        {content}
      </Link>
    );
  }

  return <div className="flex justify-center">{content}</div>;
}

export function HeroTrustBar() {
  return (
    <div
      className="relative z-10 border-t border-[var(--footer-border)] bg-[var(--footer)] py-4 sm:py-6"
      aria-label="MAXLABS at a glance"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--footer-accent)]/35 to-transparent"
        aria-hidden="true"
      />

      <div className="mx-auto grid max-w-6xl grid-cols-3 gap-2 divide-x divide-[var(--footer-divider)] px-4 sm:px-6 lg:px-10">
        {TRUST_STATS.map((stat) => (
          <TrustStatItem key={stat.label} {...stat} />
        ))}
      </div>
    </div>
  );
}
