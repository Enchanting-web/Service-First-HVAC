"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { assistant, symptoms, type Symptom } from "@/content/contact";
import { site } from "@/content/site";

/**
 * Guided triage. Picking a symptom shows safe first checks and can hand the
 * details to the service-request form, which listens for the prefill event.
 */
export function SmartAssistant() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Symptom | null>(null);

  function handOff(symptom: Symptom) {
    window.dispatchEvent(
      new CustomEvent("servicefirst:prefill", {
        detail: {
          serviceType: symptom.serviceType,
          message: `Smart Assistant: ${symptom.label}. Already checked: ${symptom.checks[0]}`,
        },
      }),
    );
    document.getElementById("schedule")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="rounded-2xl border border-hairline bg-surface p-7">
      <h3 className="flex items-center gap-2.5 text-[1.15rem]">
        <Icon name="message-circle" className="size-5 text-flame-500" />
        {assistant.heading}
      </h3>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{assistant.body}</p>

      {!open ? (
        <Button type="button" variant="outline" className="mt-5 w-full" onClick={() => setOpen(true)}>
          {assistant.cta}
        </Button>
      ) : (
        <div className="mt-5">
          <fieldset>
            <legend className="text-sm font-semibold text-white">What&apos;s going on?</legend>
            <div className="mt-3 space-y-2">
              {symptoms.map((symptom) => {
                const active = selected?.id === symptom.id;
                return (
                  <button
                    key={symptom.id}
                    type="button"
                    onClick={() => setSelected(symptom)}
                    aria-pressed={active}
                    className={`flex w-full items-center justify-between gap-3 rounded-lg border px-4 py-2.5 text-left text-[0.95rem] transition-colors ${
                      active
                        ? "border-flame-600 bg-flame-700/15 text-white"
                        : "border-hairline-strong text-body hover:border-flame-600 hover:text-white"
                    }`}
                  >
                    {symptom.label}
                    <Icon
                      name={active ? "circle-check" : "arrow-right"}
                      className="size-4 shrink-0 text-flame-500"
                    />
                  </button>
                );
              })}
            </div>
          </fieldset>

          {selected && (
            <div className="mt-5 rounded-xl border border-hairline-strong bg-ink p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-bold tracking-wide text-white uppercase">
                  Try this first
                </p>
                <span className="rounded-full bg-icon-navy px-2.5 py-1 text-xs font-semibold text-flame-500 ring-1 ring-hairline-strong">
                  {selected.urgency}
                </span>
              </div>
              <ol className="mt-3 space-y-2.5">
                {selected.checks.map((check, index) => (
                  <li key={check} className="flex gap-2.5 text-[0.9rem] leading-relaxed text-body">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-flame-700 text-xs font-bold text-white">
                      {index + 1}
                    </span>
                    {check}
                  </li>
                ))}
              </ol>

              <div className="mt-5 flex flex-col gap-2.5">
                <Button type="button" onClick={() => handOff(selected)}>
                  <Icon name="calendar" className="size-[18px]" />
                  Still not fixed — book a technician
                </Button>
                <a
                  href={site.phone.href}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-hairline-strong px-5 py-2.5 text-[0.95rem] font-semibold text-white transition-colors hover:border-flame-600"
                >
                  <Icon name="phone" className="size-[18px] text-flame-500" />
                  Call {site.phone.display}
                </a>
              </div>
            </div>
          )}

          <p className="mt-4 text-xs leading-relaxed text-faint">
            These are homeowner-level checks only. If you smell gas or see scorching, leave the
            system off and call us right away.
          </p>
        </div>
      )}
    </div>
  );
}
