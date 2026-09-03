---
status: complete
priority: p1
issue_id: "003"
tags: [documentation, navigation, redirects, vercel]
dependencies: []
---

# Restructure the guide from 36 to 44 chapters

## Problem Statement

Eight chapters combine distinct concerns and are too long for a focused reading session. The supplied Phase 3 specification identifies stable split points, but its original sequencing would break existing production URLs, conflict with the requested summary pass, and make incremental test gates unreliable.

## Findings

- Phase 1 and Phase 4 apply cleanly on production commit `4870438`.
- Phase 2 caps bullet counts but required a follow-up edit to preserve the previously corrected governed-learning writeback caveat and keep every final summary coherent.
- Renumbering chapters 9–36 changes 28 published routes and therefore requires explicit redirects.
- The current test suite hardcodes 36 chapters and must migrate with the content structure.
- Deep links whose headings move from an existing Part A route to a new Part B chapter need compatibility anchors or clear forwarding links.

## Proposed Solutions

### Option 1: Apply the supplied patches and specification literally

**Approach:** Apply patches 0001–0003, renumber first, then split.

**Pros:** Closest to the supplied handoff.

**Cons:** Breaks URLs, temporarily duplicates chapter numbers, and requires rebuilding already-trimmed summaries.

**Effort:** Medium

**Risk:** High

### Option 2: Preserve the intent with a production-safe sequence

**Approach:** Apply Phases 1, 2, and 4, perform an atomic structural migration with redirects and updated tests, then audit and correct summaries against the final 44 chapters.

**Pros:** Preserves published URLs, avoids summary rework, and leaves every final chapter with a coherent conclusion.

**Cons:** Requires a larger coordinated migration and a corrective summary pass after applying Phase 2.

**Effort:** High

**Risk:** Medium

## Recommended Action

Use Option 2. Commit the structural migration and summary pass as separate, reviewable units, run the complete quality gate, merge to `main`, and deploy the linked Vercel project to production.

## Technical Details

**Affected areas:**

- `guide/` chapter files, cross-links, table of contents, front matter, and appendices
- `site/lib/` content routing and compatibility aliases
- `site/tests/` chapter-count, route, navigation, and redirect expectations
- generated search, palette, and sitemap artifacts

## Acceptance Criteria

- [x] Phase 1 establishes the two canonical Chapter 2 models.
- [x] Phase 4 marks the 32 matching glossary entries.
- [x] The guide contains exactly 44 consecutively numbered chapters.
- [x] All eight split chapters have coherent front matter, introductions, failure modes, summaries, and navigation.
- [x] Every renamed production chapter route redirects to its final canonical route.
- [x] Moved heading links have a compatibility path or explicit forwarding treatment.
- [x] The operator-surfaces catalog is published and navigable as an appendix.
- [x] Every Retain-this section has 5–7 concise bullets without losing critical governance caveats.
- [x] Content generation, build, lint, 26-test suite, internal links, external links, accessibility, and browser smoke tests pass.
- [x] The feature branch and updated `main` are pushed to GitHub.
- [x] The canonical Vercel project is deployed to production and the public URL is verified.

## Work Log

### 2026-09-03 - Approved implementation started

**By:** Codex

**Actions:**

- Reviewed all supplied patches and the complete Phase 3 specification.
- Verified clean patch application and the existing 24-test suite in an isolated worktree.
- Selected the production-safe sequencing above with the product owner's approval.

**Learnings:**

- The structural work must own URL compatibility and test migration as first-class deliverables.
- Summary editing belongs after the chapter boundaries are final.

### 2026-09-03 - Structural migration and verification completed

**By:** Codex

**Actions:**

- Expanded the guide from 36 to 44 chapters at the eight specified split points and migrated all chapter metadata, navigation, cross-links, and retained summaries.
- Added redirects for all 28 renamed chapter routes and forwarding for 72 moved legacy anchors.
- Added the operator-surfaces appendix and updated the guide, topic shelf, search experience, coverage map, and changelog.
- Preserved the governed-learning success-boundary caveat after the Phase 2 summary pass.
- Replaced three retired NIST links with current official publication or technical-report pages.
- Passed the production build, 26 automated tests, lint, internal and external link checks, strict accessibility checks in both themes, and browser smoke tests for navigation, legacy redirects, search, and the new appendix.

**Learnings:**

- Route-level redirects are not enough for a structural documentation migration; moved anchors need their own compatibility map.
- The final accessibility issue was dark-theme link contrast inside rendered Markdown, not the new chapter structure.

### 2026-09-03 - Released to production

**By:** Codex

**Actions:**

- Pushed `codex/phase-1-4-structural-migration` to GitHub and merged it into `main` as `ec8e397`.
- Deployed Vercel production deployment `dpl_49cYH7XJBjxzbMoHTxEM4rHYYrYn` with `READY` status.
- Verified through the Vercel API that `ai-software-factory-mastery.vercel.app` points to that deployment.

**Learnings:**

- The repository must be linked to the canonical `ai-software-factory-mastery` Vercel project; the similarly named `site` project does not own the production hostname.
