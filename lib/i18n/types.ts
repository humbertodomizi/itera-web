export type Lang = "es" | "en";

export type IconName =
  | "compass"
  | "wand-2"
  | "code-xml"
  | "rocket"
  | "monitor"
  | "workflow"
  | "brain-circuit"
  | "sparkles"
  | "cog"
  | "lightbulb"
  | "layers"
  | "bot"
  | "users"
  | "trending-up"
  | "zap";

export type Dictionary = {
  nav: { links: [string, string][]; cta: string };
  hero: {
    eyebrow: string;
    line1: string;
    words: string[];
    line3: string;
    sub: string;
    cta1: string;
    cta2: string;
  };
  services: {
    label: string;
    h: string;
    sub: string;
    items: { num: string; title: string; desc: string; tags: string[]; icon: IconName }[];
  };
  how: {
    label: string;
    h: string;
    steps: { n: string; title: string; desc: string; icon: IconName }[];
  };
  processes: {
    label: string;
    h: string;
    sub: string;
    items: { tag: string; title: string; desc: string; icon: IconName }[];
  };
  about: {
    label: string;
    h: string;
    p1: string;
    p2: string;
    experience: string;
    cta: string;
  };
  cta: {
    h: string;
    highlight: string;
    hSuffix: string;
    sub: string;
    whatsapp: { title: string; desc: string; btn: string };
    email: { title: string; desc: string; btn: string };
  };
  footer: {
    tagline: string;
    cols: [string, string[]][];
    copy: string;
    sub: string;
  };
};
