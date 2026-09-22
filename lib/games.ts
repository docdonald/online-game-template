export type Category =
  | "Board"
  | "Strategy"
  | "Puzzle"
  | "Action"
  | "Arcade";

export type GameFaq = {
  question: string;
  answer: string;
};

export type Game = {
  slug: string;
  title: string;
  /** Short tagline shown on the card. */
  tagline: string;
  /** Longer description shown on the game page. */
  description: string;
  /** Short, game-specific instructions shown below the player. */
  howToPlay: string[];
  /** Search-friendly feature bullets shown on the detail page. */
  features: string[];
  /** Keyboard, mouse, or touch controls used by the game. */
  controls: string[];
  /** Useful questions and answers for the game's detail page. */
  faq: GameFaq[];
  /** Emoji or short string used as a fallback thumbnail. */
  icon: string;
  /** Optional path to a cover image under /public. */
  thumbnail?: string;
  categories: Category[];
  /** Local path or absolute URL for the game iframe. */
  iframeUrl: string;
  /** Flags for home-page sections. */
  isNew?: boolean;
  isPopular?: boolean;
  /** Stable dates used by structured data and sitemap.xml. */
  publishedAt: string;
  updatedAt: string;
};

export const categoryDescriptions: Record<Category, string> = {
  Board:
    "Play thoughtful browser board games with clear rules, tactical choices, and easy-to-learn turn-based action.",
  Strategy:
    "Find browser strategy games that reward planning, positioning, resource management, and smart long-term decisions.",
  Puzzle:
    "Solve relaxing and challenging browser puzzle games built around patterns, logic, timing, and creative problem solving.",
  Action:
    "Jump into fast browser action games with responsive controls, quick decisions, and replayable challenges.",
  Arcade:
    "Play pick-up-and-play arcade games in your browser, from short score chases to quick reflex challenges.",
};

export const games: Game[] = [
  {
    slug: "quoridor",
    title: "Quoridor",
    tagline: "Blok jalur lawan sebelum mereka sampai duluan.",
    description:
      "Game papan strategi klasik. Gerakkan pion ke sisi seberang sambil memasang dinding untuk menghadang lawan. Main 2 pemain lokal atau lawan AI.",
    howToPlay: [
      "Choose Player vs AI or local two-player mode in the game settings.",
      "Click a valid square, or use the arrow keys or WASD, to move your pawn across the board.",
      "Click a gap to place a wall. Rotate it with Space, R, or right-click; every player must keep a path to the goal.",
      "Be the first player to reach the opposite edge to win.",
    ],
    features: [
      "Local two-player mode and an AI opponent.",
      "Simple rules with deep tactical possibilities.",
      "Responsive board controls for mouse and keyboard.",
    ],
    controls: [
      "Click a square to move your pawn.",
      "Click a wall gap to place a wall.",
      "Press Space or R, or right-click, to rotate a wall.",
    ],
    faq: [
      {
        question: "Can I play Quoridor against the computer?",
        answer: "Yes. Choose Player vs AI from the game settings before starting a match.",
      },
      {
        question: "What is the goal in Quoridor?",
        answer: "Reach the opposite edge of the board before your opponent while keeping a legal path open.",
      },
    ],
    icon: "♟️",
    thumbnail: "/games/quoridor/cover.svg",
    categories: ["Board", "Strategy"],
    iframeUrl: "/games/quoridor/index.html",
    isNew: true,
    isPopular: true,
    publishedAt: "2026-09-01",
    updatedAt: "2026-09-20",
  },
  {
    slug: "color-tap",
    title: "Color Tap",
    tagline: "Test your reflexes by tapping the target before time runs out.",
    description:
      "A quick arcade reaction game. Tap the moving target as many times as possible before the timer reaches zero.",
    howToPlay: [
      "Press Start to begin the thirty-second round.",
      "Click the colored target whenever it appears.",
      "Try to beat your best score before the timer ends.",
    ],
    features: [
      "Fast rounds that are easy to replay.",
      "A simple score chase for desktop and touch screens.",
      "No account or installation required.",
    ],
    controls: [
      "Click or tap the colored target.",
      "Press Start to begin a new round.",
    ],
    faq: [
      {
        question: "How long is a Color Tap round?",
        answer: "Each round lasts thirty seconds, so you can play a quick challenge whenever you have a moment.",
      },
      {
        question: "Can I play Color Tap on a phone?",
        answer: "Yes. The target responds to touch and mouse clicks.",
      },
    ],
    icon: "🎯",
    categories: ["Action", "Arcade"],
    iframeUrl: "/games/color-tap/index.html",
    isNew: true,
    publishedAt: "2026-09-10",
    updatedAt: "2026-09-20",
  },
  {
    slug: "number-rush",
    title: "Number Rush",
    tagline: "Find the numbers in order and clear the board as quickly as you can.",
    description:
      "A lightweight browser puzzle game about focus and speed. Click each number in order while the board reshuffles for a fresh challenge.",
    howToPlay: [
      "Press Start to create a numbered board.",
      "Click the next number in ascending order.",
      "Finish the board quickly and try again for a better time.",
    ],
    features: [
      "Short puzzle rounds with instant restarts.",
      "A simple challenge for practicing focus and speed.",
      "Works with mouse, touch, and keyboard focus.",
    ],
    controls: [
      "Click the next number in the sequence.",
      "Press Start to reset the board.",
    ],
    faq: [
      {
        question: "What is the goal in Number Rush?",
        answer: "Click every number from one to nine in ascending order as quickly as possible.",
      },
      {
        question: "Is Number Rush a strategy game?",
        answer: "It is a quick puzzle challenge that rewards planning your next click and keeping a steady rhythm.",
      },
    ],
    icon: "🔢",
    categories: ["Puzzle", "Strategy"],
    iframeUrl: "/games/number-rush/index.html",
    isPopular: true,
    publishedAt: "2026-09-12",
    updatedAt: "2026-09-20",
  },
];

export const categories: Category[] = [
  "Board",
  "Strategy",
  "Puzzle",
  "Action",
  "Arcade",
];

export function categorySlug(category: Category): string {
  return category.toLowerCase();
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => categorySlug(category) === slug);
}

export function getCategoryDescription(category: Category): string {
  return categoryDescriptions[category];
}

export function getGame(slug: string): Game | undefined {
  return games.find((g) => g.slug === slug);
}

export function getRelatedGames(game: Game, catalog: Game[]): Game[] {
  return catalog
    .filter((candidate) => candidate.slug !== game.slug)
    .sort((first, second) => {
      const sharedWithFirst = first.categories.filter((category) =>
        game.categories.includes(category),
      ).length;
      const sharedWithSecond = second.categories.filter((category) =>
        game.categories.includes(category),
      ).length;
      return sharedWithSecond - sharedWithFirst;
    })
    .slice(0, 6);
}
