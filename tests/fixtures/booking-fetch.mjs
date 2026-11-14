// Synthetic Google responses for the verifier subprocess; no network is used.
import assert from 'node:assert/strict';
const events = new Map();
let calendarPath;
let deleted = 0;
const json = (data, status = 200) => new Response(JSON.stringify(data), { status });
process.env.VERCEL_OIDC_TOKEN = `${Buffer.from('{}').toString('base64url')}.${Buffer.from(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 3600 })).toString('base64url')}.test`;
globalThis.fetch = async (url, init = {}) => {
  const target = new URL(url);
  if (target.hostname === 'sts.googleapis.com') return json({ access_token: 'test' });
  if (target.hostname === 'iamcredentials.googleapis.com') return json({ accessToken: 'test' });
  assert.equal(target.hostname, 'www.googleapis.com');
  const [base, id] = target.pathname.split('/events');
  calendarPath ??= base;
  assert.equal(base, calendarPath, 'cleanup must use the runtime calendar');
  assert.equal(init.headers.Authorization, 'Bearer test');
  if (init.method === 'POST') {
    const event = JSON.parse(init.body);
    if (events.has(event.id)) return json({}, 409);
    events.set(event.id, { ...event, etag: 'v1' });
    return json(events.get(event.id));
  }
  const key = id.slice(1);
  if (init.method === 'DELETE') {
    assert.equal(events.delete(key), true);
    deleted++;
    return new Response(null, { status: 204 });
  }
  if (init.method === 'PATCH') {
    events.set(key, { ...events.get(key), ...JSON.parse(init.body), etag: 'v2' });
    return json(events.get(key));
  }
  if (key) return json(events.get(key));
  return json({ items: [...events.values()].filter(event => target.searchParams.has('timeMin') || target.searchParams.getAll('privateExtendedProperty').includes(`state=${event.extendedProperties.private.state}`)) });
};
process.on('exit', () => {
  assert.equal(deleted, 2, 'both temporary events must be cleaned up');
  assert.equal(events.size, 0);
});
