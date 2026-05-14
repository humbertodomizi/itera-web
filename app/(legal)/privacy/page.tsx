import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politica de privacidad",
  description: "Politica de privacidad de Itera.",
  alternates: {
    canonical: "/privacy",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function PrivacyPage() {
  return <main className="mx-auto max-w-3xl px-6 py-24">Política de privacidad</main>;
}
