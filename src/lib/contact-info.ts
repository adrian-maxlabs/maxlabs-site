const DEFAULT_PHONES = ["+63 961-456-7024", "+63 916-199-2946"] as const;

const DEFAULT_EMAILS = [
  "maxlabs.systems@gmail.com",
  "adrian.maxlabs@gmail.com",
  "menard.maxlabs@gmail.com",
] as const;

function resolvePhones(): readonly string[] {
  const phonesEnv = process.env.NEXT_PUBLIC_CONTACT_PHONES;
  if (phonesEnv) {
    return phonesEnv
      .split(",")
      .map((phone) => phone.trim())
      .filter(Boolean);
  }

  const singlePhone = process.env.NEXT_PUBLIC_CONTACT_PHONE;
  if (singlePhone) {
    return [singlePhone];
  }

  return DEFAULT_PHONES;
}

function resolveEmails(): readonly string[] {
  const emailsEnv = process.env.NEXT_PUBLIC_CONTACT_EMAILS;
  if (emailsEnv) {
    return emailsEnv
      .split(",")
      .map((email) => email.trim())
      .filter(Boolean);
  }

  const singleEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  if (singleEmail) {
    const merged = [singleEmail, ...DEFAULT_EMAILS.filter((e) => e !== singleEmail)];
    return merged;
  }

  return DEFAULT_EMAILS;
}

export const CONTACT_EMAILS = resolveEmails();

/** Primary inbox — first entry in {@link CONTACT_EMAILS}. */
export const CONTACT_EMAIL = CONTACT_EMAILS[0] ?? DEFAULT_EMAILS[0];

export const CONTACT_PHONES = resolvePhones();

export const TAX_CLASSIFICATION = "Non-VAT Registered";

export function phoneToTelHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
