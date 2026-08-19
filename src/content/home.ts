import type { IconName } from "@/components/ui/icon";

/** Copy for each homepage band, in the order the mockup lays them out. */

export const hero = {
  /** Rendered in orange above the main line. */
  kicker: "AC Out?",
  headline: "We're on it",
  headlineAccent: "—",
  headlineEnd: "Today.",
  body: "Cincinnati & Dayton are baking. Our techs are dispatching now — most homes cooled back down in",
  bodyStrong: "hours, not days.",
  image: {
    src: "/hero-technician.jpg",
    alt: "Service First technician checking refrigerant pressures on a home air conditioner",
  },
} as const;

export const heroStats: { label: string; value: string; detail: string; icon: IconName }[] = [
  {
    label: "Today",
    value: "Same-Day Service",
    detail: "Most calls handled before 6pm",
    icon: "clock",
  },
  {
    label: "Avg Response",
    value: "< 2 HR",
    detail: "On the Way",
    icon: "timer",
  },
  {
    label: "24/7",
    value: "Emergency",
    detail: "AC Repair",
    icon: "siren",
  },
];

export const trustSignals: { label: string; icon: IconName }[] = [
  { label: "Licensed & Insured", icon: "shield-check" },
  { label: "OH Lic# 49424", icon: "shield" },
  { label: "24/7 Emergency Service", icon: "clock-alert" },
  { label: "Satisfaction Guaranteed", icon: "shield-check" },
];

export const servicesSection = {
  eyebrow: "Our Services",
  heading: "Complete Comfort Solutions",
} as const;

export const aboutSection = {
  eyebrow: "About Us",
  heading: ["Building Comfort,", "One System at a Time."],
  body: "Service First Heating & Air LLC is a family-focused HVAC company proudly serving Cincinnati and Dayton. We're committed to honest, high-quality service on the job right the first time. From quick repairs to full system installs, our team delivers transparent pricing, quality workmanship, and responsive service you can count on — every time.",
  cta: { label: "Learn More About Us", href: "/about" },
  image: {
    src: "/service-van.jpg",
    alt: "Service First Heating & Air service van",
  },
} as const;

export const emergencyBand = {
  eyebrow: "Extreme Heat Warning — Until 8PM Friday",
  heading: "Don't Sweat It Out.",
  body: "If your AC is struggling or dead, we dispatch emergency crews now. Most homes are cooling again within 2 hours.",
  cta: { label: "Book Emergency Repair", href: "/contact" },
} as const;

export const newsletter = {
  heading: "Monthly HVAC Tips",
  body: "Stay comfortable year-round with expert tips, seasonal checklists, and exclusive offers.",
  placeholder: "Enter your email address",
  cta: "Subscribe",
} as const;
