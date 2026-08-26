# AI Software Factory Mastery Curriculum

The curriculum moves from the purpose of the factory to its operating model,
domain, runtime, assurance systems, implementation, and leadership use. The
sequence matters. Runtime mechanisms make sense only after the learner
understands the authority and outcome model they serve.

## Start here

Begin with the [high-level reading guide](./00-overview/README.md). It links a
concise system overview, the
[platform blueprint and operating playbook](./00-overview/03-platform-blueprint-and-operating-playbook.md),
the canonical glossary, the foundational chapters, and the first golden-path
lab.

## 1. Vision

Define an AI Software Factory, explain why it matters now, and develop a
credible view of how software engineering changes when humans direct systems
that perform increasing amounts of execution.

Planned chapters:

- [What is an AI Software Factory?](./01-vision/01-what-is-an-ai-software-factory.md)
- Why it matters
- Why now
- The future of software engineering

## 2. First Principles

Establish the principles that should survive changes in models, vendors, and
implementation stacks. These include human-led and agent-executed engineering,
quality as the basis for autonomy, evidence over confidence, risk-proportional
control, and durable accountability.

Planned chapters:

- [Operational Autonomy and Trust Calibration](./02-first-principles/01-operational-autonomy-and-trust-calibration.md)
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

## 5. Runtime Architecture

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

## 6. AI Engineering

Build technical fluency in language models, agents, tool use, MCP, context
engineering, retrieval, memory, evaluations, structured outputs, model routing,
and multi-agent systems. Connect each capability to the factory problem it
solves and the new failure modes it introduces.

Chapters:

- [Agent Architecture, MCP, Tools, Context, and Memory](./06-ai-engineering/01-agent-architecture-mcp-tools-context-and-memory.md)
- [Model Routing, Evaluations, and Capability Selection](./06-ai-engineering/02-model-routing-evaluations-and-capability-selection.md)

## 7. Quality Engineering

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

## 8. Security and Governance

Study identity, authentication, authorization, policy, approvals, isolation,
data boundaries, auditability, budgets, risk, prompt injection, service
identity, and separation of duties.

Chapters:

- [Governance, Policy, and Risk-Proportional Approval](./08-security-and-governance/01-governance-policy-and-risk-proportional-approval.md)
- [Security and Identity Architecture](./08-security-and-governance/02-security-and-identity-architecture.md)
- [Software Supply Chain Security, Provenance, and Attestation](./08-security-and-governance/03-software-supply-chain-security-provenance-and-attestation.md)

## 9. Mission Control Case Studies

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

## 10. Labs

Convert conceptual understanding into implementation fluency through code
tracing, browser operation, bounded changes, debugging, deliberate failure,
recovery, validation, and architecture teach-backs.

The first autonomy proof is `Governed Issue -> Validated Pull Request`. It ends
with human merge approval and does not require autonomous deployment.

Initial lab:

- [Governed Issue to Validated Pull Request](./10-labs/01-governed-issue-to-validated-pull-request.md)
- [Capstone Architecture and Executive Defense](./10-labs/02-capstone-architecture-and-executive-defense.md)

## 11. Interview Mastery

Prepare for CTO, VP Engineering, Head of AI Engineering, Principal Engineer,
and AI startup leadership conversations. Include system-design interviews,
whiteboard exercises, executive explanations, technical deep dives, objections,
and evidence-backed stories.

Chapter:

- [Executive and Interview Mastery](./11-interview-mastery/01-executive-and-interview-mastery.md)

## 12. Research Journal

Analyze papers, standards, industry systems, and emerging architectures from
OpenAI, Anthropic, Google, Microsoft, GitHub, academia, and other primary
sources. Notes belong here only when they improve AI Software Factory judgment.

Start with the [initial research canon](./12-research-journal/initial-canon.md).

## Governing standard

All full chapters follow the [chapter writing standard](./writing-standard.md).
The original planning and interview drafts remain in
[source material](../source-material/README.md).

## Core curriculum status

The foundation and second-layer architecture sequence are now drafted. Chapters remain
`draft-for-study` until the learner completes their labs, teach-backs, and
independent review. Draft completion is not mastery.

The next accepted golden-path run should use a clean, merged, and pinned
Mission Control commit after draft PR #64 is resolved. Before that run, repair
the browser Mission policy and receipt-reconciliation path, configure the
controlled repository's GitHub App, and provide an active Governance Policy and
passing Factory Configuration. PR #61 proves the publication component; it
does not satisfy the browser-only lab. Chapter development does not depend on
those runtime prerequisites.
