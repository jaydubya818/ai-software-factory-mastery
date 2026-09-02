---
title: Repository Onboarding and Readiness Lab
status: review-ready
audience: [architect, senior-engineer, platform, security, ai-engineer]
last_verified: 2026-08-30
lifecycle: [intent, plan]
risk: high
lab_type: executable
topics: [repository-onboarding, readiness, codebase-intelligence]
---

# Repository Onboarding and Readiness Lab

## Objective

Demonstrate that repository registration, discovery, owner validation, indexing, and workflow admission are separate, evidence-backed steps.

## Prerequisites and starting state

Use a disposable repository with at least one application, tests, a dependency manifest, CI configuration, documentation, and one intentionally undocumented requirement. Use read-only credentials during discovery.

## Required implementation

1. Register canonical repository identity and accountable owner.
2. Discover instruction precedence, components, dependencies, build commands, test topology, generated files, delivery configuration, data-sensitive paths, and external services.
3. Mark every fact as authoritative, derived, inferred, or unknown with source commit and freshness.
4. Build searchable code, symbol, dependency, ownership, and test-impact indexes.
5. Ask the owner to validate material facts and correct one generated inference.
6. Produce a workflow-specific readiness decision for read-only analysis, documentation change, low-risk code change, and production migration.
7. Change the source commit and prove affected readiness evidence becomes stale.

## Required failure

Hide the authoritative integration-test command from normal discovery. The system must surface incomplete test readiness and block the low-risk code-change path until an owner supplies and validates the missing contract.

## Evidence and pass criteria

Retain the readiness record, source map, indexes, owner correction, blocked decision, refreshed decision, and drift event. The lab fails if repository registration automatically grants modification authority or inferred data classification is silently accepted.

## Cleanup

Remove generated indexes and any checkout created for the lab. Preserve the redacted readiness and decision evidence.
