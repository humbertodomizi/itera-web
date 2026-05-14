export function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-[22px] border border-[color:var(--border)] bg-[var(--surface)] p-6">
      <div className="text-[36px] font-extrabold tracking-[-0.02em]">{value}</div>
      <div className="mt-2 text-[13px] text-[var(--muted-foreground)]">{label}</div>
    </div>
  );
}
