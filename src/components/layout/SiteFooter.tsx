import Link from "next/link";
import { MaxlabsLogo } from "@/components/brand/MaxlabsLogo";
import { CONTACT_EMAIL, CONTACT_PHONES, TAX_CLASSIFICATION } from "@/lib/contact-info";

function ContactDetails() {
  return (
    <div className="space-y-1 text-sm text-[#cbd5e1]">
      <p>Phone:</p>
      <ul className="list-disc space-y-0.5 pl-5">
        {CONTACT_PHONES.map((phone) => (
          <li key={phone}>{phone}</li>
        ))}
      </ul>
      <p>Email: {CONTACT_EMAIL}</p>
      <p>Tax Classification: {TAX_CLASSIFICATION}</p>
    </div>
  );
}

const QUICK_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Projects", href: "/#projects" },
  { label: "Process", href: "/#process" },
  { label: "Contact", href: "/contact" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-[#1e293b] bg-[var(--footer)] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <MaxlabsLogo maxHeight={32} />
            <span className="text-sm font-semibold text-white">MAXLABS I.T. SOLUTIONS</span>
          </div>
          <p className="text-sm text-[#cbd5e1]">Digitalization. Automation. Scalable Growth.</p>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-[#cbd5e1]">
            {QUICK_LINKS.map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">
            Business Information
          </h3>
          <ContactDetails />
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-6xl border-t border-white/10 pt-4 text-center text-xs text-[#94a3b8]">
        © {new Date().getFullYear()} MAXLABS I.T. SOLUTIONS. All rights reserved.
      </div>
    </footer>
  );
}
