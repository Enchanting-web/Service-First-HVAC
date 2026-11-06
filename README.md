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

## Appointment requests and Google Calendar

The custom form at `/contact#schedule` submits requests to `/api/appointments`.
Customers select a preferred weekday start time (8 AM–4 PM Eastern, within 90 days),
provide contact/service details, and acknowledge that the visit needs team approval.
Times are preferences, not a public availability feed. Emergency work is routed to phone.

Google Calendar is the durable request store. Requests are private, tentative,
non-blocking events labeled `[PENDING]` on **Scheduled Appointments**. The team page
at `/admin/appointments` requires a server-configured access key to read any requests
or approve/decline them. Approval checks that calendar for busy events and changes
the request to a confirmed, blocking one-hour appointment. Declining cancels it.
The team must contact the customer separately; no customer invitations or automatic
confirmation emails are sent. Adjust durations and arrange alternate times in Calendar.

Connection setup, credentials, live verification, and operating limits:
[Google Calendar booking setup](docs/google-calendar-booking.md).

The form stays unavailable until server credentials and an admin key are configured.
A successful response is returned only after Google saves the pending request.
Retrying unchanged details uses the same event ID to prevent duplicate submissions.
Google credentials stay on the server. No production deployment or live booking is
implied by local tests.

## Legacy contact endpoint

`POST /api/contact` validates with zod and handles both service requests and
newsletter signups, returning a real success/error shape that the UI renders as
pending, success, and error states.

**Before launch:** newsletter signups still log submissions and return success
without delivering anything. Plug a newsletter provider into `sendNotification()`
in `src/app/api/contact/route.ts`. Service submissions to this endpoint are disabled.

## Assets

`public/` holds real job-site, team, and blog photography carried over from the
previous site, plus generated on-brand replacements for anything that showed the
old logo (hero technician, service van, crew, three blog headers). The logo is
hand-authored SVG in `src/components/brand/logo.tsx`, reused by the favicon
(`src/app/icon.svg`) and the generated OG image (`src/app/opengraph-image.tsx`).

`scripts/` contains the one-off tools used during the rebrand — mockup colour
sampling, media download, and the scrapers that produced the service-area and
blog content modules. They are not part of the build.
