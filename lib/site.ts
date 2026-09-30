export const siteName = "Games Hub";
export const siteDescription =
  "Play free browser games online with clear categories, instant iframe play, and practical game guides.";
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/** Core keyword the homepage should rank for and display as its primary H1. */
export const coreKeyword = "Fish Sort Puzzle";

/** Explicit featured game for the homepage hero (does not depend on array order). */
export const featuredGameSlug = "fish-sort-puzzle";

export const homeTitle = "Fish Sort Puzzle – Play Free Online";
export const homeDescription =
  "Play Fish Sort Puzzle free online in your browser. No download required — sort colorful fish, clear tubes, and enjoy quick puzzle rounds anytime.";

export const defaultShareImage = "/og/default-share.svg";

export const trustPagePaths = [
  "/about/",
  "/contact/",
  "/terms/",
  "/privacy/",
  "/copyright/",
] as const;
