import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Read the terms of use for playing games on Games Hub.",
  alternates: { canonical: "/terms/" },
};

export default function TermsPage() {
  return (
    <InfoPage
      eyebrow="Site policy"
      title="Terms of Use"
      description="These general terms explain how visitors may use the Games Hub website and its embedded games."
    >
      <section>
        <h2 className="text-2xl font-bold text-ink">Use of the site</h2>
        <p className="mt-3 leading-relaxed">
          Use the portal lawfully and respectfully. Do not attempt to disrupt the site, bypass access controls, or use an embedded game in a way that violates its owner&apos;s terms.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-bold text-ink">Third-party games</h2>
        <p className="mt-3 leading-relaxed">
          Embedded games may be hosted by third parties. Their availability, controls, content, and policies are managed by the respective game owner.
        </p>
      </section>
    </InfoPage>
  );
}
