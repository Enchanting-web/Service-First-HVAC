import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { hero, heroStats } from "@/content/home";
import { site } from "@/content/site";

/**
 * Homepage hero: copy on a navy field at the left, technician photo bleeding in
 * from the right, with the same-day stats strip sharing the photo backdrop.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink-deep">
      <div className="absolute inset-y-0 right-0 w-full lg:w-[62%]">
        <Image
          src={hero.image.src}
          alt={hero.image.alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 62vw"
          className="object-cover object-[70%_center] brightness-[0.82] saturate-[0.85]"
        />
        {/* Blends the photo into the navy field behind the headline. */}
        <div className="hero-scrim absolute inset-0" />
        {/* On narrow screens the photo sits behind the copy, so it needs more cover. */}
        <div className="absolute inset-0 bg-ink-deep/60 lg:hidden" />
      </div>

      <div className="container-page relative py-14 sm:py-16 lg:py-20">
        <div className="max-w-xl">
          <h1 className="display-hero text-[3.25rem] sm:text-[4rem] lg:text-[4.5rem]">
            <span className="block text-flame-600">{hero.kicker}</span>
            <span className="block text-white">
              {hero.headline} <span className="text-flame-600">{hero.headlineAccent}</span>{" "}
              {hero.headlineEnd}
            </span>
          </h1>

          <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-body">
            {hero.body} <strong className="font-bold text-white">{hero.bodyStrong}</strong>
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={site.phone.href} size="lg">
              <Icon name="phone" className="size-[18px]" />
              {site.phone.display}
            </ButtonLink>
            <ButtonLink href="/contact#schedule" variant="outline" size="lg">
              <Icon name="calendar" className="size-[18px]" />
              Schedule Online
            </ButtonLink>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-ink/75 backdrop-blur-sm">
        <dl className="container-page grid divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {heroStats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-3.5 px-0 py-5 sm:justify-center sm:px-6"
            >
              <Icon name={stat.icon} className="size-8 shrink-0 text-flame-600" strokeWidth={1.75} />
              <div>
                <dt className="font-bold leading-snug text-white">
                  {stat.label} {stat.value}
                </dt>
                <dd className="text-sm text-muted">{stat.detail}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
