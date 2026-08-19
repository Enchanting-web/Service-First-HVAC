"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { ButtonLink } from "@/components/ui/button";
import { primaryNav, servicesNav, site } from "@/content/site";

export function MobileNav() {
  const pathname = usePathname();
  /**
   * Storing the route the menu was opened on (instead of a boolean) means
   * tapping a link closes it for free, with no reset effect.
   */
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const open = openedOn === pathname;
  const setOpen = (next: boolean) => setOpenedOn(next ? pathname : null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenedOn(null);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="flex size-11 items-center justify-center rounded-lg border border-hairline text-white"
      >
        <Icon name={open ? "x" : "menu"} className="size-6" />
      </button>

      {open && (
        <div className="fixed inset-x-0 top-[86px] bottom-0 z-40 overflow-y-auto border-t border-hairline bg-ink px-5 pb-10 pt-4">
          <nav aria-label="Mobile" className="flex flex-col">
            {primaryNav.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  className="block border-b border-hairline py-3.5 text-lg font-medium text-white"
                >
                  {link.label}
                </Link>
                {link.label === "Services" && (
                  <div className="border-b border-hairline py-2 pl-4">
                    {servicesNav.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        className="block py-2 text-body"
                      >
                        {service.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="mt-6 flex flex-col gap-3">
            <ButtonLink href="/contact#schedule" size="lg">
              Schedule a Service
            </ButtonLink>
            <ButtonLink href={site.phone.href} variant="outline" size="lg">
              <Icon name="phone" className="size-4" />
              {site.phone.display}
            </ButtonLink>
          </div>
        </div>
      )}
    </div>
  );
}
