"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { en } from "@/lib/i18n/en";
import { es } from "@/lib/i18n/es";
import type { Dictionary, Lang } from "@/lib/i18n/types";

type LangContextValue = { lang: Lang; t: Dictionary; setLang: (lang: Lang) => void };
const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ initialLang, children }: { initialLang: Lang; children: React.ReactNode }) {
  const router = useRouter();
  const [lang, setLangState] = useState<Lang>(initialLang);
  const value = useMemo(
    () => ({
      lang,
      t: lang === "en" ? en : es,
      setLang: (nextLang: Lang) => {
        document.cookie = `itera-lang=${nextLang}; path=/; max-age=31536000; samesite=lax`;
        setLangState(nextLang);
        router.refresh();
      },
    }),
    [lang, router],
  );
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useTranslation() {
  const context = useContext(LangContext);
  if (!context) throw new Error("useTranslation must be used within LangProvider");
  return context;
}
