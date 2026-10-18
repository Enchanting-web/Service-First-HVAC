import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { site } from "@/content/site";

/** Google owns availability, appointment details, and booking confirmation. */
export function ContactForm({ bookingUrl }: { bookingUrl: string | null }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-hairline bg-surface shadow-card">
      <div className="border-b border-hairline p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-flame-700 text-white">
            <Icon name="calendar-check" className="size-6" />
          </span>
          <div>
            <p className="eyebrow">Service First appointments</p>
            <h3 className="mt-1 text-xl">A time that works for you.</h3>
          </div>
        </div>
        <ol className="mt-7 grid gap-4 text-sm text-body sm:grid-cols-3">
          {["Choose an open time", "Add your service details", "Confirm your appointment"].map((step, index) => (
            <li key={step} className="flex items-start gap-2.5">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-flame-700/50 bg-flame-700/10 text-xs font-bold text-flame-500">
                {index + 1}
              </span>
              <span className="pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {bookingUrl ? (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 text-sm sm:px-8">
            <span className="flex items-center gap-2 text-body">
              <Icon name="clock" className="size-4 text-flame-500" />
              Choose from the available appointments below
            </span>
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-flame-500 underline underline-offset-4">
              Open booking page
            </a>
          </div>
          <div className="bg-white">
            <iframe
              title="Book a Service First service appointment with Google Calendar"
              src={bookingUrl}
              className="h-[760px] w-full border-0 sm:h-[800px]"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
          <p className="px-6 py-4 text-sm leading-relaxed text-muted sm:px-8">
            Complete your booking in the calendar above. Your appointment is booked only after Google shows your confirmation.
            If the calendar doesn&apos;t load, use the booking-page link or call us.
          </p>
        </>
      ) : (
        <div className="px-6 py-10 text-center sm:px-8">
          <Icon name="calendar" className="mx-auto size-10 text-flame-500" />
          <h3 className="mt-4 text-xl">Online appointment booking is coming soon</h3>
          <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted">
            Call our team to find an appointment and tell us what your system needs.
          </p>
          <ButtonLink href={site.phone.href} className="mt-6">
            <Icon name="phone" className="size-4" />
            {site.phone.display}
          </ButtonLink>
        </div>
      )}

      <div className="flex items-start gap-3 border-t border-hairline bg-ink px-6 py-5 sm:px-8">
        <Icon name="siren" className="mt-0.5 size-5 shrink-0 text-flame-500" />
        <p className="text-sm leading-relaxed text-body">
          <strong className="text-white">Need urgent help?</strong> Call{" "}
          <a href={site.phone.href} className="font-semibold text-flame-500">{site.phone.display}</a>
          {" "}for emergency service.
        </p>
      </div>
    </div>
  );
}
