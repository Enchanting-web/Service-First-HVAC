import { addressLines, site } from "./site";

/**
 * Privacy policy and terms, ported from the previous site with the business
 * name and contact details updated. The SMS compliance wording is carried over
 * verbatim because carriers vet it.
 */

export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
  callout?: { heading: string; items: string[] };
  definitions?: { term: string; body: string }[];
  contact?: boolean;
};

export type LegalDocument = {
  title: string;
  titleAccent: string;
  updated: string;
  sections: LegalSection[];
};

export const privacyPolicy: LegalDocument = {
  title: "Privacy",
  titleAccent: "Policy",
  updated: "Last Updated: March 1, 2026",
  sections: [
    {
      heading: "1. Information We Collect",
      paragraphs: [
        "We collect information you provide directly to us when you request a quote, schedule service, or contact us through our website. This may include your name, email address, phone number, and physical address.",
      ],
    },
    {
      heading: "2. SMS and Mobile Information",
      paragraphs: [
        `${site.name} respects your privacy regarding mobile information. We collect your phone number only when you explicitly provide it to us for service coordination or inquiries.`,
        'By providing your phone number, you consent to receive SMS messages from us related to your service requests, appointments, and account updates. You can opt-out at any time by replying "STOP".',
      ],
      callout: {
        heading: "SMS Compliance & Non-Disclosure",
        items: [
          "No mobile information will be shared with third parties/affiliates for marketing/promotional purposes.",
          "All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.",
        ],
      },
    },
    {
      heading: "3. How We Use Your Information",
      list: [
        "To provide, maintain, and improve our HVAC services.",
        "To process transactions and send related information, including confirmations and invoices.",
        "To send technical notices, updates, security alerts, and support messages.",
        "To respond to your comments, questions, and requests.",
      ],
    },
    {
      heading: "4. Data Security",
      paragraphs: [
        "We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.",
      ],
    },
    {
      heading: "5. Contact Us",
      paragraphs: ["If you have any questions about this Privacy Policy, please contact us at:"],
      contact: true,
    },
  ],
};

export const termsConditions: LegalDocument = {
  title: "Terms &",
  titleAccent: "Conditions",
  updated: "Last Updated: March 1, 2026",
  sections: [
    {
      heading: "1. Agreement to Terms",
      paragraphs: [
        `By accessing or using the services provided by ${site.name}, you agree to be bound by these Terms and Conditions. If you do not agree to all of these terms, do not use our services.`,
      ],
    },
    {
      heading: "2. SMS Messaging Terms (Compliance)",
      paragraphs: [
        `${site.name} provides SMS messaging services for appointment reminders, service updates, and account-related notifications.`,
      ],
      definitions: [
        {
          term: "Opt-In:",
          body: `By providing your mobile phone number, you are opting in to receive SMS messages from ${site.name}.`,
        },
        {
          term: "Message Frequency:",
          body: "Message frequency varies based on your service requests and account activity.",
        },
        {
          term: "Opt-Out:",
          body: 'You can cancel the SMS service at any time. Just text "STOP" to our number. After you send the SMS message "STOP" to us, we will send you an SMS message to confirm that you have been unsubscribed. After this, you will no longer receive SMS messages from us.',
        },
        {
          term: "Help:",
          body: `If you are experiencing issues with the messaging program you can reply with the keyword "HELP" for more assistance, or you can get help directly at ${site.phone.display}.`,
        },
        {
          term: "Carrier Rates:",
          body: "Carriers are not liable for delayed or undelivered messages. As always, message and data rates may apply for any messages sent to you from us and to us from you.",
        },
        {
          term: "No Sharing:",
          body: "Mobile information will not be shared with third parties/affiliates for marketing or promotional purposes.",
        },
      ],
    },
    {
      heading: "3. Service Estimates and Payments",
      paragraphs: [
        "All estimates provided are based on the initial assessment. Final costs may vary depending on unforeseen issues discovered during the service. Payment is due upon completion of the work unless otherwise agreed upon in writing.",
      ],
    },
    {
      heading: "4. Warranty and Liability",
      paragraphs: [
        `We provide a warranty on our workmanship as specified in your service agreement. ${site.name} is not liable for damages resulting from pre-existing conditions or equipment failure outside of our control.`,
      ],
    },
    {
      heading: "5. Governing Law",
      paragraphs: [
        "These terms are governed by and construed in accordance with the laws of the State of Ohio.",
      ],
    },
  ],
};

export const legalContactLines = [
  site.name,
  `${addressLines[0].replace(/\.$/, "")}, ${addressLines[1]}`,
  `Email: ${site.email}`,
  `Phone: ${site.phone.display}`,
];
