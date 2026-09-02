---
title: Change Workflows — Features, Defects, Tests, and Modernization
status: review-ready
audience: [architect, senior-engineer, product, quality, ai-engineer]
last_verified: 2026-08-30
lifecycle: [intent, plan, execute, verify, deliver]
risk: variable
topics: [feature-delivery, defect-remediation, testing, technical-debt, modernization]
---

# Change Workflows — Features, Defects, Tests, and Modernization

## Quick Read

- **Purpose:** Define distinct operating patterns for the most common code-changing workflows.
- **Best for:** Engineers and leaders turning a workflow catalog into executable contracts.
- **Prerequisites:** [Autonomous Engineering Workflow Catalog](02-autonomous-engineering-workflow-catalog.md).
- **Reading time:** 15 minutes.
- **You will learn:** The different evidence and stop conditions for features, defects, tests, refactors, dependencies, and migrations.
- **Keep three ideas:** reproduction precedes repair; tests require fault sensitivity, not line count; and modernization must preserve explicit invariants.

## 1. The problem

Code changes may look alike in a pull request while supporting different claims. A feature must satisfy new intent. A defect fix must reproduce and eliminate a known failure. A test change must prove it detects meaningful faults. A refactor must preserve behavior while improving a named quality. A migration must preserve compatibility and data.

Using one generic acceptance template lets activity substitute for proof.

## 2. Why the problem exists

Repository tooling centers on diffs and checks, not causal claims. Agents can quickly produce plausible edits and tests that agree with their own implementation. Existing suites may be flaky, incomplete, or insensitive to the intended behavior. Modernization often expands across boundaries faster than evidence can follow.

## 3. Enduring Principle

### Give each workflow a proof shape

**Feature delivery** begins from an approved outcome, explicit non-goals, behavioral assertions, rollout, and customer measure. Verification includes requirements coverage, regression, security, operability, and production outcome.

**Defect remediation** begins with a reproducible failure or an explicit statement that reproduction is unavailable. Preserve the failing fixture, identify root cause, introduce a regression test that fails before the fix, implement the smallest sufficient change, and verify adjacent behavior. A disappearing symptom without causal evidence is not a root-cause fix.

**Test generation and maintenance** begins from risk, change impact, missing behavior coverage, or a broken test. Evaluate assertion quality, fault sensitivity, determinism, isolation, duration, and maintenance cost. Mutation or deliberate fault injection can show whether the test detects the failure it claims to guard.

**Technical-debt reduction** begins with a measured constraint: change amplification, defect concentration, dependency risk, build duration, cognitive load, or unsupported technology. Preserve behavioral invariants and compare the named measure before and after. “Cleaner code” alone is not an accepted outcome.

**Dependency remediation** binds vulnerability, lifecycle, or compatibility evidence to the exact dependency graph. Verify transitive changes, licenses, build artifacts, runtime behavior, rollback, and known breaking changes.

**Modernization and migration** inventory consumers, schemas, data, compatibility windows, dual-read or dual-write behavior, backfill, verification, cutover, and rollback. Irreversible steps require human risk acceptance and restore evidence.

### Keep implementation and verification independent

For material changes, validators should use requirements, fault models, static analysis, integration environments, or tests not authored solely by the implementer. The objective is to reduce correlated error, not to require a different model for every check.

## 4. Tradeoffs and alternatives

Requiring reproduction can delay urgent containment. Separate containment from permanent repair and preserve the unresolved cause. Mutation testing is powerful and expensive; target critical logic. Full dual-running improves migration confidence and increases operational complexity.

## 5. Current Mission Control Implementation

The existing golden path supports a bounded feature, independent validation, evidence mapping, failure correction, and human merge. Quality contracts, feedback reproduction, multi-repository coordination, and release records supply reusable foundations.

The curriculum does not yet demonstrate accepted runs for the other change workflows or complete deployment and outcome closure for the feature path. This chapter provides the contracts that future labs and implementations must prove.

## 6. Future Vision

Workflow templates should generate task-specific plans, validators, risk gates, and review surfaces. Operators should compare workflow versions using accepted outcomes, change failure, review effort, lead time, and cost. Repeated defect classes should create evaluated deterministic controls or reusable skills.

## 7. Versioned references

- [Specification Engineering and Plan Assurance](../04-domain-model/03-specification-engineering-executable-requirements-and-plan-assurance.md)
- [Quality Contract Technical Specification](../07-quality-engineering/04-quality-contract-and-certificate-technical-specification.md)
- [Production Feedback, Reproduction, Review, and Merge](../07-quality-engineering/05-production-feedback-reproduction-review-and-merge.md)

## 8. Notes and lessons learned

Workflow specialization should live in explicit contracts and verification, not in opaque agent personalities. That makes the same runtime useful without pretending every engineering claim is identical.

## 9. Design review questions

1. What evidence distinguishes a defect fix from symptom suppression?
2. How do you prove an agent-generated test is useful?
3. Which measure can justify technical-debt work?
4. When is a migration too irreversible for autonomous execution?
5. What validator independence is appropriate for a low-risk refactor?

## 10. Whiteboard exercise

Draw separate state and evidence paths for a feature, a defect, and a schema migration. Use the same runtime but different intake, criteria, gates, rollback, and production observation.

## 11. Hands-on lab

Take one small defect in a disposable repository. Capture a failing test, produce a root-cause hypothesis, implement a correction, run independent regression checks, and package the evidence. Then express the same diff as a generic feature workflow and identify which causal evidence disappears.
