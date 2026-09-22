import type { Game } from "./games";

type BreadcrumbItem = {
  name: string;
  url: string;
};

function absoluteUrl(siteUrl: string, path: string): string {
  return new URL(path, `${siteUrl.replace(/\/$/, "")}/`).toString();
}

export function getWebsiteStructuredData(siteUrl: string, name = "Games Hub") {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url: absoluteUrl(siteUrl, "/"),
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl.replace(/\/$/, "")}/?q={search_term_string}#all-games`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function getGameStructuredData(game: Game, siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: game.title,
    description: game.description,
    url: absoluteUrl(siteUrl, `/game/${game.slug}/`),
    image: game.thumbnail ? absoluteUrl(siteUrl, game.thumbnail) : undefined,
    genre: game.categories,
    applicationCategory: "Game",
    gamePlatform: "Web browser",
    operatingSystem: "Any",
    datePublished: game.publishedAt,
    dateModified: game.updatedAt,
  };
}

export function getBreadcrumbStructuredData(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getGameListStructuredData(
  games: Game[],
  name: string,
  pageUrl: string,
  siteUrl: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    url: absoluteUrl(siteUrl, pageUrl),
    numberOfItems: games.length,
    itemListElement: games.map((game, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(siteUrl, `/game/${game.slug}/`),
      name: game.title,
    })),
  };
}
