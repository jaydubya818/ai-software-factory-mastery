# The AI Software Factory Guide — site

This directory contains the reading experience for the book in `../guide`.
Markdown remains authoritative; the site adds the table of contents, the
chapter reader with previous/next across the whole sequence, the visual atlas,
the reference shelf (appendices), full-text search, and rendered Mermaid
diagrams. Chapter `<!-- infographic: slot -->` markers connect the source prose
to the generated graphics published under `/guide/infographics/`.

## Local development

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verification

```bash
npm run links
npm run lint
npm run build
npm test
npm run vercel-build
npm run test:next
```

`content:generate` runs before development, linting, and production builds. It
indexes the Markdown book into ignored generated TypeScript files under
`lib/`; do not edit those files directly.

`test:next` uses Next's webpack builder before starting `next start`; it tests
the native Next route contract independently from the Vinext build and render
suite. `vercel-build` remains the production build command.

## Content flow

1. Edit Markdown in `../guide`.
2. Run `npm run content:generate` or start the development server.
3. Check the table of contents, the rendered chapter, the reference shelf, and
   a search result.
4. Run the full verification sequence before publishing.

The site has no database, authentication, or persistent user state.

## Guide route and deployment modes

The Guide owns physical `/guide/...` routes and does not use Next.js
`basePath`. Its search index, social image, icon, sitemap, robots file, and
infographics are also published below `/guide`.

Leave `NEXT_PUBLIC_SITE_URL` unset on the standalone Guide deployment and its
standalone previews. In that compatibility mode, canonicals remain on
`https://ai-software-factory-mastery.vercel.app`, while hard links to FDLC-owned
pages use absolute `https://www.fdlc.ai/...` URLs. Transitional root
`robots.txt` and sitemap-index files point crawlers to the namespaced Guide
sitemap so the standalone canonical edition retains discovery continuity.

Set `NEXT_PUBLIC_SITE_URL` only for a deliberately composed deployment. Paired
branch previews should set it to their composed preview origin; the final
cutover should set it to `https://www.fdlc.ai`. In composed mode, Guide
canonicals use that origin and cross-application navigation is root-relative,
so preview traffic stays within the paired preview. Composed builds remove the
transitional root discovery files because the parent FDLC application owns
shared-domain root discovery.

The `@vercel/microfrontends` dependency is installed but intentionally inert.
Activating its Next.js wrapper, adding the shared routing configuration, and
adding a persistent legacy-host redirect are cutover approval gates. A future
cross-origin legacy-host redirect must deliberately omit query strings so
tokens or other sensitive parameters are not forwarded to another origin;
the same-origin route redirects in this repository preserve query strings,
and client-side retired-fragment remaps preserve both query and fragment.
