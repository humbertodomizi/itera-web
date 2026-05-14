import { cn } from "@/lib/utils";

export function Logo({
  size = 28,
  variant = "default",
  className,
  textClassName,
}: {
  size?: number;
  variant?: "default" | "mono" | "on-dark";
  className?: string;
  textClassName?: string;
}) {
  const colorClass = variant === "on-dark" ? "text-white" : "text-foreground";
  const accent = variant === "mono" ? "currentColor" : "var(--brand)";
  return (
    <div className={cn("inline-flex items-end gap-0.2", colorClass, className)}>
      <svg width={Math.round(size * 1.3)} height={size} viewBox="0 0 52 40" fill="none" aria-hidden>
        <rect x="2" y="28" width="10" height="9" rx="3" fill="currentColor" opacity="0.28" />
        <rect x="14" y="22" width="10" height="15" rx="3" fill="currentColor" opacity="0.52" />
        <rect x="26" y="14" width="10" height="23" rx="3" fill="currentColor" opacity="0.76" />
        <rect x="39" y="4" width="4" height="33" rx="3" fill={accent} />
      </svg>
      <span className={cn("text-lg font-extrabold tracking-[-0.03em] leading-none", textClassName)}>Itera</span>
    </div>
  );
}
