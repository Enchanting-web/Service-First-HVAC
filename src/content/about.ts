import type { IconName } from "@/components/ui/icon";

/** About page content, ported from the previous site. */

export const aboutHero = {
  heading: "About Service First",
  quote:
    "At Service First Heating & Air, we believe comfort shouldn't be something you have to think about. Your heating and cooling system should just work. When it doesn't, that's where we come in.",
  badges: ["OH Lic# 49424", "Locally Owned & Operated"],
  image: {
    src: "/about-hvac-unit.jpg",
    alt: "Outdoor HVAC condenser unit beside a home on a landscaped lawn",
  },
} as const;

export const story = {
  heading: "Providing Dependable Solutions for Dayton Communities",
  paragraphs: [
    "We are a locally owned HVAC company serving Dayton and the surrounding communities, providing dependable heating, cooling, and indoor air quality solutions for both homes and businesses.",
    "With more than 20 years of industry experience, our team has seen just about every HVAC problem you can imagine and knows how to solve it quickly and efficiently.",
    "Our goal is simple: deliver honest service, quality workmanship, and solutions that actually last. Whether you need a fast repair, seasonal maintenance, or a full system installation, we take the time to diagnose the issue correctly and recommend the best option for your home or building.",
  ],
  stats: [
    { value: "20+", label: "Years Experience" },
    { value: "100%", label: "Honest Diagnostics" },
  ],
  capabilitiesHeading: "What We Do",
  capabilities: [
    "Heating system repair and installation",
    "Air conditioning repair and replacement",
    "Preventative HVAC maintenance",
    "Indoor air quality improvements",
    "Energy-efficient system upgrades",
    "Residential and commercial HVAC service",
  ],
  pullQuote:
    "We work with modern, high-efficiency systems designed to keep your space comfortable while helping reduce energy costs.",
} as const;

export const whyUs = {
  heading: "Why Customers Choose Service First",
  intro: "In an industry where trust matters, we focus on doing things the right way.",
  reasons: [
    {
      title: "Experienced HVAC technicians",
      body: "Over 20 years of industry experience solving complex problems.",
      icon: "wrench" as IconName,
    },
    {
      title: "Honest diagnostics and recommendations",
      body: "We tell you what you need, not what we want to sell.",
      icon: "clipboard-check" as IconName,
    },
    {
      title: "Reliable and timely service",
      body: "We value your time and prioritize responsive results.",
      icon: "clock" as IconName,
    },
    {
      title: "Quality equipment and professional installation",
      body: "We stand behind our work with top-tier equipment.",
      icon: "shield-check" as IconName,
    },
    {
      title: "Long-term solutions",
      body: "We focus on fixes that actually last, not temporary patches.",
      icon: "gauge" as IconName,
    },
    {
      title: "Responsive Service",
      body: "We understand how frustrating HVAC problems can be during extreme Ohio weather.",
      icon: "siren" as IconName,
    },
  ],
} as const;

export const serviceFootprint = {
  heading: "Proudly Serving Dayton and Surrounding Areas",
  body: "Service First Heating & Air proudly serves Dayton, Ohio and surrounding communities, helping homeowners and businesses maintain safe, efficient, and comfortable indoor environments throughout the year.",
  cities: ["Dayton", "Monroe", "Middletown", "West Chester", "Liberty Township", "Springboro"],
} as const;

export type TeamMember = {
  name: string;
  role: string;
  image: string;
  highlights: string[];
};

export const team: TeamMember[] = [
  {
    name: "Bryan Buckley",
    role: "Owner",
    image: "/team/bryan-buckley.jpg",
    highlights: ["15+ Years Experience", "Master HVAC Certified", "Monroe Local"],
  },
  {
    name: "Justin Eglian",
    role: "HVAC Specialist",
    image: "/team/justin-eglian.jpg",
    highlights: ["Expert Troubleshooter", "System Design Pro", "Customer Favorite"],
  },
];

export const aboutCta = {
  heading: "Experience Reliability & Expertise",
  body: "When you choose Service First Heating & Air, you're choosing experience, reliability, and a company that stands behind its work.",
  cta: { label: "Schedule Service Now", href: "/contact#schedule" },
} as const;
