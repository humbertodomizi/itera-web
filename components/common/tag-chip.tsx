export function TagChip({ label }: { label: string }) {
  return <span className="rounded-md border border-[color:rgba(255,87,35,0.10)] bg-[var(--brand-tint)] px-2.5 py-0.5 font-mono text-[11px] text-[var(--muted-foreground)]">{label}</span>;
}
