---
title: "refactor: Consolidate the AI Software Factory Guide"
type: refactor
status: active
date: 2026-09-02
approved: 2026-09-03
owner: Jay West
baseline_commit: 2db7fd8
current_phase: phase-1-product-owner-gate
---

# Refactor: Consolidate the AI Software Factory Guide

## Outcome

Turn the current comprehensive corpus into a teachable, evidence-backed field
guide without discarding the technical advances added in the September 2
research-synthesis passes.

The finished guide will have one primary value-stream model, one supporting
architecture model, concise chapter takeaways, a controlled core vocabulary,
and traceable sources. Deep technical material will remain available, but each
concept will have one canonical owner instead of being re-explained throughout
the book.

This is an editorial refactor, not another content-expansion pass.

## Problem statement

The guide-first rewrite successfully replaced a course-like curriculum with a
36-chapter book and reference site. Subsequent synthesis added strong material
on harness engineering, model routing, context, evaluation, security,
automated review, governed learning, and Mission Control. It also restored the
same problem the rewrite was intended to solve: readers must now absorb too
many competing models, definitions, summaries, and repeated explanations.

Baseline at commit `2db7fd8`:

| Measure | Current state |
| --- | ---: |
| Published source documents | 57 |
| Source words | 390,297 |
| Generated public-content words | 382,404 |
| Main chapters | 36 |
| Words in main chapters | 300,700 |
| Median main chapter | 8,448 words |
| Main chapters over 8,000 words | 19 |
| Main chapters over 10,000 words | 12 |
| Glossary entries | 619 |
| Glossary length | approximately 23,000 words |
| Largest `Retain this` section | 29 bullets / 813 words |

The source corpus grew from 307,826 to 390,297 words after the launch-readiness
commit, an increase of 82,471 words. The research canon, changelog, and coverage
review did not advance with that change.

## Root cause

The previous rewrite plan required every technical claim, contract field,
failure mode, and term to survive the rewrite. That rule protected against
accidental knowledge loss, but it prevented real editorial prioritization.
New material could be added or repeated, while almost nothing could leave the
main narrative.

Replace that rule with:

> Preserve every material source and decision in Git history and the editorial
> inventory. Keep a concept in the public narrative only where it improves the
> reader's ability to understand, decide, build, prove, operate, or improve the
> factory. State it fully once; summarize and link everywhere else.

## Product decisions to approve

These decisions define the consolidation and should be approved before chapter
editing begins.

1. Preserve the six-part journey: **Understand → Design → Build → Prove →
   Operate → Improve**.
2. Make the eight-stage value stream the primary reader model: **Intent → Plan
   → Define Agent → Execute through Harness → Apply Skills → Evaluate → Improve
   → Deliver Software**.
3. Make the six architectural areas the supporting system model: **Intent,
   Harness, Capability, Model, Trust, Learning**, surrounded by adoption.
4. Label every other diagram or taxonomy as one of: `detail view`,
   `implementation view`, `operating lens`, `maturity model`, or `reference
   model`. Do not call another model canonical.
5. Keep the complete glossary as reference, but designate exactly 50 core terms
   for readers to retain.
6. Keep all 36 chapter slugs and the eight stage slugs stable. Consolidation may
   move sections, but it will not create another navigation system or restore
   personas, modes, progress tracking, or course UI.
7. Freeze new concepts during this refactor. New research enters an intake list
   and is evaluated after the consolidated release.

## Goals

- Restore a clear conceptual hierarchy that a first-time reader can explain.
- Preserve the strongest new technical material without repeating it.
- Make chapter summaries useful for retention.
- Resolve duplicate and conflicting terminology.
- Make externally derived claims traceable to specific sources.
- Align the changelog and maturity labels with the actual review state.
- Keep existing routes and useful deep links stable.
- Add automated checks that prevent uncontrolled expansion from recurring.

## Non-goals

- Adding new chapters, taxonomies, maturity ladders, or named concepts.
- Redesigning the site or returning to a course/learning-path experience.
- Producing the full infographic backlog.
- Rewriting Mission Control or changing its implementation status without new
  evidence.
- Removing technical depth solely to hit a word-count target.
- Treating word count as a substitute for technical and editorial judgment.

## Target content architecture

### Layer 1: orientation

- Homepage and `How to read this guide` explain the promise and entry points.
- Chapter 2 teaches the eight-stage value stream and six-area architecture.
- The eight stage pages become concise orientation briefs, not parallel
  chapters.

### Layer 2: canonical chapters

- Each concept has one owning chapter.
- Owning chapters contain the complete definition, mechanism, tradeoffs,
  implementation guidance, failure modes, and evidence boundaries.
- Other chapters use a one- or two-sentence recap and link to the owner.

### Layer 3: reference

- The glossary holds the complete vocabulary.
- The Principles appendix holds only the 50 core concepts and durable theses.
- The research registry holds source provenance and claim mappings.
- Mission Control case studies retain version-pinned implementation detail.
- Dense contract tables that are useful for lookup but interrupt the narrative
  remain in reference-oriented sections or appendices.

## Canonical concept ownership

Create `docs/editorial/concept-ownership-map.md` before deleting or moving
material. Each row must contain:

| Field | Purpose |
| --- | --- |
| Concept | Canonical name |
| Owner | One chapter or appendix that defines it fully |
| Secondary mentions | Chapters allowed to summarize and link |
| Source IDs | Sources supporting the concept |
| Disposition | Keep, condense, move, reference-only, or remove-as-duplicate |
| Legacy headings | Anchors that must remain resolvable |
| Reviewer | Person responsible for technical sign-off |

Initial ownership anchors:

| Area | Canonical owner |
| --- | --- |
| Factory orientation and system relationship | Chapter 2 |
| Human judgment and operating roles | Chapter 4 |
| Durable records and state | Chapter 5 |
| Intent and Definition of Correct | Chapter 6 |
| Risk and authority | Chapter 7 |
| Economics and attention | Chapter 8 |
| Capability registry, agents, skills, and lifecycle | Chapter 10 |
| Control/execution plane boundary | Chapter 11 |
| Durable execution | Chapter 12 |
| Harness engineering and protocols | Chapter 13 |
| Context and repository intelligence | Chapter 16 |
| Model profiles and routing | Chapter 17 |
| Agent loops and topology selection | Chapter 18 |
| Quality and independent evidence | Chapter 21 |
| Evaluation programs | Chapter 23 |
| Security and supply chain | Chapter 26 |
| Review and merge automation | Chapter 32 |
| Governed learning and promotion | Chapter 33 |
| Mission Control implementation evidence | Chapter 34 and its appendices |

## Reader flows and acceptance

| Reader flow | Entry | Required outcome | Acceptance test |
| --- | --- | --- | --- |
| First-time orientation | Homepage → Chapter 2 | Explain the factory, eight stages, six areas, and human/agent/evidence boundary | Three representative readers can explain the model after one sitting without consulting the glossary |
| Executive evaluation | Homepage → orientation → economics/governance | Understand value, risk, human authority, and what to build first | Reader can find the business case, risk model, and first implementation corridor within three clicks |
| Architect study | Chapter 2 → Atlas → owning chapter | Move from system model to precise contract without encountering a competing canonical architecture | Every Atlas view identifies its lens and canonical owner |
| Builder lookup | Search or glossary → exact section | Find the definition, implementation guidance, failure modes, and owner quickly | Five task scenarios reach the canonical answer in two minutes or less |
| Reviewer verification | Claim → source → maturity boundary | Determine whether a statement is a standard, vendor claim, practitioner opinion, internal synthesis, or versioned implementation fact | Every material external claim resolves to a source record; Mission Control claims resolve to pinned evidence |
| Returning reader | Deep link or saved anchor | Continue using existing references after sections move | All preserved routes and legacy anchors resolve or redirect to the canonical section |

## Implementation phases

### Phase 0: freeze and baseline

Purpose: prevent the target from moving and make every later cut auditable.

Tasks:

- [x] Create a dedicated editorial-consolidation branch from `2db7fd8`.
- [x] Pause direct content synthesis into `guide/` until this plan is complete.
- [x] Route new research to `docs/editorial/research-intake.md` with no public
      publication during the freeze.
- [x] Create `docs/editorial/concept-ownership-map.md` from headings, glossary
      terms, diagrams, and source notes.
- [x] Add `site/scripts/check-editorial-integrity.mjs` to report document words,
      chapter median, longest chapters, `Retain this` size, core-term count,
      duplicate glossary terms, vague source attributions, and conflicting
      canonical labels.
- [x] Record the baseline report in `docs/reviews/`.
- [x] Mark the September 1 rewrite plan as completed/superseded by this
      consolidation plan; do not erase its history.

Gate:

- Baseline metrics are reproducible from a command.
- Every public heading and glossary term appears in the ownership inventory.
- No chapter editing begins until the product decisions above are approved.

### Phase 1: establish the conceptual spine

Purpose: prove the editorial approach on the orientation experience before
touching the entire book.

Files:

- `guide/00-front-matter/00-how-to-read-this-guide.md`
- `guide/00-front-matter/01-what-this-guide-covers.md`
- `guide/01-understand/02-the-factory-in-one-view.md`
- `guide/README.md`
- `guide/stages/01-builder-intent.md` through
  `guide/stages/08-deliver-software.md`
- Homepage/Atlas copy only where needed to mirror the approved hierarchy

Tasks:

- [x] Rewrite Chapter 2 around the eight-stage value stream and six-area
      architecture.
- [x] Keep other useful frameworks, but move their full treatment to their
      owning chapters or label them as a supporting lens.
- [x] Remove claims that multiple diagrams are simultaneously canonical.
- [x] Reduce each stage page to a concise brief containing: purpose, inputs,
      outputs, governing decision, required evidence, common failure, and
      canonical chapter links.
- [x] Reduce Chapter 2's `Retain this` section to five to seven bullets.
- [x] Preserve old heading anchors through retained IDs or an explicit legacy
      anchor map.
- [x] Run the first-time, executive, and architect walkthroughs before using
      this structure as the template for later phases.

Targets:

- Chapter 2: 4,000–5,000 words.
- Each stage page: 800–1,500 words.
- Eight stage pages combined: no more than 12,000 words.
- A reader encounters no more than two top-level mental models during
  orientation.

Gate:

- Product owner approves Chapter 2 as the canonical teaching model.
- Reader walkthroughs pass before broad chapter consolidation begins.

Phase 1 implementation evidence is recorded in
`docs/reviews/2026-09-03-phase-1-orientation-walkthrough.md`. Author-side
walkthroughs and automated checks pass; representative reader validation
remains part of Phase 5. Phase 2 is paused pending product-owner approval.

### Phase 2: normalize vocabulary

Purpose: prevent later edits from reintroducing conflicting definitions.

Files:

- `guide/appendix/glossary.md`
- `guide/appendix/principles.md`
- `guide/00-front-matter/01-what-this-guide-covers.md`
- Canonical owning chapters identified in the ownership map

Tasks:

- [ ] Extract and normalize all glossary terms case-insensitively.
- [ ] Merge duplicate `Loop engineering` and `Workload identity` entries.
- [ ] Audit aliases, acronyms, singular/plural variants, and terms defined with
      materially different meanings.
- [ ] Resolve `model adapter`: use `model adapter` for the integration and
      contract-translation layer; use `PEFT adapter` or `weight adapter` for
      trained parameter additions.
- [ ] Select exactly 50 core terms across Intent, Harness, Capability, Model,
      Trust, Learning, and Adoption.
- [ ] Rename the Principles section so its heading and actual count agree.
- [ ] Add a compact core-vocabulary index at the top of the glossary with links
      to the full definitions.
- [ ] Assign one canonical wording and one owning chapter to every core term.
- [ ] Add an automated duplicate-term and core-count gate.

Gate:

- Zero duplicate glossary headings.
- Zero known terms with conflicting definitions.
- Exactly 50 designated core terms.
- All core-term definitions match their owning chapters.

### Phase 3: repair source provenance

Purpose: make the source trail meet the evidence standard taught by the guide.

Files:

- `guide/appendix/research/initial-canon.md`
- `guide/appendix/changelog.md`
- `guide/appendix/coverage-and-maturity.md`
- `Go deeper` and source sections in affected chapters

Expand `initial-canon.md` into the public source registry while preserving its
existing slug. This keeps the public document count and inbound links stable.

Source-registry fields:

- Stable source ID
- Author or speaker
- Exact title
- Publisher or event
- URL
- Publication date
- Access date
- Source type: standard/research, official documentation, vendor case study,
  practitioner opinion, internal synthesis, or repository evidence
- Authority and limitations
- Chapters and claims derived from the source
- Verification status and next review date

Tasks:

- [ ] Inventory every source introduced after `974def8`.
- [ ] Replace every vague `public practitioner talks, 2026` reference with a
      specific source record.
- [ ] Add records for Uber, Warp, Tessl, HumanLayer/BAML, and every other
      newly used external source.
- [ ] For unavailable source material, either obtain the exact provenance,
      label the passage as internal synthesis, soften the claim, or remove it.
- [ ] Add inline citations for quantitative, quoted, vendor-specific,
      standards-dependent, and counterintuitive claims.
- [ ] Keep general synthesis readable by linking source IDs from `Go deeper`
      rather than footnoting every sentence.
- [ ] Fix confirmed public external-link failures and exclude intentional
      examples and unpublished evidence from the public checker.
- [ ] Update the changelog with the September 2 synthesis and the subsequent
      consolidation.
- [ ] Keep affected documents at `draft for study` or `review ready`; do not
      advance them to validated until technical and editorial review passes.
- [ ] Update `last_verified` only when the verification work actually occurs.

Gate:

- Zero vague source labels in public chapters.
- All material externally derived claims map to a source record.
- All quantitative and direct-quotation claims have inline links.
- The external-link check has zero confirmed public 404/410 results.
- Canon, changelog, and coverage dates truthfully reflect the review.

### Phase 4: consolidate the main chapters

Purpose: remove repetition while retaining each chapter's unique mechanism,
decision, and implementation value.

Edit in batches so terminology and links can be validated between passes.

#### Batch A: highest-density chapters

- Chapter 10 — Agent Factory
- Chapter 33 — Governed learning
- Chapter 34 — Mission Control case study
- Chapter 31 — Enterprise adoption
- Chapter 8 — Economics and attention
- Chapter 13 — Harnesses
- Chapter 16 — Context engineering
- Chapter 7 — Governance

#### Batch B: trust and evaluation

- Chapters 21–26
- Remove repeated definitions of verification, evidence, evaluation,
  provenance, risk, and promotion; each retains its distinct responsibility.

#### Batch C: remaining Build and Operate chapters

- Chapters 9, 11–12, 14–20, and 27–30
- Preserve implementation contracts and failure modes; replace background
  re-explanations with links to canonical owners.

#### Batch D: narrative and synthesis

- Chapters 1, 3–6, 32, and 35–36
- Ensure opening and closing chapters synthesize rather than introduce another
  vocabulary layer.

Per-chapter editing checklist:

- [ ] State the chapter's unique reader question in the opening.
- [ ] Identify concepts owned here versus concepts summarized from elsewhere.
- [ ] Keep full definitions only for owned concepts.
- [ ] Remove repeated slogans unless they are essential to the chapter's
      decision.
- [ ] Keep implementation contracts, tradeoffs, failure modes, and evidence
      boundaries that are unique to the chapter.
- [ ] Convert universal-sounding heuristics into `default`, `example`, or
      `context-dependent pattern` where appropriate.
- [ ] Review absolutes such as `always`, `never`, `only`, fixed thresholds, and
      fixed maturity sequences.
- [ ] Reduce `Retain this` to five to seven bullets and no more than 220 words.
- [ ] Ensure `Go deeper` points to canonical owners and traceable sources.
- [ ] Preserve useful existing anchors or provide mapped replacements.
- [ ] Update the ownership map with the final disposition.

Specific technical corrections:

- [ ] Replace “a rule the organization can state is a rule software can check”
      with a qualified statement about rules that can be made precise and
      deterministically evaluated.
- [ ] Make the three-occurrence learning threshold configurable by severity,
      recurrence, confidence, and blast radius; retain three as an example
      default, not a law.
- [ ] Retain failed/cancelled-run lessons as quarantined, lower-confidence
      signals rather than discarding them; prevent them from gaining authority.
- [ ] Describe shadow, A/B, and canary evaluation as a selection of applicable
      instruments, not a mandatory universal sequence.

Targets:

- Main chapters combined: 230,000–240,000 words.
- Median main chapter: no more than 6,500 words.
- No main chapter over 10,000 words without an explicit product-owner waiver.
- Full published corpus: 300,000–315,000 words, including the complete glossary
  and source registry.
- Word reduction comes from repetition, parallel explanations, and inflated
  summaries—not from removing unique contracts or evidence boundaries.

Gate after each batch:

- Content generation, lint, build, tests, internal crawl, and anchor checks
  pass.
- Canonical terminology remains consistent.
- A subject reviewer confirms no unique technical mechanism was lost.
- Product owner reviews the diff before the next batch begins.

### Phase 5: validate teachability and publish

Purpose: verify the guide as a reader product, not only as a valid build.

Tasks:

- [ ] Run architecture review for Chapters 2, 10, 11, 13, 16–18, and 31.
- [ ] Run security review for Chapters 7, 14, 21, 24, and 26.
- [ ] Run evaluation/learning review for Chapters 8, 21–23, 32, and 33.
- [ ] Run an independent editorial pass for hierarchy, repetition, paragraph
      density, and unsupported certainty.
- [ ] Conduct the six reader-flow walkthroughs above on desktop and mobile.
- [ ] Verify search results land on the canonical owner and exact heading.
- [ ] Verify moved headings through the legacy-anchor map.
- [ ] Run the complete release suite.
- [ ] Update coverage status and changelog after findings are resolved.
- [ ] Publish only after the product owner accepts the orientation chapter,
      source registry, and release evidence.

Release commands:

```sh
cd site
npm run content:generate
npm run links
npm run links:external
npm run lint
npm run build
npm test
npm run a11y
```

## Quality gates

### Editorial integrity

- [ ] Six-part sequence, 36 chapters, and eight stage routes remain intact.
- [ ] Only the eight-stage value stream and six-area architecture are called
      canonical top-level models.
- [ ] Chapter 2 and all stage pages meet their size targets.
- [ ] Every `Retain this` section contains five to seven bullets and no more
      than 220 words.
- [ ] Main-chapter and total-corpus targets are met without unresolved
      content-loss findings.
- [ ] No chapter introduces a concept already owned elsewhere without linking
      to the canonical definition.

### Terminology and sources

- [ ] Exactly 50 core terms are designated.
- [ ] Glossary has zero duplicate or conflicting entries.
- [ ] Every core term has one canonical owner.
- [ ] No vague `public practitioner talks` source labels remain.
- [ ] Quantitative, quoted, vendor-specific, and standards-dependent claims are
      traceable.
- [ ] Changelog, canon, coverage, and `last_verified` metadata are current and
      truthful.

### Site integrity

- [ ] Content generation produces exactly the intended 57 documents.
- [ ] All internal routes and anchors resolve.
- [ ] Search indexes the updated canonical headings.
- [ ] No confirmed broken external links remain on published pages.
- [ ] Build, lint, tests, accessibility checks, and responsive walkthroughs
      pass.

## Success metrics

- A first-time reader can accurately explain the eight stages, six areas, and
  human/agent/evidence boundary after Chapter 2.
- A builder or architect can reach a canonical answer from search in two
  minutes or less for five representative tasks.
- A reviewer can classify and trace every sampled material claim to its source
  and evidence boundary.
- No reader in the validation group identifies a third competing top-level
  factory model.
- The editorial rubric—hierarchy, clarity, evidence, actionability, and
  consistency—scores at least 4/5 in every category.
- Automated editorial-integrity checks prevent summaries, duplicate glossary
  entries, vague sources, and chapter size from silently regressing.

## Risks and mitigations

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Over-trimming removes technical nuance | Guide becomes approachable but shallow | Ownership inventory, Git history, subject review, and batch gates before deletion |
| Word-count optimization produces terse, worse prose | Metrics pass while usability declines | Word count is a guardrail; reader walkthrough and editorial rubric decide quality |
| Moving content breaks external deep links | Returning readers and citations fail | Stable slugs, preserved heading IDs, legacy-anchor map, built-site crawl |
| New research continues entering during editing | Target keeps moving and terminology drifts | Content freeze and research-intake backlog |
| Sources cannot be reconstructed | Credibility remains weak | Obtain provenance, label internal synthesis, soften, or remove; never invent attribution |
| Canonical ownership creates artificial silos | Chapters become hard to read alone | Allow brief contextual recaps with direct links; prohibit only full duplicate treatment |
| Review status is advanced by the authoring agent | Guide self-certifies | Independent role reviews and product-owner acceptance before status changes |
| External sources move or disappear | Claim trail decays | Access dates, stable source IDs, scheduled link review, archived references where permitted |

## Alternative approaches considered

### Keep all content and improve navigation only

Rejected. Navigation cannot solve repetition, conflicting terminology, or an
orientation chapter containing a dozen competing mental models.

### Restore beginner and expert reading modes

Rejected. This would reverse the guide-first redesign and introduce hidden
content, parallel states, and course-like complexity.

### Delete the September 2 additions

Rejected. The additions contain some of the strongest material in the guide.
The problem is placement and duplication, not lack of value.

### Split the material into more chapters

Rejected for V1. It would improve individual chapter size while worsening the
navigation and conceptual-sprawl problem. Reconsider companion volumes only
after the canonical guide is stable and validated.

## Dependencies and resources

- Product-owner approval of the seven product decisions.
- Access to exact source links or transcripts for imported practitioner and
  vendor material.
- One architecture reviewer, one security reviewer, and one
  evaluation/learning reviewer; one person may cover multiple roles if their
  expertise is documented.
- Three representative first-time readers for the orientation test.
- AI-assisted editing is appropriate for inventory generation, duplicate
  detection, link updates, and first-pass condensation. Humans retain decisions
  about canonical models, source authority, technical correctness, and what is
  removed.

Estimated effort, assuming one AI-assisted editor plus human review:

| Work | Estimate |
| --- | ---: |
| Baseline and ownership inventory | 1–2 focused days |
| Conceptual spine and stage briefs | 1–2 focused days |
| Terminology and source provenance | 2–4 focused days, depending on source access |
| Chapter consolidation | 5–10 focused days |
| Independent review, reader validation, and release | 2–4 focused days plus reviewer turnaround |

## Deliverables

- Approved editorial constitution and conceptual hierarchy.
- Reproducible editorial-integrity report and checker.
- Concept-ownership and legacy-anchor map.
- Consolidated Chapter 2 and eight stage briefs.
- Normalized glossary with 50-term core vocabulary.
- Expanded research canon/source registry with claim mappings.
- Consolidated 36-chapter corpus within the target range.
- Updated changelog, coverage review, and truthful verification dates.
- Passing release evidence and reader-validation report.

## References

- `docs/brainstorms/2026-09-01-guide-first-redesign.md`
- `docs/plans/2026-09-01-guide-rewrite-plan.md`
- `docs/plans/coverage-map.md`
- `docs/reviews/2026-08-30-architecture-release-readiness.md`
- `guide/01-understand/02-the-factory-in-one-view.md`
- `guide/03-build/10-the-agent-factory.md`
- `guide/06-improve/33-governed-learning-and-compounding-engineering.md`
- `guide/appendix/glossary.md`
- `guide/appendix/principles.md`
- `guide/appendix/research/initial-canon.md`
- `guide/appendix/changelog.md`
- `guide/appendix/coverage-and-maturity.md`
