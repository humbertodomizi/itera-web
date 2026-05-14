import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/brand/whatsapp-icon";
import type { Dictionary } from "@/lib/i18n/types";

const WHATSAPP_URL = "https://wa.me/3467443669";

export function ContactCTA({ t }: { t: Dictionary["cta"] }) {
  return (
    <section id="contact" className="scroll-mt-24 py-[120px] bg-[var(--surface)]">
      <div className="mx-auto max-w-[1200px] px-6 md:px-[52px]">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-[36px] leading-[1.1] tracking-[-0.03em] font-extrabold md:text-[52px] md:leading-[1.08]">
            {t.h} <span className="text-[var(--brand)]">{t.highlight}</span> {t.hSuffix}
          </h2>
          <p className="mt-5 text-[17px] leading-[1.65] text-[var(--muted-foreground)]">{t.sub}</p>
          <div className="mt-8 flex justify-center">
            <Button variant="brand" className="gap-2" asChild>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp">
                <WhatsAppIcon className="size-5" />
                {t.btn}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
