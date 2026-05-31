"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, BriefcaseBusiness, ChartLine, CloudCog, LayoutDashboard, LucideIcon, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const ICON_MAP = {
  consulting: BriefcaseBusiness,
  automation: Bot,
  customApp: ShieldCheck,
  crmErp: LayoutDashboard,
  analytics: ChartLine,
  cloud: CloudCog,
} as const;

export type FeatureCardIcon = keyof typeof ICON_MAP;

const LEFT_BORDER_ACCENT: Record<FeatureCardIcon, string> = {
  consulting: "border-l-sky-500",
  automation: "border-l-indigo-500",
  customApp: "border-l-emerald-500",
  crmErp: "border-l-violet-500",
  analytics: "border-l-amber-500",
  cloud: "border-l-cyan-500",
};

type FeatureStoryCardProps = {
  id?: string;
  icon: FeatureCardIcon;
  title: string;
  description: string;
};

export function FeatureStoryCard({ id, icon, title, description }: FeatureStoryCardProps) {
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
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      id={id}
      ref={ref}
      className={cn(
        "rounded-2xl border border-[var(--border)] border-l-4 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md",
        LEFT_BORDER_ACCENT[icon],
        id && "scroll-mt-[5.5rem]",
      )}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: visible ? "opacity 0.45s ease, transform 0.45s ease" : "none",
      }}
    >
      <div className="mb-4 inline-flex size-11 items-center justify-center rounded-xl bg-[#dbeafe]">
        <Icon className="size-5 text-[var(--primary)]" aria-hidden="true" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-[var(--foreground)]">{title}</h3>
      <p className="text-sm leading-relaxed text-[var(--muted)]">{description}</p>
    </article>
  );
}
