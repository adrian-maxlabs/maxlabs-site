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

1. Create a new Supabase project for MAXLABS.
2. Add runtime values:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Add migration script values:
   - `SUPABASE_PROJECT_REF`
   - `SUPABASE_ACCESS_TOKEN`
4. Apply schema migration:

```bash
npm run migrate
```

This creates `public.contact_inquiries` and its RLS insert policy for public submissions.

## Scripts

- `npm run dev` – local development
- `npm run build` – production build
- `npm run start` – run production server
- `npm run lint` – ESLint
- `npm run test` – Vitest
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
