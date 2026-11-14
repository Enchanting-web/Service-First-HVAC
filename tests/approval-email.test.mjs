import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import { sendApprovalEmail } from '../src/lib/approval-email.ts';
const originalFetch = globalThis.fetch;
const originalKey = process.env.RESEND_API_KEY;
after(() => { globalThis.fetch = originalFetch; if (originalKey === undefined) delete process.env.RESEND_API_KEY; else process.env.RESEND_API_KEY = originalKey; });
const event = { id: 'test-id', summary: '[APPROVED] Maintenance', location: 'Test address', start: { dateTime: '2027-01-11T15:00:00Z' }, extendedProperties: { private: { email: 'test@example.invalid' } } };
test('missing credentials do not claim email success', async () => { delete process.env.RESEND_API_KEY; assert.equal(await sendApprovalEmail(event), 'not_configured'); });
test('confirmation uses the stored customer email, Eastern time and a stable idempotency key', async () => {
 process.env.RESEND_API_KEY = 'test';
 globalThis.fetch = async (url, init) => { assert.equal(url, 'https://api.resend.com/emails'); assert.equal(init.headers['Idempotency-Key'], 'appointment-approval/test-id'); const body = JSON.parse(init.body); assert.deepEqual(body.to, ['test@example.invalid']); assert.match(body.text, /10:00 AM Eastern/); return Response.json({ id: 'test-message' }); };
 assert.equal(await sendApprovalEmail(event), 'accepted');
});
test('provider errors and ambiguous responses are not reported as sent', async () => {
 globalThis.fetch = async () => Response.json({}, { status: 500 }); assert.equal(await sendApprovalEmail(event), 'failed');
 globalThis.fetch = async () => Response.json({}); assert.equal(await sendApprovalEmail(event), 'failed');
 globalThis.fetch = async () => { throw new Error('timeout'); }; assert.equal(await sendApprovalEmail(event), 'failed');
});
