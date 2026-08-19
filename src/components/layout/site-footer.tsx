import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Icon } from "@/components/ui/icon";
import { Newsletter } from "@/components/layout/newsletter";
import {
  addressLines,
  footerQuickLinks,
  footerServiceLinks,
  legalLinks,
  site,
} from "@/content/site";

function FooterColumn({
  heading,
  links,
}: {
  heading: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-white">{heading}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={`${link.label}-${link.href}`}>
            <Link href={link.href} className="text-sm text-muted transition-colors hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <>
      <Newsletter />
      <footer className="border-t border-hairline bg-ink">
        <div className="container-page grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <Logo size="lg" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">{site.tagline}</p>
            <p className="mt-5 text-[0.95rem] font-semibold text-white">{site.license}</p>
          </div>

          <FooterColumn heading="Quick Links" links={footerQuickLinks} />
          <FooterColumn heading="Services" links={footerServiceLinks} />

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-white">Contact Us</h3>
            <ul className="mt-4 space-y-3.5 text-sm text-muted">
              <li className="flex gap-3">
                <Icon name="map-pin" className="mt-0.5 size-4 shrink-0 text-faint" />
                <span>
                  {addressLines[0]}
                  <br />
                  {addressLines[1]}
                </span>
              </li>
              <li className="flex gap-3">
                <Icon name="phone" className="mt-0.5 size-4 shrink-0 text-faint" />
                <a href={site.phone.href} className="transition-colors hover:text-white">
                  {site.phone.display}
                </a>
              </li>
              <li className="flex gap-3">
                <Icon name="mail" className="mt-0.5 size-4 shrink-0 text-faint" />
                <a href={`mailto:${site.email}`} className="break-all transition-colors hover:text-white">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-hairline">
          <div className="container-page flex flex-col items-center justify-center gap-2 py-5 text-center text-sm text-muted sm:flex-row sm:gap-6">
            <p>
              © {new Date().getFullYear()} {site.name}. All rights reserved.
            </p>
            <span aria-hidden className="hidden text-faint sm:inline">
              •
            </span>
            <div className="flex gap-5">
              {legalLinks.map((link) => (
                <Link key={link.href} href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
