import nodemailer from "nodemailer";
import type { InquiryFormValues } from "@/features/inquiries/types";
import { getSmtpConfig } from "@/lib/email/config";
import {
  formatPreferredContactTime,
  formatServiceInterest,
} from "@/lib/email/inquiry-labels";

function buildInquiryEmailContent(inquiry: InquiryFormValues) {
  const company = inquiry.company_name?.trim() || "—";
  const message = inquiry.message?.trim() || "—";
  const service = formatServiceInterest(inquiry.service_interest);
  const contactTime = formatPreferredContactTime(inquiry.preferred_contact_time);

  const text = [
    "New consultation inquiry from the MAXLABS website",
    "",
    `Full name: ${inquiry.full_name}`,
    `Company: ${company}`,
    `Email: ${inquiry.email}`,
    `Phone: ${inquiry.phone}`,
    `Service interest: ${service}`,
    `Preferred contact time: ${contactTime}`,
    "",
    "Message:",
    message,
  ].join("\n");

  const html = `
    <h2>New consultation inquiry</h2>
    <p>A visitor submitted the contact form on the MAXLABS website.</p>
    <table cellpadding="6" cellspacing="0" style="border-collapse:collapse;">
      <tr><td><strong>Full name</strong></td><td>${escapeHtml(inquiry.full_name)}</td></tr>
      <tr><td><strong>Company</strong></td><td>${escapeHtml(company)}</td></tr>
      <tr><td><strong>Email</strong></td><td><a href="mailto:${escapeHtml(inquiry.email)}">${escapeHtml(inquiry.email)}</a></td></tr>
      <tr><td><strong>Phone</strong></td><td>${escapeHtml(inquiry.phone)}</td></tr>
      <tr><td><strong>Service interest</strong></td><td>${escapeHtml(service)}</td></tr>
      <tr><td><strong>Preferred contact time</strong></td><td>${escapeHtml(contactTime)}</td></tr>
    </table>
    <p><strong>Message</strong></p>
    <p style="white-space:pre-wrap;">${escapeHtml(message)}</p>
  `.trim();

  return { text, html };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function sendInquiryNotification(inquiry: InquiryFormValues): Promise<boolean> {
  const config = getSmtpConfig();
  if (!config) {
    console.warn("[email] SMTP is not configured. Inquiry saved without email notification.");
    return false;
  }

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
      subject: `New inquiry: ${inquiry.full_name} — ${formatServiceInterest(inquiry.service_interest)}`,
      text,
      html,
    });
    return true;
  } catch (error) {
    console.error("[email] Failed to send inquiry notification:", error);
    return false;
  }
}

export { buildInquiryEmailContent };
