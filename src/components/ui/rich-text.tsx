import type { ReactNode } from "react";

/**
 * Renders the lightweight inline markup used by the scraped blog bodies:
 * `**bold**` and `*italic*`. Anything else passes through as plain text, so a
 * stray asterisk in the source copy can never break a page.
 */
export function RichText({ text }: { text: string }) {
  return <>{parseInline(text)}</>;
}

const INLINE = /\*\*([^*]+)\*\*|\*([^*]+)\*/g;

function parseInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let cursor = 0;

  for (const match of text.matchAll(INLINE)) {
    const start = match.index;
    if (start > cursor) nodes.push(text.slice(cursor, start));

    const [, bold, italic] = match;
    if (bold !== undefined) {
      nodes.push(
        <strong key={start} className="font-semibold text-white">
          {bold}
        </strong>,
      );
    } else {
      nodes.push(
        <em key={start} className="italic">
          {italic}
        </em>,
      );
    }
    cursor = start + match[0].length;
  }

  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}
