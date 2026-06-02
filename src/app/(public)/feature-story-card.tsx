"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bot,
  BriefcaseBusiness,
  ChartLine,
  CloudCog,
  LayoutDashboard,
  LayoutTemplate,
  LucideIcon,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ICON_MAP = {
  consulting: BriefcaseBusiness,
  automation: Bot,
  customApp: ShieldCheck,
  crmErp: LayoutDashboard,
  analytics: ChartLine,
  cloud: CloudCog,
  landingPages: LayoutTemplate,
  mobileApps: Smartphone,
  securityAudits: ShieldAlert,
} as const;

export type FeatureCardIcon = keyof typeof ICON_MAP;

const LEFT_BORDER_ACCENT: Record<FeatureCardIcon, string> = {
  consulting: "border-l-sky-500",
  automation: "border-l-indigo-500",
  customApp: "border-l-emerald-500",
  crmErp: "border-l-violet-500",
  analytics: "border-l-amber-500",
  cloud: "border-l-cyan-500",
  landingPages: "border-l-rose-500",
  mobileApps: "border-l-orange-500",
  securityAudits: "border-l-fuchsia-500",
};

type FeatureStoryCardProps = {
  id?: string;
  icon: FeatureCardIcon;
  title: string;
  description: string;
  longDescription: string;
};

export function FeatureStoryCard({
  id,
  icon,
  title,
  description,
  longDescription,
}: FeatureStoryCardProps) {
  const Icon = ICON_MAP[icon] as LucideIcon;
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [pin, setPin] = useState<"open" | "closed" | null>(null);
  const expanded = pin === "open" || (pin === null && hovered);

  const toggleExpanded = () => {
    setPin((current) => {
      const isExpanded = current === "open" || (current === null && hovered);
      return isExpanded ? "closed" : "open";
    });
  };

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
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      aria-label={`${title}. ${description}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setPin(null);
      }}
      onClick={toggleExpanded}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggleExpanded();
        }
      }}
      className={cn(
        "cursor-pointer rounded-xl border border-[var(--border)] border-l-[3px] bg-[var(--card)] p-4 shadow-sm transition-shadow duration-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
        LEFT_BORDER_ACCENT[icon],
        id && "scroll-mt-[5.5rem]",
      )}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: visible ? "opacity 0.45s ease, transform 0.45s ease" : "none",
      }}
    >
      <div className="mb-2 flex items-start gap-2.5">
        <div className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-[var(--icon-bg)]">
          <Icon className="size-[18px] text-[var(--primary)]" aria-hidden="true" />
        </div>
        <h3 className="pt-0.5 text-base font-semibold leading-snug text-[var(--foreground)]">{title}</h3>
      </div>
      <p className="text-sm leading-relaxed text-[var(--muted)]">{description}</p>
      <div
        className={cn(
          "grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out",
          expanded ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <p className="border-t border-[var(--border)] pt-2 text-sm leading-relaxed text-[var(--muted)]">
            {longDescription}
          </p>
        </div>
      </div>
    </article>
  );
}
