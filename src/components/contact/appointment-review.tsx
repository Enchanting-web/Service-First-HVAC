"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";

type Item = { id: string; etag: string; summary: string; description?: string; location?: string; htmlLink?: string; start: { dateTime?: string } };

export function AppointmentReview() {
  const [key, setKey] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [pageToken, setPageToken] = useState<string>();
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [confirmation, setConfirmation] = useState<{ item: Item; action: "approve" | "decline" } | null>(null);
  const [textDraft, setTextDraft] = useState<{ phone: string; body: string } | null>(null);

  async function load(token?: string) {
    const response = await fetch(`/api/appointments/review${token ? `?pageToken=${encodeURIComponent(token)}` : ""}`, { headers: { Authorization: `Bearer ${key}` }, cache: "no-store" });
    const data = await response.json();
    if (!response.ok) { if (response.status === 401) { setSignedIn(false); setItems([]); } throw new Error(data.error); }
    setItems((previous) => token ? [...previous, ...data.items] : data.items);
    setPageToken(data.nextPageToken);
    setSignedIn(true);
  }

  async function login(event: FormEvent) {
    event.preventDefault(); setBusy(true); setNotice("");
    try { await load(); } catch (error) { setNotice(error instanceof Error ? error.message : "Could not load requests."); } finally { setBusy(false); }
  }

  async function review(item: Item, action: "approve" | "decline") {
    setConfirmation(null);
    setBusy(true); setNotice("");
    try {
      const response = await fetch("/api/appointments/review", { method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" }, body: JSON.stringify({ id: item.id, etag: item.etag, action }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setNotice(data.message);
      if (action === "approve") {
        const raw = item.description?.match(/^Phone: (.+)$/m)?.[1] || "";
        let phone = raw.replace(/[^0-9+]/g, "");
        if (/^\d{10}$/.test(phone)) phone = `+1${phone}`;
        if (/^\+?\d{10,15}$/.test(phone) && item.start.dateTime) {
          const time = new Intl.DateTimeFormat("en-US", { timeZone: "America/New_York", dateStyle: "full", timeStyle: "short" }).format(new Date(item.start.dateTime));
          setTextDraft({ phone, body: `Your Service First Heating & Air appointment is confirmed for ${time} Eastern. Questions? Call (513) 268-7290.` });
        }
      }
      await load();
    } catch (error) { setNotice(error instanceof Error ? error.message : "Could not save decision. Refresh to check the current status."); } finally { setBusy(false); }
  }

  return <div className="mt-8">
    {!signedIn ? <form onSubmit={login} className="rounded-xl border border-hairline bg-surface p-6"><label className="block text-sm text-body" htmlFor="team-key">Team access key</label><input id="team-key" type="password" autoComplete="off" required value={key} onChange={(event) => setKey(event.target.value)} className="mt-2 w-full rounded-lg border border-hairline-strong bg-ink p-3 text-white" /><p className="mt-2 text-xs text-muted">Your key stays in memory for this page session. Reload or sign out when finished.</p><Button className="mt-5" disabled={busy} type="submit">{busy ? "Connecting…" : "View requests"}</Button></form> : <>
      <div className="mb-6 flex gap-3"><Button disabled={busy} onClick={login}>Refresh</Button><Button variant="outline" disabled={busy} onClick={() => { setKey(""); setItems([]); setSignedIn(false); setNotice(""); setTextDraft(null); }}>Sign out</Button></div>
      {items.length === 0 && <p className="rounded-xl border border-hairline p-6 text-body">No pending service requests.</p>}
      <div className="space-y-5">{items.map((item) => <article key={item.id} className="rounded-xl border border-hairline bg-surface p-6"><p className="eyebrow">Pending approval</p><h2 className="mt-2 text-xl">{item.summary.replace(/^\[PENDING\]\s*/, "")}</h2><p className="mt-3 font-semibold text-white">{item.start.dateTime ? new Intl.DateTimeFormat("en-US", { timeZone: "America/New_York", dateStyle: "full", timeStyle: "short" }).format(new Date(item.start.dateTime)) : "Time unavailable"} Eastern</p><p className="mt-2 text-sm text-muted">One hour is reserved on approval. Adjust the duration in Calendar if this service needs longer.</p><pre className="mt-4 whitespace-pre-wrap break-words font-sans text-sm leading-relaxed text-body">{item.description}</pre><div className="mt-5 flex flex-wrap gap-3"><Button disabled={busy} onClick={() => setConfirmation({ item, action: "approve" })}>Approve time</Button><Button variant="outline" disabled={busy} onClick={() => setConfirmation({ item, action: "decline" })}>Decline request</Button>{item.htmlLink?.startsWith("https://www.google.com/calendar/") && <a href={item.htmlLink} target="_blank" rel="noopener noreferrer" className="self-center text-sm text-flame-500 underline">View in Calendar</a>}</div></article>)}</div>
      {pageToken && <Button variant="outline" className="mt-6" disabled={busy} onClick={async () => { setBusy(true); try { await load(pageToken); } catch { setNotice("Could not load more requests."); } finally { setBusy(false); } }}>Load more</Button>}
    </>}
    {signedIn && confirmation && <div role="alertdialog" aria-modal="false" aria-labelledby="review-confirm-title" aria-describedby="review-confirm-description" className="fixed inset-x-4 bottom-6 z-50 mx-auto max-w-xl rounded-xl border border-flame-500 bg-surface p-6 shadow-xl"><h2 id="review-confirm-title" className="text-xl">{confirmation.action === "approve" ? "Approve this appointment?" : "Decline this request?"}</h2><p id="review-confirm-description" className="mt-3 text-sm text-body">{confirmation.item.summary.replace(/^\[PENDING\]\s*/, "")}<br />{confirmation.action === "approve" ? "This saves the appointment and attempts a confirmation email. You can text the customer afterward." : "The customer will need to be contacted to arrange another time."}</p><div className="mt-5 flex gap-3"><Button disabled={busy} onClick={() => review(confirmation.item, confirmation.action)}>{confirmation.action === "approve" ? "Confirm approval" : "Confirm decline"}</Button><Button variant="outline" onClick={() => setConfirmation(null)}>Cancel</Button></div></div>}
    {textDraft && <div className="mt-5 rounded-lg border border-hairline-strong bg-surface p-5"><h2 className="font-semibold">Text the approved customer</h2><p className="mt-2 text-sm text-body">{textDraft.body}</p><a className="mt-4 inline-block font-semibold text-flame-500 underline" href={`sms:${textDraft.phone}&body=${encodeURIComponent(textDraft.body)}`}>Open Messages for {textDraft.phone}</a><p className="mt-2 text-xs text-muted">Review the message and tap Send. Message prefilling depends on your device; copy the text above if needed.</p><button type="button" className="mt-3 text-sm underline" onClick={() => setTextDraft(null)}>Dismiss</button></div>}
    {notice && <p className="mt-5 rounded-lg border border-hairline-strong p-4 text-body" role="status">{notice}</p>}
  </div>;
}
