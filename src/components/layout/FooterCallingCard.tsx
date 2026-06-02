import Link from "next/link";
import { MaxlabsCallingCard } from "@/components/brand/MaxlabsCallingCard";
import { CONTACT_EMAIL, CONTACT_PHONES, TAX_CLASSIFICATION } from "@/lib/contact-info";

/** daisyUI hover-3d wrapper — https://daisyui.com/components/hover-3d/ */
export function FooterCallingCard() {
  const contactSummary = `${CONTACT_PHONES.join(", ")}. Email: ${CONTACT_EMAIL}. ${TAX_CLASSIFICATION}.`;

  return (
    <div className="flex flex-col items-center md:items-end">
      <Link
        href="/contact"
        className="hover-3d mx-2 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--footer-accent)]"
        aria-label={`Contact MAXLABS. ${contactSummary}`}
      >
        <MaxlabsCallingCard />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </Link>
    </div>
  );
}
