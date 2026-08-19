import { Logo } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";
import { AlertBar } from "@/components/layout/alert-bar";
import { HeaderNav } from "@/components/layout/header-nav";
import { MobileNav } from "@/components/layout/mobile-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50">
      <div className="border-b border-hairline bg-ink/95 backdrop-blur-sm">
        <div className="container-page flex h-[86px] items-center justify-between gap-6">
          <Logo />
          <HeaderNav />
          <div className="flex items-center gap-2">
            {/* Wrapped rather than given `hidden`: the button's own inline-flex
                utility would win over it in the generated stylesheet. */}
            <div className="hidden sm:block">
              <ButtonLink href="/contact#schedule">Schedule a Service</ButtonLink>
            </div>
            <MobileNav />
          </div>
        </div>
      </div>
      <AlertBar />
    </header>
  );
}
