"use client";

import { useEffect, useRef, useState } from "react";
import {
  BadgeCheck,
  Building2,
  Handshake,
  LockKeyhole,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ICON_MAP = {
  wrench: Wrench,
  handshake: Handshake,
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
};

export const CORE_VALUES: ValueItem[] = [
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
    title: "Integrity and Trust",
    body: "Client processes and data are handled with confidentiality and professionalism.",
    icon: "handshake",
    accent: {
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-700",
      ring: "ring-emerald-200/80",
      gradient: "from-emerald-500/10 via-transparent to-transparent",
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
];

type ValueCardProps = {
  index: number;
  title: string;
  body: string;
  icon: ValueIcon;
  accent: ValueAccent;
  featured?: boolean;
};

export function ValueCard({
  index,
  title,
  body,
  icon,
  accent,
  featured = false,
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
        "group relative h-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-7",
        featured && "flex flex-col justify-between lg:p-8",
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

      <div className="relative">
        <div className="mb-5 flex items-start justify-between gap-3">
          <div
            className={cn(
              "inline-flex size-12 items-center justify-center rounded-xl ring-1 transition-transform duration-300 group-hover:scale-105",
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
            "mb-2 font-semibold text-[var(--foreground)]",
            featured ? "font-display text-xl sm:text-2xl" : "text-lg",
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "leading-relaxed text-[var(--muted)]",
            featured ? "text-sm sm:text-base" : "text-sm",
          )}
        >
          {body}
        </p>
      </div>

      {featured && (
        <p className="relative mt-8 border-t border-[var(--border)]/80 pt-5 text-xs font-medium uppercase tracking-[0.18em] text-[var(--primary)]">
          Foundation of every engagement
        </p>
      )}
    </article>
  );
}

export function ValuesGrid() {
  const [featured, ...supporting] = CORE_VALUES;

  return (
    <div className="grid gap-4 sm:gap-5 lg:grid-cols-12 lg:grid-rows-2">
      <div className="lg:col-span-5 lg:row-span-2">
        <ValueCard
          index={0}
          title={featured.title}
          body={featured.body}
          icon={featured.icon}
          accent={featured.accent}
          featured
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:grid-cols-2 lg:content-start">
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
