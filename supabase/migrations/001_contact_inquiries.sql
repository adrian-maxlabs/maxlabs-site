CREATE TYPE public.inquiry_service_interest AS ENUM (
  'digitalization',
  'automation',
  'custom_web_app',
  'crm_erp',
  'dashboards',
  'cloud_integration',
  'support',
  'other'
);

CREATE TABLE public.contact_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  full_name TEXT NOT NULL CHECK (char_length(full_name) BETWEEN 2 AND 120),
  company_name TEXT CHECK (company_name IS NULL OR char_length(company_name) <= 120),
  email TEXT NOT NULL CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  phone TEXT NOT NULL CHECK (char_length(phone) BETWEEN 7 AND 20),
  service_interest public.inquiry_service_interest NOT NULL,
  message TEXT CHECK (message IS NULL OR char_length(message) <= 2000),
  preferred_contact_time TEXT
);

ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_can_insert_contact_inquiries"
ON public.contact_inquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
