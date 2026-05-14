import {
  Compass,
  Wand2,
  CodeXml,
  Rocket,
  Monitor,
  Workflow,
  BrainCircuit,
  Sparkles,
  Cog,
  Lightbulb,
  Layers,
  Bot,
  Users,
  TrendingUp,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";

const MAP: Record<IconName, LucideIcon> = {
  compass: Compass,
  "wand-2": Wand2,
  "code-xml": CodeXml,
  rocket: Rocket,
  monitor: Monitor,
  workflow: Workflow,
  "brain-circuit": BrainCircuit,
  sparkles: Sparkles,
  cog: Cog,
  lightbulb: Lightbulb,
  layers: Layers,
  bot: Bot,
  users: Users,
  "trending-up": TrendingUp,
  zap: Zap,
};

export function FeatureIcon({ name, className }: { name: IconName; className?: string }) {
  const Icon = MAP[name];
  return <Icon className={cn("size-6", className)} aria-hidden="true" />;
}
