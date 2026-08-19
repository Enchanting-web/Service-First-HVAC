"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { form } from "@/content/contact";
import { site } from "@/content/site";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "error"; message: string; fields?: Record<string, string> }
  | { kind: "done"; message: string };

const EMPTY = {
  name: "",
  email: "",
  phone: "",
  address: "",
  serviceType: "",
  timing: "",
  message: "",
};

/**
 * Service request form. The Smart Assistant prefills it by dispatching a
 * `servicefirst:prefill` event, which keeps the two components decoupled.
 */
export function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  useEffect(() => {
    function onPrefill(event: Event) {
      const detail = (event as CustomEvent<Partial<typeof EMPTY>>).detail;
      setValues((current) => ({ ...current, ...detail }));
    }
    window.addEventListener("servicefirst:prefill", onPrefill);
    return () => window.removeEventListener("servicefirst:prefill", onPrefill);
  }, []);

  function update<K extends keyof typeof EMPTY>(field: K, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ kind: "sending" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ intent: "service", ...values }),
      });
      const data = (await response.json()) as {
        ok: boolean;
        message?: string;
        error?: string;
        fieldErrors?: Record<string, string>;
      };

      if (!response.ok || !data.ok) {
        setStatus({
          kind: "error",
          message: data.error ?? "Something went wrong. Please call us instead.",
          fields: data.fieldErrors,
        });
        return;
      }

      setStatus({ kind: "done", message: data.message ?? "Request received." });
      setValues(EMPTY);
    } catch {
      setStatus({
        kind: "error",
        message: "We couldn't reach the server. Please call us and we'll get you booked.",
      });
    }
  }

  if (status.kind === "done") {
    return (
      <div className="rounded-2xl border border-flame-700/50 bg-surface p-8 text-center">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-flame-700 text-white">
          <Icon name="check" className="size-7" strokeWidth={2.5} />
        </span>
        <h3 className="mt-5 text-[1.25rem]">Thanks — we&apos;ve got it.</h3>
        <p className="mt-2 leading-relaxed text-body">{status.message}</p>
        <p className="mt-5 text-sm text-muted">
          Need us sooner?{" "}
          <a href={site.phone.href} className="font-semibold text-flame-500">
            Call {site.phone.display}
          </a>
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setStatus({ kind: "idle" })}
          type="button"
        >
          Submit another request
        </Button>
      </div>
    );
  }

  const fieldError = (field: string) =>
    status.kind === "error" ? status.fields?.[field] : undefined;

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-hairline bg-surface p-6 sm:p-8"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" error={fieldError("name")}>
          <input
            required
            autoComplete="name"
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            className={inputClass}
            placeholder="Jane Doe"
          />
        </Field>

        <Field label="Phone" error={fieldError("phone")}>
          <input
            required
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(event) => update("phone", event.target.value)}
            className={inputClass}
            placeholder="(513) 555-0134"
          />
        </Field>

        <Field label="Email" error={fieldError("email")}>
          <input
            required
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            className={inputClass}
            placeholder="you@example.com"
          />
        </Field>

        <Field label="Service address" hint="Optional" error={fieldError("address")}>
          <input
            autoComplete="street-address"
            value={values.address}
            onChange={(event) => update("address", event.target.value)}
            className={inputClass}
            placeholder="123 Main St, Monroe OH"
          />
        </Field>

        <Field label="What do you need?" error={fieldError("serviceType")}>
          <select
            required
            value={values.serviceType}
            onChange={(event) => update("serviceType", event.target.value)}
            className={inputClass}
          >
            <option value="">Choose a service…</option>
            {form.serviceTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>

        <Field label="How soon?" error={fieldError("timing")}>
          <select
            required
            value={values.timing}
            onChange={(event) => update("timing", event.target.value)}
            className={inputClass}
          >
            <option value="">Choose a timeframe…</option>
            {form.timings.map((timing) => (
              <option key={timing} value={timing}>
                {timing}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Tell us what's happening" hint="Optional" error={fieldError("message")}>
          <textarea
            rows={4}
            value={values.message}
            onChange={(event) => update("message", event.target.value)}
            className={`${inputClass} resize-y`}
            placeholder="Upstairs isn't cooling, outdoor unit is running but the air is warm…"
          />
        </Field>
      </div>

      {status.kind === "error" && (
        <p role="alert" className="mt-5 rounded-lg border border-flame-700/50 bg-flame-700/10 px-4 py-3 text-sm text-flame-400">
          {status.message}
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={status.kind === "sending"}>
          <Icon name="send" className="size-[18px]" />
          {status.kind === "sending" ? "Sending…" : "Request Service"}
        </Button>
        <p className="text-sm text-muted">
          Or call{" "}
          <a href={site.phone.href} className="font-semibold text-flame-500">
            {site.phone.display}
          </a>{" "}
          — {site.hours.toLowerCase()}
        </p>
      </div>
    </form>
  );
}

const inputClass =
  "w-full rounded-lg border border-hairline-strong bg-ink px-3.5 py-2.5 text-[0.95rem] text-white placeholder:text-faint focus:border-flame-600 focus:outline-none";

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-2">
        <span className="text-sm font-semibold text-white">{label}</span>
        {hint && <span className="text-xs text-faint">{hint}</span>}
      </span>
      <span className="mt-1.5 block">{children}</span>
      {error && <span className="mt-1.5 block text-sm text-flame-400">{error}</span>}
    </label>
  );
}
