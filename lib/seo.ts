import type { Game } from "./games";

type BreadcrumbItem = {
  name: string;
  url: string;
};

function absoluteUrl(siteUrl: string, path: string): string {
  return new URL(path, `${siteUrl.replace(/\/$/, "")}/`).toString();
}

export function getWebsiteStructuredData(siteUrl: string, name: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url: absoluteUrl(siteUrl, "/"),
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

export function getFaqStructuredData(game: Game) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: game.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
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
