import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/legal-document";
import { privacyPolicy } from "@/content/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Service First Heating & Air collects, uses and protects your information, including our SMS and mobile data practices.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return <LegalDocument document={privacyPolicy} />;
}
