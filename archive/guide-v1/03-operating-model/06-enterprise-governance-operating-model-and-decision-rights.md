---
title: Enterprise Governance Operating Model and Decision Rights
status: review-ready
audience: [executive, architect, product, security, legal, compliance, finance, operations, quality]
last_verified: 2026-08-30
lifecycle: [intent, plan, execute, verify, deliver, learn]
risk: critical
topics: [governance, operating-model, decision-rights, assurance, accountability]
---

# Enterprise Governance Operating Model and Decision Rights

## Quick Read

- **Problem solved:** Make authority explicit from enterprise risk appetite to
  one system, release, incident, and autonomy decision.
- **Three levels:** Executive governance; enablement and control; accountable
  system and business ownership.
- **Critical separation:** Operating, approving, and independently assuring a
  high-risk action are distinct responsibilities even when a small team
  combines titles.
- **Evidence boundary:** A RACI table is a design artifact. Decision records
  and control tests prove that the model operates.

## 1. The problem

Agent governance fails when policy has no decision owner, system owners do not
know their autonomy ceiling, reviewers approve without independent evidence,
or incident authority depends on locating an executive. The solution is not
more committees. It is a small, explicit authority system with durable inputs,
outputs, escalation, and assurance.

## 2. Enduring Principle

### Assign decisions, not vague oversight

1. **Executive governance** sets strategy, values, risk appetite, prohibited
   uses, enterprise standards, material exceptions, investment, and final
   accountability.
2. **Enablement and control** maintains inventory, policy, architecture
   standards, assessments, training, lifecycle reviews, control tests,
   measurement, and reporting.
3. **Accountable system and business owners** own use-case value,
   implementation, local controls, monitoring, incident response, evidence,
   and retirement.

Independent assurance challenges claims and evidence. Data, architecture,
security, privacy, legal, compliance, finance, people, and operations
participate when their decision domain is affected.

## 3. Decision-rights matrix

`A` is accountable, `R` performs the work, `C` must be consulted, and `I` is
informed. Local names may change; the technical separation may not.

| Decision | Executive | Enablement/control | System/business owner | Independent assurance | Cross-functional owners |
|---|---|---|---|---|---|
| Enterprise strategy, risk appetite, prohibited use | A | R | C | C | C |
| System intake and risk classification | I | C | A/R | C | C |
| Architecture and control baseline | I | A/R | R | C | C |
| Capability or model approval | I | A | R | C | C |
| Low-risk release inside policy | I | C | A/R | I | I |
| High-risk release or autonomy promotion | I | A | R | C | C |
| Material policy exception | A | R | C | C | C |
| Emergency containment | I | A/R | R | I | C |
| Incident severity and external notification | I or A by severity | R | R | C | A/C by domain |
| Verified recovery and closure | I | A | R | C | C |
| Retirement and deletion | I | C | A/R | C | C |

The person producing a consequential artifact cannot be its only assurance
source. Approval authorizes a bounded action; acceptance confirms the outcome.
Those decisions should not be collapsed.

## 4. Decision contract

Every portfolio, system, release, incident, and autonomy decision records:

- subject, exact version, purpose, risk, and requested authority;
- accountable decision owner and participating roles;
- policy baseline, evidence, counterevidence, uncertainty, and exceptions;
- alternatives including a lower-autonomy option;
- decision, conditions, expiry, review trigger, and reason;
- dissent or unresolved concern;
- downstream grants or restrictions; and
- correlation to later outcomes, incidents, and learning proposals.

Hidden model reasoning is neither required nor a valid authority artifact.
Retain observable inputs, decisions, actions, outputs, and evidence.

## 5. Escalation and disagreement

A reviewer may approve, reject, request revision, restrict, or escalate. A
disagreement never defaults to broader authority. The existing ceiling remains
until the designated tie-break owner decides. Security and privacy owners may
contain within their delegated emergency scope; material business acceptance
remains with the business owner. Deadlines, escalation paths, and substitutes
are preassigned for every critical decision.

## 6. Cadence and events

| Review | Minimum inputs | Required outputs | Trigger |
|---|---|---|---|
| Portfolio | Inventory, value, risk, incidents, spend, exceptions | Investment, prohibited use, policy changes | Periodic and material external change |
| System | Purpose, owners, architecture, controls, outcomes, drift | Continue, restrict, promote, remediate, retire | Risk cadence or material configuration change |
| Release | Exact artifact, proof package, migration and rollback | Approve, reject, conditions | Each consequential release |
| Incident | Scope, timeline, affected authority and data, evidence | Severity, containment, notification, ownership | Detection or credible report |
| Autonomy promotion | Baseline/candidate results, failure recovery, cost | Ceiling decision, limits, expiry, rollback | Requested promotion |

Risk and events determine cadence. Meetings that produce no decision, control
change, or evidence are ceremony and should be removed.

## 7. Small-team implementation

A small organization may combine executive and system ownership, or enablement
and platform delivery. Preserve critical separation through technical means:
independent CI evaluation, protected approvals, two-person control for
irreversible actions, immutable evidence, and an outside reviewer for material
exceptions. Document conflicts of interest. Limited headcount changes the
mechanism, not the need for a credible challenge.

## 8. Failure modes, detection, and recovery

| Failure | Signal | Immediate action | Recovery |
|---|---|---|---|
| No named owner | Inventory check fails | Block activation or promotion | Accept named owner and backup |
| Self-approval | Producer and approver identity match | Deny decision | Re-run with independent reviewer |
| Expired exception | Expiry monitor | Restore baseline restriction | Reassess or close exception |
| Slow emergency response | Containment SLO breach | Invoke delegated backup authority | Exercise and revise on-call chain |
| Assurance conflict ignored | Dissent absent from decision record | Pause material action | Record, resolve, or explicitly escalate dissent |

Measure decision latency, overdue reviews, exception age, self-approval
attempts, control-test failure, time to contain, time to verified recovery,
and outcomes by approved autonomy tier.

## 9. Tradeoffs and nonclaims

Central governance improves consistency but can become a bottleneck. Federated
ownership improves speed but can fragment standards. Use centrally governed
minimum controls with locally accountable implementation and risk-based
escalation. This chapter does not prescribe job titles, legal conclusions, or
a universal committee structure. It is review ready, not evidence that any
organization operates the model.

## 10. References

- [NIST AI Risk Management Framework 1.0](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf), published
- [NIST Generative AI Profile](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf), published
- [Governance, Policy, and Risk-Proportional Approval](../08-security-and-governance/01-governance-policy-and-risk-proportional-approval.md)
- [Factory System Inventory](../04-domain-model/05-factory-system-inventory-classification-and-lifecycle.md)

## 11. Design review and lab

Run a tabletop for a high-risk release followed by a security incident. Assign
real decision owners, inject an absent approver and conflicting evidence, then
produce the release decision, containment record, notification decision,
verified recovery, dissent disposition, and updated RACI.
