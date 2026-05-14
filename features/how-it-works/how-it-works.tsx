"use client";

import { FeatureIcon } from "@/components/common/feature-icon";
import { useAutoplayCarousel } from "@/lib/hooks/use-autoplay-carousel";
import type { Dictionary } from "@/lib/i18n/types";

type Step = Dictionary["how"]["steps"][number];

function StepDetail({ step, onPrev, onNext, isFirst, isLast, showNav }: {
  step: Step;
  onPrev?: () => void;
  onNext?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
  showNav?: boolean;
}) {
  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-[22px] border border-[color:var(--border)] bg-[var(--surface)] px-12 py-8">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-2 right-2 select-none font-sans text-[120px] font-extrabold leading-none tracking-[-0.04em] text-[color:rgba(255,87,35,0.10)]"
      >
        {step.n}
      </span>
      {showNav && (
        <>
          <button
            onClick={onPrev}
            disabled={isFirst}
            aria-label="Anterior"
            className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-[var(--muted-foreground)] transition-opacity disabled:opacity-20"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button
            onClick={onNext}
            disabled={isLast}
            aria-label="Siguiente"
            className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-[var(--muted-foreground)] transition-opacity disabled:opacity-20"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </>
      )}
      <div className="relative flex size-12 items-center justify-center rounded-full bg-[var(--brand-tint)] text-[var(--brand)]">
        <FeatureIcon name={step.icon} className="size-6" />
      </div>
      <h3 className="relative mt-5 text-[28px] font-extrabold tracking-[-0.02em] md:text-[32px]">{step.title}</h3>
      <p className="relative mt-4 text-[17px] leading-[1.65] text-[var(--muted-foreground)]">{step.desc}</p>
    </article>
  );
}

export function HowItWorks({ t }: { t: Dictionary["how"] }) {
  const { active, setActive, pause, resume } = useAutoplayCarousel(t.steps.length);
  const step = t.steps[active];
  const goPrev = () => setActive((a) => (a - 1 + t.steps.length) % t.steps.length);
  const goNext = () => setActive((a) => (a + 1) % t.steps.length);
  return (
    <section id="how-it-works" className="scroll-mt-24 py-[120px]">
      <div className="mx-auto max-w-[1200px] px-6 md:px-[52px]">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--brand)]">{t.label}</p>
        <h2 className="mt-4 whitespace-pre-line text-[36px] leading-[1.1] tracking-[-0.03em] font-extrabold md:text-[52px] md:leading-[1.08]">{t.h}</h2>

        <div
          className="mt-10 hidden gap-7 lg:grid lg:grid-cols-2"
          onMouseEnter={pause}
          onMouseLeave={resume}
        >
          <div className="space-y-4">
            {t.steps.map((s, idx) => (
              <button
                key={s.n}
                onClick={() => setActive(idx)}
                className={`flex w-full items-center gap-4 rounded-[16px] border p-6 text-left transition-all ${
                  active === idx
                    ? "border-[color:rgba(255,87,35,0.35)] bg-[var(--surface)]"
                    : "border-[color:var(--border)] bg-[var(--background)]"
                }`}
              >
                <div
                  className={`flex size-10 shrink-0 items-center justify-center rounded-full ${
                    active === idx
                      ? "bg-[var(--brand-tint)] text-[var(--brand)]"
                      : "bg-[var(--surface)] text-[var(--muted-foreground)]"
                  }`}
                >
                  <FeatureIcon name={s.icon} className="size-5" />
                </div>
                <div>
                  <p className="font-mono text-[11px] tracking-[0.1em] text-[var(--brand)]">{s.n}</p>
                  <p className="mt-1 text-xl font-bold">{s.title}</p>
                </div>
              </button>
            ))}
          </div>
          <div className="sticky top-20 self-start">
            <StepDetail step={step} />
            <div className="mt-6 flex gap-2">
              {t.steps.map((_, i) => (
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
              {t.steps.map((s, idx) => (
                <div
                  key={s.n}
                  className={`col-start-1 row-start-1 transition-opacity duration-300 ${
                    idx === active ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
                  }`}
                >
                  <StepDetail step={s} showNav onPrev={goPrev} onNext={goNext} />
                </div>
              ))}
            </div>
            <div className="mt-5 flex justify-center gap-2">
              {t.steps.map((_, i) => (
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
