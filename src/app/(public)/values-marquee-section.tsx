import { ValuesGrid } from "./value-card";
import { ValuesMarqueePhrase } from "./values-marquee-phrase";

const MARQUEE_TEXT = "MAXIMIZE YOUR BUSINESS WITH MAXLABS";

export function ValuesMarqueeSection() {
  return (
    <section
      id="values"
      className="scroll-mt-[5.5rem] border-t border-[var(--border)] bg-white"
      aria-labelledby="values-heading"
    >
      <div
        className="values-marquee relative overflow-hidden border-b border-[var(--border)] bg-[var(--surface)] py-8 sm:py-10"
        aria-label={MARQUEE_TEXT}
      >
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--surface)] to-transparent sm:w-24"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--surface)] to-transparent sm:w-24"
          aria-hidden="true"
        />
        <div className="values-marquee-track flex w-max items-center">
          <div className="flex shrink-0 items-center">
            {Array.from({ length: 4 }).map((_, i) => (
              <ValuesMarqueePhrase key={`a-${i}`} />
            ))}
          </div>
          <div className="flex shrink-0 items-center" aria-hidden="true">
            {Array.from({ length: 4 }).map((_, i) => (
              <ValuesMarqueePhrase key={`b-${i}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden px-4 py-14 sm:px-6 sm:py-20 lg:px-10">
        <div
          className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-[var(--primary)]/5 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--primary)]">
              Our Principles
            </p>
            <h2
              id="values-heading"
              className="mb-3 font-display text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl"
            >
              Core Values
            </h2>
            <p className="text-sm leading-relaxed text-[var(--muted)] sm:text-base">
              How we build, communicate, and deliver long-term results — with standards that
              hold from discovery through continuous improvement.
            </p>
          </div>

          <ValuesGrid />
        </div>
      </div>
    </section>
  );
}
