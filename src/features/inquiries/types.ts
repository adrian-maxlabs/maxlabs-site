import { z } from "zod";

export const inquiryServiceOptions = [
  "digitalization",
  "automation",
  "custom_web_app",
  "crm_erp",
  "dashboards",
  "cloud_integration",
  "support",
  "other",
] as const;

export const inquirySchema = z.object({
  full_name: z.string().min(2, "Full name must be at least 2 characters.").max(120),
  company_name: z.string().max(120).optional().or(z.literal("")),
  email: z.string().email("Please enter a valid email address."),
  phone: z
    .string()
    .min(7, "Phone number is required.")
    .max(20, "Phone number is too long.")
    .regex(/^[\d\s+\-()]+$/, "Please enter a valid phone number."),
  service_interest: z.enum(inquiryServiceOptions, {
    message: "Please select a service interest.",
  }),
  preferred_contact_time: z.enum(["morning", "afternoon", "evening", "anytime", ""]).optional(),
  message: z.string().max(2000, "Message is too long (max 2000 characters).").optional().or(z.literal("")),
});

export type InquiryFormValues = z.infer<typeof inquirySchema>;

export type InquiryFormState = {
  status?: "error";
  error?: string;
  fieldErrors?: Partial<Record<keyof InquiryFormValues, string[]>>;
};
