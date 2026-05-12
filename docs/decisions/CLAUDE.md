# Decision Doc Review Guidelines

> AI agents automatically detect this file and apply it as review criteria for all files under `docs/decisions/`.
> The canonical templates live in this same folder: [`design-decision-record.md`](design-decision-record.md) and [`design-decision-alignment.md`](design-decision-alignment.md). These guidelines define the review rules that complement those templates.

## General principles

- **Alignment before record.** A `design-decision-alignment.md` captures the *open question* and the *options*. A `design-decision-record.md` captures the *decision already made*. Use the alignment doc to drive sign-off; convert to a record once decided.
- **One decision per file.** Don't bundle multiple unrelated decisions into a single doc — link related decisions via the "Related links" section instead.
- **DR-### / DA-### traces everything.** The `id` field MUST match the parent folder name (e.g., `DR-001` in `docs/decisions/DR-001-stablecoin-categorization/`) or, if the doc is a single file, the filename.
- **Privacy.** Never include personal data (medical, compensation, performance details) in decision docs. Reference roles, squads, or anonymized profiles when relevant.
- Every artifact has a YAML frontmatter block with the fields defined in the matching template.

---

## design-decision-record.md — Decision Record (DR)

The record is the **single source of truth for a decision that has already been made**. It captures what was decided, why, what we gave up, and what comes next.

### Template compliance

The canonical template is [`design-decision-record.md`](design-decision-record.md). Every Decision Record must contain:

- YAML frontmatter fields: `id`, `title`, `status`, `author`, `decided_by`, `date`, `source`, `template_version` (≥ "1.0"), `type` (must be `decision-record`)
- `status` must be one of: `draft`, `decided`, `superseded`, `reverted`
- **Quick mode is mandatory.** Every DR has Impact, Context and decision, Tradeoffs, and (optional) Follow-ups + Related links.
- **Detailed mode is conditional.** Required when the impact table flags more than one of: Business, Security, Compliance, Financial, Customer.

### Quick mode checks

- Impact table is present with at least one box checked (or all left unchecked only if "Other" applies).
- Context and decision section is 2–4 sentences, not a wall of text.
- At least one tradeoff is listed. "None" is a red flag — every real decision has tradeoffs.
- Follow-up actions, if any, have an owner and a due date.
- `source` field links to the conversation where the decision happened.

### Detailed mode checks (when triggered)

- Sign-offs table uses **RAPID** roles (Recommend, Agree, Perform, Input, Decide) — flag if a different framework is used inconsistently.
- §1 Summary includes Problem, Current approach, Proposed approach, and Out of scope.
- §2 Decision-making criteria are weighted (High / Medium / Low priority).
- §3 Trade-off table evaluates **all** approaches against **all** criteria — flag empty cells.
- §4 Recommendation is a specific option (e.g., "Option B"), not a hedge.
- §5 Next steps are actionable with clear ownership.

### Quality red flags

- Decision phrased as a question ("Should we…?") — a DR captures the answer, not the question. Use a Decision Alignment doc for open questions.
- Tradeoffs list is empty or says "none."
- Impact boxes all unchecked AND no "Other" note.
- `status: decided` but sign-off table empty in detailed mode.
- Vague language: "improve UX", "increase trust" without baseline/target.
- Personal data (medical, compensation, performance) anywhere in the doc.

---

## design-decision-alignment.md — Decision Alignment (DA)

The alignment doc is used **before** a decision is made. It frames the question, lays out options, and drives stakeholder sign-off. Once a path is chosen, archive the alignment doc and create a Decision Record.

### Template compliance

The canonical template is [`design-decision-alignment.md`](design-decision-alignment.md). Every Decision Alignment must contain:

- YAML frontmatter fields: `id`, `title`, `status`, `author`, `date`, `template_version`, `type` (must be `decision-alignment`)
- `status` must be one of: `draft`, `aligning`, `aligned`, `rejected`
- `title` phrased as a yes/no question ("Are we ready to…?", "Should we…?")
- Recommendation block at the top stating the preferred option and headline rationale
- §1 Context, §2 Options (≥ 2 options), §5 Sign-offs

### Content checks

- **Recommendation is up top, not buried.** Reviewers need to see the recommended path before reading 5 pages of context.
- **Each option includes both Arguments in favor and Arguments against.** Flag if any option is missing one of these — a doc that only lists pros for the recommended option is biased.
- **At least 2 meaningfully different options.** "Do nothing" or status quo counts as an option, but only if it's a viable path.
- **§3 (Focus / phased structure) is optional.** Required only when the recommendation is a time-bound pilot or phased transition. Skip it for one-shot decisions.
- **§4 Learning questions split operational vs. individual angles.** Helps the team know what to evaluate after the decision plays out.
- Sign-offs use RAPID and are filled in once the doc moves to `status: aligned`.

### Quality red flags

- Recommendation is missing or wishy-washy ("we should consider…").
- Only one option presented (no real alignment needed).
- Pros listed for the recommendation but not for alternatives.
- Personal data about individuals (compensation, medical, performance specifics) — describe roles and behaviors generically.
- "Arguments against" for the recommendation are empty — every option has costs.
- No success signals defined for a pilot or phased transition.

---

## Transitioning from Alignment to Record

When a Decision Alignment doc reaches `status: aligned`:

1. Create a new Decision Record (`design-decision-record.md`) with a fresh `DR-###` id.
2. Copy the chosen option's summary into the DR's "Context and decision" section.
3. Carry over the tradeoffs from the rejected options as "Tradeoffs accepted."
4. Link the original alignment doc from "Related links."
5. Update the alignment doc's `status` to `aligned` and add a link forward to the new DR.

This keeps the *why* (alignment) and the *what was decided* (record) cleanly separated and traceable.
