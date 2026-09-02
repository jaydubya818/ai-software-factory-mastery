import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <Link className="brand footer-brand" href="/">
          <span className="brand-mark" aria-hidden="true">AF</span>
          <span className="brand-copy">
            <strong>AI Software Factory</strong>
            <small>Field Guide</small>
          </span>
        </Link>
        <p>Designing, building, operating, and improving the system around the agent.</p>
      </div>
      <div className="footer-links">
        <Link href="/guide">Read the complete guide</Link>
        <Link href="/visuals">Use the visual guide</Link>
        <Link href="/architecture">Explore the architecture</Link>
        <Link href="/topics">Browse the reference index</Link>
        <Link href="/coverage">Coverage and maturity</Link>
        <Link href="/docs/00-overview/09-reviewer-guide">Reviewer guide</Link>
        <Link href="/docs/00-overview/11-detailed-architecture-coverage-matrix">Detailed coverage matrix</Link>
        <Link href="/docs/00-overview/10-changelog">Changelog</Link>
        <Link href="/guide">Complete chapter map</Link>
        <Link href="/docs/12-research-journal/initial-canon">Research canon</Link>
        <a href="https://github.com/jaydubya818/ai-software-factory-mastery/issues">Give feedback</a>
      </div>
    </footer>
  );
}
