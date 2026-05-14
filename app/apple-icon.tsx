import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 10,
          padding: 34,
          background: "#111214",
          borderRadius: 40,
        }}
      >
        <div style={{ width: 18, height: 24, borderRadius: 9, background: "rgba(232,230,225,0.35)" }} />
        <div style={{ width: 18, height: 48, borderRadius: 9, background: "rgba(232,230,225,0.55)" }} />
        <div style={{ width: 18, height: 78, borderRadius: 9, background: "rgba(232,230,225,0.75)" }} />
        <div style={{ width: 18, height: 112, borderRadius: 9, background: "#ff5723" }} />
      </div>
    ),
    size,
  );
}
