"use client";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n/use-translation";

export function LangToggle() {
  const { lang, setLang } = useTranslation();
  return (
    <div role="radiogroup" className="flex items-center rounded-full bg-black/6 p-1">
      {(["es", "en"] as const).map((l) => (
        <button
          key={l}
          role="radio"
          aria-checked={lang === l}
          onClick={() => setLang(l)}
          className={cn(
            "rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.04em] transition-all duration-300",
            lang === l ? "bg-[var(--brand)] text-white" : "text-[var(--muted-foreground)]",
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
