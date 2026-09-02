import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <Link className="brand footer-brand" href="/">
          <span className="brand-mark" aria-hidden="true">AF</span>
          <span className="brand-copy">
            <strong>AI Software Factory</strong>
            <small>The Guide</small>
          </span>
        </Link>
        <p>Designing, building, proving, operating, and improving the system around the agent.</p>
      </div>
      <div className="footer-links">
        <Link href="/guide">Table of contents</Link>
        <Link href="/visuals">Atlas</Link>
        <Link href="/topics">Reference</Link>
        <Link href="/docs/appendix/glossary">Glossary</Link>
        <Link href="/architecture">Architecture explorer</Link>
        <Link href="/coverage">Coverage and maturity</Link>
        <Link href="/docs/appendix/reviewer-guide">Reviewer guide</Link>
        <Link href="/docs/appendix/changelog">Changelog</Link>
        <Link href="/docs/appendix/research/initial-canon">Research canon</Link>
        <a href="https://github.com/jaydubya818/ai-software-factory-mastery/issues">Give feedback</a>
      </div>
    </footer>
  );
}
