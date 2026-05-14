import { TagChip } from "@/components/common/tag-chip";
import { FeatureIcon } from "@/components/common/feature-icon";
import { MobileCardCarousel } from "@/components/common/mobile-card-carousel";
import type { Dictionary } from "@/lib/i18n/types";

type ServiceItem = Dictionary["services"]["items"][number];

function ServiceCard({ item }: { item: ServiceItem }) {
  return (
    <article className="group h-full rounded-[22px] border border-[color:var(--border)] bg-[var(--background)] p-7 transition-all duration-300 hover:border-[color:rgba(255,87,35,0.30)] hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex size-11 items-center justify-center rounded-full bg-[var(--brand-tint)] text-[var(--brand)]">
          <FeatureIcon name={item.icon} className="size-5" />
        </div>
        <p className="font-mono text-[11px] tracking-[0.1em] text-[var(--brand)]">{item.num}</p>
      </div>
      <h3 className="mt-5 text-xl font-bold">{item.title}</h3>
      <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">{item.desc}</p>
      <div className="mt-5 flex flex-wrap gap-2">{item.tags.map((tag) => <TagChip key={tag} label={tag} />)}</div>
    </article>
  );
}

export function Services({ t }: { t: Dictionary["services"] }) {
  return (
    <section id="services" className="scroll-mt-24 py-[120px] bg-[var(--surface)]">
      <div className="mx-auto max-w-[1200px] px-6 md:px-[52px]">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--brand)]">{t.label}</p>
        <h2 className="mt-4 text-[36px] leading-[1.1] tracking-[-0.03em] font-extrabold md:text-[52px] md:leading-[1.08]">{t.h}</h2>
        <p className="mt-5 max-w-3xl text-[17px] leading-[1.65] text-[var(--muted-foreground)]">{t.sub}</p>

        <div className="mt-10 hidden gap-5 md:grid md:grid-cols-2 lg:grid-cols-3">
          {t.items.map((item) => <ServiceCard key={item.num} item={item} />)}
        </div>

        <div className="mt-8">
          <MobileCardCarousel
            labels={t.items.map((item) => item.title)}
            cards={t.items.map((item) => <ServiceCard key={item.num} item={item} />)}
          />
        </div>
      </div>
    </section>
  );
}
