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
    if (!window.confirm(`${action === "approve" ? "Approve" : "Decline"} this request? You must contact the customer separately with your decision.`)) return;
    setBusy(true); setNotice("");
    try {
      const response = await fetch("/api/appointments/review", { method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" }, body: JSON.stringify({ id: item.id, etag: item.etag, action }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setNotice(data.message);
      await load();
    } catch (error) { setNotice(error instanceof Error ? error.message : "Could not save decision. Refresh to check the current status."); } finally { setBusy(false); }
  }

  return <div className="mt-8">
    {!signedIn ? <form onSubmit={login} className="rounded-xl border border-hairline bg-surface p-6"><label className="block text-sm text-body" htmlFor="team-key">Team access key</label><input id="team-key" type="password" autoComplete="off" required value={key} onChange={(event) => setKey(event.target.value)} className="mt-2 w-full rounded-lg border border-hairline-strong bg-ink p-3 text-white" /><p className="mt-2 text-xs text-muted">Your key stays in memory for this page session. Reload or sign out when finished.</p><Button className="mt-5" disabled={busy} type="submit">{busy ? "Connecting…" : "View requests"}</Button></form> : <>
      <div className="mb-6 flex gap-3"><Button disabled={busy} onClick={login}>Refresh</Button><Button variant="outline" disabled={busy} onClick={() => { setKey(""); setItems([]); setSignedIn(false); setNotice(""); }}>Sign out</Button></div>
      {items.length === 0 && <p className="rounded-xl border border-hairline p-6 text-body">No pending service requests.</p>}
      <div className="space-y-5">{items.map((item) => <article key={item.id} className="rounded-xl border border-hairline bg-surface p-6"><p className="eyebrow">Pending approval</p><h2 className="mt-2 text-xl">{item.summary.replace(/^\[PENDING\]\s*/, "")}</h2><p className="mt-3 font-semibold text-white">{item.start.dateTime ? new Intl.DateTimeFormat("en-US", { timeZone: "America/New_York", dateStyle: "full", timeStyle: "short" }).format(new Date(item.start.dateTime)) : "Time unavailable"} Eastern</p><p className="mt-2 text-sm text-muted">One hour is reserved on approval. Adjust the duration in Calendar if this service needs longer.</p><pre className="mt-4 whitespace-pre-wrap break-words font-sans text-sm leading-relaxed text-body">{item.description}</pre><div className="mt-5 flex flex-wrap gap-3"><Button disabled={busy} onClick={() => review(item, "approve")}>Approve time</Button><Button variant="outline" disabled={busy} onClick={() => review(item, "decline")}>Decline request</Button>{item.htmlLink?.startsWith("https://www.google.com/calendar/") && <a href={item.htmlLink} target="_blank" rel="noopener noreferrer" className="self-center text-sm text-flame-500 underline">View in Calendar</a>}</div></article>)}</div>
      {pageToken && <Button variant="outline" className="mt-6" disabled={busy} onClick={async () => { setBusy(true); try { await load(pageToken); } catch { setNotice("Could not load more requests."); } finally { setBusy(false); } }}>Load more</Button>}
    </>}
    {notice && <p className="mt-5 rounded-lg border border-hairline-strong p-4 text-body" role="status">{notice}</p>}
  </div>;
}
