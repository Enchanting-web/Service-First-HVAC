import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/button";
import { Icon, type IconName } from "@/components/ui/icon";
import {
  cityOffers,
  getServiceArea,
  serviceAreas,
  type ServiceArea,
} from "@/content/service-areas";
import { site } from "@/content/site";

export function generateStaticParams() {
  return serviceAreas.map((area) => ({ city: area.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/service-areas/[city]">): Promise<Metadata> {
  const { city } = await params;
  const area = getServiceArea(city);
  if (!area) return { title: "Service area not found" };

  const title = `HVAC Repair & Installation in ${area.city}, ${area.state}`;
  return {
    title,
    description: area.blurb,
    alternates: { canonical: `/service-areas/${area.slug}` },
    openGraph: { title, description: area.blurb },
  };
}

export default async function ServiceAreaPage({ params }: PageProps<"/service-areas/[city]">) {
  const { city } = await params;
  const area = getServiceArea(city);
  if (!area) notFound();

  return (
    <>
      <FaqSchema area={area} />

      <section className="relative isolate overflow-hidden border-b border-hairline bg-ink-deep">
        <div
          className="absolute inset-0 bg-[radial-gradient(60rem_28rem_at_15%_-10%,rgba(226,97,29,0.16),transparent_65%)]"
          aria-hidden
        />
        <div className="container-page relative py-14 sm:py-16">
          <Link
            href="/service-areas"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-flame-500"
          >
            <Icon name="arrow-right" className="size-4 rotate-180" />
            All service areas
          </Link>

          <p className="eyebrow mt-6">{area.metro}</p>
          <h1 className="display-hero mt-3 text-[2.25rem] sm:text-[3rem] lg:text-[3.4rem]">
            HVAC Repair &amp; Installation in{" "}
            <span className="text-flame-500">
              {area.city}, {area.state}
            </span>
          </h1>
          <p className="mt-5 max-w-3xl text-[1.05rem] leading-relaxed text-body">{area.blurb}</p>

          <dl className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Stat
              icon="timer"
              label="Drive time from shop"
              value={area.driveTime === 0 ? "Our shop" : `~${area.driveTime} min`}
            />
            <Stat icon="map-pin" label="Primary ZIP" value={area.zip} />
            <Stat icon="shield-check" label="License" value={`OH #${site.licenseNumber}`} />
            <Stat icon="phone" label="24/7 Dispatch" value={site.phone.display} href={site.phone.href} />
          </dl>
        </div>
      </section>

      <section className="bg-ink py-16 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-12">
          <div>
            <h2 className="text-[1.6rem] leading-tight sm:text-[1.85rem]">
              Why {area.city} homeowners call{" "}
              <span className="text-flame-500">{site.shortName}</span>
            </h2>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-body">{area.why}</p>

            <div className="mt-9 grid gap-5 sm:grid-cols-2">
              <Detail icon="thermometer" title="Climate" body={area.climate} />
              <Detail icon="building" title="Housing stock" body={area.housingStock} />
            </div>

            <p className="mt-6 text-[0.95rem] text-muted">
              <span className="font-semibold text-white">Around town: </span>
              Serving near {area.aroundTown}.
            </p>
          </div>

          <aside className="rounded-2xl border border-hairline bg-surface p-7">
            <h2 className="text-[1.15rem]">
              What We Offer in <span className="text-flame-500">{area.city}</span>
            </h2>
            <ul className="mt-5 space-y-3">
              {cityOffers.map((offer) => (
                <li key={offer.label}>
                  <Link
                    href={offer.href}
                    className="flex items-center gap-2.5 text-[0.95rem] text-body transition-colors hover:text-white"
                  >
                    <Icon name="circle-check" className="size-[18px] shrink-0 text-flame-500" />
                    {offer.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/services"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-flame-500"
            >
              See all HVAC services
              <Icon name="arrow-right" className="size-4" />
            </Link>
          </aside>
        </div>
      </section>

      <section className="border-y border-hairline bg-surface-alt py-14 sm:py-16">
        <div className="container-page">
          <h2 className="text-[1.5rem]">
            Neighborhoods We Cover in <span className="text-flame-500">{area.city}</span>
          </h2>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {area.neighborhoods.map((neighborhood) => (
              <li
                key={neighborhood}
                className="inline-flex items-center gap-2 rounded-full border border-hairline-strong bg-surface px-4 py-2 text-sm text-body"
              >
                <Icon name="map-pin" className="size-4 text-flame-500" />
                {neighborhood}
              </li>
            ))}
          </ul>
          <ButtonLink href={site.phone.href} className="mt-7">
            <Icon name="phone" className="size-[18px]" />
            {site.phone.display}
          </ButtonLink>
        </div>
      </section>

      {area.nearby.length > 0 && (
        <section className="bg-ink py-14 sm:py-16">
          <div className="container-page">
            <h2 className="text-[1.5rem]">Nearby Service Areas</h2>
            <p className="mt-2 text-sm text-muted">Drive times measured from our Monroe shop.</p>
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {area.nearby.map((nearby) => {
                const match = serviceAreas.find(
                  (candidate) => candidate.city === nearby.city && candidate.state === nearby.state,
                );
                const label = `${nearby.city}, ${nearby.state}`;
                const drive =
                  nearby.driveTime === 0 ? "Our shop" : `~${nearby.driveTime} min drive`;

                return match ? (
                  <Link
                    key={label}
                    href={`/service-areas/${match.slug}`}
                    className="group flex items-center justify-between gap-3 rounded-xl border border-hairline bg-surface px-5 py-4 transition-colors hover:border-flame-600"
                  >
                    <span>
                      <span className="block font-semibold text-white">{label}</span>
                      <span className="text-sm text-muted">{drive}</span>
                    </span>
                    <Icon
                      name="arrow-right"
                      className="size-4 shrink-0 text-flame-500 transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                ) : (
                  <div
                    key={label}
                    className="rounded-xl border border-hairline bg-surface px-5 py-4"
                  >
                    <span className="block font-semibold text-white">{label}</span>
                    <span className="text-sm text-muted">{drive}</span>
                  </div>
                );
              })}
            </div>
            <Link
              href="/service-areas"
              className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-flame-500"
            >
              All service areas
              <Icon name="arrow-right" className="size-4" />
            </Link>
          </div>
        </section>
      )}

      <section className="border-t border-hairline bg-surface-alt py-14 sm:py-16">
        <div className="container-page max-w-3xl">
          <h2 className="text-[1.5rem]">
            {area.city} HVAC — <span className="text-flame-500">Frequently Asked</span>
          </h2>
          <div className="mt-7 space-y-3">
            {area.faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-hairline bg-surface px-6 py-5 open:border-hairline-strong"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-white">
                  {faq.question}
                  <Icon
                    name="chevron-down"
                    className="size-5 shrink-0 text-flame-500 transition-transform group-open:rotate-180"
                  />
                </summary>
                <p className="mt-3 leading-relaxed text-body">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden border-t border-flame-700/60 bg-ink-deep">
        <div className="heat-glow absolute inset-0" aria-hidden />
        <div className="container-page relative flex flex-col gap-7 py-14 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-[1.6rem] leading-tight sm:text-[1.9rem]">
              Need HVAC Service in <span className="text-flame-500">{area.city}</span>?
            </h2>
            <p className="mt-3 text-body">
              Same-day appointments available. Free estimates on new installs.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:shrink-0">
            <ButtonLink href={site.phone.href} variant="light" size="lg">
              <Icon name="phone" className="size-[18px]" />
              {site.phone.display}
            </ButtonLink>
            <ButtonLink href="/contact#schedule" variant="outline" size="lg">
              Request Service
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({
  icon,
  label,
  value,
  href,
}: {
  icon: IconName;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="rounded-xl border border-hairline bg-surface px-5 py-4">
      <dt className="flex items-center gap-2 text-xs font-semibold tracking-wide text-muted uppercase">
        <Icon name={icon} className="size-4 text-flame-500" />
        {label}
      </dt>
      <dd className="mt-1.5 text-[1.1rem] font-semibold text-white">
        {href ? (
          <a href={href} className="hover:text-flame-500">
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}

function Detail({ icon, title, body }: { icon: IconName; title: string; body: string }) {
  return (
    <div className="rounded-xl border border-hairline bg-surface p-6">
      <h3 className="flex items-center gap-2.5 text-[1.05rem]">
        <Icon name={icon} className="size-5 text-flame-500" />
        {title}
      </h3>
      <p className="mt-2.5 text-[0.95rem] leading-relaxed text-muted">{body}</p>
    </div>
  );
}

/** Per-city FAQPage structured data, so the questions can surface in search. */
function FaqSchema({ area }: { area: ServiceArea }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: area.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
