---
title: What this guide covers
part: front-matter
chapter: 0
summary: A concise ownership map from the guide's eight-stage value stream and six architectural areas to the chapters that define each concept in full.
absorbs: []
infographics: []
---

# What this guide covers

Use this page to answer two questions: *Does the guide cover this?* and *Where is the canonical treatment?* It is an index, not a third model.

For orientation, start with [Chapter 2](../01-understand/02-the-factory-in-one-view.md). Its **eight-stage value stream** explains how work progresses. Its **six-area architecture** explains where responsibility lives. This page maps the deeper material to those two models. The [glossary](../appendix/glossary.md) preserves the full reference vocabulary.

## Coverage by value-stream stage

| Stage | Core question | Orientation brief | Canonical depth |
| --- | --- | --- | --- |
| **1. Intent** | What outcome is wanted, under which constraints, and how will success be recognized? | [Builder Intent](../stages/01-builder-intent.md) | [Authoritative records](../02-design/05-authoritative-records.md), [intent and specification](../02-design/06-intent-and-specification-engineering.md), [governance and risk](../02-design/07-governance-policy-and-risk-proportional-approval.md) |
| **2. Plan** | How will the outcome be achieved, decomposed, routed, and proved? | [Plan](../stages/02-plan.md) | [Intent and specification](../02-design/06-intent-and-specification-engineering.md), [agent and loop engineering](../03-build/18-agent-and-loop-engineering.md), [quality contracts](../04-prove/24-quality-contracts-proof-packages-and-certificates.md) |
| **3. Define Agent** | Which exact, eligible capability versions and grants bind to the work? | [Define Agent](../stages/03-define-agent.md) | [Agent Factory](../03-build/10-the-agent-factory.md), [model routing](../03-build/17-models-routing-and-capability-selection.md), [security](../04-prove/26-security.md) |
| **4. Execute through Harness** | How does probabilistic work run durably inside deterministic controls? | [Execute through Harness](../stages/04-execute-through-harness.md) | [Control and execution planes](../03-build/11-control-plane-orchestrator-and-execution-plane.md), [durable execution](../03-build/12-durable-execution.md), [harnesses and protocols](../03-build/13-coding-harnesses-and-agent-protocols.md), [environments](../03-build/14-development-environments-sandboxes-and-compute.md) |
| **5. Apply Skills** | How does reusable organizational method guide work without widening authority? | [Apply Skills](../stages/05-apply-skills.md) | [Agent Factory](../03-build/10-the-agent-factory.md), [agent architecture](../03-build/15-agent-architecture.md), [agent and loop engineering](../03-build/18-agent-and-loop-engineering.md) |
| **6. Evaluate** | What independently proves that the exact Candidate is correct and eligible? | [Evaluate](../stages/06-evaluate.md) | [Quality and evidence](../04-prove/21-quality-and-evidence-architecture.md), [testing](../04-prove/22-testing-strategy-for-agentic-change.md), [evaluation](../04-prove/23-evaluation-engineering.md), [proof packages](../04-prove/24-quality-contracts-proof-packages-and-certificates.md) |
| **7. Improve** | How do attributed outcomes become safer future versions? | [Improve](../stages/07-improve.md) | [Production feedback and review](../06-improve/32-production-feedback-review-and-the-agentic-merge-queue.md), [governed learning](../06-improve/33-governed-learning-and-compounding-engineering.md) |
| **8. Deliver Software** | Who authorizes progression, and how does a Candidate become an observed outcome? | [Deliver Software](../stages/08-deliver-software.md) | [CI/CD and production verification](../04-prove/25-cicd-progressive-delivery-and-production-verification.md), [platform operation](../05-operate/27-the-factory-as-a-platform.md), [resilience](../05-operate/29-resilience-incidents-and-the-control-tower.md) |

Stage boundaries preserve important distinctions: Plan approval does not dispatch execution; execution completion does not prove correctness; verification does not grant acceptance; acceptance does not imply merge; merge does not prove a production outcome.

## Coverage by architectural area

### Intent

Intent covers the human–agent operating model, business outcome, specification, durable records, risk, authority, economics, attention, and coordinated multi-repository scope.

- [Chapter 4](../02-design/04-the-human-agent-operating-model.md): human roles, agent boundaries, delegation, and escalation.
- [Chapter 5](../02-design/05-authoritative-records.md): Company, Workspace, Repository, Mission, Plan, WorkOrder, Task, Attempt, Candidate, evidence, and release records.
- [Chapter 6](../02-design/06-intent-and-specification-engineering.md): requirements, ambiguity, Definition of Correct, and quality contracts.
- [Chapter 7](../02-design/07-governance-policy-and-risk-proportional-approval.md): policy, authority, autonomy ceilings, exceptions, and risk-tiered approval.
- [Chapter 8](../02-design/08-economics-metrics-and-human-attention.md): trusted throughput, cost per accepted outcome, budgets, and scarce human attention.
- [Chapter 9](../02-design/09-multi-repository-design.md): workspace manifests, coordinated change sets, dependency ordering, and atomic delivery limits.

### Harness

Harness covers the control and execution planes, orchestration, durable state, retries and recovery, inner and outer harness contracts, protocols, environments, tools, context, memory, and autonomous workflows.

- [Chapter 11](../03-build/11-control-plane-orchestrator-and-execution-plane.md): authority boundaries, command and event contracts, workflow state, and admission.
- [Chapter 12](../03-build/12-durable-execution.md): Tasks, Attempts, leases, fencing, idempotency, checkpoints, pause, cancel, and recovery.
- [Chapter 13](../03-build/13-coding-harnesses-and-agent-protocols.md): inner and outer harnesses, adapters, lifecycle hooks, MCP, ACP, AG-UI, and A2A.
- [Chapter 14](../03-build/14-development-environments-sandboxes-and-compute.md): reproducible development environments, sandboxes, compute fleets, isolation, and capacity.
- [Chapter 15](../03-build/15-agent-architecture.md): agent loop, tool gateway, MCP use, context, and memory mechanics.
- [Chapter 16](../03-build/16-data-knowledge-semantic-and-context-engineering.md): data quality, authoritative knowledge, ingestion, retrieval, semantic contracts, provenance, freshness, and context selection.
- [Chapter 20](../03-build/20-autonomous-engineering-workflows.md): long-running, bounded workflow patterns and stopping behavior.

The guide keeps knowledge preparation, per-Attempt context selection, harness execution, and workflow governance distinguishable. They may share infrastructure, but they fail differently and need different owners.

### Capability

Capability covers reusable agents, skills, tool contracts, workflow templates, registries, packaging, versioning, evaluation, publication, deprecation, quarantine, and revocation.

- [Chapter 10](../03-build/10-the-agent-factory.md) owns the capability supply chain and registry lifecycle.
- [Chapter 15](../03-build/15-agent-architecture.md) defines the relationship among model, agent, skill, tool, and harness.
- [Chapter 18](../03-build/18-agent-and-loop-engineering.md) covers bounded loops, convergence, topology, escalation, and producer–verifier separation.
- [Chapter 27](../05-operate/27-the-factory-as-a-platform.md) covers contribution, ownership, paved roads, and capability release clocks.

### Model

Model covers profiles, eligibility, provider adapters, routing, fallback, reasoning effort, context limits, latency, reliability, privacy, and token economics.

- [Chapter 17](../03-build/17-models-routing-and-capability-selection.md) is the canonical owner.
- [Chapter 8](../02-design/08-economics-metrics-and-human-attention.md) owns budget and cost-per-outcome measures.
- [Chapter 23](../04-prove/23-evaluation-engineering.md) owns the evaluations required to make routing and model replacement real.

Models are capabilities, not workflow architecture. The best route for a stable transformation may be deterministic software rather than a model.

### Trust

Trust covers independent verification, testing, evaluation, evidence, provenance, currentness, human decision rights, security, identity, policy, privacy, supply chain, and compliance.

- [Chapters 21–24](../04-prove/21-quality-and-evidence-architecture.md) move from quality architecture through tests, evals, and proof packages.
- [Chapter 25](../04-prove/25-cicd-progressive-delivery-and-production-verification.md) connects exact-current evidence to CI/CD, rollout, and observed production health.
- [Chapter 26](../04-prove/26-security.md) owns workload identity, least privilege, secrets, untrusted context, agentic threats, containment, provenance, and supply-chain controls.
- [Chapter 28](../05-operate/28-observability-telemetry-and-forensics.md) connects logs, metrics, traces, events, lineage, and forensic reconstruction.
- [Chapter 29](../05-operate/29-resilience-incidents-and-the-control-tower.md) covers failure classification, incident response, recovery, and operator intervention.
- [Chapter 30](../05-operate/30-control-surfaces-event-contracts-and-storage.md) covers operator surfaces, events, storage, and durable control-plane contracts.

### Learning

Learning covers production feedback, reproduction, automated review, merge maintenance, datasets, experiments, failure clustering, governed adaptation, promotion, rollback, and compounding engineering.

- [Chapter 32](../06-improve/32-production-feedback-review-and-the-agentic-merge-queue.md) owns feedback-to-reproduction, risk-tiered automated review, structured findings, and merge-queue operation.
- [Chapter 33](../06-improve/33-governed-learning-and-compounding-engineering.md) owns learning signals, adaptation, experiments, promotion gates, and the path from correction to skill to automation.
- [Chapter 34](../06-improve/34-mission-control-as-a-living-case-study.md) shows which parts exist in Mission Control, which are partial, and which are future.

Learning is allowed to propose aggressively. Promotion changes authority or behavior and therefore follows explicit evidence and policy.

### Adoption surrounds the architecture

Adoption is not a seventh architecture area. It is the operating concern around all six: product experience, platform ownership, rollout, support, governance adoption, build-versus-buy, organizational change, and the metrics that prove repeated value.

- [Chapter 27](../05-operate/27-the-factory-as-a-platform.md) owns the platform product and contribution model.
- [Chapter 31](../05-operate/31-enterprise-adoption-and-the-infrastructure-landscape.md) owns staged adoption, infrastructure choices, migration, and enterprise operating concerns.
- [Chapter 35](../06-improve/35-mastering-the-factory.md) turns the material into an explanation, defense, and practice program.
- [Chapter 36](../06-improve/36-where-this-is-going.md) identifies future directions without making them current requirements.

## Reference material

The appendices support lookup and verification rather than the main teaching sequence:

- The [glossary](../appendix/glossary.md) preserves the complete vocabulary.
- The [Principles appendix](../appendix/principles.md) collects durable theses for review.
- The [research canon](../appendix/research/initial-canon.md) records external sources and provenance.
- The [Mission Control maturity map](../appendix/mission-control/01-implementation-maturity-and-evidence-map.md) is the canonical source for implemented, partial, and future case-study claims.
- [Coverage and maturity](../appendix/coverage-and-maturity.md), the [changelog](../appendix/changelog.md), and the [reviewer guide](../appendix/reviewer-guide.md) track the state of the guide itself.
- The [software architecture and system design study guide](../appendix/architecture-communication.md) supports architecture interviews, reviews, and defense.

Protocol and vendor details are time-sensitive. The owning chapters link to official specifications and state the review boundary. They should be reverified before a production decision.

## Recommended routes

- **First-time reader:** [How to read](./00-how-to-read-this-guide.md) → [Chapter 1](../01-understand/01-why-software-engineering-is-changing.md) → [Chapter 2](../01-understand/02-the-factory-in-one-view.md) → the six-part guide.
- **Executive:** [Chapter 2](../01-understand/02-the-factory-in-one-view.md) → [governance](../02-design/07-governance-policy-and-risk-proportional-approval.md) → [economics](../02-design/08-economics-metrics-and-human-attention.md) → [adoption](../05-operate/31-enterprise-adoption-and-the-infrastructure-landscape.md).
- **Architect:** [Chapter 2](../01-understand/02-the-factory-in-one-view.md) → the relevant architectural area above → [Mission Control evidence](../appendix/mission-control/01-implementation-maturity-and-evidence-map.md).
- **Builder:** Search for the task or term → open its owning chapter → use the stage brief to see the upstream and downstream contract.
- **Reviewer:** Start from the claim → inspect its `Go deeper` sources → check the evidence boundary and currentness → distinguish standard, research, vendor claim, practitioner opinion, internal synthesis, and repository evidence.

For the full chapter list, use the [guide index](../README.md).
