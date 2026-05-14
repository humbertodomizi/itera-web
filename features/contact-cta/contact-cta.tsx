import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/brand/whatsapp-icon";
import type { Dictionary } from "@/lib/i18n/types";

const WHATSAPP_URL = "https://wa.me/3467443669";
const EMAIL = "weareitera@gmail.com";

export function ContactCTA({ t }: { t: Dictionary["cta"] }) {
  return (
    <section id="contact" className="scroll-mt-24 py-[120px] bg-[var(--surface)]">
      <div className="mx-auto max-w-[1200px] px-6 md:px-[52px]">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-[36px] leading-[1.1] tracking-[-0.03em] font-extrabold md:text-[52px] md:leading-[1.08]">
            {t.h} <span className="text-[var(--brand)]">{t.highlight}</span> {t.hSuffix}
          </h2>
          <p className="mt-5 text-[17px] leading-[1.65] text-[var(--muted-foreground)]">{t.sub}</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <article className="flex flex-col items-start rounded-[22px] border border-[color:rgba(255,87,35,0.30)] bg-[var(--background)] p-8 md:p-10">
            <div className="flex size-12 items-center justify-center rounded-full bg-[var(--brand-tint)] text-[var(--brand)]">
              <WhatsAppIcon className="size-6" />
            </div>
            <h3 className="mt-5 text-[24px] font-extrabold leading-[1.2] tracking-[-0.02em] md:text-[28px]">
              {t.whatsapp.title}
            </h3>
            <p className="mt-3 flex-1 text-[16px] leading-[1.6] text-[var(--muted-foreground)]">
              {t.whatsapp.desc}
            </p>
            <Button variant="brand" className="mt-6 gap-2" asChild>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp">
                <WhatsAppIcon className="size-5" />
                {t.whatsapp.btn}
              </a>
            </Button>
          </article>

          <article className="flex flex-col items-start rounded-[22px] border border-[color:var(--border)] bg-[var(--background)] p-8 md:p-10">
            <div className="flex size-12 items-center justify-center rounded-full bg-[var(--surface)] text-[var(--foreground)]">
              <Mail className="size-6" />
            </div>
            <h3 className="mt-5 text-[24px] font-extrabold leading-[1.2] tracking-[-0.02em] md:text-[28px]">
              {t.email.title}
            </h3>
            <p className="mt-3 flex-1 text-[16px] leading-[1.6] text-[var(--muted-foreground)]">
              {t.email.desc}
            </p>
            <Button variant="outline-soft" className="mt-6 gap-2" asChild>
              <a href={`mailto:${EMAIL}`} aria-label={`Enviar email a ${EMAIL}`}>
                <Mail className="size-5" />
                {t.email.btn}
              </a>
            </Button>
          </article>
        </div>
      </div>
    </section>
  );
}
