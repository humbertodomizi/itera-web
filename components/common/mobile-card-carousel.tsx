"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function MobileCardCarousel({
  labels,
  cards,
}: {
  labels: string[];
  cards: ReactNode[];
}) {
  const [active, setActive] = useState(0);
  return (
    <div className="md:hidden">
      <div className="flex flex-wrap gap-2 pb-4">
        {labels.map((label, idx) => {
          const isActive = idx === active;
          return (
            <button
              key={idx}
              onClick={() => setActive(idx)}
              aria-pressed={isActive}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-[11px] font-medium tracking-[0.04em] transition-colors",
                isActive
                  ? "border-[color:rgba(255,87,35,0.45)] bg-[var(--brand-tint)] text-[var(--brand)]"
                  : "border-[color:var(--border)] bg-transparent text-[var(--muted-foreground)]",
              )}
            >
              {label}
            </button>
          );
        })}
      </div>
      <div className="grid">
        {cards.map((card, idx) => (
          <div
            key={idx}
            aria-hidden={idx !== active}
            className={cn(
              "col-start-1 row-start-1 transition-opacity duration-300",
              idx === active ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            {card}
          </div>
        ))}
      </div>
    </div>
  );
}
