import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";
import { siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: `Contact ${siteName}`,
  description: `Contact ${siteName} about game suggestions, corrections, and partnership questions.`,
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return (
    <InfoPage
      eyebrow="Get in touch"
      title={`Contact ${siteName}`}
      description="Send feedback about a game, report a broken embed, or suggest an improvement for the portal."
    >
      <section>
        <h2 className="text-2xl font-bold text-ink">Game suggestions</h2>
        <p className="mt-3 leading-relaxed">
          When suggesting a game, include its name, official source, category, cover image, and the HTTPS URL that is allowed to load in an iframe.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-bold text-ink">Embed or copyright concerns</h2>
        <p className="mt-3 leading-relaxed">
          For removal requests or copyright questions, use the contact address configured by the site owner and include the exact game URL or page URL.
        </p>
      </section>
    </InfoPage>
  );
}
