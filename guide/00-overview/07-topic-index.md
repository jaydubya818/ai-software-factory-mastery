---
title: AI Software Factory Topic Index
status: canonical-navigation
audience: [all]
last_verified: 2026-08-30
---

# AI Software Factory Topic Index

Use this map when you have a topic in mind but do not know where it belongs in
the curriculum. “Start here” gives the shortest useful orientation. “Deep
dive” supplies the production architecture. “Practice” points to a lab or
exercise where one exists.

## Factory and operating model

| Topic | Start here | Deep dive | Practice |
| --- | --- | --- | --- |
| AI Software Factory | [Factory overview](./01-ai-software-factory-and-mission-control.md) | [Vision](../01-vision/01-what-is-an-ai-software-factory.md) | Chapter whiteboard |
| Agent Factory | [Stack boundaries](./05-software-factory-stack-boundaries.md) | [Factory configuration](../04-domain-model/02-factory-configuration-workflows-and-execution-manifests.md) | Capability-map lab |
| Mission Control | [Lifecycle](./04-intent-to-delivery-lifecycle.md) | [Capability and admission map](../09-mission-control-case-studies/03-capability-workflow-and-admission-map.md) | [Golden path](../10-labs/01-governed-issue-to-validated-pull-request.md) |
| Human-agent operating model | [Quick Read](../03-operating-model/01-human-agent-operating-model.md#quick-read) | [Full operating model](../03-operating-model/01-human-agent-operating-model.md) | Decision-packet exercise |
| Human-in/on/out-of-the-loop | [Glossary](./02-canonical-glossary.md) | [Compounding engineering](../03-operating-model/05-compounding-engineering-and-human-attention.md) | Attention-budget lab |
| Progressive autonomy | [Trust calibration](../02-first-principles/01-operational-autonomy-and-trust-calibration.md) | [Maturity model](../03-operating-model/04-enterprise-adoption-and-factory-maturity-model.md) | Promotion/demotion exercise |
| Compounding engineering | [Glossary](./02-canonical-glossary.md) | [Compounding and attention](../03-operating-model/05-compounding-engineering-and-human-attention.md) | Correction-clustering lab |
| Capability coverage and maturity | [Coverage map](./08-capability-coverage-and-maturity.md) | [Reviewer guide](./09-reviewer-guide.md) | External review checklist |

## Agent Factory and capability supply chain

| Topic | Start here | Deep dive | Practice |
| --- | --- | --- | --- |
| Capability lifecycle and registries | [Capability supply chain](../agent-factory/01-capability-supply-chain-and-registries.md) | [Certification and retirement](../agent-factory/03-capability-evaluation-certification-promotion-and-retirement.md) | [Certification lab](../10-labs/03-capability-certification-and-revocation-lab.md) |
| Agent, skill, tool, and prompt versioning | [Packaging and versioning](../agent-factory/02-capability-packaging-versioning-and-dependency-resolution.md) | [Execution manifests](../04-domain-model/02-factory-configuration-workflows-and-execution-manifests.md) | Dependency-lock exercise |
| Capability discovery and resolution | [Registries](../agent-factory/01-capability-supply-chain-and-registries.md) | [Packaging and dependencies](../agent-factory/02-capability-packaging-versioning-and-dependency-resolution.md) | Revocation exercise |
| Capability evaluation and promotion | [Certification lifecycle](../agent-factory/03-capability-evaluation-certification-promotion-and-retirement.md) | [Evaluation science](../06-ai-engineering/06-evaluation-science-and-controlled-experimentation.md) | [Continual-improvement lab](../10-labs/08-continual-improvement-promotion-lab.md) |

## Agents, harnesses, and interoperability

| Topic | Start here | Deep dive | Practice |
| --- | --- | --- | --- |
| AI coding agents | [Stack boundaries](./05-software-factory-stack-boundaries.md) | [Agent architecture](../06-ai-engineering/01-agent-architecture-mcp-tools-context-and-memory.md) | Agent-composition exercise |
| Inner and outer harnesses | [Stack boundaries](./05-software-factory-stack-boundaries.md) | [Harnesses and adapters](../05-runtime-architecture/08-coding-harnesses-adapters-and-agent-protocols.md) | Two-adapter comparison |
| Agent orchestration | [Agent and loop patterns](../06-ai-engineering/05-agent-and-loop-engineering-patterns.md) | [Runtime orchestration](../05-runtime-architecture/02-runtime-orchestration-and-state-machines.md) | Router/verifier lab |
| Generate–verify–retry–escalate | [Loop engineering glossary](./02-canonical-glossary.md) | [Agent and loop patterns](../06-ai-engineering/05-agent-and-loop-engineering-patterns.md) | Oscillation exercise |
| MCP | [Agent architecture](../06-ai-engineering/01-agent-architecture-mcp-tools-context-and-memory.md) | [Protocols](../05-runtime-architecture/08-coding-harnesses-adapters-and-agent-protocols.md) | Tool-gateway threat exercise |
| ACP, AG-UI, and A2A | [Protocols table](../05-runtime-architecture/08-coding-harnesses-adapters-and-agent-protocols.md#map-protocols-to-their-actual-boundaries) | [Research canon](../12-research-journal/initial-canon.md) | Protocol-boundary whiteboard |
| Claude Code and Codex | [Dated case studies](../05-runtime-architecture/08-coding-harnesses-adapters-and-agent-protocols.md#keep-product-comparisons-dated) | Official references in the chapter | Adapter conformance lab |

## Data, context, evaluation, and quality

| Topic | Start here | Deep dive | Practice |
| --- | --- | --- | --- |
| Data Understanding | [Glossary](./02-canonical-glossary.md) | [Data and knowledge engineering](../06-ai-engineering/03-data-knowledge-context-and-semantic-engineering.md) | Source-quality lab |
| Knowledge Engineering and RAG | [Agent context](../06-ai-engineering/01-agent-architecture-mcp-tools-context-and-memory.md) | [Retrieval lifecycle](../06-ai-engineering/03-data-knowledge-context-and-semantic-engineering.md) | Hybrid-retrieval lab |
| Context Engineering | [Quick Read](../06-ai-engineering/01-agent-architecture-mcp-tools-context-and-memory.md#quick-read) | [Context compilation](../06-ai-engineering/03-data-knowledge-context-and-semantic-engineering.md#compile-context-for-the-decision-not-the-corpus) | Context-package lab |
| Semantic Engineering | [Glossary](./02-canonical-glossary.md) | [Semantic contracts](../06-ai-engineering/03-data-knowledge-context-and-semantic-engineering.md#treat-semantics-as-executable-infrastructure) | Entity-resolution exercise |
| AI evaluations | [Model routing](../06-ai-engineering/02-model-routing-evaluations-and-capability-selection.md) | [Evaluation engineering](../06-ai-engineering/04-evaluation-engineering-trace-replay-and-run-comparison.md) | Baseline/candidate lab |
| Trace replay and run comparison | [Glossary](./02-canonical-glossary.md) | [Replay and comparison](../06-ai-engineering/04-evaluation-engineering-trace-replay-and-run-comparison.md) | Trajectory-diff lab |
| Independent verification | [Quality Quick Read](../07-quality-engineering/01-quality-and-evidence-architecture.md#quick-read) | [Quality contracts](../07-quality-engineering/03-continuous-quality-contracts-proof-packages-and-certificates.md) | Proof-package exercise |
| Evaluation datasets, calibration, and uncertainty | [Evaluation science](../06-ai-engineering/06-evaluation-science-and-controlled-experimentation.md) | [Evaluation engineering](../06-ai-engineering/04-evaluation-engineering-trace-replay-and-run-comparison.md) | Repeated-trial lab |
| Prompt, skill, tool, and context optimization | [Capability learning](../06-ai-engineering/07-capability-learning-optimization-and-regression-control.md) | [Governed learning](../03-operating-model/03-governed-continuous-learning-and-recursive-improvement.md) | [Promotion lab](../10-labs/08-continual-improvement-promotion-lab.md) |

## Repository onboarding and autonomous workflows

| Topic | Start here | Deep dive | Practice |
| --- | --- | --- | --- |
| Repository onboarding and readiness | [Repository onboarding](../autonomous-workflows/01-repository-onboarding-and-codebase-intelligence.md) | [Data and context](../06-ai-engineering/03-data-knowledge-context-and-semantic-engineering.md) | [Onboarding lab](../10-labs/04-repository-onboarding-and-readiness-lab.md) |
| Codebase indexing and intelligence | [Repository onboarding](../autonomous-workflows/01-repository-onboarding-and-codebase-intelligence.md) | [Multi-repository delivery](../04-domain-model/04-multi-repository-development-and-coordinated-delivery.md) | Drift and refresh exercise |
| Autonomous workflow catalog and backlog | [Workflow catalog](../autonomous-workflows/02-autonomous-engineering-workflow-catalog.md) | [Factory economics](../03-operating-model/02-factory-economics-and-operating-metrics.md) | Three-workflow manifest lab |
| Feature, defect, test, dependency, and modernization work | [Change workflows](../autonomous-workflows/03-change-workflows-features-defects-tests-and-modernization.md) | [Testing strategy](../verification-delivery-engineering/01-software-testing-strategy-for-agentic-change.md) | Reproduction and fault-sensitivity exercise |
| Security, incident, production, and documentation work | [Operational workflows](../autonomous-workflows/04-operational-workflows-security-incidents-production-and-knowledge.md) | [Production verification](../verification-delivery-engineering/03-progressive-delivery-production-verification-and-rollback.md) | [Incident lab](../10-labs/07-incident-remediation-and-postmortem-lab.md) |

## Runtime, infrastructure, and delivery

| Topic | Start here | Deep dive | Practice |
| --- | --- | --- | --- |
| Control plane | [Quick Read](../05-runtime-architecture/01-control-plane-and-execution-plane.md#quick-read) | [Runtime state machines](../05-runtime-architecture/02-runtime-orchestration-and-state-machines.md) | Authority-boundary whiteboard |
| Development environments | [Stack boundaries](./05-software-factory-stack-boundaries.md) | [Environment and compute](../05-runtime-architecture/07-development-environments-compute-and-composable-infrastructure.md) | Clean-environment lab |
| Compute infrastructure | [Glossary](./02-canonical-glossary.md) | [Worker-fleet design](../05-runtime-architecture/07-development-environments-compute-and-composable-infrastructure.md#design-the-worker-fleet-as-a-production-service) | Capacity/failover exercise |
| Composable, enterprise, and open-source infrastructure | [Glossary](./02-canonical-glossary.md) | [Build, buy, and bring your own](../05-runtime-architecture/07-development-environments-compute-and-composable-infrastructure.md#compose-the-stack-one-layer-at-a-time) | Vendor-boundary review |
| Sandboxing and isolation | [Runtime map](../05-runtime-architecture/01-control-plane-and-execution-plane.md) | [Sandboxed execution](../05-runtime-architecture/04-sandboxed-execution-isolation-and-publication.md) | Escape and teardown tests |
| Reliability and recovery | [Attempts and leases](../05-runtime-architecture/03-tasks-attempts-leases-idempotency-and-recovery.md) | [Factory SRE](../07-quality-engineering/02-release-production-feedback-and-factory-sre.md) | Failure-injection lab |
| Multi-repository development | [Glossary](./02-canonical-glossary.md) | [Coordinated delivery](../04-domain-model/04-multi-repository-development-and-coordinated-delivery.md) | Two-repository lab |
| Git submodules and subtrees | [Strategy comparison](../04-domain-model/04-multi-repository-development-and-coordinated-delivery.md#choose-a-local-workspace-strategy-for-the-actual-constraint) | Git references in the chapter | Composition tradeoff exercise |
| Production feedback and reproduction | [Factory SRE](../07-quality-engineering/02-release-production-feedback-and-factory-sre.md) | [Feedback-to-merge](../07-quality-engineering/05-production-feedback-reproduction-review-and-merge.md) | Reproduction lab |
| Automated PR review and CodeRabbit | [Feedback-to-merge](../07-quality-engineering/05-production-feedback-reproduction-review-and-merge.md#bound-automated-review-loops) | Dated product references in the chapter | Bounded review-loop exercise |
| Merge queues and agentic merge maintenance | [Glossary](./02-canonical-glossary.md) | [Merge maintenance](../07-quality-engineering/05-production-feedback-reproduction-review-and-merge.md#distinguish-platform-merge-queues-from-agentic-merge-maintenance) | Currentness/conflict simulation |
| Unit, integration, contract, property, mutation, fuzz, performance, accessibility, and visual testing | [Testing strategy](../verification-delivery-engineering/01-software-testing-strategy-for-agentic-change.md) | [Quality contracts](../07-quality-engineering/03-continuous-quality-contracts-proof-packages-and-certificates.md) | Fault-sensitivity lab |
| CI/CD, artifacts, database migrations, and API compatibility | [Delivery engineering](../verification-delivery-engineering/02-cicd-artifacts-migrations-and-api-compatibility.md) | [Supply-chain security](../08-security-and-governance/03-software-supply-chain-security-provenance-and-attestation.md) | Migration-compatibility lab |
| Progressive delivery, feature flags, canaries, and rollback | [Progressive delivery](../verification-delivery-engineering/03-progressive-delivery-production-verification-and-rollback.md) | [Factory SRE](../07-quality-engineering/02-release-production-feedback-and-factory-sre.md) | [Rollback lab](../10-labs/06-progressive-delivery-and-rollback-lab.md) |

## Platform, operator experience, and security

| Topic | Start here | Deep dive | Practice |
| --- | --- | --- | --- |
| Developer portal, service catalog, and golden paths | [Platform product](../factory-platform-engineering/01-developer-portal-catalog-and-golden-paths.md) | [Enterprise adoption](../03-operating-model/04-enterprise-adoption-and-factory-maturity-model.md) | Golden-path usability exercise |
| Scheduling, quotas, capacity, fairness, and cost | [Scheduling and cost](../factory-platform-engineering/02-scheduling-capacity-cost-and-fairness.md) | [Runtime orchestration](../05-runtime-architecture/02-runtime-orchestration-and-state-machines.md) | Queue simulation |
| Resilience, disaster recovery, and emergency authority | [Resilience and DR](../factory-platform-engineering/03-resilience-disaster-recovery-and-factory-sre.md) | [Attempts and recovery](../05-runtime-architecture/03-tasks-attempts-leases-idempotency-and-recovery.md) | [Disaster-recovery lab](../10-labs/09-factory-disaster-recovery-lab.md) |
| Human-agent control surfaces and accessibility | [Operator experience](../factory-platform-engineering/04-human-agent-control-surfaces-and-operator-experience.md) | [Human attention](../03-operating-model/05-compounding-engineering-and-human-attention.md) | Control-state usability lab |
| Workflow DSLs, events, schema evolution, and storage | [Workflow and event contracts](../factory-platform-engineering/05-workflow-event-contracts-and-factory-storage.md) | [Runtime orchestration](../05-runtime-architecture/02-runtime-orchestration-and-state-machines.md) | Event replay and compensation exercise |
| Observability semantics, token cost, cardinality, and forensics | [Observability semantics](../factory-platform-engineering/06-observability-semantics-cost-and-forensics.md) | [Factory observability](../05-runtime-architecture/05-factory-observability-and-agent-runtime-telemetry.md) | Forensic-bundle exercise |
| Agentic threats, prompt injection, tool abuse, and memory poisoning | [Agentic threat model](../08-security-and-governance/04-agentic-threat-model-and-adversarial-defense.md) | [Security architecture](../08-security-and-governance/02-security-and-identity-architecture.md) | [Attack and containment lab](../10-labs/05-agentic-security-attack-and-containment-lab.md) |
| Workload identity, secrets, privacy, licensing, and compliance | [Identity and privacy](../08-security-and-governance/05-workload-identity-secrets-privacy-and-compliance.md) | [Governance and policy](../08-security-and-governance/01-governance-policy-and-risk-proportional-approval.md) | Identity-chain exercise |

## Choosing the next document

If you are still unsure, use the [Reading Paths](./06-reading-paths.md). If a
term is unfamiliar, use the [Canonical Glossary](./02-canonical-glossary.md).
Use [Capability Coverage and Maturity](./08-capability-coverage-and-maturity.md)
to distinguish documented architecture from validated and operationally proven
capability.
If a claim concerns current product behavior, use the versioned
[Mission Control capability and admission map](../09-mission-control-case-studies/03-capability-workflow-and-admission-map.md).
