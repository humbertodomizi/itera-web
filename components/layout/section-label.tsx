export function SectionLabel({ label }: { label: string }) {
  return (
    <div className="mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--brand)]">
      <span className="h-px w-6 bg-[var(--brand)]" />
      {label}
    </div>
  );
}
