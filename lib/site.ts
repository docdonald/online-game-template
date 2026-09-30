function resolveSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (fromEnv) {
    return fromEnv;
  }
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL is required for production builds. Set it to the public HTTPS origin with no trailing slash, for example https://example.com",
    );
  }
  return "http://localhost:3000";
}

export const siteName = "Fish Sort Puzzle";
export const siteDescription =
  "Play Fish Sort Puzzle and other free browser puzzle games online. No download required.";
export const siteUrl = resolveSiteUrl();

/** Core keyword the homepage should rank for and display as its primary H1. */
export const coreKeyword = "Fish Sort Puzzle";

/** Explicit featured game for the homepage hero (does not depend on array order). */
export const featuredGameSlug = "fish-sort-puzzle";

export const homeTitle = "Fish Sort Puzzle – Play Free Online";
export const homeDescription =
  "Play Fish Sort Puzzle free online in your browser. No download required — sort colorful fish, clear the board, and enjoy quick puzzle rounds anytime.";

export const defaultShareImage = "/og/default-share.svg";

export const trustPagePaths = [
  "/about/",
  "/contact/",
  "/terms/",
  "/privacy/",
  "/copyright/",
] as const;
