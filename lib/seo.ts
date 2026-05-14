export const siteConfig = {
  name: "Itera",
  title: "Itera — Tecnología para evolucionar negocios",
  description:
    "Desarrollamos software a medida para que tu negocio crezca sin caos. Automatización, sistemas de gestión y transformación digital para pymes y empresas.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://weareitera.com/",
  locale: "es_ES",
  keywords: [
    "Itera",
    "software a medida",
    "desarrollo de software Argentina",
    "sistema de gestión para pymes",
    "software para negocios",
    "agencia de tecnología",
    "automatización empresarial",
    "transformación digital",
    "desarrollo web",
    "aplicaciones web",
    "digitalización de negocios",
    "software para pymes",
    "tecnología para empresas",
    "inteligencia artificial para negocios",
    "diseño UX UI",
  ],
  whatsapp: "+3467443669",
} as const;

export function getSiteUrl() {
  try {
    return new URL(siteConfig.url);
  } catch {
    return new URL("https://weareitera.com/");
  }
}

export function absoluteUrl(path = "/") {
  return new URL(path, getSiteUrl()).toString();
}
