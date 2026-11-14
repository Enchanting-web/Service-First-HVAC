import type { IconName } from "@/components/ui/icon";

/** Copy for each homepage band, in the order the mockup lays them out. */

export const hero = {
  /** Rendered in orange above the main line. */
  kicker: "Cold Weather Ahead?",
  headline: "Stay warm",
  headlineAccent: "—",
  headlineEnd: "All season.",
  body: "Get your Cincinnati or Dayton home ready for colder days with furnace repairs, heat pump service, and seasonal maintenance. We're here to help you stay",
  bodyStrong: "comfortable all winter.",
  image: {
    src: "/hero-technician.jpg",
    alt: "Service First technician checking refrigerant pressures on a home air conditioner",
  },
} as const;

export const heroStats: { label: string; value: string; detail: string; icon: IconName }[] = [
  {
    label: "Fall & Winter",
    value: "Maintenance",
    detail: "Get your heating system ready",
    icon: "clock",
  },
  {
    label: "Furnace &",
    value: "Heat Pump Service",
    detail: "Repairs, tune-ups, and replacements",
    icon: "timer",
  },
  {
    label: "After-Hours",
    value: "Emergency Help",
    detail: "Call for urgent heating issues",
    icon: "siren",
  },
];

export const trustSignals: { label: string; icon: IconName }[] = [
  { label: "Licensed & Insured", icon: "shield-check" },
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
  eyebrow: "Fall & Winter Heating Service",
  heading: "Don't Get Left in the Cold.",
  body: "Furnace acting up or heat pump not keeping up? Call for heating repairs and after-hours emergency help, or request seasonal maintenance before the cold settles in.",
  cta: { label: "Request Heating Service", href: "/contact#schedule" },
} as const;

export const newsletter = {
  heading: "Monthly HVAC Tips",
  body: "Stay comfortable year-round with expert tips, seasonal checklists, and exclusive offers.",
  placeholder: "Enter your email address",
  cta: "Subscribe",
} as const;
