import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "Copyright and Removal Requests",
  description: "Copyright and content removal information for Games Hub.",
  alternates: { canonical: "/copyright/" },
};

export default function CopyrightPage() {
  return (
    <InfoPage
      eyebrow="Content ownership"
      title="Copyright and Removal Requests"
      description="Game names, artwork, and embedded content may belong to their respective owners."
    >
      <section>
        <h2 className="text-2xl font-bold text-ink">Respecting original creators</h2>
        <p className="mt-3 leading-relaxed">
          Only add games and media that you own, have permission to publish, or are permitted to embed. Keep attribution and official source links with the game record when appropriate.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-bold text-ink">Request a review</h2>
        <p className="mt-3 leading-relaxed">
          A site owner should replace the contact instructions on this page with a monitored address before publishing the template.
        </p>
      </section>
    </InfoPage>
  );
}
