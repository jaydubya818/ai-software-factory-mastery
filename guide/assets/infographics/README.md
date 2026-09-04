# Infographics

Drop your infographics in this folder, named after the slot they fill:

```
guide/assets/infographics/<slot-name>.png   (or .svg / .jpg / .webp)
```

Slot names are listed in each chapter's frontmatter (`infographics: [...]`) and
marked in the text with `<!-- infographic: <slot-name> -->`. When a file with
that name exists here, the site renders it inside the slot automatically (the
placeholder note and the first-party Mermaid diagram stay underneath it).

Run `node site/scripts/list-infographic-slots.mjs` to print every slot, its
chapter, and whether an asset is present.

## Regenerating the source-derived set

From `site/`, run:

```sh
npm run infographics:generate
```

The generator treats each chapter's infographic marker, title, and accompanying
Mermaid diagram or table as the source of truth. It produces a consistent
1600×1000 PNG set with chapter metadata and fails if the expected inventory is
incomplete. The shared `release-clocks` asset intentionally covers its two
chapter references.
