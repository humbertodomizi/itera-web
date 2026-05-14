export const siteConfig = {
  name: "Itera",
  title: "Itera - Tecnologia para evolucionar empresas",
  description:
    "Sistemas empresariales, automatizacion y transformacion digital para empresas que necesitan operar mejor, escalar procesos y reducir friccion operativa.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://weareitera.com/",
  locale: "es_ES",
  keywords: [
    "Itera",
    "tecnologia para empresas",
    "automatizacion empresarial",
    "transformacion digital",
    "desarrollo web",
    "sistemas empresariales",
    "ERP",
    "CRM",
    "integracion de sistemas",
    "consultoria agil",
    "software a medida",
    "digitalizacion empresarial",
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
