---
date: 2026-09-01
topic: guide-rewrite
status: superseded
superseded_by: 2026-09-02-refactor-guide-editorial-consolidation-plan.md
---

# The AI Software Factory Guide — rewrite plan

## Why

The v1 corpus (99 chapters, ~140k words) is technically deep but written as a
course: rigid eleven-section chapters, epistemic-label boilerplate, reading-time
badges, learning paths, and heavy cross-referencing. Jay's requirement is a
**guide he can read front-to-back and retain**: how to design, develop, build,
and master an AI Software Factory — with his infographics in it, and with the
material from the source transcripts actually present.

## What changes

- The corpus is rewritten as a **book**: six parts, 36 chapters, appendices.
- Every chapter is narrative prose with first-party diagrams; lists appear only
  for contracts, checklists, and steps.
- The v1 chapters move to `archive/guide-v1/` (kept for provenance and the
  content-loss check). Nothing is deleted.
- Labs, Mission Control case studies, glossary, research canon, and the
  communication chapter become **appendices** (reference, not sequence).
- Course UI (paths, progress, modes, reading time, audience chips) is removed
  from the site. The site becomes: Guide (sequence) · Atlas (diagrams) ·
  Reference (appendices) · Search.

## The journey

**Understand → Design → Build → Prove → Operate → Improve**

| Part | Question it answers |
| --- | --- |
| I. Understand | What is an AI Software Factory, what are its parts, and what principles hold it together? |
| II. Design | What records, decisions, authority, and economics must exist before any agent runs? |
| III. Build | How do you assemble capabilities, runtime, harnesses, environments, AI layers, and workflows? |
| IV. Prove | How do you know the factory's output is correct, safe, and releasable? |
| V. Operate | How do you run it as a production platform? |
| VI. Improve | How does it get better without authorizing itself? |

## Chapter map (new → absorbs v1)

### Part I — Understand
1. Why software engineering is changing — `01-vision/01`, mission ch. "Future operating model", study guide ch.1–4
2. The factory in one view — `00-overview/01`, `03`, `04`, `05`; seven layers of Mission Control; build-vs-buy stack (transcript)
3. First principles: trust, evidence, and authority — `02-first-principles/01`; autonomy levels 0–5; human in/on/out of loop; quality as the acceleration engine

### Part II — Design
4. The human–agent operating model — `03-operating-model/01`, `06`
5. Authoritative records — `04-domain-model/01`, `02`, `05`
6. Intent and specification engineering — `04-domain-model/03`; 12-layer L1 Business Understanding
7. Governance, policy, and risk-proportional approval — `08-security-and-governance/01`, `06`, `07`
8. Economics, metrics, and human attention — `03-operating-model/02`, `05`, `07`; mission "Success metrics" and "Proofs"
9. Multi-repository design — `04-domain-model/04`; transcript multi-repo section

### Part III — Build
10. The Agent Factory — `agent-factory/01`–`04`
11. Control plane, orchestrator, and execution plane — `05-runtime-architecture/01`, `02`, `09`
12. Durable execution — `05-runtime-architecture/03`; reliability vocabulary
13. Coding harnesses and agent protocols — `05-runtime-architecture/08`; transcript harness/protocol sections
14. Development environments, sandboxes, and compute — `05-runtime-architecture/04`, `07`; transcript dev-env/pets-vs-cattle/BYOC
15. Agent architecture: loop, MCP, tools, context, memory — `06-ai-engineering/00`, `01`
16. Data, knowledge, semantic, and context engineering — `06-ai-engineering/03`, `08`
17. Models: routing, profiles, and capability selection — `06-ai-engineering/02`
18. Agent and loop engineering — `06-ai-engineering/05`, `09`, `10`
19. The 12-layer production AI agent stack — `06-ai-engineering/11`
20. Autonomous engineering workflows — `autonomous-workflows/01`–`04`; mission workflows 1–8; issue-to-PR wedge

### Part IV — Prove
21. Quality and evidence architecture — `07-quality-engineering/01`
22. Testing strategy for agentic change — `verification-delivery-engineering/01`
23. Evaluation engineering — `06-ai-engineering/04`, `06`, `07`
24. Quality contracts, proof packages, and certificates — `07-quality-engineering/03`, `04`
25. CI/CD, progressive delivery, and production verification — `verification-delivery-engineering/02`, `03`; `07-quality-engineering/02`
26. Security — `08-security-and-governance/02`, `03`, `04`, `05`

### Part V — Operate
27. The factory as a platform — `factory-platform-engineering/01`, `02`
28. Observability, telemetry, and forensics — `05-runtime-architecture/05`; `factory-platform-engineering/06`
29. Resilience, incidents, and the control tower — `factory-platform-engineering/03`, `07`, `08`; incident framework
30. Control surfaces, event contracts, and storage — `factory-platform-engineering/04`, `05`
31. Enterprise adoption and the infrastructure landscape — `03-operating-model/04`; enterprise/open-source infra

### Part VI — Improve
32. Production feedback, review, and the agentic merge queue — `07-quality-engineering/05`; transcript feedback/merge sections
33. Governed learning and compounding engineering — `03-operating-model/03`, `05`; `06-ai-engineering/07`
34. Mission Control as a living case study — `09-mission-control-case-studies/01`–`03` (condensed narrative)
35. Mastering the factory: explaining, defending, and building it — legacy executive-mastery source; mission 12-month/30-day plans; five audiences
36. Where this is going — transcript "evolution", extensible software, open interfaces; research canon pointers

### Appendices (reference)
- A. Canonical glossary — `00-overview/02` (cleaned)
- B. Labs — `10-labs/*` (kept as files)
- C. Mission Control case studies — `09-*` (kept as files)
- D. Research canon and source transcripts — `12-research-journal/initial-canon` + source index
- E. Coverage, maturity, changelog, reviewer guide — `00-overview/08`–`11`

## Chapter template

```markdown
---
title: <Chapter title>
part: understand | design | build | prove | operate | improve
chapter: <N>
summary: <one sentence>
absorbs: [<v1 paths>]
infographics: [<slot names>]
---

# <N>. <Title>

<Lead: 2–4 sentences. What this chapter is about, why it matters, what you will
be able to do after reading it.>

## The problem
<Concrete: who feels it, what breaks.>

## How it works
<Main body. Narrative prose, subsections, diagrams. Define every term on first
use. Use one analogy per major idea.>

## How to build it
<Concrete steps, contracts, checklists. Lists allowed here.>

## Failure modes
<What goes wrong, how to detect it, what to do.>

## In Mission Control
<Short callout: what is implemented, partial, or future, with the pinned commit.
Honest, brief. Never overstate.>

## Retain this
<5–8 sentences or bullets a reader should be able to recite.>

## Go deeper
<Related chapters, appendix labs, primary sources.>
```

## Infographic slots

Jay will supply his infographics later. Each chapter marks where they go:

```markdown
<!-- infographic: <slot-name> -->
> **Infographic — <Title>.** *(Jay's graphic goes here.)* Until then, the
> diagram below carries the same concept.
```

followed by a first-party Mermaid diagram of the same concept. Slot names are
listed in each chapter's frontmatter so they can be indexed.

## Writing rules

1. Plain English first; the precise term second, in bold, on first use.
2. One analogy per major idea (factory floor, air-traffic control, hospital
   hand-offs — pick what fits, never strain it).
3. Prose over bullets. Lists only for steps, contracts, checklists, tables.
4. No "Quick Read", reading times, audience chips, or status badges in the body.
5. No "Enduring Principle / Current Implementation / Future Vision" labels as
   section headings. The honesty survives inside "In Mission Control".
6. Keep every technical claim, contract field, failure mode, and term from the
   absorbed v1 chapters. Consolidate, do not drop. If two v1 chapters say the
   same thing, say it once, well.
7. Weave in transcript material where it belongs (see source index).
8. Diagrams show mechanism (boxes are components/records, arrows are contracts
   or state transitions), not decoration.
9. Never present a demo, proposal, or agent assertion as proven capability.

## Verification

- Every H2/H3 heading and glossary term from v1 must map to a new chapter
  (script: `scripts/check-coverage.mjs`).
- Site build, lint, tests, link check pass.
- Browser check of guide hub, one chapter per part, atlas, reference, mobile.
