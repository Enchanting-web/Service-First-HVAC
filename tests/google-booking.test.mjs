import assert from 'node:assert/strict';
import { after, test } from 'node:test';
import { createHash } from 'node:crypto';
import { bookingConfigured, isBookingAdmin, createServiceRequest, listServiceRequests, reviewServiceRequest } from '../src/lib/google-booking.ts';

const originalFetch = globalThis.fetch;
const originalEnv = { ...process.env };
after(() => { globalThis.fetch = originalFetch; for (const key of ['GOOGLE_SERVICE_ACCOUNT_EMAIL', 'GOOGLE_WORKLOAD_IDENTITY_PROVIDER', 'BOOKING_ADMIN_TOKEN', 'BOOKING_REQUESTS_ENABLED', 'VERCEL_OIDC_TOKEN']) { if (originalEnv[key] === undefined) delete process.env[key]; else process.env[key] = originalEnv[key]; } });
process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL = 'test@example.iam.gserviceaccount.com';
process.env.GOOGLE_WORKLOAD_IDENTITY_PROVIDER = '//iam.googleapis.com/projects/123/locations/global/workloadIdentityPools/test/providers/test';
process.env.BOOKING_REQUESTS_ENABLED = 'true';
process.env.VERCEL_OIDC_TOKEN = `${Buffer.from('{}').toString('base64url')}.${Buffer.from(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 3600 })).toString('base64url')}.test-signature`;
process.env.BOOKING_ADMIN_TOKEN = 'a'.repeat(64);
const input = { requestId: '3f2b8c1e-5d0a-4c7e-b1f2-8e6a0c4d9a7d', name: 'Test Customer', email: 'test@example.com', phone: '5135550100', address: '123 Test St', serviceType: 'Maintenance', date: '2027-01-11', time: '10:00', message: 'Test only', website: '', acknowledge: true };
const id = createHash('sha256').update(input.requestId).digest('hex');
const json = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });
function fakeFetch(handler) { globalThis.fetch = async (url, init) => String(url).includes('sts.googleapis.com') ? json({ access_token: 'federated-test-token' }) : String(url).includes('iamcredentials.googleapis.com') ? json({ accessToken: 'calendar-test-token' }) : handler(String(url), init); }

test('missing configuration fails closed and the review key is mandatory', async () => {
  assert.equal(bookingConfigured(), true);
  assert.equal(isBookingAdmin(null), false);
  assert.equal(isBookingAdmin('Bearer wrong'), false);
  assert.equal(isBookingAdmin(`Bearer ${'a'.repeat(64)}`), true);
  delete process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  await assert.rejects(createServiceRequest(input, new Date()), { status: 503 });
  process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL = 'test@example.iam.gserviceaccount.com';
});

test('submission saves a private pending request without inviting the customer or blocking time', async () => {
  fakeFetch((url, init) => {
    if (!init?.method) return json({ items: [] }); // capacity check
    const event = JSON.parse(init.body);
    assert.equal(init.method, 'POST'); assert.match(url, /sendUpdates=none/);
    assert.equal(event.status, 'tentative'); assert.equal(event.visibility, 'private');
    assert.equal(event.transparency, 'transparent'); assert.equal(event.attendees, undefined);
    assert.equal(event.extendedProperties.private.state, 'pending');
    return json({ id: event.id });
  });
  assert.equal(await createServiceRequest(input, new Date('2027-01-11T15:00:00Z')), id);
});

test('upstream errors cannot produce a received confirmation', async () => {
  fakeFetch(() => json({ error: 'unavailable' }, 500));
  await assert.rejects(createServiceRequest(input, new Date()), { status: 503 });
  fakeFetch(() => json({}));
  await assert.rejects(createServiceRequest(input, new Date()), { status: 503 });
});

test('retry is idempotent and cannot overwrite different request details', async () => {
  const fingerprint = createHash('sha256').update(JSON.stringify(input)).digest('hex');
  fakeFetch((url, init) => init?.method === 'POST' ? json({}, 409) : json({ id, extendedProperties: { private: { fingerprint, state: "pending" } } }));
  assert.equal(await createServiceRequest(input, new Date()), id);
  await assert.rejects(createServiceRequest({ ...input, name: 'Different Name' }, new Date()), { status: 409 });
});

function pending() { return { id, etag: 'v1', summary: '[PENDING] Maintenance', start: { dateTime: '2099-01-12T15:00:00Z' }, end: { dateTime: '2099-01-12T16:00:00Z' }, extendedProperties: { private: { app: 'service-first-booking', state: 'pending' } } }; }

test('approval refuses stale decisions, non-booking events, and busy times', async () => {
  fakeFetch(() => json(pending()));
  await assert.rejects(reviewServiceRequest(id, 'old', 'approve'), { status: 409 });
  fakeFetch(() => json({ ...pending(), extendedProperties: {} }));
  await assert.rejects(reviewServiceRequest(id, 'v1', 'approve'), { status: 409 });
  fakeFetch((url) => url.includes('timeMin=') ? json({ items: [{ id: 'busy', status: 'confirmed' }] }) : json(pending()));
  await assert.rejects(reviewServiceRequest(id, 'v1', 'approve'), { status: 409 });
});

test('approval checks conflicts and conditionally changes only the reviewed event to confirmed', async () => {
  let patched = false;
  fakeFetch((url, init) => {
    if (init?.method === 'PATCH') {
      patched = true;
      assert.equal(init.headers['If-Match'], 'v1');
      const event = JSON.parse(init.body);
      assert.equal(event.status, 'confirmed'); assert.equal(event.transparency, 'opaque');
      assert.equal(event.extendedProperties.private.state, 'approved');
      return json({ ...pending(), ...event });
    }
    return url.includes('timeMin=') ? json({ items: [] }) : json(pending());
  });
  await reviewServiceRequest(id, 'v1', 'approve'); assert.equal(patched, true);
});

test('declining keeps the request visible and Google concurrency failures are reported', async () => {
  fakeFetch((url, init) => {
    if (init?.method === 'PATCH') { assert.equal(JSON.parse(init.body).status, 'tentative'); return json({}, 412); }
    return json(pending());
  });
  await assert.rejects(reviewServiceRequest(id, 'v1', 'decline'), { status: 409 });
});

 test('retry after approval cannot misreport a reviewed appointment as pending', async () => {
 const fingerprint = createHash('sha256').update(JSON.stringify(input)).digest('hex');
 fakeFetch((url, init) => init?.method === 'POST' ? json({}, 409) : json({ id, status: 'confirmed', extendedProperties: { private: { fingerprint, state: 'approved' } } }));
 await assert.rejects(createServiceRequest(input, new Date()), { status: 409 });
});

test('declined requests stay on the calendar, non-blocking, and are listed for staff', async () => {
  let listed;
  fakeFetch((url, init) => {
    if (init?.method === 'PATCH') {
      const event = JSON.parse(init.body);
      assert.equal(event.status, 'tentative'); assert.equal(event.transparency, 'transparent');
      assert.equal(event.extendedProperties.private.state, 'declined'); assert.match(event.summary, /^\[DECLINED\]/);
      return json({ ...pending(), ...event });
    }
    if (url.includes('privateExtendedProperty')) { listed = new URL(url).searchParams.getAll('privateExtendedProperty'); return json({ items: [] }); }
    return json(pending());
  });
  const saved = await reviewServiceRequest(id, 'v1', 'decline');
  assert.equal(saved.extendedProperties.private.state, 'declined');
  await listServiceRequests(undefined, 'declined');
  assert.ok(listed.includes('state=declined'));
});

test('public submissions are capped so a script cannot flood the calendar', async () => {
  let posted = 0;
  const other = (n, extra = {}) => ({ id: `other${n}`, extendedProperties: { private: { app: 'service-first-booking', state: 'pending', email: `x${n}@example.com`, phone: `51355501${String(n).padStart(2, '0')}`, ...extra } } });
  const run = (items, page = {}) => { posted = 0; fakeFetch((url, init) => { if (init?.method === 'POST') { posted++; return json({ id: JSON.parse(init.body).id }); } return json({ items, ...page }); }); };

  process.env.BOOKING_MAX_PENDING = '5';
  run([1, 2, 3, 4, 5].map((n) => other(n)));
  await assert.rejects(createServiceRequest(input, new Date()), { status: 429 });
  run([other(1)], { nextPageToken: 'more' });
  await assert.rejects(createServiceRequest(input, new Date()), { status: 429 });
  assert.equal(posted, 0);

  run([1, 2, 3].map((n) => other(n, { email: 'TEST@example.com ' })));
  await assert.rejects(createServiceRequest(input, new Date()), { status: 429 });
  run([1, 2, 3].map((n) => other(n, { phone: '(513) 555-0100' })));
  await assert.rejects(createServiceRequest(input, new Date()), { status: 429 });
  assert.equal(posted, 0);

  run([1, 2].map((n) => other(n, { email: 'test@example.com' })));
  assert.equal(await createServiceRequest(input, new Date()), id);
  run([1, 2, 3, 4].map((n) => other(n)).concat({ id, extendedProperties: { private: { state: 'pending' } } }));
  assert.equal(await createServiceRequest(input, new Date()), id, 'a retry of an already-saved request is not blocked by the cap');
  delete process.env.BOOKING_MAX_PENDING;
});
