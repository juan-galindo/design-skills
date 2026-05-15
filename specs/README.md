# Specs

Reference library used by skills at runtime. All design decisions, copy, and token usage should be grounded in these files.

## Folder structure

| Folder | Contents |
|--------|---------|
| `figma-catalog/` | Figma lookup tables — `mobile-components.md`, `web-components.md`, `assets/` |
| `tokens/` | Authoritative token list — always read `token-reference.md` first |
| `components/` | MDS component specs (atoms, molecules, organisms) |
| `patterns/` | Layout and composition rules |
| `content/` | UX writing guidelines, localization rules, content types — entry point: `content/index.md` |

## Adding a new spec

Copy `_template.md` to the appropriate subfolder and set `status: draft` until reviewed.
