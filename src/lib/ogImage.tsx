import { ImageResponse } from "next/og";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

export function renderOgImage({ eyebrow, title }: { eyebrow: string; title: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#06070a",
          backgroundImage:
            "radial-gradient(circle at 15% 15%, rgba(255,138,43,0.25), transparent 55%), radial-gradient(circle at 85% 85%, rgba(124,108,255,0.22), transparent 55%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: "#ff8a2b",
            }}
          />
          <span style={{ fontSize: 30, fontWeight: 700, color: "#ff8a2b", letterSpacing: -0.5 }}>
            avenza
          </span>
        </div>
        <span
          style={{
            marginTop: 36,
            fontSize: 22,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 4,
            color: "#ffb066",
          }}
        >
          {eyebrow}
        </span>
        <span
          style={{
            marginTop: 20,
            fontSize: 62,
            fontWeight: 800,
            lineHeight: 1.15,
            color: "#f4f5f7",
            maxWidth: 980,
          }}
        >
          {title}
        </span>
      </div>
    ),
    { ...ogImageSize }
  );
}
