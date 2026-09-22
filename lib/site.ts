export const siteName = "Games Hub";
export const siteDescription =
  "Play free browser games online with clear categories, instant iframe play, and practical game guides.";
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const trustPagePaths = [
  "/about/",
  "/contact/",
  "/terms/",
  "/privacy/",
  "/copyright/",
] as const;
