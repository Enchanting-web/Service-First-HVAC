import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/cta-band";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { reviewNotice, reviews } from "@/content/reviews";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Customer Reviews",
  description:
    "Read what Cincinnati and Dayton homeowners say about Service First Heating & Air — same-day repairs, honest pricing and technicians who stay until it's fixed.",
  alternates: { canonical: "/reviews" },
};

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }, (_, index) => (
        <Icon key={index} name="star" className="size-4 fill-flame-500 text-flame-500" />
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Reviews"
        title="What Neighbors Say"
        description="Every review below came from a real Cincinnati or Dayton customer on Google or Facebook."
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <div className="flex items-center gap-3">
            <Stars />
            <p className="text-sm font-semibold text-white">5.0 average rating</p>
          </div>
          <ButtonLink href={site.social.googleReviews} variant="outline">
            Read reviews on Google
            <Icon name="arrow-right" className="size-4 text-flame-500" />
          </ButtonLink>
        </div>
      </PageHero>

      <section className="bg-ink py-16 sm:py-20">
        <div className="container-page">
          <div className="grid gap-5 lg:grid-cols-2">
            {reviews.map((review) => (
              <article
                key={review.author}
                className="flex flex-col rounded-2xl border border-hairline bg-surface p-7"
              >
                <div className="flex items-center justify-between gap-4">
                  <Stars />
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-icon-navy px-2.5 py-1 text-xs font-semibold text-muted ring-1 ring-hairline-strong">
                    {review.source}
                  </span>
                </div>
                <Icon name="quote" className="mt-5 size-6 text-flame-700" />
                <blockquote className="mt-3 flex-1 leading-relaxed text-body">
                  {review.quote}
                </blockquote>
                <footer className="mt-6 border-t border-hairline pt-4">
                  <p className="font-semibold text-white">{review.author}</p>
                  <p className="text-sm text-faint">{review.when}</p>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-hairline bg-surface-alt py-16 sm:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-3xl rounded-2xl border border-flame-700/50 bg-surface p-8 text-center sm:p-10">
            <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-flame-700 text-white">
              <Icon name="sparkles" className="size-7" strokeWidth={1.75} />
            </span>
            <SectionHeading
              className="mt-6"
              title={reviewNotice.heading}
              description={reviewNotice.body}
            />
            <ButtonLink href={site.social.googleReviews} size="lg" className="mt-7">
              <Icon name="star" className="size-[18px]" />
              {reviewNotice.cta}
            </ButtonLink>
          </div>
        </div>
      </section>

      <CtaBand
        heading="Ready to see it for yourself?"
        body="Same-day service across Cincinnati, Dayton and everywhere in between."
      />
    </>
  );
}
