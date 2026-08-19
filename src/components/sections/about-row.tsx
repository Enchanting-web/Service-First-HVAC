import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { aboutSection } from "@/content/home";
import { featuredReview } from "@/content/reviews";

/** About blurb flanked by the branded van photo and a customer quote. */
export function AboutRow() {
  return (
    <section className="border-t border-hairline bg-ink py-16 sm:py-20">
      <div className="container-page grid items-start gap-8 lg:grid-cols-12">
        <div className="relative aspect-4/3 overflow-hidden rounded-xl border border-hairline sm:aspect-video lg:col-span-3 lg:aspect-square">
          <Image
            src={aboutSection.image.src}
            alt={aboutSection.image.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 300px"
            className="object-cover"
          />
        </div>

        <div className="lg:col-span-5">
          <p className="eyebrow">{aboutSection.eyebrow}</p>
          <h2 className="mt-2.5 text-[1.6rem] leading-tight sm:text-[1.85rem]">
            {aboutSection.heading.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-muted">{aboutSection.body}</p>
          <ButtonLink href={aboutSection.cta.href} variant="outline" className="mt-6">
            {aboutSection.cta.label}
          </ButtonLink>
        </div>

        <figure className="relative overflow-hidden rounded-xl border border-hairline bg-surface-alt px-7 py-8 lg:col-span-4">
          <Icon
            name="quote"
            className="absolute left-4 top-5 size-9 rotate-180 text-hairline-strong"
          />
          <Icon
            name="quote"
            className="absolute bottom-5 right-4 size-9 text-hairline-strong"
          />
          <div className="relative flex justify-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <Icon
                key={index}
                name="star"
                className="size-5 fill-flame-500 text-flame-500"
                strokeWidth={0}
              />
            ))}
          </div>
          <blockquote className="relative mt-5 text-center text-[1.35rem] font-medium leading-snug text-white">
            {featuredReview.quote}
          </blockquote>
          <figcaption className="relative mt-4 text-center text-sm text-muted">
            {featuredReview.author}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
