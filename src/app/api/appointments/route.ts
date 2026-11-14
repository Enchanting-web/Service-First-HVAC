import { NextResponse } from "next/server";
import { appointmentStart, serviceRequestSchema } from "@/lib/service-request";
import { BookingError, bookingConfigured, createServiceRequest } from "@/lib/google-booking";

export async function GET() {
  return NextResponse.json({ available: bookingConfigured() }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin) return NextResponse.json({ error: "Please submit this form from our website." }, { status: 403 });
  try {
    const text = await request.text();
    if (text.length > 16000) return NextResponse.json({ error: "Request is too large." }, { status: 413 });
    let body: unknown;
    try { body = JSON.parse(text); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
    const parsed = serviceRequestSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message || "Check the form details." }, { status: 422 });
    const id = await createServiceRequest(parsed.data, appointmentStart(parsed.data.date, parsed.data.time));
    return NextResponse.json({ id, status: "pending", message: "Request received. Your appointment is pending approval. Our team will contact you to confirm a time." }, { status: 201, headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return NextResponse.json({ error: error instanceof BookingError ? error.message : "We couldn't verify that your request was saved. Retry with the same details or call our team." }, { status: error instanceof BookingError ? error.status : 503 });
  }
}
