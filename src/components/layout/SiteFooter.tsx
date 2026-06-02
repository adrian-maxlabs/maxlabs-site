import Link from "next/link";
import { MaxlabsLogo } from "@/components/brand/MaxlabsLogo";
import { MAXLABS_TAGLINE } from "@/lib/brand-messaging";
import { FooterCallingCard } from "./FooterCallingCard";
import { FooterSocialIcons } from "./footer-social-icons";

const QUICK_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Projects", href: "/#projects" },
  { label: "Process", href: "/#process" },
  { label: "Contact", href: "/contact" },
] as const;

export function SiteFooter() {
  return (
    <footer className="relative border-t border-[var(--footer-border)] bg-[var(--footer)] px-4 py-10 sm:px-6 sm:py-12 lg:px-10">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--footer-accent)]/35 to-transparent"
        aria-hidden="true"
      />

      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3 md:items-start md:gap-8 lg:gap-10">
        <div className="space-y-5">
          <div>
            <div className="mb-3 flex items-center gap-2.5">
              <MaxlabsLogo maxHeight={36} />
              <span className="font-display text-sm font-bold tracking-tight text-[var(--footer-foreground)] sm:text-base">
                MAXLABS I.T. SOLUTIONS
              </span>
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--footer-accent-soft)]">
              {MAXLABS_TAGLINE}
            </p>
          </div>

          <p className="max-w-sm text-sm leading-relaxed text-[var(--footer-muted)]">
            Philippine-based technology partner for small and medium businesses and growth-stage
            teams. We build
            practical software—digitalization, automation, and scalable systems—that reduce
            manual overhead and improve decision speed.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--footer-foreground)]">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-[var(--footer-muted)]">
            {QUICK_LINKS.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="transition-colors hover:text-[var(--footer-accent-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--footer-accent)]"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <FooterCallingCard />
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center gap-4 border-t border-[var(--footer-divider)] pt-5 text-xs text-[var(--footer-subtle)] sm:flex-row sm:items-center sm:justify-between">
        <p className="text-center sm:text-left">
          © {new Date().getFullYear()} MAXLABS I.T. SOLUTIONS. All rights reserved.
        </p>
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--footer-foreground)]">
            Follow Us
          </span>
          <FooterSocialIcons />
        </div>
      </div>
    </footer>
  );
}
