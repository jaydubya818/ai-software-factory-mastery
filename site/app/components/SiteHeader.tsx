import Link from "next/link";
import { CommandPalette } from "./CommandPalette";
import { PrimaryNav } from "./PrimaryNav";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  return (
    <header className="app-header">
      <div className="site-header">
        <Link className="brand" href="/" aria-label="The AI Software Factory Guide home">
          <span className="brand-mark" aria-hidden="true">AF</span>
          <span className="brand-copy">
            <strong>AI Software Factory</strong>
            <small>The Guide</small>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <PrimaryNav />
        </nav>
        <div className="header-tools"><CommandPalette /><ThemeToggle /></div>
        <details className="mobile-menu">
          <summary aria-label="Open navigation">Menu</summary>
          <nav aria-label="Mobile navigation">
            <PrimaryNav mobile />
          </nav>
        </details>
      </div>
    </header>
  );
}
