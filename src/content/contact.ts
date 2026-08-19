import type { IconName } from "@/components/ui/icon";
import { addressLines, site } from "./site";

/** Contact page copy, ported from the previous site. */

export const contactHero = {
  title: "Get In",
  titleAccent: "Touch",
  description:
    "Ready to schedule service or have a question? Book online below or call us directly.",
} as const;

export type ContactMethod = {
  label: string;
  /** Small line under the label; omitted where the value speaks for itself. */
  detail?: string;
  value: string;
  lines?: readonly string[];
  href?: string;
  icon: IconName;
};

export const contactMethods: readonly ContactMethod[] = [
  {
    label: "Phone",
    detail: site.hours,
    value: site.phone.display,
    href: site.phone.href,
    icon: "phone",
  },
  {
    label: "Email",
    detail: "For general inquiries and quotes",
    value: site.email,
    href: `mailto:${site.email}`,
    icon: "mail",
  },
  {
    label: "Location",
    value: site.address.street,
    lines: addressLines,
    icon: "map-pin",
  },
  {
    label: "License",
    detail: "Fully Licensed & Insured",
    value: site.license,
    icon: "shield-check",
  },
];

export const assistant = {
  heading: "Need Immediate Assistance?",
  body: "Answer one question and we'll point you at the right first step — then hand it to a real technician.",
  cta: "Launch Smart Assistant",
} as const;

/**
 * Triage options for the Smart Assistant. Every checklist item is a safe,
 * homeowner-level check; anything beyond this hands off to a technician.
 */
export type Symptom = {
  id: string;
  label: string;
  /** Prefills the service-request form. */
  serviceType: string;
  urgency: string;
  checks: readonly string[];
};

export const symptoms: readonly Symptom[] = [
  {
    id: "no-cooling",
    label: "AC is running but not cooling",
    serviceType: "AC Repair",
    urgency: "Same-day if possible",
    checks: [
      "Set the thermostat to COOL and drop it 3–4 degrees below room temperature.",
      "Check the air filter — a clogged filter starves airflow and can freeze the coil.",
      "Look at the outdoor unit: if the fan is off or the coil is iced over, shut the system off and call us.",
    ],
  },
  {
    id: "no-heat",
    label: "No heat / furnace won't start",
    serviceType: "Furnace Repair",
    urgency: "Same-day if possible",
    checks: [
      "Confirm the thermostat is set to HEAT and the batteries are good.",
      "Check the furnace power switch and the breaker for the furnace circuit.",
      "Make sure the furnace door panel is fully seated — most units won't fire without it.",
    ],
  },
  {
    id: "noise",
    label: "Loud or unusual noise",
    serviceType: "Diagnostic Visit",
    urgency: "Within a few days",
    checks: [
      "Note when the noise happens: at startup, while running, or on shutdown.",
      "If it is a metal-on-metal grinding or a loud electrical hum, turn the system off.",
      "Leave it off until we can look — running a failing motor usually turns a repair into a replacement.",
    ],
  },
  {
    id: "water",
    label: "Water or leaking around the unit",
    serviceType: "Diagnostic Visit",
    urgency: "Same-day if possible",
    checks: [
      "Turn the system off at the thermostat to stop more condensate from forming.",
      "Check the condensate drain line and pan for a visible clog or overflow.",
      "Mop up standing water near the furnace or air handler to protect the electronics.",
    ],
  },
  {
    id: "maintenance",
    label: "Nothing is wrong — I want maintenance",
    serviceType: "Maintenance Plan",
    urgency: "Flexible",
    checks: [
      "Have your system's age and last service date handy if you know them.",
      "Spring visits cover cooling; fall visits cover heating and combustion safety.",
      "Members get two visits a year plus repair discounts — ask us which tier fits.",
    ],
  },
];

export const serviceAreaSection = {
  title: "Service",
  titleAccent: "Area",
  body: `We proudly serve ${site.address.city}, ${site.address.state} and the surrounding ${site.serviceRadiusMiles}-mile radius, including Middletown, Liberty Township, West Chester, and more.`,
  mapCaption: {
    heading: "Primary Service Area",
    detail: `Cincinnati & Dayton metro · ${site.serviceRadiusMiles}-mile radius`,
  },
  loading: "Loading service area map…",
} as const;

export const form = {
  heading: "Schedule a Service Request",
  serviceTypes: [
    "AC Repair",
    "Furnace Repair",
    "New System Install",
    "Maintenance Plan",
    "Indoor Air Quality",
    "Commercial HVAC",
    "Diagnostic Visit",
    "Something else",
  ],
  timings: ["Emergency — as soon as possible", "Today or tomorrow", "This week", "Flexible"],
} as const;
