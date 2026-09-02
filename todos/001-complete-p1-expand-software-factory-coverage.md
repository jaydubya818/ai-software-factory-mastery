---
status: complete
priority: p1
issue_id: "001"
tags: [documentation, software-factory, ai-engineering, runtime, evaluation]
dependencies: []
---

# Expand AI Software Factory Production Coverage

## Problem Statement

The guide is strong on governed intent, control and execution planes, evidence,
security, recovery, and human authority, but it does not yet teach several
production disciplines surrounding agent execution. The missing coverage makes
the canonical harness boundary too broad and leaves important source-material
terms absent from the curriculum and glossary.

## Findings

- The canonical Agent Harness currently includes model routing, context,
  policy, isolation, state, recovery, telemetry, evidence, and orchestration,
  obscuring replaceable boundaries between the coding harness, workflow
  wrapper, development environment, compute, and control plane.
- Data Understanding and Semantic Engineering have no dedicated coverage.
- Knowledge Engineering is limited to high-level RAG and knowledge-graph
  mentions rather than a governed ingestion and retrieval lifecycle.
- Evaluation principles exist, but dataset construction, grader calibration,
  replay, run comparison, and regression operations are incomplete.
- Development-environment and compute-fleet design is largely absent even
  though sandbox containment is well covered.
- Production feedback, reproducibility, automated review, agentic merge queues,
  and coordinated multi-repository delivery are not developed as workflows.
- Several requested named topics have no guide entry, including Agent Factory,
  inner and outer harnesses, ACP, AG-UI, CodeRabbit, agentic merge queue, and
  multi-repository development.

## Proposed Solutions

### Option 1: Glossary-only expansion

**Approach:** Add missing definitions and topic aliases without new chapters.

**Pros:** Small blast radius and fast completion.

**Cons:** Improves discoverability without teaching architecture, failure
modes, tradeoffs, or operating practices.

**Effort:** Low

**Risk:** Low

---

### Option 2: Phased production-coverage chapters

**Approach:** Add focused chapters for stack boundaries; data, knowledge,
context, and semantics; evaluation and replay; development environments and
compute; harness interoperability; feedback-to-merge; multi-repository
delivery; and compounding engineering. Update the glossary and navigation.

**Pros:** Closes the architectural gaps while following the guide's existing
chapter standard and keeping enduring concepts separate from product examples.

**Cons:** Larger documentation change and some overlap must be actively
controlled.

**Effort:** Medium

**Risk:** Low

---

### Option 3: Exhaustive tool and vendor encyclopedia

**Approach:** Add detailed profiles for every current harness, protocol,
runtime, infrastructure provider, and review product.

**Pros:** Broad landscape coverage.

**Cons:** High maintenance cost, rapid staleness, and poor separation between
enduring architecture and temporary product features.

**Effort:** High

**Risk:** Medium

## Recommended Action

Implement Option 2. Use product names only as dated case studies, keep the
canonical model vendor-neutral, and defer dynamic agent-authored application
extensions until the production stack is complete.

## Technical Details

**New chapters:**

- `guide/00-overview/05-software-factory-stack-boundaries.md`
- `guide/04-domain-model/04-multi-repository-development-and-coordinated-delivery.md`
- `guide/05-runtime-architecture/07-development-environments-compute-and-composable-infrastructure.md`
- `guide/05-runtime-architecture/08-coding-harnesses-adapters-and-agent-protocols.md`
- `guide/06-ai-engineering/03-data-knowledge-context-and-semantic-engineering.md`
- `guide/06-ai-engineering/04-evaluation-engineering-trace-replay-and-run-comparison.md`
- `guide/06-ai-engineering/05-agent-and-loop-engineering-patterns.md`
- `guide/07-quality-engineering/05-production-feedback-reproduction-review-and-merge.md`
- `guide/03-operating-model/05-compounding-engineering-and-human-attention.md`

**Updated navigation and vocabulary:**

- `README.md`
- `guide/README.md`
- `guide/00-overview/README.md`
- `guide/00-overview/02-canonical-glossary.md`

## Resources

- Repository-wide terminology and coverage audit completed 2026-08-30.
- User-provided platform taxonomy and software-factory design-pattern
  transcripts.
- `guide/writing-standard.md`
- `guide/12-research-journal/initial-canon.md`

## Acceptance Criteria

- [x] Canonical stack boundaries distinguish Agent Factory, control plane,
  orchestration, inner harness, outer harness, development environment, and
  compute infrastructure.
- [x] Data, Knowledge, Context, and Semantic Engineering are defined as separate
  responsibilities with explicit handoffs and failure modes.
- [x] Evaluation coverage includes datasets, trials, graders, reproducibility,
  trace replay, trajectory comparison, and regression decisions.
- [x] Development-environment coverage includes provisioning, identity,
  toolchains, previews, persistent/ephemeral workers, capacity, and build/buy
  tradeoffs.
- [x] Harness coverage distinguishes adapters, lifecycle hooks, structured
  events, capability negotiation, and MCP/ACP/AG-UI boundaries.
- [x] The feedback workflow covers untrusted intake, deduplication,
  reproduction, issue promotion, regression, automated review, and bounded
  merge maintenance.
- [x] Multi-repository coverage addresses discovery, dependency lineage,
  coordinated PRs, merge order, rollback, and submodule/subtree/symlink
  tradeoffs.
- [x] Compounding engineering distinguishes local corrections, shared
  procedures, evaluated promotion, and human attention economics.
- [x] Agent and Loop Engineering distinguish deterministic workflows from
  agents, document conditional routing, and define convergent retry and
  escalation behavior.
- [x] Glossary and navigation expose all new canonical terms and chapters.
- [x] Product-specific claims are dated and separated from enduring concepts.
- [x] Markdown links and repository terminology checks pass.
- [x] Existing uncommitted work is preserved and unrelated files are not
  modified.

## Work Log

### 2026-08-30 - Audit and execution setup

**By:** Codex

**Actions:**

- Audited approximately 100,000 words of guide and source material.
- Reviewed both supplied transcripts and excluded the requested
  product-specific material.
- Identified missing and underdeveloped production-engineering layers.
- Created branch `codex/software-factory-coverage` without committing existing
  working-tree changes.
- Selected the phased chapter approach after the Product Owner said to proceed.

**Learnings:**

- The guide's strongest differentiator is governed assurance; new material must
  extend that model rather than become a generic AI-tool catalog.
- Knowledge preparation, context selection, harness execution, and workflow
  governance need explicit ownership boundaries.

### 2026-08-30 - Production-coverage expansion completed

**By:** Codex

**Actions:**

- Added nine full chapters covering the missing production disciplines and
  followed the repository's eleven-section chapter standard in each.
- Expanded the canonical glossary with the requested topic vocabulary and
  precise replacements for overloaded terms.
- Updated the root guide, Start Here path, curriculum map, and research canon.
- Verified YAML front matter, required headings, local Markdown links,
  duplicate glossary entries, whitespace, requested-term coverage, and the
  requested exclusion boundary.

**Validation:**

- All local Markdown link targets exist.
- All nine new chapters contain required metadata and all eleven sections.
- Every requested topic is discoverable in the guide or glossary.
- The requested exclusion scan returned no matches in new or updated
  production-coverage material.
- `git diff --check` passed.
- Pre-existing unrelated working-tree changes remain present and were not
  rewritten as part of this work item.

**Learnings:**

- The most important terminology correction is to separate inner harness,
  outer harness, development environment, compute, orchestration, control
  plane, Agent Factory, and AI Software Factory responsibilities.
- A repository merge queue and agentic merge maintenance are complementary but
  must not be collapsed into one authority.

## Notes

- No production/runtime behavior changes are involved.
- Dynamic code generation and agent-authored application extensions are
  intentionally deferred from this work item.
