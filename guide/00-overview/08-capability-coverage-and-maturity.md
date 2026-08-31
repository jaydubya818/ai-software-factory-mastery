---
title: Capability Coverage and Maturity
status: canonical-navigation
audience: [all]
last_verified: 2026-08-30
lifecycle: [intent, plan, execute, verify, deliver, learn]
risk: variable
topics: [coverage, maturity, review-status]
---

# Capability Coverage and Maturity

This page prevents curriculum breadth, editorial maturity, and implementation
proof from being mistaken for one another. A subject may be well explained and
not implemented. A mechanism may exist in code and lack accepted operating
evidence. Review every claim along all three axes.

## Maturity vocabulary

| Status | Meaning |
|---|---|
| Missing | No accountable coverage exists yet. |
| Scoped | The responsibility and intended boundary are named, but the chapter is not drafted. |
| Draft for study | Useful working material that has not passed the editorial and technical review bar. |
| Review ready | Complete enough for external architecture, technical, editorial, and usability review. |
| Validated | Review feedback is resolved and the material has passed its defined checks or lab evidence. |
| Operationally proven | A current implementation has repeatable, versioned production or production-equivalent evidence. |

`Review ready` describes the document. It does not mean the implementation is
operationally proven. `Operationally proven` is scoped to an exact workflow,
repository class, risk level, environment, version, and observation window.

## Current coverage map

| Capability area | Curriculum status | Implementation evidence boundary |
|---|---|---|
| Factory definition and operating model | Draft and canonical coverage | Partial case-study evidence |
| Detailed architecture ownership and four synchronized views | Review ready | Architecture trace is documented; complete implementation conformance is unproven |
| Factory system inventory and governance decision rights | Review ready | Organization-wide inventory completeness and operating effectiveness are unproven |
| Authority, domain records, and orchestration | Draft for study | Several mechanisms traced; complete live path not proven |
| Orchestration component and runtime contracts | Review ready | Twelve component families are specified; full contract conformance is unproven |
| Agent architecture, tools, context, and memory | Review ready core chapter | Versioned case evidence with bounded gaps |
| Agent Factory and capability supply chain | Review ready architecture | Unified registry and lifecycle not proven |
| Tool, skill, and integration contracts | Review ready | Existing callable capabilities are not asserted to meet every contract field |
| Knowledge, retrieval, poisoning, and revocation | Review ready | Production registry, benchmark, deletion, and poisoning controls are unproven |
| Multi-agent topologies and autonomy selection | Review ready | Each workflow must still prove benefit and verifier independence |
| Repository onboarding and intelligence | Review ready architecture | End-to-end onboarding path not proven |
| Autonomous workflow portfolio | Review ready architecture | First bounded workflow only; wider catalog unproven |
| Testing, CI/CD, artifacts, and delivery | Review ready architecture plus earlier drafts | Complete production path not proven |
| Platform, scheduling, cost, and resilience | Review ready architecture plus runtime drafts | Fleet-scale scheduling and disaster recovery unproven |
| Enterprise operations, control tower, drift, and incident response | Review ready | SLOs, detection quality, response time, and failover are unproven |
| Agentic security, identity, privacy, and compliance | Review ready additions plus earlier drafts | Full adversarial and compliance evidence unproven |
| Governance controls and emergency authority | Review ready | Control operating effectiveness and emergency timing are unproven |
| Evaluation science and controlled learning | Review ready additions plus earlier drafts | Production optimization lifecycle unproven |
| Hands-on mastery | Thirteen executable specifications available | Accepted runs remain limited; the original golden path is blocked |

## Evidence required to advance a chapter

A full technical chapter is not validated until it has:

1. stable definitions and responsibility boundaries;
2. an architecture, state model, or implementation contract;
3. failure modes, threats, tradeoffs, and recovery;
4. measures, evidence, and explicit nonclaims;
5. primary references and versioned implementation sources where applicable;
6. an executable or clearly labeled design exercise;
7. technical and editorial review; and
8. resolved feedback recorded in the changelog.

## Evidence required to advance a capability

Operational proof requires an exact version, qualified environment, identity,
policy, representative workload, independent evidence, failure and recovery
exercise, observation window, and accountable acceptance. A screenshot, demo,
merged change, or passing agent report is insufficient on its own.

## How to use this map

Use the [public Coverage view](https://ai-software-factory-mastery.vercel.app/coverage)
to filter the curriculum by section,
persona, lifecycle phase, maturity, and risk. Use the
[Reviewer Guide](09-reviewer-guide.md) when providing feedback and the
[Changelog](10-changelog.md) to see which claims moved.
