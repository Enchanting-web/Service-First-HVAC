import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/sections/cta-band";
import { Icon } from "@/components/ui/icon";
import { PageHero } from "@/components/ui/page-hero";
import { postsByDate } from "@/content/blog";

export const metadata: Metadata = {
  title: "HVAC Tips & News",
  description:
    "Seasonal HVAC advice from Service First Heating & Air: AC and furnace troubleshooting, maintenance checklists, buying guides and indoor air quality tips.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const [featured, ...rest] = postsByDate();

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="HVAC Tips & News"
        description="Practical advice from the crew that shows up — seasonal checklists, honest buying guides and what we see in the field."
      />

      <section className="bg-ink py-16 sm:py-20">
        <div className="container-page">
          <Link
            href={`/blog/${featured.id}`}
            className="group grid overflow-hidden rounded-2xl border border-hairline bg-surface transition-colors hover:border-hairline-strong lg:grid-cols-2"
          >
            <div className="relative aspect-[16/10] lg:aspect-auto lg:h-full">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(min-width: 1024px) 600px, 100vw"
                priority
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center p-7 sm:p-9">
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="rounded-full bg-flame-700 px-3 py-1 text-xs font-bold tracking-wide text-white uppercase">
                  Latest
                </span>
                <span className="text-flame-500">{featured.category}</span>
                <span className="text-faint">{featured.date}</span>
              </div>
              <h2 className="mt-4 text-[1.5rem] leading-tight sm:text-[1.85rem]">
                {featured.title}
              </h2>
              <p className="mt-4 leading-relaxed text-body">{featured.excerpt}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 font-semibold text-flame-500">
                Read the post
                <Icon
                  name="arrow-right"
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                />
              </span>
            </div>
          </Link>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <article
                key={post.id}
                className="group flex flex-col overflow-hidden rounded-xl border border-hairline bg-surface transition-colors hover:border-hairline-strong"
              >
                <Link href={`/blog/${post.id}`} className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                    <span className="font-semibold text-flame-500">{post.category}</span>
                    <span className="text-faint">{post.date}</span>
                  </div>
                  <h3 className="mt-3 text-[1.1rem] leading-snug">
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </h3>
                  <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.id}`}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-flame-500"
                  >
                    Read More
                    <Icon
                      name="arrow-right"
                      className="size-4 transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        heading="Questions about your system?"
        body="Skip the search results — talk to a technician who has seen it before."
      />
    </>
  );
}
