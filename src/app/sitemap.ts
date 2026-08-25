import type { MetadataRoute } from "next";
import { allWork } from "@/content/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://grahambunt.com";
  const now = new Date();

  return [
    {
      url: baseUrl,
      lastModified: now,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      priority: 0.8,
    },
    ...allWork
      .filter((item) => !item.isComingSoon)
      .map((item) => ({
        url: `${baseUrl}/work/${item.slug}`,
        lastModified: now,
        priority: 0.7,
      })),
  ];
}
