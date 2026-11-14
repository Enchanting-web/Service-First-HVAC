type ApprovedVisit = { id: string; summary: string; location?: string; start: { dateTime?: string }; extendedProperties?: { private?: Record<string, string> } };

/** Accepted means Resend queued the email, not proof of inbox delivery. */
export async function sendApprovalEmail(event: ApprovedVisit): Promise<"accepted" | "failed" | "not_configured"> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return "not_configured";
  const recipient = event.extendedProperties?.private?.email;
  if (!recipient || !event.start.dateTime) return "failed";
  const time = new Intl.DateTimeFormat("en-US", { timeZone: "America/New_York", dateStyle: "full", timeStyle: "short" }).format(new Date(event.start.dateTime));
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json", "Idempotency-Key": `appointment-approval/${event.id}` },
      body: JSON.stringify({ from: "Service First Heating & Air <appointments@hvacservicefirst.com>", reply_to: "office@hvacservicefirst.com", to: [recipient], subject: "Your Service First appointment is confirmed", text: `Your Service First Heating & Air appointment is confirmed for ${time} Eastern.\n\nService: ${event.summary.replace(/^\[APPROVED\]\s*/, "")}\nAddress: ${event.location || "As provided in your request"}\n\nTo ask a question or request a change, reply to this email or call (513) 268-7290.\n\nThank you for choosing Service First Heating & Air!` }),
      signal: AbortSignal.timeout(15000), cache: "no-store",
    });
    if (!response.ok) return "failed";
    const result = await response.json();
    return typeof result.id === "string" ? "accepted" : "failed";
  } catch { return "failed"; }
}
