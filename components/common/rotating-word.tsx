"use client";

import { useRotatingIndex } from "@/lib/hooks/use-rotating-index";
import { cn } from "@/lib/utils";

export function RotatingWord({ words, className }: { words: string[]; className?: string }) {
  const { index, phase } = useRotatingIndex(words.length);
  return (
    <span
      className={cn("inline-block text-[var(--brand)]", className)}
      style={{ animation: phase === "in" ? "word-slide-up .55s cubic-bezier(.22,1,.36,1) forwards" : "word-fade-out .42s cubic-bezier(.4,0,.2,1) forwards" }}
    >
      {words[index]}
    </span>
  );
}
