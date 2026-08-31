# Nightly backlog

Carried between autonomous nightly runs so they compound instead of rediscovering
the same ground. Read this first; mark resolved items Closed; do not re-propose
anything already Open; append what you check and rule out.

Written and read by the scheduled jobs that operate on this repository —
`daily-repo-improvement` (code-sourced defects) and `notes-to-factory`
(idea-sourced work from Apple Notes and the Agentic-KB). Without this file the
dedup step in both jobs is a no-op here, and the same finding is re-proposed
every night.

## Format

- `- [ ] YYYY-MM-DD — **One-line title** — body with file and symbol citations.`
- Resolved items move to `## Closed` as `- [x] YYYY-MM-DD → YYYY-MM-DD — ...`.
- Investigated and ruled out goes under `## Checked, not applicable`, with the
  reason and the paths checked, so it is never re-derived.
- Items sourced from a captured idea carry provenance: `Source: apple-note <id>`
  or `Source: KB <wiki path>`.

## Verified baseline

Measured 2026-08-31 on Node 24.18.1 / npm 11.16.0, from `site/`. This
repository is not documentation only: the root is Markdown, `site/` is a
Next.js 16.3.3 application, and the full lint / test / build sequence is
reachable. Runs that assume there is nothing to execute here are wrong.

| Command | Time | Result |
| --- | --- | --- |
| `npm ci` | 8s | 688 packages, 0 vulnerabilities |
| `npm run content:generate` | 0.2s | 49 documents |
| `npm run links` | 0.2s | 51 Markdown files, clean |
| `npm run lint` | 2.5s | clean |
| `npx tsc --noEmit` | 1.3s | clean |
| `npm run build` | 8.4s | clean (`vinext build`) |
| `npm test` | 1.4s | 15/15 pass |

Run `npm run build` before `npm test`: the suite imports `dist/server/index.js`
and fails with `ERR_MODULE_NOT_FOUND` against a missing or stale build. Export
`NODE_ENV=production` before `npm ci` and every devDependency is dropped,
producing a fake red baseline; unset it first.

## Open

- [ ] 2026-08-31 — **Eight chapter links are dead on the published site** —
  `scripts/generate-content.mjs` `walk()` skips any directory named `evidence`,
  and it only walks `guide/`. Files under `guide/10-labs/evidence/` and under
  `source-material/` therefore never become documents, so
  `resolveDocumentHref` in `site/lib/content.ts` finds no match and returns the
  raw relative href unchanged. The rendered page emits
  `<a href="../10-labs/evidence/2026-08-08-golden-path/README.md">`, which the
  browser resolves under `/docs/` and 404s. Affects
  `05-runtime-architecture/02`, `08-security-and-governance/01` (twice),
  `09-mission-control-case-studies/01`, `10-labs/01`,
  `11-interview-mastery/01`, and `curriculum` (twice — one of those is
  `../source-material/README.md`).
  Reproduce: build, then scan rendered article bodies for a relative `.md`
  href — `[...articleBody.matchAll(/href="([^"]+)"/g)]` filtered by
  `/\.md(#|$)/` and `!/^https?:/`.
  `npm run links` passes on all eight because `check-links.mjs` only checks
  that the file exists on disk; it has no notion of which files are published
  as routes, so the guard does not cover the failure it appears to cover.
  Deciding between publishing `evidence/`, rewriting the links to GitHub blob
  URLs, or rendering them as plain text is a content decision for the
  maintainer, so this run reported it rather than choosing. Whichever is
  chosen, `check-links.mjs` should also assert route resolvability, and
  `site/tests/markdown-links.test.mjs` is where the regression belongs.

- [ ] 2026-08-31 — **`extractHeadings` slugifies raw Markdown, not rendered
  text** — `scripts/generate-content.mjs` builds table-of-contents ids from the
  raw heading line while `site/app/components/Markdown.tsx` builds the heading
  element's id from what react-markdown rendered. They agree across all 943
  headings today only because both collapse runs of non-alphanumerics to one
  dash. A heading containing a link renders fewer words than it spells and the
  two diverge: `## See [the topic index](./07-topic-index.md) first` yields a
  contents entry pointing at `#see-the-topic-index-07-topic-index-md-first`
  against a heading rendered as `#see-the-topic-index-first`, and the link
  scrolls nowhere. The same raw text is also used as the visible contents
  label, so the Markdown syntax would be displayed verbatim.
  Guarded on `main` by `site/tests/toc-anchors.test.mjs`, which fails on that
  input. Fix proposed on branch `nightly/2026-08-31-improvements`; close this
  when that branch merges.

## Closed

<!-- Resolved items, most recent first. -->

## Checked, not applicable

<!-- Investigated and deliberately not actioned. Record the reason and the paths
     checked so a later run does not re-derive it. -->

- 2026-08-31 — **Next.js August 2026 advisories** — already patched, no bump
  needed. `site/package.json` pins `next` to an exact `16.3.3` and
  `site/package-lock.json` resolves `node_modules/next` to `16.3.3`, above the
  fixed line for both the unauthenticated AVIF image-optimization RCE (16.0
  through 16.2.x) and CVE-2026-75604. `npm ci` reports 0 vulnerabilities.
- 2026-08-31 — **`sharp` version skew** — not exploitable here. Two copies
  resolve: `node_modules/next/node_modules/sharp` at 0.35.4, which is the one
  Next would use, and `node_modules/sharp` at 0.35.2 pulled in by
  `miniflare` under `@cloudflare/vite-plugin`, a devDependency that never
  reaches a deployed artifact. The Cloudflare worker does not use `sharp` at
  all: `site/worker/index.ts` routes transforms to the `env.IMAGES` binding.
- 2026-08-31 — **Build-time secret inlining through Vite** — no exposure. There
  are no `.env*` files in the repository, no `import.meta.env` or `VITE_`
  reference anywhere in `site/app`, `site/lib`, `site/worker`, or
  `site/scripts`, and the only `process.env` writes are in
  `site/vite.config.ts`, setting `WRANGLER_WRITE_LOGS`, `WRANGLER_LOG_PATH`,
  and `MINIFLARE_REGISTRY_PATH` — tool paths, not credentials.
- 2026-08-31 — **Committed Cloudflare credentials** — none. There is no
  `wrangler.toml` or `wrangler.jsonc`; the worker binding config is inline in
  `site/vite.config.ts` as `main` plus `compatibility_flags` with no account
  id, token, or route. `site/.openai/hosting.json` holds a hosting project
  identifier, which is an identifier rather than a credential. A scan for
  `sk-`, `ghp_`, `github_pat_`, `AKIA`, `xox[baprs]-`, and PEM private-key
  headers across the tree returned nothing.
- 2026-08-31 — **Image optimizer SSRF and path traversal** — the guard covers
  its input space. `site/worker/index.ts` passes
  `DEFAULT_DEVICE_SIZES` + `DEFAULT_IMAGE_SIZES` as the width allowlist, and
  `parseImageParams` in `vinext/dist/server/image-optimization.js` rejects
  unknown and repeated query parameters, `url` values over 3072 characters,
  non-numeric width and quality, widths outside the allowlist, backslashes
  after normalization, and anything not beginning with a single `/` — so the
  `url` parameter cannot address an external origin.
- 2026-08-31 — **`@next/eslint-plugin-next` 16.2.6 against `next` 16.3.3** — a
  minor skew that lints clean. `npm run lint` exits 0. Bumping it would be
  churn with no defect behind it.
- 2026-08-31 — **Build-output `.gitignore` footguns** — `site/.gitignore`
  already covers `/.next/`, `/.vinext/`, `/dist/`, `/.wrangler/`, `.vercel`,
  `.env*`, and the generated `lib/*.generated.ts`. Only `*.tsbuildinfo` was
  missing and was added.
- 2026-08-31 — **Toolchain fragility** — recorded, not actioned. The build runs
  on `vinext` 1.0.0-beta.8 with `@openai/sites-vite-plugin` 0.1.0,
  `@cloudflare/vite-plugin`, and Vite 8. It is a prerelease stack, but it
  builds clean in about 8s on Node 24.18.1 and the suite passes against its
  output, so there is nothing to fix tonight. `npm ci` leaves the `esbuild`,
  `fsevents`, and `workerd` postinstall scripts unapproved without breaking
  the build.
