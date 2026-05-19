# bitso-designer (Claude Code plugin)

Reference and foundation layer for Bitso product design, plus two orchestrator agents — one for designing screens in Figma, one for building React prototypes. Foundations are backed by the existing `specs/` tree as single source of truth; orchestrators delegate step-level work to the specialized `design-*` skills.

## What this plugin is

- **A knowledge layer** — seven foundation files describing the lenses (tokens, implementation, quality, taste, composition, figma-build, rhythm) used across every design decision.
- **Three orchestrators** — each tailored to a specific output medium:
  - `figma-designer` → designs layouts and components in a Figma file (uses `use_figma`)
  - `figma-content-designer` → reviews existing text layers, proposes content suggestions, applies approved updates (uses `use_figma`)
  - `prototype-designer` → builds React code in `/Users/juangalindo/bitso-labs/design-prototyping-playground`

The orchestrators do not replace the `design-*` skills. They sequence and delegate.

## Structure

```
plugin/
├── plugin.json              Plugin manifest
├── .mcp.json                MCP servers (Lokalise PM/SD, Zeroheight)
├── README.md                This file
├── agents/
│   ├── figma-designer.md             Figma screen orchestrator (uses use_figma)
│   ├── figma-content-designer.md     Figma content orchestrator (writes copy into frames)
│   └── prototype-designer.md         React prototype orchestrator (playground repo)
├── assets/                  Reserved for static assets
├── references/
│   └── foundations/         Knowledge layer — see below
└── skills/                  Reserved for future skills
```

## Foundations

Each foundation file describes a lens to apply when designing or reviewing. Frontmatter declares whether the file is auto-loaded or loaded on-demand.

| File | Load | Lens |
|------|------|------|
| [`tokens.md`](./references/foundations/tokens.md) | Auto on `**/*.{ts,tsx}` | Valid token values across the system |
| [`implementation.md`](./references/foundations/implementation.md) | On-demand | Will the code actually work? API contracts + runtime resolution |
| [`quality.md`](./references/foundations/quality.md) | On-demand | Would a designer flag this in review? Component / severity fit |
| [`taste.md`](./references/foundations/taste.md) | On-demand | Does it feel like a Bitso surface? Hierarchy, density, whitespace |
| [`composition-recipes.md`](./references/foundations/composition-recipes.md) | On-demand | How are UI structures assembled? Layout specs ([`specs/patterns/layouts/`](../specs/patterns/layouts/)) + composition pattern specs ([`specs/patterns/scope/`](../specs/patterns/scope/)) |
| [`figma-build.md`](./references/foundations/figma-build.md) | On-demand | How to build a screen in Figma in one `use_figma` pass — Plugin API prop names, force-write text overrides, verification block |
| [`spatial-rhythm.md`](./references/foundations/spatial-rhythm.md) | On-demand | How much space between things? 48 / 24 / 12 rule |

All foundations point at the canonical specs in [`specs/`](../specs/) — never edit a token, component contract, or pattern in this plugin. Update the spec, and the foundation continues to be valid.

## Source of truth

| Domain | Canonical location |
|--------|-------------------|
| Tokens | [`specs/tokens/`](../specs/tokens/) |
| Components | [`specs/components/`](../specs/components/) |
| Patterns | [`specs/patterns/`](../specs/patterns/) |
| Content | [`specs/content/`](../specs/content/) |
| Figma catalog | [`specs/figma-catalog/`](../specs/figma-catalog/) |

## How to consume from a skill

In a skill step, reference the foundation explicitly:

```markdown
## Step N — Validate spacing
Read `plugin/references/foundations/spatial-rhythm.md` and apply the 48 / 24 / 12 rule before approving the layout.
```

For auto-loaded foundations (currently `tokens.md`), agents working on matching globs should treat the foundation as ambient context.

## Design process — where foundations apply

The 10-step Bitso design process maps to foundations as follows:

| Step | Action | Foundation |
|------|--------|------------|
| 1 | Define use cases from PRD | — (use `design-prd-to-use-cases` skill) |
| 2 | Review existing product flow | `quality.md` |
| 3 | Find references (benchmarking) | — |
| 4 | Design happy path | `composition-recipes.md`, `taste.md` |
| 5 | Pick MDS components for content | `composition-recipes.md`, `quality.md` |
| 6 | Review screen header hierarchy | `taste.md` |
| 7 | Add vertical padding between sections | `spatial-rhythm.md` |
| 8 | Stakeholder review | `quality.md`, `taste.md` |
| 9 | Implement feedback | — |
| 10 | Create edge cases | `quality.md` |
| 11 | PR to development | `implementation.md`, `tokens.md` |

## MCP servers

Bundled servers ([`./.mcp.json`](./.mcp.json)):

- **lokalise_pm / lokalise_sd** — Lokalise project management and software development APIs (requires `LOKALISE_API_KEY` in `.env`)
- **zeroheight** — Bitso design system documentation lookup (requires `ZEROHEIGHT_ACCESS_TOKEN` and `ZEROHEIGHT_CLIENT_ID`)

Figma MCP is provided by Claude Code natively and does not need to be declared here.

## Agents

### When to use which

| You want | Use |
|----------|-----|
| Design a screen / layout in Figma (final artifact = Figma file) | `figma-designer` |
| Review existing text in Figma, propose suggestions, update approved layers | `figma-content-designer` |
| Build an interactive React prototype | `prototype-designer` |
| Do a single-step task (rename layers, assign tokens, review copy without writing) | The specialized `design-*` skill directly — not an orchestrator |

### `figma-designer`

[`agents/figma-designer.md`](./agents/figma-designer.md) walks the 10-step process with **Figma as the output medium**. Always invokes `/figma-use` before any `use_figma` call. Delegates only to `design-prd-to-use-cases` (Step 1). Everything else — component creation, token assignment, naming, copy, handoff audit — is handled inline by the agent using `use_figma`, the foundations, and the `specs/` source of truth.

### `figma-content-designer`

[`agents/figma-content-designer.md`](./agents/figma-content-designer.md) runs a **review → suggest → update** loop on existing text layers in a Figma file:

1. Read every text layer structurally (no screenshots)
2. Load `specs/content/` (voice, criteria, guidelines, locale, types) + component **Text slot rules** + relevant patterns / recipes
3. Produce a per-layer **suggestion table** — `Layer · Current · Proposed · Reason (spec) · Δ chars / limit · Status`
4. Get explicit user approval per row (approve / reject / edit)
5. Apply only approved rows via `use_figma` (after `/figma-use`)
6. Self-audit currency, CTAs, capitalization, slot limits, locale consistency

No skill delegation. Locale must be confirmed before any suggestion is produced. Special focus on currency formatting for **USD and MXN**. For review-only runs (no Figma writes), points the user at the `design-content-review` skill and stops. For drafting copy from scratch with no Figma frames, routes back to `figma-designer` or to the `design-content-write` skill.

### `prototype-designer`

[`agents/prototype-designer.md`](./agents/prototype-designer.md) walks the same 10-step process with **React code as the output medium**, working in `/Users/juangalindo/bitso-labs/design-prototyping-playground`. Enforces the repo's rules: inline styles only, tokens from `src/styles/design-tokens.ts`, every component takes a `theme` prop, `tsc --noEmit` must pass before done, every new prototype registered in the `PROTOTYPES` array. Delegates to `design-prd-to-use-cases`, `design-content-write`, `design-content-review`, `dev-pr-workflow`.

### Shared step → foundation map

| Step | Foundation / skill |
|------|--------------------|
| 1 PRD → use cases | `design-prd-to-use-cases` |
| 2 Existing review | `quality.md` |
| 3 Benchmarking | Mobbin MCP / web |
| 4 Happy path | `composition-recipes.md`, `taste.md` |
| 5 Pick components | `composition-recipes.md`, `quality.md` |
| 6 Header hierarchy | `taste.md` |
| 7 Vertical padding | `spatial-rhythm.md` |
| 8 Stakeholder review | `quality.md`, `taste.md` |
| 9 Implement feedback | re-invoke any skill |
| 10 Edge cases | `quality.md` · `prototype-designer` may invoke `design-content-write` for new strings |
| 11 Ship | `figma-designer`: inline pre-handoff audit against `implementation.md` + `quality.md` · `prototype-designer`: `tsc --noEmit` + `npm run build` + `dev-pr-workflow` |

Both agents refuse to orchestrate single-step asks and point the user at the right skill instead.

## Status

`v0.2.0` — seven foundations + three orchestrators (`figma-designer`, `figma-content-designer`, `prototype-designer`). Layout specs and scope pattern specs are now enumerated with direct links in `composition-recipes.md` and `figma-build.md`.
