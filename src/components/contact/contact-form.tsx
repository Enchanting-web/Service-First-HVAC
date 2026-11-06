"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button, ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { site } from "@/content/site";
import { localDate, requestTimes, serviceTypes } from "@/lib/service-request";

const inputStyle = "mt-2 w-full rounded-lg border border-hairline-strong bg-ink px-3 py-3 text-white outline-none focus:border-flame-500 focus:ring-2 focus:ring-flame-500/30 disabled:opacity-50";

export function ContactForm() {
  const [available, setAvailable] = useState<boolean | null>(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [today] = useState(() => localDate());
  const requestId = useRef("");
  const lastSubmission = useRef("");
  const feedback = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/appointments", { cache: "no-store", signal: controller.signal })
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((data) => setAvailable(data.available === true))
      .catch(() => { if (!controller.signal.aborted) setAvailable(false); });
    return () => controller.abort();
  }, []);

  useEffect(() => { if (success || error) feedback.current?.focus(); }, [success, error]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending || !available) return;
    const data = new FormData(event.currentTarget);
    const fields = Object.fromEntries(data.entries());
    const fingerprint = JSON.stringify(fields);
    if (lastSubmission.current !== fingerprint) {
      requestId.current = crypto.randomUUID();
      lastSubmission.current = fingerprint;
    }
    setSending(true);
    setError("");
    try {
      const response = await fetch("/api/appointments", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, acknowledge: data.has("acknowledge"), requestId: requestId.current }),
        signal: AbortSignal.timeout(45000),
      });
      const result = await response.json();
      if (!response.ok || result.status !== "pending" || !result.id) throw new Error(result.error || "Your request could not be verified. Please try again or call us.");
      setSuccess(result.message);
    } catch (cause) {
      setError(cause instanceof Error && cause.name !== "TimeoutError" ? cause.message : "We couldn't verify that your request was saved. Retry with the same details or call our team.");
    } finally { setSending(false); }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-hairline bg-surface shadow-card">
      <div className="border-b border-hairline p-6 sm:p-8">
        <p className="eyebrow">Your comfort starts here</p>
        <h3 className="mt-2 text-2xl">Tell us what you need.</h3>
        <ol className="mt-6 grid gap-4 text-sm text-body sm:grid-cols-3">
          {["Tell us about your system", "Request a preferred time", "Our team confirms your visit"].map((step, index) => (
            <li key={step} className="flex items-start gap-2.5">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-flame-700/20 text-xs font-bold text-flame-500">{index + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>
      {success ? (
        <div ref={feedback} tabIndex={-1} role="status" className="p-6 outline-none sm:p-8">
          <Icon name="circle-check" className="size-10 text-flame-500" />
          <h3 className="mt-4 text-xl">Request received — pending approval</h3>
          <p className="mt-3 leading-relaxed text-body">{success}</p>
          <p className="mt-3 text-sm text-muted">Your preferred time is not reserved. Please wait for our team to confirm before making arrangements.</p>
        </div>
      ) : (
        <form onSubmit={submit} className="p-6 sm:p-8">
          {available === false && (
            <p role="status" className="mb-6 rounded-lg border border-hairline-strong bg-ink p-4 text-sm text-body">
              Online requests are temporarily unavailable. Call <a className="font-semibold text-flame-500 underline" href={site.phone.href}>{site.phone.display}</a> to request service.
            </p>
          )}
          <fieldset disabled={sending || available !== true} className="grid gap-5 sm:grid-cols-2">
            <legend className="sr-only">Service request details</legend>
            <label className="text-sm font-medium text-body">Full name<input className={inputStyle} name="name" autoComplete="name" minLength={2} maxLength={120} required /></label>
            <label className="text-sm font-medium text-body">Phone number<input className={inputStyle} name="phone" type="tel" autoComplete="tel" minLength={10} maxLength={30} required /></label>
            <label className="text-sm font-medium text-body sm:col-span-2">Email address<input className={inputStyle} name="email" type="email" autoComplete="email" maxLength={254} required /></label>
            <label className="text-sm font-medium text-body sm:col-span-2">Service address, city, state, and ZIP<input className={inputStyle} name="address" autoComplete="street-address" minLength={8} maxLength={300} required /></label>
            <label className="text-sm font-medium text-body sm:col-span-2">Service needed<select name="serviceType" className={inputStyle} defaultValue="" required><option value="" disabled>Select a service</option>{serviceTypes.map((type) => <option key={type}>{type}</option>)}</select></label>
            <label className="text-sm font-medium text-body">Preferred date<input name="date" type="date" min={today} className={inputStyle} required aria-describedby="request-timing" /></label>
            <label className="text-sm font-medium text-body">Preferred start time<select name="time" className={inputStyle} defaultValue="" required aria-describedby="request-timing"><option value="" disabled>Select a time</option>{requestTimes.map((time) => <option key={time} value={time}>{Number(time.slice(0, 2)) % 12 || 12}:00 {Number(time.slice(0, 2)) < 12 ? "AM" : "PM"}</option>)}</select></label>
            <p id="request-timing" className="-mt-2 text-xs leading-relaxed text-muted sm:col-span-2">Monday–Friday, 8 AM–5 PM Eastern. Choose a preferred start time within the next 90 days. Times shown are preferences, subject to team approval. Visit length depends on the service.</p>
            <label className="text-sm font-medium text-body sm:col-span-2">Tell us about your system <span className="text-muted">(optional)</span><textarea name="message" rows={4} maxLength={2000} className={inputStyle} placeholder="What needs attention? Include equipment details or access instructions if helpful." /></label>
            <div hidden aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
            <label className="flex items-start gap-3 text-sm leading-relaxed text-body sm:col-span-2"><input name="acknowledge" type="checkbox" required className="mt-1 size-4 shrink-0 accent-orange-600" />I understand this is a request. My appointment is not confirmed until Service First contacts me.</label>
            <Button type="submit" className="w-full sm:col-span-2">{sending ? "Sending your request…" : available === null ? "Checking online requests…" : "Request Service"}<Icon name="arrow-right" className="size-4" /></Button>
          </fieldset>
          {error && <div ref={feedback} tabIndex={-1} role="alert" className="mt-5 rounded-lg border border-red-500/50 p-4 text-sm text-red-300 outline-none">{error}</div>}
          <p className="mt-4 text-xs leading-relaxed text-muted">We use these details to handle your service request. <a href="/privacy-policy" className="underline">Privacy policy</a>. Northern Kentucky requests require service-area confirmation.</p>
        </form>
      )}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-hairline bg-ink px-6 py-5 sm:px-8">
        <p className="max-w-sm text-sm text-body"><strong className="text-white">Need emergency service?</strong> Call us directly, including after hours.</p>
        <ButtonLink href={site.phone.href} variant="outline"><Icon name="phone" className="size-4" />{site.phone.display}</ButtonLink>
      </div>
    </div>
  );
}
