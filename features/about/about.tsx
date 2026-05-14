import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/lib/i18n/types";

export function About({ t }: { t: Dictionary["about"] }) {
  return (
    <section id="about" className="scroll-mt-24 py-[120px]">
      <div className="mx-auto max-w-[1200px] px-6 md:px-[52px]">
        <div className="max-w-3xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--brand)]">{t.label}</p>
          <h2 className="mt-4 whitespace-pre-line text-[36px] leading-[1.1] tracking-[-0.03em] font-extrabold md:text-[52px] md:leading-[1.08]">
            {t.h}
          </h2>
          <p className="mt-6 text-[17px] leading-[1.65] text-[var(--muted-foreground)]">{t.p1}</p>
          <p className="mt-4 text-[17px] leading-[1.65] text-[var(--muted-foreground)]">{t.p2}</p>

          <div className="mt-8 rounded-[18px] border border-[color:var(--border)] bg-[var(--surface)] p-6">
            <p className="text-[17px] leading-[1.6] text-[var(--muted-foreground)]">{t.experience}</p>
          </div>

          <div className="mt-8">
            <Button variant="brand">{t.cta}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
