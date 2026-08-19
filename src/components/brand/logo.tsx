import Link from "next/link";
import { site } from "@/content/site";

/** Six-spoke snowflake, drawn as strokes so it stays crisp over the flame. */
export const SNOWFLAKE_PATHS = [
  "m10 20-1.25-2.5L6 18",
  "M10 4 8.75 6.5 6 6",
  "m14 20 1.25-2.5L18 18",
  "m14 4 1.25 2.5L18 6",
  "m17 21-3-6h-4",
  "m17 3-3 6 1.5 3",
  "M2 12h6.5L10 9",
  "m20 10-1.5 2 1.5 2",
  "M22 12h-6.5L14 15",
  "m4 10 1.5 2L4 14",
  "m7 21 3-6-1.5-3",
  "m7 3 3 6h4",
];

/**
 * Twin-tongue flame silhouette from the mockup: a tall inner tongue with a
 * shorter one licking up its left side.
 */
export const FLAME_OUTER = "M30 3c1 15 9 24 14 33 6 12 4 26-7 34 3-9 1-15-5-19-9-6-14-15-12-25 1-8 6-15 10-23Z";
export const FLAME_INNER =
  "M23 20c3 13-1 20-6 27-6 8-8 18-3 27 4 8 12 12 21 12-11-6-15-15-11-24 3-8 9-14 8-24-1-8-4-14-9-18Z";

/**
 * The Service First mark: an orange flame (heating) with a white snowflake
 * (cooling) laid over its lower right, matching the lockup in the brand mockup.
 */
export function LogoMark({ className = "h-12 w-auto" }: { className?: string }) {
  return (
    <svg
      // Tight to the drawn content: flame spans x 11–50, snowflake x 30–85.
      viewBox="9 1 77 92"
      className={className}
      role="img"
      aria-label={`${site.shortName} mark`}
    >
      <defs>
        <linearGradient id="sf-flame" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#F0813C" />
          <stop offset="0.5" stopColor="#DB5203" />
          <stop offset="1" stopColor="#A63D00" />
        </linearGradient>
      </defs>
      <path d={FLAME_OUTER} fill="#C34800" />
      <path d={FLAME_INNER} fill="url(#sf-flame)" />
      <g
        transform="translate(30 36) scale(2.3)"
        fill="none"
        stroke="#fff"
        strokeWidth="1.55"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {SNOWFLAKE_PATHS.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
    </svg>
  );
}

type LogoProps = {
  /** `sm` is the header lockup; `lg` is used in the footer. */
  size?: "sm" | "lg";
  className?: string;
};

/** Full lockup: mark plus the two-tone SERVICE FIRST wordmark. */
export function Logo({ size = "sm", className = "" }: LogoProps) {
  const large = size === "lg";
  return (
    <Link
      href="/"
      aria-label={`${site.name} home`}
      className={`group flex shrink-0 items-center gap-2.5 ${className}`}
    >
      <LogoMark className={large ? "h-14 w-auto" : "h-13 w-auto"} />
      <span className="flex flex-col leading-none">
        <span
          className={`font-bold tracking-tight whitespace-nowrap ${large ? "text-[1.6rem]" : "text-[1.4rem]"}`}
        >
          <span className="text-white">{site.wordmark.lead}</span>{" "}
          <span className="text-flame-500">{site.wordmark.accent}</span>
        </span>
        <span
          className={`mt-1 font-medium text-white/85 ${large ? "text-[0.95rem]" : "text-[0.85rem]"}`}
        >
          {site.wordmark.sub}
        </span>
      </span>
    </Link>
  );
}
