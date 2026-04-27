---
name: design-visual-qa
author: juan.galindo@bitso.com
compatibility: Designed for Claude.ai and Claude Code
metadata:
  category: design-system
  tags:
    - qa
description: >
  Run a Visual QA audit comparing implemented screens against Figma designs,
  producing a structured table report per screen focused on spacing, padding,
  font styles, and horizontal insets. Use this skill whenever the user shares
  screenshots of a built implementation alongside Figma node URLs and asks to
  compare them, check if the UI matches the design, find layout issues, audit
  padding or typography, or produce a QA report for developers. Also trigger
  when the user says things like "visual QA", "check the implementation against
  Figma", "compare screens to design", "find spacing issues", or "generate a
  QA table".
---

# Visual QA — Figma vs Implementation

A skill for auditing built screens against Figma designs and producing a structured, per-screen fix list focused on padding, spacing, font styles, and horizontal insets.

> The audit logic and output format are identical on both surfaces.
> Platform differences are called out inline in Steps 1 and 4.

---

## When This Skill Applies

Trigger when:
- User shares **screenshots of an implemented UI** AND **Figma node URLs** for comparison
- User asks to find spacing, padding, or typography deviations between design and build
- User asks to produce a QA report for a developer or QA team
- User mentions "visual QA", "design vs implementation", or "check against Figma"

---

## Workflow

### Step 1 — Collect Inputs

Before doing anything, confirm you have:
1. **Implementation screenshots** — one per screen (attached as images)
2. **Figma node URLs** — one per screen, in the same order as the screenshots

**In Claude.ai**: if inputs are missing, use the `ask_user_input` elicitation tool.
**In Claude Code**: ask as plain text and wait for the reply.

Do not proceed until both are present.

### Step 2 — Fetch Figma Design Context

For each Figma URL provided, call `get_design_context` using the `fileKey` and `nodeId` extracted from the URL.

- URL format: `https://www.figma.com/design/:fileKey/:fileName?node-id=:nodeId`
- Extract `nodeId` by replacing `-` with `:` in the `node-id` param (e.g. `3-722` → `3:722`)
- Fetch all screens in parallel if possible

From the Figma context, extract:
- **Spacing tokens**: `py`, `px`, `gap`, `mt`, `mb`, `p` values on all key elements, plus `gap` between inline siblings (icon + label, badge + text, prefix + input) and `gap` between stacked elements inside cards (title + subtitle, value + caption, header + body)
- **Font tokens**: `font-family`, `font-weight`, `font-size`, `line-height` per text style
- **Horizontal insets**: wrapper `px` values, container widths, screen-edge margins
- **Component props**: `hasBorder`, `hasArrow`, padding annotations in `data-development-annotations`
- **Dev annotations**: look for `data-development-annotations` attributes — these are explicit fix instructions from the designer and must always be included

### Step 3 — Compare Against Screenshots

For each screen, visually compare the Figma screenshot (returned by `get_design_context`) against the implementation screenshot provided by the user.

Focus exclusively on:
- **Vertical padding** — are rows, cards, and sections using the correct `py` value?
- **Horizontal padding** — do elements have the correct left/right inset from the screen edge?
- **Inline spacing** — is the `gap` between inline siblings correct? Check icon-to-label, badge-to-text, prefix-to-input, and any row with horizontally stacked elements. Use `spacing/inline/*` tokens as reference.
- **Card internal spacing** — is the `gap` between stacked elements inside cards correct? Check title-to-subtitle, value-to-caption, header-to-body, and any vertically stacked content within a card or list item. Use `spacing/stack/*` tokens as reference.
- **Font family** — is PP Bitso Sans used for `action/base` (buttons, TextButtons)?
- **Font weight** — bold (700) vs medium (500) vs regular (400)
- **Font size** — correct size token (`size-300 = 14px`, `size-400 = 16px`, etc.)
- **Borders/dividers** — are `hasBorder=true` section headers rendering their 1px top divider?

Do NOT report on:
- Copy / content / localization differences (unless asked)
- Color issues (unless asked)
- Icon selection
- Interaction states beyond what's visible in the static screenshot

### Step 4 — Produce the Report

Output one markdown table per screen. Use this exact column structure:

```
| Element | Property | Figma Spec | Implementation |
```

Rules:
- One row per issue or property to verify
- **Element**: specific component or layer name (e.g. `"Cómo funciona" section header`, `Primary button "Agendar visita"`)
- **Property**: the specific CSS/design property (e.g. `Vertical padding`, `Font weight`, `Top border`, `Horizontal padding`)
- **Figma Spec**: the exact token or value from Figma (e.g. `py-12px`, `bold (700)`, `1px divider (hasBorder=true)`)
- **Implementation**: what the build shows — either a deviation (`Appears ~16px`, `Not visible`, `Text clips`) or `Verify` when it cannot be confirmed from the screenshot alone
- Never use ✅ or "Appears correct" — remove rows that have no issue or use `Verify` if uncertain
- Group button and TextButton font rows at the bottom of each screen's table
- Always include horizontal padding rows for every screen

Format each screen as:

```markdown
## Screen N — [Screen Name] `node X-Y`

| Element | Property | Figma Spec | Implementation |
|---|---|---|---|
| ... | ... | ... | ... |
```

### Step 5 — Export

If the user asks to export the report:

**File naming convention**: `visualqa-{feature-name}-{YYYY-MM-DD}.md`
- `{feature-name}`: kebab-case name derived from the screen or feature being audited (e.g. `checkout-summary`, `home-dashboard`, `onboarding-step-1`)
- `{YYYY-MM-DD}`: today's date (e.g. `2026-04-24`)
- Example: `visualqa-checkout-summary-2026-04-24.md`

If the feature name is not clear from context, ask the user for it before saving.

**In Claude.ai**: save the full report as `visualqa-{feature-name}-{YYYY-MM-DD}.md` in `/mnt/user-data/outputs/` and use `present_files` to share it.

**In Claude Code**: save the report as `visualqa-{feature-name}-{YYYY-MM-DD}.md` in the current working directory using the Write tool, then print the absolute path, e.g.:
> Report saved to: /path/to/visualqa-checkout-summary-2026-04-24.md

---

## Key Design Tokens (Bitso MDS)

Load only the token files you need — do not load the full set unless checking all three domains:

- **Colors** → `specs/tokens/color-tokens.md`
- **Spacing / radius** → `specs/tokens/spacing-tokens.md`
- **Typography / text styles** → `specs/tokens/typography-tokens.md` ← load this for every QA run (button fonts, text sizes)
- **Full index** → `specs/tokens/token-reference.md` (links to all files above)

---

## Common Issues to Always Check

These issues appear frequently across Bitso implementations — always verify them:

1. **Button font family** — Primary buttons and TextButtons use `action/base` → PP Bitso Sans Bold 700 16px. Always flag for verification.
2. **TextButton font weight** — Often renders as `regular (400)` instead of `bold (700)`.
3. **Horizontal insets** — All content wrappers use `px-16px` from screen edge. Verify for every screen.
