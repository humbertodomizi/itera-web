import type { Metadata } from "next";
import { JetBrains_Mono, Manrope } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
// import { CometRain } from "@/components/common/comet-rain";
import { GridShimmer } from "@/components/common/grid-shimmer";
import { GridSpotlight } from "@/components/common/grid-spotlight";
import { es } from "@/lib/i18n/es";
import { cn } from "@/lib/utils";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Itera — Tecnología para evolucionar empresas",
  description: es.footer.tagline,
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const lang = cookieStore.get("itera-lang")?.value ?? "es";
  return (
    <html lang={lang} className={cn("dark h-full antialiased", manrope.variable, jetbrainsMono.variable, "font-sans")}>
      <body className={cn("min-h-full flex flex-col", manrope.className)}>
        <GridSpotlight />
        <GridShimmer />
        {/* <CometRain /> */}
        {children}
      </body>
    </html>
  );
}
