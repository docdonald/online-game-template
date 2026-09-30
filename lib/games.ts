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
  /** Absolute HTTPS URL for the game iframe (external platform embed). */
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
    slug: "fish-sort-puzzle",
    title: "Fish Sort Puzzle",
    tagline: "Sort colorful fish into matching tubes — free in your browser.",
    description:
      "Fish Sort Puzzle is a relaxing browser puzzle where you move colorful fish between seaweed branches until matching colors are grouped. Play free online with no download.",
    howToPlay: [
      "Move fish between seaweed branches to group matching colors.",
      "Place a fish on an empty spot or on top of another fish of the same color.",
      "Keep at least one open space so you can rearrange without getting stuck.",
      "Clear the level when every fish is sorted correctly.",
    ],
    features: [
      "Free online fish sorting with no download or account.",
      "Calm puzzle pacing with increasing colors and crowded boards.",
      "Works on desktop and mobile browsers.",
    ],
    controls: [
      "Click or tap a fish to move it.",
      "Place it on an empty spot or on a matching color.",
      "Leave open spaces so you can rearrange without getting stuck.",
    ],
    faq: [
      {
        question: "Is Fish Sort Puzzle free to play?",
        answer:
          "Yes. You can play Fish Sort Puzzle free online in your browser with no purchase required.",
      },
      {
        question: "Do I need to download Fish Sort Puzzle?",
        answer:
          "No download is required. Open the game page and press Play to start in your browser.",
      },
      {
        question: "Can I play Fish Sort Puzzle on my phone?",
        answer:
          "Yes. The fish controls work with touch, so you can sort on phones and tablets.",
      },
      {
        question: "What is the goal of Fish Sort Puzzle?",
        answer:
          "Group fish of the same color together. A fish can only sit on an empty spot or on a matching color.",
      },
    ],
    icon: "🐠",
    thumbnail: "/images/fish-sort-puzzle.svg",
    categories: ["Puzzle", "Strategy"],
    iframeUrl:
      "https://html5.gamedistribution.com/3c8c6bee93124a6da49127d3569b1f21/?gd_sdk_referrer_url=https://gamedistribution.com/games/fish-sort/",
    isNew: true,
    isPopular: true,
    publishedAt: "2026-09-20",
    updatedAt: "2026-09-30",
  },
  {
    slug: "color-water-sort",
    title: "Color Water Sort",
    tagline: "Pour matching colors until every bottle is solved.",
    description:
      "Color Water Sort is a free online puzzle about pouring liquid between bottles. Plan ahead, keep an empty bottle ready, and clear each level without a download.",
    howToPlay: [
      "Select a bottle to lift its top color layer.",
      "Pour into an empty bottle or one that shares the same top color.",
      "Fill bottles completely with a single color to finish the level.",
      "Restart a level anytime if you paint yourself into a corner.",
    ],
    features: [
      "Classic water-sort logic in a free browser session.",
      "Short levels that are easy to replay.",
      "Touch-friendly pouring for phones and desktops.",
    ],
    controls: [
      "Click or tap a bottle to select it.",
      "Click or tap another bottle to pour.",
    ],
    faq: [
      {
        question: "Is Color Water Sort free online?",
        answer:
          "Yes. Color Water Sort runs free in your browser with no installation.",
      },
      {
        question: "How do I free up space when bottles are full?",
        answer:
          "Keep at least one empty bottle so you can temporarily move colors while sorting.",
      },
      {
        question: "Can I play Color Water Sort offline?",
        answer:
          "You need an internet connection to load the embedded game the first time. After that, availability depends on the game provider’s caching.",
      },
    ],
    icon: "🧪",
    thumbnail: "/images/color-water-sort.svg",
    categories: ["Puzzle", "Arcade"],
    iframeUrl:
      "https://html5.gamedistribution.com/bba6ae893ed4493eb3553c93637db902/?gd_sdk_referrer_url=https://gamedistribution.com/games/water-sort-puzzle-3/",
    isNew: true,
    publishedAt: "2026-09-22",
    updatedAt: "2026-09-30",
  },
  {
    slug: "bubble-sort-blast",
    title: "Bubble Sort Blast",
    tagline: "Clear matching bubbles with quick taps and short combo runs.",
    description:
      "Bubble Sort Blast is a free browser arcade puzzle. Pop matching bubble groups, chase combos, and keep the board clear — no download required.",
    howToPlay: [
      "Tap a cluster of two or more matching bubbles to clear them.",
      "Build combos by clearing groups in quick succession.",
      "Keep enough open space so new bubbles do not trap the board.",
      "Aim for a higher score before the board fills up.",
    ],
    features: [
      "Fast free-to-play rounds in your browser.",
      "Simple tap controls with arcade scoring.",
      "Easy to learn and quick to replay.",
    ],
    controls: [
      "Click or tap a matching bubble group to clear it.",
      "Plan ahead so larger groups stay available.",
    ],
    faq: [
      {
        question: "Is Bubble Sort Blast free?",
        answer:
          "Yes. You can play Bubble Sort Blast free online without installing an app.",
      },
      {
        question: "Does Bubble Sort Blast work on mobile?",
        answer:
          "Yes. The game is built for tap and click controls in modern mobile browsers.",
      },
      {
        question: "What makes a good move in Bubble Sort Blast?",
        answer:
          "Clear larger matching groups when you can, and leave yourself room to create the next combo.",
      },
    ],
    icon: "🫧",
    thumbnail: "/images/bubble-sort-blast.svg",
    categories: ["Puzzle", "Action", "Arcade"],
    iframeUrl:
      "https://html5.gamedistribution.com/b34a92d49e9348d591116bb98fe9dab1/?gd_sdk_referrer_url=https://gamedistribution.com/games/bubble-shooter/",
    isPopular: true,
    publishedAt: "2026-09-24",
    updatedAt: "2026-09-30",
  },
];

export const categories: Category[] = [
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
