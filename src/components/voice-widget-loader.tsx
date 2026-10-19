import Script from "next/script"

const WIDGET_SRC = "https://ionos.ai-voicereceptionist.com/widget/v1/embed.js"
const AGENT_ID = "b9b5af44-1337-4373-a4cd-13e80e75ec3b"

export function VoiceWidgetLoader() {
  return (
    <Script
      src={WIDGET_SRC}
      data-agent-id={AGENT_ID}
      strategy="afterInteractive"
    />
  )
}
