"use client"

import Script from "next/script"
import { usePathname } from "next/navigation"

// Pinned to an exact build with Subresource Integrity so unpkg cannot serve
// different code than what was reviewed. To upgrade: change the version, then
// recompute the hash with
//   curl -sL <WIDGET_SRC> | openssl dgst -sha384 -binary | openssl base64 -A
const WIDGET_SRC = "https://unpkg.com/@elevenlabs/convai-widget-embed@0.26.0/dist/index.js"
const WIDGET_INTEGRITY = "sha384-SZWFXwOYRx3DtS4HbaWJ4a0LmzpJAaFe88e91ttsjTo+pCR5In7PSFDWHIz4gszm"
const AGENT_ID = "agent_5601m5eb1jw8eekvv6gymcaggyh9"

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "elevenlabs-convai": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        "agent-id": string
      }
    }
  }
}

/** ElevenLabs AI Receptionist widget (floats in the bottom-right corner). */
export function VoiceWidgetLoader() {
  // Third-party code must not run on staff pages that handle the admin key
  // and customer contact details.
  if (usePathname()?.startsWith("/admin")) return null
  return (
    <>
      <elevenlabs-convai agent-id={AGENT_ID} />
      <Script src={WIDGET_SRC} integrity={WIDGET_INTEGRITY} crossOrigin="anonymous" strategy="lazyOnload" />
    </>
  )
}
