"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { DELIVERY_STEP_MOCKS } from "./delivery-step-mocks";
import { LandingDotField } from "./landing-dot-field";

const DELIVERY_STEPS = [
  {
    id: "discover",
    step: 1,
    badge: "Discover",
    title: "Clarify the operating reality",
    body: "We start by understanding how work actually flows today — not how it looks on paper. Stakeholder interviews, workflow mapping, and constraint analysis give us a shared baseline.",
    highlights: [
      "Business goals and priority outcomes",
      "Current workflows, bottlenecks, and data sources",
      "Constraints, compliance needs, and success metrics",
    ],
    accent: "from-sky-500/10 via-transparent to-transparent",
    mockKey: "discover" as const,
  },
  {
    id: "design",
    step: 2,
    badge: "Design",
    title: "Define architecture before build",
    body: "With clarity on the problem, we shape the solution: module boundaries, data model, role permissions, and phased delivery so scope stays controlled and predictable.",
    highlights: [
      "System architecture and integration points",
      "Role-based access and data ownership",
      "Phased rollout plan with milestone checkpoints",
    ],
    accent: "from-indigo-500/10 via-transparent to-transparent",
    mockKey: "design" as const,
  },
  {
    id: "build",
    step: 3,
    badge: "Build",
    title: "Ship in focused milestones",
    body: "Development happens in prioritized modules with regular demos. Each milestone is tested against real scenarios so progress is visible and accountable.",
    highlights: [
      "Iterative module delivery with demo cadence",
      "Automated testing on critical business paths",
      "Documentation aligned to daily operations",
    ],
    accent: "from-blue-600/10 via-transparent to-transparent",
    mockKey: "build" as const,
  },
  {
    id: "launch",
    step: 4,
    badge: "Launch",
    title: "Deploy with confidence",
    body: "Go-live is structured, not rushed. We handle deployment, user onboarding, stabilization windows, and support handoff so teams adopt the system smoothly.",
    highlights: [
      "Controlled deployment and environment validation",
      "Role-based onboarding and training sessions",
      "Post-launch stabilization and support runbook",
    ],
    accent: "from-emerald-500/10 via-transparent to-transparent",
    mockKey: "launch" as const,
  },
  {
    id: "optimize",
    step: 5,
    badge: "Optimize",
    title: "Improve from real usage",
    body: "After launch, we track adoption and operational impact, then prioritize enhancements that compound value — keeping the system aligned as the business grows.",
    highlights: [
      "Usage and performance monitoring",
      "Feedback-driven improvement backlog",
      "Structured releases for evolving requirements",
    ],
    accent: "from-violet-500/10 via-transparent to-transparent",
    mockKey: "optimize" as const,
  },
] as const;

function StepProgressRail({
  activeStep,
  onStepClick,
}: {
  activeStep: number;
  onStepClick: (step: number) => void;
}) {
  return (
    <nav
      aria-label="Delivery process steps"
      className="sticky top-[5.75rem] z-20 hidden self-start lg:block"
    >
      <ol className="relative flex flex-col gap-0 border-s border-[var(--border)] ps-4">
        {DELIVERY_STEPS.map(({ step, badge }) => {
          const isActive = activeStep === step;
          const isComplete = activeStep > step;
          return (
            <li key={step} className="relative py-3 first:pt-0 last:pb-0">
              <span
                className={cn(
                  "absolute -start-[calc(0.5rem+1px)] top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-[var(--background)] transition-colors duration-300",
                  isActive && "border-[var(--primary)] bg-[var(--primary)]",
                  isComplete && "border-emerald-500 bg-emerald-500",
                  !isActive && !isComplete && "border-[var(--border)]",
                )}
                aria-hidden="true"
              />
              <button
                type="button"
                onClick={() => onStepClick(step)}
                className={cn(
                  "text-left text-sm transition-colors duration-300",
                  isActive
                    ? "font-semibold text-[var(--primary)]"
                    : isComplete
                      ? "text-emerald-700 dark:text-emerald-400"
                      : "text-[var(--muted)] hover:text-[var(--foreground)]",
                )}
              >
                <span className="block text-[0.625rem] font-semibold uppercase tracking-wide">
                  Step {step}
                </span>
                {badge}
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function StepContent({
  step,
  isActive,
}: {
  step: (typeof DELIVERY_STEPS)[number];
  isActive: boolean;
}) {
  return (
    <div
      className={cn(
        "pt-6 transition-opacity duration-500 lg:min-h-[55vh] lg:pt-10",
        isActive ? "opacity-100" : "opacity-70 lg:opacity-100",
      )}
    >
      <span className="badge badge-outline mb-4 border-[var(--primary)]/30 bg-[var(--primary)]/5 text-[var(--primary)]">
        Step {step.step} · {step.badge}
      </span>
      <h3
        className="mb-4 font-display text-3xl font-bold leading-tight tracking-tight text-[var(--foreground)] sm:text-4xl"
      >
        {step.title}
      </h3>
      <p className="mb-6 max-w-2xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
        {step.body}
      </p>
      <ul className="max-w-2xl space-y-2">
        {step.highlights.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)]/80 px-3 py-2 text-sm text-[var(--foreground)]"
          >
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--primary)]" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DeliveryProcessSection() {
  const [activeStep, setActiveStep] = useState(1);
  const [reducedMotion, setReducedMotion] = useState(false);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const elements = stepRefs.current.filter(Boolean) as HTMLElement[];
    if (elements.length !== DELIVERY_STEPS.length) return;

    if (reducedMotion) {
      setActiveStep(1);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const top = visible[0];
        if (!top) return;

        const index = elements.indexOf(top.target as HTMLElement);
        if (index >= 0) setActiveStep(index + 1);
      },
      {
        root: null,
        threshold: [0.25, 0.45, 0.65],
        rootMargin: "-20% 0px -35% 0px",
      },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [reducedMotion]);

  function scrollToStep(step: number) {
    const element = stepRefs.current[step - 1];
    if (!element) return;
    element.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  }

  return (
    <section
      id="process"
      className="relative scroll-mt-[5.5rem] border-t border-[var(--border)] bg-[var(--surface)]"
    >
      <LandingDotField />
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-10">
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--primary)]">
            Delivery Framework
          </p>
          <h2
            className="mb-3 font-display text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl"
          >
            How We Deliver Value
          </h2>
          <p className="text-sm leading-relaxed text-[var(--muted)] sm:text-base">
            A structured five-step process built for clarity, control, and momentum — with
            production-ready outcomes at every stage.
          </p>
        </div>

        <div className="mb-8 flex gap-2 overflow-x-auto pb-1 lg:hidden">
          {DELIVERY_STEPS.map(({ step, badge }) => (
            <button
              key={step}
              type="button"
              onClick={() => scrollToStep(step)}
              className={cn(
                "shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                activeStep === step
                  ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                  : "border-[var(--border)] bg-[var(--card)] text-[var(--muted)]",
              )}
            >
              {step}. {badge}
            </button>
          ))}
        </div>

        <div className="grid gap-10 lg:grid-cols-[9rem_1fr] lg:gap-12">
          <StepProgressRail activeStep={activeStep} onStepClick={scrollToStep} />

          <div className="min-w-0">
            {DELIVERY_STEPS.map((step, index) => {
              const Mock = DELIVERY_STEP_MOCKS[step.mockKey];
              const reverse = index % 2 === 1;

              return (
                <article
                  key={step.id}
                  ref={(node) => {
                    stepRefs.current[index] = node;
                  }}
                  data-delivery-step={step.step}
                  className={cn(
                    "delivery-process-step relative mb-16 flex min-h-[88vh] scroll-mt-[6.5rem] items-start gap-8 last:mb-0 max-lg:flex-col sm:gap-10 lg:mb-24 lg:gap-16",
                    reverse ? "lg:flex-row-reverse" : "lg:flex-row",
                  )}
                >
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-0 -z-10 bg-radial to-50%",
                      step.accent,
                    )}
                    aria-hidden="true"
                  />

                  <div className="min-w-0 flex-1">
                    <StepContent step={step} isActive={activeStep === step.step} />
                  </div>

                  {/* Stretch to full step height so sticky mock has room to pin while scrolling copy */}
                  <div
                    className={cn(
                      "mx-auto w-full max-w-md lg:mx-0 lg:w-auto lg:shrink-0 lg:self-stretch",
                    )}
                  >
                    <div
                      className={cn(
                        "delivery-process-mock mx-auto w-full max-w-md lg:sticky lg:top-32 lg:mx-0 lg:mt-16 lg:w-auto lg:self-start",
                        reverse ? "lg:mt-20" : "lg:mt-28",
                      )}
                    >
                      <Mock />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
