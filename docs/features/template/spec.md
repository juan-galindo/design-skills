---
id: F-XXX
title: <!-- Feature name -->
status: draft  # Valid values: draft | ratified | amending | deprecated
owner: @bitso/<!-- team-alias -->
phase: <!-- e.g. "Phase 1 — Mexico", or remove if single-phase -->
created: YYYY-MM-DD
last_verified: YYYY-MM-DD
template_version: "2.1"
type: feature
---

# Feature Spec: <!-- Title -->

> This is the **single source of truth** for the feature. It captures the business case, the detailed requirements, and the governance sign-off — everything an AI agent or engineer needs to understand *what* to build and *why*. Architecture and technical design live in a separate `architecture.md`.

## Sign-off

| Area | Directly Responsible Person | Sign-off Date |
|------|----------------------------|---------------|
| **Product Manager** | | |
| **Product Designer** | | |
| **Content Designer** | | |
| **Tech** | | |
| **Business Intelligence** | | |
| **Ops - Payops** | | |
| **Ops - Fraud** | | |
| **Ops - KYC** | | |
| **Ops - Strategic Alliances** | | |
| **Ops - Customer Support (CS)** | | |
| **Finance - FP&A** | | |
| **Finance - Accounting** | | |
| **Finance - Taxes** | | |
| **Finance - Treasury** | | |
| **Cybersecurity / Infosec** | | |
| **Risk** | | |
| **Legal** | | |
| **Compliance** | | |

<!-- Mark irrelevant areas N/A with a brief justification. -->

---

## 1. Business Context

> Strategic justification for this initiative. Establishes the "why" at the organizational level before diving into detailed requirements. This section is the primary input for stakeholder sign-off.

### Objective

<!-- What problem are we solving? How does this align with strategic goals? -->

**North-star metric:** <!-- Single most important metric this feature should move. Include baseline and target. -->

### Business Case (CBTM)

- **Customer**: <!-- Target persona. Pain points. Jobs-to-be-done. Emotional needs. Workarounds today. -->
- **Business**: <!-- Opportunity size. Competitive landscape. Differentiation. Cost of not doing this. -->
    - How much does price (or cost) matter to be successful?
    - Are there any trends (regulatory or not) that could become a tailwind or a headwind?
    - Is it a time-sensitive move?
    - Is it a winner-takes-all dynamic?
    - How much loyalty/switching cost should we expect?
- **Team**: <!-- Squad alignment. Capacity. Cross-team dependencies. Skills gaps. -->

### Phasing Strategy

<!-- Define phases and clarify which phase this spec covers. Remove if single-phase. -->

| Phase | Scope | Market |
|-------|-------|--------|
| **Phase 1 (this spec)** | <!-- Scope --> | <!-- Market --> |
| Phase 2 | <!-- Scope --> | <!-- Market --> |

---

## 2. Intent (The "What")

> Define **what** the feature does from the user's perspective. Each user story captures a distinct capability. Mark any ambiguity with `[NEEDS CLARIFICATION: specific question]` — never guess.

### Feature Overview

> A brief (3–5 sentence) narrative that describes the complete user experience end-to-end. This orients readers and AI agents before they dive into individual stories. Write in plain language — no implementation details.

<!-- e.g. "The AI Investment Adviser surfaces personalized buy opportunity cards in the Insights tab for Mexican users. Each day, an AI engine generates recommendations based on the user's holdings, asset class preferences, and risk profile. Users see cards with a brief rationale and can tap through to the buy flow. When the AI engine is unavailable, the system degrades gracefully using cached cards or by hiding the section entirely." -->

### Business Flows *(optional — include when the feature involves money movement, payment ramps, or complex flows that Ops/Finance/Treasury need to understand for sign-off)*

> High-level flows for stakeholder alignment. These describe *what* happens from a user/business perspective — not technical implementation. Technical data flow diagrams live in `architecture.md`.

**Money flow** (provider perspective — how funds move between parties):
<!-- ASCII or Mermaid diagram, or link to Confluence/Figma. Example: User → Bank → Provider → Bitso custody -->

**Transactional flow** (user perspective — user-visible states and history):
<!-- ASCII or Mermaid diagram. Example: User initiates → Pending → Confirmed -->

<!-- Remove this subsection entirely if flows are simple or not applicable. -->

---

### User Story 1 — <!-- Short descriptive name --> (Priority: P1)

**User Story**:
As a **<!-- Role — real user persona, not "system" -->**, I want to **<!-- Action — single concrete capability -->** so that **<!-- Benefit — outcome or value delivered -->**.

**Why this priority**: <!-- Explain why this story has this priority level. E.g. "Without this, the feature has no user-facing value." -->

**Independent Test**: <!-- Describe how this story can be tested in isolation. E.g. "Can be verified by logging in as an eligible user and confirming cards appear on the Insights tab." -->

**Acceptance Scenarios**:
1. **Given** <!-- initial state / precondition -->, **When** <!-- user action or system event -->, **Then** <!-- expected observable outcome -->.
2. **Given** <!-- initial state -->, **When** <!-- action -->, **Then** <!-- outcome -->.

<!-- Number acceptance scenarios AC-1, AC-2, ... AC-N in a single sequence across the entire spec. Each scenario must be measurable and testable. Describe observable behavior, not implementation details or specific UI elements. -->

---

### User Story 2 — <!-- Short descriptive name --> (Priority: P2)

**User Story**:
As a **<!-- Role -->**, I want to **<!-- Action -->** so that **<!-- Benefit -->**.

**Why this priority**: <!-- Rationale for priority level -->

**Independent Test**: <!-- How to test in isolation -->

**Acceptance Scenarios**:
1. **Given** <!-- state -->, **When** <!-- action -->, **Then** <!-- outcome -->.

---

<!-- Repeat the User Story block for each distinct capability. Keep each story to one sentence. Number ACs in a single sequence across the entire spec (AC-1, AC-2, ... AC-N). Assign priority P1/P2/P3 to each story. -->

### Key Entities *(optional — include when the feature introduces domain concepts)*

> Name the core domain concepts this feature introduces or depends on. Describe what each entity represents and its key attributes at a conceptual level — no database schemas or implementation details. This helps AI agents and team members build a shared domain vocabulary.

| Entity | Description | Key Attributes |
|--------|------------|----------------|
| <!-- e.g. "Recommendation" --> | <!-- e.g. "A buy suggestion for a single asset, generated periodically" --> | <!-- e.g. "Asset reference, rationale text, source signal, freshness timestamp" --> |
| <!-- e.g. "Eligible User" --> | <!-- e.g. "A user who meets all criteria to receive recommendations" --> | <!-- e.g. "Country, KYC level, wallet balance, portfolio composition" --> |

### Functional Requirements *(optional — include for system-level requirements that don't fit user stories)*

> Capture system-level or cross-cutting requirements that are not naturally expressed as user stories. These are capabilities the system MUST provide but that don't map to a single user persona performing a single action. If all requirements are covered by user stories, remove this subsection.

- **FR-1**: <!-- e.g. "The system MUST log every recommendation generation event for audit trail purposes." -->
- **FR-2**: <!-- e.g. "The system MUST rate-limit LLM calls to stay within the contracted API tier." -->
- **FR-3**: <!-- e.g. "All recommendation data MUST be retained for 90 days for compliance review." -->

---

## 3. Non-Goals

> Capabilities, use cases, or scope items that are **explicitly excluded** from this spec. Listing non-goals prevents scope creep during implementation and gives AI agents clear boundaries on what NOT to build.

- <!-- e.g. "Push notifications for new recommendations" -->
- <!-- e.g. "Sell or rebalancing recommendations (buy-only in this phase)" -->
- <!-- e.g. "Multi-country support — Phase 1 is Mexico only" -->
- <!-- e.g. "Personalization based on transaction history (only holdings + risk profile)" -->

---

## 4. Edge Cases

> Boundary conditions, error scenarios, and exceptional situations the feature must handle. Each edge case should state the condition and the expected behavior.

- **EC-1**: <!-- What happens when [boundary condition]? Expected behavior: [outcome]. -->
- **EC-2**: <!-- How does system handle [error scenario]? Expected behavior: [outcome]. -->
- **EC-3**: <!-- What if [exceptional situation]? Expected behavior: [outcome]. -->

---

## 5. Success Criteria

> How do we know this feature succeeded? Measurable business outcomes that determine whether the feature delivers its intended value. Prefer directional targets (e.g. "> 5%") over "TBD" — refine with data later.

| ID | Metric | Baseline | Target | Measurement Method |
|----|--------|----------|--------|--------------------|
| **SC-1** | <!-- North-star metric, e.g. "Users who completed a trade from recommendation" --> | <!-- e.g. 0 (new surface) --> | <!-- e.g. > 5% conversion (refine after 2 weeks) --> | <!-- e.g. Analytics attribution via source param --> |
| **SC-2** | <!-- Secondary metric, e.g. "Click-through rate on cards" --> | <!-- baseline --> | <!-- target --> | <!-- method --> |
| **SC-3** | <!-- Guardrail metric, e.g. "App engagement (DAU) must not decrease" --> | <!-- current baseline --> | <!-- Δ ≤ 0% --> | <!-- method --> |

---

## 6. Assumptions

> Things that must be true for this spec to hold. If any assumption is invalidated, the spec should be revisited. Includes business, technical, and organizational assumptions. Each must be falsifiable.

- **A-1**: <!-- e.g. "Legal/Compliance will not classify this feature as regulated financial advice in active markets." -->
- **A-2**: <!-- e.g. "The portfolio-bff service already exposes user holdings by asset class." -->
- **A-3**: <!-- e.g. "External market data APIs will remain available at current pricing tiers." -->

---

## 7. Constraints & Guardrails

> Quality expectations and boundaries. These are inputs to the architecture's full Non-Functional Requirements.

| Category | Constraint | Source |
|----------|-----------|--------|
| **Performance** | <!-- e.g. "Feature must not degrade P95 latency of existing endpoints" --> | <!-- e.g. §1 Business Context --> |
| **Engagement** | <!-- e.g. "Overall app engagement (DAU, session time) must not decrease" --> | <!-- §5 Success Criteria --> |
| **Security** | <!-- e.g. "No user PII may be sent to external providers" --> | <!-- §8 Risks --> |
| **Compliance** | <!-- e.g. "Legal-approved disclaimer required on every recommendation" --> | <!-- §8 Stakeholder Deps --> |
| **Data Freshness** | <!-- e.g. "Recommendations must reflect data no older than 4 hours" --> | <!-- §2 Intent --> |

---

## 8. Risks & Dependencies

> Threats to delivery and cross-functional dependencies that need coordination.

| Risk | Impact | Mitigation |
|------|--------|------------|
| <!-- Risk --> | High / Medium / Low | <!-- Mitigation --> |

### Stakeholder Dependencies

<!-- Which areas need to review, approve, or contribute? Note blocking vs. non-blocking. -->
- Legal & Compliance
- Operations (Fraud, CS, Pay Ops)
- Finance (Taxes, Treasury, FP&A)
- Cybersecurity / Infosec
- Marketing

---

## 9. Timeline / Milestones

| Milestone | Target Date | Status |
|-----------|-------------|--------|
| Spec sign-off | YYYY-MM-DD | Planned |
| Architecture approved | YYYY-MM-DD | Planned |
| Implementation plan approved | YYYY-MM-DD | Planned |
| Launch | YYYY-MM-DD | Planned |

---

## 10. Glossary

> Define domain-specific terms used in this spec to ensure shared understanding across teams. Remove this section if all terms are self-explanatory.

| Term | Definition |
|------|-----------|
| <!-- e.g. "Insights tab" --> | <!-- e.g. "Section of the Bitso home page that displays portfolio performance and market information" --> |
| <!-- e.g. "Signal label" --> | <!-- e.g. "Short text tag on a recommendation card indicating why the asset was recommended (e.g., 'Trending', 'Rebalancing Opportunity')" --> |

---

## 11. References

- <!-- Link to design exploration documents -->
- <!-- Link to related Confluence pages, Figma, or prior art -->
- <!-- Link to competitor analysis, market research -->

---

## 12. Changelog

> Track spec evolution over time. Every significant revision gets a row. The spec is a living document — it evolves as understanding deepens.

| Date | Change | Author |
|------|--------|--------|
| <!-- YYYY-MM-DD --> | Initial draft | <!-- @author --> |

---

## Spec Review Checklist

> Complete before requesting Spec Approval gate. Architecture has its own checklist in `architecture.md`.

### Business Context
- [ ] Objective is clear and ties to a strategic goal
- [ ] North-star metric has a specific baseline and target (directional target acceptable)
- [ ] CBTM sections (Customer, Business, Team) are substantive and non-overlapping
- [ ] Phasing strategy is defined with clear scope for this spec (or removed if single-phase)

### Intent Quality
- [ ] Feature Overview provides a 3–5 sentence end-to-end narrative
- [ ] Business Flows included when feature involves money movement, ramps, or complex flows (or subsection removed if N/A)
- [ ] Every user story uses a real user persona (not "system")
- [ ] Every user story follows "As a [role], I want [action] so that [benefit]"
- [ ] Every user story has a priority assigned (P1/P2/P3) with rationale
- [ ] Every user story has an independent test description
- [ ] Acceptance scenarios use Given/When/Then format
- [ ] Acceptance scenarios are numbered AC-1 through AC-N in a single sequence
- [ ] Every AC is measurable and testable (specific values, thresholds, or observable behaviors)
- [ ] ACs describe behavior, not implementation details or specific UI elements
- [ ] No unresolved `[NEEDS CLARIFICATION]` markers remain (or all are documented as open questions)

### Key Entities & Functional Requirements
- [ ] Key entities listed if the feature introduces domain concepts (or section removed if N/A)
- [ ] Entities describe concepts, not database schemas or implementation
- [ ] Functional requirements listed for system-level concerns not covered by user stories (or section removed if N/A)

### Non-Goals & Edge Cases
- [ ] Non-Goals section lists capabilities explicitly excluded from this spec
- [ ] Deferred features, out-of-scope use cases, and phase boundaries are documented
- [ ] Edge cases cover error states, empty states, boundary conditions, and platform differences

### Success Criteria & Constraints
- [ ] North-star metric defined with baseline and target
- [ ] Guardrail metrics defined with acceptable thresholds
- [ ] Measurement method specified for each criterion
- [ ] Assumptions are explicit and falsifiable
- [ ] Constraints & Guardrails table is populated with source references

### Risks & Dependencies
- [ ] Risk matrix includes impact assessment and mitigation for each risk
- [ ] Cross-squad dependencies identified with blocking/non-blocking classification
- [ ] Stakeholder dependency checklist reviewed (Legal, Compliance, Ops, Finance, Infosec)

### Sign-off & Traceability
- [ ] Sign-off table has named DRPs for all relevant areas
- [ ] Irrelevant sign-off areas marked N/A with justification
- [ ] Timeline milestones are realistic
- [ ] No architecture or implementation details in the spec (those belong in `architecture.md`)
- [ ] Spec `id` matches the feature folder name (`F-###`)
- [ ] Spec `owner` matches the team responsible for delivery
- [ ] Changelog has at least the initial draft entry
