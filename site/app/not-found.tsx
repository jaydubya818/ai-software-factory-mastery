import Link from "next/link";
import { fdlcUrl, GUIDE_ROUTES } from "../lib/paths";
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
          <Link className="button button-primary" href={GUIDE_ROUTES.search}>Search the guide</Link>
          <Link className="button button-secondary" href={GUIDE_ROUTES.home}>Table of contents</Link>
          <a className="button button-secondary" href={fdlcUrl()}>FDLC home</a>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
