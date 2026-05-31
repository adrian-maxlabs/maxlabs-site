"use client";

import { useActionState } from "react";
import { submitInquiryAction } from "@/features/inquiries/actions/submit-inquiry";
import type { InquiryFormState } from "@/features/inquiries/types";

const INITIAL_STATE: InquiryFormState = {};

function fieldError(state: InquiryFormState, name: keyof NonNullable<InquiryFormState["fieldErrors"]>) {
  return state.fieldErrors?.[name]?.[0];
}

export function ContactInquiryForm() {
  const [state, formAction, isPending] = useActionState(submitInquiryAction, INITIAL_STATE);

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="full_name" className="mb-1.5 block text-sm font-medium text-[#0f172a]">
            Full Name
          </label>
          <input
            id="full_name"
            name="full_name"
            type="text"
            required
            className="h-11 w-full rounded-lg border border-[#e2e8f0] px-3 text-sm outline-none ring-0 transition focus:border-[#1d4ed8]"
          />
          {fieldError(state, "full_name") ? (
            <p className="mt-1 text-xs text-red-600">{fieldError(state, "full_name")}</p>
          ) : null}
        </div>
        <div>
          <label htmlFor="company_name" className="mb-1.5 block text-sm font-medium text-[#0f172a]">
            Company Name (Optional)
          </label>
          <input
            id="company_name"
            name="company_name"
            type="text"
            className="h-11 w-full rounded-lg border border-[#e2e8f0] px-3 text-sm outline-none ring-0 transition focus:border-[#1d4ed8]"
          />
          {fieldError(state, "company_name") ? (
            <p className="mt-1 text-xs text-red-600">{fieldError(state, "company_name")}</p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[#0f172a]">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="h-11 w-full rounded-lg border border-[#e2e8f0] px-3 text-sm outline-none ring-0 transition focus:border-[#1d4ed8]"
          />
          {fieldError(state, "email") ? (
            <p className="mt-1 text-xs text-red-600">{fieldError(state, "email")}</p>
          ) : null}
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-[#0f172a]">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="text"
            required
            className="h-11 w-full rounded-lg border border-[#e2e8f0] px-3 text-sm outline-none ring-0 transition focus:border-[#1d4ed8]"
          />
          {fieldError(state, "phone") ? (
            <p className="mt-1 text-xs text-red-600">{fieldError(state, "phone")}</p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="service_interest" className="mb-1.5 block text-sm font-medium text-[#0f172a]">
            Service Interest
          </label>
          <select
            id="service_interest"
            name="service_interest"
            required
            defaultValue=""
            className="h-11 w-full rounded-lg border border-[#e2e8f0] bg-white px-3 text-sm outline-none ring-0 transition focus:border-[#1d4ed8]"
          >
            <option value="" disabled>
              Select one
            </option>
            <option value="digitalization">Business Digitalization Consulting</option>
            <option value="automation">Workflow Automation</option>
            <option value="custom_web_app">Custom Web Application Development</option>
            <option value="crm_erp">CRM / ERP Systems</option>
            <option value="dashboards">Dashboards and Reporting</option>
            <option value="cloud_integration">Cloud and Integration Services</option>
            <option value="support">Support and Continuous Improvement</option>
            <option value="other">Other</option>
          </select>
          {fieldError(state, "service_interest") ? (
            <p className="mt-1 text-xs text-red-600">{fieldError(state, "service_interest")}</p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="preferred_contact_time"
            className="mb-1.5 block text-sm font-medium text-[#0f172a]"
          >
            Preferred Contact Time
          </label>
          <select
            id="preferred_contact_time"
            name="preferred_contact_time"
            defaultValue=""
            className="h-11 w-full rounded-lg border border-[#e2e8f0] bg-white px-3 text-sm outline-none ring-0 transition focus:border-[#1d4ed8]"
          >
            <option value="">No preference</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
            <option value="anytime">Anytime</option>
          </select>
          {fieldError(state, "preferred_contact_time") ? (
            <p className="mt-1 text-xs text-red-600">
              {fieldError(state, "preferred_contact_time")}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-[#0f172a]">
          Message (Optional)
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          className="w-full rounded-lg border border-[#e2e8f0] px-3 py-2.5 text-sm outline-none ring-0 transition focus:border-[#1d4ed8]"
        />
        {fieldError(state, "message") ? (
          <p className="mt-1 text-xs text-red-600">{fieldError(state, "message")}</p>
        ) : null}
      </div>

      {state.status === "error" && state.error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex min-h-[48px] w-full items-center justify-center rounded-lg bg-[#1d4ed8] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#1e40af] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isPending ? "Submitting Inquiry..." : "Submit Inquiry"}
      </button>
    </form>
  );
}
