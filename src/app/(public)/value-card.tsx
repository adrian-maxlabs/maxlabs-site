"use client";

import { useEffect, useRef, useState } from "react";
import {
  BadgeCheck,
  Building2,
  CheckCircle2,
  HandHeart,
  LockKeyhole,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ICON_MAP = {
  wrench: Wrench,
  handHeart: HandHeart,
  badgeCheck: BadgeCheck,
  lockKeyhole: LockKeyhole,
  building: Building2,
} as const;

export type ValueIcon = keyof typeof ICON_MAP;

type ValueAccent = {
  iconBg: string;
  iconColor: string;
  ring: string;
  gradient: string;
};

export type ValueItem = {
  title: string;
  body: string;
  icon: ValueIcon;
  accent: ValueAccent;
  detail?: string;
  highlights?: readonly string[];
};

export const CORE_VALUES: ValueItem[] = [
  {
    title: "God-Fearing Business",
    body: "We lead with integrity, honesty, and humility before God and man. Client processes and data are handled with confidentiality, professionalism, and faithful stewardship.",
    detail:
      "Every engagement is guided by integrity first. That shapes how we scope work, protect your data, and stay accountable when priorities or tradeoffs shift.",
    highlights: [
      "Integrity in counsel and delivery",
      "Confidential, professional data handling",
      "Honest scope without overselling",
      "Stewardship over shortcuts",
    ],
    icon: "handHeart",
    accent: {
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-700",
      ring: "ring-emerald-200/80",
      gradient: "from-emerald-500/10 via-transparent to-transparent",
    },
  },
  {
    title: "Practical Innovation",
    body: "We build systems that work in real operations, not just in presentations.",
    icon: "wrench",
    accent: {
      iconBg: "bg-sky-100",
      iconColor: "text-sky-700",
      ring: "ring-sky-200/80",
      gradient: "from-sky-500/10 via-transparent to-transparent",
    },
  },
  {
    title: "Long-Term Partnership",
    body: "We support clients beyond launch through structured continuous improvement.",
    icon: "building",
    accent: {
      iconBg: "bg-amber-100",
      iconColor: "text-amber-700",
      ring: "ring-amber-200/80",
      gradient: "from-amber-500/10 via-transparent to-transparent",
    },
  },
  {
    title: "Security Mindset",
    body: "Access control and data protection are treated as foundational requirements.",
    icon: "lockKeyhole",
    accent: {
      iconBg: "bg-violet-100",
      iconColor: "text-violet-700",
      ring: "ring-violet-200/80",
      gradient: "from-violet-500/10 via-transparent to-transparent",
    },
  },
  {
    title: "Reliability by Design",
    body: "Maintainability, documentation, and continuity are built in from day one.",
    icon: "badgeCheck",
    accent: {
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-700",
      ring: "ring-indigo-200/80",
      gradient: "from-indigo-500/10 via-transparent to-transparent",
    },
  },
];

type ValueCardProps = {
  index: number;
  title: string;
  body: string;
  icon: ValueIcon;
  accent: ValueAccent;
  featured?: boolean;
  detail?: string;
  highlights?: readonly string[];
};

export function ValueCard({
  index,
  title,
  body,
  icon,
  accent,
  featured = false,
  detail,
  highlights,
}: ValueCardProps) {
  const Icon = ICON_MAP[icon] as LucideIcon;
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className={cn(
        "group relative h-full min-h-0 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-7",
        featured && "flex flex-col justify-between lg:p-7",
      )}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: visible
          ? `opacity 0.5s ease ${index * 0.08}s, transform 0.5s ease ${index * 0.08}s, box-shadow 0.3s ease`
          : "none",
      }}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-60 transition-opacity duration-300 group-hover:opacity-100",
          accent.gradient,
        )}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -end-8 -top-8 size-32 rounded-full bg-[var(--card)]/40 blur-2xl"
        aria-hidden="true"
      />

      <div className={cn("relative", featured && "flex min-h-0 flex-1 flex-col")}>
        <div
          className={cn(
            "flex items-start justify-between gap-3",
            featured ? "mb-4" : "mb-5",
          )}
        >
          <div
            className={cn(
              "inline-flex items-center justify-center rounded-xl ring-1 transition-transform duration-300 group-hover:scale-105",
              featured ? "size-11" : "size-12",
              accent.iconBg,
              accent.ring,
            )}
          >
            <Icon className={cn("size-5", accent.iconColor)} aria-hidden="true" />
          </div>
          <span
            className="text-xs font-semibold tabular-nums tracking-[0.2em] text-[var(--muted)]/70"
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3
          className={cn(
            "mb-1.5 font-semibold text-[var(--foreground)]",
            featured ? "font-display text-xl leading-tight" : "mb-2 text-lg",
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "leading-relaxed text-[var(--muted)]",
            featured ? "text-sm leading-snug" : "text-sm",
          )}
        >
          {body}
        </p>

        {featured && detail && (
          <p className="mt-2 text-sm leading-snug text-[var(--muted)]/90">{detail}</p>
        )}

        {featured && highlights && highlights.length > 0 && (
          <ul
            className="mt-3 grid gap-x-2 gap-y-1.5 sm:grid-cols-2"
            aria-label={`How ${title} shows up in every engagement`}
          >
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-1.5 text-xs leading-snug text-[var(--muted)]">
                <CheckCircle2
                  className={cn("mt-0.5 size-3.5 shrink-0", accent.iconColor)}
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {featured && (
        <p className="relative mt-5 shrink-0 border-t border-[var(--border)]/80 pt-4 text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-[var(--primary)]">
          Foundation of every engagement
        </p>
      )}
    </article>
  );
}

export function ValuesGrid() {
  const [featured, ...supporting] = CORE_VALUES;

  return (
    <div className="grid gap-4 sm:gap-5 lg:grid-cols-12 lg:grid-rows-2 lg:items-stretch">
      <div className="h-full min-h-0 lg:col-span-5 lg:row-span-2">
        <ValueCard
          index={0}
          title={featured.title}
          body={featured.body}
          icon={featured.icon}
          accent={featured.accent}
          detail={featured.detail}
          highlights={featured.highlights}
          featured
        />
      </div>

      <div className="grid h-full min-h-0 gap-4 sm:grid-cols-2 sm:gap-5 lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:grid-cols-2 lg:grid-rows-2 lg:items-stretch">
        {supporting.map((value, index) => (
          <ValueCard
            key={value.title}
            index={index + 1}
            title={value.title}
            body={value.body}
            icon={value.icon}
            accent={value.accent}
          />
        ))}
      </div>
    </div>
  );
}
