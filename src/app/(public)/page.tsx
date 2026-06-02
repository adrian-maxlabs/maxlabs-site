import Link from "next/link";
import type { Metadata } from "next";
import { MaxlabsBrandLockup } from "@/components/brand/MaxlabsBrandLockup";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { DeliveryProcessSection } from "./delivery-process-section";
import { FeatureStoryCard } from "./feature-story-card";
import { HeroLoopBackground } from "./hero-loop-background";
import { HeroTrustBar } from "./hero-trust-bar";
import { HeroVisualShowcase } from "./hero-visual-showcase";
import { LandingHashSync } from "./landing-hash-sync";
import { CircleExpandButton } from "@/components/ui/circle-expand-button";
import { LandingNavMenu } from "./landing-nav-menu";
import { AboutSection } from "./about-section";
import { ProjectsSection } from "./projects-section";
import { ValuesMarqueeSection } from "./values-marquee-section";
import { LandingDotField } from "./landing-dot-field";

export const metadata: Metadata = {
  title: "MAXLABS I.T SOLUTIONS",
  description:
    "MAXLABS I.T. SOLUTIONS helps organizations maximize performance through practical digitalization, workflow automation, and scalable software implementation.",
};

function SectionHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
      <h2
        className="mb-3 font-display text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl"
      >
        {title}
      </h2>
      <p className="text-sm leading-relaxed text-[var(--muted)] sm:text-base">{subtitle}</p>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)] font-sans">
      <LandingHashSync />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-sm">
        <nav className="mx-auto grid h-14 max-w-6xl grid-cols-[1fr_auto] items-center gap-3 px-4 sm:h-16 sm:px-6 lg:grid-cols-[1fr_auto_1fr] lg:px-10">
          <Link href="/" className="flex min-w-0 items-center gap-2" aria-label="MAXLABS home">
            <MaxlabsBrandLockup priority logoContrastBackdrop />
          </Link>

          <LandingNavMenu className="justify-self-end lg:justify-self-center" />

          <div className="hidden items-center justify-end gap-3 justify-self-end lg:flex">
            <ThemeToggle />
            <CircleExpandButton href="/contact">Start Your Project</CircleExpandButton>
          </div>
        </nav>
      </header>

      <div className="h-14 shrink-0 sm:h-16" aria-hidden="true" />

      <main>
        <section
          data-hero-scroll-root
          className="relative isolate flex min-h-[calc(100svh-3.5rem)] flex-col overflow-hidden sm:min-h-[calc(100svh-4rem)]"
          aria-label="Hero"
        >
          <HeroLoopBackground />

          <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-4 py-14 sm:px-6 lg:grid lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-10 lg:px-10 xl:gap-14">
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <h1
                className="font-display text-balance text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl"
              >
                Maximize Your Business With
                <span className="mt-2 block text-[#38bdf8] landing-text-rotate" aria-live="polite">
                  <span>Business Digitalization</span>
                  <span>Workflow Automation</span>
                  <span>Custom ERP/CRM Systems</span>
                  <span>Operational Visibility</span>
                  <span>Scalable Architecture</span>
                  <span>Practical Innovation</span>
                </span>
              </h1>
              <p className="mt-6 max-w-3xl text-sm leading-relaxed text-slate-200 sm:text-base md:text-lg">
                We design and implement practical software systems that simplify operations,
                reduce manual overhead, and improve decision speed for SMEs and growth-stage teams.
              </p>

              <div className="mt-8 flex w-full max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row lg:justify-start">
                <Link
                  href="/contact"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-[var(--primary)] px-6 text-sm font-semibold text-white transition-colors hover:bg-[var(--primary-hover)]"
                >
                  Request a Consultation
                </Link>
                <a
                  href="#services"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-lg border border-white/50 bg-white/10 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/20"
                >
                  Explore Services
                </a>
              </div>
            </div>

            <HeroVisualShowcase className="mt-10 w-full lg:mt-0" />
          </div>

          <HeroTrustBar />
        </section>

        <AboutSection />

        <section
          id="services"
          className="relative overflow-hidden scroll-mt-[5.5rem] border-t border-[var(--border)] bg-[var(--surface)]"
        >
          <LandingDotField />

          <div className="relative z-10 mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-10">
            <SectionHeading
              title="Services and Capabilities"
              subtitle="Modular services that can be delivered end-to-end or phased based on business priorities."
            />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureStoryCard
                icon="landingPages"
                title="Website Landing Pages"
                description="Conversion-focused pages that communicate your offer clearly and turn visitors into qualified leads."
                longDescription="Craft fast, responsive landing experiences with clear messaging, trust signals, and strong calls to action—optimized for discovery, credibility, and inquiry capture from day one."
              />
              <FeatureStoryCard
                icon="customApp"
                title="Custom Web Application Development"
                description="Tailored systems for operations, administration, and service delivery needs."
                longDescription="We design and build bespoke web platforms around your workflows—from enrollment and scheduling to internal admin tools—so teams spend less time on spreadsheets and more time serving customers."
              />
              <FeatureStoryCard
                icon="mobileApps"
                title="Mobile Applications"
                description="Cross-platform apps for customers and field teams, built for real-world usage and connectivity."
                longDescription="Ship iOS and Android experiences tailored to how your users work—whether self-service for customers or offline-capable tools for field staff—with secure sync back to your core systems."
              />
              <FeatureStoryCard
                icon="cloud"
                title="Cloud and Integration Services"
                description="Cloud-ready architecture with API and third-party integration support."
                longDescription="Deploy on reliable cloud infrastructure with secure APIs and third-party connectors so your systems share data cleanly, scale with demand, and stay maintainable as integrations grow."
              />
              <FeatureStoryCard
                icon="analytics"
                title="Dashboards and Reporting"
                description="Decision-ready visibility across key functions through practical data views."
                longDescription="Build focused dashboards that surface the metrics leadership and operations teams need—filtered by branch, period, or role—without wading through raw exports or disconnected reports."
              />
              <FeatureStoryCard
                icon="automation"
                title="Workflow Automation"
                description="Automated approvals, task routing, and notifications to remove repetitive overhead."
                longDescription="Map repetitive handoffs into reliable automated flows with clear ownership, status tracking, and alerts—reducing delays, missed steps, and manual follow-ups across departments."
              />
              <FeatureStoryCard
                icon="crmErp"
                title="CRM/ERP and Internal Systems"
                description="Role-based business modules for records, transactions, and accountable workflows."
                longDescription="Centralize customer records, transactions, and operational data in role-aware modules so every handoff is traceable, auditable, and accessible to the right people at the right time."
              />
              <FeatureStoryCard
                icon="securityAudits"
                title="Security Audits"
                description="Structured review of access, data handling, and infrastructure with prioritized remediation guidance."
                longDescription="Evaluate authentication, permissions, data storage, and deployment practices against practical risk scenarios, then receive a prioritized action plan to close gaps before they become incidents."
              />
              <FeatureStoryCard
                icon="consulting"
                title="Business Digitalization Consulting"
                description="Workflow assessment, bottleneck analysis, and practical digital transition planning."
                longDescription="We assess how work actually moves through your organization, identify friction points, and deliver a phased roadmap to digitize processes without disrupting day-to-day operations."
              />
            </div>
          </div>
        </section>

        <ValuesMarqueeSection />

        <ProjectsSection />

        <DeliveryProcessSection />

        <section className="relative overflow-hidden border-t border-[var(--border)] bg-[var(--background)]">
          <LandingDotField />

          <div className="relative z-10 mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-10">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
            <h2
              className="mb-3 font-display text-3xl font-bold text-[var(--foreground)]"
            >
              Let us maximize your business through digitalization, automation, and technology.
            </h2>
            <p className="mb-6 text-sm text-[var(--muted)] sm:text-base">
              Start with a practical consultation focused on your current workflows and target outcomes.
            </p>
            <CircleExpandButton href="/contact">Talk to MAXLABS</CircleExpandButton>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
