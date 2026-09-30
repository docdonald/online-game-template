import type { MetadataRoute } from "next";
import { categories, categorySlug, games } from "@/lib/games";
import { siteUrl, trustPagePaths } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const latestGameUpdate = games.reduce(
    (latest, game) => (game.updatedAt > latest ? game.updatedAt : latest),
    games[0]?.updatedAt ?? "2026-01-01",
  );

  return [
    {
      url: `${siteUrl}/`,
      lastModified: latestGameUpdate,
      changeFrequency: "daily",
      priority: 1,
    },
    ...trustPagePaths.map((path) => ({
      url: `${siteUrl}${path}`,
      lastModified: latestGameUpdate,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
    ...games.map((game) => ({
      url: `${siteUrl}/game/${game.slug}/`,
      lastModified: game.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...categories
      .filter((category) =>
        games.some((game) => game.categories.includes(category)),
      )
      .map((category) => ({
        url: `${siteUrl}/category/${categorySlug(category)}/`,
        lastModified: latestGameUpdate,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      })),
  ];
}
