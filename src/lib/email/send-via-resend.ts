import type { InquiryFormValues } from "@/features/inquiries/types";
import {
  buildInquiryEmailContent,
  buildInquirySubject,
} from "@/lib/email/build-inquiry-email";

const DEFAULT_NOTIFICATION_EMAIL = "maxlabs.systems@gmail.com";
const DEFAULT_FROM = "MAXLABS Inquiries <onboarding@resend.dev>";

export function getResendConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;

  const to =
    process.env.INQUIRY_NOTIFICATION_EMAIL ??
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ??
    DEFAULT_NOTIFICATION_EMAIL;
  const from = process.env.RESEND_FROM ?? DEFAULT_FROM;

  return { apiKey, to, from };
}

export async function sendInquiryViaResend(inquiry: InquiryFormValues): Promise<boolean> {
  const config = getResendConfig();
  if (!config) return false;

  const { text, html } = buildInquiryEmailContent(inquiry);

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: config.from,
        to: [config.to],
        reply_to: inquiry.email,
        subject: buildInquirySubject(inquiry),
        text,
        html,
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      console.error("[email] Resend API error:", response.status, body);
      return false;
    }

    return true;
  } catch (error) {
    console.error("[email] Failed to send inquiry via Resend:", error);
    return false;
  }
}
