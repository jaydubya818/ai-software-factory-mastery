---
title: Tool, Skill, and Integration Contract Reference
status: review-ready
audience: [architect, builder, ai-engineer, platform, security, quality, operations]
last_verified: 2026-08-30
lifecycle: [define, execute, verify, learn]
risk: high
topics: [tools, skills, integrations, contracts, side-effects, revocation]
---

# Tool, Skill, and Integration Contract Reference

## Quick Read

- **Purpose:** Make every callable capability discoverable, authorizable,
  testable, observable, recoverable, and revocable.
- **Core rule:** A tool schema describes data shape; a complete capability
  contract also defines authority, side effects, failure, cost, evidence, and
  lifecycle.
- **Selection rule:** Prefer narrow, atomic primitives with explicit receipts.
- **Evidence boundary:** Existing tools are not assumed to conform until their
  exact versions pass the contract suite.

## 1. Responsibility and non-responsibility

The capability owner defines purpose, interface, security, side effects,
service behavior, evidence, compatibility, and lifecycle. The registry owns
identity and discoverability. The gateway enforces runtime policy. The
orchestrator composes calls. The capability cannot approve its own use, expand
scope, or declare workflow acceptance.

## 2. Complete contract

```yaml
capability:
  id: tool:pull-request-publish
  version: 6.1.0
  kind: tool
  owner: team:developer-platform
  lifecycle: certified
  purpose: "Publish a review request for an existing branch"
  non_purpose: [merge, deploy, change-branch-content]
  input_schema: schema:publish-pr-input@3
  output_schema: schema:publish-pr-result@2
  error_schema: schema:capability-error@4
  authn: workload-identity
  authz: policy:repository-publication@5
  resource_scope: [repository, branch]
  tenant_scope: caller-tenant
  data_classes: [internal, confidential]
  destinations: [approved-source-provider]
  side_effect: publication
  reversible_by: tool:pull-request-close@2
  idempotency: caller-key-required
  timeout: PT20S
  retry: reconcile-before-retry
  rate_limit: 30/minute/installation
  concurrency_key: repository
  audit: full-request-metadata-redacted-body
  evidence: external-object-receipt
  availability_slo: 99.9%
  cost_profile: external-api
  certification_suite: suite:publish-pr@8
  deprecation_notice: P90D
  revocation_handle: capability-version
```

Skills additionally declare instructions, prerequisites, allowed tool
dependencies, context needs, model profile compatibility, expected outputs,
evaluation cases, and prohibited delegation. Integrations additionally declare
provider ownership, tenancy mapping, credential exchange, data-use terms,
residency, incident notification, rate behavior, reconciliation API, and exit
procedure.

## 3. Side-effect and reversibility taxonomy

| Class | Meaning | Minimum control |
|---|---|---|
| Read only | Observes without intended mutation | Scoped identity, classification, audit |
| Reversible mutation | Changes state with tested compensation | Idempotency, precondition, receipt, rollback test |
| Publication | Makes information visible or starts external review | Named destination, content digest, human/policy gate |
| Deployment | Changes an executing environment | Exact artifact, progressive rollout, rollback, production verification |
| Destructive mutation | Deletes or irreversibly transforms state | Explicit exception, dual control, backup or accepted irreversibility |
| Privileged administration | Changes identity, policy, secrets, access, or platform control | Strong identity, least privilege, dual control, emergency revocation |
| External communication | Sends content to a person or third party | Approved recipient, privacy and disclosure check, message receipt |

When a capability has several effects, classify it by the highest consequence.
Split mixed-purpose capabilities when doing so improves policy or recovery.

## 4. Invocation contract

The caller proposes a call with capability/version, subject, input digest,
resource, tenant, purpose, expected side effect, idempotency key, deadline, and
grant. The gateway validates discovery status, certification, schema,
authorization, data class, destination, budget, concurrency, and revocation.
The result includes status, exact output, effect receipt, dependency version,
duration, usage/cost, retry classification, redactions, and audit reference.

A timeout means the result is unknown unless the contract guarantees no effect
after timeout. Reconcile through the provider using the idempotency key or
external receipt before retrying.

## 5. Error, retry, and recovery

Errors are `invalid_input`, `unauthorized`, `policy_denied`, `conflict`,
`rate_limited`, `transient_unavailable`, `unknown_result`, `permanent_failure`,
and `revoked`. Each declares retryability, minimum delay, safe retry condition,
and whether compensation or human action is required. Backoff is bounded and
jittered. Circuit breaking is per dependency and operation class. Safety and
containment calls receive reserved capacity.

## 6. Observability, evidence, and privacy

Record caller and workload identity, grant and policy decision, capability
version, sanitized inputs/outputs or digests, resource, tenant, side-effect
class, external receipt, latency, cost, error, retry, and correlation. Never
place secrets or unrestricted content in metrics or ordinary logs. Evidence
requires provenance, subject binding, independence where applicable, and
tamper protection; an invocation log alone is telemetry.

## 7. Certification and lifecycle

Lifecycle is `proposed -> packaged -> evaluated -> certified -> published ->
active -> deprecated -> revoked -> retired`. Certification tests schemas,
authorization negatives, tenant isolation, side effects, idempotency,
timeouts, unknown results, rate limits, concurrency, cost, redaction,
observability, dependency outage, rollback, and revocation. Material changes
produce a new version and reevaluation. Revocation immediately blocks new
resolution and triggers affected-run and evidence analysis.

## 8. Performance and compatibility

Declare latency percentiles, throughput, concurrency, payload limits,
availability, dependency and region constraints, and cost units. Semantic
versioning is useful only when compatibility is tested. Input widening may be
compatible; changed defaults, permissions, side effects, destinations, or
error meaning are breaking changes even if the JSON schema is unchanged.

## 9. Tradeoffs and nonclaims

A broad integration reduces call count but hides policy and partial effects.
Atomic tools improve composition and evidence but add orchestration overhead.
Use atomic effects for consequential work and curated skills for reusable
decision procedures. This review-ready reference does not certify any
particular tool, protocol server, supplier, or registry.

## 10. Review and lab

Complete the [External Capability Intake and Recertification Lab](../10-labs/13-external-capability-intake-and-recertification-lab.md).
A passing review demonstrates negative authorization, duplicate invocation,
timeout after a side effect, reconciliation, revocation, dependency change,
recertification, and independent reconstruction of the resulting evidence.
