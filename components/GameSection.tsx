import type { Game } from "@/lib/games";
import GameCard from "./GameCard";

export default function GameSection({
  sectionId,
  title,
  games,
}: {
  sectionId: string;
  title: string;
  games: Game[];
}) {
  if (games.length === 0) return null;

  return (
    <section aria-labelledby={sectionId} className="game-section mb-12">
      <div className="mb-5 flex items-end justify-between gap-4">
        <h2 id={sectionId} className="text-2xl font-bold">
          {title}
        </h2>
        <span className="text-sm text-ink-dim">{games.length} games</span>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <GameCard key={game.slug} game={game} />
        ))}
      </div>
    </section>
  );
}
