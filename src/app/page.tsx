import { AboutRow } from "@/components/sections/about-row";
import { EmergencyBand } from "@/components/sections/emergency-band";
import { Hero } from "@/components/sections/hero";
import { ServicesGrid } from "@/components/sections/services-grid";
import { TrustBar } from "@/components/sections/trust-bar";
import { MessengerContact } from "@/components/contact/messenger-contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesGrid />
      <AboutRow />
      <section className="container-page py-12 sm:py-16">
        <MessengerContact />
      </section>
      <EmergencyBand />
    </>
  );
}
