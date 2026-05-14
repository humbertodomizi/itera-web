"use client";

import { FeatureIcon } from "@/components/common/feature-icon";
import { useAutoplayCarousel } from "@/lib/hooks/use-autoplay-carousel";
import type { Dictionary } from "@/lib/i18n/types";

type Item = Dictionary["processes"]["items"][number];

function ProcessDetail({ item, onPrev, onNext, showNav }: {
  item: Item;
  onPrev?: () => void;
  onNext?: () => void;
  showNav?: boolean;
}) {
  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-[22px] border border-[color:var(--border)] bg-[var(--background)] px-12 py-8">
      {showNav && (
        <>
          <button
            onClick={onPrev}
            aria-label="Anterior"
            className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-[var(--muted-foreground)]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button
            onClick={onNext}
            aria-label="Siguiente"
            className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-[var(--muted-foreground)]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </>
      )}
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
  const { active, setActive, pause, resume } = useAutoplayCarousel(t.items.length);
  const current = t.items[active];
  const goPrev = () => setActive((a) => (a - 1 + t.items.length) % t.items.length);
  const goNext = () => setActive((a) => (a + 1) % t.items.length);

  return (
    <section id="processes" className="scroll-mt-24 py-[120px] bg-[var(--surface)]">
      <div className="mx-auto max-w-[1200px] px-6 md:px-[52px]">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--brand)]">{t.label}</p>
        <h2 className="mt-4 whitespace-pre-line text-[36px] leading-[1.1] tracking-[-0.03em] font-extrabold md:text-[52px] md:leading-[1.08]">{t.h}</h2>
        <p className="mt-5 max-w-3xl text-[17px] leading-[1.65] text-[var(--muted-foreground)]">{t.sub}</p>

        <div
          className="mt-10 hidden gap-7 lg:grid lg:grid-cols-2"
          onMouseEnter={pause}
          onMouseLeave={resume}
        >
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
            <div className="mt-6 flex gap-2">
              {t.items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Paso ${i + 1}`}
                  className={`h-2 w-2 rounded-full ${i === active ? "bg-[var(--brand)]" : "bg-[var(--border)]"}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 lg:hidden">
          <div
            className="relative"
            onTouchStart={(e) => {
              pause();
              const touch = e.touches[0];
              (e.currentTarget as HTMLDivElement).dataset.touchX = String(touch.clientX);
            }}
            onTouchEnd={(e) => {
              const startX = Number((e.currentTarget as HTMLDivElement).dataset.touchX ?? 0);
              const diff = startX - e.changedTouches[0].clientX;
              if (Math.abs(diff) >= 40) {
                if (diff > 0) goNext();
                else goPrev();
              }
              resume();
            }}
          >
            <div className="grid">
              {t.items.map((item, idx) => (
                <div
                  key={item.tag}
                  className={`col-start-1 row-start-1 transition-opacity duration-300 ${
                    idx === active ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
                  }`}
                >
                  <ProcessDetail item={item} showNav onPrev={goPrev} onNext={goNext} />
                </div>
              ))}
            </div>
            <div className="mt-5 flex justify-center gap-2">
              {t.items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Paso ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === active ? "w-5 bg-[var(--brand)]" : "w-2 bg-[var(--border)]"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
