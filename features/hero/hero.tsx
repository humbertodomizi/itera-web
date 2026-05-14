"use client";

import { Button } from "@/components/ui/button";
import { RotatingWord } from "@/components/common/rotating-word";
import type { Dictionary } from "@/lib/i18n/types";
import { layout } from "@/lib/design-tokens";

export function Hero({ t }: { t: Dictionary["hero"] }) {
  const scrollTo = (id: string) => () => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <section id="hero" className="relative overflow-hidden scroll-mt-24 py-[120px]">
      <div className="pointer-events-none absolute -left-56 top-16 h-96 w-96 rounded-full bg-[color:rgba(255,87,35,0.07)] blur-[7.5rem]" />
      <div className="pointer-events-none absolute -right-56 top-28 h-96 w-96 rounded-full bg-[color:rgba(255,87,35,0.07)] blur-[7.5rem]" />
      <div className="mx-auto max-w-[1200px] px-6 md:px-[52px]">
        <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--brand)]">{t.eyebrow}</p>
        <h1 className={layout.typeScale.h1}>
          {t.line1} <br />
          <RotatingWord words={t.words} /> <br />
          {t.line3}
        </h1>
        <p className="mt-7 max-w-3xl text-[17px] leading-[1.65] text-[var(--muted-foreground)]">{t.sub}</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Button variant="brand" onClick={scrollTo("contact")}>{t.cta1}</Button>
          <Button variant="outline-soft" onClick={scrollTo("how-it-works")}>{t.cta2}</Button>
        </div>
      </div>
    </section>
  );
}
