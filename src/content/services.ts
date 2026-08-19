import type { IconName } from "@/components/ui/icon";

/** The five service lines, ported from the previous site's services page. */
export type Service = {
  slug: string;
  title: string;
  description: string;
  icon: IconName;
  /** Job-site photo from the previous site's media library. */
  image: { src: string; alt: string };
};

export const services: Service[] = [
  {
    slug: "heating-systems",
    title: "Heating Systems",
    description:
      "Expert installation, repair, and maintenance of furnaces, heat pumps, and boilers. Keep your home warm and efficient.",
    icon: "flame",
    image: {
      src: "/work/residential-furnace-upgrade.jpg",
      alt: "High-efficiency residential furnace after a Service First upgrade",
    },
  },
  {
    slug: "air-conditioning",
    title: "Air Conditioning",
    description:
      "Stay cool with our AC services. From central air to ductless mini-splits, we handle it all with precision.",
    icon: "snowflake",
    image: {
      src: "/work/ac-system-install.jpg",
      alt: "New air conditioning system installation in progress",
    },
  },
  {
    slug: "preventative-maintenance",
    title: "Preventative Maintenance",
    description:
      "Regular tune-ups to extend the life of your system, improve efficiency, and prevent costly breakdowns.",
    icon: "clipboard-check",
    image: {
      src: "/work/ac-cleaning-before-after.jpg",
      alt: "Condenser coil before and after a maintenance cleaning",
    },
  },
  {
    slug: "indoor-air-quality",
    title: "Indoor Air Quality",
    description:
      "Solutions for cleaner air, including filtration systems, humidifiers, and UV light purification.",
    icon: "wind",
    image: {
      src: "/blog/indoor-air-quality.jpg",
      alt: "Indoor air quality equipment installed on a home HVAC system",
    },
  },
  {
    slug: "commercial-hvac",
    title: "Commercial HVAC",
    description:
      "Comprehensive HVAC solutions for businesses, from rooftop units to complex ventilation systems.",
    icon: "building",
    image: {
      src: "/work/commercial-hvac-installation.jpg",
      alt: "Commercial rooftop HVAC unit installation",
    },
  },
];

/** Section copy for /services, matching the previous site band for band. */
export const servicesPage = {
  hero: {
    eyebrow: "Our Services",
    title: "Comprehensive Comfort",
    description: "Comprehensive heating and cooling solutions tailored to your comfort.",
  },
  areas: {
    heading: "Serving Cincinnati, Dayton & Surrounding Communities",
    body: "Every service above is available across our 40-mile service radius. Pick your city for local details, response times, and neighborhood coverage.",
    cta: { label: "View all areas", href: "/service-areas" },
  },
  plans: {
    eyebrow: "Premium Protection",
    heading: ["The Maintenance", "Subscription Plan"],
    body: "Total peace of mind for your home's climate. Join the club and stop worrying about your HVAC system.",
  },
  benefits: {
    heading: "Plan Benefits",
    body: "All plans include these core advantages to protect your home.",
  },
  closing: {
    heading: ["Ready for", "Total Comfort?"],
    body: "Our maintenance plan is designed to be the simplest, most effective way to protect your home's most expensive appliance. For a low monthly fee, you get professional care that pays for itself.",
    cta: { label: "Enroll in a Plan", href: "/contact#schedule" },
    note: "Plans starting at $15/mo",
  },
} as const;

/**
 * The four cards in the homepage services grid. The mockup alternates the icon
 * treatment between a navy tile and a solid orange tile.
 */
export type HomeServiceCard = {
  title: string;
  description: string;
  href: string;
  icon: IconName;
  tone: "navy" | "orange";
};

export const homeServiceCards: HomeServiceCard[] = [
  {
    title: "AC Services",
    description: "Install, repair, and maintain all cooling systems.",
    href: "/services#air-conditioning",
    icon: "snowflake",
    tone: "navy",
  },
  {
    title: "Heating Systems",
    description: "Furnace and boiler experts to keep you warm.",
    href: "/services#heating-systems",
    icon: "flame",
    tone: "orange",
  },
  {
    title: "Maintenance Plans",
    description: "Preventative tune-ups for peak performance and efficiency.",
    href: "/services#maintenance-plan",
    icon: "clipboard-check",
    tone: "navy",
  },
  {
    title: "Commercial HVAC",
    description: "Solutions for businesses and large facilities of all sizes.",
    href: "/services#commercial-hvac",
    icon: "building",
    tone: "orange",
  },
];

export type MaintenancePlan = {
  name: string;
  monthly: string;
  annual: string;
  features: string[];
  popular?: boolean;
  summary: string;
};

export const maintenancePlans: MaintenancePlan[] = [
  {
    name: "Silver",
    monthly: "$15",
    annual: "$178",
    summary: "Basic protection for your home.",
    features: [
      "Basic preventative maintenance",
      "10% off repairs",
      "No overtime charges",
      "Priority scheduling (Maint.)",
    ],
  },
  {
    name: "Gold",
    monthly: "$29",
    annual: "$350",
    popular: true,
    summary: "Stronger protection and better savings.",
    features: [
      "15% off repairs",
      "No service call fee",
      "Air filter replacement",
      "Priority scheduling (Maint. + Repairs)",
    ],
  },
  {
    name: "Platinum",
    monthly: "$39",
    annual: "$468",
    summary: "Maximum protection and exclusive perks.",
    features: [
      "20% off repairs",
      "24/7 Emergency access",
      "No overtime (nights & weekends)",
      "Member-Share Benefit",
      "Highest Priority scheduling",
    ],
  },
];

export const planBenefits: { title: string; description: string; icon: IconName }[] = [
  {
    title: "2x Yearly Visits",
    description: "Spring + Fall inspections every year to keep your system running efficiently.",
    icon: "calendar-check",
  },
  {
    title: "Max Repair Savings",
    description: "Members save up to 20% on every repair, depending on their plan level.",
    icon: "piggy-bank",
  },
  {
    title: "No Overtime Fees",
    description: "No extra charges for after-hours calls for Gold and Platinum members.",
    icon: "clock",
  },
  {
    title: "Member-Share Benefit",
    description: "Platinum members can extend their plan benefits to a friend or family member.",
    icon: "users",
  },
];

/** What each seasonal visit covers, grouped the way the previous site showed it. */
export type Inspection = {
  season: string;
  title: string;
  groups: { label: string; items: string[] }[];
  icon: IconName;
};

export const inspections: Inspection[] = [
  {
    season: "Spring",
    title: "Spring A/C Tune-Up",
    icon: "snowflake",
    groups: [
      {
        label: "Cooling System",
        items: [
          "Inspect & clean condenser coil",
          "Check refrigerant levels",
          "Inspect compressor operation",
          "Measure temperature split",
        ],
      },
      {
        label: "Electrical & Controls",
        items: [
          "Test capacitors & components",
          "Inspect contactor & wiring",
          "Test thermostat operation",
          "Check system airflow",
        ],
      },
    ],
  },
  {
    season: "Fall",
    title: "Fall Furnace Inspection",
    icon: "flame",
    groups: [
      {
        label: "Combustion Safety",
        items: [
          "Inspect heat exchanger",
          "Check gas pressure & combustion",
          "Carbon monoxide safety check",
          "Inspect flue & venting system",
        ],
      },
      {
        label: "Ignition & Burners",
        items: [
          "Test ignition system",
          "Inspect flame sensor",
          "Inspect burner assembly",
          "Check safety controls",
        ],
      },
    ],
  },
];

export const planGuarantees = [
  "No Long-Term Contracts",
  "Transferable to New Owners",
  "Inflation Protection",
  "Peace of Mind Guarantee",
] as const;
