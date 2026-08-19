/**
 * Single source of truth for brand facts. Every header, footer, metadata block
 * and structured-data payload reads from here, so a future name, phone or
 * address change is a one-file edit.
 */

export const site = {
  name: "Service First Heating & Air LLC",
  shortName: "Service First",
  /** Rendered as two-tone in the logo lockup: "SERVICE" light, "FIRST" orange. */
  wordmark: { lead: "SERVICE", accent: "FIRST", sub: "Heating & Air LLC" },
  tagline: "Top-tier HVAC for residential and commercial customers in the Cincinnati and Dayton metro.",
  url: "https://servicefirsthvac.com",
  phone: { display: "(513) 813-1945", href: "tel:5138131945", raw: "+15138131945" },
  email: "bryan@servicefirsthvac.com",
  license: "OH Lic# 49424",
  licenseNumber: "49424",
  address: {
    street: "638 S Main St.",
    city: "Monroe",
    state: "OH",
    zip: "45050",
    /** Shop coordinates, used to center the service-area map. */
    lat: 39.4345,
    lng: -84.3622,
  },
  hours: "24/7 Emergency Service Available",
  serviceRadiusMiles: 40,
  /**
   * These still point at the existing listings, which carry the previous
   * business name until the rebranded profiles are live.
   */
  social: {
    facebook: "https://www.facebook.com/BuckleyMechanicalServices",
    facebookReviews: "https://www.facebook.com/Buckleyhvac/reviews",
    googleReviews:
      "https://www.google.com/search?q=Service+First+Heating+and+Air+Monroe+OH+reviews",
  },
} as const;

export const addressLines = [
  site.address.street,
  `${site.address.city}, ${site.address.state} ${site.address.zip}`,
] as const;

export type NavLink = { label: string; href: string };

export const primaryNav: readonly NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Our Work", href: "/work" },
  { label: "Reviews", href: "/reviews" },
  { label: "Blog", href: "/blog" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Contact", href: "/contact" },
];

/** Anchors shown in the header's Services dropdown. */
export const servicesNav: readonly NavLink[] = [
  { label: "Heating Systems", href: "/services#heating-systems" },
  { label: "Air Conditioning", href: "/services#air-conditioning" },
  { label: "Preventative Maintenance", href: "/services#maintenance-plan" },
  { label: "Indoor Air Quality", href: "/services#indoor-air-quality" },
  { label: "Commercial HVAC", href: "/services#commercial-hvac" },
];

export const footerQuickLinks: readonly NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Our Work", href: "/work" },
  { label: "Reviews", href: "/reviews" },
  { label: "Blog", href: "/blog" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Contact", href: "/contact" },
];

export const footerServiceLinks: readonly NavLink[] = [
  { label: "AC Services", href: "/services#air-conditioning" },
  { label: "Heating Systems", href: "/services#heating-systems" },
  { label: "Maintenance Plans", href: "/services#maintenance-plan" },
  { label: "Commercial HVAC", href: "/services#commercial-hvac" },
];

export const legalLinks: readonly NavLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-conditions" },
];

/** Site-wide promotional banner shown directly under the header. */
export const alertBanner = {
  headline: "Heat Wave Alert — Same-Day AC Service",
  detail: "High temps. Fast response. We're here.",
} as const;
