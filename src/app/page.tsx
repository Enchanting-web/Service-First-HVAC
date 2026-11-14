import type { Metadata } from "next";
import { AboutRow } from "@/components/sections/about-row";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "HVAC Services in Cincinnati & Dayton, OH",
  description:
    "Service First Heating & Air provides AC repair, furnace service, heat pumps, maintenance and 24/7 emergency HVAC across Cincinnati, Dayton, Monroe and surrounding Ohio communities.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "HVAC Services in Cincinnati & Dayton, OH",
    description:
      "Reliable heating, cooling and emergency HVAC service from Service First Heating & Air.",
    url: site.url,
    images: [{ url: "/hero-technician.jpg", width: 1600, height: 900, alt: "Service First HVAC technician" }],
  },
};
import { EmergencyBand } from "@/components/sections/emergency-band";
import { Hero } from "@/components/sections/hero";
import { ServicesGrid } from "@/components/sections/services-grid";
import { TrustBar } from "@/components/sections/trust-bar";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesGrid />
      <AboutRow />
      <EmergencyBand />
    </>
  );
}
