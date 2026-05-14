import { Logo } from "@/components/brand/logo";
import { InstagramIcon } from "@/components/brand/social-icons";
import { Mail } from "lucide-react";
import type { ReactNode } from "react";
import type { Dictionary } from "@/lib/i18n/types";

const WHATSAPP_URL = "https://wa.me/3467443669";
const INSTAGRAM_URL = "https://www.instagram.com/weareitera/";
const EMAIL = "weareitera@gmail.com";

function FooterLinkIcon({ label }: { label: string }) {
  const cls = "size-[14px] text-[var(--footer-fg)]/60";
  if (/instagram/i.test(label)) return <InstagramIcon className={cls} />;
  if (label.includes("@")) return <Mail className={cls} aria-hidden="true" />;
  return null;
}

function resolveHref(label: string): { href: string; external: boolean } | null {
  if (/instagram/i.test(label)) return { href: INSTAGRAM_URL, external: true };
  if (label.includes("@")) return { href: `mailto:${label}`, external: false };
  if (/contact|contacto/i.test(label)) return { href: WHATSAPP_URL, external: true };
  if (/nosotros|about/i.test(label)) return { href: "#about", external: false };
  return null;
}

function FooterItem({ label }: { label: string }): ReactNode {
  const icon = FooterLinkIcon({ label });
  const link = resolveHref(label);
  const content = icon ? (
    <span className="inline-flex items-center gap-2">
      {icon}
      <span>{label}</span>
    </span>
  ) : (
    label
  );

  if (!link) return content;

  return (
    <a
      href={link.href}
      target={link.external ? "_blank" : undefined}
      rel={link.external ? "noopener noreferrer" : undefined}
      className="transition-colors hover:text-[var(--footer-fg)]"
    >
      {content}
    </a>
  );
}

export function SiteFooter({ t }: { t: Dictionary["footer"] }) {
  return (
    <footer className="bg-[var(--footer-bg)] text-[var(--footer-fg)] py-16">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-[52px]">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr_1fr] md:gap-12">
          <div className="md:pr-6">
            <Logo variant="on-dark" />
            <p className="mt-4 text-sm text-[var(--footer-fg)]/75">{t.tagline}</p>
          </div>
          {t.cols.map(([title, items]) => (
            <div key={title}>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.1em]">{title}</h4>
              <ul className="space-y-2 text-sm text-[var(--footer-fg)]/75">
                {items.map((item) => (
                  <li key={item}>
                    <FooterItem label={item} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-[var(--footer-fg)]/60">{t.copy}</div>
      </div>
    </footer>
  );
}
