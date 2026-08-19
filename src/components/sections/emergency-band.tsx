import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { emergencyBand } from "@/content/home";
import { site } from "@/content/site";

/** "Don't Sweat It Out." — the heat-advisory emergency call to action. */
export function EmergencyBand() {
  return (
    <section className="relative isolate overflow-hidden border-t border-flame-700/60 bg-ink-deep">
      <SunBurst />

      <div className="container-page relative flex flex-col gap-8 py-12 lg:flex-row lg:items-center lg:justify-between lg:py-14">
        <div className="flex items-center gap-6">
          <Thermometer className="hidden h-24 w-12 shrink-0 sm:block" />
          <div>
            <p className="eyebrow">{emergencyBand.eyebrow}</p>
            <h2 className="mt-2 text-[1.75rem] leading-tight sm:text-[2rem]">
              {emergencyBand.heading}
            </h2>
            <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-muted">
              {emergencyBand.body}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 lg:shrink-0">
          <ButtonLink href={site.phone.href} variant="light" size="lg">
            <Icon name="phone" className="size-[18px]" />
            {site.phone.display}
          </ButtonLink>
          <ButtonLink href={emergencyBand.cta.href} variant="outline" size="lg">
            <Icon name="wrench" className="size-[18px] text-flame-500" />
            {emergencyBand.cta.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

/** Ray count and geometry tuned to the burst in the brand mockup. */
const RAYS = 28;

/**
 * The blazing sun anchored to the band's left edge. Drawn as an SVG so the rays
 * stay crisp; the parent clips whatever hangs off the edge.
 */
function SunBurst() {
  return (
    <svg
      className="pointer-events-none absolute top-1/2 left-0 h-[17rem] w-[17rem] -translate-x-1/2 -translate-y-1/2"
      viewBox="-100 -100 200 200"
      aria-hidden
    >
      <defs>
        <radialGradient id="sun-core">
          <stop offset="0" stopColor="#fff3d6" />
          <stop offset="0.35" stopColor="#ffb257" />
          <stop offset="0.7" stopColor="#e2611d" stopOpacity="0.55" />
          <stop offset="1" stopColor="#c34800" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sun-ray" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffc074" stopOpacity="0.85" />
          <stop offset="1" stopColor="#e2611d" stopOpacity="0" />
        </linearGradient>
      </defs>

      <g>
        {Array.from({ length: RAYS }, (_, index) => {
          const angle = (360 / RAYS) * index;
          // Alternating lengths give the burst its irregular, sun-like edge.
          const length = index % 2 === 0 ? 96 : 64;
          return (
            <path
              key={angle}
              d={`M-3 -18 L0 -${length} L3 -18 Z`}
              fill="url(#sun-ray)"
              transform={`rotate(${angle})`}
            />
          );
        })}
      </g>

      <circle r="30" fill="url(#sun-core)" />
      <circle r="13" fill="#ffe9c2" opacity="0.9" />
    </svg>
  );
}

/** Outlined thermometer with a hot orange column, as drawn in the mockup. */
function Thermometer({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 96" className={className} aria-hidden>
      <rect
        x="16"
        y="6"
        width="16"
        height="56"
        rx="8"
        fill="none"
        stroke="#fff"
        strokeWidth="3.5"
      />
      <circle cx="24" cy="74" r="13" fill="none" stroke="#fff" strokeWidth="3.5" />
      <rect x="21" y="42" width="6" height="28" rx="3" fill="#e2611d" />
      <circle cx="24" cy="74" r="8" fill="#e2611d" />
      <g stroke="#fff" strokeWidth="2.5" strokeLinecap="round" opacity="0.85">
        <path d="M36 18h6" />
        <path d="M36 28h4" />
        <path d="M36 38h6" />
        <path d="M36 48h4" />
      </g>
    </svg>
  );
}
