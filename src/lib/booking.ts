/** Use the public iframe URL from Google Calendar's Inline booking page embed. */
export function getBookingUrl(): string | null {
  const value = process.env.GOOGLE_CALENDAR_BOOKING_URL?.trim();
  if (!value) return null;

  try {
    const url = new URL(value);
    if (
      url.protocol !== "https:" ||
      url.hostname !== "calendar.google.com" ||
      url.port || url.username || url.password ||
      !/^\/calendar\/(?:u\/\d+\/)?appointments\/schedules\/[A-Za-z0-9_-]+\/?$/.test(url.pathname)
    ) return null;

    url.searchParams.set("gv", "true");
    return url.toString();
  } catch {
    return null;
  }
}
