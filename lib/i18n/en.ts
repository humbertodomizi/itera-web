import type { Dictionary } from "@/lib/i18n/types";

export const en: Dictionary = {
  nav: {
    links: [
      ["hero", "Home"],
      ["services", "Services"],
      ["how-it-works", "How we work"],
      ["processes", "Process"],
      ["about", "About"],
      ["contact", "Contact"],
    ],
    cta: "Let's talk",
  },
  hero: {
    eyebrow: "Software · Design · Artificial Intelligence",
    line1: "Technology to",
    words: ["evolve", "automate", "optimize", "scale"],
    line3: "your business",
    sub: "We design and build AI-powered software — from web apps to custom automations — so your team works smarter and your business grows with clarity.",
    cta1: "Start your project",
    cta2: "How we work",
  },
  services: {
    label: "Services",
    h: "Everything your business needs to grow with technology.",
    sub: "We build custom software with a focus on design, user experience, and artificial intelligence. Every solution is tailored to your business — not the other way around.",
    items: [
      { num: "01", icon: "code-xml", title: "Custom Web Development", desc: "Fast, modern, easy-to-use websites and web apps. Built to scale with you and to make your customers' experience memorable.", tags: ["Web", "Mobile-first", "SEO"] },
      { num: "02", icon: "wand-2", title: "UX/UI Design", desc: "We design clear, attractive interfaces. Your product feels intuitive from the first click — no manuals, no friction.", tags: ["UX", "UI", "Prototypes"] },
      { num: "03", icon: "brain-circuit", title: "AI-Powered Software", desc: "We integrate AI into your processes: chatbots, internal assistants, automated analysis, content generation. AI isn't magic — it's well-crafted work.", tags: ["AI", "Chatbots", "LLMs"] },
      { num: "04", icon: "workflow", title: "Automations", desc: "We remove repetitive tasks by connecting your tools. What used to take hours of human time now happens automatically in seconds.", tags: ["Workflows", "APIs", "Integrations"] },
      { num: "05", icon: "layers", title: "SaaS Platforms", desc: "If you have an idea for a digital product, we walk with you from the first sketch to launch. We validate, build, and iterate together.", tags: ["SaaS", "MVP", "Product"] },
      { num: "06", icon: "sparkles", title: "Tech Consulting", desc: "We help you understand which technology fits and when. Clear, plain-language decisions — no unnecessary jargon.", tags: ["Strategy", "Roadmap", "AI"] },
    ],
  },
  how: {
    label: "How we work",
    h: "How we work\nwith AI and design.",
    steps: [
      { n: "01", icon: "compass", title: "We listen", desc: "We talk about your business, your goals, and what's slowing you down. No tech jargon — just understanding before proposing." },
      { n: "02", icon: "lightbulb", title: "We design", desc: "We present a clear proposal: what we'll build, how it'll look, how long it takes, and what it'll cost. No surprises." },
      { n: "03", icon: "code-xml", title: "We build", desc: "We work in short cycles with visible progress every week. You see it, give feedback, and we adjust as we go — no waiting months." },
      { n: "04", icon: "rocket", title: "We launch and evolve", desc: "Your product goes live and we stay with you. We improve it based on what real users learn — the first version is never the final one." },
    ],
  },
  processes: {
    label: "Process",
    h: "A simple process,\nbuilt for you.",
    sub: "We combine design, development, and AI to build software that understands people. These are the processes we apply on every project.",
    items: [
      { icon: "compass", tag: "Discovery", title: "We understand your business before proposing technology", desc: "Before writing a single line of code, we take time to understand how you work today and what's slowing you down. Only then does the solution really fit your day-to-day." },
      { icon: "wand-2", tag: "Purposeful design", title: "Clear interfaces, no user manuals required", desc: "We design screens that make sense at first glance. If your team or your customers need training to use the tool, something is off with the design." },
      { icon: "brain-circuit", tag: "Applied AI", title: "Artificial intelligence put to work for your business", desc: "We integrate AI in concrete spots: classifying email, drafting replies, suggesting answers, analyzing data. Small improvements that save real hours." },
      { icon: "workflow", tag: "Automation", title: "We connect your tools so they work on their own", desc: "Your systems talk to each other: when an order arrives, it gets billed, the team is notified, and inventory is updated. You only see the results." },
      { icon: "rocket", tag: "Continuous iteration", title: "We evolve the product alongside your business", desc: "Launching is just the beginning. We measure what works, listen to your users, and improve the product in frequent releases — no big rewrites." },
    ],
  },
  about: {
    label: "About Itera",
    h: "We build software\nyour business gets.",
    p1: "Itera was born from a simple idea: technology should feel close, not intimidating. We combine design, development, and AI to create solutions people actually want to use.",
    p2: "We work with companies starting their digital transformation and with teams that want to take their product to the next level — always with clarity, never with empty promises.",
    experience: "We've been building software and designing digital products for over 7 years — focused on what actually serves your business.",
    cta: "Learn more",
  },
  cta: {
    h: "Ready to",
    highlight: "evolve",
    hSuffix: "your business?",
    sub: "Tell us what you have in mind. We'll get back to you soon with a clear proposal — no commitment.",
    whatsapp: {
      title: "Talk on WhatsApp",
      desc: "Let's have a quick chat about your project. We reply in minutes — no long forms.",
      btn: "Let's talk",
    },
    email: {
      title: "I'd rather send an email",
      desc: "Tell us in detail what you have in mind and we'll come back with a clear proposal within 24h.",
      btn: "Send email",
    },
  },
  footer: {
    tagline: "Software, design, and artificial intelligence at the service of your business.",
    cols: [
      ["Services", ["Web Development", "UX/UI Design", "AI Software", "Automations", "Consulting"]],
      ["Company", ["About", "Contact"]],
      ["Connect", ["Instagram", "weareitera@gmail.com"]],
    ],
    copy: "© Itera. All rights reserved.",
    sub: "Technology to evolve your business.",
  },
};
