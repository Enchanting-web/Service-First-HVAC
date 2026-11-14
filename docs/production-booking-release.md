# Service First booking release — published

Target: Vercel `enchanting-webs-projects/service-first-hvac`, project
`prj_TVem1MCPcnSqOFrS6UICaeWBQ7R9`, public domain `https://hvacservicefirst.com`.

## Prepared and verified

- Production build, full lint, TypeScript, 14 tests, and diff checks passed.
- Custom request form, protected review, approval email attempt, Messages handoff,
  and non-blocking confirmation UI are included in the source release.
- Production Calendar settings and team key are stored encrypted. Production
  `BOOKING_REQUESTS_ENABLED` is deliberately `false`. The already-existing
  production Resend key was not overwritten or read.
- Google federation is still restricted to this project's preview/development.
- One valid unpublished firewall rule covers POST `/api/appointments` and all
  `/api/appointments/review` requests: 30 requests per IP per 300 seconds,
  fixed-window, rate-limit response when exceeded. Shared office/mobile IPs
  share the quota. Existing origin checks, validation, honeypot and admin key remain.
- A second rate-limit rule was rejected with HTTP 402 on this plan. The replacement
  uses one combined rule; no plan or billing changes were made.
- The draft history contains one insertion and its later modification, both for
  the same rule ID `rule_service_first_booking_submission_limit_YY4X1v`.
  No unrelated firewall draft was present before this task.
- Publication preview refused to publish without final human confirmation.
  Effects digest at preparation: `18b2860629d3a47d`.

## Final approved release procedure

1. Recheck the project, current production deployment, environment names, and
   firewall diff before making live changes. Save the existing production deployment
   URL for rollback. Do not download unrelated environment secrets.
2. Extend the existing Google provider attribute condition to:

   `assertion.project_id == 'prj_TVem1MCPcnSqOFrS6UICaeWBQ7R9' && assertion.environment in ['preview', 'development', 'production']`

   Provider: `vercel`, pool: `vercel-booking`, location: `global`, project:
   `service-first-booking-20261105`. Preserve issuer/audience/mapping and all
   organization security policies. This permits the production website's service
   identity to access only calendars already shared with its dedicated account.
3. Publish only the reviewed firewall draft. The CLI requires the effects digest:

   ```sh
   vercel firewall publish --project service-first-hvac --scope enchanting-webs-projects --non-interactive --confirm-name service-first-hvac --effects-digest 18b2860629d3a47d
   ```

   If the digest changed, inspect and approve the new effects rather than bypassing
   the check. Confirm the rule is active, not merely staged. Stop if plan enforcement
   prevents activation; do not expose booking without the agreed protection.
4. Change only production `BOOKING_REQUESTS_ENABLED` to `true` via stdin and deploy
   the reviewed source to production. A variable change alone does not update an
   existing deployment. Do not accidentally promote an older preview built without
   the final settings and retry-state correction.
5. Verify the canonical domain, enabled booking API, unauthorized review HTTP 401,
   and authenticated review. Use fictitious booking details and Resend's simulation
   recipient for the final save/approve/email/conflict/decline checks. Remove only
   test events. Do not message real customers to test.
6. Verify ordinary form usage and API throttling without broadly hammering the live
   site. Report what was observed; do not call a staged rule a tested live limit.

## Public behavior and scope

Customers request a weekday time; it is not confirmed until approved. Pending entries
are private and non-blocking in Scheduled Appointments. Approved visits reserve one
hour, subject to dispatcher adjustment. Approval attempts a confirmation email;
provider acceptance is not verified inbox delivery. Messages opens a draft requiring
manual Send. Declines require manual follow-up. No production release was performed
as part of preparation.

## Rollback

If verification fails, disable booking in a replacement deployment or roll back to
saved previous production deployment. Preserve pending customer requests and approved
appointments. Keep the API rate limit unless it is the cause; do not discard unrelated
firewall changes. Google access can be restricted back to preview/development if
needed. Never delete real customer events during rollback.

## Approved production release result

Published with the user's explicit approval on November 6, 2026.

- Deployment: `dpl_CwMLJ686UAnuNfqJB57tB7W7dTsg`, production, Ready.
- Canonical booking page: https://www.hvacservicefirst.com/contact#schedule
- Team review: https://www.hvacservicefirst.com/admin/appointments
- The apex domain redirects to www with HTTP 308. Both custom domains alias the
  new deployment.
- Previous production rollback deployment:
  `https://service-first-hvac-b9wetwnnv-enchanting-webs-projects.vercel.app`.
- The approved firewall draft is published. Firewall enabled, one active rule,
  zero pending draft changes. Configured quota is 30 requests/IP/300 seconds on
  booking POST and review API traffic. A forced quota-exhaustion load test was not
  performed on the public site.
- Google identity trust now includes production for only the selected Vercel project.
- Production BOOKING_REQUESTS_ENABLED=true is deployed. Existing production email
  credentials were retained; the live simulated send was accepted by Resend.
- Raw HTTPS tests on the canonical public domain passed request persistence,
  idempotent retry, authenticated review, approval, simulated email acceptance,
  busy-time conflict rejection and decline. Unauthorized review returned 401.
  Both pages returned their expected content.
- Temporary test calendar entries were removed (204/410). No real customers were
  contacted. Simulated email acceptance is not proof of real inbox delivery.

The original preparation statements above are a historical snapshot, superseded
by this release result. The live test reused the preview verifier with its base URL
changed to the canonical production domain; its printed labels still said Preview.
