# Connect appointment requests to Scheduled Appointments

The selected calendar is `Scheduled Appointments`, owned by the Google account connected
in this chat. Its ID is configured by the setup script. Connecting Google Calendar to
Codex enables chat tools only; it does not authorize the deployed website.

## Provisioned keyless connection

A dedicated Google Cloud project `service-first-booking-20261105` (number
`584092058008`) has Google Calendar API, Security Token Service, and IAM Credentials
enabled. No billing account was linked. Service account:

`website-booking@service-first-booking-20261105.iam.gserviceaccount.com`

Downloadable service account keys are prohibited by organization policy. That policy
was retained; no private key was created. The app instead uses Vercel OIDC and Google
Workload Identity Federation. The pool/provider is
`projects/584092058008/locations/global/workloadIdentityPools/vercel-booking/providers/vercel`.
It trusts only Vercel project `prj_TVem1MCPcnSqOFrS6UICaeWBQ7R9` in
`enchanting-webs-projects`, for **development and preview**. Production is excluded.
The service account has no project-wide Editor/Owner roles or domain-wide delegation.

Live verification after calendar sharing was updated passed: pending/private/non-blocking
save, retry deduplication, protected review data, approval to confirmed/busy status,
stale-approval rejection, busy-time conflict rejection, and decline. Temporary test
events were removed (Google returned 204/410). No customer invitations or messages
were sent. Local requests are now enabled; production remains excluded from the
identity trust policy and has not been deployed.

## Finish the connection

1. In Google Calendar → Settings → **Scheduled Appointments** → Share with specific
   people, add the service account email above with **Make changes to events** access.
   This allows the website to read, create, edit, and delete events on that calendar.
   Keep this calendar limited to business scheduling information.
2. Local settings and a random team access key have been prepared in ignored,
   owner-only `.env.local`. To regenerate missing settings, run:

   ```sh
   node scripts/configure-booking.mjs
   ```

   The script preserves unrelated settings and never prints secrets.
3. Restart the local app and visit `/admin/appointments`. Enter `BOOKING_ADMIN_TOKEN`
   from `.env.local`. It stays only in page memory; sign out/reload when finished.
   Vercel's official OIDC helper can obtain/refresh the local development identity
   using your existing Vercel CLI login; no full environment download is required.
4. After calendar access and abuse protection are checked, set
   `BOOKING_REQUESTS_ENABLED=true` in the local or preview environment and test.
   It defaults to **false** on initial setup; local settings were enabled after the live test passed.
5. Configure the following server-only values in a preview deployment when ready:

   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_WORKLOAD_IDENTITY_PROVIDER` (the `//iam.googleapis.com/…` audience in `.env.local`)
   - `GOOGLE_BOOKING_CALENDAR_ID`
   - `BOOKING_ADMIN_TOKEN` (use the generated random value, at least 32 characters)
   - `BOOKING_REQUESTS_ENABLED=true` after access/rate-limit verification

   Never use a `NEXT_PUBLIC_` prefix. Vercel supplies the short-lived identity to
   deployed request handlers; do not copy a local development token into hosting.
   Do not download the whole project environment for a token-only check.
6. Production requires separate deployment authorization and an explicit update to
   the provider's environment restriction. It is not enabled by this implementation.

The old `GOOGLE_CALENDAR_BOOKING_URL` iframe setting is no longer used.

## Verified preview deployment

- Preview: https://service-first-hvac-q4r1o4u6q-enchanting-webs-projects.vercel.app/contact#schedule
- Review: https://service-first-hvac-q4r1o4u6q-enchanting-webs-projects.vercel.app/admin/appointments
- Deployment ID: `dpl_8YK1NKp1AGwxby1dkEJY45ZomPR1`, target **preview**, status **Ready**.
- Vercel Authentication remains enabled. The five booking variables are encrypted
  and scoped to preview branch `codex/site-refresh`; no production variables changed.
- Deployed endpoint verification passed for pending save, retry deduplication,
  authorized review, unauthenticated review rejection (401), approval, busy-time
  rejection, and decline. Test entries were cleaned up (204/410), with no invitations
  or customer messages. The production site was not promoted or changed.
- The team review key is `BOOKING_ADMIN_TOKEN` in ignored `.env.local`; it was never
  printed in chat or passed as a command-line argument.

## Review and customer contact

- Requests create private `[PENDING]` calendar entries, not confirmed appointments.
  They do not block time and do not invite the customer.
- Use the protected review page to **Approve time** or **Decline request**.
- Review coverage, travel time, and technician capacity first. Northern Kentucky
  coverage must be confirmed by the team.
- Approval checks for busy events on Scheduled Appointments and reserves **one hour**.
  Pending requests do not conflict with each other. Other technician calendars are
  not checked. Adjust the approved event's duration for the actual job.
- Calendar checks and writes are not a cross-event transaction. Have one dispatcher
  review at a time and recheck Calendar when multiple people edit the schedule.
- After deciding, call or email the customer yourself. This version does not send
  automatic customer confirmations or decline emails.
- Manage requests through the review page so the stored approval state stays consistent.
  To arrange a different time, contact the customer, decline the original request,
  and schedule the agreed visit in Calendar.
- New requests appear in Google Calendar and on the review page; there is no separate
  staff email notification. Monitor that calendar or configure its notifications.

<!-- coderabbit-ai-generated:v1 -->

<!-- coderabbit-ai-generated-section:v1:bbf65ceda066102669a650e3efa012a6b7c06f330592cb399c6e064551579c46 -->

## Re-run authorized live verification

Use Node.js 20.12 or later (for `process.loadEnvFile`) and install development
dependencies with `npm ci`. The script uses the project’s `tsx` runner to load
TypeScript on Node.js 20; no native TypeScript support is required.

<!-- /coderabbit-ai-generated:v1 -->

```sh
node scripts/verify-google-booking.mjs --live
```

This creates clearly labeled temporary test requests on the selected calendar,
checks the request/approval/decline lifecycle, and removes its own test entries in
cleanup. It does not send customer invitations or change the deployment's settings.
If the preferred test time conflicts with an existing event, choose another test
time before rerunning. The script reports cleanup failures explicitly.

## Before production

Use a preview environment and an explicitly authorized test request with fictitious
contact details. Verify pending save, no customer invite, private/non-blocking status,
admin authentication, approval, busy-time rejection, decline, retry without duplicates,
and the correct time around daylight saving changes. Remove test entries afterward.
Do not report live integration as verified until these real-calendar checks pass.

Enable a shared, persistent rate limit for `/api/appointments` in the hosting firewall
before exposing it publicly. The form has server validation, same-origin checks and
an invisible spam field, but these do not stop scripted callers or provide a distributed
rate limit. Protect `/api/appointments/review` against brute-force traffic as well.

Never commit `.env.local` or any identity/access token. Use HTTPS, a high-entropy team key,
and a dedicated limited-access calendar. Rotate the key if access must be revoked.
Local automated tests mock Google responses; they do not test the live account or delivery.

## References

- https://vercel.com/docs/oidc/gcp
- https://vercel.com/docs/oidc/reference
- https://docs.cloud.google.com/iam/docs/workload-identity-federation
- https://developers.google.com/workspace/calendar/api/v3/reference/events/insert
- https://developers.google.com/workspace/calendar/api/v3/reference/events/patch
