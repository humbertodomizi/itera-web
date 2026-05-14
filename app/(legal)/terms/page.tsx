import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terminos y condiciones",
  description: "Terminos y condiciones de Itera.",
  alternates: {
    canonical: "/terms",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function TermsPage() {
  return <main className="mx-auto max-w-3xl px-6 py-24">Términos y condiciones</main>;
}
