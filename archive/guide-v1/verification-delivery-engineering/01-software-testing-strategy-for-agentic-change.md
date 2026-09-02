---
title: Software Testing Strategy for Agentic Change
status: review-ready
audience: [architect, senior-engineer, quality, ai-engineer, platform]
last_verified: 2026-08-30
lifecycle: [plan, execute, verify]
risk: high
topics: [unit-testing, integration-testing, property-testing, mutation-testing, test-impact]
---

# Software Testing Strategy for Agentic Change

## Quick Read

- **Purpose:** Define a complete testing system for changes produced or maintained by agents.
- **Best for:** Quality engineers, senior developers, architects, and agent engineers.
- **Prerequisites:** [Quality and Evidence Architecture](../07-quality-engineering/01-quality-and-evidence-architecture.md).
- **Reading time:** 16 minutes.
- **You will learn:** How to select complementary test methods, control flaky tests and test data, measure fault sensitivity, and preserve independent evidence.
- **Keep three ideas:** passing existing tests is weak evidence; test selection follows risk and change impact; and agent-authored tests must be challenged independently.

## 1. The problem

Agents can generate many tests quickly, including tests that merely confirm their own implementation. Existing suites may miss the changed behavior, rely on stale snapshots, pass nondeterministically, or take too long to run for every Attempt. A green check can therefore express low coverage, correlated error, or environmental luck.

## 2. Why the problem exists

Software quality is multidimensional. Unit tests isolate logic but miss integration. End-to-end tests cover journeys but localize failure poorly. Static analysis finds classes of defects without executing behavior. Performance, accessibility, security, and compatibility require different methods. Repository histories also accumulate flaky tests, shared state, brittle fixtures, and undocumented exclusions.

## 3. Enduring Principle

### Build a risk-based test portfolio

| Method | Primary claim | Common blind spot |
|---|---|---|
| Unit | Local logic behaves under controlled inputs | Integration and configuration |
| Integration | Components and dependencies cooperate | Full user journey |
| End-to-end | Critical workflow functions | Fault localization and speed |
| Contract | Producer and consumer expectations remain compatible | Internal behavior |
| Property-based | Invariants hold across generated inputs | Incorrect properties |
| Mutation | Tests detect introduced faults | Equivalent or costly mutations |
| Fuzz | Parsers and boundaries withstand unexpected input | Business correctness |
| Performance/load | Latency, throughput, and resource limits | Functional intent |
| Accessibility | Interaction remains usable across access needs | Product value |
| Visual regression | Rendered appearance does not drift unexpectedly | Semantic correctness |
| Security testing | Known abuse classes and policies hold | Unknown threats |

The Quality Contract chooses methods from change risk, affected behavior, architecture boundaries, data, reversibility, and production impact. No single pyramid or percentage is universally sufficient.

### Perform test-impact analysis

Map changed code, APIs, schemas, configuration, dependencies, and behavior to relevant tests. Selection records why a test was included or omitted. High-risk changes run broader suites; low-risk changes may use targeted suites plus periodic full validation. A model may recommend impact, but deterministic dependency and ownership data should constrain it.

### Govern agent-generated tests

Require tests to fail against the relevant pre-change behavior or a deliberate fault when feasible. Review assertions for observable outcomes rather than implementation details. Separate the agent that proposes behavior from the validator that evaluates coverage and fault sensitivity.

### Treat test infrastructure as production infrastructure

Version fixtures and test data, isolate tenants, remove secrets, define cleanup, track flaky behavior, and retain environment identity. Quarantining a flaky test is visible debt with owner and expiry, not a silent pass.

### Bind results to exact subjects

A test receipt identifies source commit, artifact, environment, command, selected tests, exclusions, retries, duration, raw result, and verifier. Rerunning until green without preserving failures destroys evidence.

## 4. Tradeoffs and alternatives

Full suites maximize breadth and can make feedback unusably slow. Impact-based selection increases speed and depends on trustworthy mappings. Mutation and fuzz testing find important gaps but should be targeted by risk and budget. Browser and visual tests improve journey confidence while requiring stable data and rendering controls.

## 5. Current Mission Control Implementation

The current guide defines quality contracts, criterion-linked evidence, deterministic validation, independent verification, browser testing, security scanning, and replay. The golden-path lab requires unit, integration, and browser evidence.

It does not yet provide a complete test taxonomy, impact-analysis contract, flaky-test operating model, mutation or property-based strategy, performance and accessibility gates, or test-data lifecycle. This chapter establishes those missing responsibilities.

## 6. Future Vision

The factory should propose a test plan from repository intelligence and change impact, explain every selected method, execute it in qualified environments, and update mappings from accepted outcomes. Test failures should distinguish product defects, test defects, infrastructure failures, and nondeterminism. Production escapes should create regression cases and reveal selection gaps.

## 7. Versioned references

- [Continuous Quality Contracts, Proof Packages, and Certificates](../07-quality-engineering/03-continuous-quality-contracts-proof-packages-and-certificates.md)
- [Evaluation Engineering](../06-ai-engineering/04-evaluation-engineering-trace-replay-and-run-comparison.md)
- [DORA test automation capability](https://dora.dev/capabilities/test-automation/), accessed 2026-08-30

## 8. Notes and lessons learned

Test quantity is an activity metric. The important question is whether independent methods can detect the plausible faults introduced by this exact change.

## 9. Design review questions

1. How do you validate an agent-generated test?
2. When is targeted test selection safe?
3. What should happen to a flaky required gate?
4. How do unit, contract, and end-to-end evidence complement each other?
5. Which test failures should affect agent trust?

## 10. Whiteboard exercise

Design the test portfolio for a payment API schema change with a browser client, batch consumer, performance SLO, and accessibility requirement. Add one flaky test and one incomplete dependency map.

## 11. Hands-on lab

In a disposable repository, introduce a bounded behavior change. Generate a risk-based test plan, run unit and integration tests, add one property or mutation check, and record selection and exclusions. Deliberately create a weak agent-authored test and prove the independent validator rejects it.
