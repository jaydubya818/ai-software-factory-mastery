import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="AI Software Factory Mastery home">
        <span className="brand-mark" aria-hidden="true">AF</span>
        <span className="brand-copy">
          <strong>AI Software Factory</strong>
          <small>Mastery</small>
        </span>
      </Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        <Link href="/architecture">Architecture</Link>
        <Link href="/learn">Learning paths</Link>
        <Link href="/topics">Topics</Link>
        <Link href="/coverage">Coverage</Link>
        <Link href="/docs/00-overview/02-canonical-glossary">Glossary</Link>
        <Link className="search-link" href="/search" aria-label="Search the curriculum">
          Search <kbd>/</kbd>
        </Link>
      </nav>
      <details className="mobile-menu">
        <summary aria-label="Open navigation">Menu</summary>
        <nav aria-label="Mobile navigation">
          <Link href="/architecture">Architecture</Link>
          <Link href="/learn">Learning paths</Link>
          <Link href="/topics">Topics</Link>
          <Link href="/coverage">Coverage</Link>
          <Link href="/docs/00-overview/02-canonical-glossary">Glossary</Link>
          <Link href="/search">Search</Link>
        </nav>
      </details>
    </header>
  );
}
