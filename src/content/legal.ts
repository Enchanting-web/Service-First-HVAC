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
  updated: "Last Updated: November 14, 2026",
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
      heading: "3. AI Receptionist (Voice and Chat Assistant)",
      paragraphs: [
        `${site.name} uses an artificial intelligence ("AI") receptionist to answer questions, collect service details, and help request appointments. You may interact with it through the voice and chat widget on our website and, where offered, by phone. The AI Receptionist is an automated system, not a human.`,
        "When you use the AI Receptionist, we and our service provider collect the information you share in the conversation (such as your name, phone number, email, service address, and a description of your HVAC issue), audio recordings of voice conversations, written transcripts and chat messages, and technical data such as your IP address, browser and device type, and the date, time, and length of the session.",
        "Voice conversations require access to your device's microphone. Your browser will ask for your permission before the microphone is used, and you can decline or revoke that permission at any time in your browser settings.",
      ],
      callout: {
        heading: "Recording, Consent & Third-Party Processing",
        items: [
          "By starting a conversation with the AI Receptionist, you consent to the conversation being recorded, transcribed, and processed by AI as described in this policy. If you do not consent, please do not use the AI Receptionist and instead call or email us directly.",
          "The AI Receptionist is powered by ElevenLabs, a third-party provider that processes conversation audio and transcripts on our behalf to operate the service. Their handling of this data is also subject to their own privacy policy.",
          "We use AI Receptionist conversations to respond to your request, schedule and coordinate service, follow up with you, keep records of customer communications, and review and improve the quality of our AI Receptionist. We do not sell conversation data or use it for third-party marketing.",
          "Recordings and transcripts are kept only as long as reasonably needed for these purposes or as required by law. You may ask us to delete your recordings and transcripts using the contact details below.",
          "Please do not share payment card numbers, Social Security numbers, passwords, or other sensitive information with the AI Receptionist.",
        ],
      },
    },
    {
      heading: "4. How We Use Your Information",
      list: [
        "To provide, maintain, and improve our HVAC services.",
        "To process transactions and send related information, including confirmations and invoices.",
        "To send technical notices, updates, security alerts, and support messages.",
        "To respond to your comments, questions, and requests, including those made through our AI Receptionist.",
      ],
    },
    {
      heading: "5. Data Security",
      paragraphs: [
        "We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.",
      ],
    },
    {
      heading: "6. Contact Us",
      paragraphs: ["If you have any questions about this Privacy Policy, please contact us at:"],
      contact: true,
    },
  ],
};

export const termsConditions: LegalDocument = {
  title: "Terms &",
  titleAccent: "Conditions",
  updated: "Last Updated: November 14, 2026",
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
      heading: "3. AI Receptionist",
      paragraphs: [
        `${site.name} offers an artificial intelligence ("AI") receptionist through the voice and chat widget on our website and, where offered, by phone. By using the AI Receptionist, you agree to the following terms.`,
      ],
      definitions: [
        {
          term: "Automated Assistant:",
          body: "The AI Receptionist is an automated AI system, not a human. You can ask to speak with our team at any time, or contact us directly by phone or email.",
        },
        {
          term: "Consent to Recording:",
          body: "By starting a conversation, you consent to your conversation being recorded, transcribed, and processed by AI and by our third-party provider, as described in our Privacy Policy. If you do not consent, do not use the AI Receptionist.",
        },
        {
          term: "Microphone Permission:",
          body: "Voice conversations require you to allow microphone access in your browser. You may decline and contact us another way.",
        },
        {
          term: "Information Only:",
          body: "Responses from the AI Receptionist are provided for general information and may be incomplete or inaccurate. Prices, estimates, availability, and diagnoses it provides are not binding. Only a written estimate or service agreement from our team is binding.",
        },
        {
          term: "Appointments:",
          body: "Appointment requests made through the AI Receptionist are not confirmed until our team confirms them with you by phone, text, or email.",
        },
        {
          term: "Not for Emergencies:",
          body: `Do not rely on the AI Receptionist in an emergency. If you smell gas, suspect a carbon monoxide leak, or are in danger, leave the building and call 911 and your gas utility. For urgent HVAC service, call us directly at ${site.phone.display}.`,
        },
        {
          term: "Acceptable Use:",
          body: "You agree not to use the AI Receptionist for unlawful, abusive, or harassing purposes, to impersonate another person, or to attempt to disrupt, misuse, or extract data from the service.",
        },
        {
          term: "Availability:",
          body: "We may change, suspend, or discontinue the AI Receptionist at any time and do not guarantee that it will be available or error-free.",
        },
      ],
    },
    {
      heading: "4. Service Estimates and Payments",
      paragraphs: [
        "All estimates provided are based on the initial assessment. Final costs may vary depending on unforeseen issues discovered during the service. Payment is due upon completion of the work unless otherwise agreed upon in writing.",
      ],
    },
    {
      heading: "5. Warranty and Liability",
      paragraphs: [
        `We provide a warranty on our workmanship as specified in your service agreement. ${site.name} is not liable for damages resulting from pre-existing conditions or equipment failure outside of our control.`,
      ],
    },
    {
      heading: "6. Governing Law",
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
