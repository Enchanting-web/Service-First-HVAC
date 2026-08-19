import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/sections/cta-band";
import { Icon } from "@/components/ui/icon";
import { PageHero } from "@/components/ui/page-hero";
import { serviceAreasByMetro, serviceAreasPage } from "@/content/service-areas";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "HVAC Service Areas — Cincinnati & Dayton",
  description:
    "Service First Heating & Air covers 22 communities across the Cincinnati and Dayton metros, from Monroe and West Chester to Kettering, Beavercreek and Florence KY.",
  alternates: { canonical: "/service-areas" },
};

export default function ServiceAreasPage() {
  const groups = serviceAreasByMetro();

  return (
    <>
      <PageHero
        eyebrow={serviceAreasPage.eyebrow}
        title={serviceAreasPage.title}
        description={serviceAreasPage.description}
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
          <span className="inline-flex items-center gap-2">
            <Icon name="map-pin" className="size-4 text-flame-500" />
            Shop at {site.address.street}, {site.address.city}, {site.address.state}
          </span>
          <span className="inline-flex items-center gap-2">
            <Icon name="clock-alert" className="size-4 text-flame-500" />
            {site.hours}
          </span>
        </div>
      </PageHero>

      <section className="bg-ink py-16 sm:py-20">
        <div className="container-page space-y-14">
          {groups.map((group) => (
            <div key={group.metro}>
              <div className="flex items-center gap-4">
                <h2 className="text-[1.5rem]">{group.metro}</h2>
                <span className="text-sm text-faint">
                  {group.areas.length} {group.areas.length === 1 ? "community" : "communities"}
                </span>
                <span className="h-px flex-1 bg-hairline" aria-hidden />
              </div>

              <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {group.areas.map((area) => (
                  <article
                    key={area.slug}
                    className="group flex flex-col rounded-xl border border-hairline bg-surface p-6 transition-colors hover:border-hairline-strong hover:bg-raised"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-[1.15rem]">
                        {area.city}, {area.state}
                      </h3>
                      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-icon-navy px-2.5 py-1 text-xs font-semibold text-muted ring-1 ring-hairline-strong">
                        <Icon name="timer" className="size-3 text-flame-500" />
                        {area.driveTime === 0 ? "Our shop" : `~${area.driveTime} min`}
                      </span>
                    </div>
                    <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted">
                      {area.blurb}
                    </p>
                    <Link
                      href={`/service-areas/${area.slug}`}
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-flame-500"
                    >
                      View Details
                      <Icon
                        name="arrow-right"
                        className="size-4 transition-transform group-hover:translate-x-0.5"
                      />
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBand
        heading="Not sure if you're in range?"
        body={`We cover roughly ${site.serviceRadiusMiles} miles from Monroe. Give us a call and we'll tell you straight.`}
      />
    </>
  );
}
