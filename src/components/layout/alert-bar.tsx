import { Icon } from "@/components/ui/icon";
import { alertBanner } from "@/content/site";

/** The orange promo strip that sits directly beneath the header. */
export function AlertBar() {
  return (
    <div className="bg-flame-700 text-white">
      <div className="container-page flex min-h-[52px] flex-wrap items-center justify-center gap-x-8 gap-y-1 py-2 text-center">
        <p className="flex items-center gap-2.5 text-sm font-bold uppercase tracking-wide sm:text-[0.95rem]">
          <Icon name="triangle-alert" className="size-5 shrink-0" />
          {alertBanner.headline}
        </p>
        <p className="text-sm text-white/85">{alertBanner.detail}</p>
      </div>
    </div>
  );
}
