---
title: Capability Certification and Revocation Lab
status: review-ready
audience: [architect, ai-engineer, platform, security, quality]
last_verified: 2026-08-30
lifecycle: [define, verify, learn]
risk: high
lab_type: executable
topics: [capability-registry, certification, revocation]
---

# Capability Certification and Revocation Lab

## Objective

Prove that an agent capability can be packaged, evaluated, certified for a bounded scope, resolved into an execution contract, and revoked without losing historical explainability.

## Prerequisites and starting state

- A disposable local repository.
- One read-only repository-analysis agent, one skill, one typed tool, one model profile, and one evaluator represented by manifests.
- No production credentials or production registry.
- Read the three [Agent Factory](../../03-build/10-the-agent-factory.md) chapters.

## Required implementation

1. Assign every component a canonical identity, owner, immutable version, digest, source, license, permissions, dependencies, compatibility, and lifecycle state.
2. Resolve the transitive graph into a lock and bind it into a simulated Factory Version.
3. Run functional, operational, security, and policy evaluations.
4. Produce a certification object limited to read-only analysis in the disposable repository.
5. Execute one qualified Attempt and retain the resolved graph with its evidence.
6. Revoke the tool, attempt a new resolution, and prove it fails closed.
7. Show that the historical Attempt still resolves to its original manifests and revocation timeline.

## Required failure

Publish a second skill version that requests a permission outside the certified scope. The resolver must reject it or require a new certification; a familiar name cannot preserve eligibility.

## Evidence and pass criteria

Retain manifests, digests, dependency lock, evaluation results, certification, policy decision, successful historical Attempt, rejected new resolution, revocation record, and migration recommendation. The lab fails if “latest” is used, revoked components remain eligible, or history becomes unresolvable.

## Cleanup

Delete disposable packages and runtime state. Preserve the evidence bundle and remove any temporary credentials.
