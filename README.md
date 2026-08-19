# Service First Heating & Air

Marketing site for Service First Heating & Air LLC — HVAC service across the
Cincinnati and Dayton metros. This is a rebrand of buckleyhvac.com: every piece
of copy was ported from the previous site, restyled to the Service First design.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
```

Other scripts:

```bash
npm run build   # production build (prerenders all 46 routes)
npm start       # serve the production build
npm run lint    # eslint
npx tsc --noEmit
```

## Stack

| Concern    | Choice                                            |
| ---------- | ------------------------------------------------- |
| Framework  | Next.js 16 (App Router) + TypeScript              |
| Styling    | Tailwind CSS v4, tokens in `src/app/globals.css`  |
| Icons      | `lucide-react`, via the registry in `src/components/ui/icon.tsx` |
| Fonts      | Bebas Neue (display) + DM Sans (body) via `next/font` |
| Map        | `react-leaflet`, client-only on the contact page   |
| Validation | `zod` in the contact API route                     |
| Hosting    | Vercel-ready; no database                          |

## Editing content

Copy lives in typed modules under `src/content/`, not in components, so text
changes never require touching JSX:

| File               | Drives                                                        |
| ------------------ | ------------------------------------------------------------- |
| `site.ts`          | Name, phone, address, email, license, hours, nav — every header, footer, and JSON-LD reference |
| `home.ts`          | Homepage hero, stats, trust bar, about row, emergency band     |
| `services.ts`      | 5 service lines, 3 maintenance tiers, tune-up checklists       |
| `service-areas.ts` | 22 cities: metro, ZIP, drive time, climate, neighborhoods, FAQs |
| `blog.ts`          | 7 posts as structured blocks                                   |
| `reviews.ts`       | Customer reviews                                               |
| `projects.ts`      | Work gallery and categories                                    |
| `contact.ts`       | Contact methods, Smart Assistant triage, form fields           |
| `legal.ts`         | Privacy policy and terms                                       |

Because brand facts are single-sourced in `site.ts`, a phone number or address
change is a one-line edit that propagates to the header, footer, contact page,
city pages, sitemap, OG image, and LocalBusiness structured data.

## Routes

Mirrors the previous site's URLs so no inbound link breaks:

`/` · `/about` · `/services` · `/work` · `/reviews` · `/blog` · `/blog/[id]`
(1–7) · `/service-areas` · `/service-areas/[city]` (22 cities) · `/contact` ·
`/privacy-policy` · `/terms-conditions`

## Contact form

`POST /api/contact` validates with zod and handles both service requests and
newsletter signups, returning a real success/error shape that the UI renders as
pending, success, and error states.

**Before launch:** the route logs submissions and returns success without
delivering anything. Plug an email provider into `sendNotification()` in
`src/app/api/contact/route.ts`.

## Assets

`public/` holds real job-site, team, and blog photography carried over from the
previous site, plus generated on-brand replacements for anything that showed the
old logo (hero technician, service van, crew, three blog headers). The logo is
hand-authored SVG in `src/components/brand/logo.tsx`, reused by the favicon
(`src/app/icon.svg`) and the generated OG image (`src/app/opengraph-image.tsx`).

`scripts/` contains the one-off tools used during the rebrand — mockup colour
sampling, media download, and the scrapers that produced the service-area and
blog content modules. They are not part of the build.
