"use client";

import { useActionState } from "react";
import { submitInquiryAction } from "@/features/inquiries/actions/submit-inquiry";
import { INQUIRY_SERVICE_OPTIONS, type InquiryFormState } from "@/features/inquiries/types";

const INITIAL_STATE: InquiryFormState = {};

const INPUT_CLASS =
  "h-11 w-full rounded-lg border border-[var(--border)] bg-[var(--input-bg)] px-3 text-sm text-[var(--foreground)] outline-none ring-0 transition placeholder:text-[var(--muted)] focus:border-[var(--primary)]";

const LABEL_CLASS = "mb-1.5 block text-sm font-medium text-[var(--foreground)]";

function fieldError(state: InquiryFormState, name: keyof NonNullable<InquiryFormState["fieldErrors"]>) {
  return state.fieldErrors?.[name]?.[0];
}

export function ContactInquiryForm() {
  const [state, formAction, isPending] = useActionState(submitInquiryAction, INITIAL_STATE);

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="full_name" className={LABEL_CLASS}>
            Full Name
          </label>
          <input id="full_name" name="full_name" type="text" required className={INPUT_CLASS} />
          {fieldError(state, "full_name") ? (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400">{fieldError(state, "full_name")}</p>
          ) : null}
        </div>
        <div>
          <label htmlFor="company_name" className={LABEL_CLASS}>
            Company Name (Optional)
          </label>
          <input id="company_name" name="company_name" type="text" className={INPUT_CLASS} />
          {fieldError(state, "company_name") ? (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400">{fieldError(state, "company_name")}</p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={LABEL_CLASS}>
            Email
          </label>
          <input id="email" name="email" type="email" required className={INPUT_CLASS} />
          {fieldError(state, "email") ? (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400">{fieldError(state, "email")}</p>
          ) : null}
        </div>
        <div>
          <label htmlFor="phone" className={LABEL_CLASS}>
            Phone
          </label>
          <input id="phone" name="phone" type="text" required className={INPUT_CLASS} />
          {fieldError(state, "phone") ? (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400">{fieldError(state, "phone")}</p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="service_interest" className={LABEL_CLASS}>
            Service Interest
          </label>
          <select
            id="service_interest"
            name="service_interest"
            required
            defaultValue=""
            className={INPUT_CLASS}
          >
            <option value="" disabled>
              Select one
            </option>
            {INQUIRY_SERVICE_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          {fieldError(state, "service_interest") ? (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400">
              {fieldError(state, "service_interest")}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="preferred_contact_time" className={LABEL_CLASS}>
            Preferred Contact Time
          </label>
          <select
            id="preferred_contact_time"
            name="preferred_contact_time"
            defaultValue=""
            className={INPUT_CLASS}
          >
            <option value="">No preference</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
            <option value="anytime">Anytime</option>
          </select>
          {fieldError(state, "preferred_contact_time") ? (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400">
              {fieldError(state, "preferred_contact_time")}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="message" className={LABEL_CLASS}>
          Message (Optional)
        </label>
        <textarea id="message" name="message" rows={6} className={`${INPUT_CLASS} h-auto py-2.5`} />
        {fieldError(state, "message") ? (
          <p className="mt-1 text-xs text-red-600 dark:text-red-400">{fieldError(state, "message")}</p>
        ) : null}
      </div>

      {state.status === "error" && state.error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
          {state.error}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex min-h-[48px] w-full items-center justify-center rounded-lg bg-[var(--primary)] px-5 text-sm font-semibold text-white transition-colors hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isPending ? "Submitting Inquiry..." : "Submit Inquiry"}
      </button>
    </form>
  );
}
