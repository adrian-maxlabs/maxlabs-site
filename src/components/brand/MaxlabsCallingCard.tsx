import Image from "next/image";
import { HERO_BRAND } from "@/app/(public)/hero-brand-colors";
import { MAXLABS_SERVICE_AREAS, MAXLABS_TAGLINE } from "@/lib/brand-messaging";
import {
  CONTACT_EMAILS,
  CONTACT_PHONES,
  TAX_CLASSIFICATION,
} from "@/lib/contact-info";

/** Fills daisyUI `hover-3d` first child; border applied via `.maxlabs-hover-3d > :first-child`. */
export const BUSINESS_CARD_CLASS =
  "maxlabs-calling-card card h-full w-full min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none";

/**
 * Footer calling card — scales up on screen, prints at 3.5″ × 2″.
 * @see https://daisyui.com/components/hover-3d/
 */
export function MaxlabsCallingCard() {
  return (
    <div className={BUSINESS_CARD_CLASS}>
      <div className="relative flex h-full min-h-0 flex-col overflow-hidden rounded-[0.85rem] p-[0.1in] pb-[0.12in]">
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            background: `linear-gradient(145deg, ${HERO_BRAND.baseFrom} 0%, ${HERO_BRAND.baseMid} 50%, ${HERO_BRAND.baseTo} 100%)`,
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_bottom_left,#ffffff06_35%,transparent_36%),radial-gradient(circle_at_top_right,#ffffff06_35%,transparent_36%)] bg-size-[2.8em_2.8em]"
          aria-hidden="true"
        />

        <header className="relative flex shrink-0 items-center justify-center gap-[0.06in] border-b border-white/10 pb-[0.06in]">
          <div className="relative size-[0.26in] shrink-0 overflow-hidden rounded bg-white/95 p-0.5 shadow-sm">
            <Image
              src="/brand/maxlabs-logo-mark.png"
              alt=""
              width={26}
              height={19}
              unoptimized
              className="size-full object-contain"
            />
          </div>
          <p className="font-display text-[10pt] font-bold leading-none tracking-tight whitespace-nowrap">
            <span className="text-white">MAX</span>
            <span className="bg-gradient-to-r from-[#38bdf8] to-[#7928CA] bg-clip-text text-transparent">
              LABS
            </span>
            <span className="text-[6.5pt] font-semibold uppercase tracking-[0.08em] text-slate-300">
              {" "}
              I.T SOLUTIONS
            </span>
          </p>
        </header>

        <p className="relative mt-[0.05in] shrink-0 border-y border-sky-400/25 bg-sky-950/30 py-[0.04in] text-center font-display text-[7pt] font-bold uppercase leading-[1.15] tracking-[0.03em] text-sky-200">
          {MAXLABS_TAGLINE}
        </p>

        <div className="relative mt-[0.05in] grid min-h-0 flex-1 grid-cols-[1.05fr_0.95fr] gap-[0.08in]">
          <div className="flex min-h-0 flex-col">
            <p className="text-[6.5pt] font-bold uppercase tracking-[0.1em] text-slate-400">
              Service areas
            </p>
            <ul className="mt-[0.03in] flex flex-1 flex-col justify-between gap-[0.02in] leading-[1.2]">
              {MAXLABS_SERVICE_AREAS.map((area) => (
                <li
                  key={area}
                  className="flex items-start gap-[0.05in] text-[7pt] text-slate-100"
                >
                  <span
                    className="mt-[0.03in] size-[0.05in] shrink-0 rounded-full bg-sky-400"
                    aria-hidden="true"
                  />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex min-h-0 flex-col justify-between rounded-sm border border-white/12 bg-black/20 px-[0.06in] py-[0.05in]">
            <div className="leading-[1.25]">
              <p className="text-[6.5pt] font-bold uppercase tracking-[0.1em] text-sky-400">
                Email
              </p>
              <ul className="mt-[0.04in] space-y-[0.035in] font-mono">
                {CONTACT_EMAILS.map((email, index) => (
                  <li
                    key={email}
                    className={
                      index === 0
                        ? "text-[8pt] font-semibold leading-[1.15] text-white"
                        : "text-[7.25pt] leading-[1.15] text-slate-100"
                    }
                  >
                    {email}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-[0.05in] border-t border-white/10 pt-[0.04in] leading-[1.25]">
              <p className="text-[6.5pt] font-bold uppercase tracking-[0.1em] text-slate-500">
                Phone
              </p>
              <p className="mt-[0.025in] text-[5.75pt] tabular-nums leading-[1.2] text-slate-300">
                {CONTACT_PHONES.join(" / ")}
              </p>
            </div>
          </div>
        </div>

        <p className="relative mt-[0.04in] shrink-0 whitespace-nowrap border-t border-white/10 pt-[0.035in] text-center text-[6.5pt] font-medium leading-none text-slate-300">
          {TAX_CLASSIFICATION}
        </p>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-[#1d4ed8] via-[#38bdf8] to-[#7928CA]"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
