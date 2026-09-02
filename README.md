# AI Software Factory Mastery

## Build the system around the agent

AI Software Factory Mastery is a complete technical field guide and architecture
reference for turning human intent into validated software through bounded
agents, durable execution, independent evidence, and explicit authority.

It is designed for leaders and builders who need to move beyond isolated AI
coding tools into a software-delivery system they can explain, operate, and
trust.

> **Intent → Plan → Define Agent → Execute through Harness → Apply Skills →
> Evaluate → Improve → Deliver Software**

## How the guide is organized

| Part | What it helps you do |
| --- | --- |
| Understand | See the factory as a complete system with a lifecycle, vocabulary, trust model, and explicit boundaries. |
| Design | Define authoritative records, operating decisions, risk, policy, specifications, and human authority. |
| Build | Assemble reusable capabilities, runtimes, AI engineering layers, environments, compute, and workflows. |
| Prove | Independently verify exact outcomes, govern risk, preserve evidence, and deliver safely. |
| Operate | Run the factory as a production platform with SLOs, capacity, cost, observability, incidents, and recovery. |
| Improve | Convert production feedback into evaluated, approved, reversible changes. |

Start with [AI Software Factory and Mission Control](./guide/00-overview/01-ai-software-factory-and-mission-control.md),
use the [complete guide map](./guide/README.md) for the full sequence, or use the
[topic index](./guide/00-overview/07-topic-index.md) when you already know the
problem you need to solve.
Use the [Detailed Architecture Coverage Matrix](./guide/00-overview/11-detailed-architecture-coverage-matrix.md)
to find the canonical owner, contract, risk, evidence boundary, and validation
path for every material factory capability.
Use [Capability Coverage and Maturity](./guide/00-overview/08-capability-coverage-and-maturity.md)
before interpreting guide breadth as implementation proof.

## The system in one view

```mermaid
flowchart TB
    Human["Human intent, policy, and decisions"] --> Control["Control plane and orchestration"]
    Factory["Agent Factory: agents, skills, tools, profiles, and evals"] --> Control
    Control --> Contract["Frozen execution contract"]
    Contract --> Outer["Outer harness"]
    Outer --> Inner["Inner coding harness"]
    Inner --> Environment["Development environment"]
    Environment --> Compute["Compute infrastructure"]
    Inner --> Candidate["Candidate and run record"]
    Candidate --> Verify["Independent verification and evidence"]
    Verify --> Decision["Human or policy decision"]
    Decision --> Delivery["Delivery and production outcome"]
    Delivery --> Learn["Governed feedback and improvement"]
    Learn --> Factory
```

The downward path delegates bounded capability. The upward path reports
observations, evidence, and outcomes. An executor cannot grant itself authority
or certify its own material work.

## Three definitions to retain

**Agent Factory** creates, versions, evaluates, publishes, and governs reusable
capabilities such as agents, skills, tools, model profiles, and configurations.

**AI Software Factory** composes people, policy, capabilities, execution,
verification, delivery, and feedback from intent through validated production
value.

**Mission Control** is the living implementation and case study for the
control-plane responsibilities required to govern execution, evidence, and
human authority. It is not the definition of the complete factory.

Read [Software Factory Stack Boundaries](./guide/00-overview/05-software-factory-stack-boundaries.md)
for the complete separation among the control plane, orchestrator, inner and
outer harnesses, development environment, compute, Agent Factory, and software
factory.

## What the guide covers

- factory architecture, operating models, economics, and adoption;
- synchronized lifecycle, logical-component, trust-boundary, authority, and
  evidence architecture views;
- governed system inventory, classification, organizational decision rights,
  emergency control, and periodic recertification;
- Agent Factory registries, capability packaging, dependency resolution,
  certification, promotion, deprecation, and revocation;
- business intent, executable specifications, and delivery records;
- repository onboarding, readiness, codebase intelligence, and autonomous
  workflow portfolios;
- AI coding agents, agent orchestration, workflows, and loop engineering;
- minimum-sufficient autonomy selection and multi-agent collaboration
  contracts;
- coding harnesses, adapters, lifecycle hooks, MCP, ACP, AG-UI, and A2A;
- data, knowledge, semantic, context, and model engineering;
- connector, ingestion, permission-aware retrieval, poisoning containment,
  deletion, and revocation contracts;
- development environments, compute fleets, sandboxes, and composable
  infrastructure;
- evaluation datasets, trials, graders, trace replay, and run comparison;
- evaluation science, calibration, uncertainty, controlled experimentation,
  optimization, and regression control;
- independent verification, proof packages, provenance, and quality gates;
- unit, integration, contract, property, mutation, fuzz, performance,
  accessibility, and visual testing;
- CI/CD, artifacts, schema and API compatibility, progressive delivery,
  rollback, and production verification;
- developer portals, service catalogs, golden paths, scheduling, capacity,
  cost, fairness, observability semantics, and disaster recovery;
- control-tower monitoring, behavior and policy drift, triage, containment,
  verified recovery, and controlled improvement;
- production feedback, reproduction, automated review, and merge maintenance;
- multi-repository delivery, dependency coordination, submodules, and subtrees;
- agentic threats, workload identity, secrets, privacy, licensing, compliance,
  policy, progressive autonomy, and human decision rights;
- compounding engineering, controlled improvement, and human-attention
  economics; and
- versioned case studies, executable labs, architecture communication, and
  research notes.

## How to use the repository

1. Start with the [high-level guide](./guide/00-overview/README.md).
2. Follow the six-part sequence or enter at the problem you need to solve.
3. Use each chapter's **At a glance** section to orient yourself, then read the
   complete treatment for design, failure, evidence, and operating detail.
4. Use the [canonical glossary](./guide/00-overview/02-canonical-glossary.md)
   for precise terminology.
5. Use the [guide map](./guide/README.md) for the complete sequence.
6. Check the [coverage and maturity map](./guide/00-overview/08-capability-coverage-and-maturity.md)
   and use the [external reviewer guide](./guide/00-overview/09-reviewer-guide.md)
   when sharing the guide.
7. Use the [detailed architecture matrix](./guide/00-overview/11-detailed-architecture-coverage-matrix.md)
   and the public Architecture hub to trace lifecycle, components, governance,
   inventory, failures, evidence, and maturity.
8. Use the [Mission Control capability and admission map](./guide/09-mission-control-case-studies/03-capability-workflow-and-admission-map.md)
   for current, versioned implementation claims.
9. Complete the relevant [executable labs](./guide/README.md#supplemental-labs)
   before making implementation or recovery claims.

## Governing principles

1. Humans own intent, judgment, material risk, and irreversible decisions.
2. Agents operate only inside explicitly granted authority.
3. Independent evidence—not an agent saying “done”—determines readiness.
4. Simple deterministic work should remain deterministic.
5. Failure must be detectable, bounded, recoverable, and attributable.
6. Autonomy increases only when measured outcomes justify it.
7. Learning may be automated; promotion remains governed.

## What mastery looks like

You can explain the system at executive and engineering depth, redraw its
authority boundaries, identify its authoritative records, design failure and
recovery paths, evaluate complete agent configurations, distinguish current
evidence from future vision, and implement a governed path from repository
onboarding and capability resolution through delivery, production verification,
recovery, and controlled learning.

The repository remains active research and development. Every document carries
an explicit maturity status. `Review ready` means ready for external scrutiny;
it does not mean the described implementation is operationally proven.
