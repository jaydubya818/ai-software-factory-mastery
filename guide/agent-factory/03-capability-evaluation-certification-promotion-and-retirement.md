---
title: Capability Evaluation, Certification, Promotion, and Retirement
status: review-ready
audience: [architect, ai-engineer, platform, security, quality, product]
last_verified: 2026-08-30
lifecycle: [verify, learn]
risk: high
topics: [evaluation, certification, promotion, deprecation, revocation]
---

# Capability Evaluation, Certification, Promotion, and Retirement

## Quick Read

- **Purpose:** Define how a capability earns, retains, loses, and exits production eligibility.
- **Best for:** Quality, platform, AI, security, and governance leaders.
- **Prerequisites:** The first two Agent Factory chapters and [Evaluation Engineering](../06-ai-engineering/04-evaluation-engineering-trace-replay-and-run-comparison.md).
- **Reading time:** 13 minutes.
- **You will learn:** How certification differs from evaluation, how promotion stays risk-scoped, and how revocation propagates.
- **Keep three ideas:** certification is bounded evidence; promotion is a policy decision; and retirement is an engineered lifecycle.

## 1. The problem

A capability that passed once can degrade as repositories, models, dependencies, policies, and threats change. Teams often treat evaluation as a prelaunch event and retirement as deleting a file. That leaves stale agents discoverable, deprecated tools active through transitive dependencies, and operators unable to identify affected workflows after a vulnerability or quality regression.

## 2. Why the problem exists

Evaluation measures behavior under defined conditions. Certification converts evidence into eligibility for a bounded scope. Promotion changes which users or workflows may resolve the capability. These are different decisions, but lightweight systems compress them into one “enabled” flag.

Capabilities also have several clocks: source age, evaluation age, dependency age, policy age, threat intelligence, and observed production performance. Passing results do not remain fresh indefinitely.

## 3. Enduring Principle

### Use an explicit lifecycle

```text
draft -> candidate -> evaluated -> certified -> canary -> generally eligible
                                      |              |
                                      v              v
                                  restricted     deprecated
                                      |              |
                                      +------> quarantined -> revoked -> retired
```

Each transition identifies authority, scope, evidence, conditions, expiration, and rollback. Certification should name eligible task classes, risk levels, repositories or domains, environments, model and harness combinations, data classifications, and required human gates.

### Evaluate four dimensions

1. **Functional:** task success, correctness, structured outputs, recovery, determinism where required.
2. **Operational:** latency, cost, rate limits, cancellation, observability, failure containment, resource cleanup.
3. **Security and policy:** least privilege, prompt and tool abuse, data handling, provenance, dependency risk.
4. **Human factors:** understandable plans, useful progress, actionable escalation, review burden, accessibility.

Evaluation results attach to exact package and environment digests. Aggregate scores must not hide hard-gate failures.

### Promote progressively

Promotion expands eligibility through canary cohorts, observation windows, and explicit stop conditions. Compare against a frozen baseline using accepted outcomes, not only model-judge scores. A capability may be certified for read-only repository analysis and remain ineligible for code modification.

### Retire without erasing history

Deprecation warns and provides migration. Quarantine stops use while facts are investigated. Revocation blocks new resolution immediately and may cancel or isolate active work according to risk. Retirement removes discoverability after migration while preserving historical resolution and evidence.

## 4. Tradeoffs and alternatives

Frequent recertification improves freshness and consumes evaluation capacity. Use risk-based expiration and event-triggered reevaluation for dependency, model, permission, policy, or threat changes. Automatic demotion contains harm quickly; automatic promotion risks scaling a biased result. Keep promotion human-authorized for material scope increases.

## 5. Current Mission Control Implementation

The current material defines evaluations, canaries, policy gates, promotion and demotion concepts, model-route lifecycle, evidence, and Factory Versions. It does not yet demonstrate a uniform certification object or end-to-end revocation propagation for every capability type.

The guide therefore supports the decision model but cannot claim a complete capability certification service. Reviewers should expect implementation evidence for lifecycle APIs, evaluation lineage, active-use inventory, and revocation drills before treating the capability as operationally proven.

## 6. Future Vision

The registry should continuously calculate certification freshness and affected-use inventory. New vulnerabilities, policy changes, drift, or production incidents should create bounded reevaluation or quarantine events. Operators should preview the blast radius, approve migrations, and verify that no new Factory Version resolves a revoked artifact.

## 7. Versioned references

- [Evaluation Engineering, Trace Replay, and Run Comparison](../06-ai-engineering/04-evaluation-engineering-trace-replay-and-run-comparison.md)
- [Operational Autonomy and Trust Calibration](../02-first-principles/01-operational-autonomy-and-trust-calibration.md)
- [Software Supply Chain Security, Provenance, and Attestation](../08-security-and-governance/03-software-supply-chain-security-provenance-and-attestation.md)
- [NIST AI Risk Management Framework resources](https://airc.nist.gov/), accessed 2026-08-30

## 8. Notes and lessons learned

Certification is not a trophy attached to an agent. It is a temporary, scoped statement that a particular capability graph has sufficient evidence for particular use under particular controls.

## 9. Design review questions

1. Why should certification expire?
2. Which changes trigger immediate reevaluation?
3. How does quarantine differ from revocation?
4. What evidence justifies expanding a canary?
5. How should active Attempts respond to a critical revocation?

## 10. Whiteboard exercise

Create a lifecycle for a code-modification skill. Promote it from one repository to an organization-wide low-risk lane. Then introduce a tool vulnerability and a model regression. Show separate containment, impact analysis, migration, and restoration decisions.

## 11. Hands-on lab

Build a certification packet for one capability using a frozen package, evaluation dataset, security checks, operational tests, limitations, eligible scope, expiry, and rollback. Simulate a regression, issue a revocation, and prove new resolution fails. Retain the packet, decisions, audit trail, and migration plan.
