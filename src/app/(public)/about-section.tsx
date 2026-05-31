import { Building2, FileCheck2, Target } from "lucide-react";
import { MaxlabsLogo } from "@/components/brand/MaxlabsLogo";

const REGISTRATION_DETAILS = [
  { label: "Registered Trade Name", value: "MAXLABS I.T. SOLUTIONS" },
  { label: "Tax Classification", value: "Non-VAT" },
  {
    label: "Commercial Capability",
    value: "Authorized to issue Service Receipts for qualified client transactions",
  },
  {
    label: "Primary Market",
    value:
      "Small and medium businesses, service-based companies, and growth-stage organizations looking to fix profit leaks and scale operations",
  },
] as const;

const FOCUS_PILLS = ["Digitalization", "Automation", "Scalable Growth"] as const;

export function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-[5.5rem] border-t border-[var(--border)] bg-white"
      aria-labelledby="about-heading"
    >
      <div className="relative overflow-hidden px-4 py-10 sm:px-6 sm:py-12 lg:px-10">
        <div
          className="pointer-events-none absolute -left-16 top-8 h-56 w-56 rounded-full bg-[var(--primary)]/5 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-6xl">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(17rem,22rem)] lg:items-stretch lg:gap-5">
            <div className="flex flex-col gap-4">
              <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.35]"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.35) 1px, transparent 0)",
                    backgroundSize: "18px 18px",
                  }}
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-sky-400/10 blur-2xl"
                  aria-hidden="true"
                />

                <div className="relative">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--primary)]">
                    About MAXLABS
                  </p>
                  <h2
                    id="about-heading"
                    className="max-w-lg font-display text-2xl font-bold leading-tight tracking-tight text-[var(--foreground)] sm:text-3xl"
                  >
                    Built for Real{" "}
                    <span className="text-[var(--primary)]">Business Operations</span>
                  </h2>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--muted)]">
                    A Philippine technology startup helping small and medium businesses fix profit
                    leaks, streamline operations, and modernize through practical digitalization,
                    workflow automation, and scalable software.
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2" aria-label="Core focus areas">
                    {FOCUS_PILLS.map((pill) => (
                      <li
                        key={pill}
                        className="rounded-full border border-[var(--border)] bg-white px-3 py-1 text-xs font-medium text-[var(--foreground)]/85"
                      >
                        {pill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <article className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-white p-4 shadow-sm sm:p-5">
                  <div
                    className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 to-sky-600"
                    aria-hidden="true"
                  />
                  <div className="mb-3 inline-flex size-9 items-center justify-center rounded-lg bg-sky-100">
                    <Target className="size-4 text-sky-700" aria-hidden="true" />
                  </div>
                  <h3 className="mb-1.5 font-display text-base font-semibold text-[var(--foreground)]">
                    Mission
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--muted)]">
                    Help businesses maximize potential through secure, practical digital solutions
                    that simplify operations and deliver measurable results.
                  </p>
                </article>

                <article className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-white p-4 shadow-sm sm:p-5">
                  <div
                    className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-400 to-violet-500"
                    aria-hidden="true"
                  />
                  <div className="mb-3 inline-flex size-9 items-center justify-center rounded-lg bg-indigo-100">
                    <Building2 className="size-4 text-indigo-700" aria-hidden="true" />
                  </div>
                  <h3 className="mb-1.5 font-display text-base font-semibold text-[var(--foreground)]">
                    Vision
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--muted)]">
                    Be the trusted digital transformation partner for modern Filipino businesses,
                    delivering automation-first systems that improve efficiency and enable
                    sustainable scale.
                  </p>
                </article>
              </div>
            </div>

            <aside className="flex flex-col overflow-hidden rounded-2xl border border-[#1e293b] bg-[#0f172a] text-slate-100 shadow-sm">
              <div className="border-b border-white/10 px-5 py-4 sm:px-6">
                <div className="mb-3 flex items-center gap-3">
                  <MaxlabsLogo maxHeight={32} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">MAXLABS</p>
                    <p className="truncate text-xs text-slate-400">I.T. SOLUTIONS</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FileCheck2 className="size-4 shrink-0 text-emerald-400" aria-hidden="true" />
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-300">
                    Business Credentials
                  </p>
                </div>
              </div>

              <ul className="flex flex-1 flex-col divide-y divide-white/10">
                {REGISTRATION_DETAILS.map(({ label, value }, index) => (
                  <li key={label} className="px-5 py-3.5 sm:px-6">
                    <p className="mb-1 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                      <span
                        className="inline-flex size-4 items-center justify-center rounded-full bg-white/10 text-[9px] tabular-nums text-slate-300"
                        aria-hidden="true"
                      >
                        {index + 1}
                      </span>
                      {label}
                    </p>
                    <p className="text-sm leading-snug text-slate-100">{value}</p>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
