import { z } from "zod";

export const serviceTypes = ["AC Repair", "Furnace Repair", "New System Install", "Maintenance", "Indoor Air Quality", "Commercial HVAC", "Diagnostic Visit", "Something else"] as const;
export const requestTimes = Array.from({ length: 9 }, (_, i) => `${String(i + 8).padStart(2, "0")}:00`);
export const bookingTimeZone = "America/New_York";

export function localDate(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: bookingTimeZone, year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}

export function appointmentStart(date: string, time: string) {
  const base = new Date(`${date}T${time}:00Z`);
  const parts = Object.fromEntries(new Intl.DateTimeFormat("en-US", {
    timeZone: bookingTimeZone, year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23",
  }).formatToParts(base).map(({ type, value }) => [type, value]));
  const wallClock = Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day), Number(parts.hour), Number(parts.minute), Number(parts.second));
  return new Date(base.getTime() * 2 - wallClock);
}

export function validPreference(date: string, time: string, now = new Date()) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !requestTimes.includes(time)) return false;
  const day = new Date(`${date}T12:00:00Z`);
  if (Number.isNaN(day.getTime()) || day.toISOString().slice(0, 10) !== date || [0, 6].includes(day.getUTCDay())) return false;
  const start = appointmentStart(date, time);
  return start > now && start.getTime() <= now.getTime() + 90 * 86400000;
}

export const serviceRequestSchema = z.object({
  requestId: z.uuid(),
  name: z.string().trim().min(2).max(120),
  email: z.email().max(254),
  phone: z.string().trim().min(10).max(30).refine((value) => value.replace(/\D/g, "").length >= 10),
  address: z.string().trim().min(8).max(300),
  serviceType: z.enum(serviceTypes),
  date: z.string(),
  time: z.string(),
  message: z.string().trim().max(2000).default(""),
  website: z.string().max(0).default(""),
  acknowledge: z.literal(true),
}).refine((value) => validPreference(value.date, value.time), {
  message: "Choose a future weekday within 90 days, from 8 AM to 4 PM Eastern.", path: ["date"],
});

export type ServiceRequest = z.infer<typeof serviceRequestSchema>;
