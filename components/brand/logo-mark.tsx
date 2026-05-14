export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 40" fill="none" aria-hidden>
      <rect x="2" y="28" width="10" height="9" rx="3" fill="currentColor" opacity="0.28" />
      <rect x="14" y="22" width="10" height="15" rx="3" fill="currentColor" opacity="0.52" />
      <rect x="26" y="14" width="10" height="23" rx="3" fill="currentColor" opacity="0.76" />
      <rect x="38" y="4" width="4" height="33" rx="2" fill="var(--brand)" />
    </svg>
  );
}
