---
title: Start Here
status: draft-for-study
audience:
  - all
last_verified: 2026-08-07
---

# Start Here

This section is the shortest path into AI Software Factory mastery. Read it
before the detailed chapters. It establishes the system model, the vocabulary,
and the boundary between enduring principles and Mission Control's current
implementation.

## The idea in one paragraph

An AI Software Factory is a governed engineering operating model. Humans define
intent, constraints, priorities, and acceptable risk. Agents plan and execute
bounded work. Independent validators produce evidence. Policy controls what may
happen next. Humans retain accountability for material decisions. The factory
exists to shorten the path from business intent to validated customer value
without trading away quality, security, or control.

Mission Control is a concrete attempt to implement this operating model. It is
not the definition of the model. The enduring principles should survive a
complete rewrite. React, Convex, Hono, particular executors, and current schemas
are implementation choices that can change.

## The governing flow

```mermaid
flowchart LR
    Intent["Human intent and constraints"] --> Mission["Governed Mission"]
    Mission --> Plan["Versioned Plan"]
    Plan --> Approval["Human approval"]
    Approval --> WorkOrder["Authorized WorkOrder"]
    WorkOrder --> Execution["Tasks and immutable Attempts"]
    Execution --> Validation["Independent validation"]
    Validation --> Evidence["Criterion-linked Evidence"]
    Evidence --> PR["Review-ready pull request"]
    PR --> Decision["Human merge decision"]
    Decision --> Delivery["Governed delivery and outcome validation"]
```

The records are deliberately separate. Completing a Task does not accept its
WorkOrder. Completing a WorkOrder does not accept its Mission. Passing tests
does not authorize a merge or deployment. Each boundary represents a different
claim and therefore requires different evidence and authority.

## Five ideas to retain

### Trust the system, not the model

Models are probabilistic and will fail. Reliable autonomy comes from the
surrounding system: bounded authority, isolation, policy, independent
validation, immutable history, evidence, recovery, and human accountability.

### Intent matters more than activity

Agent sessions, prompts, tokens, and generated code are implementation detail.
The primary object is the governed outcome the organization wants to achieve.

### Evidence matters more than confidence

An agent's statement that work is complete is not proof. Acceptance depends on
fresh, attributable evidence tied to predefined criteria and the exact artifact
being reviewed.

### Quality enables autonomy

Autonomy should increase only when the factory repeatedly demonstrates that it
can operate within policy and produce independently validated outcomes. It must
decrease when evidence shows a loss of trust.

### Humans own risk

Agents may recommend, implement, validate, and explain. Humans remain
accountable for business intent, material exceptions, risk acceptance,
promotion of authority, merge, and consequential production decisions.

## Recommended reading order

For a first pass of roughly one hour:

1. Read [AI Software Factory and Mission Control](./01-ai-software-factory-and-mission-control.md).
2. Read the [Canonical Glossary](./02-canonical-glossary.md).
3. Read [What Is an AI Software Factory?](../01-vision/01-what-is-an-ai-software-factory.md).
4. Read [Operational Autonomy and Trust Calibration](../02-first-principles/01-operational-autonomy-and-trust-calibration.md).
5. Read [The Human-Agent Operating Model](../03-operating-model/01-human-agent-operating-model.md).
6. Read [The Authoritative Delivery Hierarchy](../04-domain-model/01-authoritative-delivery-hierarchy.md).
7. Read [Control Plane and Execution Plane](../05-runtime-architecture/01-control-plane-and-execution-plane.md).
8. Read [Quality and Evidence Architecture](../07-quality-engineering/01-quality-and-evidence-architecture.md).
9. Review the [Governed Issue to Validated Pull Request lab](../10-labs/01-governed-issue-to-validated-pull-request.md).

On the second pass, explain the complete flow without notes. Give a 30-second
version for a CEO, a two-minute version for a CTO, and a ten-minute architecture
version for a senior engineer. Any boundary that cannot be explained clearly is
the next study target.

## Evidence boundary

This guide uses three labels deliberately:

- **Enduring Principle** describes doctrine that should survive technology
  changes.
- **Current Mission Control Implementation** describes behavior supported by a
  cited commit, source path, test, or observed browser journey.
- **Future Vision** describes desired behavior that has not met the current
  evidence bar.

The distinction prevents a compelling product vision from being mistaken for
working software.
