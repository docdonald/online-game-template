import GamePlayer from "@/components/GamePlayer";
import type { Game } from "@/lib/games";

export default function FeaturedGame({ game }: { game: Game }) {
  return (
    <article className="featured-game-panel">
      <div className="featured-game-copy">
        <div>
          <p className="eyebrow">Now playing</p>
          <h2 id="featured-game-title">{game.title}</h2>
        </div>
        <span className="game-status">
          <span className="game-status-dot" aria-hidden="true" />
          Ready to play
        </span>
      </div>

      <GamePlayer
        iframeUrl={game.iframeUrl}
        title={game.title}
        coverImage={game.thumbnail}
        fallbackHref="/#all-games"
        className="featured-player"
      />

      <div className="featured-game-description">
        <div>
          <p className="featured-game-kicker">Featured game</p>
          <p className="featured-game-tagline">{game.tagline}</p>
        </div>
        <p>{game.description}</p>
      </div>
    </article>
  );
}
