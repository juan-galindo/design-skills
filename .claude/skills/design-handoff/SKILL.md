---
name: design-handoff
author: esmeralda.carcano@bitso.com
compatibility: Designed for Claude Code
metadata:
  category: handoff
  tags:
    - handoff
    - checklist
    - figma
    - design-review
description: >
  Audit a Figma file against the Design Handoff Checklist before a Handoff
  meeting with PM and Engineering. Use this skill whenever a user asks to audit
  a Figma file, run a handoff checklist, review a design for handoff readiness,
  check if a file is ready for dev handoff, validate a Figma file before
  engineering, or any request that mentions handoff checklist, handoff audit,
  ready for handoff, or design handoff. Also trigger when the user shares a
  Figma link and asks if it is ready or what is missing.
---

# Figma Design Handoff Audit

Audit a Figma file against the 11-category Design Handoff Checklist.

> **Compatibility**: Claude.ai (web/mobile/desktop) and Claude Code (CLI).  
> The checklist, audit logic, and PDF export are identical on both surfaces.  
> The three differences are called out inline in Steps 0, 3, and 4 below. Your output is a structured audit report that mirrors the checklist categories, with a pass/flag status per item and an overall readiness score.

## Workflow

### Step 0 — DS Inspector pre-check

Before doing anything else — even before fetching the file — ask the user:

> "Before we start, have you already run the **Design System Inspector** Figma plugin on this file?"

**In Claude.ai**: use the `ask_user_input` elicitation tool with two button options: "Yes, already run it" and "No, not yet".  
**In Claude Code**: ask as plain text and wait for the reply.

**If Yes** → proceed to Step 1 normally.

**If No** → ask a follow-up: "Do you want to continue anyway, or cancel so you can run it first?"

If they choose **continue** → proceed to Step 1, but prepend this warning to the final report:
> ⚠️ DS Inspector was not run before this audit. Some component and token checks may be less accurate.

If they choose **cancel** → stop and respond:
> No problem — run the Design System Inspector plugin first, then come back and share the Figma link to start the audit.

---

### Step 1 — Get the Figma file
- If the user provides a Figma URL, use the Figma MCP tools to fetch the file.
- If no URL is given, ask for it before proceeding.
- Load file metadata, all pages, all frames, all layers, and components.

### Step 2 — Run the audit
Go through every item in the checklist below. For each item:
- **PASS** ✅ — evidence found in the file
- **FLAG** ⚠️ — issue detected or item cannot be verified
- **N/A** — item explicitly not applicable to this file/project

Be specific: quote layer names, page names, or frame names as evidence when marking PASS. When flagging, describe exactly what's missing or wrong.

### Step 3 — Output the report

**In Claude.ai**: render the report as an **interactive HTML widget** using the `show_widget` visualizer tool. The widget includes expandable sections, color-coded status rows, and export buttons. See the contrast and color rules below.

**In Claude Code**: output the report as **formatted markdown** in the terminal using the Report Format defined at the bottom of this file. Skip the widget entirely — markdown is the output.

**Contrast rules — apply to ALL colored surfaces:**
- Section headers **collapsed**: neutral `var(--color-background-primary)` bg. Score bar uses the section's status color (green/amber/red/gray). Flag text uses the section's status color (same palette). This lets the user scan readiness at a glance without expanding.
- Section headers **open**: `background: #534AB7` (solid mid-purple). All text white `#fff`, secondary labels `#CECBF6`, bar fill `rgba(255,255,255,0.9)`, flag text `#CECBF6`.
- Each section in the data must carry a `flagColor` field for the collapsed flag text: green sections → `#0F6E56`, amber → `#BA7517`, red → `#A32D2D`, info/neutral → `var(--color-text-secondary)`
- Never use a pale tint (`#EEEDFE`, `#AFA9EC`, `#E1F5EE`, `#FAEEDA`) as a background with light-colored text — always pair light bg with dark text, or dark bg with light text
- Item rows: see status color tokens below
- Never use a pale tint background with light or muted text — always pair light bg with dark text, or dark bg with light text

The widget must include:
1. **Header band** — file name, date, verdict badge (Ready / Needs Work / Not Ready)
2. **Metrics row** — passed count, readiness %, screens audited
3. **Section summary table** — all 11 sections with score bar, score label, top flag, and a chevron (›) toggle
4. **Expandable detail rows** — clicking a section row expands it inline to show all its items with status icon (✓ / ! / — / ○), item ID, and note. Clicking again collapses it.
5. **Priority actions block** — top 3–5 items at the bottom of the card
6. **Export bar** — three buttons at the bottom:
   - "Copy as image" → client-side only: uses html2canvas to render the card and copy to clipboard (fallback: download PNG)
   - "Summary PDF ↗" → client-side only: built into the widget, no backend script needed
   - "Full report PDF ↗" → calls `sendPrompt('Export the full audit report as a PDF')` which triggers the backend script `scripts/export_pdf.py`

Item status values, icons, and accessible color pairs (background / border / text — all must meet WCAG AA contrast):
- `pass` → ✓  bg #C0DD97  border #639922  icon+id #173404  note #27500A
- `flag` → !  bg #FAC775  border #BA7517  icon+id #412402  note #633806
- `na`   → —  bg var(--color-background-secondary)  border var(--color-border-secondary)  icon var(--color-text-tertiary)  id var(--color-text-primary)  note var(--color-text-secondary)
- `info` → ○  same as na (used for accessibility section only)

Never use pale tints (#E1F5EE, #FAEEDA) as item backgrounds — they fail contrast for text in dark mode. Always use the mid-ramp fills above.

Section 9 (Accessibility) must show an info banner inside its expanded detail noting it is informational only and not counted in the score.

Load `html2canvas` from `https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js` for the copy-as-image button.

---

## The 11 Checklist Sections

### 1. Figma File (8 items)
| ID | Item |
|----|------|
| figma-location | File is located in the correct project folder |
| figma-version | Version history has clear milestone markers |
| figma-archived | Exploration/deprecated designs are archived |
| figma-devmode | Dev Mode settings are configured (if applicable) |
| figma-template | File follows the Figma Template structure |
| figma-flows | All flows & steps are correctly named |
| figma-naming | Frames, layers and groups have a descriptive name |
| figma-annotations | Behavior or interaction annotations are added |

**Audit tips:**
- `figma-location`: Check the file's project/team folder path
- `figma-version`: Check version history for named milestones (not just auto-saves)
- `figma-archived`: Look for pages/sections clearly labeled "Archive", "Deprecated", "Exploration" — if old variants exist outside of these, flag it
- `figma-flows`: Check that prototype flows are named (not "Flow 1", "Flow 2")
- `figma-naming`: Sample 10–20 layers. Flag if >20% use default names (Frame 1, Rectangle 3, Group 7, etc.)
- `figma-annotations`: Check for **Figma Dev Mode annotations** (the native annotation tool in Dev Mode). Also accept [DOC_ONLY] annotation components, sticky notes, or text blocks near frames. Dev Mode annotations are the preferred method — if the file has them, mark PASS.

---

### 2. Specifications & Documentation (3 items)
| ID | Item |
|----|------|
| specs-interaction | Interaction specs are clear (tap targets, gestures, etc.) |
| specs-conditional | Conditional logic documented (show/hide rules, permissions) |
| specs-integrations | Third-party integrations are noted |

**Audit tips:**
- Look for annotation layers, spec notes, or linked documentation frames
- Conditional logic: look for states/variants that have accompanying notes
- Integrations: check for mentions of APIs, SDKs, or external services in annotations

---

### 3. Scenarios & Touchpoints (5 items)
| ID | Item |
|----|------|
| scenarios-happy | Happy path scenarios are fully designed |
| scenarios-edge | Edge cases and error states are documented |
| scenarios-loading | Loading states and empty states are included *(optional if DS components cover them)* |
| scenarios-permissions | User permissions and role variations are covered |
| scenarios-comms | All communication touchpoints are designed (emails, push, SMS, in-app) |

**Audit tips:**
- Look for frames/pages covering: empty state, error state, loading/skeleton, success state
- Permissions: check for frames showing different user roles or permission levels
- Comms: if the flow involves triggers (signup, purchase, etc.), look for email/push designs
- `scenarios-loading` is **optional when the design system components already have built-in loading/skeleton states**. Before flagging: proactively ask the user "Are there any new custom loading states needed beyond what DS components provide?" If DS covers them, mark as ✅. Only flag if custom loaders are expected and missing.

---

### 4. UI & Interaction — Components (9 items)
| ID | Item |
|----|------|
| components-existing | Using existing design system components |
| components-new | New components documented with specs |
| components-variants | Component variants are properly configured |
| components-colors | All colors use design tokens |
| components-spacing | All spacing uses design tokens |
| components-effects | All shadows/effects use design tokens |
| components-export | All assets are set to export at correct resolutions |
| components-consistent | Component usage is consistent across all screens |
| components-states | Component states (default, hover, pressed, disabled, error) are defined |

**Audit tips:**
- Detached components or overridden components that break the design system = flag
- Colors: check for hardcoded hex values instead of styles/variables
- Export: check if icons and image assets have export settings configured
- States: look for component variants or separate frames showing all interactive states

---

### 5. Text Styling (3 items)
| ID | Item |
|----|------|
| text-tokens | All typography uses design tokens |
| text-spacing | All spacing uses design tokens |
| text-hierarchy | Text hierarchy is clear and consistent |

**Audit tips:**
- Text using raw font sizes instead of text styles = flag
- Mixed heading levels with no clear hierarchy pattern = flag

---

### 6. Page Layout (6 items)
| ID | Item |
|----|------|
| layout-alignment | Alignment is correct |
| layout-spacing | Spacing (margin/padding) are correct |
| layout-grid | All elements are aligned to a grid layout |
| layout-responsive | Responsive behavior is documented (web) |
| layout-safe-areas | Safe areas and notch considerations noted (mobile) |
| layout-scrolling | Scrolling behavior is specified |

**Audit tips:**
- Check if frames use auto layout or have grid/column guides set up
- Mobile files: look for safe area frames or notch annotations
- Scrolling: frames taller than viewport should have scroll behavior noted

---

### 7. Transitions & Microinteractions (3 items)
| ID | Item |
|----|------|
| transitions-forward | Transitions going forward specified |
| transitions-backward | Transitions going backward specified |
| transitions-ptr | Pull-to-refresh behavior documented (mobile, if applicable) |

**Audit tips:**
- Check prototype connections for named transitions (not just default "instant")
- If there are no prototype connections at all for a complex flow, flag transitions-forward

---

### 8. Content (8 items)
| ID | Item |
|----|------|
| content-typos | No typos or grammatical errors |
| content-updated | Content is up-to-date and accurate |
| content-case | Case consistency throughout (sentence case) |
| content-lokalise | Lokalise keys are finalized and documented |
| content-limits | Character limits specified for all dynamic content |
| content-errors | Error messages are clear and actionable |
| content-tooltips | Tooltips and helper text are finalized |
| content-legal | Legal/compliance review completed (if applicable) |

**Audit tips:**
- Scan visible text for placeholder content ("Lorem ipsum", "TBD", "TODO", "Copy here")
- Check for mixed case (Title Case vs sentence case in same UI context)
- Lokalise: look for annotation layer or linked doc with string key mapping
- Character limits: dynamic fields (names, addresses, descriptions) should have max-char notes
- `content-legal` **requires a proactive conversation with the user** — never auto-mark N/A. Always ask:
  1. "Does this flow require legal or compliance review?" (e.g. financial disclosures, fee notices, T&C, regulatory copy, KYC/AML notices, disclaimers)
  2. If yes → "Has legal/compliance already approved the full flow, or specific disclaimers/copy within it? If so, how is that approval documented?"
  - ✅ PASS: approval confirmed and documented (Jira ticket, comment thread, linked doc, or note in the Figma file)
  - ⚠️ FLAG: legal review is needed but approval is pending or undocumented — note that sign-off is required before the handoff meeting
  - N/A: only if the user explicitly confirms no legal/compliance review is required for this flow

---

### 9. Accessibility & Responsiveness (6 items) ⚠️ *Informational only — not counted in readiness score*

> **Note:** Accessibility items do **not** affect the overall readiness score until official accessibility guidelines are established. Audit and report them for awareness, but mark all a11y items as N/A for scoring purposes. If the team has started accessibility work, note it as a bonus positive signal.

| ID | Item |
|----|------|
| a11y-screen-reader | Screen reader navigation order is specified |
| a11y-focus | Focus order for keyboard navigation is defined |
| a11y-alt-text | Alternative text specified for all meaningful images |
| a11y-breakpoints | Responsive breakpoints designed and documented (web) |
| a11y-color | No information conveyed by color alone |
| a11y-text-scaling | Text is readable when scaled up to 200% |

**Audit tips:**
- Report these items for visibility but **do not include them in the readiness score or denominator**
- Look for accessibility annotation kits or focus order notes — if present, call it out as a positive signal
- Color-only info: check if error states use color + icon/text, not just red color
- Web files: look for multiple breakpoint frames (mobile, tablet, desktop)

---

### 10. Feedback (3 items)
| ID | Item |
|----|------|
| feedback-peer | Design has been peer-reviewed by other designers |
| feedback-critique | Design presented in Design Critique or Quality Session |
| feedback-incorporated | Feedback has been incorporated or documented as future work |

**Audit tips:**
- These are process items — check comments/threads in the file for evidence of review
- Look for resolved comment threads or a "feedback log" page/section
- If no comments exist on a complex file, flag feedback-peer

---

### 11. Collaboration (3 items)
| ID | Item |
|----|------|
| collab-access | Everyone has appropriate access to the Figma file |
| collab-threads | All comments and threads are resolved or documented |
| collab-links | Links to related documents (PRD, user research, etc.) are included |

**Audit tips:**
- Open comment threads = flag collab-threads
- Check the cover frame or a "Links" page for PRD/research references
- If sharing settings are visible, verify it's not restricted to just the owner

---

## Report Format

```
# Design Handoff Audit
**File:** [file name]
**Date:** [today]
**Overall:** X/51 items — [Ready ✅ / Needs Work ⚠️ / Not Ready ❌]

---

## Section Scores
| Section | Score | Top Flag |
|---------|-------|----------|
| Figma File | X/8 | ... |
| Specs & Docs | X/3 | ... |
| ...

---

## Full Audit

### 1. Figma File
- ✅ figma-location — File found in "Mobile / Feature X" project folder
- ⚠️ figma-naming — 8 layers with default names found (e.g., "Frame 12", "Rectangle 4")
- ...

[continue for all 11 sections]

---

## Priority Actions Before Handoff
1. **[Most critical flag]** — [what to do]
2. ...
```

---

## Report Format (Claude Code — markdown output)

Use this exact structure when outputting the report as markdown in Claude Code:

```
# Design Handoff Audit — {file name}
**Date:** {today}   **Verdict:** Ready ✅ / Needs Work ⚠️ / Not Ready ❌
**Score:** {n}/{total} items passed ({pct}%)

---

## Section scores
| # | Section            | Score  | Top flag |
|---|--------------------|--------|----------|
| 1 | Figma file         | 6/8    | ... |
| 2 | Specs & docs       | 1/3    | ... |
| 3 | Scenarios          | 5/5    | ... |
| 4 | Components         | 5/7*   | ... |
| 5 | Text styling       | 2/3    | ... |
| 6 | Page layout        | 4/6*   | ... |
| 7 | Transitions        | 1/2*   | ... |
| 8 | Content            | 6/7*   | ... |
| 9 | Accessibility      | — info | not scored |
|10 | Feedback           | 1/3    | ... |
|11 | Collaboration      | 2/3    | ... |

---

## Full audit

### 1 · Figma file
- ✅ figma-location — {evidence}
- ⚠️ figma-naming — {what is wrong}
- —  figma-devmode — N/A ({reason})

[repeat for all 11 sections]

### 9 · Accessibility (informational — not scored)
> No official a11y guidelines defined yet. Items below are for awareness only.
- ○ a11y-screen-reader — {observation}

---

## Priority actions before handoff
1. **{title}** — {description}
2. ...
```

After printing the report, offer:
> "Would you like a PDF export? Reply `full` for the complete report or `summary` for the section scores table only."

---

## Notes

- Total scored items: **51** across 10 sections (Section 9 Accessibility is informational only)
- Readiness thresholds: ≥90% = Ready ✅ | 70–89% = Needs Work ⚠️ | <70% = Not Ready ❌
- Some items (legal review, Lokalise keys, pull-to-refresh) are conditional — mark N/A if not applicable and exclude from denominator
- **Accessibility (Section 9)** is reported for awareness but excluded from the readiness score until official a11y guidelines are defined
- **Loading states (scenarios-loading)** are optional when DS components provide built-in loading/skeleton states — ask the user before flagging
- **Annotations (figma-annotations)** should check for Figma Dev Mode annotations first; [DOC_ONLY] components and sticky notes are also valid
- Always ask the user if there are specific sections to prioritize or skip

---

## Step 4 — Export options

After delivering the audit report in chat, always offer export options for the **section summary table** (the compact table with section names, score bars, and top flags) as well as the full report:

> "Would you like to export this report? You can get:
> - **Full report PDF** — complete audit with all item details and priority actions
> - **Summary table PDF** — just the section scores table, ready to attach to a ticket or share in Slack
> - **Copy summary as image** — copies the summary table to your clipboard to paste anywhere"

The widget rendered in chat already includes **"Summary PDF" and "Copy as image" buttons** — these are built into the HTML artifact and run client-side. No backend action is needed for those two.

For the **full report PDF**, use `scripts/export_pdf.py` as described below.

If the user says yes (or asks for it at any point), use the script at `scripts/export_pdf.py` to generate the PDF. Pass the audit data as a JSON string via the `--data` argument.

**How to invoke:**
```bash
python3 /path/to/handoff-audit-skill/scripts/export_pdf.py \
  --data '<audit_json>' \
  --output '/mnt/user-data/outputs/handoff-audit-<filename>.pdf'
```

The audit JSON must follow this structure:
```json
{
  "file_name": "MXN — MVP",
  "date": "April 1, 2026",
  "score": 38,
  "total": 45,
  "pct": 84,
  "verdict": "Needs Work",
  "sections": [
    {
      "title": "1 · Figma file",
      "score": "6/8",
      "flag": "Top flag description",
      "items": [
        { "status": "pass", "id": "figma-location", "note": "Evidence note" },
        { "status": "flag", "id": "figma-naming", "note": "Issue description" },
        { "status": "na",   "id": "figma-devmode", "note": "Not applicable reason" }
      ]
    }
  ],
  "priorities": [
    { "num": 1, "title": "Action title", "body": "Action description" }
  ],
  "a11y_items": [
    { "status": "info", "id": "a11y-screen-reader", "note": "Observation" }
  ]
}
```

`status` values: `"pass"` | `"flag"` | `"na"` | `"info"`

**In Claude.ai**: use `present_files` to share the PDF with the user.  
**In Claude Code**: print the absolute path to the generated PDF, e.g.:
> PDF saved to: /absolute/path/to/handoff-audit-MXN-MVP.pdf