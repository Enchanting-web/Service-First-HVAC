import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { servicesSection } from "@/content/home";
import { homeServiceCards } from "@/content/services";

/** "Complete Comfort Solutions" — the four-card service overview. */
export function ServicesGrid() {
  return (
    <section className="bg-ink py-16 sm:py-20">
      <div className="container-page">
        <SectionHeading eyebrow={servicesSection.eyebrow} title={servicesSection.heading} />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {homeServiceCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group flex flex-col items-center rounded-xl border border-hairline bg-surface px-6 py-8 text-center transition-colors hover:border-hairline-strong hover:bg-raised"
            >
              <span
                className={`flex size-16 items-center justify-center rounded-full ${
                  card.tone === "orange"
                    ? "bg-flame-700 text-white"
                    : "bg-icon-navy text-white ring-1 ring-hairline-strong"
                }`}
              >
                <Icon name={card.icon} className="size-8" strokeWidth={1.75} />
              </span>
              <h3 className="mt-5 text-[1.05rem]">{card.title}</h3>
              <p className="mt-2.5 text-[0.95rem] leading-relaxed text-muted">{card.description}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-flame-500">
                Learn More
                <Icon
                  name="arrow-right"
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
