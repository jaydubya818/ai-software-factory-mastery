---
title: Progressive Delivery, Production Verification, and Rollback
status: review-ready
audience: [executive, architect, senior-engineer, platform, quality, product]
last_verified: 2026-08-30
lifecycle: [deliver, learn]
risk: high
topics: [progressive-delivery, canary, feature-flags, rollback, production-verification]
---

# Progressive Delivery, Production Verification, and Rollback

## Quick Read

- **Purpose:** Complete the factory path from release eligibility to observed customer outcome.
- **Best for:** Release, reliability, product, platform, and engineering leaders.
- **Prerequisites:** [CI/CD, Artifacts, Migrations, and API Compatibility](02-cicd-artifacts-migrations-and-api-compatibility.md).
- **Reading time:** 15 minutes.
- **You will learn:** How to design staged exposure, production verification, stop conditions, rollback, and outcome confirmation.
- **Keep three ideas:** deployment is a state transition, not success; rollback must be pre-engineered; and customer outcome closes the lifecycle.

## 1. The problem

Factories often stop at a pull request or green deployment. Neither proves that the intended users received the change, that it is technically healthy, or that the business outcome improved. Automated rollout can scale a defect quickly, while an untested rollback can compound it.

## 2. Why the problem exists

Production behavior depends on real traffic, data, configuration, dependencies, and user choices that preproduction cannot fully reproduce. Technical health and product success use different signals and observation windows. Feature flags, canaries, and staged cohorts create control but also introduce configuration debt and partial states.

## 3. Enduring Principle

### Model release states explicitly

```text
eligible -> approved -> deploying -> deployed -> technically verified
         -> activated -> outcome observing -> outcome confirmed
                               |                    |
                               v                    v
                         contained/rolled back/corrective work
```

Each transition binds artifact, configuration, environment, cohort, actor, policy, evidence, and timestamp. “Done” is not an authoritative state.

### Use progressive exposure

Choose dark launch, internal cohort, percentage canary, region, tenant, feature flag, or blue-green strategy according to failure containment and representativeness. Predefine promotion gates, maximum exposure, observation duration, stop conditions, and decision owner.

### Verify technical and intended outcomes

Technical verification includes availability, latency, errors, saturation, security, data integrity, dependencies, and synthetic journeys. Product verification checks the Mission’s expected behavior and guardrail measures. Segment results to detect harm hidden by aggregate averages.

### Engineer rollback and containment

Rollback identifies reversible components, configuration, data, migration state, caches, consumers, and external effects. When reversal is unsafe, use containment and forward correction. Regular drills prove access, tooling, data restore, communication, and decision latency.

### Feed production facts back into acceptance

Production evidence may supersede an earlier certificate, create a trust event, open corrective work, revoke a capability, or change the observation window. Preserve the original decision and append the new fact.

## 4. Tradeoffs and alternatives

Small canaries contain harm but may not represent rare workloads. Long observation improves confidence and slows delivery accounting. Automatic rollback reduces exposure and can oscillate or damage data. Require hysteresis, bounded attempts, and human escalation for ambiguous or irreversible conditions.

## 5. Current Mission Control Implementation

The current architecture defines release records, gates, approvals, deployment linkage, production feedback, alerts, observation windows, rollback concepts, and validated customer value. The release chapter explicitly states that the complete mission-to-production path remains partial.

This chapter closes the guide model while preserving that evidence boundary. Operational proof requires live provider reconciliation, progressive rollout, rollback exercise, and customer-outcome confirmation at an exact version.

## 6. Future Vision

The factory should generate a risk-specific release plan, obtain material approvals, reconcile the external delivery system, observe technical and product signals, and either promote, contain, roll back, or create corrective work. Operators should see the causal chain from Mission through active artifact and outcome.

## 7. Versioned references

- [Release, Production Feedback, and Factory SRE](../07-quality-engineering/02-release-production-feedback-and-factory-sre.md)
- [Operational Autonomy and Trust Calibration](../02-first-principles/01-operational-autonomy-and-trust-calibration.md)
- [DORA deployment automation](https://dora.dev/capabilities/deployment-automation/), accessed 2026-08-30

## 8. Notes and lessons learned

The factory’s strongest claim is not that it generated correct code. It is that it maintained an explainable, recoverable line from intent to an independently observed outcome.

## 9. Design review questions

1. Which signals should stop a canary automatically?
2. Why is technical health not customer value?
3. When is rollback unsafe?
4. How should delayed production failure affect prior evidence?
5. What proves that a progressive-delivery strategy is representative?

## 10. Whiteboard exercise

Release a schema-dependent feature to ten percent of traffic. Add a delayed data-integrity defect, a healthy aggregate dashboard, and a failing high-value cohort. Show detection, containment, authority, rollback or forward correction, and evidence updates.

## 11. Hands-on lab

Use a disposable service or simulation. Create an immutable release, expose it to a canary, evaluate technical and product gates, trigger one failure, and execute rollback or containment. Retain the release plan, receipts, timeline, decision, recovery proof, and retrospective.
