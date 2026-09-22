import type { Game } from "@/lib/games";

export default function GameGuide({ game }: { game: Game }) {
  return (
    <>
      <section
        aria-labelledby="how-to-play-title"
        className="mt-12 rounded-2xl border border-border bg-panel p-6 sm:p-8"
      >
        <p className="eyebrow">Game guide</p>
        <h2 id="how-to-play-title" className="mt-2 text-3xl font-extrabold tracking-tight">
          How to play {game.title}
        </h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2">
          {game.howToPlay.map((step, index) => (
            <li key={step} className="flex gap-4 rounded-xl bg-bg p-4">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand text-sm font-bold text-white">
                {index + 1}
              </span>
              <p className="self-center leading-relaxed text-ink-dim">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-2" aria-label={`${game.title} details`}>
        <div className="rounded-2xl border border-border bg-panel p-6 sm:p-8">
          <p className="eyebrow">Highlights</p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight">Why play {game.title}?</h2>
          <ul className="mt-5 space-y-3 text-ink-dim">
            {game.features.map((feature) => (
              <li key={feature} className="flex gap-3">
                <span className="text-brand" aria-hidden="true">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-panel p-6 sm:p-8">
          <p className="eyebrow">Controls</p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight">How to control the game</h2>
          <ul className="mt-5 space-y-3 text-ink-dim">
            {game.controls.map((control) => (
              <li key={control} className="flex gap-3">
                <span className="text-brand" aria-hidden="true">•</span>
                <span>{control}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-12" aria-labelledby="faq-title">
        <p className="eyebrow">FAQ</p>
        <h2 id="faq-title" className="mt-2 text-3xl font-extrabold tracking-tight">
          Frequently asked questions
        </h2>
        <div className="mt-5 space-y-3">
          {game.faq.map((item) => (
            <details key={item.question} className="rounded-2xl border border-border bg-panel p-5">
              <summary className="cursor-pointer font-bold">{item.question}</summary>
              <p className="mt-3 leading-relaxed text-ink-dim">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
