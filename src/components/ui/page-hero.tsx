import type { ReactNode } from "react";

type PageHeroProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
};

/**
 * Compact hero band for interior pages. Uses the same navy-to-black wash as the
 * homepage hero so the pages read as one site without repeating the photograph.
 */
export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-hairline bg-ink-deep">
      <div
        className="absolute inset-0 bg-[radial-gradient(60rem_28rem_at_15%_-10%,rgba(226,97,29,0.16),transparent_65%)]"
        aria-hidden
      />
      <div className="container-page relative py-14 sm:py-16 lg:py-20">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="display-hero mt-3 text-[2.5rem] sm:text-[3.25rem] lg:text-[3.75rem]">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-body">{description}</p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
