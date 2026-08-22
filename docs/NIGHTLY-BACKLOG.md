# Nightly backlog

Carried between autonomous nightly runs so they compound instead of rediscovering
the same ground. Read this first; mark resolved items Closed; do not re-propose
anything already Open; append what you check and rule out.

Written and read by the scheduled jobs that operate on this repository —
`daily-repo-improvement` (code-sourced defects) and `notes-to-factory`
(idea-sourced work from Apple Notes and the Agentic-KB). Without this file the
dedup step in both jobs is a no-op here, and the same finding is re-proposed
every night.

## Format

- `- [ ] YYYY-MM-DD — **One-line title** — body with file and symbol citations.`
- Resolved items move to `## Closed` as `- [x] YYYY-MM-DD → YYYY-MM-DD — ...`.
- Investigated and ruled out goes under `## Checked, not applicable`, with the
  reason and the paths checked, so it is never re-derived.
- Items sourced from a captured idea carry provenance: `Source: apple-note <id>`
  or `Source: KB <wiki path>`.

## Open

<!-- Nothing open. Nightly runs append here. -->

## Closed

<!-- Resolved items, most recent first. -->

## Checked, not applicable

<!-- Investigated and deliberately not actioned. Record the reason and the paths
     checked so a later run does not re-derive it. -->
