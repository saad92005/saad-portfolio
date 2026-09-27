import { ImageResponse } from "next/og";

export const alt = "Saad Shahid — AI Automation & Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(150deg, #F6D9E8 0%, #D9CCF2 52%, #F7F3EE 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: 380,
            padding: "36px 32px",
            borderRadius: 32,
            background: "#FFFFFF",
            boxShadow: "0 40px 80px -20px rgba(20,18,26,0.3)",
          }}
        >
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: "50%",
              background: "#5B2A86",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 40,
              fontWeight: 900,
              marginBottom: 20,
            }}
          >
            MS
          </div>
          <div style={{ fontSize: 34, fontWeight: 900, color: "#14121A", letterSpacing: -1 }}>
            Muhammad Saad
          </div>
          <div style={{ fontSize: 18, color: "#5B2A86", marginTop: 6, fontWeight: 600 }}>
            AI Automation &amp; Software Engineer
          </div>
          <div style={{ fontSize: 14, color: "#8A84A0", marginTop: 4 }}>Lahore, Pakistan</div>
          <div
            style={{
              display: "flex",
              gap: 4,
              marginTop: 28,
              width: "100%",
              height: 28,
            }}
          >
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: i % 3 === 0 ? 4 : 2,
                  height: "100%",
                  background: "#14121A",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
