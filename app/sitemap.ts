import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

const routes = [
  { path: "/",        priority: 1,   changeFrequency: "weekly"  },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly"  },
  { path: "/terms",   priority: 0.3, changeFrequency: "yearly"  },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
