# AI Software Factory Mastery

## Engineering autonomous software delivery beyond the coding agent

> **Intent → Plan → Define Agent → Execute through Harness → Apply Skills → Evaluate → Improve → Deliver Software**

AI Software Factory Mastery is a technical curriculum, research lab, and
architecture reference for building **AI-native engineering systems that move
software development beyond copilots and one-off coding agents into governed
autonomous delivery**.

The AI Software Factory is not merely an AI coding assistant. It is the
platform and control system that makes agentic software engineering
repeatable, governed, measurable, and scalable across thousands of engineers.

The central question is not "how do I prompt a coding agent?" It is:

> How do we build an engineering system where humans define intent and risk while agents can plan, implement, validate, recover, and produce trustworthy evidence inside explicit authority boundaries?

## What this project explores

- AI Software Factory architecture and operating models
- an intent-first builders experience for developers, PMs, QA, designers, and other builders
- multi-agent orchestration and agent harness engineering
- WorkOrders, Tasks, Attempts, evidence, and delivery lineage
- deterministic controls around nondeterministic agents
- independent verification and evidence-driven acceptance
- durable execution, retries, leases, recovery, and idempotency
- isolated agent execution and sandbox patterns
- model, harness, tool, cost, and latency routing
- progressive autonomy and human approval boundaries
- observability, evaluations, security, and governance
- continuous learning without uncontrolled self-modification
- baseline-versus-candidate learning, governed promotion, and rollback
- engineering-leadership patterns for adopting autonomous delivery systems

## Start here

- Read the [platform blueprint and operating playbook](./guide/00-overview/03-platform-blueprint-and-operating-playbook.md) for the complete system map, capability model, incident framework, learning design, adoption model, and metrics.
- Use [Start Here](./guide/00-overview/README.md) for the recommended reading order.
- Use the [curriculum map](./guide/README.md) to navigate the detailed chapters and labs.

## Working definition

An **AI Software Factory** is a governed engineering operating model where humans define intent, constraints, priorities, and acceptable risk while autonomous agents perform bounded planning, implementation, validation, documentation, and recovery.

Humans retain accountability. Agents provide execution. Independent evidence determines whether work is ready to advance.

```text
Intent
  → Plan
  → Define Agent
  → Execute through Harness
  → Apply Skills
  → Evaluate
  → Improve
  → Deliver Software
```

## Platform commitments

1. **Builder intent becomes the interface.** Builders express outcomes,
   constraints, acceptance criteria, and risk without needing to understand the
   internal agent architecture.
2. **Models are interchangeable execution resources.** Routing considers task
   capability, quality, cost, latency, context, security, availability,
   historical performance, and fallback behavior.
3. **The harness creates production reliability.** It owns tools, state,
   permissions, recovery, stop conditions, sandboxing, observability, and
   budgets.
4. **Agents do not certify their own work.** Independent verification,
   deterministic checks, trajectory evaluation, baseline comparison, and human
   authority establish readiness.
5. **Learning is automated; promotion is governed.** Production evidence may
   propose improvements, but evaluation and approval determine what becomes the
   new default.

## Core thesis

The factory does not depend on making probabilistic models infallible. It depends on building a trustworthy operating system around fallible agents.

That means combining:

- **agents for reasoning and execution**
- **deterministic software for policy and control**
- **independent verification for trust**
- **durable state for recovery**
- **evidence for accountability**
- **humans for material judgment and risk acceptance**

The objective is not more agents. It is **higher-confidence autonomous software delivery**.

## Governing principles

1. Humans own intent, judgment, material risk, and irreversible decisions.
2. Agents operate only inside explicitly granted authority.
3. Validation must be independent from the execution that produced the change.
4. Evidence—not an agent saying "done"—determines readiness.
5. Simple deterministic work should remain deterministic.
6. Autonomy should increase only when measured outcomes justify it.
7. Failure must be detectable, bounded, recoverable, and attributable.
8. Model + harness + tools + workflow matter more than model selection alone.
9. Cost, quality, speed, and risk should be measured together.
10. Learning may be automated; promotion of new policy or authority remains governed.

## Curriculum

The repository develops eleven connected areas:

1. vision
2. first principles
3. operating model
4. domain model
5. runtime architecture
6. AI engineering
7. quality engineering
8. security and governance
9. Mission Control case studies
10. labs
11. research journal

See the [curriculum map](./guide/README.md) for the detailed scope.

## Mission Control as a living case study

[Mission Control](https://github.com/jaydubya818/MissionControl) is the primary living case study: a control plane for human-directed, agent-executed software development with governed WorkOrders, bounded execution, verification, evidence, recovery, and controlled publication.

The purpose here is not to duplicate Mission Control documentation. It is to extract the enduring engineering principles, tradeoffs, and patterns behind building trustworthy autonomous delivery systems.

## What mastery means

The goal is to be able to:

- explain AI Software Factories from first principles;
- whiteboard the complete operating model;
- distinguish enduring architecture from temporary tooling choices;
- design control, execution, validation, evidence, and governance layers;
- reason about agent autonomy, isolation, recovery, and failure modes;
- evaluate model/harness/tool combinations on quality, cost, and speed;
- build and debug the critical paths;
- lead organizational adoption without overstating capability or safety; and
- communicate the system clearly to engineers, executives, founders, and technical interview panels.

## Status

Active research and development. The repository contains the curriculum structure, research canon, Mission Control case-study framework, labs, and source material used to continuously deepen the engineering model.
