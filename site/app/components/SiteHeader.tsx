import Link from "next/link";
import { CommandPalette } from "./CommandPalette";
import { LifecycleNav } from "./LifecycleNav";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  return (
    <header className="app-header">
      <div className="site-header">
        <Link className="brand" href="/" aria-label="AI Software Factory Mastery home">
          <span className="brand-mark" aria-hidden="true">AF</span>
          <span className="brand-copy">
            <strong>AI Software Factory</strong>
            <small>Mastery Console</small>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link href="/architecture">Architecture</Link>
          <Link href="/learn">Learn</Link>
          <Link href="/topics">Topics</Link>
          <Link href="/coverage">Coverage</Link>
          <Link href="/docs/00-overview/02-canonical-glossary">Glossary</Link>
        </nav>
        <div className="header-tools"><CommandPalette /><ThemeToggle /></div>
        <details className="mobile-menu">
          <summary aria-label="Open navigation">Menu</summary>
          <nav aria-label="Mobile navigation">
            <Link href="/architecture">Architecture</Link>
            <Link href="/learn">Learning paths</Link>
            <Link href="/topics">Topics</Link>
            <Link href="/coverage">Coverage</Link>
            <Link href="/docs/00-overview/02-canonical-glossary">Glossary</Link>
            <Link href="/search">Full search</Link>
          </nav>
        </details>
      </div>
      <LifecycleNav />
    </header>
  );
}
