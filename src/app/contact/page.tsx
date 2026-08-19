import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { MapPanel } from "@/components/contact/map-panel";
import { SmartAssistant } from "@/components/contact/smart-assistant";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { PageHero } from "@/components/ui/page-hero";
import { contactHero, contactMethods, form, serviceAreaSection } from "@/content/contact";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact & Schedule Service",
  description:
    "Schedule HVAC service with Service First Heating & Air in Monroe OH, or call (513) 813-1945 for 24/7 emergency heating and cooling help.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            {contactHero.title} <span className="text-flame-500">{contactHero.titleAccent}</span>
          </>
        }
        description={contactHero.description}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="#schedule" size="lg">
            <Icon name="calendar" className="size-[18px]" />
            Schedule Online
          </ButtonLink>
          <ButtonLink href={site.phone.href} variant="outline" size="lg">
            <Icon name="phone" className="size-[18px] text-flame-500" />
            {site.phone.display}
          </ButtonLink>
        </div>
      </PageHero>

      <section className="bg-ink py-16 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-12">
          <div className="space-y-6">
            <div className="rounded-2xl border border-hairline bg-surface p-7">
              <h2 className="text-[1.25rem]">Contact Information</h2>
              <ul className="mt-6 space-y-6">
                {contactMethods.map((method) => (
                  <li key={method.label} className="flex gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-icon-navy text-white ring-1 ring-hairline-strong">
                      <Icon name={method.icon} className="size-5" strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="font-semibold text-white">{method.label}</p>
                      {method.detail && <p className="text-sm text-muted">{method.detail}</p>}
                      {method.href ? (
                        <a
                          href={method.href}
                          className="mt-1 block font-semibold text-flame-500 hover:text-flame-400"
                        >
                          {method.value}
                        </a>
                      ) : method.lines ? (
                        <address className="mt-1 text-[0.95rem] not-italic text-body">
                          {method.lines.map((line) => (
                            <span key={line} className="block">
                              {line}
                            </span>
                          ))}
                        </address>
                      ) : (
                        <p className="mt-1 font-semibold text-flame-500">{method.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <SmartAssistant />
          </div>

          <div id="schedule" className="scroll-mt-32">
            <h2 className="text-[1.6rem] leading-tight sm:text-[1.85rem]">{form.heading}</h2>
            <p className="mt-3 text-body">
              Tell us what&apos;s going on and we&apos;ll call to confirm a time. Emergencies go
              straight to dispatch.
            </p>
            <div className="mt-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-hairline bg-surface-alt py-16 sm:py-20">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="eyebrow">Coverage</p>
            <h2 className="mt-2.5 text-[1.75rem] leading-tight sm:text-[2rem]">
              {serviceAreaSection.title}{" "}
              <span className="text-flame-500">{serviceAreaSection.titleAccent}</span>
            </h2>
            <p className="mt-3 leading-relaxed text-body">{serviceAreaSection.body}</p>
          </div>
          <div className="mt-9">
            <MapPanel />
          </div>
        </div>
      </section>
    </>
  );
}
