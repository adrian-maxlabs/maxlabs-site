export type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  from: string;
  to: string;
};

const DEFAULT_NOTIFICATION_EMAIL = "maxlabs.systems@gmail.com";

export function getSmtpConfig(): SmtpConfig | null {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS?.trim();

  if (!host || !user || !pass) {
    return null;
  }

  const port = Number(process.env.SMTP_PORT ?? "587");
  const to =
    process.env.INQUIRY_NOTIFICATION_EMAIL ??
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ??
    DEFAULT_NOTIFICATION_EMAIL;
  const from = process.env.SMTP_FROM ?? `"MAXLABS Inquiries" <${user}>`;

  return {
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    from,
    to,
  };
}
