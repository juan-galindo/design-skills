# Feature Artifact Review Guidelines

> AI agents automatically detect this file and apply it as review criteria for all files under `features/`.
> The canonical templates live in `features/template/`. These guidelines define the review rules that complement those templates.

## General Principles

- **Specs before code.** No implementation starts until the spec is RATIFIED.
- **Contracts before consumers.** API/event schemas are published before parallel implementation.
- **F-### traces everything.** The initiative ID connects all artifacts across all systems.
- Every artifact has a YAML frontmatter block. The `id` field MUST match the parent folder name (e.g., `F-001` in `features/F-001-name/`).

---

## spec.md — Feature Specification

The spec is the **single source of truth** for *what* to build and *why*. It must be **technology-agnostic**.

### Template Compliance

The canonical template is [`features/template/spec.md`](template/spec.md). Every `spec.md` must contain all sections defined in that template (unless the template marks them optional). Verify:

- YAML frontmatter fields: `id`, `title`, `status`, `owner`, `phase`, `created`, `last_verified`, `template_version` (≥ "2.1"), `type` (must be "feature")
- `status` must be one of: `draft`, `ratified`, `amending`, `deprecated`
- Sign-off table with all stakeholder areas (irrelevant areas marked N/A with justification)
- §1–§12 and Spec Review Checklist all present

### User Story Format (strict)

Every user story MUST follow this pattern:
- Header: `### User Story N — <Name> (Priority: P1|P2|P3)`
- **User Story**: "As a **[real user persona]**, I want to **[action]** so that **[benefit]**."
  - The role MUST be a real user persona (e.g., "Merchant", "Retail user", "Admin operator"), NEVER "system", "service", "API", "backend", or any technical actor.
- **Why this priority**: rationale
- **Independent Test**: how to test in isolation
- **Acceptance Scenarios**: numbered AC-1 through AC-N using Given/When/Then format
  - ACs numbered in a SINGLE sequence across the ENTIRE spec
  - Each AC describes **observable behavior**, not implementation

### Technology-Agnostic Enforcement (CRITICAL)

Flag as a **blocking issue** if ANY of the following appear in a spec:
- Programming languages, frameworks, or libraries (Java, Spring, React, Kafka, gRPC, REST, GraphQL)
- Database technologies or schemas (PostgreSQL, DynamoDB, Redis, "column X in table Y")
- Infrastructure references (Kubernetes, ECS, Lambda, S3, load balancers)
- API endpoint paths, HTTP methods, or status codes ("POST /api/v1/payments returns 201")
- Message queue topics or event schemas ("publish to topic X")
- Service names or microservice architecture details ("payment-service calls ledger-service")
- Cloud provider specifics (AWS, GCP, Azure services)
- Code snippets, pseudo-code, or technical algorithms
- JSON/XML/protobuf schema definitions
- Deployment strategies ("blue-green", "canary") — belong in architecture.md

**ALLOWED** technology-adjacent references:
- "API" in a business context ("Merchant API" as a product surface)
- "Webhook" as a notification mechanism concept
- "Dashboard" as a user interface concept
- Existing Bitso product names ("Merchant Dashboard", "Hubble")
- High-level integration references ("Provider X" without protocol details)

When flagging technology leakage, suggest moving detail to `architecture.md`:
- BAD: "The system publishes a Kafka event to the payments-completed topic"
- GOOD: "The system notifies downstream consumers when a payment is completed"
- BAD: "Store the transaction in a PostgreSQL table with columns: id, amount, status"
- GOOD: "The system records transaction details including amount and status"

### Content Quality Checks

- No `[NEEDS CLARIFICATION]` markers in a ratified spec
- No HTML comments with template instructions (`<!-- ... -->`) in final content
- Acceptance criteria must be testable — flag vague ACs like "system works correctly"
- Success criteria must have numbers — flag "TBD" or empty baselines/targets
- Assumptions must be falsifiable — flag always-true or untestable assumptions
- North-star metric must have both a baseline AND a target value
- Non-goals should be specific enough to prevent scope creep

### Governance Checks

- If `status: ratified`, sign-off table should have dates filled for relevant areas
- Changelog must have at least one entry

