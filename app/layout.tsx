import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Manrope } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
// import { CometRain } from "@/components/common/comet-rain";
import { GridShimmer } from "@/components/common/grid-shimmer";
import { GridSpotlight } from "@/components/common/grid-spotlight";
import { absoluteUrl, getSiteUrl, siteConfig } from "@/lib/seo";
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
  metadataBase: getSiteUrl(),
  title: {
    default: siteConfig.title,
    template: "%s | Itera",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: "Itera" }],
  creator: "Itera",
  publisher: "Itera",
  category: "technology",
  keywords: [...siteConfig.keywords],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    locale: siteConfig.locale,
    images: [
      {
        url: "/itera-og.png",
        width: 1200,
        height: 630,
        alt: "Itera — Tecnología para evolucionar negocios",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/itera-og.png"],
  },
  icons: {
    icon: [{ url: "/icon", type: "image/png" }],
    apple: [{ url: "/apple-icon", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  other: {
    "contact:whatsapp": absoluteUrl(`https://wa.me/${siteConfig.whatsapp.replace("+", "")}`),
  },
};

export const viewport: Viewport = {
  themeColor: "#111214",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
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
