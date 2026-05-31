import Link from "next/link";
import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Inquiry Received | MAXLABS I.T. SOLUTIONS",
  description: "Thank-you page after submitting the MAXLABS contact inquiry form.",
};

export default function ContactThankYouPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8fafc] px-4 py-10">
      <div className="w-full max-w-xl rounded-2xl border border-[#e2e8f0] bg-white p-8 text-center shadow-sm">
        <CheckCircle2 className="mx-auto mb-4 size-10 text-[#1d4ed8]" aria-hidden="true" />
        <h1
          className="mb-3 font-display text-3xl font-bold text-[#0f172a]"
        >
          Thank You
        </h1>
        <p className="mb-6 text-sm leading-relaxed text-[#64748b] sm:text-base">
          Your inquiry has been submitted successfully. Our team will review your message and
          contact you as soon as possible.
        </p>
        <Link
          href="/"
          className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-[#1d4ed8] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#1e40af]"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
