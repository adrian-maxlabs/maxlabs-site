# MAXLABS Company Portfolio

Production-ready marketing site and inquiry flow for **MAXLABS I.T. SOLUTIONS**.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS 4 + daisyUI + tw-animate-css
- Supabase (`@supabase/ssr`, `@supabase/supabase-js`)
- Zod validation for server actions

## Project Structure

```text
src/app/(public)/              # Landing and contact pages
src/features/inquiries/        # Contact form schema, action, UI
src/lib/supabase/              # Supabase server/browser clients
supabase/migrations/           # SQL migrations
```

## Local Development

1. Copy env template:

```bash
cp .env.local.example .env.local
```

2. Fill all required environment variables in `.env.local`.

3. Install dependencies and run dev server:

```bash
npm install
npm run dev
```

## Supabase Setup

Connected project: **maxlabs-site** (`fuakhjulyymydgrcbfii`, `ap-southeast-1`). This is separate from other apps (e.g. De Gala uses a different project ref).

1. Copy `.env.local.example` → `.env.local` and set:
   - `NEXT_PUBLIC_SUPABASE_URL` — `https://fuakhjulyymydgrcbfii.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` — anon key from [Supabase dashboard](https://supabase.com/dashboard/project/fuakhjulyymydgrcbfii/settings/api)
   - `SUPABASE_PROJECT_REF` — `fuakhjulyymydgrcbfii`
   - `SUPABASE_ACCESS_TOKEN` — personal token from [Account tokens](https://supabase.com/dashboard/account/tokens)
2. Apply schema (only targets `SUPABASE_PROJECT_REF`):

```bash
npm run migrate
```

This creates `public.contact_inquiries`, RLS insert policy, and table grants for `anon` / `authenticated`.

## Inquiry Email Notifications

Submissions are stored in Supabase and emailed to `maxlabs.systems@gmail.com` when an email provider is configured.

### Option A: Resend (recommended)

1. Sign up at [resend.com](https://resend.com) using `maxlabs.systems@gmail.com`.
2. Create an API key.
3. Add to `.env.local` and Vercel project env vars:

```bash
RESEND_API_KEY=re_...
RESEND_FROM="MAXLABS Inquiries <onboarding@resend.dev>"
INQUIRY_NOTIFICATION_EMAIL=maxlabs.systems@gmail.com
```

4. Verify with:

```bash
npm run test:email
```

### Option B: Gmail SMTP (Nodemailer)

1. Sign in to the `maxlabs.systems@gmail.com` Google account.
2. Enable 2-Step Verification on the account.
3. Create an **App Password** (Google Account → Security → App passwords).
4. Add these to `.env.local` (and Vercel project env vars for production):

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=maxlabs.systems@gmail.com
SMTP_PASS=<16-character-app-password>
SMTP_FROM="MAXLABS Inquiries" <maxlabs.systems@gmail.com>
INQUIRY_NOTIFICATION_EMAIL=maxlabs.systems@gmail.com
```

Each notification sets `Reply-To` to the visitor's email so you can respond directly from Gmail.

## Scripts

- `npm run dev` – local development
- `npm run build` – production build
- `npm run start` – run production server
- `npm run lint` – ESLint
- `npm run test` – Vitest
- `npm run test:email` – send a test inquiry notification email
- `npm run migrate` – apply SQL files from `supabase/migrations`

## Deployment (Vercel)

1. Import this repository/project in Vercel.
2. Add all required environment variables from `.env.local`.
3. Run migrations before production launch (`npm run migrate`).
4. Deploy and verify:
   - `/` loads landing sections
   - `/contact` submits successfully
   - `/contact/thank-you` displays after submission
# maxlabs-site
