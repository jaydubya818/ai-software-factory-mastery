---
title: Reading Paths
status: canonical-navigation
audience: [all]
last_verified: 2026-08-30
---

# Reading Paths

The curriculum is a reference system, not a book everyone must read in the
same order. Choose the path that matches the decision you need to make. Every
path uses the same canonical architecture and vocabulary.

## The system you are learning

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

The control path delegates bounded capability downward. Evidence and outcomes
flow upward. No lower layer can grant itself new authority or certify its own
material result.

## Executive path — 20 minutes

**Outcome:** Explain the business value, risk model, human accountability, and
adoption sequence without needing implementation detail.

Read only the **Quick Read** section in this order:

1. [AI Software Factory and Mission Control](./01-ai-software-factory-and-mission-control.md)
2. [What Is an AI Software Factory?](../01-vision/01-what-is-an-ai-software-factory.md)
3. [The Human-Agent Operating Model](../03-operating-model/01-human-agent-operating-model.md)
4. [Operational Autonomy and Trust Calibration](../02-first-principles/01-operational-autonomy-and-trust-calibration.md)
5. [Quality and Evidence Architecture](../07-quality-engineering/01-quality-and-evidence-architecture.md)
6. [Enterprise Governance Operating Model and Decision Rights](../03-operating-model/06-enterprise-governance-operating-model-and-decision-rights.md)

You should be able to answer: Why is this larger than a coding agent? What
remains a human responsibility? What evidence justifies more autonomy? Which
outcome should the organization measure?

## Architect path — 3 hours

**Outcome:** Whiteboard the complete system, name each authority boundary, and
identify the failure owner for execution, evidence, environment, and delivery.

1. [Detailed Architecture Coverage Matrix](./11-detailed-architecture-coverage-matrix.md)
2. [Software Factory Stack Boundaries](./05-software-factory-stack-boundaries.md)
3. [Intent-to-Delivery Lifecycle](./04-intent-to-delivery-lifecycle.md)
4. [Factory System Inventory, Classification, and Lifecycle](../04-domain-model/05-factory-system-inventory-classification-and-lifecycle.md)
5. [AI Software Factory Reference Architecture](../05-runtime-architecture/06-ai-software-factory-reference-architecture.md)
6. [Orchestration Component Model and Runtime Contracts](../05-runtime-architecture/09-orchestration-component-model-and-runtime-contracts.md)
7. [Development Environments, Compute, and Composable Infrastructure](../05-runtime-architecture/07-development-environments-compute-and-composable-infrastructure.md)
8. [Coding Harnesses, Adapters, and Agent Protocols](../05-runtime-architecture/08-coding-harnesses-adapters-and-agent-protocols.md)
9. [Tool, Skill, and Integration Contract Reference](../agent-factory/04-tool-skill-and-integration-contract-reference.md)
10. [Knowledge, Context, and Retrieval Pipeline Specification](../06-ai-engineering/08-knowledge-context-and-retrieval-pipeline-specification.md)
11. [Agentic Architecture Patterns and Autonomy Selection](../06-ai-engineering/10-agentic-architecture-patterns-and-autonomy-selection.md)
12. [Quality and Evidence Architecture](../07-quality-engineering/01-quality-and-evidence-architecture.md)
13. [Agentic Governance Control Framework](../08-security-and-governance/06-agentic-governance-control-framework.md)
14. [Enterprise Operations, Reliability, and FinOps Reference](../factory-platform-engineering/07-enterprise-operations-reliability-and-finops-reference.md)

Finish by redrawing the canonical map from memory. For every arrow, state the
contract, identity, failure behavior, telemetry, and authority that crosses it.

## Builder path — hands-on

**Outcome:** Implement and debug one governed path from repository onboarding
and capability resolution through verified delivery, recovery, and learning.

1. [Repository Onboarding and Codebase Intelligence](../autonomous-workflows/01-repository-onboarding-and-codebase-intelligence.md)
2. [Capability Supply Chain and Registries](../agent-factory/01-capability-supply-chain-and-registries.md)
3. [Agent Architecture, MCP, Tools, Context, and Memory](../06-ai-engineering/01-agent-architecture-mcp-tools-context-and-memory.md)
4. [Agent and Loop Engineering Patterns](../06-ai-engineering/05-agent-and-loop-engineering-patterns.md)
5. [Tasks, Attempts, Leases, Idempotency, and Recovery](../05-runtime-architecture/03-tasks-attempts-leases-idempotency-and-recovery.md)
6. [Software Testing Strategy for Agentic Change](../verification-delivery-engineering/01-software-testing-strategy-for-agentic-change.md)
7. [Evaluation Engineering, Trace Replay, and Run Comparison](../06-ai-engineering/04-evaluation-engineering-trace-replay-and-run-comparison.md)
8. [CI/CD, Artifacts, Migrations, and API Compatibility](../verification-delivery-engineering/02-cicd-artifacts-migrations-and-api-compatibility.md)
9. [Progressive Delivery, Production Verification, and Rollback](../verification-delivery-engineering/03-progressive-delivery-production-verification-and-rollback.md)
10. [Capability Learning, Optimization, and Regression Control](../06-ai-engineering/07-capability-learning-optimization-and-regression-control.md)
11. [Capability Certification and Revocation Lab](../10-labs/03-capability-certification-and-revocation-lab.md)
12. [Repository Onboarding and Readiness Lab](../10-labs/04-repository-onboarding-and-readiness-lab.md)
13. [Progressive Delivery and Rollback Lab](../10-labs/06-progressive-delivery-and-rollback-lab.md)
14. [Continual Improvement Promotion Lab](../10-labs/08-continual-improvement-promotion-lab.md)
15. [Authority, Containment, and Decision Replay Lab](../10-labs/10-authority-containment-and-decision-replay-lab.md)
16. [Orchestration Failure, Recovery, and Cost Lab](../10-labs/11-orchestration-failure-recovery-and-cost-lab.md)
17. [Knowledge Poisoning, Revocation, and Retrieval Lab](../10-labs/12-knowledge-poisoning-revocation-and-retrieval-lab.md)
18. [External Capability Intake and Recertification Lab](../10-labs/13-external-capability-intake-and-recertification-lab.md)

Do not stop at a successful agent run or pull request. Complete capability
resolution, evidence, failure, cancellation, delivery, rollback, production
verification, learning, cleanup, and human-decision paths required by the labs.

## Deep Study path — complete curriculum

**Outcome:** Design, build, operate, evaluate, and defend an AI Software Factory
from first principles.

Follow the numbered sequence in the [curriculum map](../README.md): Vision,
First Principles, Operating Model, Domain Model, Agent Factory, Runtime
Architecture, AI Engineering, Autonomous Engineering Workflows, Verification
and Delivery Engineering, Factory Platform Engineering, Quality Engineering,
and Security and Governance. Then complete the case studies, labs, interview
practice, and research journal.

After each area:

1. explain it without notes;
2. redraw its core system or state transition;
3. complete the chapter's interview questions and whiteboard exercise;
4. perform the lab or evidence exercise; and
5. record which current claims are implemented, proposed, or still unproven.

Use the [Topic Index](./07-topic-index.md) when a question cuts across the
curriculum rather than following its chapter order.
Check [Capability Coverage and Maturity](./08-capability-coverage-and-maturity.md)
before interpreting a documented architecture as operational proof.

## How to know you are ready to advance

Reading is not mastery. Advance when you can explain the boundary, predict its
failure modes, identify the authoritative record, name the required evidence,
and recover from one deliberately introduced failure.
