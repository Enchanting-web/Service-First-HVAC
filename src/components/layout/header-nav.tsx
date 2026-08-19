"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { primaryNav, servicesNav } from "@/content/site";

export function HeaderNav() {
  const pathname = usePathname();
  /**
   * Storing the route the panel was opened on (instead of a boolean) means a
   * navigation closes it for free, with no reset effect.
   */
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const servicesOpen = openedOn === pathname;
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setServicesOpen = (open: boolean) => setOpenedOn(open ? pathname : null);

  useEffect(() => {
    if (!servicesOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) setOpenedOn(null);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenedOn(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [servicesOpen]);

  // A short close delay keeps the panel usable while the pointer crosses the gap.
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 120);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
      {primaryNav.map((link) =>
        link.label === "Services" ? (
          <div
            key={link.href}
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => {
              cancelClose();
              setServicesOpen(true);
            }}
            onMouseLeave={scheduleClose}
          >
            <button
              type="button"
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              onClick={() => setServicesOpen(!servicesOpen)}
              className={`flex items-center gap-1 rounded-md px-2.5 py-2 text-[0.9rem] font-medium whitespace-nowrap transition-colors ${
                isActive(link.href) ? "text-white" : "text-body hover:text-white"
              }`}
            >
              {link.label}
              <Icon
                name="chevron-down"
                className={`size-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
              />
            </button>
            {servicesOpen && (
              <div
                className="absolute left-0 top-full w-64 pt-3"
                onMouseEnter={cancelClose}
                onMouseLeave={scheduleClose}
              >
                <div className="animate-rise overflow-hidden rounded-xl border border-hairline bg-surface shadow-lift">
                  <Link
                    href="/services"
                    className="block border-b border-hairline px-4 py-3 text-sm font-semibold text-white hover:bg-raised"
                  >
                    All Services
                  </Link>
                  {servicesNav.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="block px-4 py-2.5 text-sm text-body hover:bg-raised hover:text-white"
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-md px-2.5 py-2 text-[0.9rem] font-medium whitespace-nowrap transition-colors ${
              isActive(link.href) ? "text-white" : "text-body hover:text-white"
            }`}
          >
            {link.label}
          </Link>
        )
      )}
    </nav>
  );
}
