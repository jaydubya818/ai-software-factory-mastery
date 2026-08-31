# AI Software Factory Mastery Curriculum

The curriculum moves from the purpose of the factory to its operating model,
domain, runtime, assurance systems, implementation, and leadership use. The
sequence matters. Runtime mechanisms make sense only after the learner
understands the authority and outcome model they serve.

## Start here

Begin with the [high-level reading guide](./00-overview/README.md), then choose
the [Executive, Architect, Builder, or Deep Study path](./00-overview/06-reading-paths.md).
Use the [Topic Index](./00-overview/07-topic-index.md) for question-led discovery
and the [Canonical Glossary](./00-overview/02-canonical-glossary.md) for precise
terms.

Before treating breadth as maturity, inspect the
[Capability Coverage and Maturity map](./00-overview/08-capability-coverage-and-maturity.md).
External reviewers should use the [Reviewer Guide](./00-overview/09-reviewer-guide.md)
and [Curriculum Changelog](./00-overview/10-changelog.md).

## Content types

- **Foundation** establishes vocabulary and first principles.
- **Core architecture** defines records, boundaries, runtime, and assurance.
- **Production operations** covers scale, reliability, feedback, and governance.
- **Advanced** deepens specialized engineering disciplines.
- **Case study** records versioned implementation evidence.
- **Lab** converts understanding into demonstrated capability.
- **Reference** supports lookup rather than sequential reading.

Each priority chapter begins with a **Quick Read**. Use it to decide whether the
full chapter is relevant to the decision in front of you.

## 1. Vision

Define an AI Software Factory, explain why it matters now, and develop a
credible view of how software engineering changes when humans direct systems
that perform increasing amounts of execution.

Current chapter:

- [What is an AI Software Factory?](./01-vision/01-what-is-an-ai-software-factory.md)

Further scope is developed within that chapter:

- Why it matters
- Why now
- The future of software engineering

## 2. First Principles

Establish the principles that should survive changes in models, vendors, and
implementation stacks. These include human-led and agent-executed engineering,
quality as the basis for autonomy, evidence over confidence, risk-proportional
control, and durable accountability.

Current chapter:

- [Operational Autonomy and Trust Calibration](./02-first-principles/01-operational-autonomy-and-trust-calibration.md)

Further scope is developed within that chapter and the operating-model sequence:

- Human-led, agent-executed engineering
- Quality enables autonomy
- Evidence over confidence
- Progressive autonomy

## 3. Operating Model

Explain how humans and agents divide responsibility across intent, planning,
execution, validation, approval, recovery, and learning. Examine governance,
progressive autonomy, organizational transformation, human attention, and
factory economics. Distinguish factory-owned deployment governance from
deployment execution delegated to CI/CD systems.

Chapters:

- [The Human-Agent Operating Model](./03-operating-model/01-human-agent-operating-model.md)
- [Factory Economics and Operating Metrics](./03-operating-model/02-factory-economics-and-operating-metrics.md)
- [Governed Continuous Learning and Recursive Improvement](./03-operating-model/03-governed-continuous-learning-and-recursive-improvement.md)
- [Enterprise Adoption and Factory Maturity Model](./03-operating-model/04-enterprise-adoption-and-factory-maturity-model.md)
- [Compounding Engineering and Human Attention](./03-operating-model/05-compounding-engineering-and-human-attention.md)
- [Enterprise Governance Operating Model and Decision Rights](./03-operating-model/06-enterprise-governance-operating-model-and-decision-rights.md)

## 4. Domain Model

Develop the authoritative chain from organizational scope to accepted outcome:

`Company -> Workspace -> Repository -> Factory Configuration -> Mission ->
Plan -> WorkOrder -> Task -> Attempt -> Evidence -> Pull Request -> Release`

Each concept must explain the decision it owns, what it does not own, its
lifecycle, its relationships, and the failure caused when layers are collapsed.

Chapters:

- [The Authoritative Delivery Hierarchy](./04-domain-model/01-authoritative-delivery-hierarchy.md)
- [Factory Configuration, Workflow Contracts, and Execution Manifests](./04-domain-model/02-factory-configuration-workflows-and-execution-manifests.md)
- [Specification Engineering, Executable Requirements, and Plan Assurance](./04-domain-model/03-specification-engineering-executable-requirements-and-plan-assurance.md)
- [Multi-Repository Development and Coordinated Delivery](./04-domain-model/04-multi-repository-development-and-coordinated-delivery.md)
- [Factory System Inventory, Classification, and Lifecycle](./04-domain-model/05-factory-system-inventory-classification-and-lifecycle.md)

## 5. Agent Factory and Capability Supply Chain

Create and govern reusable agents, skills, tools, prompts, model profiles,
evaluators, and configurations. Treat them as versioned supply-chain artifacts
with ownership, packaging, dependency resolution, evaluation, certification,
publication, discovery, promotion, deprecation, and revocation.

Chapters:

- [Capability Supply Chain and Registries](./agent-factory/01-capability-supply-chain-and-registries.md)
- [Capability Packaging, Versioning, and Dependency Resolution](./agent-factory/02-capability-packaging-versioning-and-dependency-resolution.md)
- [Capability Evaluation, Certification, Promotion, and Retirement](./agent-factory/03-capability-evaluation-certification-promotion-and-retirement.md)
- [Tool, Skill, and Integration Contract Reference](./agent-factory/04-tool-skill-and-integration-contract-reference.md)

## 6. Runtime Architecture

Study the systems that turn authorized work into durable execution. Topics
include React, Convex, Hono, executors, worktrees, GitHub, queues, state
machines, concurrency, retries, cancellation, recovery, and orchestration.

Implementation-specific material must remain clearly separated from enduring
runtime principles.

Chapters:

- [Control Plane and Execution Plane](./05-runtime-architecture/01-control-plane-and-execution-plane.md)
- [Runtime Orchestration and State Machines](./05-runtime-architecture/02-runtime-orchestration-and-state-machines.md)
- [Tasks, Attempts, Leases, Idempotency, and Recovery](./05-runtime-architecture/03-tasks-attempts-leases-idempotency-and-recovery.md)
- [Sandboxed Execution, Isolation, and Publication](./05-runtime-architecture/04-sandboxed-execution-isolation-and-publication.md)
- [Factory Observability and Agent Runtime Telemetry](./05-runtime-architecture/05-factory-observability-and-agent-runtime-telemetry.md)
- [AI Software Factory Reference Architecture](./05-runtime-architecture/06-ai-software-factory-reference-architecture.md)
- [Development Environments, Compute, and Composable Infrastructure](./05-runtime-architecture/07-development-environments-compute-and-composable-infrastructure.md)
- [Coding Harnesses, Adapters, and Agent Protocols](./05-runtime-architecture/08-coding-harnesses-adapters-and-agent-protocols.md)
- [Orchestration Component Model and Runtime Contracts](./05-runtime-architecture/09-orchestration-component-model-and-runtime-contracts.md)

## 7. AI Engineering

Build technical fluency in language models, agents, tool use, MCP, context
engineering, retrieval, memory, evaluations, structured outputs, model routing,
and multi-agent systems. Connect each capability to the factory problem it
solves and the new failure modes it introduces.

Chapters:

- [AI Systems Foundations for Software Factory Architects](./06-ai-engineering/00-ai-systems-foundations-for-software-factory-architects.md)
- [Agent Architecture, MCP, Tools, Context, and Memory](./06-ai-engineering/01-agent-architecture-mcp-tools-context-and-memory.md)
- [Model Routing, Evaluations, and Capability Selection](./06-ai-engineering/02-model-routing-evaluations-and-capability-selection.md)
- [Data, Knowledge, Context, and Semantic Engineering](./06-ai-engineering/03-data-knowledge-context-and-semantic-engineering.md)
- [Evaluation Engineering, Trace Replay, and Run Comparison](./06-ai-engineering/04-evaluation-engineering-trace-replay-and-run-comparison.md)
- [Agent and Loop Engineering Patterns](./06-ai-engineering/05-agent-and-loop-engineering-patterns.md)
- [Evaluation Science and Controlled Experimentation](./06-ai-engineering/06-evaluation-science-and-controlled-experimentation.md)
- [Capability Learning, Optimization, and Regression Control](./06-ai-engineering/07-capability-learning-optimization-and-regression-control.md)
- [Knowledge, Context, and Retrieval Pipeline Specification](./06-ai-engineering/08-knowledge-context-and-retrieval-pipeline-specification.md)
- [Multi-Agent Topologies and Collaboration Contracts](./06-ai-engineering/09-multi-agent-topologies-and-collaboration-contracts.md)
- [Agentic Architecture Patterns and Autonomy Selection](./06-ai-engineering/10-agentic-architecture-patterns-and-autonomy-selection.md)

## 8. Autonomous Engineering Workflows

Turn general agent capability into explicit workflow products. Onboard
repositories before granting authority, then distinguish feature, defect, test,
dependency, security, incident, production, modernization, and knowledge work
by trigger, evidence, risk, recovery, and accepted outcome.

Chapters:

- [Repository Onboarding and Codebase Intelligence](./autonomous-workflows/01-repository-onboarding-and-codebase-intelligence.md)
- [Autonomous Engineering Workflow Catalog](./autonomous-workflows/02-autonomous-engineering-workflow-catalog.md)
- [Change Workflows — Features, Defects, Tests, and Modernization](./autonomous-workflows/03-change-workflows-features-defects-tests-and-modernization.md)
- [Operational Workflows — Security, Incidents, Production, and Knowledge](./autonomous-workflows/04-operational-workflows-security-incidents-production-and-knowledge.md)

## 9. Verification and Delivery Engineering

Build independent proof using a risk-based test portfolio, reproducible builds,
immutable artifacts, compatibility and migration controls, progressive
delivery, rollback, production verification, and customer-outcome evidence.

Chapters:

- [Software Testing Strategy for Agentic Change](./verification-delivery-engineering/01-software-testing-strategy-for-agentic-change.md)
- [CI/CD, Artifacts, Migrations, and API Compatibility](./verification-delivery-engineering/02-cicd-artifacts-migrations-and-api-compatibility.md)
- [Progressive Delivery, Production Verification, and Rollback](./verification-delivery-engineering/03-progressive-delivery-production-verification-and-rollback.md)

## 10. Factory Platform Engineering

Operate the factory as an internal product and a critical production system.
Cover portals, catalogs, golden paths, self-service, scheduling, capacity, cost,
fairness, resilience, disaster recovery, and human-agent control surfaces.

Chapters:

- [Developer Portal, Service Catalog, and Golden Paths](./factory-platform-engineering/01-developer-portal-catalog-and-golden-paths.md)
- [Scheduling, Capacity, Cost, and Fairness](./factory-platform-engineering/02-scheduling-capacity-cost-and-fairness.md)
- [Resilience, Disaster Recovery, and Factory SRE](./factory-platform-engineering/03-resilience-disaster-recovery-and-factory-sre.md)
- [Human-Agent Control Surfaces and Operator Experience](./factory-platform-engineering/04-human-agent-control-surfaces-and-operator-experience.md)
- [Workflow and Event Contracts, Schema Evolution, and Factory Storage](./factory-platform-engineering/05-workflow-event-contracts-and-factory-storage.md)
- [Observability Semantics, Cost Attribution, and Forensics](./factory-platform-engineering/06-observability-semantics-cost-and-forensics.md)
- [Enterprise Operations, Reliability, and FinOps Reference](./factory-platform-engineering/07-enterprise-operations-reliability-and-finops-reference.md)
- [Control Tower Monitoring, Detection, and Response](./factory-platform-engineering/08-control-tower-monitoring-detection-and-response.md)

## 11. Quality Engineering

Explain how continuous and independent validation permit greater autonomy.
Cover testing, evaluations, observability, reliability, evidence provenance,
freshness, conflicting results, waivers, and production feedback. Treat lead
time to validated customer value, change failure rate, and engineering
leverage as a coupled success system.

Chapters:

- [Quality and Evidence Architecture](./07-quality-engineering/01-quality-and-evidence-architecture.md)
- [Release, Production Feedback, and Factory SRE](./07-quality-engineering/02-release-production-feedback-and-factory-sre.md)
- [Continuous Quality Contracts, Proof Packages, and Certificates](./07-quality-engineering/03-continuous-quality-contracts-proof-packages-and-certificates.md)
- [Quality Contract and Certificate Technical Specification](./07-quality-engineering/04-quality-contract-and-certificate-technical-specification.md)
- [Production Feedback, Reproduction, Review, and Merge](./07-quality-engineering/05-production-feedback-reproduction-review-and-merge.md)

## 12. Security and Governance

Study identity, authentication, authorization, policy, approvals, isolation,
data boundaries, auditability, budgets, risk, prompt injection, service
identity, and separation of duties.

Chapters:

- [Governance, Policy, and Risk-Proportional Approval](./08-security-and-governance/01-governance-policy-and-risk-proportional-approval.md)
- [Security and Identity Architecture](./08-security-and-governance/02-security-and-identity-architecture.md)
- [Software Supply Chain Security, Provenance, and Attestation](./08-security-and-governance/03-software-supply-chain-security-provenance-and-attestation.md)
- [Agentic Threat Model and Adversarial Defense](./08-security-and-governance/04-agentic-threat-model-and-adversarial-defense.md)
- [Workload Identity, Secrets, Privacy, and Compliance](./08-security-and-governance/05-workload-identity-secrets-privacy-and-compliance.md)
- [Agentic Governance Control Framework](./08-security-and-governance/06-agentic-governance-control-framework.md)
- [Authority, Autonomy, and Emergency Control](./08-security-and-governance/07-authority-autonomy-and-emergency-control.md)

## Supplemental: Mission Control Case Studies

Use Mission Control to examine real architectural decisions, implementation
tradeoffs, failures, and lessons. Every case study cites the exact product
source and commit while preserving the distinction between product
documentation and personal learning.

Current case studies:

- [Mission Control Implementation Maturity and Evidence Map](./09-mission-control-case-studies/01-implementation-maturity-and-evidence-map.md)
- [Verification-First Software Factory — Mission Control Case Study](./09-mission-control-case-studies/02-verification-first-software-factory.md)
  — explains the assurance architecture, traces the implemented P0 at an exact
  Mission Control commit, distinguishes proposed completion work, and provides
  interview questions, whiteboard exercises, and hands-on mastery labs.
- [Mission Control Capability, Workflow, and Admission Map](./09-mission-control-case-studies/03-capability-workflow-and-admission-map.md)
  — maps the current checked-out implementation across the complete
  Intent-to-Delivery Lifecycle, explains production execution admission,
  identifies exact capability boundaries, and distinguishes qualified code
  from configured production operation.

## Supplemental: Labs

Convert conceptual understanding into implementation fluency through code
tracing, browser operation, bounded changes, debugging, deliberate failure,
recovery, validation, and architecture teach-backs.

The first autonomy proof is `Governed Issue -> Validated Pull Request`. It ends
with human merge approval and does not require autonomous deployment.

Labs:

- [Governed Issue to Validated Pull Request](./10-labs/01-governed-issue-to-validated-pull-request.md)
- [Capstone Architecture and Executive Defense](./10-labs/02-capstone-architecture-and-executive-defense.md)
- [Capability Certification and Revocation](./10-labs/03-capability-certification-and-revocation-lab.md)
- [Repository Onboarding and Readiness](./10-labs/04-repository-onboarding-and-readiness-lab.md)
- [Agentic Security Attack and Containment](./10-labs/05-agentic-security-attack-and-containment-lab.md)
- [Progressive Delivery and Rollback](./10-labs/06-progressive-delivery-and-rollback-lab.md)
- [Incident Remediation and Postmortem](./10-labs/07-incident-remediation-and-postmortem-lab.md)
- [Continual Improvement Promotion](./10-labs/08-continual-improvement-promotion-lab.md)
- [Factory Disaster Recovery](./10-labs/09-factory-disaster-recovery-lab.md)
- [Authority, Containment, and Decision Replay](./10-labs/10-authority-containment-and-decision-replay-lab.md)
- [Orchestration Failure, Recovery, and Cost](./10-labs/11-orchestration-failure-recovery-and-cost-lab.md)
- [Knowledge Poisoning, Revocation, and Retrieval](./10-labs/12-knowledge-poisoning-revocation-and-retrieval-lab.md)
- [External Capability Intake and Recertification](./10-labs/13-external-capability-intake-and-recertification-lab.md)

## Supplemental: Interview Practice

Prepare for CTO, VP Engineering, Head of AI Engineering, Principal Engineer,
and AI startup leadership conversations. Include system-design interviews,
whiteboard exercises, executive explanations, technical deep dives, objections,
and evidence-backed stories.

Chapter:

- [Executive and Interview Mastery](./11-interview-mastery/01-executive-and-interview-mastery.md)

The existing directory prefixes are retained to avoid breaking published
links. Interview practice is supplemental; the Research Journal remains the
eleventh core curriculum area.

## Supplemental: Research Journal

Analyze papers, standards, industry systems, and emerging architectures from
OpenAI, Anthropic, Google, Microsoft, GitHub, academia, and other primary
sources. Notes belong here only when they improve AI Software Factory judgment.

Start with the [initial research canon](./12-research-journal/initial-canon.md).

## Governing standard

All full chapters follow the [chapter writing standard](./writing-standard.md).
The original planning and interview drafts remain in
[source material](../source-material/README.md).

## Core curriculum status

The foundation and second-layer architecture sequence are drafted. Chapters
remain `draft-for-study` until the learner completes their labs, teach-backs,
and independent review. Draft completion is not mastery.

Mission Control changes independently of this curriculum. Use the versioned
[current capability, workflow, and admission map](./09-mission-control-case-studies/03-capability-workflow-and-admission-map.md),
the historical
[implementation maturity map](./09-mission-control-case-studies/01-implementation-maturity-and-evidence-map.md),
and retained [golden-path evidence](./10-labs/evidence/2026-08-08-golden-path/README.md)
for point-in-time readiness claims. This landing page is navigation, not
evidence of current product capability.
