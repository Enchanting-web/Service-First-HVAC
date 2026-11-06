import assert from 'node:assert/strict';
import { test } from 'node:test';
import { appointmentStart, validPreference, serviceRequestSchema } from '../src/lib/service-request.ts';

test('Eastern appointment times remain correct across daylight saving changes', () => {
  assert.equal(appointmentStart('2027-01-11', '08:00').toISOString(), '2027-01-11T13:00:00.000Z');
  assert.equal(appointmentStart('2027-07-12', '08:00').toISOString(), '2027-07-12T12:00:00.000Z');
});

test('preferences reject weekends, impossible dates, past times, out of hours and dates beyond 90 days', () => {
  const now = new Date('2027-01-04T12:00:00Z');
  assert.equal(validPreference('2027-01-04', '08:00', now), true);
  for (const [date, time] of [['2027-01-09', '08:00'], ['2027-02-30', '08:00'], ['2027-01-04', '07:00'], ['2027-01-04', '17:00'], ['2027-01-01', '08:00'], ['2027-05-03', '08:00']]) {
    assert.equal(validPreference(date, time, now), false, `${date} ${time}`);
  }
});

test('requests require contact details, acknowledgement and an empty honeypot', () => {
  const future = new Date(Date.now() + 7 * 86400000);
  while ([0, 6].includes(future.getUTCDay())) future.setUTCDate(future.getUTCDate() + 1);
  const valid = { requestId: '3f2b8c1e-5d0a-4c7e-b1f2-8e6a0c4d9a7d', name: 'Test Customer', email: 'test@example.com', phone: '5135550100', address: '123 Test St, Monroe OH 45050', serviceType: 'Maintenance', date: future.toISOString().slice(0, 10), time: '10:00', acknowledge: true };
  assert.equal(serviceRequestSchema.safeParse(valid).success, true);
  for (const patch of [{ acknowledge: false }, { address: '' }, { phone: 'not-a-number' }, { website: 'spam' }, { serviceType: 'Unknown' }]) {
    assert.equal(serviceRequestSchema.safeParse({ ...valid, ...patch }).success, false);
  }
});
