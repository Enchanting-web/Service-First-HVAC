"use client";

import Image from "next/image";
import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { projectCategories, projects } from "@/content/projects";

type Filter = (typeof projectCategories)[number];

/** Recent-work grid with the category filter from the previous site. */
export function ProjectGallery() {
  const [active, setActive] = useState<Filter>("All");
  const visible =
    active === "All" ? projects : projects.filter((project) => project.category === active);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2.5">
        {projectCategories.map((category) => {
          const selected = category === active;
          return (
            <button
              key={category}
              type="button"
              aria-pressed={selected}
              onClick={() => setActive(category)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                selected
                  ? "border-flame-600 bg-flame-700 text-white"
                  : "border-hairline-strong bg-surface text-body hover:border-flame-600 hover:text-white"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, index) => (
          <figure
            key={project.title}
            className="group overflow-hidden rounded-xl border border-hairline bg-surface"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority={index === 0}
              />
            </div>
            <figcaption className="flex items-center justify-between gap-3 px-5 py-4">
              <h3 className="text-[1rem]">{project.title}</h3>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-icon-navy px-2.5 py-1 text-xs font-semibold text-flame-500 ring-1 ring-hairline-strong">
                <Icon name="wrench" className="size-3" />
                {project.category}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="mt-10 text-center text-muted">No projects in this category yet.</p>
      )}
    </div>
  );
}
