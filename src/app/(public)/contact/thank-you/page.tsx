import Link from "next/link";
import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export const metadata: Metadata = {
  title: "Inquiry Received | MAXLABS I.T. SOLUTIONS",
  description: "Thank-you page after submitting the MAXLABS contact inquiry form.",
};

export default function ContactThankYouPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-[var(--surface)] px-4 py-10">
      <div className="absolute right-4 top-4 sm:right-6 sm:top-6">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-xl rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 text-center shadow-sm">
        <CheckCircle2 className="mx-auto mb-4 size-10 text-[var(--primary)]" aria-hidden="true" />
        <h1 className="mb-3 font-display text-3xl font-bold text-[var(--foreground)]">Thank You</h1>
        <p className="mb-6 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
          Your inquiry has been submitted successfully. Our team will review your message and
          contact you as soon as possible.
        </p>
        <Link
          href="/"
          className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-[var(--primary)] px-6 text-sm font-semibold text-white transition-colors hover:bg-[var(--primary-hover)]"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
