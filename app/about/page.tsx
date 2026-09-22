import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "About Games Hub",
  description: "Learn what Games Hub is and how this browser game directory works.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <InfoPage
      eyebrow="About the portal"
      title="About Games Hub"
      description="Games Hub is a simple browser game directory built for quick discovery and instant play."
    >
      <section>
        <h2 className="text-2xl font-bold text-ink">A focused place for browser games</h2>
        <p className="mt-3 leading-relaxed">
          Each game has a dedicated page with a playable iframe, categories, controls, and a short guide. The catalog is designed to stay fast, readable, and easy to extend.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-bold text-ink">How games are added</h2>
        <p className="mt-3 leading-relaxed">
          Games can be hosted as local static files or embedded from an external HTTPS URL when the game owner permits iframe embedding.
        </p>
      </section>
    </InfoPage>
  );
}
