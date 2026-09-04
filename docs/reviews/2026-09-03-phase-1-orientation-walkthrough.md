---
title: Phase 1 Orientation Walkthrough
date: 2026-09-03
status: awaiting-product-owner-approval
scope: conceptual-spine
---

# Phase 1 Orientation Walkthrough

## Outcome

Phase 1 establishes one primary reader model and one supporting architecture
model across Chapter 2, the stage briefs, front matter, homepage, guide index,
Atlas, architecture explorer, and command palette.

- Primary: **Intent → Plan → Define Agent → Execute through Harness → Apply
  Skills → Evaluate → Improve → Deliver Software**.
- Supporting: **Intent, Harness, Capability, Model, Trust, and Learning**,
  surrounded by adoption.
- Every other retained framework is labeled as a vocabulary, maturity,
  responsibility, detail, implementation, operating, selection, boundary, or
  reference lens.

This is an author-side product walkthrough. It verifies routes, content,
hierarchy, and usability mechanics. It does not replace the representative
reader validation required before final publication.

## Editorial comparison

| Measure | Baseline | Phase 1 | Change |
| --- | ---: | ---: | ---: |
| Chapter 2 public words | 11,442 | 4,212 | -7,230 (-63%) |
| Eight stage-page public words | 34,993 | 6,999 | -27,994 (-80%) |
| Individual stage range | 3,731–5,379 | 834–935 | All within 800–1,500 |
| Chapter 2 `Retain this` | 20 bullets / 603 words | 6 bullets / 130 words | Within 5–7 / 220 |
| Full public corpus | 382,404 | 345,474 | -36,930 (-10%) |
| Vague-source occurrences | 27 | 22 | Five removed with duplicate orientation prose |

No chapter or stage slug changed. Every Chapter 2 legacy heading recorded in
the concept-ownership map remains present at the same generated anchor.

## Walkthroughs

### First-time reader — pass

Path: homepage → `Understand the model` → Chapter 2 → stage brief or owning
chapter.

- Homepage identifies the eight-stage stream as the primary model.
- Chapter 2 names the primary and supporting models before introducing detail.
- All eight stages appear in order and link to concise briefs.
- The six architectural areas name their responsibility and owning chapters.
- A worked tenant-isolation example walks one change through both models.
- `Retain this` contains six prioritized principles.

Browser assertions: orientation link present; eight homepage stage links;
primary and supporting model language present; eight stage links in Chapter 2;
six `Retain this` items.

### Executive — pass

Path: homepage → Chapter 2 → governance, economics, or first-corridor guidance.

- The business outcome is validated production value, not generated code.
- Human authority, evidence, risk, attention, and adoption are visible in the
  orientation rather than deferred to technical chapters.
- Chapter 2 links directly to governance and economics through its contents
  navigation and ownership material.
- `How to build it` recommends one valuable, repeatable, reversible corridor
  and gives a ten-step path from intent through observed outcome.

Browser assertions: governance and economics routes are present from the
Chapter 2 experience; first-corridor implementation guidance is present.

### Architect — pass

Path: homepage → Chapter 2 → six-area ownership table → canonical chapter.

- The value stream answers sequence; the six areas answer system ownership.
- Commands and authority flow down; observations and evidence flow up.
- Product, runtime, harness, Agent Factory, software factory, knowledge, and
  control-plane responsibilities remain distinguishable without becoming
  top-level competing models.
- Atlas sections identify their lens and link to the chapter that owns the
  full treatment.

Browser assertions: six-area table present; 17 links from Chapter 2 to Build,
Prove, and Improve owners; all 10 Atlas maps carry an explicit lens label.

## Visual and accessibility review

The homepage and Chapter 2 were inspected at 1280×900 and 390×844. The
orientation hierarchy is visible above the fold, navigation collapses on
mobile, tables and Mermaid diagrams have scrollable containers, and no new
horizontal overflow was observed.

Homepage and Chapter 2 screenshots were captured and visually inspected as
transient test artifacts; they are not part of the repository.

The strict Axe audit covered homepage, Atlas, reference shelf, Chapter 2, and
glossary in light and dark themes: zero serious or critical failing nodes. A
dark-theme Markdown-link contrast issue found during the audit was corrected.
The missing Playwright and Axe development dependencies were also declared so
the repository's existing `npm run a11y` command now runs as documented.

## Verification

Passed:

```sh
cd site
npm run content:generate                    # 57 documents
npm run editorial:check -- --check-orientation
npm run links                               # 60 Markdown files
npm run lint
npm test                                    # 24/24
npm run build
npm run a11y -- http://127.0.0.1:3000 --strict
```

The build retains one informational Vinext warning: some generated chunks are
larger than 500 kB. It does not fail the build and predates this editorial
change.

## Gate

The implementation and author-side walkthroughs pass. Broad chapter editing
remains paused pending product-owner approval of Chapter 2 as the canonical
teaching model.
