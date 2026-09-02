---
title: Knowledge Poisoning, Revocation, and Retrieval Lab
status: review-ready
audience: [architect, ai-engineer, data, platform, security, quality, builder]
last_verified: 2026-08-30
lifecycle: [plan, execute, verify, learn]
risk: high
topics: [knowledge, retrieval, permissions, poisoning, revocation, deletion]
lab_type: failure-injection
---

# Knowledge Poisoning, Revocation, and Retrieval Lab

## Quick Read

Demonstrate permission filtering before ranking, stale and contradictory source
handling, poisoning containment, reverse-lineage impact analysis, revocation
propagation, deletion, clean reindexing, and reproducible context packages.

## 1. Synthetic corpus

Create two tenants, two repository manifests, three policy versions, one source
with a deliberately misleading indirect instruction, one unauthorized
document with highly relevant terms, one stale governing document, conflicting
aliases, and one missing ownership fact. No real confidential or personal data
may be used.

Register owners, connector identities, authority classes, classifications,
permissions, freshness, retention, correction/deletion behavior, pipeline
versions, and expected query results. Build lexical and vector indexes and a
small hybrid/reranking policy.

## 2. Baseline evaluation

Create representative exact-identifier, conceptual, relationship, freshness,
permission, contradiction, and missing-data queries. Measure candidate recall,
ranking, permission correctness, source/version citations, contradiction
coverage, latency, and cost. Freeze one correct context package.

## 3. Failure injections

1. Query as tenant A for terms dominated by tenant B's unauthorized document.
   Prove it is excluded before ranking and never reaches model context.
2. Make the obsolete policy score above the current version. Prove authority
   and freshness rules reject it or surface a blocking conflict.
3. Activate the poisoned source. Detect the instruction/provenance or abnormal
   source-dominance signal and suspend the source.
4. Use reverse lineage to identify artifacts, indexes, caches, context
   packages, attempts, evidence, and releases that depended on it.
5. Revoke the source and prove new retrieval excludes it immediately. Pause or
   flag active attempts according to policy.
6. Correct the source, rebuild affected partitions with a new pipeline version,
   and compare clean retrieval to baseline.
7. Delete one source and prove active content, segments, embeddings, indexes,
   and caches are removed while allowed tombstone/audit evidence remains.
8. Reproduce the corrected context package from exact versions and verify the
   old package is retained only as ineligible historical evidence.

## 4. Required evidence

Retain source registrations; connector and checkpoint state; artifact lineage;
permission decisions; query, candidates, raw/reranked scores, inclusions and
exclusions; context packages and digests; detection and suspension; forward and
reverse lineage; revocation and deletion receipts; affected-run actions;
reindex comparison; evaluation results; cost; and reviewer decision.

## 5. Pass criteria

- zero unauthorized candidates reach ranking or model context;
- required missing facts block consequential execution;
- current governing material outranks or explicitly conflicts with stale data;
- poisoning causes suspension and blast-radius analysis, not silent learning;
- revocation propagates to selection, packages, active work, and evidence;
- deletion meets the declared policy across derived stores; and
- another reviewer reproduces the corrected package and retained gaps.

## 6. Cleanup and nonclaim

Remove disposable sources, indexes, caches, identities, and environments while
retaining the approved evidence bundle. One synthetic pass does not prove
production permission safety, deletion completeness, or poisoning resistance.
