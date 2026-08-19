import { ImageResponse } from "next/og";
import { FLAME_INNER, FLAME_OUTER, SNOWFLAKE_PATHS } from "@/components/brand/logo";
import { site } from "@/content/site";

export const alt = `${site.name} — HVAC service in Cincinnati & Dayton`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social share card. Built with next/og rather than a static file so the brand
 * facts stay single-sourced from site.ts.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#000d1b",
          backgroundImage:
            "radial-gradient(900px 500px at 12% -8%, rgba(226,97,29,0.35), transparent 60%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <svg width="100" height="120" viewBox="9 1 77 92">
            <path d={FLAME_OUTER} fill="#c34800" />
            <path d={FLAME_INNER} fill="#db5203" />
            <g
              transform="translate(30 36) scale(2.3)"
              fill="none"
              stroke="#fff"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {SNOWFLAKE_PATHS.map((d) => (
                <path key={d} d={d} />
              ))}
            </g>
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 58, fontWeight: 800, letterSpacing: "-0.02em" }}>
              <span style={{ color: "#ffffff" }}>{site.wordmark.lead}</span>
              <span style={{ color: "#e2611d", marginLeft: 16 }}>{site.wordmark.accent}</span>
            </div>
            <div style={{ color: "#d6dce3", fontSize: 28, marginTop: 8 }}>{site.wordmark.sub}</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#ffffff",
              fontSize: 74,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            AC out? We&apos;re on it — today.
          </div>
          <div style={{ color: "#9faab7", fontSize: 32, marginTop: 24 }}>
            {`HVAC service across Cincinnati & Dayton · ${site.hours}`}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "32px", fontSize: 30 }}>
          <span
            style={{
              display: "flex",
              backgroundColor: "#c34800",
              color: "#ffffff",
              fontWeight: 700,
              padding: "16px 32px",
              borderRadius: 999,
            }}
          >
            {site.phone.display}
          </span>
          <span style={{ color: "#9faab7" }}>{site.license}</span>
        </div>
      </div>
    ),
    size,
  );
}
