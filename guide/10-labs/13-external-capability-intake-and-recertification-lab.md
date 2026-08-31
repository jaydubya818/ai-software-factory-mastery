---
title: External Capability Intake and Recertification Lab
status: review-ready
audience: [architect, platform, security, quality, operations, legal, procurement, builder]
last_verified: 2026-08-30
lifecycle: [define, execute, verify, learn]
risk: high
topics: [capability-intake, suppliers, contracts, certification, revocation]
lab_type: failure-injection
---

# External Capability Intake and Recertification Lab

## Quick Read

Qualify a synthetic external tool through ownership, provenance, data-use,
security, service, side-effect, cost, incident, exit, certification,
publication, drift, revocation, and recertification controls.

## 1. Capability scenario

Implement or mock a repository publication tool supplied by a fictional third
party. It accepts synthetic data only. Define owner, provider, version,
purpose/non-purpose, schemas, identity, authorization, tenancy, data classes,
destinations, side effect, idempotency, timeout, retry, rate, concurrency,
observability, redaction, SLO, cost, dependency, incident terms, deprecation,
revocation, data return/deletion, and exit path.

## 2. Intake review

Record source and build provenance, component inventory, licenses, security and
privacy assessment, credential and network design, subprocessors/data-use
assumptions, service limits, incident notification, business owner, technical
owner, and independent reviewer. Resolve the exact artifact digest; a moving
version label is insufficient.

## 3. Certification tests

1. Validate input, output, and every error class.
2. Deny unauthorized identity, tenant, repository, destination, data class,
   expired grant, and prohibited purpose.
3. Repeat an idempotency key and prove one effect.
4. Time out after a mock effect, reconcile, and avoid blind retry.
5. Exercise rate, concurrency, dependency outage, and cost limits.
6. Verify redacted telemetry, full restricted audit, effect receipt, rollback
   or accepted irreversibility, and evidence binding.
7. Revoke the exact version and prove registry selection, cached resolution,
   active calls, dependent workflows, and evidence react according to policy.

## 4. Supplier-change injection

Change one output default, data destination, dependency, and rate behavior
without changing the visible version label. Drift detection must quarantine
the capability and identify affected systems. Produce a new exact version,
compatibility analysis, targeted threat review, representative regression and
failure tests, updated cost/SLO, and a named recertification decision.

## 5. Required evidence

Retain intake manifest; ownership and supplier review; artifact provenance and
digest; contract; credentials and policy decisions; all positive/negative
tests; tool calls and mock receipts; costs; drift signal; quarantine and
revocation events; dependency impact; new-version comparison; human decisions;
exit/deletion test; cleanup; and retained gaps.

## 6. Scoring rubric

| Area | Pass |
|---|---|
| Contract completeness | Every required field has an owner and test |
| Security | Unauthorized scope and data destinations fail closed |
| Side-effect safety | Duplicate and unknown results reconcile correctly |
| Supply chain | Exact artifact and dependencies are attributable |
| Drift | Silent behavioral change triggers quarantine and impact analysis |
| Lifecycle | Publication, deprecation, revocation, recertification, and exit work |
| Evidence | Independent reviewer reproduces the qualification decision |

## 7. Cleanup and nonclaim

Revoke synthetic credentials, retire versions, remove mock external data,
execute the exit/deletion procedure, and retain allowed evidence. Certification
applies only to the exact version, environment, scope, and observation window.
