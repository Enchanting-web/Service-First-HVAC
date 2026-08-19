"use client";

import dynamic from "next/dynamic";
import { Icon } from "@/components/ui/icon";
import { serviceAreaSection } from "@/content/contact";

const ServiceAreaMap = dynamic(
  () => import("./service-area-map").then((module) => module.ServiceAreaMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center text-sm text-muted">
        {serviceAreaSection.loading}
      </div>
    ),
  },
);

/** Map card with the radius caption, matching the previous site's layout. */
export function MapPanel() {
  return (
    <div className="overflow-hidden rounded-2xl border border-hairline bg-surface">
      <div className="h-[22rem] w-full sm:h-[26rem]">
        <ServiceAreaMap />
      </div>
      <div className="flex items-center gap-3 border-t border-hairline px-6 py-4">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-flame-700 text-white">
          <Icon name="map-pin" className="size-5" />
        </span>
        <div>
          <p className="font-semibold text-white">{serviceAreaSection.mapCaption.heading}</p>
          <p className="text-sm text-muted">{serviceAreaSection.mapCaption.detail}</p>
        </div>
      </div>
    </div>
  );
}
