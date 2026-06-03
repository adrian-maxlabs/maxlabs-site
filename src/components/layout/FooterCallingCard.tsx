import Link from "next/link";
import { MaxlabsCallingCard } from "@/components/brand/MaxlabsCallingCard";
import { MAXLABS_TAGLINE } from "@/lib/brand-messaging";
import {
  CONTACT_EMAILS,
  CONTACT_PHONES,
  TAX_CLASSIFICATION,
} from "@/lib/contact-info";

/** daisyUI hover-3d — https://daisyui.com/components/hover-3d/ */
export function FooterCallingCard() {
  const contactSummary = [
    MAXLABS_TAGLINE,
    `Email: ${CONTACT_EMAILS.join(", ")}`,
    `Phone: ${CONTACT_PHONES.join(", ")}`,
    TAX_CLASSIFICATION,
  ].join(". ");

  return (
    <div className="flex w-full min-w-0 flex-col items-center p-2 pb-[5.5rem] sm:pb-24 md:mr-[5rem] md:items-end">
      <Link
        href="/contact"
        className="hover-3d maxlabs-hover-3d w-full min-w-0 max-w-full cursor-pointer rounded-[0.85rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--footer-accent)]"
        aria-label={`Contact MAXLABS. ${contactSummary}`}
      >
        <MaxlabsCallingCard />
        <div aria-hidden="true" />
        <div aria-hidden="true" />
        <div aria-hidden="true" />
        <div aria-hidden="true" />
        <div aria-hidden="true" />
        <div aria-hidden="true" />
        <div aria-hidden="true" />
        <div aria-hidden="true" />
      </Link>
    </div>
  );
}
