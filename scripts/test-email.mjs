import { config } from "dotenv";
import { resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = resolve(fileURLToPath(new URL(".", import.meta.url)), "..");
config({ path: join(rootDir, ".env.local") });

const hasResend = Boolean(process.env.RESEND_API_KEY);
const hasSmtp = Boolean(
  process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS,
);
const to =
  process.env.INQUIRY_NOTIFICATION_EMAIL ??
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ??
  "maxlabs.systems@gmail.com";

console.log("Email configuration check");
console.log("-------------------------");
console.log(`Notification recipient: ${to}`);
console.log(`Resend configured: ${hasResend ? "yes" : "no"}`);
console.log(`Gmail SMTP configured: ${hasSmtp ? "yes" : "no"}`);

if (!hasResend && !hasSmtp) {
  console.log("\nNo email provider is configured yet.");
  console.log("Choose one option:");
  console.log("  1. RESEND_API_KEY — sign up at https://resend.com with maxlabs.systems@gmail.com");
  console.log("  2. SMTP_PASS — Gmail App Password for maxlabs.systems@gmail.com");
  process.exit(1);
}

const subject = "[TEST] New inquiry: Email Test — Workflow Automation";
const text = [
  "This is a test inquiry notification from scripts/test-email.mjs",
  "",
  "If you received this, inquiry emails are configured correctly.",
].join("\n");
const html = "<p>This is a test inquiry notification from <code>scripts/test-email.mjs</code>.</p><p>If you received this, inquiry emails are configured correctly.</p>";

if (hasResend) {
  const from = process.env.RESEND_FROM ?? "MAXLABS Inquiries <onboarding@resend.dev>";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: "visitor@example.com",
      subject,
      text,
      html,
    }),
  });

  if (!response.ok) {
    console.error("\nResend test failed:", response.status, await response.text());
    process.exit(1);
  }

  console.log("\nResend test email sent successfully.");
  process.exit(0);
}

const nodemailer = (await import("nodemailer")).default;
const port = Number(process.env.SMTP_PORT ?? "587");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port,
  secure: port === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

await transporter.sendMail({
  from: process.env.SMTP_FROM ?? `"MAXLABS Inquiries" <${process.env.SMTP_USER}>`,
  to,
  replyTo: "visitor@example.com",
  subject,
  text,
  html,
});

console.log("\nGmail SMTP test email sent successfully.");
