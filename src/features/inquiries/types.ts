import { z } from "zod";

/** Aligned with landing services section (`MAXLABS_SERVICES` in brand-knowledge). */
export const INQUIRY_SERVICE_OPTIONS = [
  { value: "landing_pages", label: "Website Landing Pages" },
  { value: "custom_web_app", label: "Custom Web Application Development" },
  { value: "mobile_apps", label: "Mobile Applications" },
  { value: "cloud_integration", label: "Cloud and Integration Services" },
  { value: "dashboards", label: "Dashboards and Reporting" },
  { value: "automation", label: "Workflow Automation" },
  { value: "crm_erp", label: "CRM/ERP and Internal Systems" },
  { value: "security_audits", label: "Security Audits" },
  { value: "digitalization", label: "Business Digitalization Consulting" },
  { value: "other", label: "Other" },
] as const;

export const inquiryServiceOptions = INQUIRY_SERVICE_OPTIONS.map((option) => option.value);

export const inquirySchema = z.object({
  full_name: z.string().min(2, "Full name must be at least 2 characters.").max(120),
  company_name: z.string().max(120).optional().or(z.literal("")),
  email: z.string().email("Please enter a valid email address."),
  phone: z
    .string()
    .min(7, "Phone number is required.")
    .max(20, "Phone number is too long.")
    .regex(/^[\d\s+\-()]+$/, "Please enter a valid phone number."),
  service_interest: z.enum(
    inquiryServiceOptions as [typeof inquiryServiceOptions[number], ...typeof inquiryServiceOptions[number][]],
    { message: "Please select a service interest." },
  ),
  preferred_contact_time: z.enum(["morning", "afternoon", "evening", "anytime", ""]).optional(),
  message: z.string().max(2000, "Message is too long (max 2000 characters).").optional().or(z.literal("")),
});

export type InquiryFormValues = z.infer<typeof inquirySchema>;

export type InquiryFormState = {
  status?: "error";
  error?: string;
  fieldErrors?: Partial<Record<keyof InquiryFormValues, string[]>>;
};
