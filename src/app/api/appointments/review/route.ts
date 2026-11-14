import { NextResponse } from "next/server";
import { z } from "zod";
import { sendApprovalEmail } from "@/lib/approval-email";
import { BookingError, isBookingAdmin, listServiceRequests, reviewServiceRequest } from "@/lib/google-booking";

function reply(data: unknown, status = 200) {
  return NextResponse.json(data, { status, headers: { "Cache-Control": "no-store" } });
}

export async function GET(request: Request) {
  if (!isBookingAdmin(request.headers.get("authorization"))) return reply({ error: "Enter your team access key." }, 401);
  try {
    const pageToken = new URL(request.url).searchParams.get("pageToken") || undefined;
    if ((pageToken?.length ?? 0) > 2048) return reply({ error: "Invalid page." }, 400);
    return reply(await listServiceRequests(pageToken));
  } catch { return reply({ error: "Could not load calendar requests. Check the connection and try again." }, 503); }
}

export async function POST(request: Request) {
  if (!isBookingAdmin(request.headers.get("authorization"))) return reply({ error: "Enter your team access key." }, 401);
  if (request.headers.get("origin") !== new URL(request.url).origin) return reply({ error: "Invalid origin." }, 403);
  try {
    const text = await request.text();
    if (text.length > 4000) return reply({ error: "Invalid request." }, 413);
    const result = z.object({ id: z.string().regex(/^[a-f0-9]{64}$/), etag: z.string().min(1).max(200), action: z.enum(["approve", "decline"]) }).safeParse(JSON.parse(text));
    if (!result.success) return reply({ error: "Invalid review." }, 400);
    const event = await reviewServiceRequest(result.data.id, result.data.etag, result.data.action);
    if (result.data.action === "decline") return reply({ message: "Declined. Contact the customer to arrange another time." });
    const emailStatus = await sendApprovalEmail(event);
    return reply({ emailStatus, message: emailStatus === "accepted"
      ? "Approved and saved to Google Calendar. Confirmation email accepted by the email service; inbox delivery is not yet verified."
      : emailStatus === "not_configured" ? "Approved and saved to Google Calendar. Email is not connected. Please text or call the customer."
      : "Approved and saved to Google Calendar, but the email attempt failed or could not be verified. Please text or call the customer." });
  } catch (error) { return reply({ error: error instanceof BookingError ? error.message : "Could not save the decision. Refresh before trying again." }, error instanceof BookingError ? error.status : 503); }
}
