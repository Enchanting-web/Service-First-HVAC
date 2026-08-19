import { Icon } from "@/components/ui/icon";
import { PageHero } from "@/components/ui/page-hero";
import type { LegalDocument as LegalDocumentContent } from "@/content/legal";
import { legalContactLines } from "@/content/legal";

/** Shared layout for the privacy policy and terms pages. */
export function LegalDocument({ document }: { document: LegalDocumentContent }) {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={
          <>
            {document.title} <span className="text-flame-500">{document.titleAccent}</span>
          </>
        }
        description={document.updated}
      />

      <section className="bg-ink py-14 sm:py-16">
        <div className="container-page max-w-3xl space-y-10">
          {document.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-[1.25rem] leading-snug">{section.heading}</h2>

              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="mt-3 leading-relaxed text-body">
                  {paragraph}
                </p>
              ))}

              {section.list && (
                <ul className="mt-4 space-y-2.5">
                  {section.list.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-body">
                      <Icon
                        name="circle-check"
                        className="mt-1 size-[18px] shrink-0 text-flame-500"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {section.definitions && (
                <dl className="mt-4 space-y-4">
                  {section.definitions.map((definition) => (
                    <div key={definition.term}>
                      <dt className="font-semibold text-white">{definition.term}</dt>
                      <dd className="mt-1 leading-relaxed text-body">{definition.body}</dd>
                    </div>
                  ))}
                </dl>
              )}

              {section.callout && (
                <div className="mt-5 rounded-xl border border-flame-700/50 bg-flame-700/10 p-6">
                  <h3 className="text-[1.05rem] text-flame-400">{section.callout.heading}</h3>
                  <ul className="mt-3 space-y-2">
                    {section.callout.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[0.95rem] text-body">
                        <Icon name="check" className="mt-1 size-3.5 shrink-0 text-flame-500" strokeWidth={3} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {section.contact && (
                <address className="mt-4 space-y-1 not-italic text-body">
                  {legalContactLines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </address>
              )}
            </section>
          ))}
        </div>
      </section>
    </>
  );
}
