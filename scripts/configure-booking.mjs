import { readFile, writeFile, chmod } from 'node:fs/promises';
import { randomBytes } from 'node:crypto';

const path = new URL('../.env.local', import.meta.url);
let existing = '';
try { existing = await readFile(path, 'utf8'); } catch (error) { if (error.code !== 'ENOENT') throw error; }
const values = {
  GOOGLE_SERVICE_ACCOUNT_EMAIL: 'website-booking@service-first-booking-20261105.iam.gserviceaccount.com',
  GOOGLE_WORKLOAD_IDENTITY_PROVIDER: '//iam.googleapis.com/projects/584092058008/locations/global/workloadIdentityPools/vercel-booking/providers/vercel',
  GOOGLE_BOOKING_CALENDAR_ID: 'c_35678494ff6e81e220baa64def96be92bb70406ad87290f4ff2b64d9e01c132d@group.calendar.google.com',
};
if (!/^BOOKING_REQUESTS_ENABLED=.+$/m.test(existing)) values.BOOKING_REQUESTS_ENABLED = 'false';
if (!/^BOOKING_ADMIN_TOKEN=.+$/m.test(existing)) values.BOOKING_ADMIN_TOKEN = randomBytes(32).toString('hex');
for (const [key, value] of Object.entries(values)) {
  const line = `${key}=${JSON.stringify(value)}`;
  const regex = new RegExp(`^${key}=.*$`, 'm');
  if (key.startsWith('GOOGLE_') && regex.test(existing)) continue;
  existing = regex.test(existing) ? existing.replace(regex, () => line) : `${existing.trimEnd()}\n${line}\n`;
}
await writeFile(path, existing.trimStart(), { mode: 0o600 });
await chmod(path, 0o600);
console.log('Saved keyless calendar settings and a team access key to ignored, owner-only .env.local. No secrets printed.');
console.log('Requests remain disabled until the calendar is shared with the service account and BOOKING_REQUESTS_ENABLED=true.');
