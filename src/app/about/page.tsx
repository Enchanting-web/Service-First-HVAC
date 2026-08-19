import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/sections/cta-band";
import { Icon } from "@/components/ui/icon";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  aboutCta,
  aboutHero,
  serviceFootprint,
  story,
  team,
  whyUs,
} from "@/content/about";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About Our HVAC Company",
  description:
    "Service First Heating & Air is a locally owned HVAC company with 20+ years of experience serving Dayton, Cincinnati and surrounding Ohio communities.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title={aboutHero.heading}
        description={aboutHero.quote}
      >
        <ul className="flex flex-wrap gap-2.5">
          {aboutHero.badges.map((badge) => (
            <li
              key={badge}
              className="inline-flex items-center gap-2 rounded-full border border-hairline-strong bg-surface px-4 py-2 text-sm font-medium text-body"
            >
              <Icon name="shield-check" className="size-4 text-flame-500" />
              {badge}
            </li>
          ))}
        </ul>
      </PageHero>

      <section className="bg-ink py-16 sm:py-20">
        <div className="container-page grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="relative overflow-hidden rounded-2xl border border-hairline">
            <Image
              src={aboutHero.image.src}
              alt={aboutHero.image.alt}
              width={1000}
              height={750}
              sizes="(min-width: 1024px) 560px, 100vw"
              className="h-full w-full object-cover"
              priority
            />
            <div className="absolute inset-x-0 bottom-0 flex gap-8 bg-gradient-to-t from-ink-deep via-ink-deep/85 to-transparent px-6 pt-14 pb-6">
              {story.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="display-hero text-[2rem] text-flame-500">{stat.value}</p>
                  <p className="text-sm text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading align="left" eyebrow="Our Story" title={story.heading} />
            <div className="mt-5 space-y-4 leading-relaxed text-body">
              {story.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>

            <blockquote className="mt-7 border-l-2 border-flame-600 pl-5 text-[1.05rem] leading-relaxed text-white italic">
              {story.pullQuote}
            </blockquote>

            <h3 className="mt-9 text-[1.15rem]">{story.capabilitiesHeading}</h3>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {story.capabilities.map((capability) => (
                <li key={capability} className="flex items-start gap-2.5 text-[0.95rem] text-body">
                  <Icon
                    name="circle-check"
                    className="mt-0.5 size-[18px] shrink-0 text-flame-500"
                  />
                  {capability}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-hairline bg-surface-alt py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading eyebrow="Why Us" title={whyUs.heading} description={whyUs.intro} />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyUs.reasons.map((reason, index) => (
              <article
                key={reason.title}
                className="rounded-xl border border-hairline bg-surface p-6"
              >
                <span
                  className={`flex size-12 items-center justify-center rounded-full ${
                    index % 2 === 1
                      ? "bg-flame-700 text-white"
                      : "bg-icon-navy text-white ring-1 ring-hairline-strong"
                  }`}
                >
                  <Icon name={reason.icon} className="size-6" strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 text-[1.05rem]">{reason.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{reason.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading eyebrow="Our Team" title="The People Behind the Service" />
          <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
            {team.map((member) => (
              <article
                key={member.name}
                className="overflow-hidden rounded-xl border border-hairline bg-surface"
              >
                <Image
                  src={member.image}
                  alt={`${member.name}, ${member.role} at ${site.shortName}`}
                  width={640}
                  height={640}
                  sizes="(min-width: 640px) 360px, 100vw"
                  className="aspect-square w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="text-[1.15rem]">{member.name}</h3>
                  <p className="text-sm font-semibold text-flame-500">{member.role}</p>
                  <ul className="mt-4 space-y-2">
                    {member.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-center gap-2 text-sm text-body">
                        <Icon name="check" className="size-4 shrink-0 text-flame-500" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-hairline bg-surface-alt py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Service Area"
            title={serviceFootprint.heading}
            description={serviceFootprint.body}
          />
          <ul className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2.5">
            {serviceFootprint.cities.map((city) => (
              <li key={city}>
                <Link
                  href="/service-areas"
                  className="inline-flex items-center gap-2 rounded-full border border-hairline-strong bg-surface px-4 py-2 text-sm text-body transition-colors hover:border-flame-600 hover:text-white"
                >
                  <Icon name="map-pin" className="size-4 text-flame-500" />
                  {city}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        heading={aboutCta.heading}
        body={aboutCta.body}
        action={{ label: aboutCta.cta.label, href: aboutCta.cta.href }}
      />
    </>
  );
}
