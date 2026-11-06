import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtemp, mkdir, copyFile, writeFile, readFile, rm, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const configure = new URL('../scripts/configure-booking.mjs', import.meta.url);
const verify = fileURLToPath(new URL('../scripts/verify-google-booking.mjs', import.meta.url));
const fixture = fileURLToPath(new URL('./fixtures/booking-fetch.mjs', import.meta.url));

test('configuration preserves connections on rerun and fills a missing calendar', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'booking-config-'));
  try {
    await mkdir(join(dir, 'scripts'));
    const script = join(dir, 'scripts/configure-booking.mjs');
    await copyFile(configure, script);
    const original = 'GOOGLE_SERVICE_ACCOUNT_EMAIL="custom@example.invalid"\nGOOGLE_WORKLOAD_IDENTITY_PROVIDER="custom-provider"\nGOOGLE_BOOKING_CALENDAR_ID="custom-calendar"\nBOOKING_REQUESTS_ENABLED=true\nBOOKING_ADMIN_TOKEN="existing-token"\nOTHER=value\n';
    const envPath = join(dir, '.env.local');
    await writeFile(envPath, original);
    for (let run = 0; run < 2; run++) {
      assert.equal(spawnSync(process.execPath, [script]).status, 0);
      assert.equal(await readFile(envPath, 'utf8'), original);
    }
    await writeFile(envPath, original.replace(/^GOOGLE_BOOKING_CALENDAR_ID=.*\n/m, ''));
    assert.equal(spawnSync(process.execPath, [script]).status, 0);
    const filled = await readFile(envPath, 'utf8');
    assert.match(filled, /^GOOGLE_BOOKING_CALENDAR_ID="c_.+@group.calendar.google.com"$/m);
    assert.ok(filled.includes('GOOGLE_WORKLOAD_IDENTITY_PROVIDER="custom-provider"'));
    assert.equal((await stat(envPath)).mode & 0o777, 0o600);
  } finally { await rm(dir, { recursive: true, force: true }); }
});

for (const calendar of [undefined, 'override@example.invalid']) {
  test(`verifier loads TypeScript and cleans up with ${calendar ? 'an override' : 'the default calendar'}`, async () => {
    const dir = await mkdtemp(join(tmpdir(), 'booking-verify-'));
    try {
      await writeFile(join(dir, '.env.local'), 'GOOGLE_SERVICE_ACCOUNT_EMAIL=test@example.invalid\nGOOGLE_WORKLOAD_IDENTITY_PROVIDER=test-provider\nBOOKING_ADMIN_TOKEN=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\n');
      const env = { ...process.env };
      for (const key of Object.keys(env)) if (/^(GOOGLE_|BOOKING_|VERCEL_)/.test(key)) delete env[key];
      if (calendar) env.GOOGLE_BOOKING_CALENDAR_ID = calendar;
      const result = spawnSync(process.execPath, ['--import', fixture, verify, '--live'], { cwd: dir, env, encoding: 'utf8', timeout: 30000 });
      assert.equal(result.status, 0, result.stdout + result.stderr);
      assert.match(result.stdout, /Live decline: PASS/);
      assert.equal(result.stdout.match(/Temporary test event removed/g)?.length, 2);
    } finally { await rm(dir, { recursive: true, force: true }); }
  });
}
