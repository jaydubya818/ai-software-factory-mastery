---
status: complete
priority: p1
issue_id: "002"
tags: [documentation, information-architecture, reader-experience, website]
dependencies: ["001"]
---

# Build Reader Experience V1

## Problem Statement

The curriculum is technically comprehensive but requires too much orientation
from a first-time reader. The repository needs progressive disclosure,
audience-specific paths, consistent chapter entry points, a topic map, and a
professional reading surface before it is easy to share broadly.

## Findings

- The root README explains the thesis but does not yet function as a concise
  learning-product landing page.
- The curriculum map is complete but assumes readers already understand which
  depth and sequence fit their role.
- Full chapters follow a strong eleven-section standard but lack a consistent
  Quick Read layer.
- Architecture diagrams exist locally without one canonical orientation map.
- Markdown is the right source of truth, but the repository has no searchable,
  responsive documentation site.
- Real human recruiting is outside repository implementation; structured
  executive, architect, and builder walkthroughs can identify first-pass
  navigation defects before external testing.

## Proposed Solutions

### Option 1: Markdown polish only

**Approach:** Improve navigation and chapter summaries without adding a site.

**Pros:** Minimal maintenance and no application surface.

**Cons:** Weak search, navigation, responsive reading, and shareability.

**Effort:** Medium

**Risk:** Low

---

### Option 2: Markdown-first curriculum plus generated documentation site

**Approach:** Improve the source content and generate a thin, searchable site
from the same Markdown.

**Pros:** Preserves one source of truth while making the curriculum easy to
navigate, read, and share.

**Cons:** Adds a small presentation application and build pipeline.

**Effort:** High

**Risk:** Low

---

### Option 3: Custom learning platform

**Approach:** Add accounts, persistent progress, interactive assessments, and
analytics immediately.

**Pros:** Rich learning-product behavior.

**Cons:** Premature product scope before the reading experience is validated.

**Effort:** Very high

**Risk:** High

## Recommended Action

Implement Option 2. Keep Markdown authoritative, build only the presentation
features required for Reader Experience V1, and defer user accounts, progress
persistence, comments, and analytics.

## Technical Details

- Rewrite the root landing page around a one-minute orientation.
- Add four versioned reading paths and a canonical topic index.
- Add Quick Read blocks to the ten priority chapters.
- Standardize reader-facing labels, cross-links, and visual hierarchy.
- Build a responsive multi-route site in `site/` that generates its content
  index from repository Markdown.
- Support full-text discovery, topic browsing, reading-path navigation,
  Mermaid diagrams, code, tables, and accessible mobile behavior.
- Add role-based walkthrough evidence and browser-level validation.
- Publish through the configured site host.

## Resources

- `docs/brainstorms/2026-08-30-reader-experience-v1-brainstorm.md`
- `guide/writing-standard.md`
- `guide/00-overview/README.md`
- `guide/README.md`
- Completed issue `001`

## Acceptance Criteria

- [x] Root landing page explains the product, audience, system, and next action
  within one screen of content.
- [x] Executive, Architect, Builder, and Deep Study paths have explicit
  outcomes, sequence, and expected time.
- [x] A canonical architecture map is reused across the landing and learning
  experience.
- [x] The ten priority chapters include consistent Quick Read blocks.
- [x] A topic index connects concepts to starting chapters, deep dives, and
  labs.
- [x] Terminology and repeated reader-facing explanations are consolidated.
- [x] The site renders the Markdown source through responsive documentation
  routes with search and accessible navigation.
- [x] Three role-based walkthroughs identify and resolve material navigation
  or comprehension failures.
- [x] Build, lint, link, metadata, terminology, and browser checks pass.
- [x] The finished site is published and the deployment URL is recorded.
- [x] Existing working-tree changes remain intact and exclusions pass.

## Work Log

### 2026-08-30 - Scope approved and setup started

**By:** Codex

**Actions:**

- Converted the approved reader-experience recommendation into an executable
  V1 scope.
- Selected the Markdown-first generated-site approach.
- Began site initialization on the existing feature branch while preserving
  the curriculum source and uncommitted changes.

**Learnings:**

- The presentation layer should reduce navigation cost rather than duplicate
  curriculum content.
- Reader accounts, saved progress, and analytics are not required to test the
  first shareable experience.

### 2026-08-30 - Reader Experience V1 completed and published

**By:** Codex

**Actions:**

- Reworked the repository entry points around four role-based reading paths,
  one canonical architecture map, a topic index, and consistent Quick Reads.
- Built a responsive generated site with topic browsing, full-text search,
  Markdown rendering, Mermaid diagrams, chapter navigation, and per-route
  metadata.
- Completed executive, architect, and builder browser walkthroughs and recorded
  the results in `docs/usability/2026-08-30-reader-role-walkthroughs.md`.
- Validated desktop and mobile layouts, keyboard scrolling for wide content,
  zero automated accessibility violations, 51 Markdown files for local links,
  five rendered-route tests, lint, the production build, dependency audit, and
  requested exclusions.
- Published version 1 privately at
  `https://ai-software-factory-mastery.jaydubya818.chatgpt.site`.

**Learnings:**

- A role-based first decision reduces orientation cost more effectively than a
  longer universal table of contents.
- Search works best when task-shaped queries can land directly on a chapter's
  exercise, not merely on its section index.
- Automated role walkthroughs validate implemented paths; independent readers
  are still required to validate comprehension.

## Notes

- No production data, authentication, or persistent application state is
  required.
- Post-deploy monitoring is limited to availability, route errors, and content
  build integrity.
