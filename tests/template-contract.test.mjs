import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import test from "node:test";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));

async function readProjectFile(relativePath) {
  return readFile(join(projectRoot, relativePath), "utf8");
}

async function fileExists(relativePath) {
  try {
    await access(join(projectRoot, relativePath), constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

test("uses pnpm as the package manager", async () => {
  const packageJson = JSON.parse(await readProjectFile("package.json"));

  assert.match(packageJson.packageManager, /^pnpm@\d+\.\d+\.\d+$/);
  assert.equal(await fileExists("pnpm-lock.yaml"), true);
  assert.equal(await fileExists("package-lock.json"), false);
});

test("configures Next.js for Cloudflare Pages static export", async () => {
  const nextConfig = await readProjectFile("next.config.ts");

  assert.match(nextConfig, /output:\s*["']export["']/);
});

test("stores a cover and iframe URL for each game", async () => {
  const gameRegistry = await readProjectFile("lib/games.ts");

  assert.match(gameRegistry, /iframeUrl:/);
  assert.match(gameRegistry, /thumbnail:/);
  assert.equal(await fileExists("public/games/quoridor/cover.svg"), true);
});

test("renders new and popular game sections on the homepage", async () => {
  const homePage = await readProjectFile("app/page.tsx");

  assert.match(homePage, /New Games/);
  assert.match(homePage, /Popular Games/);
});

test("provides portal navigation with global search and ad slots", async () => {
  const header = await readProjectFile("components/SiteHeader.tsx");
  const homePage = await readProjectFile("app/page.tsx");

  assert.match(header, /type="search"/);
  assert.match(header, /name="q"/);
  assert.match(homePage, /CategorySidebar/);
  assert.match(homePage, /AdSlot/);
  assert.equal(await fileExists("components/CategorySidebar.tsx"), true);
  assert.equal(await fileExists("components/AdSlot.tsx"), true);
});

test("renders a playable featured game and static category pages", async () => {
  const homePage = await readProjectFile("app/page.tsx");
  const featuredGame = await readProjectFile("components/FeaturedGame.tsx");
  const categoryPage = await readProjectFile("app/category/[category]/page.tsx");

  assert.match(homePage, /FeaturedGame/);
  assert.match(featuredGame, /GamePlayer/);
  assert.match(homePage, /FeaturedGame/);
  assert.match(categoryPage, /generateStaticParams/);
  assert.match(categoryPage, /category/);
});

test("uses iframeUrl on the game detail page", async () => {
  const gamePage = await readProjectFile("app/game/[slug]/page.tsx");

  assert.match(gamePage, /game\.iframeUrl/);
});

test("generates sitemap and robots metadata files", async () => {
  const sitemap = await readProjectFile("app/sitemap.ts");

  assert.equal(await fileExists("app/sitemap.ts"), true);
  assert.equal(await fileExists("app/robots.ts"), true);
  assert.match(sitemap, /categorySlug/);
  assert.match(sitemap, /categories/);
});

test("connects game pages back to categories and exposes structured SEO data", async () => {
  const gamePage = await readProjectFile("app/game/[slug]/page.tsx");
  const categoryPage = await readProjectFile("app/category/[category]/page.tsx");
  const seoHelpers = await readProjectFile("lib/seo.ts");
  const jsonLd = await readProjectFile("components/JsonLd.tsx");

  assert.match(gamePage, /categorySlug/);
  assert.match(gamePage, /Breadcrumbs/);
  assert.match(gamePage, /JsonLd/);
  assert.match(categoryPage, /getCategoryDescription/);
  assert.match(seoHelpers, /VideoGame/);
  assert.match(seoHelpers, /SearchAction/);
  assert.match(jsonLd, /application\/ld\+json/);
});

test("includes reusable trust pages and footer navigation", async () => {
  const layout = await readProjectFile("app/layout.tsx");

  for (const page of ["about", "contact", "terms", "privacy", "copyright"]) {
    assert.equal(await fileExists(`app/${page}/page.tsx`), true);
  }

  assert.match(layout, /\/privacy/);
  assert.match(layout, /\/terms/);
});

test("documents the production site URL required by canonical metadata", async () => {
  const readme = await readProjectFile("README.md");

  assert.match(readme, /NEXT_PUBLIC_SITE_URL/);
  assert.match(readme, /sitemap/i);
});
