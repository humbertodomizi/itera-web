import { cookies } from "next/headers";
import { en } from "@/lib/i18n/en";
import { es } from "@/lib/i18n/es";
import type { Lang } from "@/lib/i18n/types";

export async function getTranslation() {
  const c = await cookies();
  const lang = (c.get("itera-lang")?.value ?? "es") as Lang;
  return { lang, t: lang === "en" ? en : es };
}
