import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <Link className="brand footer-brand" href="/">
          <span className="brand-mark" aria-hidden="true">AF</span>
          <span className="brand-copy">
            <strong>AI Software Factory</strong>
            <small>Mastery</small>
          </span>
        </Link>
        <p>Engineering autonomous delivery beyond the coding agent.</p>
      </div>
      <div className="footer-links">
        <Link href="/learn">Choose a path</Link>
        <Link href="/topics">Browse topics</Link>
        <Link href="/coverage">Coverage and maturity</Link>
        <Link href="/docs/00-overview/09-reviewer-guide">Reviewer guide</Link>
        <Link href="/docs/00-overview/10-changelog">Changelog</Link>
        <Link href="/docs/curriculum">Full curriculum</Link>
        <Link href="/docs/12-research-journal/initial-canon">Research canon</Link>
        <a href="https://github.com/jaydubya818/ai-software-factory-mastery/issues">Give feedback</a>
      </div>
    </footer>
  );
}
