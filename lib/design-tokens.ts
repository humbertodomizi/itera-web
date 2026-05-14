export const layout = {
  section: { py: "py-[120px]", px: "px-[52px]", maxW: "max-w-[1200px]" },
  typeScale: {
    h1: "text-[clamp(52px,7vw,96px)] leading-[1.06] tracking-[-0.03em]",
    h2: "text-[52px] leading-[1.08] tracking-[-0.03em]",
    h3: "text-[32px] leading-[1.2] tracking-[-0.02em]",
    body: "text-[17px] leading-[1.65]",
    eyebrow: "text-[11px] font-bold tracking-[0.12em] uppercase",
    mono: "font-mono text-[11px] tracking-[0.1em]",
  },
  transition: "transition-all duration-[320ms] ease-out",
} as const;
