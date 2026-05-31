import nodemailer from "nodemailer";
import type { InquiryFormValues } from "@/features/inquiries/types";
import { buildInquiryEmailContent, buildInquirySubject } from "@/lib/email/build-inquiry-email";
import { getSmtpConfig } from "@/lib/email/config";

export async function sendInquiryViaSmtp(inquiry: InquiryFormValues): Promise<boolean> {
  const config = getSmtpConfig();
  if (!config) return false;

  const { text, html } = buildInquiryEmailContent(inquiry);
  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: config.auth,
  });

  try {
    await transporter.sendMail({
      from: config.from,
      to: config.to,
      replyTo: inquiry.email,
      subject: buildInquirySubject(inquiry),
      text,
      html,
    });
    return true;
  } catch (error) {
    const code = error && typeof error === "object" && "code" in error ? error.code : null;
    if (code === "EAUTH") {
      console.error(
        "[email] Gmail rejected SMTP credentials. Use a Google App Password (not your regular Gmail password). See README.md → Inquiry Email Notifications.",
      );
    } else {
      console.error("[email] Failed to send inquiry via SMTP:", error);
    }
    return false;
  }
}
