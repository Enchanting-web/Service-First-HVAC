import type { Metadata } from "next";
import { AppointmentReview } from "@/components/contact/appointment-review";

export const metadata: Metadata = { title: "Review Service Requests", robots: { index: false, follow: false } };

export default function AppointmentReviewPage() {
  return <section className="container-page py-16"><div className="mx-auto max-w-3xl"><p className="eyebrow">Service First team</p><h1 className="mt-3 text-3xl">Review service requests</h1><p className="mt-3 text-body">Requests are pending until you approve them. Check travel time and service-area coverage, then contact the customer with your decision.</p><AppointmentReview /></div></section>;
}
