---
name: design-prd-to-use-cases
author: juan.galindo@bitso.com
compatibility: Designed for Claude Code
metadata:
  category: product-design
  tags:
    - prd
    - use-cases
    - jtbd
    - mlp
    - prioritization
description: >
  Transforms a PRD (Product Requirements Document) into Jobs To Be Done (JTBD), structured use
  case scenarios, and MLP prioritization by revenue and frequency. Use this skill whenever a
  designer or PM shares a PRD and wants to extract use cases, map user jobs, or define the
  Minimum Lovable Product scope. Triggers on: prd to use cases, translate PRD, extract use
  cases, JTBD from PRD, start designing from PRD, use cases for design, scenarios from PRD,
  what should we design, what are the use cases, define MLP, prioritize use cases, design
  scenarios, user jobs, design from requirements. Accepts Confluence URLs, GitHub URLs,
  local .md/.pdf/.txt files, or pasted content.
---

# PRD → Use Cases

Transform a PRD into prioritized JTBD and design scenarios, ready for Figma MCP and Claude Code.

---

## Instructions

### Step 0 — Access the Document

Access the PRD from `$ARGUMENTS` or the user's message:

| Input type | How to detect | Tool to use |
|---|---|---|
| Confluence URL | `confluence.` or `/wiki/` in the URL | `mcp__atlassian__fetch` — pass the full URL to retrieve the page content |
| GitHub URL | `github.com` in the URL | `WebFetch` to retrieve the page content |
| Local file | Path ending in `.pdf`, `.md`, `.txt`, `.docx` | `Read` tool |
| Pasted content | Raw text with no URL or path | Use directly — no tool needed |

If no source is provided, ask:
> "Please share the PRD, paste a Confluence URL, drop a file path (.md or .pdf), or paste the content directly."

---

### Step 1 — Domain Detection

Infer the product domain(s) from the PRD content and state it inline — e.g. `"Detected domain: Crypto Trading"` — then continue immediately. Only pause to ask the user if the PRD contains no clear domain signal.

---

### Step 2 — Extract Jobs To Be Done (JTBD)

Read the PRD and identify the core user motivations. Don't summarize requirements — go deeper and ask: *what job is the user hiring this product to do?*

Ground each JTBD in the user segments defined in the PRD. If none are defined, infer them from context and flag as assumptions.

Each JTBD follows this structure:

> **When** [triggering situation], **I want to** [action / motivation], **so I can** [desired outcome].

List 4–8 JTBDs. For each, note:

| JTBD ID | Statement | User segment | Frequency | User tension |
|---|---|---|---|---|
| J-01 | When… I want to… so I can… | [Segment from PRD or inferred] | Daily / Weekly / Occasional | [The anxiety, doubt, or friction the user feels when this job arises — informs microcopy, reassurance design, and empty states] |

**Frequency** = how often this job comes up per active user.
**User tension** = the emotional friction at the moment the job is triggered. Use it to inform tone, helper text, and confirmation design.

If the PRD lacks enough signal on actor, frequency, or revenue, flag it as an assumption and continue — don't stop unless it would completely block prioritization.

---

### Step 3 — Use Cases

For each JTBD, write one or more concrete use cases. A use case is not a feature description — it's a story of a specific user trying to do something in a specific moment. Format each as a card.

**[Short scenario name]**

| Field | Content |
|---|---|
| **JTBD** | J-01 |
| **User** | [Segment] |
| **Scenario** | [One sentence: concrete situation that triggers this job] |
| **Entry point** | [Where in the app the user starts] |
| **Success state** | [What "done" looks like to the user — not a system state] |

**Core flow** _(what the user does and sees — not what the system does internally)_
1. …
2. …
3. …

**Edge cases** _(1–2 specific failure modes for this scenario — skip generic ones)_
- …

**Key design questions** _(open UX decisions this scenario raises — use as a starting point for explorations)_
- ?
- ?

**Suggested screen pattern** _(brief hint at the layout or interaction pattern that fits this flow)_
> [e.g. "Progressive disclosure form", "Bottom sheet with confirmation step", "Empty state with a single CTA", "Inline feedback on input"]

Repeat the card format for each use case. Group by theme if there are more than 8.

---

### Step 4 — Minimum Lovable Product Prioritization

Score each use case to determine what ships. The MLP is the smallest version of the product that solves the core job end-to-end and feels intentional — not just viable.

Score each use case internally across three dimensions on a 1–3 scale each. Sum them for an **MLP Score out of 9**. Thresholds: 7–9 = Must Ship, 4–6 = Fast Follow, 1–3 = Later. Use score as a guide, not a rule — override with a note if business context changes the ranking.

| Dimension | 1 — Low | 2 — Medium | 3 — High |
|---|---|---|---|
| **Revenue impact** | Unlikely to affect activation, retention, or monetization | Supports a revenue-related job but indirectly | Directly tied to a conversion event, fee, or key retention metric |
| **Frequency** | Occasional — used rarely or only in edge cases | Weekly — used regularly but not daily | Daily — part of the core loop; high-frequency user action |
| **MLP fit** | Nice to have; product feels complete without it | Adds noticeable value; users would notice its absence | Core to the job; without it the product feels broken or incomplete |

| Priority | Scenario | MLP Score | UX risk if deferred | Rationale |
|---|---|---|---|---|
| 🔴 Must Ship | … | 9 | [What feels broken or missing from the user's perspective if this ships without it] | … |
| 🟡 Fast Follow | … | 6 | … | … |
| 🟢 Later | … | 4 | … | … |

---

### Step 5 — Export the Output

After presenting the full output in the chat, use the `AskUserQuestion` tool to open a modal and ask the user how they want to save it:

```
Title: Where would you like to save this?
Options:
  - C — Publish to Confluence
  - F — Save this file locally
  - Both — Do both
  - Neither — Chat only, no export needed
```

Execute only what the user chose.

---

**Option C — Publish to Confluence**

Check for an existing page first: use `mcp__claude_ai_Atlassian__searchConfluenceUsingCql` to search for a page titled `[PRD Title] – Use Cases & MLP` in the Design space.

- **Page exists** — update it using `mcp__claude_ai_Atlassian__updateConfluencePage`.
- **No page found** — create a new page using `mcp__claude_ai_Atlassian__createConfluencePage` with these parameters:
  - Space key: `Design`
  - Parent page ID: `6301384782` (https://bitsomx.atlassian.net/wiki/spaces/Design/folder/6301384782)
  - Title: `[PRD Title] – Use Cases & MLP`
  - Body structured in this order:
    1. **AI disclaimer** at the very top (info panel or italic text):
       _"The content of this document was automatically produced by the Design PRD to Use Cases Agent as part of an AI-assisted design process. It is intended as a starting point for design exploration; not as a final, validated deliverable."_
    2. A **Source PRD** line with a link to the original PRD.
    3. Full output from Steps 1–4 (domain, JTBDs, use cases, MLP prioritization).

Confirm: > "Published to Confluence at [URL]."

---

**Option F — Save as file**

Save the full output as `{prd-title-kebab-case}-use-cases.md` in the current directory. Do NOT include the AI disclaimer in the local file.

Confirm: > "Saved as `{filename}.md`."

---
