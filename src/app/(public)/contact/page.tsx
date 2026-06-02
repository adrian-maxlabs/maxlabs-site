import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Shield } from "lucide-react";
import { MaxlabsBrandLockup } from "@/components/brand/MaxlabsBrandLockup";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { ContactInquiryForm } from "@/features/inquiries/components/ContactInquiryForm";
import { CONTACT_EMAILS, CONTACT_PHONES, phoneToTelHref } from "@/lib/contact-info";
import { LandingDotField } from "../landing-dot-field";

export const metadata: Metadata = {
  title: "Contact MAXLABS | Request a Consultation",
  description:
    "Send your inquiry to MAXLABS I.T. SOLUTIONS and discuss your digitalization or automation requirements.",
};

const TRUST_POINTS = [
  "Practical recommendations aligned with business outcomes",
  "Structured solution planning and scoped implementation",
  "Clear timelines, milestones, and communication flow",
  "Support beyond launch for continuous improvement",
] as const;

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)] font-sans">
      <header className="border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6 lg:px-10">
          <Link href="/" aria-label="Back to MAXLABS home" className="flex min-w-0 items-center gap-2">
            <MaxlabsBrandLockup priority logoContrastBackdrop />
          </Link>
          <div className="flex items-center gap-3">
            <p className="hidden text-sm text-[var(--muted)] sm:block">Initial Consultation</p>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="relative flex-1">
        <LandingDotField />

        <div className="relative mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg p-1 text-sm font-medium text-[var(--primary)] hover:bg-[var(--accent-subtle)]"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to home
          </Link>
        </div>

        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-6 sm:px-6 sm:py-10 lg:grid-cols-[1fr_2fr] lg:gap-14 lg:px-10 lg:py-14">
          <aside>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[var(--primary)]">
              Let us build with you
            </p>
            <h1 className="mb-4 font-display text-3xl font-bold text-[var(--foreground)]">
              Request a Consultation
            </h1>
            <p className="mb-6 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
              Tell us your goals, current workflow challenges, and preferred service interest.
              We will respond with a practical next-step recommendation.
            </p>

            <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
              {TRUST_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <Shield className="mt-0.5 size-4 shrink-0 text-[var(--primary)]" aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
              <p className="text-sm text-[var(--muted)]">Prefer direct contact?</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-[var(--foreground)]">
                Email
              </p>
              <ul className="mt-1.5 space-y-1.5">
                {CONTACT_EMAILS.map((email) => (
                  <li key={email}>
                    <a
                      href={`mailto:${email}`}
                      className="text-sm font-medium text-[var(--primary)] hover:underline"
                    >
                      {email}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-[var(--foreground)]">
                Phone
              </p>
              <ul className="mt-1.5 list-disc space-y-1 pl-5">
                {CONTACT_PHONES.map((phone) => (
                  <li key={phone}>
                    <a
                      href={phoneToTelHref(phone)}
                      className="text-sm font-medium text-[var(--primary)] hover:underline"
                    >
                      {phone}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <section
            aria-labelledby="inquiry-form-heading"
            className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm sm:p-8"
          >
            <h2 id="inquiry-form-heading" className="mb-6 text-xl font-semibold text-[var(--foreground)]">
              Tell us about your requirements
            </h2>
            <ContactInquiryForm />
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
