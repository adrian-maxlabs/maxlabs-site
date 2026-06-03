import { INQUIRY_SERVICE_OPTIONS } from "@/features/inquiries/types";
import type { InquiryFormValues } from "@/features/inquiries/types";

const SERVICE_LABELS = Object.fromEntries(
  INQUIRY_SERVICE_OPTIONS.map(({ value, label }) => [value, label]),
) as Record<InquiryFormValues["service_interest"], string>;

const CONTACT_TIME_LABELS: Record<
  NonNullable<InquiryFormValues["preferred_contact_time"]>,
  string
> = {
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening",
  anytime: "Anytime",
  "": "No preference",
};

export function formatServiceInterest(value: InquiryFormValues["service_interest"]): string {
  return SERVICE_LABELS[value];
}

export function formatPreferredContactTime(
  value: InquiryFormValues["preferred_contact_time"],
): string {
  if (!value) return CONTACT_TIME_LABELS[""];
  return CONTACT_TIME_LABELS[value];
}
