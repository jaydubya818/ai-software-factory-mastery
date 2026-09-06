import { CommandPalette } from "./CommandPalette";
import { PrimaryNav } from "./PrimaryNav";
import { ThemeToggle } from "./ThemeToggle";
import { fdlcUrl } from "../../lib/paths";

export function SiteHeader() {
  return (
    <header className="app-header">
      <div className="site-header">
        <a className="brand" href={fdlcUrl()} aria-label="FDLC home">
          <span className="brand-mark" aria-hidden="true">F</span>
          <span className="brand-copy">
            <strong>FDLC</strong>
            <small>The Guide</small>
          </span>
        </a>
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
