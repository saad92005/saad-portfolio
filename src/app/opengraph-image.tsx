import { ImageResponse } from "next/og";
import { profile } from "@/lib/data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(155deg, #F6D9E8 0%, #D9CCF2 52%, #F7F3EE 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "#ffffff",
            borderRadius: 40,
            padding: "56px 72px",
            boxShadow: "0 40px 90px rgba(20,18,26,0.25)",
          }}
        >
          <div style={{ fontSize: 30, color: "#e8447b", letterSpacing: 4, marginBottom: 18 }}>ID · 2026</div>
          <div style={{ fontSize: 68, fontWeight: 800, color: "#14121a" }}>{profile.name}</div>
          <div style={{ fontSize: 32, color: "#14121a99", marginTop: 12 }}>{profile.role}</div>
          <div style={{ display: "flex", gap: 8, marginTop: 28 }}>
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={i} style={{ width: i % 3 === 0 ? 4 : 2, height: 34, background: "#14121a" }} />
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
