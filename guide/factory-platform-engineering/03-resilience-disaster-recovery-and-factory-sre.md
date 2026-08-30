---
title: Resilience, Disaster Recovery, and Factory SRE
status: review-ready
audience: [architect, platform, sre, security, executive]
last_verified: 2026-08-30
lifecycle: [execute, verify, deliver, learn]
risk: critical
topics: [resilience, disaster-recovery, chaos-engineering, rto, rpo]
---

# Resilience, Disaster Recovery, and Factory SRE

## Quick Read

- **Purpose:** Keep the factory safe and explainable when its own infrastructure fails.
- **Best for:** Reliability, platform, security, architecture, and executive owners.
- **Prerequisites:** [Release, Production Feedback, and Factory SRE](../07-quality-engineering/02-release-production-feedback-and-factory-sre.md).
- **Reading time:** 15 minutes.
- **You will learn:** How to define failure domains, graceful degradation, disaster recovery, emergency authority, and resilience exercises.
- **Keep three ideas:** durable intent must survive worker loss; failover must preserve authority; and recovery is unproven until exercised.

## 1. The problem

The factory is itself a production system with authority to change other systems. Control-plane loss, corrupted state, unavailable providers, stale leases, regional failure, credential compromise, or evidence-store failure can stall delivery or create unsafe ambiguity. A high-availability worker fleet does not protect authoritative records or prevent duplicate external effects.

## 2. Why the problem exists

The system spans control, execution, quality, identity, source, model, environment, artifact, deployment, and observability providers. Some failures are transient; others corrupt trust. Recovery objectives differ: losing telemetry may be acceptable briefly, while losing authorization or audit state may require immediate halt.

## 3. Enduring Principle

### Define failure domains and criticality

Inventory components, dependencies, authoritative data, derived data, credentials, external effects, and recovery owners. Classify which capabilities fail closed, degrade read-only, queue safely, switch provider, or require emergency shutdown.

### Set RTO and RPO by capability

Recovery time and recovery point objectives apply to control-plane state, evidence, registry, queues, artifacts, and telemetry separately. An RPO of zero for authority records may require synchronous durability; telemetry can often tolerate bounded loss.

### Preserve authority across failover

Failover must not create two active authorities, reset budgets, reuse single-use permits, revive revoked capabilities, or duplicate publication. Use fencing tokens, generations, leases, idempotency, reconciliation, and explicit recovery mode.

### Engineer graceful degradation

Examples include read-only operator access, stopping new admission while allowing safe cancellation, retaining events locally, switching to prequalified model routes, or delaying publication. Degradation is declared policy, not improvised fallback.

### Exercise recovery

Run game days for provider outage, queue corruption, lost worker, expired credential, evidence-store failure, regional loss, and compromised capability. Measure detection, decision, containment, restore, reconciliation, communication, and return to service.

### Control emergency authority

Break-glass access is narrowly scoped, time-limited, strongly authenticated, independently logged, and reviewed afterward. Emergency action cannot silently erase history or become the routine operating path.

## 4. Tradeoffs and alternatives

Multi-region active-active improves availability and makes consistency and fencing harder. Warm standby is simpler and increases recovery time. Chaos experiments reveal coupling and can harm shared environments; begin with simulation and controlled fault injection. Keeping every provider fallback ready may be more expensive than accepting bounded unavailability.

## 5. Current Mission Control Implementation

The current guide covers durable state, leases, retries, idempotency, reconciliation, cancellation, cleanup, provider degradation, alerts, SLOs, error budgets, and recovery. It does not yet specify or prove complete disaster recovery, regional failover, backup restoration, split-brain protection, or game-day evidence for the factory as a whole.

## 6. Future Vision

The factory should publish a dependency and recovery map, automate backups and restore verification, enter declared degraded modes, and reconcile every uncertain external effect after recovery. Promotion of autonomy should require recent recovery evidence for the supporting platform.

## 7. Versioned references

- [Runtime Orchestration and State Machines](../05-runtime-architecture/02-runtime-orchestration-and-state-machines.md)
- [Factory Observability](../05-runtime-architecture/05-factory-observability-and-agent-runtime-telemetry.md)
- [NIST Contingency Planning Guide](https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final), accessed 2026-08-30

## 8. Notes and lessons learned

Factory reliability is a safety control. When the system cannot prove current authority, configuration, or evidence, availability should yield to containment.

## 9. Interview and discussion questions

1. Which factory components require an RPO of zero?
2. How do fencing tokens prevent split-brain execution?
3. What can remain available when admission is stopped?
4. Which fallback changes require new approval?
5. What evidence proves disaster recovery works?

## 10. Whiteboard exercise

Fail the primary control-plane region during active code publication. Add a delayed provider response and a revoked tool. Show fencing, recovery mode, state restore, external reconciliation, operator decisions, and proof that no duplicate publication occurred.

## 11. Hands-on lab

Use a simulation or disposable environment. Stop a worker, fail one dependency, restore authoritative state from backup, reconcile a delayed completion, and verify idempotency. Record detection, RTO/RPO, decisions, lost data, cleanup, and corrective actions.
