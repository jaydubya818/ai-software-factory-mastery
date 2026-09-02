---
date: 2026-08-30
topic: reader-experience-v1
---

# Reader Experience V1

## What We're Building

Turn the AI Software Factory curriculum into a guided learning product without
weakening the technical depth of its source material. The experience will have
one clear entry point, four audience paths, a canonical system map, progressive
chapter summaries, a topic index, and a responsive documentation site that
renders the existing Markdown as the source of truth.

## Why This Approach

The repository already contains the necessary depth. The primary problem is
navigation and cognitive load, not missing content. A reader-experience layer
preserves the detailed chapters while letting executives, architects,
builders, and deep-study readers enter at the right level. The site will be a
thin presentation layer over the Markdown rather than a second hand-maintained
body of content.

## Key Decisions

- Markdown remains the authoritative curriculum source.
- The homepage optimizes for a one-minute explanation and one obvious next
  action per audience.
- Four paths serve Executive, Architect, Builder, and Deep Study readers.
- Every priority chapter receives a compact Quick Read block before its full
  eleven-section treatment.
- One canonical architecture map supplies the orientation shared by all paths.
- The site is multi-route, searchable, accessible, and deployable without a
  database or authentication.
- Product-specific implementation claims remain visibly separated from
  enduring architecture and future vision.
- The requested content exclusions continue to apply to the new reader
  experience and site.

## Open Questions

None block V1. Reader analytics, accounts, progress persistence, comments, and
interactive labs are deliberately deferred until the static learning journey
has been tested with readers.

## Next Steps

Implement the tracked Reader Experience V1 work item, validate it with three
reader-role walkthroughs and browser checks, then publish the documentation
site.
