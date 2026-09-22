import assert from "node:assert/strict";
import test from "node:test";
import {
  categories,
  getCategoryDescription,
  games,
} from "../lib/games.ts";
import {
  getBreadcrumbStructuredData,
  getGameStructuredData,
  getWebsiteStructuredData,
} from "../lib/seo.ts";

const siteUrl = "https://games.example.com";

test("every category has reusable SEO copy", () => {
  for (const category of categories) {
    assert.ok(getCategoryDescription(category).length > 40);
  }
});

test("every game carries stable publication dates for sitemap and schema data", () => {
  for (const game of games) {
    assert.match(game.publishedAt, /^\d{4}-\d{2}-\d{2}$/);
    assert.match(game.updatedAt, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(new Date(game.updatedAt) >= new Date(game.publishedAt));
  }
});

test("game structured data exposes a crawlable playable game entity", () => {
  const schema = getGameStructuredData(games[0], siteUrl);

  assert.equal(schema["@type"], "VideoGame");
  assert.equal(schema.name, games[0].title);
  assert.equal(schema.url, `${siteUrl}/game/${games[0].slug}/`);
  assert.equal(schema.gamePlatform, "Web browser");
  assert.deepEqual(schema.genre, games[0].categories);
});

test("breadcrumb structured data preserves page hierarchy", () => {
  const schema = getBreadcrumbStructuredData([
    { name: "Home", url: `${siteUrl}/` },
    { name: "Board games", url: `${siteUrl}/category/board/` },
    { name: "Quoridor", url: `${siteUrl}/game/quoridor/` },
  ]);

  assert.equal(schema["@type"], "BreadcrumbList");
  assert.equal(schema.itemListElement[2].position, 3);
  assert.equal(schema.itemListElement[2].item, `${siteUrl}/game/quoridor/`);
});

test("website structured data advertises the global search endpoint", () => {
  const schema = getWebsiteStructuredData(siteUrl);

  assert.equal(schema["@type"], "WebSite");
  assert.equal(schema.potentialAction["@type"], "SearchAction");
  assert.equal(
    schema.potentialAction.target.urlTemplate,
    `${siteUrl}/?q={search_term_string}#all-games`,
  );
});
