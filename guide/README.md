# AI Software Factory Mastery Curriculum

The curriculum moves from the purpose of the factory to its operating model,
domain, runtime, assurance systems, implementation, and leadership use. The
sequence matters. Runtime mechanisms make sense only after the learner
understands the authority and outcome model they serve.

## Start here

Begin with the [high-level reading guide](./00-overview/README.md). It links a
concise system overview, the canonical glossary, the foundational chapters, and
the first golden-path lab.

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

Chapter:

- [The Human-Agent Operating Model](./03-operating-model/01-human-agent-operating-model.md)

## 4. Domain Model

Develop the authoritative chain from organizational scope to accepted outcome:

`Company -> Workspace -> Repository -> Factory Configuration -> Mission ->
Plan -> WorkOrder -> Task -> Attempt -> Evidence -> Pull Request -> Release`

Each concept must explain the decision it owns, what it does not own, its
lifecycle, its relationships, and the failure caused when layers are collapsed.

Chapter:

- [The Authoritative Delivery Hierarchy](./04-domain-model/01-authoritative-delivery-hierarchy.md)

## 5. Runtime Architecture

Study the systems that turn authorized work into durable execution. Topics
include React, Convex, Hono, executors, worktrees, GitHub, queues, state
machines, concurrency, retries, cancellation, recovery, and orchestration.

Implementation-specific material must remain clearly separated from enduring
runtime principles.

Chapter:

- [Control Plane and Execution Plane](./05-runtime-architecture/01-control-plane-and-execution-plane.md)

## 6. AI Engineering

Build technical fluency in language models, agents, tool use, MCP, context
engineering, retrieval, memory, evaluations, structured outputs, model routing,
and multi-agent systems. Connect each capability to the factory problem it
solves and the new failure modes it introduces.

## 7. Quality Engineering

Explain how continuous and independent validation permit greater autonomy.
Cover testing, evaluations, observability, reliability, evidence provenance,
freshness, conflicting results, waivers, and production feedback. Treat lead
time to validated customer value, change failure rate, and engineering
leverage as a coupled success system.

Chapter:

- [Quality and Evidence Architecture](./07-quality-engineering/01-quality-and-evidence-architecture.md)

## 8. Security and Governance

Study identity, authentication, authorization, policy, approvals, isolation,
data boundaries, auditability, budgets, risk, prompt injection, service
identity, and separation of duties.

## 9. Mission Control Case Studies

Use Mission Control to examine real architectural decisions, implementation
tradeoffs, failures, and lessons. Every case study cites the exact product
source and commit while preserving the distinction between product
documentation and personal learning.

## 10. Labs

Convert conceptual understanding into implementation fluency through code
tracing, browser operation, bounded changes, debugging, deliberate failure,
recovery, validation, and architecture teach-backs.

The first autonomy proof is `Governed Issue -> Validated Pull Request`. It ends
with human merge approval and does not require autonomous deployment.

Initial lab:

- [Governed Issue to Validated Pull Request](./10-labs/01-governed-issue-to-validated-pull-request.md)

## 11. Interview Mastery

Prepare for CTO, VP Engineering, Head of AI Engineering, Principal Engineer,
and AI startup leadership conversations. Include system-design interviews,
whiteboard exercises, executive explanations, technical deep dives, objections,
and evidence-backed stories.

## 12. Research Journal

Analyze papers, standards, industry systems, and emerging architectures from
OpenAI, Anthropic, Google, Microsoft, GitHub, academia, and other primary
sources. Notes belong here only when they improve AI Software Factory judgment.

Start with the [initial research canon](./12-research-journal/initial-canon.md).

## Governing standard

All full chapters follow the [chapter writing standard](./writing-standard.md).
The original planning and interview drafts remain in
[source material](../source-material/README.md).
