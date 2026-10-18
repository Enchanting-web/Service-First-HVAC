import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * Legacy contact endpoint. Service appointments are booked through Google's
 * embedded booking page; this endpoint must not acknowledge unrecorded bookings.
 *
 * TODO: send these somewhere. Drop in Resend (or the provider of your choice)
 * where sendNotification is called below and set the API key in the
 * environment; nothing else in the app needs to change.
 */

const serviceRequest = z.object({
  intent: z.literal("service"),
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(10, "Please enter a phone number we can reach you at.")
    .max(30),
  address: z.string().trim().max(200).optional().or(z.literal("")),
  serviceType: z.string().trim().min(1, "Please choose a service type."),
  timing: z.string().trim().min(1, "Please choose a preferred timing."),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

const newsletterSignup = z.object({
  intent: z.literal("newsletter"),
  email: z.string().trim().email("Please enter a valid email address."),
});

const payload = z.discriminatedUnion("intent", [serviceRequest, newsletterSignup]);

export type ContactPayload = z.infer<typeof payload>;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const parsed = payload.safeParse(body);
  if (!parsed.success) {
    const fieldErrors = Object.fromEntries(
      Object.entries(z.flattenError(parsed.error).fieldErrors).map(([field, messages]) => [
        field,
        messages?.[0] ?? "This field is invalid.",
      ]),
    );
    return NextResponse.json(
      { ok: false, error: "Please double-check the highlighted fields.", fieldErrors },
      { status: 422 },
    );
  }

  if (parsed.data.intent === "service") {
    return NextResponse.json(
      { ok: false, error: "Please use the appointment calendar or call us to book service." },
      { status: 503 },
    );
  }

  await sendNotification(parsed.data);

  return NextResponse.json({
    ok: true,
    message: "You're on the list.",
  });
}

/** Placeholder delivery step. Replace the log with a real email/CRM call. */
async function sendNotification(data: ContactPayload) {
  console.info("[contact] received submission", {
    intent: data.intent,
    email: data.email,
    receivedAt: new Date().toISOString(),
  });
}
