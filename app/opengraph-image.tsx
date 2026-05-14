import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/seo";

export const alt = "Itera - tecnologia para evolucionar empresas";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#111214",
          color: "#e8e6e1",
          padding: 72,
          fontFamily: "Arial",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 44 }}>
            <div style={{ width: 9, height: 9, borderRadius: 4, background: "rgba(232,230,225,0.35)" }} />
            <div style={{ width: 9, height: 18, borderRadius: 4, background: "rgba(232,230,225,0.55)" }} />
            <div style={{ width: 9, height: 29, borderRadius: 4, background: "rgba(232,230,225,0.75)" }} />
            <div style={{ width: 9, height: 40, borderRadius: 4, background: "#ff5723" }} />
          </div>
          <div style={{ fontSize: 42, fontWeight: 800, letterSpacing: -1 }}>Itera</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#ff5723", fontSize: 18, fontWeight: 800, letterSpacing: 4, textTransform: "uppercase" }}>
            Tecnologia · Automatizacion · Escala
          </div>
          <div style={{ marginTop: 28, fontSize: 78, lineHeight: 0.98, fontWeight: 800, maxWidth: 920 }}>
            Tecnologia para evolucionar empresas
          </div>
          <div style={{ marginTop: 30, color: "#9b9a97", fontSize: 28, lineHeight: 1.35, maxWidth: 920 }}>
            {siteConfig.description}
          </div>
        </div>
        <div style={{ color: "#9b9a97", fontSize: 22 }}>somositera.com</div>
      </div>
    ),
    size,
  );
}
