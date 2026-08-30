# AI Software Factory Mastery Site

This directory contains the generated reading experience for the curriculum in
`../guide`. Markdown remains authoritative; the site adds role-based paths,
topic browsing, full-text search, responsive chapter pages, and rendered
Mermaid diagrams.

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
indexes the Markdown curriculum into ignored generated TypeScript files under
`lib/`; do not edit those files directly.

## Content flow

1. Edit Markdown in `../guide`.
2. Run `npm run content:generate` or start the development server.
3. Check the relevant reading path, topic page, search result, and rendered
   chapter.
4. Run the full verification sequence before publishing.

The site has no database, authentication, or persistent user state.
