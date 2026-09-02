# The AI Software Factory Guide — site

This directory contains the reading experience for the book in `../guide`.
Markdown remains authoritative; the site adds the table of contents, the
chapter reader with previous/next across the whole sequence, the visual atlas,
the reference shelf (appendices), full-text search, and rendered Mermaid
diagrams. Chapter `<!-- infographic: slot -->` markers render as dashed
"Infographic placeholder" callouts until the graphics arrive.

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
```

`content:generate` runs before development, linting, and production builds. It
indexes the Markdown book into ignored generated TypeScript files under
`lib/`; do not edit those files directly.

## Content flow

1. Edit Markdown in `../guide`.
2. Run `npm run content:generate` or start the development server.
3. Check the table of contents, the rendered chapter, the reference shelf, and
   a search result.
4. Run the full verification sequence before publishing.

The site has no database, authentication, or persistent user state.
