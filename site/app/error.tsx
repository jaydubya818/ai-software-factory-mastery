"use client";

import Link from "./components/GuideLink";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";
import { fdlcUrl, GUIDE_ROUTES } from "../lib/paths";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return <><SiteHeader /><main className="interior-page not-found-page"><span className="eyebrow">Unable to load this page</span><h1>Let’s try that again.</h1><p>The guide could not finish loading. Try again, or search for the topic you need.</p><div className="hero-actions"><button type="button" className="button button-primary" onClick={reset}>Try again</button><Link className="button button-secondary" href={GUIDE_ROUTES.search}>Search the Guide</Link><a className="text-link" href={fdlcUrl()}>FDLC home →</a></div></main><SiteFooter /></>;
}
