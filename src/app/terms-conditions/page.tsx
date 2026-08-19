import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/legal-document";
import { termsConditions } from "@/content/legal";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms that govern service, estimates, payment, warranties and communication with Service First Heating & Air.",
  alternates: { canonical: "/terms-conditions" },
};

export default function TermsConditionsPage() {
  return <LegalDocument document={termsConditions} />;
}
