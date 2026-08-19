import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectGallery } from "@/components/work/project-gallery";
import { galleryImages } from "@/content/projects";

export const metadata: Metadata = {
  title: "Our Work — Recent HVAC Projects",
  description:
    "Recent heating and cooling projects from Service First Heating & Air: commercial installations, furnace upgrades, AC replacements and emergency repairs.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Work"
        title="Recent Projects"
        description="Real installs, upgrades and repairs from around Cincinnati and Dayton — photographed on the job."
      />

      <section className="bg-ink py-16 sm:py-20">
        <div className="container-page">
          <ProjectGallery />
        </div>
      </section>

      <section className="border-t border-hairline bg-surface-alt py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Gallery"
            title="A Closer Look"
            description="Equipment we've installed and serviced, plus the crew behind it."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((image) => (
              <div
                key={image.src}
                className="relative aspect-[4/3] overflow-hidden rounded-xl border border-hairline"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        heading="Want work like this at your place?"
        body="Tell us what your system is doing and we'll tell you what it needs — honestly."
      />
    </>
  );
}
