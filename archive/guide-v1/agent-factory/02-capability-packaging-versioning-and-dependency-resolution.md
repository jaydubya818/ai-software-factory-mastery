---
title: Capability Packaging, Versioning, and Dependency Resolution
status: review-ready
audience: [architect, ai-engineer, platform, security]
last_verified: 2026-08-30
lifecycle: [define, execute]
risk: high
topics: [packaging, versioning, dependencies, compatibility]
---

# Capability Packaging, Versioning, and Dependency Resolution

## Quick Read

- **Purpose:** Make agent capabilities reproducible, composable, and safely replaceable.
- **Best for:** Engineers building agent definitions, skills, tools, prompts, adapters, and factory manifests.
- **Prerequisites:** [Capability Supply Chain and Registries](01-capability-supply-chain-and-registries.md).
- **Reading time:** 12 minutes.
- **You will learn:** How to package capabilities, version behavioral contracts, resolve dependency graphs, and qualify combinations.
- **Keep three ideas:** version behavior, not filenames; lock complete graphs for execution; and prove compatibility with conformance tests.

## 1. The problem

An agent run is not reproducible when its “version” identifies only a prompt or model name. Behavior depends on instructions, tool schemas, skill content, context policy, harness features, runtime image, model route, permissions, and evaluator. A small change to any of them can alter decisions or side effects.

Without packaging and dependency resolution, teams cannot compare runs fairly, roll back safely, or determine whether an incident came from the model, tool, prompt, environment, or their interaction.

## 2. Why the problem exists

Agent systems combine deterministic software with probabilistic components. Traditional semantic versioning describes API compatibility but not evaluation drift. Text files are easy to copy and hard to inventory. Dynamic tool discovery improves flexibility while making the effective runtime graph depend on time, tenant, identity, and provider availability.

Compatibility is also relational. A tool can be valid alone and unsafe with a particular agent permission set. A model may support tool calling but fail the structured-output or context requirements of one workflow.

## 3. Enduring Principle

### Package the smallest independently governed unit

A capability package contains a manifest, source or content, schemas, tests, evaluation references, provenance, and signature. The package should be immutable after publication. A correction creates a new version.

The manifest separates:

- **identity:** canonical name, type, owner, source, digest;
- **behavioral contract:** purpose, inputs, outputs, side effects, failure modes;
- **operating contract:** runtime, harness, model, environment, network, storage;
- **authority requirements:** scopes, credentials, approvals, data classes;
- **quality contract:** required tests, evaluations, thresholds, limitations; and
- **lifecycle contract:** support window, deprecation, migration, revocation.

### Version on material behavior

A major change breaks consumers or widens authority. A minor change adds backward-compatible behavior or eligibility. A patch corrects behavior without changing the declared contract. Because prompts and models are behavioral dependencies, even a seemingly small text or provider change may require new evaluation and a new package digest.

### Resolve before execution

Resolution converts ranges, aliases, policies, and environment constraints into an immutable graph. The lock must include transitive dependencies and the reason each version was selected. Execution receives the lock; it does not discover a materially different graph mid-Attempt.

```text
Requested capability
  -> policy and tenant eligibility
  -> version constraints
  -> transitive dependency graph
  -> compatibility matrix
  -> vulnerability and revocation checks
  -> immutable resolution lock
  -> Factory Version and Execution Manifest
```

### Test combinations, not labels

Conformance suites should exercise tool discovery, schema validation, permission denial, cancellation, timeout, streaming, artifact capture, structured completion, and teardown. A compatibility declaration without a passing suite is an assertion, not evidence.

## 4. Tradeoffs and alternatives

Strict locks reduce drift but slow emergency provider substitution. Prequalify bounded fallback graphs and record when a fallback changes the execution identity. Broad version ranges ease upgrades but increase the chance that the same workflow behaves differently over time.

Bundling every dependency into one artifact improves reproducibility and creates large release units. Fine-grained packages increase reuse and dependency complexity. Choose boundaries aligned to ownership, evaluation, and rollback.

## 5. Current Mission Control Implementation

The studied architecture freezes many material bindings in Factory Versions and Execution Manifests and defines capability manifests for harnesses, environments, routes, and agents. The existing guide also recognizes exact model routes and immutable context packages.

It does not yet show a single package format, complete transitive lock, universal compatibility suite, or migration mechanism spanning agents, skills, prompts, tools, and evaluators. Runtime substitutions therefore require explicit scrutiny rather than an assumption of parity.

## 6. Future Vision

Every Attempt should carry a machine-readable resolution lock whose digest connects the capability registry to runtime telemetry and evidence. Upgrade tooling should calculate affected Factory Versions, run compatibility and regression suites, produce a migration plan, canary the new graph, and retain instant rollback to the prior graph.

## 7. Versioned references

- [Capability Supply Chain and Registries](01-capability-supply-chain-and-registries.md)
- [Execution Manifest glossary entry](../00-overview/02-canonical-glossary.md)
- [Development Environments, Compute, and Composable Infrastructure](../05-runtime-architecture/07-development-environments-compute-and-composable-infrastructure.md)
- [OCI Image Format](https://github.com/opencontainers/image-spec), accessed 2026-08-30

## 8. Notes and lessons learned

Reproducibility is a graph property. Pinning the model while leaving tools, prompt fragments, skills, or runtime images mutable produces a precise-looking identifier for an imprecise system.

## 9. Design review questions

1. Which changes require a new capability version?
2. When is a provider fallback compatible, and when is it a new experiment?
3. What belongs in a resolution lock?
4. How should deprecation differ from revocation?
5. Why are compatibility matrices insufficient without conformance tests?

## 10. Whiteboard exercise

Design resolution for a repository-review agent with two alternative model routes and a tool available only in one environment. Add a critical tool revocation during an active Attempt. Separate behavior for the active Attempt, queued work, and historical replay.

## 11. Hands-on lab

Package a small read-only repository skill and a typed tool. Create two versions with one contract change. Produce a dependency lock, run schema and permission conformance tests, and demonstrate that the incompatible upgrade is rejected. Retain manifests, digests, locks, test output, and the migration recommendation.
