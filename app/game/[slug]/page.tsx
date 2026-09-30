import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import GameGuide from "@/components/GameGuide";
import { games, getGame, getRelatedGames } from "@/lib/games";
import GamePlayer from "@/components/GamePlayer";
import GameCard from "@/components/GameCard";
import JsonLd from "@/components/JsonLd";
import { categorySlug } from "@/lib/games";
import {
  getBreadcrumbStructuredData,
  getFaqStructuredData,
  getGameStructuredData,
} from "@/lib/seo";
import { coreKeyword, siteName, siteUrl } from "@/lib/site";

export function generateStaticParams() {
  return games.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) return { title: "Game not found" };

  const title = `${game.title} – Play Free Online`;
  const description = `Play ${game.title} free online in your browser. No download required — a ${coreKeyword} style puzzle you can start instantly on Games Hub.`;

  return {
    title,
    description,
    keywords: [...game.categories, "online game", "browser game", "free online"],
    alternates: { canonical: `/game/${game.slug}/` },
    openGraph: {
      type: "website",
      siteName,
      title,
      description,
      url: `/game/${game.slug}/`,
      images: game.thumbnail ? [{ url: game.thumbnail, alt: game.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: game.thumbnail ? [game.thumbnail] : [],
    },
  };
}

export default async function GamePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) notFound();
  const relatedGames = getRelatedGames(game, games);
  const fallbackHref =
    relatedGames[0] != null ? `/game/${relatedGames[0].slug}/` : "/";

  return (
    <div>
      <JsonLd data={getGameStructuredData(game, siteUrl)} />
      {game.faq.length > 0 && <JsonLd data={getFaqStructuredData(game)} />}
      <JsonLd
        data={getBreadcrumbStructuredData([
          { name: "Home", url: `${siteUrl}/` },
          ...game.categories.map((category) => ({
            name: `${category} games`,
            url: `${siteUrl}/category/${categorySlug(category)}/`,
          })),
          { name: game.title, url: `${siteUrl}/game/${game.slug}/` },
        ])}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          ...game.categories.map((category) => ({
            label: `${category} games`,
            href: `/category/${categorySlug(category)}/`,
          })),
          { label: game.title },
        ]}
      />
      <Link
        href="/"
        className="mb-4 inline-flex items-center gap-1 text-sm text-ink-dim transition hover:text-ink"
      >
        ← Back to all games
      </Link>

      <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">{game.title}</h1>
          <p className="mt-2 max-w-2xl text-ink-dim">{game.description}</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {game.categories.map((c) => (
            <Link
              key={c}
              href={`/category/${categorySlug(c)}/`}
              className="rounded-full border border-border px-2.5 py-1 text-xs text-ink-dim"
            >
              {c}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <GamePlayer
          iframeUrl={game.iframeUrl}
          title={game.title}
          coverImage={game.thumbnail}
          fallbackHref={fallbackHref}
        />
      </div>

      <GameGuide game={game} />

      <section aria-labelledby="more-games-title" className="mt-12">
        <div className="mb-5 flex items-end justify-between gap-4">
          <h2 id="more-games-title" className="text-3xl font-extrabold tracking-tight">
            More games
          </h2>
          <Link href="/#all-games" className="text-sm font-bold text-brand hover:underline">
            View all games →
          </Link>
        </div>
        {relatedGames.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedGames.map((relatedGame) => (
              <GameCard key={relatedGame.slug} game={relatedGame} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-panel px-6 py-10 text-center">
            <p className="text-lg font-bold">More games are on the way</p>
            <p className="mt-2 text-ink-dim">New games will appear here as they are added.</p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {game.categories.map((category) => (
                <Link
                  key={category}
                  href={`/category/${categorySlug(category)}/`}
                  className="rounded-lg bg-brand px-4 py-2 text-sm font-bold text-white transition hover:brightness-110"
                >
                  Explore {category} games
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
