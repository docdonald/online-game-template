import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import { constants } from "node:fs";
import test from "node:test";
import { games, getRelatedGames } from "../lib/games.ts";
import { join } from "node:path";

const projectRoot = decodeURIComponent(new URL("..", import.meta.url).pathname);

function game(slug, categories) {
  return {
    slug,
    title: slug,
    tagline: slug,
    description: slug,
    icon: "♟",
    thumbnail: "/games/quoridor/cover.svg",
    categories,
    iframeUrl: `/games/${slug}/index.html`,
    howToPlay: ["Reach the opposite side."],
  };
}

test("more games excludes the current game and shows shared categories first", () => {
  const current = game("quoridor", ["Board", "Strategy"]);
  const catalog = [
    game("arcade-run", ["Arcade"]),
    game("chess", ["Board"]),
    current,
    game("maze", ["Puzzle"]),
    game("tactics", ["Strategy"]),
  ];

  assert.deepEqual(
    getRelatedGames(current, catalog).map(({ slug }) => slug),
    ["chess", "tactics", "arcade-run", "maze"],
  );
});

test("more games returns an empty list when the catalog has only the current game", () => {
  const current = game("quoridor", ["Board"]);

  assert.deepEqual(getRelatedGames(current, [current]), []);
});

test("the starter catalog includes local playable examples for internal linking", async () => {
  assert.ok(games.length >= 3);

  for (const game of games) {
    if (!game.iframeUrl.startsWith("/games/")) continue;
    const gameEntry = join(projectRoot, "public", game.iframeUrl.slice(1));
    await access(gameEntry, constants.F_OK);
  }
});
