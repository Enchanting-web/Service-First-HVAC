import assert from 'node:assert/strict';
import { test } from 'node:test';
import { getBookingUrl } from '../src/lib/booking.ts';

const original = process.env.GOOGLE_CALENDAR_BOOKING_URL;

test('booking stays unavailable without a Google appointment schedule URL', () => {
  try {
    for (const value of ['', 'not a URL', 'https://example.com/calendar/appointments/schedules/demo',
      'https://calendar.google.com.example.com/calendar/appointments/schedules/demo',
      'http://calendar.google.com/calendar/appointments/schedules/demo',
      'https://user:password@calendar.google.com/calendar/appointments/schedules/demo',
      'https://calendar.google.com/calendar/embed?src=private-calendar',
      'https://calendar.google.com/calendar/appointments/schedules/',
      'https://calendar.app.google/short-link']) {
      process.env.GOOGLE_CALENDAR_BOOKING_URL = value;
      assert.equal(getBookingUrl(), null, value);
    }
    delete process.env.GOOGLE_CALENDAR_BOOKING_URL;
    assert.equal(getBookingUrl(), null);
  } finally {
    if (original === undefined) delete process.env.GOOGLE_CALENDAR_BOOKING_URL;
    else process.env.GOOGLE_CALENDAR_BOOKING_URL = original;
  }
});

test('Google schedule links retain booking identity and use the inline embed mode', () => {
  try {
    for (const path of ['/calendar/appointments/schedules/example_123-abc',
      '/calendar/u/0/appointments/schedules/example_123-abc']) {
      process.env.GOOGLE_CALENDAR_BOOKING_URL = ` https://calendar.google.com${path}?gv=false `;
      const url = new URL(getBookingUrl());
      assert.equal(url.pathname, path);
      assert.equal(url.searchParams.get('gv'), 'true');
    }
  } finally {
    if (original === undefined) delete process.env.GOOGLE_CALENDAR_BOOKING_URL;
    else process.env.GOOGLE_CALENDAR_BOOKING_URL = original;
  }
});
