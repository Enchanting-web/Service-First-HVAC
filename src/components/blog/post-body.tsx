import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { RichText } from "@/components/ui/rich-text";
import type { PostBlock } from "@/content/blog";
import { maintenancePlans } from "@/content/services";

/** Renders a post's typed block model. */
export function PostBody({ blocks }: { blocks: PostBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, index) => (
        <Block key={index} block={block} />
      ))}
    </div>
  );
}

function Block({ block }: { block: PostBlock }) {
  switch (block.type) {
    case "heading":
      return <h2 className="pt-4 text-[1.35rem] leading-snug sm:text-[1.5rem]">{block.text}</h2>;

    case "paragraph":
      return (
        <p className="text-[1.05rem] leading-relaxed text-body">
          <RichText text={block.text} />
        </p>
      );

    case "list": {
      const ListTag = block.ordered ? "ol" : "ul";
      return (
        <ListTag className="space-y-3">
          {block.items.map((item, index) => (
            <li key={item} className="flex gap-3 text-[1.05rem] leading-relaxed text-body">
              {block.ordered ? (
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-flame-700 text-sm font-bold text-white">
                  {index + 1}
                </span>
              ) : (
                <Icon
                  name="circle-check"
                  className="mt-1 size-[18px] shrink-0 text-flame-500"
                />
              )}
              <span>
                <RichText text={item} />
              </span>
            </li>
          ))}
        </ListTag>
      );
    }

    case "callout":
      return (
        <aside className="rounded-xl border border-flame-700/50 bg-flame-700/10 p-6">
          <h3 className="text-[1.05rem] text-flame-400">{block.title}</h3>
          <p className="mt-2 leading-relaxed text-body">
            <RichText text={block.text} />
          </p>
        </aside>
      );

    case "checklist":
      return (
        <div className="rounded-xl border border-hairline bg-surface p-6">
          <h3 className="text-[1.05rem]">{block.title}</h3>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {block.items.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[0.95rem] text-body">
                <Icon name="check" className="mt-1 size-3.5 shrink-0 text-flame-500" strokeWidth={3} />
                <span>
                  <RichText text={item} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      );

    case "plans":
      return (
        <div className="grid gap-4 sm:grid-cols-3">
          {maintenancePlans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl border p-5 ${
                plan.popular ? "border-flame-600 bg-raised" : "border-hairline bg-surface"
              }`}
            >
              <h3 className="display-hero text-[1.5rem]">{plan.name}</h3>
              <p className="mt-1">
                <span className="display-hero text-[2rem] text-white">{plan.monthly}</span>
                <span className="text-sm text-muted">/mo</span>
              </p>
              <ul className="mt-4 space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-[0.9rem] text-muted">
                    <Icon name="check" className="mt-1 size-3.5 shrink-0 text-flame-500" strokeWidth={3} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );

    case "cta":
      return (
        <aside className="rounded-xl border border-hairline bg-band p-7">
          <h3 className="text-[1.2rem]">{block.title}</h3>
          <p className="mt-2 leading-relaxed text-body">{block.text}</p>
          <ButtonLink href={block.href} size="lg" className="mt-5">
            <Icon name="phone" className="size-[18px]" />
            {block.label}
          </ButtonLink>
        </aside>
      );

    default: {
      const exhaustive: never = block;
      return exhaustive;
    }
  }
}
