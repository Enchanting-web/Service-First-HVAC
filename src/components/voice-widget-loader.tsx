import Script from "next/script"

const WIDGET_SRC = "https://unpkg.com/@elevenlabs/convai-widget-embed"
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
  return (
    <>
      <elevenlabs-convai agent-id={AGENT_ID} />
      <Script src={WIDGET_SRC} strategy="lazyOnload" />
    </>
  )
}
