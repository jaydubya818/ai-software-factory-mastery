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
npx playwright install chromium
npm run dev
```

Open `http://localhost:3000`.

## Verification

```bash
npm run links
npm run lint
npm run build
npm test
npm run test:next
```

`content:generate` runs before development, linting, and production builds. It
indexes the Markdown book into ignored generated TypeScript files under
`lib/`; do not edit those files directly.

`test:next` and `vercel-build` use Next's webpack builder; this keeps the
deployed Microfrontends asset transforms on the same production path exercised
by the native runtime test. The suite validates that route contract
independently from the Vinext build and render suite.

`vercel-build` is the deployment entrypoint, not a local verification command.
It intentionally fails unless Vercel supplies an exact Preview or Production
target and the corresponding release approval described below. Direct,
unmarked `next build` calls also fail; use `npm run test:next` for the reviewed
local native-build path and `npm run dev:next -- --port <port>` for the reviewed
native development path used with the Microfrontends proxy.

For local composition, `npm run microfrontends:port` prints the Guide's
deterministic port and `npm run microfrontends:proxy` starts the two-app proxy.
Both commands pin the checked-in generated snapshot for the CLI.

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

FDLC's root `microfrontends.json` is the sole routing authority. This repository
commits only its generated, schema-pure build snapshot at
`config/microfrontends.generated.json` and a provenance manifest beside it.
Every native Next.js build validates that pair before activating
`@vercel/microfrontends`; a missing, hand-edited, malformed, or fingerprint-
mismatched snapshot fails the build rather than emitting unprefixed assets.
The `dev`, `build`, and `start` scripts explicitly mark the local Vinext
toolchain as standalone, so it validates the same snapshot but does not apply
Next-specific Microfrontends transforms that Vinext cannot use.

Refresh the snapshot only from the authoritative FDLC GitHub checkout after
fetching or pushing its reviewed branch. The config commit must be reachable
from an `origin/*` remote-tracking branch. Then verify the source and generated
files again before pushing:

```bash
npm run microfrontends:sync -- /absolute/path/to/FDLC/microfrontends.json
npm run microfrontends:check -- /absolute/path/to/FDLC/microfrontends.json
```

The sync is explicit and local. Builds never fetch routing configuration from
Vercel or GitHub. The SHA-256 is calculated over the full parsed config after
recursively sorting object keys while preserving array order. Vercel builds
also require two non-secret trust anchors to match the manifest:
`FDLC_MFE_CONFIG_SHA256` and `FDLC_MFE_SOURCE_COMMIT`. The former binds the
semantic config; the latter binds the exact commit that last changed FDLC's
authoritative config. Scope both to the approved Preview branch, together with
`GUIDE_MFE_PREVIEW_ENABLED=true`. Keep all three absent from Production until a
separate production-cutover approval. Preview rejects the Production approval
flag, and Production rejects the Preview approval flag.

An approved Production build must receive the same independently reviewed
digest and source commit plus the separate server-only
`GUIDE_MFE_PRODUCTION_ENABLED=true` gate. The approval flag is authorization;
the digest and commit prove input identity. `GUIDE_VERCEL_BUILD=1` is an
internal package-script marker and must not be configured as a cloud
environment variable. The deployment entrypoint additionally requires
Vercel's target to be exactly `preview` or `production`.

Do not set `VC_MICROFRONTENDS_CONFIG` or point
`VC_MICROFRONTENDS_CONFIG_FILE_NAME` anywhere else—the Next configuration owns
the one accepted snapshot path and rejects ambiguous inputs. A fixed Guide
application name is passed to the wrapper so ambient Nx or stale local Vercel
metadata cannot change asset ownership. The exact two-application structure in
the verifier is a defensive acceptance allowlist; FDLC's committed source
remains the routing authority.

Cross-origin retirement redirects are server-only and opt-in. Leave
`GUIDE_LEGACY_REDIRECTS_ENABLED` unset in compatibility deployments so the old
Guide hostname continues serving its pages. Set it to the exact value `true`
only in a deployment where retiring that hostname has been explicitly
approved.

When enabled, GET and HEAD requests on the retired Guide hostname for published
routes and explicit legacy aliases permanently redirect to their allowlisted
`https://www.fdlc.ai/guide/...` destination. Those cross-origin redirects drop
the entire query string; unknown paths and non-navigation methods are not
forwarded. Same-origin route redirects still preserve queries, and client-side
retired-fragment remaps preserve both query and fragment.
