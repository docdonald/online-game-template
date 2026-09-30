import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";
import { siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Read the privacy information for visitors to ${siteName}.`,
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return (
    <InfoPage
      eyebrow="Site policy"
      title="Privacy Policy"
      description="This page explains the basic privacy principles for a static browser game directory."
    >
      <section>
        <h2 className="text-2xl font-bold text-ink">A minimal data footprint</h2>
        <p className="mt-3 leading-relaxed">
          This template does not require visitor accounts or a database. Search and category filtering happen in the browser, while embedded games may have their own storage or privacy practices.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-bold text-ink">Hosting and analytics</h2>
        <p className="mt-3 leading-relaxed">
          The site owner should update this page if analytics, advertising, cookies, or other third-party services are added during deployment.
        </p>
      </section>
    </InfoPage>
  );
}
