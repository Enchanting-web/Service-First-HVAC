// Flattens a saved HTML page into readable text lines, used to inspect the
// structure of the live pages being ported.
import { readFileSync } from "node:fs";

const ENTITIES = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  mdash: "\u2014",
  ndash: "\u2013",
  rsquo: "\u2019",
  lsquo: "\u2018",
  ldquo: "\u201c",
  rdquo: "\u201d",
  hellip: "\u2026",
  deg: "\u00b0",
  times: "\u00d7",
  eacute: "\u00e9",
};

export function decode(str) {
  return str
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&([a-z]+);/gi, (m, name) => ENTITIES[name.toLowerCase()] ?? m);
}

export function htmlToLines(html) {
  return decode(
    html
      .replace(/\0/g, "")
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<svg[\s\S]*?<\/svg>/gi, "")
      .replace(/<head[\s\S]*?<\/head>/gi, "")
      .replace(/<\/(p|div|li|h1|h2|h3|h4|h5|section|header|footer|tr|button|a)>/gi, "\n")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<[^>]+>/g, "\n")
  )
    .split("\n")
    .map((l) => l.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

if (process.argv[1]?.endsWith("html-text.mjs") && process.argv[2]) {
  const lines = htmlToLines(readFileSync(process.argv[2], "utf8"));
  lines.forEach((l, i) => console.log(String(i).padStart(4), l));
}
