"use client";

import { useState } from "react";
import { FeatureIcon } from "@/components/common/feature-icon";
import { MobileCardCarousel } from "@/components/common/mobile-card-carousel";
import type { Dictionary } from "@/lib/i18n/types";

type Item = Dictionary["processes"]["items"][number];

function ProcessDetail({ item }: { item: Item }) {
  return (
    <article className="flex h-full flex-col rounded-[22px] border border-[color:var(--border)] bg-[var(--background)] p-8">
      <div className="flex size-12 items-center justify-center rounded-full bg-[var(--brand-tint)] text-[var(--brand)]">
        <FeatureIcon name={item.icon} className="size-6" />
      </div>
      <p className="mt-5 inline-flex w-fit rounded-md border border-[color:rgba(255,87,35,0.20)] bg-[var(--brand-tint)] px-2.5 py-1 font-mono text-[11px] tracking-[0.08em] text-[var(--brand)]">
        {item.tag}
      </p>
      <h3 className="mt-4 text-[26px] font-extrabold leading-[1.2] tracking-[-0.02em] md:text-[30px]">{item.title}</h3>
      <p className="mt-4 text-[17px] leading-[1.65] text-[var(--muted-foreground)]">{item.desc}</p>
    </article>
  );
}

export function Processes({ t }: { t: Dictionary["processes"] }) {
  const [active, setActive] = useState(0);
  const current = t.items[active];
  return (
    <section id="processes" className="scroll-mt-24 py-[120px] bg-[var(--surface)]">
      <div className="mx-auto max-w-[1200px] px-6 md:px-[52px]">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--brand)]">{t.label}</p>
        <h2 className="mt-4 whitespace-pre-line text-[36px] leading-[1.1] tracking-[-0.03em] font-extrabold md:text-[52px] md:leading-[1.08]">{t.h}</h2>
        <p className="mt-5 max-w-3xl text-[17px] leading-[1.65] text-[var(--muted-foreground)]">{t.sub}</p>

        <div className="mt-10 hidden gap-7 lg:grid lg:grid-cols-2">
          <div className="space-y-4">
            {t.items.map((item, idx) => (
              <button
                key={item.tag}
                onClick={() => setActive(idx)}
                className={`flex w-full items-center gap-4 rounded-[16px] border p-6 text-left transition-all ${
                  active === idx
                    ? "border-[color:rgba(255,87,35,0.35)] bg-[var(--background)]"
                    : "border-[color:var(--border)] bg-transparent"
                }`}
              >
                <div
                  className={`flex size-10 shrink-0 items-center justify-center rounded-full ${
                    active === idx
                      ? "bg-[var(--brand-tint)] text-[var(--brand)]"
                      : "bg-[var(--surface)] text-[var(--muted-foreground)]"
                  }`}
                >
                  <FeatureIcon name={item.icon} className="size-5" />
                </div>
                <div>
                  <p className="font-mono text-[11px] tracking-[0.1em] text-[var(--brand)]">{item.tag}</p>
                  <p className="mt-1 text-lg font-bold leading-snug">{item.title}</p>
                </div>
              </button>
            ))}
          </div>
          <div className="sticky top-20 self-start">
            <ProcessDetail item={current} />
          </div>
        </div>

        <div className="mt-8 lg:hidden">
          <MobileCardCarousel
            labels={t.items.map((item) => item.tag)}
            cards={t.items.map((item) => <ProcessDetail key={item.tag} item={item} />)}
          />
        </div>
      </div>
    </section>
  );
}
