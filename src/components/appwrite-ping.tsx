"use client";

import { useEffect } from "react";
import { client } from "@/lib/appwrite";

/**
 * Pings Appwrite once when the app opens, to confirm the browser can reach the
 * backend. Renders nothing; the result goes to the console.
 */
let pinged = false;

export function AppwritePing() {
  useEffect(() => {
    // Guard against React's development double-mount, so verifying the setup
    // shows one result per page load rather than two.
    if (pinged) return;
    pinged = true;

    client
      .ping()
      .then(() => console.info("Appwrite reachable."))
      .catch((error: unknown) => console.warn("Appwrite ping failed:", error));
  }, []);

  return null;
}
