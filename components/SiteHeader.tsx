import Link from "next/link";
import { siteName } from "@/lib/site";

export default function SiteHeader() {
  return (
    <header className="site-header sticky top-0 z-50 border-b border-border/80 bg-bg/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1600px] items-center gap-5 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="site-brand shrink-0" aria-label={siteName}>
          <span className="site-brand-mark" aria-hidden="true">
            🎮
          </span>
          <span className="site-brand-name">{siteName}</span>
        </Link>

        <form
          action="/#all-games"
          method="get"
          role="search"
          className="site-search mx-auto flex min-w-0 flex-1 items-center"
        >
          <label htmlFor="game-search" className="sr-only">
            Search games
          </label>
          <input
            id="game-search"
            name="q"
            type="search"
            placeholder="Search games"
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent px-5 py-3 text-base font-medium text-ink outline-none placeholder:text-ink-dim/70"
          />
          <button
            type="submit"
            aria-label="Search games"
            className="grid size-11 shrink-0 place-items-center rounded-xl text-2xl text-ink-dim transition hover:bg-brand/10 hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            ⌕
          </button>
        </form>

        <nav className="hidden shrink-0 text-sm font-semibold text-ink-dim md:block">
          <Link href="/#all-games" className="transition hover:text-brand">
            All games
          </Link>
        </nav>
      </div>
    </header>
  );
}
