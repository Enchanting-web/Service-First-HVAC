// One-shot port of the 22 service-area pages from the previous site into a
// typed content module. Kept in the repo so the import can be re-run or audited.
import { writeFileSync } from "node:fs";
import { htmlToLines } from "./html-text.mjs";

const SLUGS = [
  "monroe",
  "cincinnati",
  "middletown",
  "west-chester",
  "liberty-township",
  "mason",
  "hamilton",
  "fairfield",
  "norwood",
  "blue-ash",
  "loveland",
  "lebanon",
  "dayton",
  "springboro",
  "kettering",
  "beavercreek",
  "oakwood",
  "centerville",
  "miamisburg",
  "huber-heights",
  "fairborn",
  "florence-ky",
];

const rebrand = (text) =>
  text
    .replace(/Buckley Mechanical Services LLC/g, "Service First Heating & Air LLC")
    .replace(/Buckley Mechanical Services/g, "Service First Heating & Air")
    .replace(/Buckley Mechanical/g, "Service First")
    .replace(/\bBuckley\b/g, "Service First");

async function fetchLines(slug) {
  const res = await fetch(`https://buckleyhvac.com/service-areas/${slug}`, {
    headers: { "user-agent": "Mozilla/5.0 (content-migration)" },
  });
  if (!res.ok) throw new Error(`${slug}: HTTP ${res.status}`);
  return htmlToLines(await res.text());
}

const at = (lines, needle, offset = 1) => {
  const i = lines.findIndex((l) => l === needle);
  if (i === -1) throw new Error(`missing anchor: ${needle}`);
  return lines[i + offset];
};
const idx = (lines, needle) => {
  const i = lines.findIndex((l) => l === needle);
  if (i === -1) throw new Error(`missing anchor: ${needle}`);
  return i;
};
const startsWithIdx = (lines, prefix) => {
  const i = lines.findIndex((l) => l.startsWith(prefix));
  if (i === -1) throw new Error(`missing prefix: ${prefix}`);
  return i;
};

function parse(slug, lines) {
  const titleAt = idx(lines, "HVAC Repair & Installation in");
  const city = lines[titleAt + 1];
  const state = lines[titleAt + 3];
  const blurb = lines[titleAt + 4];
  const metro = lines[idx(lines, "All service areas") + 1];

  const driveTime = Number(at(lines, "Drive time from shop", 2));
  const zip = at(lines, "Primary ZIP");
  const why = lines[startsWithIdx(lines, "homeowners call") + 1];
  const climate = at(lines, "Climate");
  const housingStock = at(lines, "Housing stock");
  const aroundTown = at(lines, "Serving near").replace(/\.$/, "");

  // Neighborhood chips run from the section heading to the phone CTA.
  const nStart = idx(lines, "Neighborhoods We Cover in") + 2;
  const nEnd = lines.findIndex((l, i) => i > nStart && /^\(\d{3}\)/.test(l));
  const neighborhoods = lines.slice(nStart, nEnd);

  // Nearby areas are emitted as repeating [City, ",", "OH", "~", n, "min drive"].
  // Florence, KY is the lone community without this section.
  const nearby = [];
  const nearHeading = lines.indexOf("Nearby Service Areas");
  if (nearHeading !== -1) {
    const nearEnd = idx(lines, "All service areas →");
    for (let i = nearHeading + 1; i < nearEnd; i += 6) {
      const [name, , st, , mins] = lines.slice(i, i + 6);
      if (!name || !mins) continue;
      nearby.push({ city: name, state: st, driveTime: Number(mins) });
    }
  }

  // FAQs are emitted as repeating [question, "+", answer].
  const fStart = startsWithIdx(lines, "HVAC — Frequently Asked") + 1;
  const fEnd = idx(lines, "Need HVAC Service in");
  const faqs = [];
  for (let i = fStart; i < fEnd; i += 3) {
    const [question, , answer] = lines.slice(i, i + 3);
    if (question && answer) faqs.push({ question, answer });
  }

  return {
    slug,
    city,
    state,
    metro,
    blurb,
    driveTime,
    zip,
    why,
    climate,
    housingStock,
    aroundTown,
    neighborhoods,
    nearby,
    faqs,
  };
}

const q = (s) => JSON.stringify(rebrand(s));

const areas = [];
for (const slug of SLUGS) {
  const parsed = parse(slug, await fetchLines(slug));
  areas.push(parsed);
  console.log(
    `${slug.padEnd(18)} ${parsed.metro.padEnd(17)} zip=${parsed.zip} drive=${parsed.driveTime}m ` +
      `hoods=${parsed.neighborhoods.length} nearby=${parsed.nearby.length} faqs=${parsed.faqs.length}`
  );
}

const file = `/**
 * The 22 communities we cover, ported from the previous site with the brand
 * name updated. Drives the service-areas index, each city page, and the sitemap.
 */

export type NearbyArea = {
  city: string;
  state: string;
  driveTime: number;
};

export type ServiceAreaFaq = {
  question: string;
  answer: string;
};

export type ServiceArea = {
  slug: string;
  city: string;
  state: string;
  metro: string;
  /** One-line summary shown on cards in the service-areas index. */
  blurb: string;
  /** Minutes from the Monroe shop. */
  driveTime: number;
  zip: string;
  why: string;
  climate: string;
  housingStock: string;
  /** Comma-separated local landmarks. */
  aroundTown: string;
  neighborhoods: string[];
  nearby: NearbyArea[];
  faqs: ServiceAreaFaq[];
};

export const serviceAreas: ServiceArea[] = [
${areas
  .map(
    (a) => `  {
    slug: ${q(a.slug)},
    city: ${q(a.city)},
    state: ${q(a.state)},
    metro: ${q(a.metro)},
    blurb: ${q(a.blurb)},
    driveTime: ${a.driveTime},
    zip: ${q(a.zip)},
    why: ${q(a.why)},
    climate: ${q(a.climate)},
    housingStock: ${q(a.housingStock)},
    aroundTown: ${q(a.aroundTown)},
    neighborhoods: [${a.neighborhoods.map(q).join(", ")}],
    nearby: [
${a.nearby
  .map(
    (n) =>
      `      { city: ${q(n.city)}, state: ${q(n.state)}, driveTime: ${n.driveTime} },`
  )
  .join("\n")}
    ],
    faqs: [
${a.faqs
  .map(
    (f) => `      {
        question: ${q(f.question)},
        answer: ${q(f.answer)},
      },`
  )
  .join("\n")}
    ],
  },`
  )
  .join("\n")}
];

/** Display order for the grouped index page. */
export const metroOrder = ["Cincinnati Metro", "Dayton Metro", "Northern Kentucky"] as const;

export function getServiceArea(slug: string): ServiceArea | undefined {
  return serviceAreas.find((area) => area.slug === slug);
}

export function serviceAreasByMetro(): { metro: string; areas: ServiceArea[] }[] {
  return metroOrder
    .map((metro) => ({
      metro,
      areas: serviceAreas.filter((area) => area.metro === metro),
    }))
    .filter((group) => group.areas.length > 0);
}
`;

writeFileSync("src/content/service-areas.ts", file);
console.log(`\nwrote src/content/service-areas.ts (${areas.length} areas)`);
