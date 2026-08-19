// One-shot port of the 7 blog posts from the previous site. Each post page
// inlines its body as an escaped HTML string, which we convert into the typed
// block model used by src/content/blog.ts.
//
// This ran once during the migration and src/content/blog.ts is now the source
// of truth: the maintenance-plan post was hand-tuned afterwards because its
// pricing cards and inspection checklists do not survive a flat HTML parse.
// Re-running this script overwrites those refinements.
import { writeFileSync } from "node:fs";
import { htmlToLines, decode } from "./html-text.mjs";

const POSTS = [
  { id: 7, image: "/blog/summer-heat-ac.jpg" },
  { id: 1, image: "/work/residential-ac-unit.jpg" },
  { id: 2, image: "/blog/hvac-maintenance-benefits.jpg" },
  { id: 3, image: "/blog/choosing-a-furnace.jpg" },
  { id: 4, image: "/blog/indoor-air-quality.jpg" },
  { id: 5, image: "/blog/hvac-winter-prep.jpg" },
  { id: 6, image: "/blog/maintenance-plan.jpg" },
];

// The owner's surname stays as-is; only the business name is rebranded.
const PERSON = "\u0000PERSON\u0000";
const rebrand = (text) =>
  text
    .replace(/Bryan Buckley/g, PERSON)
    .replace(/Buckley Mechanical Services LLC/g, "Service First Heating & Air LLC")
    .replace(/Buckley Mechanical Services/g, "Service First Heating & Air")
    .replace(/Buckley Mechanical/g, "Service First")
    .replace(/\bBuckley\b/g, "Service First")
    .replaceAll(PERSON, "Bryan Buckley");

/** Reads the JS string literal that follows `key:` and unescapes it. */
function extractField(html, field) {
  const key = `${field}:"`;
  const start = html.indexOf(key);
  if (start === -1) throw new Error(`no ${field} field found`);
  let i = start + key.length;
  let out = "";
  while (i < html.length) {
    const ch = html[i];
    if (ch === "\\") {
      const next = html[i + 1];
      if (next === "x") {
        out += String.fromCharCode(parseInt(html.slice(i + 2, i + 4), 16));
        i += 4;
        continue;
      }
      if (next === "u") {
        out += String.fromCharCode(parseInt(html.slice(i + 2, i + 6), 16));
        i += 6;
        continue;
      }
      const simple = { n: "\n", t: "\t", r: "", '"': '"', "\\": "\\", "/": "/" };
      out += simple[next] ?? next;
      i += 2;
      continue;
    }
    if (ch === '"') break;
    out += ch;
    i++;
  }
  return out;
}

/** Collapses inline markup down to the markdown subset our renderer supports. */
function inline(html) {
  return decode(
    html
      .replace(/<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_, __, t) => `**${t.trim()}**`)
      .replace(/<(em|i)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_, __, t) => `*${t.trim()}*`)
      // Spans are only used for bold accent text in these posts.
      .replace(/<span\b[^>]*font-bold[^>]*>([\s\S]*?)<\/span>/gi, (_, t) => `**${t.trim()}**`)
      .replace(/<span\b[^>]*>([\s\S]*?)<\/span>/gi, "$1")
      .replace(/<a\b[^>]*>([\s\S]*?)<\/a>/gi, "$1")
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/<[^>]+>/g, "")
  )
    .replace(/\s+/g, " ")
    .replace(/\*\* \*\*/g, " ")
    .trim();
}

/** Splits the body HTML into top-level blocks we can render semantically. */
function toBlocks(bodyHtml) {
  const blocks = [];
  const pattern =
    /<(h2|h3|h4)\b[^>]*>([\s\S]*?)<\/\1>|<ul\b[^>]*>([\s\S]*?)<\/ul>|<ol\b[^>]*>([\s\S]*?)<\/ol>|<div\b([^>]*)>([\s\S]*?)<\/div>|<p\b[^>]*>([\s\S]*?)<\/p>/gi;

  let match;
  while ((match = pattern.exec(bodyHtml))) {
    // The elided slot is the <div> attribute list, which we never read.
    const [, hTag, hText, ulInner, olInner, , divInner, pText] = match;

    if (hTag) {
      blocks.push({ type: "heading", text: inline(hText) });
    } else if (ulInner || olInner) {
      const raw = [...(ulInner ?? olInner).matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)]
        .map((m) => inline(m[1]))
        .filter(Boolean);
      // Some lists hard-code their numbering in a separate bold span; drop it
      // and let the rendered ordered list supply the numbers instead.
      const numbered = raw.length > 1 && raw.every((item) => /^\*\*\d+\.\*\*|^\d+\./.test(item));
      const items = numbered
        ? raw.map((item) => item.replace(/^\*\*(\d+)\.\*\*\s*|^(\d+)\.\s*/, "").trim())
        : raw;
      if (items.length) blocks.push({ type: "list", items, ordered: numbered });
    } else if (divInner !== undefined) {
      // Bordered/tinted divs are callouts; the last one is the closing CTA.
      const paragraphs = [...divInner.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)]
        .map((m) => inline(m[1]))
        .filter(Boolean);
      const headings = [...divInner.matchAll(/<(h3|h4)\b[^>]*>([\s\S]*?)<\/\1>/gi)].map((m) =>
        inline(m[2])
      );
      const link = /<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/i.exec(divInner);
      const title = headings[0] ?? paragraphs.shift() ?? "";
      const text = paragraphs.join(" ");
      if (!title && !text) continue;
      if (link) {
        blocks.push({
          type: "cta",
          title,
          text,
          label: inline(link[2]),
          href: link[1],
        });
      } else {
        blocks.push({ type: "callout", title, text });
      }
      // Skip nested content already consumed by this div.
      pattern.lastIndex = match.index + match[0].length;
    } else if (pText !== undefined) {
      const text = inline(pText);
      if (text) blocks.push({ type: "paragraph", text });
    }
  }
  return blocks;
}

const q = (s) => JSON.stringify(rebrand(s));
const results = [];

for (const { id, image } of POSTS) {
  const res = await fetch(`https://buckleyhvac.com/blog/${id}`, {
    headers: { "user-agent": "Mozilla/5.0 (content-migration)" },
  });
  if (!res.ok) throw new Error(`post ${id}: HTTP ${res.status}`);
  const html = await res.text();
  const lines = htmlToLines(html);
  const anchor = lines.indexOf("Back to Blog");
  const [category, date, author, title] = lines.slice(anchor + 1, anchor + 5);
  // The meta description is truncated, so prefer the payload's full excerpt.
  const excerpt = extractField(html, "excerpt");

  const blocks = toBlocks(extractField(html, "content"));
  results.push({ id, image, category, date, author, title, excerpt, blocks });

  const kinds = blocks.reduce((acc, b) => ({ ...acc, [b.type]: (acc[b.type] ?? 0) + 1 }), {});
  console.log(
    `post ${id}: ${title.slice(0, 46).padEnd(48)} ${JSON.stringify(kinds)}`
  );
}

if (process.argv.includes("--dump")) {
  console.log(JSON.stringify(results, null, 2));
  process.exit(0);
}

const slugify = (title) =>
  title
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const renderBlock = (b) => {
  if (b.type === "heading") return `      { type: "heading", text: ${q(b.text)} },`;
  if (b.type === "paragraph") return `      { type: "paragraph", text: ${q(b.text)} },`;
  if (b.type === "list")
    return `      { type: "list", ordered: ${Boolean(b.ordered)}, items: [${b.items
      .map(q)
      .join(", ")}] },`;
  if (b.type === "callout")
    return `      { type: "callout", title: ${q(b.title)}, text: ${q(b.text)} },`;
  return `      {
        type: "cta",
        title: ${q(b.title)},
        text: ${q(b.text)},
        label: ${q(b.label)},
        href: ${q(b.href.replace("https://buckleyhvac.com", "") || "/contact")},
      },`;
};

const file = `/**
 * Blog posts ported from the previous site. Bodies are stored as typed blocks
 * rather than raw HTML; inline **bold** and *italic* markers are rendered by
 * the RichText component.
 */

export type PostBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "callout"; title: string; text: string }
  | { type: "cta"; title: string; text: string; label: string; href: string };

export type Post = {
  /** Numeric id, preserved so the previous /blog/<id> URLs keep working. */
  id: number;
  slug: string;
  title: string;
  category: string;
  date: string;
  author: string;
  excerpt: string;
  image: string;
  body: PostBlock[];
};

export const posts: Post[] = [
${results
  .map(
    (p) => `  {
    id: ${p.id},
    slug: ${q(slugify(p.title))},
    title: ${q(p.title)},
    category: ${q(p.category)},
    date: ${q(p.date)},
    author: ${q(p.author)},
    excerpt: ${q(p.excerpt)},
    image: ${JSON.stringify(p.image)},
    body: [
${p.blocks.map(renderBlock).join("\n")}
    ],
  },`
  )
  .join("\n")}
];

export const postCategories = [
  "Maintenance",
  "Tips & Tricks",
  "Buying Guide",
  "Health",
  "Announcements",
] as const;

export function getPost(id: string): Post | undefined {
  return posts.find((post) => String(post.id) === id || post.slug === id);
}

/** Newest first, by parsed post date. */
export function postsByDate(): Post[] {
  return [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
`;

writeFileSync("src/content/blog.ts", file);
console.log(`\nwrote src/content/blog.ts (${results.length} posts)`);
