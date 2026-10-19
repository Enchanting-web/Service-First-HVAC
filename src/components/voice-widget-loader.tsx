'use client'

import { useEffect } from "react"

const WIDGET_SRC = "https://ionos.ai-voicereceptionist.com/widget/v1/embed.js"
const AGENT_ID = "b9b5af44-1337-4373-a4cd-13e80e75ec3b"

export function VoiceWidgetLoader() {
  useEffect(() => {
    if (document.querySelector(`script[src="${WIDGET_SRC}"]`)) {
      return
    }

    const script = document.createElement("script")
    script.src = WIDGET_SRC
    script.dataset.agentId = AGENT_ID
    script.defer = true
    document.head.appendChild(script)

    return () => {
      script.remove()
    }
  }, [])

  return null
}
