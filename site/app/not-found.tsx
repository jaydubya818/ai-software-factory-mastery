import Link from "next/link";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="interior-page not-found-page">
        <span className="eyebrow">404</span>
        <h1>That page is not in the guide.</h1>
        <p>The address may have changed when the book was reorganized. Search for the term you were after, or start from the map.</p>
        <div className="hero-actions">
          <Link className="button button-primary" href="/search">Search the guide</Link>
          <Link className="button button-secondary" href="/guide">Table of contents</Link>
          <Link className="button button-secondary" href="/">Home</Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
