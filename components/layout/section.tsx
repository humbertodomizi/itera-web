import { cn } from "@/lib/utils";

export function Section({ id, tone = "default", className, children }: { id: string; tone?: "default" | "muted"; className?: string; children: React.ReactNode }) {
  return <section id={id} className={cn("py-[120px]", tone === "muted" && "bg-[var(--surface)]", className)}>{children}</section>;
}
