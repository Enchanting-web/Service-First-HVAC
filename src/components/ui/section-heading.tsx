import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  className?: string;
};

/** Eyebrow + heading pair used at the top of most sections. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto max-w-2xl text-center" : ""} ${className}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className={`text-[1.75rem] leading-tight sm:text-[2rem] ${eyebrow ? "mt-2.5" : ""}`}>
        {title}
      </h2>
      {description && <p className="mt-3 text-body">{description}</p>}
    </div>
  );
}
