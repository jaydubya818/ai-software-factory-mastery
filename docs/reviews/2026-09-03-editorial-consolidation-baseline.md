---
title: Editorial Consolidation Baseline
date: 2026-09-03
status: recorded
baseline_commit: 2db7fd8
scope: public-guide-corpus
---

# Editorial Consolidation Baseline

## Outcome

The September 2 synthesis materially improved technical coverage and also made
the guide less teachable. This baseline records the state before editorial
consolidation. It is evidence for comparison, not a validation of the content.

## Corpus

| Measure | Baseline |
| --- | ---: |
| Published documents | 57 |
| Source words | 390,297 |
| Generated public-content words | 382,404 |
| Main chapters | 36 |
| Main-chapter words | 300,700 |
| Median main chapter | 8,448 words |
| Main chapters over 8,000 words | 19 |
| Main chapters over 10,000 words | 12 |
| Stage-page words | 36,019 |
| Glossary definitions | 619 |
| Core-concept candidates in Appendix F | 50 |

## Known editorial findings

- Chapter 2 contains more than two top-level mental models.
- Stage pages repeat chapter material rather than functioning as orientation
  briefs.
- Most `Retain this` sections exceed the intended five-to-seven-item limit;
  the largest contains 29 bullets and 813 words.
- The glossary duplicates `Loop engineering` and `Workload identity`.
- `Model adapter` is used for both an integration layer and trained parameter
  additions.
- Multiple chapters cite vague sources such as `public practitioner talks,
  2026` without traceable provenance.
- The research canon, changelog, and coverage review predate the September 2
  expansion.

## Reproduction

From `site/`:

```sh
npm run editorial:check
npm run editorial:check -- --write-inventory
```

The generated inventory is `docs/editorial/content-inventory.generated.md`.

## Release comparison

The consolidated release must compare its metrics against this baseline and
explain any target it misses. A lower word count alone is not success; reader
flows, terminology, sources, links, and technical review must also pass.
