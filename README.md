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

## Appointment booking

The contact page embeds a Google Calendar appointment schedule. Until a valid
booking URL is configured, it shows a call-to-book message, with no sample times
or booking confirmation. The old service-request API returns 503 rather than
claiming that an unrecorded request was received.

To connect the real calendar:

1. In the business's Google Calendar, create an **Appointment schedule** on the
   calendar that should receive appointments. Confirm the account supports the
   required scheduling features.
2. Set the appointment duration, America/New_York timezone, working hours,
   advance notice, travel buffers, and daily booking limit. Configure busy-calendar
   checks for the technician calendars that must block availability.
3. Set the meeting location to in-person service. Require phone, service address,
   service type, and issue details in Google's booking form, alongside name and
   email. Configure the booking notifications available for the account.
4. Under the booking page's **Sharing options → Website embed → Inline booking
   page**, copy the iframe's `src` URL (not the full HTML or a calendar-sharing URL).
5. Set `GOOGLE_CALENDAR_BOOKING_URL` to that public URL in `.env.local` locally
   and in the hosting environment for deployment. Rebuild and redeploy the app;
   the booking URL is read when the contact page is generated at build time.
   It must use `https://calendar.google.com/calendar/appointments/schedules/…`
   (the `/calendar/u/0/appointments/schedules/…` form is also accepted).
6. Verify available and busy times, make one authorized test booking, confirm the
   event and service details arrive in the correct calendar, check the customer's
   confirmation email, and cancel the test appointment.

No Google credentials are stored by the website. Google's booking page handles
availability and confirmation. A configured URL alone is not proof of successful
booking delivery; complete the live verification before launch.

Official setup: https://support.google.com/calendar/answer/10729749
Official embedding: https://support.google.com/calendar/answer/10733297

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
