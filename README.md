# Collection of Claude Code Design skills

---

## What's inside

### Design System Skills

| Skill | What it does |
|---|---|
| `ds-rename-components` | Renames layers and component properties in a Figma frame or component set following MDS naming conventions |
| `ds-create-variants` | Creates, expands, or audits component variant structures in Figma |
| `ds-assign-tokens` | Connects existing Figma component layers to MDS library text styles and semantic color tokens |

### Content Skills

| Skill | What it does |
|---|---|
| `content-write` | Writes UX copy, microcopy, error messages, empty states, CTAs, onboarding flows, and notifications for fintech/crypto apps in es_MX |
| `content-review` | Reviews written content, UI copy, and Figma designs for quality, clarity, tone, and regulatory compliance |

### Figma Index

Prebuilt component and token indexes that skills use to look up library entries without calling the Figma API each time:

- `index/web-components.md` — MDS Web Core Components
- `index/mobile-components.md` — MDS Mobile Core Components
- `index/tokens.md` — MDS Design Tokens (Base, Semantic, Component)
- `index/assets/` — Icons, flags, currencies, fiat, stocks, illustrations

### Figma Configuration

`figma.config.json` maps each MDS library to its Figma file key and index path — used by skills to resolve component and token lookups.

---

## Requirements

- [Claude Code](https://claude.ai/claude-code) installed and authenticated
- Figma MCP server connected (for skills that write back to Figma)
- Access to the Bitso MDS Figma libraries

---

## Usage

Skills activate automatically based on what you ask. Examples:

```
# Rename layers in a Figma component
ds-rename-components https://figma.com/design/...?node-id=22440-2024

# Create button variants
I need button variants for the MDS Web library

# Assign tokens to a selected component
assign tokens to this component

# Write UX copy for an error screen
write an error message for a failed SPEI transfer

# Review a flow for tone and compliance
review content https://figma.com/design/...?node-id=...
```

---
