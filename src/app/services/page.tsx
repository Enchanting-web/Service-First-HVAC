import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { serviceAreas } from "@/content/service-areas";
import {
  inspections,
  maintenancePlans,
  planBenefits,
  planGuarantees,
  services,
  servicesPage,
} from "@/content/services";

export const metadata: Metadata = {
  title: "HVAC Services — Heating, Cooling & Maintenance",
  description:
    "Heating systems, air conditioning, preventative maintenance, indoor air quality and commercial HVAC across Cincinnati, Dayton and surrounding Ohio communities.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow={servicesPage.hero.eyebrow}
        title={servicesPage.hero.title}
        description={servicesPage.hero.description}
      >
        <ul className="flex flex-wrap gap-2.5">
          {services.map((service) => (
            <li key={service.slug}>
              <Link
                href={`#${service.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-hairline-strong bg-surface px-4 py-2 text-sm font-medium text-body transition-colors hover:border-flame-600 hover:text-white"
              >
                <Icon name={service.icon} className="size-4 text-flame-500" />
                {service.title}
              </Link>
            </li>
          ))}
        </ul>
      </PageHero>

      <section className="bg-ink py-16 sm:py-20">
        <div className="container-page space-y-14 sm:space-y-16">
          {services.map((service, index) => (
            <article
              key={service.slug}
              id={service.slug}
              className="grid items-center gap-8 scroll-mt-32 lg:grid-cols-2 lg:gap-12"
            >
              <div className={index % 2 === 1 ? "lg:order-2" : undefined}>
                <span
                  className={`flex size-14 items-center justify-center rounded-full ${
                    index % 2 === 1
                      ? "bg-flame-700 text-white"
                      : "bg-icon-navy text-white ring-1 ring-hairline-strong"
                  }`}
                >
                  <Icon name={service.icon} className="size-7" strokeWidth={1.75} />
                </span>
                <h2 className="mt-5 text-[1.6rem] leading-tight sm:text-[1.85rem]">
                  {service.title}
                </h2>
                <p className="mt-4 max-w-xl text-[1.05rem] leading-relaxed text-body">
                  {service.description}
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <ButtonLink href="/contact#schedule">
                    <Icon name="calendar" className="size-[18px]" />
                    Schedule {service.title}
                  </ButtonLink>
                  <ButtonLink href="#maintenance-plan" variant="outline">
                    View maintenance plans
                  </ButtonLink>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-hairline">
                <Image
                  src={service.image.src}
                  alt={service.image.alt}
                  width={1000}
                  height={700}
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="aspect-[4/3] w-full object-cover"
                  priority={index === 0}
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-hairline bg-surface-alt py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Service Areas"
            title={servicesPage.areas.heading}
            description={servicesPage.areas.body}
          />
          <ul className="mt-9 flex flex-wrap justify-center gap-2.5">
            {serviceAreas.map((area) => (
              <li key={area.slug}>
                <Link
                  href={`/service-areas/${area.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-hairline-strong bg-surface px-4 py-2 text-sm text-body transition-colors hover:border-flame-600 hover:text-white"
                >
                  <Icon name="map-pin" className="size-4 text-flame-500" />
                  {area.city}, {area.state}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 text-center">
            <ButtonLink href={servicesPage.areas.cta.href} variant="ghost">
              {servicesPage.areas.cta.label}
              <Icon name="arrow-right" className="size-4" />
            </ButtonLink>
          </div>
        </div>
      </section>

      <section id="maintenance-plan" className="scroll-mt-32 bg-ink py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow={servicesPage.plans.eyebrow}
            title={
              <>
                {servicesPage.plans.heading[0]}{" "}
                <span className="text-flame-500">{servicesPage.plans.heading[1]}</span>
              </>
            }
            description={servicesPage.plans.body}
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {maintenancePlans.map((plan) => (
              <article
                key={plan.name}
                className={`relative flex flex-col rounded-2xl border p-7 ${
                  plan.popular
                    ? "border-flame-600 bg-raised shadow-lift"
                    : "border-hairline bg-surface"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-7 rounded-full bg-flame-700 px-3 py-1 text-xs font-bold tracking-wide text-white uppercase">
                    Most Popular
                  </span>
                )}
                <h3 className="display-hero text-[1.75rem]">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted">{plan.summary}</p>

                <p className="mt-5 flex items-baseline gap-1">
                  <span className="display-hero text-[2.75rem] text-white">{plan.monthly}</span>
                  <span className="text-muted">/mo</span>
                </p>
                <p className="text-sm text-faint">or {plan.annual}/yr</p>

                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-[0.95rem] text-body">
                      <Icon
                        name="circle-check"
                        className="mt-0.5 size-[18px] shrink-0 text-flame-500"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <ButtonLink
                  href="/contact#schedule"
                  variant={plan.popular ? "primary" : "outline"}
                  className="mt-7 w-full"
                >
                  Choose {plan.name}
                </ButtonLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-hairline bg-surface-alt py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="What's Included"
            title="Every Visit, Start to Finish"
            description="Two seasonal visits a year, each following the same documented checklist."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {inspections.map((inspection) => (
              <article
                key={inspection.season}
                className="rounded-2xl border border-hairline bg-surface p-7"
              >
                <div className="flex items-center gap-4">
                  <span className="flex size-12 items-center justify-center rounded-full bg-icon-navy text-white ring-1 ring-hairline-strong">
                    <Icon name={inspection.icon} className="size-6" strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="eyebrow">{inspection.season}</p>
                    <h3 className="mt-1 text-[1.15rem]">{inspection.title}</h3>
                  </div>
                </div>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  {inspection.groups.map((group) => (
                    <div key={group.label}>
                      <h4 className="text-sm font-bold tracking-wide text-white uppercase">
                        {group.label}
                      </h4>
                      <ul className="mt-3 space-y-2">
                        {group.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-[0.9rem] leading-relaxed text-muted"
                          >
                            <Icon
                              name="check"
                              className="mt-1 size-3.5 shrink-0 text-flame-500"
                              strokeWidth={3}
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Included For Everyone"
            title={servicesPage.benefits.heading}
            description={servicesPage.benefits.body}
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {planBenefits.map((benefit, index) => (
              <article
                key={benefit.title}
                className="rounded-xl border border-hairline bg-surface p-6 text-center"
              >
                <span
                  className={`mx-auto flex size-14 items-center justify-center rounded-full ${
                    index % 2 === 1
                      ? "bg-flame-700 text-white"
                      : "bg-icon-navy text-white ring-1 ring-hairline-strong"
                  }`}
                >
                  <Icon name={benefit.icon} className="size-7" strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 text-[1.05rem]">{benefit.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                  {benefit.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden border-t border-flame-700/60 bg-ink-deep">
        <div className="heat-glow absolute inset-0" aria-hidden />
        <div className="container-page relative grid gap-9 py-16 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-[1.9rem] leading-tight sm:text-[2.25rem]">
              {servicesPage.closing.heading[0]}{" "}
              <span className="text-flame-500">{servicesPage.closing.heading[1]}</span>
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-body">
              {servicesPage.closing.body}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <ButtonLink href={servicesPage.closing.cta.href} size="lg">
                {servicesPage.closing.cta.label}
                <Icon name="arrow-right" className="size-[18px]" />
              </ButtonLink>
              <p className="text-sm text-muted">{servicesPage.closing.note}</p>
            </div>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {planGuarantees.map((guarantee) => (
              <li
                key={guarantee}
                className="flex items-center gap-3 rounded-xl border border-hairline bg-surface/80 px-4 py-3.5 text-[0.95rem] font-medium text-white"
              >
                <Icon name="shield-check" className="size-5 shrink-0 text-flame-500" />
                {guarantee}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
