---
title: Security and Identity Architecture
status: draft-for-study
audience: [executive, architect, senior-engineer, ai-engineer, platform]
last_verified: 2026-08-09
mission_control_commit: b31e27564deb1c03c167e61b5ee094567c2ba7b1
---

# Security and Identity Architecture

## 1. The problem

An AI Software Factory connects human intent to code, credentials, repositories,
tools, and delivery systems. A confused identity boundary can let a browser
pretend to be an agent, a service inherit human authority, or a repository
credential become general permission to change software.

The security goal is not to make agents trusted. It is to ensure every action
has an authenticated principal, explicitly scoped authority, isolated execution,
bounded data access, and immutable evidence.

## 2. Why the problem exists

The factory has several principals: humans, orchestration services, executor
workers, agent instances, GitHub Apps, webhooks, schedulers, and external tools.
They have different lifecycles and risk. A human session is interactive; a
service runs overnight; an installation token belongs to one provider boundary;
an agent version describes behavior but is not itself a credential.

Prompt injection and malicious tool output add another problem: data can attempt
to influence instructions. Traditional authorization remains necessary but is
not sufficient; the runtime must separate instructions, content, tools, and
secrets.

## 3. Enduring Principle

### Authenticate the principal; authorize the action; attest the execution

Authentication proves who or what is calling. Authorization proves that the
principal may perform a bounded action. Attestation proves which software,
configuration, context, and environment actually performed it.

```mermaid
flowchart LR
    Principal["Human, service, agent, or integration"] --> AuthN["Authenticate identity"]
    AuthN --> AuthZ["Authorize scoped action"]
    AuthZ --> Policy["Evaluate policy and approval"]
    Policy --> Execute["Isolated execution"]
    Execute --> Audit["Attestation, lineage, and audit"]
```

### Keep principal types separate

- A human identity owns accountable decisions.
- A service identity performs named machine capabilities.
- An agent identity links behavior, version, and provenance.
- An executor identity owns one runtime process or claim.
- A provider identity, such as a GitHub App installation, crosses one external
  trust boundary.

Do not create fake human users for automation or reuse one omnipotent “system”
role. Delegation should preserve the human or policy authority that initiated it
without giving the delegate every right of the delegator.

### Apply least privilege in several dimensions

Scope authority by company, workspace, repository, environment, resource,
action, path, tool, time, budget, and Attempt. Credentials should be short-lived
and minted only after policy and readiness checks. Stronger-than-required
provider grants are a readiness failure, not a convenience.

### Treat all external content as untrusted

Repository files, issues, web pages, MCP resources, tool results, logs, and
memory can contain hostile instructions. The runtime should label them as data,
constrain size and format, strip active content where possible, scan for secrets,
and prevent them from changing system instructions or tool policy.

### Separate secrets from evidence

Secrets should enter only the process that needs them, for the shortest useful
time. They must not appear in prompts unless necessary, structured events,
artifacts, screenshots, error messages, or audit payloads. Audit should record
secret identity or version, never secret value.

### Design for revocation and compromise

Disabling a human, service, agent version, MCP server, repository installation,
or policy must stop new authority promptly. Active executions need explicit
revocation semantics: cancel, quarantine, rotate credentials, reconcile effects,
and retain the incident trail.

### Audit denials as well as successes

A denial can reveal attack, drift, misconfiguration, or a healthy control. Audit
records need principal, capability, scope, decision, policy version, time,
reason, and correlation identity without retaining sensitive payloads.

## 4. Tradeoffs and alternatives

Fine-grained authorization improves containment but increases configuration and
operator friction. Capability-based service commands reduce ambiguity but
require more integration work than a generic service token. Short-lived tokens
reduce exposure but increase dependence on token-minting availability.

Sandboxing can limit filesystem and network effects, but no sandbox justifies
broad credentials. Separate containers or hosts provide stronger isolation than
process restrictions at greater cost. The correct level follows risk and threat
model, not fashion.

## 5. Current Mission Control Implementation

At commit
[`b31e27564deb1c03c167e61b5ee094567c2ba7b1`](https://github.com/jaydubya818/MissionControl/tree/b31e27564deb1c03c167e61b5ee094567c2ba7b1),
Mission Control deliberately separates human, service, and GitHub identities.

Human authentication uses Clerk tokens, while Convex tenant/operator/role
records remain the source of company authorization. Exact Clerk subject IDs,
not email addresses, bind humans to operators. Company and workspace operations
use server-side permission checks and protect the last active owner.

The production Clerk issuer is still a non-routable placeholder at the studied
commit. Clerk rollout therefore has documented controls but is not configured
production evidence.

The orchestration server authenticates inbound HTTP with a bearer token and
signs outbound Convex commands with a separate HMAC secret. Signed envelopes
bind service identity, named capability, workspace, repository, command ID,
short expiry, and payload digest. Convex retains accepted, denied, failed, and
replayed command receipts. Current named service capabilities are WorkOrder
dispatch and receipt ingestion; broad task, artifact, handoff, and other service
operations remain incomplete.

GitHub uses an App installation rather than personal access tokens. Readiness
requires exact least privilege: metadata read, contents write, pull requests
write, checks read, and a defined webhook set. Missing, excessive, stale, or
revoked authority blocks readiness. Webhook signatures are checked against the
raw body, delivery GUIDs deduplicate effects, and installation tokens are
ephemeral and not retained.

The security matrix is candid that company administration and some factory
paths are enforced while Mission, Task, approval, remaining evidence,
orchestration, and release authorization still need the complete golden-path
security slice. The missing GitHub App configuration was a real blocker in the
retained lab.

## 6. Future Vision

Mission Control needs a unified principal and delegation model across human,
service, agent, executor, and integration identities. Every Attempt should
retain principal chain, credential class, policy snapshot, sandbox attestation,
tool/MCP grants, network policy, and secret-version references.

The production threat model should test prompt injection, repository poisoning,
MCP supply chain, confused deputy, cross-tenant access, token replay, webhook
forgery, stale worker completion, secret exfiltration, evidence tampering, and
denial of wallet. Promotion requires negative tests and browser/runtime evidence,
not configuration documents alone.

## 7. Versioned references

- [Clerk company authorization](https://github.com/jaydubya818/MissionControl/blob/b31e27564deb1c03c167e61b5ee094567c2ba7b1/docs/security/clerk-company-authorization.md)
- [Human and service authorization matrix](https://github.com/jaydubya818/MissionControl/blob/b31e27564deb1c03c167e61b5ee094567c2ba7b1/docs/security/human-service-authorization-matrix.md)
- [Service command authentication](https://github.com/jaydubya818/MissionControl/blob/b31e27564deb1c03c167e61b5ee094567c2ba7b1/docs/security/service-command-authentication.md)
- [GitHub App contract](https://github.com/jaydubya818/MissionControl/blob/b31e27564deb1c03c167e61b5ee094567c2ba7b1/docs/security/github-app-connection.md)
- [Company access enforcement](https://github.com/jaydubya818/MissionControl/blob/b31e27564deb1c03c167e61b5ee094567c2ba7b1/convex/lib/companyAccess.ts)
- [Orchestration authentication](https://github.com/jaydubya818/MissionControl/blob/b31e27564deb1c03c167e61b5ee094567c2ba7b1/apps/orchestration-server/src/auth.ts)
- [GitHub App authentication](https://github.com/jaydubya818/MissionControl/blob/b31e27564deb1c03c167e61b5ee094567c2ba7b1/convex/lib/githubAppAuth.ts)

## 8. Notes and lessons learned

Mission Control’s strongest security design choice is identity separation. Its
most important current limitation is incomplete enforcement across the full
golden path. Both facts belong in the same explanation.

## 9. Interview and discussion questions

1. Why is an agent identity not a human identity?
2. What is the confused-deputy problem in a software factory?
3. Why should excessive GitHub permission fail readiness?
4. How do signed service commands prevent replay?
5. What belongs in an execution attestation?
6. How do you contain prompt injection from repository content?
7. What current Mission Control security claim would you refuse to make?

## 10. Whiteboard exercise

Draw the complete principal chain from human Plan approval to service dispatch,
executor claim, GitHub token, webhook return, and human merge. Mark credentials,
trust boundaries, authorization checks, revocation, and audit receipts.

## 11. Hands-on lab

At commit `b31e275`, trace one human permission check, one signed service
command, and the GitHub App webhook verification path. Attempt a replay in a
test fixture and verify no side effect repeats. Produce a threat table for the
golden path and classify implemented versus missing mitigations.

Required evidence: exact symbols, denial receipts, replay result, credential
handling notes, and security/executive teach-backs.
