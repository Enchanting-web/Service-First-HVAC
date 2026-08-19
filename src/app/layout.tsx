import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import { AppwritePing } from "@/components/appwrite-ping";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { LocalBusinessSchema } from "@/components/seo/local-business-schema";
import { site } from "@/content/site";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "HVAC Services Cincinnati & Dayton | Service First Heating & Air",
    template: `%s | ${site.shortName}`,
  },
  description:
    "HVAC services in Cincinnati & Dayton OH: AC repair and installation, furnace repair, heat pumps, air quality, maintenance plans and 24/7 emergency service.",
  applicationName: site.name,
  authors: [{ name: site.name }],
  keywords: [
    "HVAC Cincinnati",
    "HVAC Dayton",
    "AC repair Monroe OH",
    "furnace repair Ohio",
    "emergency HVAC service",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: site.url,
    title: "HVAC Services Cincinnati & Dayton | Service First Heating & Air",
    description:
      "AC repair, furnace service, installation, maintenance plans and 24/7 emergency HVAC across Cincinnati, Dayton, Monroe and surrounding Ohio communities.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Service First Heating & Air — HVAC Cincinnati & Dayton OH",
    description:
      "Family-owned HVAC company serving Cincinnati, Dayton, Monroe and surrounding Ohio communities. AC, heating, maintenance, and 24/7 emergency service.",
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${dmSans.variable} ${bebas.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-ink">
        <AppwritePing />
        <LocalBusinessSchema />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
