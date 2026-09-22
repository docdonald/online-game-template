import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import GameCard from "@/components/GameCard";
import JsonLd from "@/components/JsonLd";
import {
  categories,
  categorySlug,
  getCategoryBySlug,
  getCategoryDescription,
  games,
} from "@/lib/games";
import { getBreadcrumbStructuredData, getGameListStructuredData } from "@/lib/seo";
import { siteName, siteUrl } from "@/lib/site";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return categories.map((category) => ({ category: categorySlug(category) }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: categoryParam } = await params;
  const category = getCategoryBySlug(categoryParam);
  const title = category ? `${category} games` : "Game category";

  return {
    title,
    description: category
      ? getCategoryDescription(category)
      : `Play browser games in the selected category on ${siteName}.`,
    alternates: { canonical: `/category/${categoryParam}/` },
    openGraph: {
      type: "website",
      siteName,
      title,
      description: category
        ? getCategoryDescription(category)
        : `Play browser games in the selected category on ${siteName}.`,
      url: `/category/${categoryParam}/`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categoryParam } = await params;
  const category = getCategoryBySlug(categoryParam);
  if (!category) notFound();

  const categoryGames = games.filter((game) => game.categories.includes(category));

  return (
    <div className="category-page">
      <JsonLd
        data={getBreadcrumbStructuredData([
          { name: "Home", url: `${siteUrl}/` },
          { name: `${category} games`, url: `${siteUrl}/category/${categoryParam}/` },
        ])}
      />
      <JsonLd
        data={getGameListStructuredData(
          categoryGames,
          `${category} games`,
          `/category/${categoryParam}/`,
          siteUrl,
        )}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: `${category} games` },
        ]}
      />
      <Link href="/" className="back-link">
        ← Back to all games
      </Link>

      <header className="mb-8">
        <p className="eyebrow">Browse by category</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
          {category} games
        </h1>
        <p className="mt-3 text-ink-dim">
          {getCategoryDescription(category)}
        </p>
        <p className="mt-3 text-sm text-ink-dim">
          {categoryGames.length} {categoryGames.length === 1 ? "game" : "games"} in this category
        </p>
      </header>

      <nav aria-label="Related categories" className="mb-8 flex flex-wrap gap-2">
        {categories
          .filter((candidate) => candidate !== category)
          .map((candidate) => (
            <Link
              key={candidate}
              href={`/category/${categorySlug(candidate)}/`}
              className="rounded-full border border-border px-3 py-1.5 text-sm text-ink-dim transition hover:border-brand hover:text-brand"
            >
              {candidate} games
            </Link>
          ))}
      </nav>

      {categoryGames.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categoryGames.map((game) => (
            <GameCard key={game.slug} game={game} />
          ))}
        </div>
      ) : (
        <section className="empty-state" aria-labelledby="empty-category-title">
          <p className="eyebrow">More games coming soon</p>
          <h2 id="empty-category-title" className="mt-2 text-2xl font-extrabold tracking-tight">
            No {category.toLowerCase()} games yet
          </h2>
          <p className="mt-3 text-ink-dim">
            Games in this category will appear here when they are added.
          </p>
          <Link href="/#all-games" className="mt-6 inline-flex rounded-lg bg-brand px-5 py-3 font-bold text-white transition hover:brightness-110">
            Browse all games
          </Link>
        </section>
      )}
    </div>
  );
}
