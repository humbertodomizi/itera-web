import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 2,
          padding: 5,
          background: "#111214",
        }}
      >
        <div style={{ width: 4, height: 5, borderRadius: 2, background: "rgba(232,230,225,0.35)" }} />
        <div style={{ width: 4, height: 10, borderRadius: 2, background: "rgba(232,230,225,0.55)" }} />
        <div style={{ width: 4, height: 16, borderRadius: 2, background: "rgba(232,230,225,0.75)" }} />
        <div style={{ width: 4, height: 22, borderRadius: 2, background: "#ff5723" }} />
      </div>
    ),
    size,
  );
}
