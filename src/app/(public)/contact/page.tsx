import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Shield } from "lucide-react";
import { MaxlabsLogo } from "@/components/brand/MaxlabsLogo";
import { ContactInquiryForm } from "@/features/inquiries/components/ContactInquiryForm";
import { CONTACT_EMAIL, CONTACT_PHONES, phoneToTelHref } from "@/lib/contact-info";

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
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <header className="border-b border-[#e2e8f0] bg-white">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-10">
          <Link href="/" aria-label="Back to MAXLABS home" className="flex items-center gap-2">
            <MaxlabsLogo variant="mark" maxHeight={32} priority />
            <span className="hidden text-sm font-semibold text-[#0f172a] sm:block">MAXLABS</span>
          </Link>
          <p className="text-sm text-[#64748b]">Initial Consultation</p>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg p-1 text-sm font-medium text-[#1d4ed8] hover:bg-[#eff6ff]"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to home
          </Link>
        </div>

        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-6 sm:px-6 sm:py-10 lg:grid-cols-[1fr_2fr] lg:gap-14 lg:px-10 lg:py-14">
          <aside>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#1d4ed8]">
              Let us build with you
            </p>
            <h1
              className="mb-4 font-display text-3xl font-bold text-[#0f172a]"
            >
              Request a Consultation
            </h1>
            <p className="mb-6 text-sm leading-relaxed text-[#64748b] sm:text-base">
              Tell us your goals, current workflow challenges, and preferred service interest.
              We will respond with a practical next-step recommendation.
            </p>

            <ul className="space-y-2 text-sm text-[#334155]">
              {TRUST_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <Shield className="mt-0.5 size-4 shrink-0 text-[#1d4ed8]" aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-4">
              <p className="text-sm text-[#64748b]">Prefer direct contact?</p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-1 block text-sm font-medium text-[#1d4ed8] hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
              <ul className="mt-1 list-disc space-y-0.5 pl-5">
                {CONTACT_PHONES.map((phone) => (
                  <li key={phone}>
                    <a
                      href={phoneToTelHref(phone)}
                      className="text-sm font-medium text-[#1d4ed8] hover:underline"
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
            className="rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-sm sm:p-8"
          >
            <h2 id="inquiry-form-heading" className="mb-6 text-xl font-semibold text-[#0f172a]">
              Tell us about your requirements
            </h2>
            <ContactInquiryForm />
          </section>
        </div>
      </main>

      <footer className="border-t border-[#e2e8f0] bg-[#0f172a] py-5 text-center text-sm text-[#cbd5e1]">
        © {new Date().getFullYear()} MAXLABS I.T. SOLUTIONS
      </footer>
    </div>
  );
}
