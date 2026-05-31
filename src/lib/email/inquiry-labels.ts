import type { InquiryFormValues } from "@/features/inquiries/types";

const SERVICE_LABELS: Record<InquiryFormValues["service_interest"], string> = {
  digitalization: "Business Digitalization Consulting",
  automation: "Workflow Automation",
  custom_web_app: "Custom Web Application Development",
  crm_erp: "CRM / ERP Systems",
  dashboards: "Dashboards and Reporting",
  cloud_integration: "Cloud and Integration Services",
  support: "Support and Continuous Improvement",
  other: "Other",
};

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
