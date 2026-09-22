import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { siteDescription, siteName, siteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: ["online games", "browser games", "HTML5 games", "free games"],
  openGraph: {
    type: "website",
    siteName,
    title: siteName,
    description: siteDescription,
    images: ["/games/quoridor/cover.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: ["/games/quoridor/cover.svg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <SiteHeader />

        <main className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">{children}</main>

        <footer className="border-t border-border py-8 text-sm text-ink-dim">
          <div className="mx-auto flex max-w-[1600px] flex-col items-center gap-4 px-4 sm:px-6 lg:px-8">
            <nav aria-label="Footer navigation" className="flex flex-wrap justify-center gap-x-5 gap-y-2">
              <Link href="/about/" className="transition hover:text-brand">About</Link>
              <Link href="/contact/" className="transition hover:text-brand">Contact</Link>
              <Link href="/terms/" className="transition hover:text-brand">Terms</Link>
              <Link href="/privacy/" className="transition hover:text-brand">Privacy</Link>
              <Link href="/copyright/" className="transition hover:text-brand">Copyright</Link>
            </nav>
            <p>Made for fun · Games Hub</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
