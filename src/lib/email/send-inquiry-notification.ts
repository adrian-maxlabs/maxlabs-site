import type { InquiryFormValues } from "@/features/inquiries/types";
import { buildInquiryEmailContent, buildInquirySubject } from "@/lib/email/build-inquiry-email";
import { sendInquiryViaResend } from "@/lib/email/send-via-resend";
import { sendInquiryViaSmtp } from "@/lib/email/send-via-smtp";

export async function sendInquiryNotification(inquiry: InquiryFormValues): Promise<boolean> {
  const sentViaResend = await sendInquiryViaResend(inquiry);
  if (sentViaResend) return true;

  const sentViaSmtp = await sendInquiryViaSmtp(inquiry);
  if (sentViaSmtp) return true;

  console.warn(
    "[email] No email provider configured. Add RESEND_API_KEY or SMTP_PASS to .env.local (and Vercel env vars for production). Inquiry was saved to Supabase.",
  );
  return false;
}

export { buildInquiryEmailContent, buildInquirySubject };
