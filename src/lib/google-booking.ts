import { createHash, timingSafeEqual } from "node:crypto";
import type { ServiceRequest } from "./service-request";

export const selectedCalendar = "c_35678494ff6e81e220baa64def96be92bb70406ad87290f4ff2b64d9e01c132d@group.calendar.google.com";
const app = "service-first-booking";
type CalendarEvent = {
  id: string; etag: string; summary: string; description?: string; location?: string;
  status?: string; transparency?: string; htmlLink?: string;
  start: { dateTime?: string; date?: string }; end: { dateTime?: string; date?: string };
  extendedProperties?: { private?: Record<string, string> };
};

export class BookingError extends Error {
  status: number;
  constructor(status: number, message: string) { super(message); this.status = status; }
}

function calendarConfigured() {
  return Boolean(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_WORKLOAD_IDENTITY_PROVIDER && (process.env.BOOKING_ADMIN_TOKEN?.length ?? 0) >= 32);
}

export function bookingConfigured() {
  return process.env.BOOKING_REQUESTS_ENABLED === "true" && calendarConfigured();
}

export function isBookingAdmin(value: string | null) {
  const secret = process.env.BOOKING_ADMIN_TOKEN;
  if (!secret || secret.length < 32 || !value?.startsWith("Bearer ")) return false;
  const supplied = createHash("sha256").update(value.slice(7)).digest();
  return timingSafeEqual(supplied, createHash("sha256").update(secret).digest());
}

async function accessToken() {
  if (!calendarConfigured()) throw new BookingError(503, "Online requests are not connected yet. Please call our team.");
  const { getVercelOidcToken } = await import("@vercel/oidc");
  const oidcToken = await getVercelOidcToken({
    project: "prj_TVem1MCPcnSqOFrS6UICaeWBQ7R9", team: "enchanting-webs-projects",
  });
  const exchange = await fetch("https://sts.googleapis.com/v1/token", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grantType: "urn:ietf:params:oauth:grant-type:token-exchange",
      audience: process.env.GOOGLE_WORKLOAD_IDENTITY_PROVIDER,
      requestedTokenType: "urn:ietf:params:oauth:token-type:access_token",
      subjectTokenType: "urn:ietf:params:oauth:token-type:jwt",
      scope: "https://www.googleapis.com/auth/cloud-platform", subjectToken: oidcToken,
    }), cache: "no-store", signal: AbortSignal.timeout(15000),
  });
  if (!exchange.ok) throw new BookingError(503, "Calendar connection unavailable. Please try again or call our team.");
  const federated = await exchange.json();
  if (typeof federated.access_token !== "string") throw new BookingError(503, "Calendar connection unavailable.");
  const email = encodeURIComponent(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!);
  const response = await fetch(`https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/${email}:generateAccessToken`, {
    method: "POST", headers: { Authorization: `Bearer ${federated.access_token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ scope: ["https://www.googleapis.com/auth/calendar.events"], lifetime: "3600s" }),
    cache: "no-store", signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new BookingError(503, "Calendar connection unavailable. Please try again or call our team.");
  const data = await response.json();
  if (typeof data.accessToken !== "string") throw new BookingError(503, "Calendar connection unavailable.");
  return data.accessToken as string;
}

async function calendar(path: string, init: RequestInit = {}) {
  const token = await accessToken();
  const id = process.env.GOOGLE_BOOKING_CALENDAR_ID || selectedCalendar;
  return fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(id)}/events${path}`, {
    ...init, headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", ...init.headers },
    cache: "no-store", signal: AbortSignal.timeout(15000),
  });
}

async function eventResult(response: Response): Promise<CalendarEvent> {
  if (!response.ok) throw new BookingError(response.status === 412 ? 409 : 503,
    response.status === 412 ? "This request changed. Refresh before reviewing it again." : "Calendar could not save the request. Please try again or call our team.");
  return response.json();
}

const digits = (value?: string) => (value ?? "").replace(/\D/g, "").slice(-10);

// The public form cannot authenticate visitors, so bound how much any sender can
// add to the calendar: a global ceiling on unreviewed requests, and a small
// per-contact allowance. Pending events are the durable counter (no extra store).
async function assertCapacity(id: string, data: ServiceRequest) {
  const limit = Math.max(1, Number(process.env.BOOKING_MAX_PENDING) || 50);
  const query = new URLSearchParams({ privateExtendedProperty: `app=${app}`, maxResults: String(limit), showDeleted: "false" });
  query.append("privateExtendedProperty", "state=pending");
  const response = await calendar(`?${query}`);
  if (!response.ok) throw new BookingError(503, "Calendar could not save the request. Please try again or call our team.");
  const page = await response.json();
  const items: CalendarEvent[] = Array.isArray(page.items) ? page.items : [];
  if (items.some((event) => event.id === id)) return; // idempotent retry of a saved request
  if (page.nextPageToken || items.length >= limit) throw new BookingError(429, "We're receiving an unusually high number of online requests. Please call our team to schedule.");
  const email = data.email.trim().toLowerCase();
  const phone = digits(data.phone);
  const sameContact = items.filter(({ extendedProperties }) => {
    const saved = extendedProperties?.private;
    return saved?.email?.trim().toLowerCase() === email || (phone.length === 10 && digits(saved?.phone) === phone);
  }).length;
  if (sameContact >= 3) throw new BookingError(429, "You already have requests waiting for review. Our team will contact you soon, or call us for anything urgent.");
}

export async function createServiceRequest(data: ServiceRequest, start: Date) {
  if (!bookingConfigured()) throw new BookingError(503, "Online requests are not connected yet. Please call our team.");
  const id = createHash("sha256").update(data.requestId).digest("hex");
  await assertCapacity(id, data);
  const fingerprint = createHash("sha256").update(JSON.stringify(data)).digest("hex");
  const event = {
    id, summary: `[PENDING] ${data.serviceType} — ${data.name}`,
    description: `Appointment REQUEST — not confirmed.\nCustomer must be contacted after review.\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nService: ${data.serviceType}\nRequested time: ${data.date} ${data.time} America/New_York\nAddress: ${data.address}\n\n${data.message}`,
    location: data.address, visibility: "private", status: "tentative", transparency: "transparent",
    start: { dateTime: start.toISOString(), timeZone: "America/New_York" },
    end: { dateTime: new Date(start.getTime() + 3600000).toISOString(), timeZone: "America/New_York" },
    extendedProperties: { private: { app, state: "pending", fingerprint, email: data.email, phone: data.phone } },
  };
  const response = await calendar("?sendUpdates=none", { method: "POST", body: JSON.stringify(event) });
  if (response.status === 409) {
    const existing = await eventResult(await calendar(`/${id}`));
    if (existing.extendedProperties?.private?.fingerprint !== fingerprint) throw new BookingError(409, "This request was already submitted with different details. Start a new request.");
    if (existing.status === "cancelled" || existing.extendedProperties?.private?.state !== "pending") throw new BookingError(409, "This request has already been reviewed. Please contact our team for its current status.");
    return id;
  }
  const saved = await eventResult(response);
  if (saved.id !== id) throw new BookingError(503, "Could not verify the saved request. Please retry with the same details.");
  return id;
}

export type RequestState = "pending" | "declined";

export async function listServiceRequests(pageToken?: string, state: RequestState = "pending") {
  const query = new URLSearchParams({ privateExtendedProperty: `app=${app}`, maxResults: "100", showDeleted: "false" });
  query.append("privateExtendedProperty", `state=${state}`);
  if (pageToken) query.set("pageToken", pageToken);
  const response = await calendar(`?${query}`);
  if (!response.ok) throw new BookingError(503, "Could not load calendar requests.");
  const data = await response.json();
  return { items: (data.items ?? []) as CalendarEvent[], nextPageToken: data.nextPageToken as string | undefined };
}

export async function reviewServiceRequest(id: string, etag: string, action: "approve" | "decline") {
  const event = await eventResult(await calendar(`/${id}`));
  const properties = event.extendedProperties?.private;
  if (properties?.app !== app || properties.state !== "pending" || event.etag !== etag) throw new BookingError(409, "This request is no longer pending or has changed. Refresh the list.");
  if (action === "approve") {
    if (!event.start.dateTime || !event.end.dateTime || new Date(event.start.dateTime) <= new Date()) throw new BookingError(409, "The requested time has passed. Contact the customer to arrange another time.");
    const query = new URLSearchParams({ timeMin: event.start.dateTime, timeMax: event.end.dateTime, singleEvents: "true", maxResults: "2500" });
    const response = await calendar(`?${query}`);
    if (!response.ok) throw new BookingError(503, "Could not check calendar conflicts.");
    const busy = await response.json();
    if (busy.nextPageToken || busy.items?.some((item: CalendarEvent) => item.id !== id && item.status !== "cancelled" && item.transparency !== "transparent")) throw new BookingError(409, "This time conflicts with an existing calendar event. Contact the customer to arrange another time.");
  }
  const saved = await eventResult(await calendar(`/${id}?sendUpdates=none`, {
    method: "PATCH", headers: { "If-Match": etag }, body: JSON.stringify({
      summary: event.summary.replace(/^\[PENDING\]/, action === "approve" ? "[APPROVED]" : "[DECLINED]"),
      // A declined request stays on the calendar (tentative, non-blocking) so staff
      // can still see the customer's details; Google hides cancelled events.
      status: action === "approve" ? "confirmed" : "tentative",
      transparency: action === "approve" ? "opaque" : "transparent",
      extendedProperties: { private: { ...properties, state: action === "approve" ? "approved" : "declined" } },
    }),
  }));
  if (saved.id !== id || saved.status !== (action === "approve" ? "confirmed" : "tentative") || saved.extendedProperties?.private?.state !== (action === "approve" ? "approved" : "declined")) throw new BookingError(503, "Could not verify the decision. Refresh the requests before trying again.");
  return saved;
}
