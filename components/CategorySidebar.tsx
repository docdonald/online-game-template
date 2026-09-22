import Link from "next/link";
import { categories, categorySlug } from "@/lib/games";

const categoryIcons: Record<string, string> = {
  Board: "♟",
  Strategy: "⚔",
  Puzzle: "✦",
  Action: "⚡",
  Arcade: "◈",
};

export default function CategorySidebar() {
  return (
    <aside className="category-sidebar" aria-label="Game navigation">
      <div className="category-sidebar-heading">
        <span>Explore</span>
        <span className="category-sidebar-rule" aria-hidden="true" />
      </div>

      <nav>
        <Link className="category-sidebar-link category-sidebar-link-featured" href="/#new-games">
          <span aria-hidden="true">✦</span>
          <span>New games</span>
        </Link>
        <Link className="category-sidebar-link category-sidebar-link-featured" href="/#popular-games">
          <span aria-hidden="true">★</span>
          <span>Hot games</span>
        </Link>

        <div className="category-sidebar-heading category-sidebar-heading-categories">
          <span>Categories</span>
          <span className="category-sidebar-rule" aria-hidden="true" />
        </div>

        {categories.map((category) => (
          <Link
            key={category}
            className="category-sidebar-link"
            href={`/category/${categorySlug(category)}`}
          >
            <span className="category-sidebar-icon" aria-hidden="true">
              {categoryIcons[category]}
            </span>
            <span>{category}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
