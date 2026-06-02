"use client";

import { useCallback, useRef, useState } from "react";
import {
  BriefcaseBusiness,
  Building2,
  ChartLine,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { LandingDotField } from "./landing-dot-field";

type ProjectStatus = "In Progress" | "Completed" | "Discovery";

type Project = {
  client: string;
  industry: string;
  description: string;
  service: string;
  status: ProjectStatus;
  highlights: readonly [string, string, string];
  icon: LucideIcon;
  accent: string;
};

const PROJECTS: readonly Project[] = [
  {
    client: "De Gala Funeral & Insurance",
    industry: "Funeral & Insurance Services",
    description:
      "A unified ERP/CRM platform with role-based workflows for insurance enrollment, claims tracking, and funeral service coordination.",
    service: "CRM / ERP",
    status: "In Progress",
    highlights: [
      "Multi-role access for office, field, and admin teams",
      "Integrated member records and service scheduling",
      "Reporting-ready dashboards for branch operations",
    ],
    icon: LayoutDashboard,
    accent: "from-sky-500/20 to-transparent",
  },
  {
    client: "MetroLine Logistics Co.",
    industry: "Logistics & Delivery",
    description:
      "Workflow automation for dispatch routing, delivery confirmations, and driver task handoffs across daily operations.",
    service: "Workflow Automation",
    status: "Completed",
    highlights: [
      "Automated dispatch and status notifications",
      "Driver-facing mobile workflows for field updates",
      "Reduced manual coordination across dispatch teams",
    ],
    icon: Workflow,
    accent: "from-indigo-500/20 to-transparent",
  },
  {
    client: "CareFirst Medical Group",
    industry: "Healthcare & Clinics",
    description:
      "Custom web application for appointment scheduling, patient intake, and billing visibility across clinic locations.",
    service: "Custom Web App",
    status: "Completed",
    highlights: [
      "Centralized appointment and intake records",
      "Role-based billing and admin workflows",
      "Cleaner daily execution for front-desk teams",
    ],
    icon: Building2,
    accent: "from-emerald-500/20 to-transparent",
  },
  {
    client: "Summit Retail Distribution",
    industry: "Retail & Distribution",
    description:
      "Operational dashboards and inventory reporting to improve stock visibility, reorder decisions, and branch-level performance tracking.",
    service: "Dashboards & Reporting",
    status: "Discovery",
    highlights: [
      "Inventory visibility across warehouse and branches",
      "Practical KPI views for managers and owners",
      "Foundation for phased automation rollout",
    ],
    icon: ChartLine,
    accent: "from-violet-500/20 to-transparent",
  },
] as const;

const STATUS_STYLES: Record<ProjectStatus, string> = {
  "In Progress": "border-sky-400/40 bg-sky-500/15 text-sky-200",
  Completed: "border-emerald-400/40 bg-emerald-500/15 text-emerald-200",
  Discovery: "border-amber-400/40 bg-amber-500/15 text-amber-200",
};

function CompactProjectCard({
  project,
  isSelected,
  onSelect,
}: {
  project: Project;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const Icon = project.icon;

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      aria-label={`View ${project.client} project details`}
      className={cn(
        "group relative flex min-h-[10.5rem] w-[82vw] max-w-[18rem] shrink-0 snap-center flex-col rounded-xl border bg-white/[0.04] p-3.5 text-left transition-all",
        "sm:w-[min(48%,18rem)] sm:min-h-[11rem] sm:p-4",
        "md:w-auto md:max-w-none md:snap-none md:min-h-[10.75rem] lg:min-h-[10.75rem] lg:p-3.5",
        isSelected
          ? "border-sky-400/50 bg-white/[0.08] ring-1 ring-sky-400/30"
          : "border-white/10 hover:border-white/25 hover:bg-white/[0.06]",
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-24 rounded-t-xl bg-gradient-to-b",
          project.accent,
        )}
        aria-hidden="true"
      />
      <div className="relative flex flex-1 flex-col gap-2.5">
        <div className="flex items-start justify-between gap-2">
          <div className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/10 sm:size-9">
            <Icon className="size-4 text-sky-300 sm:size-[1.125rem]" aria-hidden="true" />
          </div>
          <span
            className={cn(
              "max-w-[55%] rounded-full border px-2 py-0.5 text-center text-[10px] font-semibold uppercase leading-tight tracking-wide sm:max-w-none sm:px-2.5 sm:py-1 sm:text-[11px]",
              STATUS_STYLES[project.status],
            )}
          >
            {project.status}
          </span>
        </div>

        <div className="space-y-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-sky-300 sm:text-xs">
            {project.service}
          </p>
          <h3 className="font-display text-sm font-bold leading-snug text-white sm:text-base">
            {project.client}
          </h3>
          <p className="text-xs leading-relaxed text-slate-300 sm:text-[13px]">{project.industry}</p>
        </div>
      </div>
    </button>
  );
}

function ProjectDetailPanel({ project }: { project: Project }) {
  const Icon = project.icon;

  return (
    <article
      key={project.client}
      className="animate-in fade-in slide-in-from-bottom-2 relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] duration-300"
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b",
          project.accent,
        )}
        aria-hidden="true"
      />
      <div className="relative grid gap-5 p-5 sm:grid-cols-[auto_1fr] sm:gap-6 sm:p-6">
        <div className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/10">
          <Icon className="size-5 text-sky-300" aria-hidden="true" />
        </div>
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-300">
              {project.service}
            </span>
            <span
              className={cn(
                "rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                STATUS_STYLES[project.status],
              )}
            >
              {project.status}
            </span>
          </div>
          <h3 className="mb-1 font-display text-xl font-bold text-white sm:text-2xl">
            {project.client}
          </h3>
          <p className="mb-3 text-xs text-slate-400">{project.industry}</p>
          <p className="mb-4 text-sm leading-relaxed text-slate-200">{project.description}</p>
          <ul className="grid gap-2 text-sm text-slate-300 sm:grid-cols-2 lg:grid-cols-3">
            {project.highlights.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-sky-400" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export function ProjectsSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const selected = PROJECTS[selectedIndex];

  const scrollToIndex = useCallback((index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    if (window.matchMedia("(min-width: 1024px)").matches) return;
    const card = container.children[index] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, []);

  const selectProject = useCallback(
    (index: number) => {
      setSelectedIndex(index);
      scrollToIndex(index);
    },
    [scrollToIndex],
  );

  const navigate = useCallback(
    (direction: "prev" | "next") => {
      const nextIndex =
        direction === "prev"
          ? (selectedIndex - 1 + PROJECTS.length) % PROJECTS.length
          : (selectedIndex + 1) % PROJECTS.length;
      selectProject(nextIndex);
    },
    [selectedIndex, selectProject],
  );

  return (
    <section
      id="projects"
      className="relative scroll-mt-[5.5rem] border-t border-[var(--border)] bg-[#0f172a] px-4 py-10 text-slate-100 sm:px-6 sm:py-14 lg:px-10"
      aria-labelledby="projects-heading"
    >
      <LandingDotField variant="dark" />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
              Our Projects
            </p>
            <h2
              id="projects-heading"
              className="mb-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl"
            >
              Systems Built for Real Operations
            </h2>
            <p className="text-sm leading-relaxed text-slate-300">
              Practical software for SMEs and growth-stage teams — scroll or click a project to
              explore.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => navigate("prev")}
              aria-label="Previous project"
              className="inline-flex size-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-slate-200 transition-colors hover:border-white/30 hover:bg-white/10"
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
            </button>
            <span className="min-w-[3.5rem] text-center text-xs tabular-nums text-slate-400">
              {selectedIndex + 1} / {PROJECTS.length}
            </span>
            <button
              type="button"
              onClick={() => navigate("next")}
              aria-label="Next project"
              className="inline-flex size-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-slate-200 transition-colors hover:border-white/30 hover:bg-white/10"
            >
              <ChevronRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="relative mb-5">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-[#0f172a] to-transparent sm:w-10 lg:hidden"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-[#0f172a] to-transparent sm:w-10 lg:hidden"
            aria-hidden="true"
          />
          <div
            ref={scrollRef}
            className="flex items-stretch snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-2 md:gap-3 md:overflow-visible md:pb-0 md:snap-none lg:grid-cols-4 [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label="Project portfolio"
          >
            {PROJECTS.map((project, index) => (
              <CompactProjectCard
                key={project.client}
                project={project}
                isSelected={selectedIndex === index}
                onSelect={() => selectProject(index)}
              />
            ))}
          </div>
        </div>

        <ProjectDetailPanel project={selected} />

        <p className="mt-5 flex items-center justify-center gap-2 text-center text-xs text-slate-400 sm:justify-start sm:text-left">
          <BriefcaseBusiness className="size-3.5 shrink-0 text-sky-400/80" aria-hidden="true" />
          <span>
            More engagements in pipeline · PH · SME Focus · names shown with permission or as
            representative placeholders
          </span>
        </p>
      </div>
    </section>
  );
}
