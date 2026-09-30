import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import CategorySidebar from "@/components/CategorySidebar";
import FeaturedGame from "@/components/FeaturedGame";
import GameBrowser from "@/components/GameBrowser";
import GameSection from "@/components/GameSection";
import JsonLd from "@/components/JsonLd";
import { getWebsiteStructuredData } from "@/lib/seo";
import {
  coreKeyword,
  defaultShareImage,
  featuredGameSlug,
  homeDescription,
  homeTitle,
  siteName,
  siteUrl,
} from "@/lib/site";
import { games } from "@/lib/games";

export const metadata: Metadata = {
  title: { absolute: homeTitle },
  description: homeDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName,
    title: homeTitle,
    description: homeDescription,
    url: "/",
    images: [defaultShareImage],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
    images: [defaultShareImage],
  },
};

export default function HomePage() {
  const featuredGame =
    games.find((game) => game.slug === featuredGameSlug) ?? games[0];
  const newGames = games.filter((game) => game.isNew);
  const popularGames = games.filter((game) => game.isPopular);

  return (
    <div className="portal-page">
      <JsonLd data={getWebsiteStructuredData(siteUrl, siteName)} />
      {featuredGame && (
        <section className="portal-hero-shell" aria-labelledby="home-title">
          <div className="portal-ad-rail portal-ad-rail-left">
            <AdSlot />
          </div>

          <div className="portal-main-grid">
            <CategorySidebar />
            <div className="portal-hero-stack">
              <h1 id="home-title" className="home-core-title">
                {coreKeyword}
              </h1>
              <FeaturedGame game={featuredGame} />
            </div>
          </div>

          <div className="portal-ad-rail portal-ad-rail-right">
            <AdSlot />
          </div>
        </section>
      )}

      <GameSection
        sectionId="new-games"
        title="New Games"
        games={newGames}
      />
      <GameSection
        sectionId="popular-games"
        title="Popular Games"
        games={popularGames}
      />

      <section id="all-games" aria-labelledby="all-games-title">
        <div className="mb-5 flex items-end justify-between gap-4">
          <h2 id="all-games-title" className="text-2xl font-bold">
            All Games
          </h2>
          <span className="text-sm text-ink-dim">{games.length} games</span>
        </div>
        <GameBrowser games={games} />
      </section>
    </div>
  );
}
