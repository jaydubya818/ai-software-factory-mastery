import Link from "./GuideLink";
import { FDLC_ORIGIN, fdlcUrl } from "../../lib/paths";


import { footerGroups } from "../../lib/global-navigation.generated";

export function SiteFooter() {
  return (
    <footer className="global-footer">
      <div className="global-footer-inner">
        <div className="global-footer-brand">
          <a className="global-logo" href={fdlcUrl()} aria-label="FDLC.ai home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="brand-logo" src={`${FDLC_ORIGIN}/fdlc-logo-transparent.png`} alt="FDLC.ai — Factory Development Lifecycle" width={2007} height={784} />
          </a>
          <p>The operating model and technical foundation for trusted autonomous software delivery.</p>
        </div>
        {footerGroups.map(([title, links]) => (
          <nav aria-label={`${title} links`} className="global-footer-group" key={title}>
            <strong>{title}</strong>
            {links.map(([label, href]) => href.startsWith("/guide")
              ? <Link href={href} key={href}>{label}</Link>
              : <a href={href.startsWith("/") ? fdlcUrl(href) : href} key={href}>{label}{href.startsWith("http") && <span aria-hidden="true"> ↗</span>}</a>)}
          </nav>
        ))}
      </div>
      <div className="global-footer-base">
        <span>© 2026 FDLC.ai</span>
        <span>Factory Development Lifecycle</span>
        <span><Link href="/guide/appendix/reviewer-guide">Reviewer guide</Link> · <Link href="/guide/appendix/changelog">Changelog</Link> · <a href="https://github.com/jaydubya818/ai-software-factory-mastery/issues">Give feedback</a></span>
      </div>
    </footer>
  );
}
