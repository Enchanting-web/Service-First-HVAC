import assert from 'node:assert/strict';
import { createHash, randomUUID } from 'node:crypto';
import { tsImport } from 'tsx/esm/api';

if (!process.argv.includes('--live')) {
  console.error('This creates and removes temporary Calendar test events, without customer invitations. Run with --live only when authorized.');
  process.exit(1);
}
process.loadEnvFile('.env.local');
const { createServiceRequest, listServiceRequests, reviewServiceRequest, selectedCalendar } = await tsImport('../src/lib/google-booking.ts', import.meta.url);
const { appointmentStart, localDate } = await tsImport('../src/lib/service-request.ts', import.meta.url);
// Enable only this process, never the public website or the environment file.
process.env.BOOKING_REQUESTS_ENABLED = 'true';
const originalFetch = globalThis.fetch;
const cleanupIds = new Set();
let authorization;
let failures = false;
const calendarBase = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(process.env.GOOGLE_BOOKING_CALENDAR_ID || selectedCalendar)}/events`;
globalThis.fetch = async (url, init) => {
  if (String(url).startsWith(calendarBase)) authorization = init?.headers?.Authorization;
  const response = await originalFetch(url, init);
  if (!response.ok && String(url).startsWith(calendarBase) && response.status !== 409) {
    const result = await response.clone().json();
    console.log('Google Calendar response:', response.status, result.error?.message || 'Request failed');
  }
  return response;
};
const date = new Date(Date.now() + 7 * 86400000);
while ([0, 6].includes(date.getUTCDay())) date.setUTCDate(date.getUTCDate() + 1);
const day = localDate(date);
const input = () => ({ requestId: randomUUID(), name: 'WEBSITE INTEGRATION TEST — REMOVE', email: 'test@example.invalid', phone: '5135550100', address: 'TEST DATA — not a service address', serviceType: 'Maintenance', date: day, time: '08:00', message: 'Temporary test only. No service visit, customer invitation, or message. Remove after verification.', website: '', acknowledge: true });
const eventId = (data) => createHash('sha256').update(data.requestId).digest('hex');
async function find(id) {
  let token;
  do {
    const page = await listServiceRequests(token);
    const item = page.items.find((event) => event.id === id);
    if (item) return item;
    token = page.nextPageToken;
  } while (token);
  throw new Error('Test request missing from pending review');
}
try {
  const first = input();
  cleanupIds.add(eventId(first));
  const id = await createServiceRequest(first, appointmentStart(day, first.time));
  assert.equal(id, eventId(first));
  console.log('Live pending request saved: PASS');
  assert.equal(await createServiceRequest(first, appointmentStart(day, first.time)), id);
  console.log('Live retry deduplication: PASS');
  const saved = await find(id);
  assert.equal(saved.status, 'tentative'); assert.equal(saved.transparency, 'transparent');
  console.log('Live pending/non-blocking review state: PASS');
  const approved = await reviewServiceRequest(id, saved.etag, 'approve');
  assert.equal(approved.status, 'confirmed'); assert.equal(approved.transparency ?? 'opaque', 'opaque');
  console.log('Live approved Calendar sync: PASS');
  await assert.rejects(reviewServiceRequest(id, saved.etag, 'approve'), { status: 409 });
  console.log('Live stale/double approval guard: PASS');
  const second = input();
  cleanupIds.add(eventId(second));
  const secondId = await createServiceRequest(second, appointmentStart(day, second.time));
  const other = await find(secondId);
  await assert.rejects(reviewServiceRequest(secondId, other.etag, 'approve'), { status: 409 });
  console.log('Live busy-time conflict guard: PASS');
  const declined = await reviewServiceRequest(secondId, other.etag, 'decline');
  assert.equal(declined.status, 'cancelled');
  console.log('Live decline: PASS');
} catch (error) {
  console.error('Live verification did not complete:', error.message);
  failures = true;
} finally {
  if (authorization) {
    for (const id of cleanupIds) {
      const response = await originalFetch(`${calendarBase}/${id}?sendUpdates=none`, { method: 'DELETE', headers: { Authorization: authorization } });
      if (![204, 404, 410].includes(response.status)) { console.error('Test event cleanup needs attention:', id, response.status); failures = true; }
      else console.log('Temporary test event removed or already absent:', response.status);
    }
  }
  globalThis.fetch = originalFetch;
}
if (failures) process.exitCode = 1;
