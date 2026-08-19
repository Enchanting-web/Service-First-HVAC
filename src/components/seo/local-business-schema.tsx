import { serviceAreas } from "@/content/service-areas";
import { services } from "@/content/services";
import { site } from "@/content/site";

/**
 * LocalBusiness structured data, emitted once from the root layout so every
 * page carries the confirmed name, address, phone and service coverage.
 */
export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    url: site.url,
    telephone: site.phone.raw,
    email: site.email,
    description: site.tagline,
    image: `${site.url}/logo-mark.svg`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street.replace(/\.$/, ""),
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.address.lat,
      longitude: site.address.lng,
    },
    areaServed: serviceAreas.map((area) => ({
      "@type": "City",
      name: area.city,
      addressRegion: area.state,
      addressCountry: "US",
    })),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "HVAC Services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
          url: `${site.url}/services#${service.slug}`,
        },
      })),
    },
    sameAs: [site.social.facebook],
  };

  return (
    <script
      type="application/ld+json"
      // Static, developer-authored payload; no user input reaches this string.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
