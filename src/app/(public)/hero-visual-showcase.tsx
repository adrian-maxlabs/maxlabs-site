"use client";

import {
  ArrowUpRight,
  Bot,
  ChartLine,
  CheckCircle2,
  GitBranch,
  TrendingUp,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type HeroVisualShowcaseProps = {
  className?: string;
};

type ScrollMicroDetail = {
  id: string;
  speed: number;
  driftX: number;
  rotate: number;
  className: string;
  content: ReactNode;
};

const OUTCOME_ROWS = [
  {
    label: "Manual admin hours / week",
    before: "24 hrs",
    after: "6 hrs",
    beforePct: 80,
    afterPct: 22,
  },
  {
    label: "Approval turnaround",
    before: "3 days",
    after: "4 hours",
    beforePct: 75,
    afterPct: 18,
  },
  {
    label: "Report preparation",
    before: "2 days",
    after: "Same day",
    beforePct: 70,
    afterPct: 20,
  },
  {
    label: "Duplicate data entry",
    before: "Frequent",
    after: "Eliminated",
    beforePct: 85,
    afterPct: 8,
  },
] as const;

const DELIVERY_PHASES = ["Discover", "Build", "Go-live"] as const;

const FOOTER_PILLARS: { icon: LucideIcon; label: string }[] = [
  { icon: Bot, label: "Less manual work" },
  { icon: ChartLine, label: "Real-time visibility" },
  { icon: Users, label: "Team capacity freed" },
];

const SCROLL_MICRO_DETAILS: ScrollMicroDetail[] = [
  {
    id: "admin-time",
    speed: 1.15,
    driftX: 52,
    rotate: -5,
    className: "left-0 top-[20%] lg:-left-10",
    content: (
      <>
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
        </span>
        <div>
          <p className="text-[0.625rem] font-semibold uppercase tracking-wide text-emerald-300">
            Admin time
          </p>
          <p className="text-xs font-medium text-white">40% less overhead</p>
        </div>
      </>
    ),
  },
  {
    id: "reporting",
    speed: 0.95,
    driftX: -46,
    rotate: 4,
    className: "right-0 bottom-[26%] lg:-right-8",
    content: (
      <>
        <div className="flex size-8 items-center justify-center rounded-lg bg-sky-500/20">
          <ChartLine className="size-4 text-sky-300" aria-hidden="true" />
        </div>
        <div>
          <p className="text-[0.625rem] text-slate-400">Reporting</p>
          <p className="text-sm font-bold text-white">On demand</p>
        </div>
      </>
    ),
  },
  {
    id: "auto-approvals",
    speed: 1.35,
    driftX: 68,
    rotate: -8,
    className: "left-[4%] top-[2%] lg:-left-2",
    content: (
      <>
        <CheckCircle2 className="size-3.5 text-emerald-400" aria-hidden="true" />
        <span className="text-[0.625rem] font-semibold text-white">Auto approvals</span>
      </>
    ),
  },
  {
    id: "workflow-sync",
    speed: 1.05,
    driftX: -58,
    rotate: 6,
    className: "right-[2%] top-[10%] lg:-right-1",
    content: (
      <>
        <GitBranch className="size-3.5 text-violet-300" aria-hidden="true" />
        <span className="text-[0.625rem] font-semibold text-white">Workflow sync</span>
      </>
    ),
  },
  {
    id: "faster-decisions",
    speed: 1.25,
    driftX: 38,
    rotate: -3,
    className: "left-[10%] bottom-[10%] lg:-left-4",
    content: (
      <>
        <Zap className="size-3.5 text-amber-300" aria-hidden="true" />
        <span className="text-[0.625rem] font-semibold text-white">3× faster decisions</span>
      </>
    ),
  },
  {
    id: "live-dashboards",
    speed: 0.88,
    driftX: -34,
    rotate: 5,
    className: "right-[8%] bottom-[6%] lg:-right-3",
    content: (
      <>
        <TrendingUp className="size-3.5 text-sky-300" aria-hidden="true" />
        <span className="text-[0.625rem] font-semibold text-white">Live dashboards</span>
      </>
    ),
  },
];

function useHeroScrollProgress(rootRef: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncReducedMotion = () => setReducedMotion(motionQuery.matches);
    syncReducedMotion();
    motionQuery.addEventListener("change", syncReducedMotion);

    let frame = 0;

    const update = () => {
      frame = 0;
      if (motionQuery.matches) {
        setProgress(0);
        return;
      }

      const root = rootRef.current;
      const hero = root?.closest("[data-hero-scroll-root]") as HTMLElement | null;
      if (!hero) {
        setProgress(0);
        return;
      }

      const rect = hero.getBoundingClientRect();
      const scrollRange = Math.max(hero.offsetHeight - window.innerHeight * 0.55, window.innerHeight * 0.45);
      const traveled = Math.max(-rect.top, 0);
      setProgress(Math.min(traveled / scrollRange, 1));
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      motionQuery.removeEventListener("change", syncReducedMotion);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, [rootRef]);

  return { progress, reducedMotion };
}

function getMicroDetailStyle(
  detail: ScrollMicroDetail,
  progress: number,
  reducedMotion: boolean,
): CSSProperties {
  if (reducedMotion) return {};

  const lift = progress * 420 * detail.speed;
  const drift = progress * detail.driftX;
  const spin = detail.rotate * (1 - progress * 0.65);
  const fade = 1 - progress * 0.92;
  const scale = 1 - progress * 0.12;

  return {
    transform: `translate3d(${drift}px, ${-lift}px, 0) rotate(${spin}deg) scale(${scale})`,
    opacity: fade,
  };
}

function getMainCardStyle(progress: number, reducedMotion: boolean): CSSProperties {
  if (reducedMotion) return {};

  const tiltX = 7 - progress * 7;
  const tiltY = -4 + progress * 4;
  const lift = progress * 28;

  return {
    transform: `perspective(1400px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translate3d(0, ${-lift}px, 0)`,
  };
}

function PostGoLiveChart() {
  return (
    <svg
      viewBox="0 0 280 120"
      className="h-full w-full"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="hero-impact-chart-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hero-impact-chart-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#64748b" />
          <stop offset="45%" stopColor="#64748b" />
          <stop offset="55%" stopColor="#1d4ed8" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>
      </defs>
      <path
        d="M0 88 L85 87"
        fill="none"
        stroke="#64748b"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="4 4"
        opacity="0.7"
      />
      <path
        d="M85 87 L120 72 L160 58 L200 38 L240 24 L280 14"
        fill="none"
        stroke="url(#hero-impact-chart-line)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="hero-chart-line"
        style={{ animationDelay: "0.8s" }}
      />
      <path
        d="M85 87 L120 72 L160 58 L200 38 L240 24 L280 14 L280 120 L85 120 Z"
        fill="url(#hero-impact-chart-fill)"
        className="hero-chart-area"
        style={{ animationDelay: "2s" }}
      />
      <line
        x1="85"
        y1="8"
        x2="85"
        y2="112"
        stroke="#38bdf8"
        strokeWidth="1"
        strokeDasharray="3 3"
        opacity="0.5"
      />
      {[
        [160, 58],
        [240, 24],
        [280, 14],
      ].map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r="3.5"
          fill="#38bdf8"
          className="hero-chart-dot"
          style={{ animationDelay: `${1.8 + i * 0.35}s` }}
        />
      ))}
    </svg>
  );
}

function OutcomeComparisonRow({
  label,
  before,
  after,
  beforePct,
  afterPct,
  index,
}: {
  label: string;
  before: string;
  after: string;
  beforePct: number;
  afterPct: number;
  index: number;
}) {
  const delay = `${0.15 + index * 0.12}s`;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[0.625rem] font-medium text-slate-300 sm:text-[0.6875rem]">{label}</p>
        <p className="shrink-0 text-[0.5625rem] text-slate-400 sm:text-[0.625rem]">
          <span className="text-amber-300/90">{before}</span>
          <span className="mx-1 text-slate-600">→</span>
          <span className="font-semibold text-emerald-400">{after}</span>
        </p>
      </div>
      <div className="space-y-1">
        <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
          <div
            className="hero-progress-bar h-full rounded-full bg-amber-500/50"
            style={{ width: `${beforePct}%`, animationDelay: delay }}
          />
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
          <div
            className="hero-progress-bar h-full rounded-full bg-gradient-to-r from-[#1d4ed8] to-[#38bdf8]"
            style={{ width: `${afterPct}%`, animationDelay: `calc(${delay} + 0.15s)` }}
          />
        </div>
      </div>
    </div>
  );
}

function DeliveryPhaseStrip() {
  return (
    <div className="mb-4 flex items-center justify-center gap-1 sm:gap-2">
      {DELIVERY_PHASES.map((phase, i) => (
        <div key={phase} className="flex items-center gap-1 sm:gap-2">
          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                "size-1.5 rounded-full sm:size-2",
                i === 0 ? "bg-sky-400" : i === 1 ? "bg-sky-400/60" : "bg-sky-400/30",
              )}
            />
            <span
              className={cn(
                "text-[0.5625rem] font-medium sm:text-[0.625rem]",
                i === 0 ? "text-sky-200" : "text-slate-500",
              )}
            >
              {phase}
            </span>
          </div>
          {i < DELIVERY_PHASES.length - 1 && (
            <span className="text-[0.5625rem] text-slate-600" aria-hidden="true">
              ·
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function FooterPillarsStrip() {
  return (
    <div className="mt-3 grid grid-cols-3 gap-2 border-t border-white/10 pt-3">
      {FOOTER_PILLARS.map(({ icon: Icon, label }) => (
        <div key={label} className="flex flex-col items-center gap-1.5 text-center">
          <div className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--icon-bg)]">
            <Icon className="size-4 text-[var(--primary)]" aria-hidden="true" />
          </div>
          <span className="text-[0.5625rem] font-semibold leading-tight text-slate-200 sm:text-[0.625rem]">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

function ScrollMicroDetailChip({
  detail,
  progress,
  reducedMotion,
}: {
  detail: ScrollMicroDetail;
  progress: number;
  reducedMotion: boolean;
}) {
  const isCompact = detail.id === "auto-approvals" || detail.id === "workflow-sync" || detail.id === "faster-decisions" || detail.id === "live-dashboards";

  return (
    <div
      className={cn(
        "hero-scroll-micro pointer-events-none absolute z-20 hidden will-change-transform sm:flex",
        isCompact ? "items-center gap-1.5 rounded-full border px-2.5 py-1.5 shadow-lg backdrop-blur-sm" : "items-center gap-2 rounded-xl border px-3 py-2 shadow-lg backdrop-blur-sm",
        detail.className,
        detail.id === "admin-time" && "border-emerald-400/30 bg-[#0f172a]/95",
        detail.id === "reporting" && "border-sky-400/30 bg-[#0f172a]/95",
        (detail.id === "auto-approvals" || detail.id === "faster-decisions") && "border-emerald-400/25 bg-[#0f172a]/90",
        (detail.id === "workflow-sync" || detail.id === "live-dashboards") && "border-sky-400/25 bg-[#0f172a]/90",
      )}
      style={getMicroDetailStyle(detail, progress, reducedMotion)}
      aria-hidden="true"
    >
      {detail.content}
    </div>
  );
}

export function HeroVisualShowcase({ className }: HeroVisualShowcaseProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { progress, reducedMotion } = useHeroScrollProgress(rootRef);

  return (
    <div
      ref={rootRef}
      className={cn("hero-scroll-stage relative mx-auto w-full max-w-lg lg:max-w-none", className)}
    >
      {SCROLL_MICRO_DETAILS.map((detail) => (
        <ScrollMicroDetailChip
          key={detail.id}
          detail={detail}
          progress={progress}
          reducedMotion={reducedMotion}
        />
      ))}

      <div
        className="hero-scroll-main-wrap will-change-transform"
        style={getMainCardStyle(progress, reducedMotion)}
      >
        <div className="hero-float-main relative origin-top rounded-2xl border border-white/15 bg-[#0f172a]/90 p-4 shadow-2xl shadow-sky-950/50 backdrop-blur-md sm:p-5">
        <div className="mb-3 flex items-start justify-between gap-2 border-b border-white/10 pb-3">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <span className="rounded-md border border-emerald-400/30 bg-emerald-500/10 px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wide text-emerald-300">
                Impact
              </span>
              <span className="text-xs font-medium text-slate-300">Business Impact Snapshot</span>
            </div>
            <p className="text-[0.5625rem] text-slate-500 sm:text-[0.625rem]">
              Typical results after digitalization &amp; automation
            </p>
          </div>
          <div className="flex shrink-0 gap-1.5" aria-hidden="true">
            <span className="size-2 rounded-full bg-red-400/80" />
            <span className="size-2 rounded-full bg-amber-400/80" />
            <span className="size-2 rounded-full bg-emerald-400/80" />
          </div>
        </div>

        <DeliveryPhaseStrip />

        <div className="mb-4 rounded-xl border border-sky-500/20 bg-gradient-to-br from-sky-950/40 to-[#0f172a] px-4 py-3 text-center">
          <p className="text-[0.625rem] font-medium uppercase tracking-wide text-sky-300/80">
            Key uplift
          </p>
          <p className="font-display text-2xl font-bold sm:text-3xl">
            <span className="bg-gradient-to-r from-[#1d4ed8] via-[#38bdf8] to-[#7928CA] bg-clip-text text-transparent">
              3× faster
            </span>{" "}
            <span className="text-white">decisions</span>
          </p>
        </div>

        <div className="mb-3 space-y-3 rounded-xl border border-white/10 bg-white/5 p-3">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[0.625rem] font-semibold uppercase tracking-wide text-slate-400">
              Before → After MAXLABS
            </p>
            <div className="flex items-center gap-2 text-[0.5625rem] text-slate-500">
              <span className="flex items-center gap-1">
                <span className="size-2 rounded-full bg-amber-500/50" />
                Before
              </span>
              <span className="flex items-center gap-1">
                <span className="size-2 rounded-full bg-sky-400" />
                After
              </span>
            </div>
          </div>
          {OUTCOME_ROWS.map((row, i) => (
            <OutcomeComparisonRow key={row.label} {...row} index={i} />
          ))}
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <div className="mb-2 flex items-center justify-between">
            <p className="flex items-center gap-1.5 text-xs font-medium text-slate-200">
              <TrendingUp className="size-3.5 text-sky-400" aria-hidden="true" />
              Performance after go-live
            </p>
            <span className="flex items-center gap-0.5 text-[0.625rem] font-semibold text-emerald-400">
              Improving
              <ArrowUpRight className="size-3" aria-hidden="true" />
            </span>
          </div>
          <div className="relative h-16 sm:h-20">
            <PostGoLiveChart />
            <span
              className="absolute bottom-0 left-[30.357%] -translate-x-1/2 whitespace-nowrap text-[0.625rem] font-medium tracking-normal text-slate-400 sm:text-[0.6875rem]"
              aria-hidden="true"
            >
              Go-live
            </span>
          </div>
        </div>

        <FooterPillarsStrip />

        <p className="mt-3 text-center text-[0.5rem] leading-snug text-slate-500 sm:text-[0.5625rem]">
          Illustrative outcomes based on typical SME engagements
        </p>
        </div>
      </div>
    </div>
  );
}
