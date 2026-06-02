import Image from "next/image";
import { HERO_BRAND } from "@/app/(public)/hero-brand-colors";
import {
  CONTACT_EMAIL,
  CONTACT_PHONES,
  TAX_CLASSIFICATION,
} from "@/lib/contact-info";

/** US standard business card — 3.5" × 2" (print-ready). */
export const BUSINESS_CARD_CLASS =
  "maxlabs-calling-card card h-[2in] w-[3.5in] min-h-[2in] max-h-[2in] min-w-[3.5in] max-w-[3.5in] shrink-0 border border-white/12 text-white shadow-2xl shadow-slate-950/40 bg-[#081224] bg-[radial-gradient(circle_at_bottom_left,#ffffff04_35%,transparent_36%),radial-gradient(circle_at_top_right,#ffffff04_35%,transparent_36%)] bg-size-[3.2em_3.2em]";

const CORE_SERVICES_LINE = "Web Apps · Automation · CRM/ERP · Cloud · Dashboards";

/**
 * Branded calling card — first child of daisyUI `hover-3d`.
 * @see https://daisyui.com/components/hover-3d/
 */
export function MaxlabsCallingCard() {
  return (
    <div className={BUSINESS_CARD_CLASS}>
      <div className="card-body relative grid h-full min-h-0 grid-rows-[auto_1fr] !gap-0 !p-[0.14in]">
        <div
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background: `linear-gradient(135deg, ${HERO_BRAND.baseFrom} 0%, ${HERO_BRAND.baseMid} 42%, ${HERO_BRAND.baseTo} 100%)`,
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-8 -top-8 size-20 rounded-full opacity-40 blur-2xl"
          style={{ background: `radial-gradient(circle, ${HERO_BRAND.sky}55, transparent 70%)` }}
          aria-hidden="true"
        />

        <header className="relative flex items-center gap-2.5 border-b border-white/10 pb-[0.1in]">
          <div className="relative size-8 shrink-0 overflow-hidden rounded-md bg-white/95 p-0.5 shadow-sm">
            <Image
              src="/brand/maxlabs-logo-mark.png"
              alt=""
              width={28}
              height={20}
              unoptimized
              className="size-full object-contain"
            />
          </div>
          <div className="min-w-0 leading-tight">
            <p className="font-display text-[11pt] font-bold tracking-tight">
              <span className="text-white">MAX</span>
              <span className="bg-gradient-to-r from-[#38bdf8] via-[#60a5fa] to-[#7928CA] bg-clip-text text-transparent">
                LABS
              </span>
            </p>
            <p className="text-[7pt] font-semibold uppercase tracking-[0.12em] text-slate-300">
              I.T. SOLUTIONS
            </p>
          </div>
        </header>

        <div className="relative grid min-h-0 flex-1 grid-cols-[1.15fr_0.85fr] gap-x-[0.12in] pt-[0.1in]">
          <div className="flex min-h-0 flex-col justify-between gap-[0.08in]">
            <p className="text-[7.5pt] font-medium leading-snug text-sky-100">
              We maximize SMEs with software that fits how you actually work.
            </p>
            <div>
              <p className="text-[6.5pt] font-semibold uppercase tracking-[0.1em] text-slate-400">
                Core capabilities
              </p>
              <p className="mt-[0.04in] text-[7pt] leading-snug text-slate-200">
                {CORE_SERVICES_LINE}
              </p>
            </div>
            <p className="text-[8pt] font-semibold leading-none text-sky-300">
              Let&apos;s build what matters.
            </p>
          </div>

          <div className="flex min-h-0 flex-col justify-between border-l border-white/10 pl-[0.1in] text-[7.5pt] leading-snug text-slate-200">
            <div className="space-y-[0.05in] tabular-nums">
              {CONTACT_PHONES.map((phone) => (
                <p key={phone} className="font-medium text-white/95">
                  {phone}
                </p>
              ))}
            </div>
            <div className="space-y-[0.04in]">
              <p className="break-all font-mono text-[6.5pt] leading-tight text-slate-300">
                {CONTACT_EMAIL}
              </p>
              <p className="text-[6pt] leading-tight text-slate-400">{TAX_CLASSIFICATION}</p>
            </div>
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-[#1d4ed8] via-[#38bdf8] to-[#7928CA]"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
