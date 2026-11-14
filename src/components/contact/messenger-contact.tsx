export function MessengerContact() {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-hairline bg-surface p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
      <div>
        <p className="eyebrow">Let&apos;s talk</p>
        <h2 className="mt-2 text-xl">Prefer to message us?</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">Reach out to Service First on Facebook Messenger.</p>
      </div>
      <iframe
        title="Message Service First on Facebook Messenger"
        width="150"
        height="50"
        style={{ border: 0 }}
        className="shrink-0"
        src="https://static.zdassets.com/message-us/meta/index.html?channel=messenger&color=white&size=standard&radius=10px&label=Message%20Us&pageId=1281670035032095"
      />
    </div>
  );
}
