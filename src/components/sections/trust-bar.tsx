import { Icon } from "@/components/ui/icon";
import { trustSignals } from "@/content/home";

/** Licensing and guarantee strip that sits under the hero. */
export function TrustBar() {
  return (
    <section className="border-b border-hairline bg-ink-deep">
      <ul className="container-page grid grid-cols-2 gap-y-5 py-6 sm:grid-cols-4 sm:divide-x sm:divide-hairline-strong">
        {trustSignals.map((signal) => (
          <li
            key={signal.label}
            className="flex items-center justify-center gap-2.5 px-2 text-center"
          >
            <Icon name={signal.icon} className="size-6 shrink-0 text-body" strokeWidth={1.5} />
            <span className="text-sm font-medium text-body">{signal.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
