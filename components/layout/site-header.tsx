"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslation } from "@/lib/i18n/use-translation";
import { useScrolled } from "@/lib/hooks/use-scrolled";
import { Logo } from "@/components/brand/logo";
import { WhatsAppIcon } from "@/components/brand/whatsapp-icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const WHATSAPP_URL = "https://wa.me/3467443669";

export function SiteHeader() {
  const { t } = useTranslation();
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);

  const onNav = (id: string) => {
    setMenuOpen(false);
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const surfaceOn = scrolled || menuOpen;

  return (
    <header
      className={cn(
        "fixed top-0 z-50 h-16 w-full transition-colors duration-300",
        surfaceOn && "border-b border-[color:var(--border)] bg-[var(--background)]/98 backdrop-blur-2xl",
      )}
    >
      <div className="mx-auto flex h-full w-full max-w-[1200px] items-center justify-between px-6 md:px-[52px]">
        <button onClick={() => onNav("hero")} className="cursor-pointer">
          <Logo size={27} textClassName="text-xl leading-none" />
        </button>
        <nav className="absolute left-1/2 hidden -translate-x-1/2 lg:flex items-center gap-8">
          {t.nav.links.map(([id, label]) => (
            <button key={id} onClick={() => onNav(id)} className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
              {label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="brand" className="!h-10 !px-4 !text-sm font-semibold gap-2 md:!px-5" asChild>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp">
              <WhatsAppIcon className="size-[18px]" />
              <span className="hidden sm:inline">{t.nav.cta}</span>
            </a>
          </Button>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="relative grid size-10 place-items-center rounded-full border border-[color:var(--border)] text-[var(--foreground)] transition-colors hover:bg-[var(--surface)] lg:hidden"
          >
            <Menu
              className={cn(
                "absolute size-5 transition-all duration-300",
                menuOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100",
              )}
              aria-hidden="true"
            />
            <X
              className={cn(
                "absolute size-5 transition-all duration-300",
                menuOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0",
              )}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        aria-hidden={!menuOpen}
        className={cn(
          "absolute left-0 right-0 top-16 origin-top overflow-hidden border-b border-[color:var(--border)] bg-[var(--background)] transition-all duration-300 ease-out lg:hidden",
          menuOpen ? "max-h-[80vh] opacity-100" : "pointer-events-none max-h-0 opacity-0",
        )}
      >
        <nav className="mx-auto flex max-w-[1200px] flex-col px-6 py-2">
          {t.nav.links.map(([id, label], idx) => (
            <button
              key={id}
              onClick={() => onNav(id)}
              style={{ transitionDelay: menuOpen ? `${idx * 40}ms` : "0ms" }}
              className={cn(
                "border-b border-[color:var(--border)] py-4 text-left text-base font-medium text-[var(--foreground)] transition-all duration-300 last:border-b-0",
                menuOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
              )}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
