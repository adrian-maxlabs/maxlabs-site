"use server";

import { redirect } from "next/navigation";
import { sendInquiryNotification } from "@/lib/email/send-inquiry-notification";
import { createClient } from "@/lib/supabase/server";
import { inquirySchema, type InquiryFormState } from "@/features/inquiries/types";

export async function submitInquiryAction(
  _prevState: InquiryFormState,
  formData: FormData,
): Promise<InquiryFormState> {
  const raw = {
    full_name: formData.get("full_name"),
    company_name: formData.get("company_name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    service_interest: formData.get("service_interest"),
    preferred_contact_time: formData.get("preferred_contact_time"),
    message: formData.get("message"),
  };

  const parsed = inquirySchema.safeParse(raw);
  if (!parsed.success) {
    return {
      status: "error",
      error: "Please fix the highlighted fields and submit again.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("contact_inquiries").insert({
    full_name: parsed.data.full_name,
    company_name: parsed.data.company_name || null,
    email: parsed.data.email,
    phone: parsed.data.phone,
    service_interest: parsed.data.service_interest,
    preferred_contact_time: parsed.data.preferred_contact_time || null,
    message: parsed.data.message || null,
  } as never);

  if (error) {
    return {
      status: "error",
      error: "We could not submit your inquiry at the moment. Please try again shortly.",
    };
  }

  await sendInquiryNotification(parsed.data);

  redirect("/contact/thank-you");
}
