---
id: DA-002
title: "Are we ready to sunset Zeroheight and move Design System documentation to GitHub?"
status: aligning
author: "@juan.galindo"
date: 2026-05-13
template_version: "1.0"
type: decision-alignment
---

# Decision Alignment: Are we ready to sunset Zeroheight and move Design System documentation to GitHub?

---

## Recommendation [Option A]

Move forward with sunsetting Zeroheight as the primary documentation source for the Design System and Content System, and establish GitHub (`bitso-labs/design-skills`) as the single source of truth for guidelines, component usage, tokens, content patterns, and AI-readable specifications.

This change supports a more scalable and AI-friendly documentation model and enables future agent-based workflows. Starting in `bitso-labs` gives the team time to build GitHub fluency before migrating to the `bitsoex` org.

---

## 1. Context

- **Zeroheight adoption has a structural gap.** Documentation lives in a tool that designers access occasionally and developers rarely open. It is not part of either group's natural workflow, which limits its impact.
- **AI agents need structured, machine-readable documentation.** Markdown-based repositories allow Claude Code and other agents to read specs, tokens, component rules, and contribution guidelines directly. Zeroheight's web-based format is not directly consumable by AI tools.
- **Design System maturity requires a code-adjacent model.** Documenting component states, props, variants, accessibility, content rules, tokens, and implementation guidelines is more sustainable in a repository where pull requests, version history, and review workflows already exist.
- **The `bitso-labs/design-skills` repository is already operational.** Specs, tokens, content guidelines, and skills are being written and maintained there today, which means migration is incremental rather than a greenfield effort.
- **Designer GitHub fluency is still developing.** The team needs a structured onboarding path before governance can be fully enforced.

---

## 2. Options

### 2.1 Option A - Sunset Zeroheight, establish GitHub as single source of truth [Recommended]

Deprecate Zeroheight as the primary documentation platform and redirect all new documentation to `bitso-labs/design-skills`. Existing Zeroheight content is audited, rewritten in markdown, and migrated into the repository structure. Once designers are comfortable with GitHub workflows, documentation migrates to the `bitsoex` org.

- Immediate freeze on new Zeroheight content — all new docs go to GitHub from day one.
- Audit and migration plan for existing Zeroheight content (phased, not a big-bang move).
- Contribution workflow defined: branching strategy, PR template, required reviewers.
- GitHub onboarding for non-technical contributors included in the transition plan.

**Arguments in favor**

- Closes the gap between design documentation and code. Figma, specs, tokens, and implementation guidelines live in the same ecosystem as engineering work.
- AI agents can read and act on structured markdown directly, enabling Claude Code skills, automated audits, and spec-driven generation workflows.
- Documentation quality improves through peer review: PRs require a reviewer before merging, which Zeroheight does not enforce. It could be optional.
- Reduces vendor dependency.

**Arguments against**

- GitHub workflows (cloning, branching, markdown editing, PRs) are unfamiliar to some designers. Without structured onboarding, the transition creates friction and uneven adoption.
- Migration requires auditing and rewriting existing Zeroheight content. Poorly scoped, this becomes a large, open-ended effort with no clear end state.
- Without explicit governance (owners, reviewers, contribution rules), the repository becomes outdated as quickly as Zeroheight did.
- Designers who contribute rarely may lose the thread between migrations and stop contributing altogether.

---

### 2.2 Option B - Keep Zeroheight and improve adoption

Invest in improving Zeroheight content quality and search, and run an internal campaign to increase adoption. GitHub is used only for AI-specific specs and skills, not as a documentation replacement.

**Arguments in favor**

- Lower barrier for non-technical contributors who are not comfortable with markdown.

**Arguments against**

- Zeroheight adoption has been low for structural reasons, not content reasons. Better content does not fix the workflow gap.
- AI agents cannot read Zeroheight well. This option means maintaining two parallel systems indefinitely — one for humans, one for AI.
- Vendor dependency continues. Pricing, API access, and feature roadmap remain outside the team's control.
- Does not resolve the disconnect between design documentation and engineering implementation.

---

## 3. Migration plan: phased transition

### Phase 1 - Freeze and foundation

**Scope:** Establish the GitHub contribution workflow.

- Announce the freeze: no new documentation published to Zeroheight.
- Define the `bitso-labs/design-skills` repository structure for Design System and Content System docs.
- Review the contribution workflow: branching, PR template, required reviewers, merge rules.
  - Reference: [docs/workflows](https://github.com/bitso-labs/design-skills/tree/main/docs/workflows)
- Run GitHub onboarding for all design contributors: two sessions covering clone / branch / edit / PR / merge.
- **Out of scope:** Migration of existing Zeroheight content. This phase is about stopping the bleed, not moving the past.

### Phase 2 - Audit and priority migration

**Scope:** Audit existing Zeroheight content and migrate the highest-traffic, highest-value sections first.

- Audit all Zeroheight pages: categorize as migrate, archive, or discard.
- Audit [GitHub Content System](https://github.com/bitso-labs/design-skills/tree/main/specs/content) core guidelines (voice, tone, content criteria, localization index).
- Zeroheight pages that have been migrated display a deprecation banner linking to GitHub.

### Phase 3 - Complete migration

**Scope:** Migrate remaining content, validate coverage, and transfer ownership to `bitsoex`.

- Zeroheight subscription cancelled at the next renewal date.
- Complete migration of remaining Zeroheight content or explicitly discard outdated sections.
- Zeroheight site set to read-only with a redirect message pointing to GitHub.
- Repository transferred to `bitsoex` org with finalized governance model (CODEOWNERS, PR template, review SLAs).

---

## 5. Sign-offs (RAPID)

| Person | Role (RAPID) | Date + Sign-off | Comments (optional) |
|--------|--------------|------------------|---------------------|
| Juan Galindo | Recommend | | |
| Lucía Esmeralda Pérez Carcaño | Agree | | |
| Matheus Petroni Braz | Agree | | |
| | Perform | | |
| Caroline Krone | Input | | |
| Maria de Guadalupe Magnani Blanco | Input | | |
| Maria Emilia Alegre | Input | | |
| Marina Vasconcelos Meireles Costa | Input | | |
| Diana Marcela Muñoz Ducuara | Decide | | |

---

## 6. Related links

- [Confluence page](https://bitsomx.atlassian.net/wiki/spaces/Design/pages/6623854621/DA-002+-+Are+we+ready+to+sunset+Zeroheight+and+move+Design+System+documentation+to+GitHub)
