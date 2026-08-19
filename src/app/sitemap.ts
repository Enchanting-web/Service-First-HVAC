import type { MetadataRoute } from "next";
import { posts } from "@/content/blog";
import { serviceAreas } from "@/content/service-areas";
import { site } from "@/content/site";

/** Mirrors the previous site's URL structure so existing links keep working. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.9, changeFrequency: "monthly" },
    { path: "/service-areas", priority: 0.8, changeFrequency: "monthly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/work", priority: 0.6, changeFrequency: "monthly" },
    { path: "/reviews", priority: 0.6, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.6, changeFrequency: "weekly" },
    { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms-conditions", priority: 0.2, changeFrequency: "yearly" },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...serviceAreas.map((area) => ({
      url: `${site.url}/service-areas/${area.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...posts.map((post) => ({
      url: `${site.url}/blog/${post.id}`,
      lastModified: new Date(post.date),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
