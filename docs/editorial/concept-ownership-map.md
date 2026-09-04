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
| Human judgment and operating roles | Chapter 4 | Chapters 2, 7, 8, 38, 43 | Summarize and link | Product owner |
| Durable records and state | Chapter 5 | Chapters 2, 13, 14, 31, 37 | Summarize and link | Architecture |
| Intent and Definition of Correct | Chapter 6 | Stage 1, Stage 2, Chapters 2, 19, 27 | Summarize and link | Product / architecture |
| Risk, policy, and authority | Chapter 7 | Chapters 2, 4, 13, 27, 33, 40 | Summarize and link | Security / governance |
| Economics and human attention | Chapter 8 | Chapters 9, 21, 22, 35, 38, 40 | Summarize and link | Product / finance |
| Tokenomics and factory economics | Chapter 9 | Chapters 8, 21, 22, 35, 38 | Summarize and link | Product / finance |
| Multi-repository coordination | Chapter 10 | Chapters 26, 32, 38, 39 | Summarize and link | Architecture |
| Capability registry, agents, and lifecycle | Chapter 11 | Stages 3 and 5, Chapters 2, 12, 18, 40 | Summarize and link | Architecture |
| Skills as governed packages | Chapter 12 | Stage 5, Chapters 11, 16, 18, 23, 24, 40 | Summarize and link | Architecture / AI engineering |
| Control-plane/execution-plane boundary | Chapter 13 | Stage 4, Chapters 2, 14–16, 37, 42 | Summarize and link | Architecture |
| Durable execution | Chapter 14 | Stage 4, Chapters 13, 15, 23, 36 | Summarize and link | Runtime |
| Coding harnesses and protocols | Chapter 15 | Stage 4, Chapters 2, 13, 16, 18 | Summarize and link | Runtime |
| Harness engineering | Chapter 16 | Chapters 13–15, 17, 23 | Summarize and link | Runtime |
| Environments, isolation, and compute | Chapter 17 | Chapters 13, 15, 16, 33, 36 | Summarize and link | Runtime / security |
| Agent composition and tool use | Chapter 18 | Stages 3 and 5, Chapters 11, 12, 15, 19, 20 | Summarize and link | AI engineering |
| Data, knowledge, and semantic engineering | Chapter 19 | Chapters 2, 6, 18, 20, 38, 40 | Summarize and link | AI engineering |
| Context engineering | Chapter 20 | Chapters 2, 6, 18, 19, 21, 39 | Summarize and link | AI engineering |
| Model profiles and capability selection | Chapter 21 | Chapters 2, 8, 9, 11, 18, 22, 40 | Summarize and link | AI engineering |
| Routing and escalation | Chapter 22 | Chapters 8, 9, 20, 21, 23, 39 | Summarize and link | AI engineering |
| Agent loops and topology selection | Chapter 23 | Chapters 2, 14–16, 18, 22, 24, 26, 40 | Summarize and link | AI engineering |
| Loop patterns and defaults | Chapter 24 | Chapters 14, 18, 23, 26, 39, 41 | Summarize and link | AI engineering |
| Twelve-discipline implementation reference | Chapter 25 | Chapter 2 and Atlas | Label as reference model | Architecture |
| Autonomous workflow portfolio | Chapter 26 | Stages and Chapters 10, 23, 24, 32, 39 | Summarize and link | Product / architecture |
| Quality and independent evidence | Chapter 27 | Stage 6, Chapters 2, 28–32, 39, 40 | Summarize and link | Quality |
| Testing strategy | Chapter 28 | Chapters 27, 29–32, 39 | Summarize and link | Quality |
| Evaluation programs | Chapter 29 | Stage 6, Chapters 21, 27, 28, 30, 40 | Summarize and link | Evaluation |
| Evaluation assets | Chapter 30 | Chapters 11, 12, 27–29, 40 | Summarize and link | Evaluation |
| Quality contracts and proof packages | Chapter 31 | Chapters 5, 27–30, 32, 39 | Summarize and link | Quality |
| Delivery and production verification | Chapter 32 | Stage 8, Chapters 2, 10, 27, 31, 39 | Summarize and link | Delivery |
| Security and supply chain | Chapter 33 | Chapters 7, 11, 17, 27, 31, 37 | Summarize and link | Security |
| Factory platform | Chapter 34 | Chapters 13, 26, 35–38 | Summarize and link | Platform |
| Observability and forensics | Chapter 35 | Chapters 8, 14, 23, 27, 29, 36, 40 | Summarize and link | Operations |
| Resilience and incidents | Chapter 36 | Chapters 14, 17, 32, 35, 37 | Summarize and link | Operations |
| Control surfaces and event/storage contracts | Chapter 37 | Chapters 5, 7, 13, 14, 33–36 | Summarize and link | Platform |
| Enterprise adoption | Chapter 38 | Chapters 2, 8–10, 26, 34, 43 | Summarize and link | Product / platform |
| Review and merge automation | Chapter 39 | Chapters 20–22, 26–33, 40 | Summarize and link | Quality / delivery |
| Governed learning and promotion | Chapter 40 | Stage 7, Chapters 2, 8, 11, 12, 21–24, 29, 30, 39, 41 | Summarize and link | Evaluation / governance |
| Meta-loops and the closed-loop factory | Chapter 41 | Stage 7, Chapters 23, 24, 26, 35, 40 | Summarize and link | Evaluation / governance |
| Mission Control implementation evidence | Chapter 42 and Mission Control appendices | Short `In Mission Control` sections | Preserve versioned evidence | Architecture / product owner |
| Explanation and mastery | Chapter 43 and Architecture Communication appendix | Homepage and Chapter 2 | Synthesize only | Product owner |
| Future direction | Chapter 44 | Research canon | Label predictions and open questions | Product owner |

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
- Skills → loops → factory becomes a maturity lens linked to Chapters 11–12,
  23–24, 26, and 40–41.
- The master whiteboard and system map become labeled detail views.
- The fourteen-layer and twelve-layer stacks stay in their owning reference
  chapters and Atlas views.
- Mission Control's seven layers stay an implementation view, never the
  definition of the general factory.
- The outer Signal → Intent → Factory → Outcome → Learning ring remains a
  boundary lens around the eight-stage value stream.
- Build/buy guidance moves to Chapter 38 except for a short orientation rule.

## Change protocol

For every moved or removed section:

1. Record the canonical owner and disposition here.
2. Preserve the source in Git history.
3. Preserve or map any useful heading anchor.
4. Update links to the canonical owner.
5. Run the content inventory, local links, built-site crawl, and search checks.
