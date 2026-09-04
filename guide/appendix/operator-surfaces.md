---
title: Mission Control operator surfaces
status: canonical-reference
audience: [executive, architect, operator, product, all]
last_verified: 2026-09-03
lifecycle: [operate, verify, learn]
risk: variable
topics: [mission-control, operator-experience, authority, evidence]
infographics: [operator-surfaces]
---

# Mission Control operator surfaces

Mission Control presents one governed lifecycle through eleven job-specific surfaces. Each surface makes a particular decision or record easier to inspect, but presentation never creates authority: the underlying policy, evidence, and lifecycle records remain canonical.

<!-- infographic: operator-surfaces -->
> **Infographic — The surfaces and what each one refuses to do.**

## Command Center

**Job.** Exception-first triage of decisions, blockers, failed or stale evidence, and aging work

**Boundary.** Must not show routine activity as news.

## Factory Board

**Job.** Guided entry: recipe recommendation, Mission draft with a stop condition, Plan compile

**Boundary.** Must not dispatch or accept work.

## Work Orders queue

**Job.** Govern, dispatch, verify, and accept WorkOrders, showing Tasks Done and blocking criteria verified as two counts

**Boundary.** Must not enable acceptance before independent verification and a human decision.

## Tasks board

**Job.** Inbox, Ready, In Progress, Review, Needs Approval, Blocked, Done

**Boundary.** Must not let a Task's Done state accept its WorkOrder.

## Execution Run Inspector

**Job.** The frozen executor snapshot, the engine phase, the required action, the frozen Factory context, and the exact receipts for one Attempt

**Boundary.** Must not label engine completion as acceptance.

## Factory Overview

**Job.** KPI strip, dispatch gate state, and the architecture diagram

**Boundary.** Must not hide a failed readiness check.

## Factory Health

**Job.** Human touches per agent task, shared component contributions, workflow versus interactive token spend

**Boundary.** Must not report a metric as evidence.

## Knowledge → Memory

**Job.** Overview, Memory, Graph, and Context views over Factory Memory and Context Packages

**Boundary.** Must not let retrieved text approve, invoke, or satisfy anything.

## Registry

**Job.** Discover, Skill Inventory, Installations, CDL, Evaluate Skill, Eval Runs

**Boundary.** Must not treat publication as permission to run.

## Harness engineering

**Job.** Change review, merge gates, mutation testing, the seven-step code-review wizard, the Agent Fleet view

**Boundary.** Must not let a gate merge or a fleet view grant authority.

## Labs

**Job.** Experimental surfaces in preview until they meet the golden-path bar

**Boundary.** Must not present a preview as a production feature.

## How the surfaces fit together

The Engineering OS groups these surfaces under Strategy, Delivery, Operations, Intelligence, Knowledge, and Governance. They call the same authorized functions and read the same records as the CLI. A surface may propose, inspect, or request a decision; it may not silently dispatch, verify, accept, merge, or promote work.

## Go deeper

- [42. Mission Control as a living case study](../06-improve/42-mission-control-as-a-living-case-study.md) for the complete architecture and evidence boundary.
- [34. The factory as a platform](../05-operate/34-the-factory-as-a-platform.md) for the Engineering OS shell.
- [Canonical glossary](./glossary.md) for the records and authority terms used here.
