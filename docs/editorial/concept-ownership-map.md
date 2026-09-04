---
title: Guide Concept Ownership Map
status: active
date: 2026-09-03
baseline_commit: 2db7fd8
---

# Guide Concept Ownership Map

This map controls where the guide explains a concept fully. A concept has one
canonical owner. Other chapters may provide enough context to stand alone, then
link to that owner. The generated companion inventory lists every current
heading and glossary definition so moves and removals remain auditable.

## Canonical teaching hierarchy

| Level | Model | Role |
| --- | --- | --- |
| Primary | Intent → Plan → Define Agent → Execute through Harness → Apply Skills → Evaluate → Improve → Deliver Software | The reader's value-stream model |
| Supporting | Intent, Harness, Capability, Model, Trust, Learning; surrounded by Adoption | The system-ownership model |
| Detail | Records, states, layers, loops, contracts, maturity ladders, and implementation stacks | A labeled zoom into one primary or supporting element |

No detail view is another canonical top-level model.

## Canonical owners

| Concept family | Canonical owner | Allowed secondary treatment | Phase 1 disposition | Reviewer |
| --- | --- | --- | --- | --- |
| Factory definition, eight stages, six areas | Chapter 2 | Front matter, homepage, guide overview, stages | Keep and simplify | Product owner / architecture |
| Human judgment and operating roles | Chapter 4 | Chapters 2, 7, 8, 30 | Summarize and link | Product owner |
| Durable records and state | Chapter 5 | Chapters 2, 11, 12, 24, 30 | Summarize and link | Architecture |
| Intent and Definition of Correct | Chapter 6 | Stage 1, Stage 2, Chapters 2, 16, 21 | Summarize and link | Product / architecture |
| Risk, policy, and authority | Chapter 7 | Chapters 2, 4, 11, 21, 26, 33 | Summarize and link | Security / governance |
| Economics and human attention | Chapter 8 | Chapters 17, 27, 31, 33 | Summarize and link | Product / finance |
| Multi-repository coordination | Chapter 9 | Chapters 20, 25, 31 | Summarize and link | Architecture |
| Capability registry, agents, skills, lifecycle | Chapter 10 | Stages 3 and 5, Chapters 2, 15, 33 | Summarize and link | Architecture |
| Control-plane/execution-plane boundary | Chapter 11 | Stage 4, Chapters 2, 12, 13, 30 | Summarize and link | Architecture |
| Durable execution | Chapter 12 | Stage 4, Chapters 11, 13, 29 | Summarize and link | Runtime |
| Harness engineering and protocols | Chapter 13 | Stage 4, Chapters 2, 11, 15, 18 | Summarize and link | Runtime |
| Environments, isolation, and compute | Chapter 14 | Chapters 11, 13, 26, 29 | Summarize and link | Runtime / security |
| Agent composition and tool use | Chapter 15 | Stages 3 and 5, Chapters 10, 13, 16 | Summarize and link | AI engineering |
| Context and repository intelligence | Chapter 16 | Chapters 2, 10, 15, 20, 33 | Summarize and link | AI engineering |
| Model profiles and routing | Chapter 17 | Chapters 2, 8, 10, 13, 33 | Summarize and link | AI engineering |
| Agent loops and topology selection | Chapter 18 | Chapters 2, 13, 19, 20, 33 | Summarize and link | AI engineering |
| Twelve-discipline implementation reference | Chapter 19 | Chapter 2 and Atlas | Label as reference model | Architecture |
| Autonomous workflow portfolio | Chapter 20 | Stages and Chapters 27, 31, 32 | Summarize and link | Product / architecture |
| Quality and independent evidence | Chapter 21 | Stage 6, Chapters 2, 22–25, 32–33 | Summarize and link | Quality |
| Testing strategy | Chapter 22 | Chapters 21, 23–25, 32 | Summarize and link | Quality |
| Evaluation programs | Chapter 23 | Stage 6, Chapters 17, 21, 33 | Summarize and link | Evaluation |
| Quality contracts and proof packages | Chapter 24 | Chapters 5, 21, 25, 32 | Summarize and link | Quality |
| Delivery and production verification | Chapter 25 | Stage 8, Chapters 2, 21, 24, 32 | Summarize and link | Delivery |
| Security and supply chain | Chapter 26 | Chapters 7, 10, 14, 21, 24 | Summarize and link | Security |
| Factory platform | Chapter 27 | Chapters 11, 20, 28–31 | Summarize and link | Platform |
| Observability and forensics | Chapter 28 | Chapters 12, 21, 23, 29, 33 | Summarize and link | Operations |
| Resilience and incidents | Chapter 29 | Chapters 12, 14, 25, 28, 30 | Summarize and link | Operations |
| Control surfaces and event/storage contracts | Chapter 30 | Chapters 5, 11–12, 27–29 | Summarize and link | Platform |
| Enterprise adoption | Chapter 31 | Chapters 2, 8, 20, 27, 35 | Summarize and link | Product / platform |
| Review and merge automation | Chapter 32 | Chapters 21–25, 33 | Summarize and link | Quality / delivery |
| Governed learning and promotion | Chapter 33 | Stage 7, Chapters 2, 8, 10, 17, 23, 32 | Summarize and link | Evaluation / governance |
| Mission Control implementation evidence | Chapter 34 and Mission Control appendices | Short `In Mission Control` sections | Preserve versioned evidence | Architecture / product owner |
| Explanation and mastery | Chapter 35 and Architecture Communication appendix | Homepage and Chapter 2 | Synthesize only | Product owner |
| Future direction | Chapter 36 | Research canon | Label predictions and open questions | Product owner |

## Phase 1 legacy anchors

Chapter 2 keeps the following headings as concise sections or empty compatible
anchors during consolidation. Later phases may redirect them only after the
site has an explicit anchor-alias mechanism.

- `#three-definitions`
- `#skills-loops-factory`
- `#five-systems-five-verbs`
- `#the-factory-in-one-line`
- `#the-master-whiteboard`
- `#six-architectural-areas-and-who-owns-each-layer`
- `#six-areas-one-surrounding-concern`
- `#the-lifecycle-above-the-six-areas`
- `#the-system-map`
- `#build-buy-or-bring-your-own`
- `#seven-layers-of-mission-control`
- `#the-lifecycle-stage-by-stage`
- `#five-platform-commitments`
- `#the-capability-model`
- `#what-the-rest-of-the-book-expands`

## Phase 1 disposition rules

- The eight-stage value stream receives the full orientation treatment.
- The six-area architecture receives the full ownership treatment.
- The five systems become a compact distinction table, not a third model.
- Skills → loops → factory becomes a maturity lens linked to Chapters 10, 18,
  20, and 33.
- The master whiteboard and system map become labeled detail views.
- The fourteen-layer and twelve-layer stacks stay in their owning reference
  chapters and Atlas views.
- Mission Control's seven layers stay an implementation view, never the
  definition of the general factory.
- The outer Signal → Intent → Factory → Outcome → Learning ring remains a
  boundary lens around the eight-stage value stream.
- Build/buy guidance moves to Chapter 31 except for a short orientation rule.

## Change protocol

For every moved or removed section:

1. Record the canonical owner and disposition here.
2. Preserve the source in Git history.
3. Preserve or map any useful heading anchor.
4. Update links to the canonical owner.
5. Run the content inventory, local links, built-site crawl, and search checks.
