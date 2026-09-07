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
  the legacy executive-mastery source, and `curriculum` (twice — one of those is
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

## Closed

<!-- Resolved items, most recent first. -->

- [x] 2026-09-07 → 2026-09-07 — **Chapter 43 missing `absorbs` frontmatter** — all 44 `guide/*.md` chapters carry `title/part/chapter/summary/absorbs/infographics`; `guide/06-improve/43-mastering-the-factory.md` was the sole file missing `absorbs`. `docs/plans/coverage-map.md` line 62 records its v1 source as `11-interview-mastery/01-executive-and-interview-mastery.md`, so that value was added, matching the format used by every other chapter (path relative to `archive/guide-v1/`).

## Checked, not applicable

<!-- Investigated and deliberately not actioned. Record the reason and the paths
     checked so a later run does not re-derive it. -->

- 2026-09-07 — **`extractHeadings` slugifies raw Markdown, not rendered text — already implemented** — the 2026-08-31 entry described `scripts/generate-content.mjs` and `site/app/components/Markdown.tsx` computing heading ids independently (raw heading line vs. react-markdown output) and diverging on headings containing inline links. That is no longer how either builds an id: both now call the shared `markdownHeadings()` / `remarkHeadingIds()` in `site/lib/markdown-headings.ts`, which parses the Markdown to an mdast tree, extracts each heading's rendered text via `headingText()` (walking into link/emphasis children rather than reading raw source), and slugifies that. `generate-content.mjs` imports `markdownHeadings` at line 5; `Markdown.tsx` imports `remarkHeadingIds` and passes it as a `remarkPlugins` entry, so both consumers share one id allocation per document. Verified rather than inferred: cut `origin/main` into an isolated worktree, ran `npm run content:generate` then a full `vinext build`, then `node --experimental-strip-types --test tests/toc-anchors.test.mjs` — both cases in the file the 2026-08-31 entry cited as failing now pass (`every table-of-contents entry targets a heading that exists`, `changelog repeated headings have distinct TOC and search destinations`). The `nightly/2026-08-31-improvements` branch this entry pointed at as the fix is not what resolved it and should not be merged for this: as of 2026-09-07 that branch is a 473-file / -47,388-line restructuring unrelated in scope (see ACTION REQUIRED). No branch needed; the shared module already shipped to `main` under a different change. Source: apple-notes harvest, notes-to-factory scheduled run (Phase 2e backlog survey, no Apple Notes work orders this run).
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
- 2026-09-07 — **Nightly run scoped as docs-only tonight** — this run's
  briefing classified the repo as docs/markdown-only with no build or test
  suite and a V1 (lint + links) verification ceiling. That is inconsistent
  with this file's own 2026-08-31 baseline, which records `site/` as a
  buildable/testable Next.js 16.3.3 app (`npm ci`, `npm run lint`, `tsc
  --noEmit`, `npm run build`, `npm test`, all green). Tonight's run followed
  the assigned docs-only scope rather than re-deriving the classification
  (no build/test commands were run, no `site/` code was touched), but the
  discrepancy should be corrected before the next run so it isn't scoped
  as docs-only again. Both Open items below require `site/` code changes and
  were left untouched for this reason.
- 2026-09-07 — **Branch `nightly/2026-08-31-improvements` still unmerged** —
  carries the fix for the `extractHeadings` TOC-anchor bug (see Open, below)
  plus seven other commits (baseline docs, link/heading test coverage, a
  `.gitignore` fix). It has sat unmerged for a week. Not merged tonight
  because the fix is a `site/` code change and this run's verification ceiling
  was capped at V1; a run with code-change scope should review and merge it
  after re-running the test suite rather than trusting a week-old green run.
- 2026-09-07 — **Link check baseline (docs-only scope)** — manual scan (no
  `site/` tooling invoked) of all 175 non-`site/` Markdown files found 2,641
  links. Excluding `archive/guide-v1/` (85 dead relative links, all inside a
  tree `README.md` explicitly documents as "preserved unchanged for
  provenance" — not touched) and `docs/editorial/content-inventory.generated.md`
  (auto-generated by `site/scripts/check-editorial-integrity.mjs`, header
  says "Do not edit manually" — several stale relative links there, needs
  regeneration, not a hand edit), the actively maintained tree
  (`guide/`, `docs/` minus the generated file, `README.md`, `CONTRIBUTING.md`,
  `source-material/`, `todos/`) has zero broken relative links. The two
  remaining flags from the automated scan (`docs/NIGHTLY-BACKLOG.md`'s
  `./07-topic-index.md` and `guide/appendix/coverage-and-maturity.md`'s
  `/guide/coverage`) are false positives: the former is a quoted code example
  inside prose, not a real link; the latter is an absolute site route
  (`site/app/guide/coverage` exists) rather than a file path. Spot-checked 4
  of 704 external links (`fdlc.ai`, `docs.tessl.io`, `docs.ag-ui.com`,
  `devfile.io`) — all returned HTTP 200.
- 2026-08-31 — **Toolchain fragility** — recorded, not actioned. The build runs
  on `vinext` 1.0.0-beta.8 with `@openai/sites-vite-plugin` 0.1.0,
  `@cloudflare/vite-plugin`, and Vite 8. It is a prerelease stack, but it
  builds clean in about 8s on Node 24.18.1 and the suite passes against its
  output, so there is nothing to fix tonight. `npm ci` leaves the `esbuild`,
  `fsevents`, and `workerd` postinstall scripts unapproved without breaking
  the build.
