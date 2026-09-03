---
title: Guide Changelog
status: active
audience: [all]
last_verified: 2026-09-03
lifecycle: [learn]
risk: variable
topics: [changelog, releases, review]
---

# Guide Changelog

Material changes to scope, terminology, maturity, architecture, and review
status are recorded here. Minor punctuation and formatting corrections may be
grouped.

## 2026-09-03 — Public-source integration and consistency pass

### Added

- Folded four rounds of public source material into the existing chapters:
  a public taxonomy of skills, loops, and the factory maturity model; the
  Mission Control repository's own lexicon (genericized); and a synthesis of
  six public sources on loop engineering, harness engineering, context
  engineering, and factory economics (Uber Engineering's published Uber-scale
  figures, two public "layers of an agent system" explainer posts, a public
  loop-engineering explainer, and Warp's closed-loop factory post).
- A provenance table in the [research canon](./research/initial-canon.md)
  for every practitioner talk, livestream, and public engineering post the
  guide draws on, including what the recurring "public practitioner talks,
  2026" citation covers and why it does not name speakers or venues.

### Changed

- Resolved a terminology collision on **model adapter**: the glossary's
  trained-weights sense is now **trained adapter**; **model adapter** is
  reserved for the per-provider integration layer defined in Chapter 10 and
  used in Chapter 17.
- Merged duplicate glossary entries for **loop engineering** (three entries
  collapsed to two: the bounded feedback path within one execution graph,
  and the wider discipline) and **workload identity** (two near-identical
  entries merged to one).
- Follow-up review caught three issues in the pass above: an "example"
  repository URL in Chapter 24 that still resolved as a real dead link (now
  `example.com`, the domain reserved for documentation); a "Retain this"
  line in Chapter 33 that still stated learning writeback reads only after
  success without the surrounding section's caveat for separately labeled
  failed-run signals (reconciled); and the research-canon provenance table,
  which named sources without linking most of them — now carries a
  confirmed-live link for every source where one exists, and says plainly
  where none could be found rather than leaving the gap implicit.

### Known gaps

- A word-count and structural review found several chapters running well
  past a comfortable single-sitting length (Chapters 8, 10, 13, 16, 17, 18,
  23, and 33 in particular), competing "canonical" mental models in Chapter
  2, and "Retain this" sections that restate rather than summarize. A
  structural split and a mental-model consolidation pass are planned but not
  yet done; see the reviewer guide for the current punch list.

## 2026-08-30 — Reference architecture depth release

### Added

- A detailed architecture ownership and coverage matrix.
- Four synchronized reference-architecture views: lifecycle, logical
  components, deployment/trust boundaries, and authority/evidence.
- Governed factory-system inventory, governance operating model, decision
  rights, ten-family control catalog, and emergency-control semantics.
- Twelve orchestration component families, runtime envelopes, state, stop,
  failure, recovery, capacity, cost, and compatibility contracts.
- AI systems foundations, permission-aware knowledge and retrieval pipeline,
  tool/skill/integration contracts, multi-agent collaboration contracts, and a
  minimum-sufficient autonomy ladder.
- Enterprise operations and FinOps reference plus a control-tower response
  lifecycle from observation through verified improvement.
- Four failure-injection labs covering authority, orchestration, knowledge, and
  external capabilities.
- A public architecture hub with lifecycle, plane, component, governance,
  inventory, pattern, monitoring, data-flow, and evidence views.

### Changed

- Deepened knowledge engineering, scheduling/capacity/cost, resilience/disaster
  recovery, and observability/forensics with specification-level contracts.
- Expanded all navigation, learning, coverage, glossary, reviewer, and search
  surfaces while preserving Markdown as the source of truth.
- Kept all new chapters review ready: documentation completeness does not
  advance implementation evidence to validated or operationally proven.

## 2026-08-30 — Autonomous factory coverage expansion

### Added

- Agent Factory capability supply chain, registries, packaging, dependency
  resolution, certification, promotion, deprecation, and revocation.
- Repository onboarding, codebase intelligence, readiness, and drift.
- An explicit autonomous engineering workflow catalog with change and
  operational workflow patterns.
- Complete testing strategy, CI/CD, artifact, migration, compatibility,
  progressive-delivery, rollback, and production-verification coverage.
- Developer portal, service catalog, golden paths, scheduling, capacity, cost,
  fairness, resilience, disaster recovery, and human-agent control surfaces.
- Agentic threat modeling, workload identity, secrets, privacy, licensing, and
  compliance coverage.
- Evaluation science, controlled experimentation, capability optimization,
  learning from success, and regression control.
- Seven executable lab specifications for certification, repository onboarding,
  adversarial defense, delivery rollback, incident response, continual
  improvement, and disaster recovery.
- Public capability coverage, maturity, reviewer guidance, and feedback paths.

### Changed

- Expanded Builder and Deep Study paths beyond pull-request generation into
  capability management, delivery, production verification, and learning.
- Reworked topic discovery around section, persona, lifecycle, maturity, and
  risk filters.
- Made document maturity visible in discovery views.
- Clarified that review-ready guide does not imply an operationally proven
  implementation.

### Known evidence boundaries

- The original golden-path execution lab remains blocked until its exact
  runtime prerequisites and accepted browser evidence exist.
- New executable labs are review-ready specifications; accepted lab runs are
  not yet claimed.
- The complete mission-to-production and governed-improvement paths remain
  architectural targets until versioned operational evidence is retained.
