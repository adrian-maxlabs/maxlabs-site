const DEFAULT_PHONES = ["+63 961-456-7024", "+63 916-199-2946"] as const;

const DEFAULT_EMAIL = "maxlabs.systems@gmail.com";

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

export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? DEFAULT_EMAIL;

export const CONTACT_PHONES = resolvePhones();

export const TAX_CLASSIFICATION = "Non-VAT Registered";

export function phoneToTelHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
