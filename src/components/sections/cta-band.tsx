import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { site } from "@/content/site";

type CtaBandProps = {
  heading: string;
  body?: string;
  /** Secondary action; the phone number is always the primary one. */
  action?: { label: string; href: string };
};

/** Closing call to action shared by every interior page. */
export function CtaBand({
  heading,
  body,
  action = { label: "Schedule a Service", href: "/contact#schedule" },
}: CtaBandProps) {
  return (
    <section className="border-t border-hairline bg-band">
      <div className="container-page flex flex-col gap-7 py-14 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <h2 className="text-[1.6rem] leading-tight sm:text-[1.9rem]">{heading}</h2>
          {body && <p className="mt-3 leading-relaxed text-body">{body}</p>}
        </div>
        <div className="flex flex-wrap gap-3 lg:shrink-0">
          <ButtonLink href={site.phone.href} size="lg">
            <Icon name="phone" className="size-[18px]" />
            {site.phone.display}
          </ButtonLink>
          <ButtonLink href={action.href} variant="outline" size="lg">
            <Icon name="calendar" className="size-[18px] text-flame-500" />
            {action.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
