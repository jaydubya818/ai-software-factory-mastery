---
title: Autonomous Engineering Workflow Catalog
status: review-ready
audience: [executive, architect, product, senior-engineer, platform, ai-engineer]
last_verified: 2026-08-30
lifecycle: [intent, plan, execute, verify, deliver, learn]
risk: variable
topics: [workflow-catalog, autonomous-backlog, work-selection, risk]
---

# Autonomous Engineering Workflow Catalog

## Quick Read

- **Purpose:** Turn “use agents for engineering” into a portfolio of explicit, governable workflow products.
- **Best for:** Leaders choosing an adoption sequence and builders defining workflow contracts.
- **Prerequisites:** [Human-Agent Operating Model](../03-operating-model/01-human-agent-operating-model.md) and [Repository Onboarding](01-repository-onboarding-and-codebase-intelligence.md).
- **Reading time:** 14 minutes.
- **You will learn:** How workflow classes differ in triggers, evidence, risk, human authority, and production feedback.
- **Keep three ideas:** autonomy is earned per workflow; work selection is an authority decision; and each workflow needs its own proof.

## 1. The problem

“Autonomous software engineering” is too broad to operate. A dependency upgrade, production incident, feature, test repair, and documentation change have different inputs, failure costs, evidence, urgency, and rollback. Treating them as one generic issue-to-code loop produces vague metrics and unsafe authority.

## 2. Why the problem exists

Coding agents make implementation steps look similar: inspect files, edit, test, and report. The business workflows around those steps are not similar. They begin from different signals and end with different accepted outcomes. Teams often automate the visible coding portion before defining who may select work or what customer value the workflow must prove.

## 3. Enduring Principle

### Manage a catalog of workflow products

Each catalog entry declares:

- trigger and authoritative intake source;
- problem owner and intended outcome;
- supported repository and risk classes;
- planning, execution, and verification recipe;
- agents, skills, tools, environment, and budgets;
- human decisions and escalation;
- evidence, release, observation, and rollback requirements;
- success, failure, cost, attention, and trust measures; and
- current maturity and eligible autonomy.

The minimum useful portfolio is:

| Workflow | Trigger | Accepted outcome |
|---|---|---|
| Feature delivery | Approved product intent | Customer behavior delivered and verified |
| Defect remediation | Reproduced defect | Root cause corrected with regression proof |
| Test generation and maintenance | Coverage or change signal | Useful, stable tests protecting specified behavior |
| Dependency and security remediation | Vulnerability or lifecycle signal | Risk reduced without compatibility regression |
| Incident triage and root-cause analysis | Operational alert | Containment, evidence-backed cause, and corrective plan |
| Production validation | Deployment event | Technical and intended outcomes confirmed or rolled back |
| Technical-debt reduction | Maintainability signal | Measurable risk or cost reduced without behavior loss |
| Documentation and knowledge maintenance | System or policy change | Correct, discoverable, verified guidance published |

### Govern work selection

An autonomous backlog selector may rank eligible work using value, urgency, risk, dependencies, readiness, capacity, and confidence. It may not invent product priority, widen scope, or consume unowned work. Work-in-progress limits and small batches reduce recovery cost and make outcomes attributable.

### Earn autonomy independently

A repository may qualify Level 3 autonomy for test maintenance while production migrations remain Level 1. Metrics and incidents apply to the exact workflow, risk class, environment, and capability graph.

## 4. Tradeoffs and alternatives

A broad generic workflow reduces configuration and hides important differences. Many narrow workflows improve control and create maintenance overhead. Start with a small catalog whose entries share common runtime contracts but retain distinct acceptance and risk policy.

Automated intake increases responsiveness and can flood the system with low-value work. Require admission, deduplication, ownership, priority policy, and capacity budgets before automatic selection.

## 5. Current Mission Control Implementation

The current curriculum deeply specifies the governed issue-to-pull-request path and provides domain, orchestration, evidence, release, feedback, and learning primitives that other workflows can reuse.

It does not yet publish full contracts, labs, maturity evidence, and operating metrics for the eight workflow classes above. The current golden path should therefore be described as the first workflow product, not proof of the entire portfolio.

## 6. Future Vision

Operators should see a workflow catalog with owner, eligible scope, volume, service level, cost, attention demand, acceptance rate, change failure, maturity, and recent trust events. New workflow versions should be canaried and reversible like any other production change.

## 7. Versioned references

- [Intent-to-Delivery Lifecycle](../00-overview/04-intent-to-delivery-lifecycle.md)
- [Factory Economics and Operating Metrics](../03-operating-model/02-factory-economics-and-operating-metrics.md)
- [DORA capability catalog](https://dora.dev/capabilities/), accessed 2026-08-30
- [DORA user-centric focus](https://dora.dev/capabilities/user-centric-focus/), accessed 2026-08-30

## 8. Notes and lessons learned

The unit of autonomy is not “the agent” or even “the repository.” It is a defined workflow operating on a bounded scope under measurable conditions.

## 9. Interview and discussion questions

1. Which workflow should an organization automate first, and why?
2. Who owns autonomous backlog selection?
3. Why can test maintenance and production migration have different autonomy?
4. Which metrics must be workflow-specific?
5. What is the accepted outcome of incident triage?

## 10. Whiteboard exercise

Choose three workflows and map trigger, intent owner, plan, authority, evidence, production observation, rollback, metrics, and promotion criteria. Show which platform components are shared and which policies remain workflow-specific.

## 11. Hands-on lab

Write catalog manifests for feature delivery, dependency remediation, and incident triage. Feed each the same repository and risk classification. Demonstrate that the resolver selects different plans, evidence, human gates, and terminal outcomes. Retain manifests, decisions, and a comparison table.
