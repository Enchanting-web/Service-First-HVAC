"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { newsletter } from "@/content/home";

/**
 * Newsletter capture. Signups post to the same handler as the contact form so
 * there is a single place to wire up an email provider later.
 */
export function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ intent: "newsletter", email }),
      });
      if (!response.ok) throw new Error("Request failed");
      setState("done");
      setEmail("");
    } catch {
      setState("error");
    }
  }

  return (
    <section className="border-t border-hairline bg-ink">
      <div className="container-page flex flex-col items-center gap-6 py-9 lg:flex-row lg:justify-between lg:py-10">
        <div className="flex items-center gap-4">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-hairline-strong">
            <Icon name="mail" className="size-6 text-white" />
          </span>
          <div>
            <h2 className="text-xl font-bold text-white">{newsletter.heading}</h2>
            <p className="mt-1 max-w-md text-sm text-muted">{newsletter.body}</p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="w-full max-w-md lg:w-auto">
          <div className="flex items-center gap-2 rounded-xl border border-hairline bg-surface p-1.5">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={newsletter.placeholder}
              className="h-10 min-w-0 flex-1 bg-transparent px-3 text-[0.95rem] text-white placeholder:text-faint focus:outline-none lg:w-64"
            />
            <Button type="submit" disabled={state === "sending"} className="shrink-0">
              {state === "sending" ? "Sending…" : newsletter.cta}
            </Button>
          </div>
          <p aria-live="polite" className="mt-2 min-h-5 px-1 text-sm">
            {state === "done" && <span className="text-flame-500">You&apos;re subscribed.</span>}
            {state === "error" && (
              <span className="text-flame-500">Something went wrong — please try again.</span>
            )}
          </p>
        </form>
      </div>
    </section>
  );
}
