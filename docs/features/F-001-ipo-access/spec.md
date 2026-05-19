---
id: F-001-ipo-access
title: IPO Access (Bitso México)
status: draft
owner: "@bitso/stocks-squad"
phase: Phase 1 — Mexico (USD-funded)
created: 2026-05-18
last_verified: 2026-05-18
template_version: "2.1"
type: feature
---

# Feature Spec: IPO Access (Bitso México)

> Single source of truth for *what* to build and *why*. Technology-agnostic. Architecture and integration shape with the brokerage partner live in a separate `architecture.md`.

## Sign-off

| Area | Directly Responsible Person | Sign-off Date |
|------|----------------------------|---------------|
| **Product Manager** | TBD | |
| **Product Designer** | TBD | |
| **Content Designer** | TBD | |
| **Tech** | Mateus Brandão Souza | |
| **Business Intelligence** | TBD | |
| **Ops - Payops** | TBD | |
| **Ops - Fraud** | N/A — IPO order is buy-only, USD-funded, no new fraud surface beyond existing Stocks rails | |
| **Ops - KYC** | N/A — IPO uses existing account KYC; no incremental KYC step | |
| **Ops - Strategic Alliances** | TBD | |
| **Ops - Customer Support (CS)** | TBD | |
| **Finance - FP&A** | TBD | |
| **Finance - Accounting** | TBD | |
| **Finance - Taxes** | TBD | |
| **Finance - Treasury** | N/A for Phase 1 USD-only — re-engage if MXN-funded amendment lands | |
| **Cybersecurity / Infosec** | TBD | |
| **Risk** | TBD | |
| **Legal** | TBD | |
| **Compliance** | TBD | |

---

## 1. Business Context

### Objective

Enable Bitso México retail users to subscribe to US Initial Public Offerings (IPOs) at the **offer price** — a primary-market product currently inaccessible to MX retail outside offshore brokers — via Bitso's existing brokerage-partner integration.

**Strategic intent:** establish Bitso as the first MX broker offering primary US IPO access to retail, ahead of Nu México's investing entry (12–18 month window). The strategic prize is **affluent-segment acquisition** (users currently on GBM+, Flink, or offshore brokers like IBKR / Schwab International), not direct concession revenue (structurally small at this scale).

**North-star metric:** New Bitso Stocks accounts opened with first deposit ≥ MXN 20,000 (~USD 1,000), attributable to IPO Access marketing or referral, retained as MAU 90 days post-first-trade.

- **Baseline:** `[OPEN-BI-1]` — BI to provide current quarterly rate of new Stocks accounts with first deposit ≥ MXN 20K.
- **Target (90-day post-GA):** +50–250 net-new affluent accounts (conservative base case).
- **Target (12-month):** +200–1,000 net-new affluent accounts.

### Business Case (CBTM)

- **Customer**: Aspirational affluent MX retail (28–45, MXN 50K–500K liquid savings). Currently uses GBM+ or Flink for MX equities and offshore brokers for US exposure. Follows US tech IPOs in financial press and feels excluded from offer-price access. Pain: "by the time I can buy on Flink / GBM, the stock has already popped 30%+." Job-to-be-done: "When a company I follow goes public, I want to invest at the offer price so I can participate in the deal — not buy after the pop." Estimated segment size: 20–50K IPO-curious affluent users in MX. Secondary segment: existing Bitso Stocks top-decile users (avg balance USD 2.4K, ~3,800 users) — wallet-share deepening, not base expansion.

- **Business**: Opportunity is dual — small direct concession revenue (USD 15K–100K, base 2026) plus large LTV uplift from affluent acquisition (USD 40K–500K). Moat is timing, not exclusivity — no regulatory or contractual barrier to other MX brokers entering. Crypto-native brand provides an "expanding access" narrative competitors lack. Price/fees are a secondary lever — this is an access product, not a price-sensitive product.
    - **Price sensitivity:** Low. Users who care about IPOs are willing to commit capital.
    - **Trends:** Tailwind — US IPO market reopened 2024–2025; retail share-of-deal trending up (10% → 20–30% on some deals). Headwind — peer-reviewed evidence that retail-access IPOs underperform peer IPOs by ~20pp at 1 year ([Gempesaw et al. 2025](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4961899)); once cited in MX press, becomes a customer-experience and regulatory talking point.
    - **Time sensitivity:** Medium. Nu México's investing roadmap is the clock — 12–18 months before a credible MX competitor enters. No hard deadline.
    - **Winner-takes-all:** No. Users hold accounts at multiple platforms to maximize allocation odds. Being first matters for brand; being only does not.
    - **Loyalty / switching costs:** Mild. Better thought of as an acquisition magnet than a retention tool.

- **Team**: Stocks squad mission is to build the core stocks platform that drives adoption and long-term value for Mexican investors. IPO Access expands the asset class, deepens the brokerage-partner integration, and addresses an underserved affluent segment. Approach: reuse over build (existing brokerage pipe, existing notional-order infrastructure, existing SDUI surfaces); truth-first disclosure of the underperformance evidence (positioned as a moat, not a footnote); affluent-acquisition motion paired with Marketing.

### Phasing Strategy

| Phase | Scope | Market |
|-------|-------|--------|
| **Phase 1 (this spec)** | USD-only IPO discovery, eligibility flow, indication-of-interest order, modification window, allocation handling, T+2 settlement display, push notifications, Hubble admin tooling | Mexico (Bitso México retail with USD-funded accounts) |
| Phase 2 | MXN funding with auto-FX conversion at order time | Mexico (broader retail) |
| Phase 3 | Dedicated IPO Hub — discovery surface, history, upcoming deal calendar, education | All Stocks users |
| Phase 4 | Pre-registration / advance indication-of-interest before offering goes live | All Stocks users |

> An MXN-funded **Phase-1 amendment** is under review. If accepted, it will modify the Calculator and the allocation refund experience. See §6 Assumptions (A-7) and §8 Risks. Phase 1 as scoped here remains USD-only.

---

## 2. Intent (The "What")

### Feature Overview

IPO Access lets eligible Bitso México users discover live US IPO offerings (surfaced on the Home screen, in the Markets section, and via Search), read the deal details including the legally-required prospectus, attest one-time eligibility under FINRA Rule 5130/5131, place a USD-denominated notional indication-of-interest order with min/max/step validation, modify or cancel during the brokerage partner's defined modification window, and receive a clear allocation outcome — full, partial with refund, or zero. Pending IPO orders appear in a dedicated Portfolio section separate from regular holdings; on the trade date the allocated position migrates to the regular portfolio under the live ticker, with T+2 settlement gating withdrawability. Customer Support and Pay Ops resolve customer tickets through Hubble, with a dedicated IPO order view. When no offering is live (the steady state — approximately 5 deals/year), the entire IPO surface is invisible across all entry points.

### Business Flows

**Money flow** (user's perspective — funds movement during a typical IPO order, Phase 1 USD-only):

```
                     ┌─ Order placed ─┐     ┌─ Modification ─┐     ┌─ Allocation ─┐     ┌─ Trade date / T+2 ─┐
USD in user wallet ─►│ USD locked     │ ──► │ window opens   │ ──► │ Full:  USD   │ ──► │ Position settles    │
                     │ against order  │     │ (modify/cancel │     │ → shares     │     │ Shares withdrawable │
                     └────────────────┘     │ allowed)       │     │ Partial:     │     │                     │
                                            └────────────────┘     │ USD → shares │     └─────────────────────┘
                                                                   │ + USD refund │
                                                                   │ Zero:        │
                                                                   │ Full refund  │
                                                                   └──────────────┘
```

**Transactional flow** (user-visible states a pending IPO order moves through):

```
Submitted ─► Pending (waiting for window) ─► Modification window open ─► Window closed ─► Allocated (full / partial / zero) ─► Trade date / Live ─► Settled (T+2)
                                                       │                                               │
                                                       └─► Cancelled by user                           └─► Offering cancelled by issuer (refund)
```

> Refunds (partial allocation, zero allocation, offering cancellation) always return USD to the user's USD wallet — no automatic reverse conversion to MXN.

---

### User Story 1 — Discovering a live IPO offering (Priority: P1)

**User Story**:
As a **retail user following US IPO news**, I want to **discover when an IPO is currently open for subscription on Bitso** so that **I can act within the short subscription window without hunting**.

**Why this priority**: Without discovery, the product is invisible — the affluent acquisition north-star metric cannot move. Discovery surfaces are the top of the funnel.

**Independent Test**: With a test offering set to `available`, verify the Home banner, Markets IPO carousel, and Search "IPO" badge all surface the offering; then with the offering set to `not_available`, verify all three entry points disappear.

**Acceptance Scenarios**:

1. **AC-1**: **Given** at least one IPO offering with availability "available", **When** an eligible user opens the Home screen, **Then** a featured-IPO banner is displayed showing company logo, company name, expected price range, and trade date, with a "Learn More" call-to-action that opens the IPO Detail page.
2. **AC-2**: **Given** no IPO offering currently has availability "available", **When** a user opens the Home screen, the Markets section, or performs a Search, **Then** no IPO banner, no IPO carousel, and no IPO tag appears anywhere in the app — the entire IPO surface is invisible.
3. **AC-3**: **Given** at least one available offering, **When** a user searches for the issuer name, **Then** a result row appears tagged with an "IPO" badge and a category filter ("All / Stocks / ETFs / IPOs") is available on the results screen.

---

### User Story 2 — Reviewing the offering before deciding to invest (Priority: P1)

**User Story**:
As a **retail user evaluating an IPO**, I want to **read the company information, expected price range, the legally-required prospectus, the trade and settlement dates, and how allocation works** so that **I can make an informed decision before committing capital**.

**Why this priority**: The prospectus prominence requirement (AC-5) is a legal blocker — the feature cannot ship without it. Without informed-decision content, downstream funnel quality collapses and the underperformance guardrail risk materializes.

**Independent Test**: Open the IPO Detail page for a test offering; verify each information block renders; verify the Invest call-to-action is disabled in the three states defined (unavailable, post-window, account not in good standing).

**Acceptance Scenarios**:

4. **AC-4**: **Given** the user is on the IPO Detail page for a live offering, **When** the page renders, **Then** the page displays company logo, company name, expected ticker, collapsible description, expected price range as a static range (not a live quote), minimum / maximum / step investment amounts, expected trade date, settlement date with a T+2 explainer, underwriters list, and a "How allocation works" disclosure that explains full / partial / zero outcomes.
5. **AC-5** *(CRITICAL — legal blocker)*: **Given** the user is on the IPO Detail page, **When** the page renders, **Then** the prospectus link is displayed above the Invest call-to-action, labelled "Required reading before investing", with an icon indicating an external document; tapping it opens the prospectus document; an analytics event recording prospectus-view is emitted with offering reference, user identifier, and timestamp.
6. **AC-6**: **Given** the offering's prospectus document is unavailable, **When** the Detail page renders, **Then** the Invest call-to-action is disabled and the page shows "Prospectus unavailable — please try again later".
7. **AC-7**: **Given** the offering's availability has flipped away from "available", or the modification window has opened, **When** the Detail page renders, **Then** the Invest call-to-action is disabled with explainer copy ("Order window closed" or "Offering not available").
8. **AC-8**: **Given** the user's account is not in good standing (anti-money-laundering hold or trading-restricted), **When** the Detail page renders, **Then** the Invest call-to-action is disabled with explainer copy and a path to contact Customer Support.

---

### User Story 3 — Confirming eligibility before the first IPO order (Priority: P1)

**User Story**:
As a **first-time IPO subscriber on Bitso**, I want to **confirm one time that I am not a restricted person under FINRA Rule 5130/5131, that I understand the flipping policy, and that I acknowledge IPO investment risk** so that **I am formally eligible to place orders without re-confirming on every deal**.

**Why this priority**: All three checkpoints are CRITICAL — required by Legal and Compliance before any order can be accepted. Eligibility drop-off is a guardrail metric (30% trigger).

**Independent Test**: As a test user with no prior eligibility record, tap Invest from any IPO Detail page; verify the three checkpoints render unchecked with a disabled "I agree" action; check all three and verify the eligibility record is persisted before navigating to the Calculator.

**Acceptance Scenarios**:

9. **AC-9**: **Given** a user has not previously confirmed eligibility, or the eligibility terms version has changed since their last confirmation, **When** they tap Invest on any IPO Detail page, **Then** the eligibility flow is shown with three checkpoints unchecked (Restricted Person under FINRA Rule 5130/5131, Flipping Policy awareness, IPO Risk understanding), the "I agree" action is disabled, and the user cannot proceed to the Calculator.
10. **AC-10** *(CRITICAL)*: **Given** the user opens the "Risk understanding" learn-more disclosure, **When** the disclosure renders, **Then** it includes Compliance-approved disclosure of academic underperformance evidence that retail-access IPOs underperform peer IPOs by approximately 20 percentage points at one year (final wording per `[OPEN-LEGAL-1]`).
11. **AC-11**: **Given** all three checkpoints are checked, **When** the user taps "I agree", **Then** an eligibility audit record is persisted — user identifier, confirmation timestamp in UTC, eligibility terms version, source IP address, source user-agent — **before** navigating to the Calculator; if persistence fails, the user is held on the eligibility screen and shown a retry path.
12. **AC-12**: **Given** the user has previously confirmed eligibility for the current terms version, **When** they tap Invest, **Then** the eligibility flow is skipped and the Calculator opens directly.
13. **AC-13**: **Given** the current eligibility terms version differs from the user's most recent confirmation, **When** they tap Invest, **Then** the eligibility flow is shown again with all three checkpoints unchecked; the prior confirmation record is retained (not overwritten) and a new record is created on confirmation.

---

### User Story 4 — Sizing the order in the IPO Calculator (Priority: P1)

**User Story**:
As an **eligible IPO subscriber**, I want to **enter my investment as a USD amount, see an estimated share range based on the price band, and receive clear feedback if my amount violates min, max, or step** so that **I can commit capital with realistic expectations and without trial-and-error**.

**Why this priority**: Notional-only input is the core conversion surface and drives average-order-value (target USD 300 → USD 500). Step-size errors are a known friction source.

**Independent Test**: On the Calculator screen for a test offering with min $100, max $10,000, step $50, enter $475 (step violation) and verify the inline error suggests $450 and $500; enter $500 and verify the estimated share range computes correctly from the price band.

**Acceptance Scenarios**:

14. **AC-14**: **Given** the user is on the Calculator screen, **When** the screen renders, **Then** a USD amount input is shown (no share-quantity input), the static price range is displayed, the helper line shows "Min $X • Max $Y • Step $Z", and a persistent allocation disclaimer is visible above the action ("Final allocation may vary — full, partial, or zero is possible").
15. **AC-15**: **Given** the user enters a USD amount, **When** the input loses focus, **Then** the amount is validated against the offering's min, max, and step rules; on invalid amount the action is disabled and an inline error states the violated rule and suggests the two nearest valid amounts (for example, "Try $500 or $550").
16. **AC-16**: **Given** the user enters a valid USD amount, **When** the amount changes, **Then** the screen updates an estimated share range based on the price band (for example, "Estimated Shares: 23 — 27") in real time.
17. **AC-17**: **Given** the user is replacing an existing pending order, **When** the Calculator opens, **Then** the input pre-fills with the current order amount and an indicator displays "Current order: $X" above the input.

---

### User Story 5 — Confirming and submitting an IPO order (Priority: P1)

**User Story**:
As an **eligible IPO subscriber with a valid amount entered**, I want to **review a summary of my order including the prospectus reminder, the estimated share range, the trade and settlement dates, and an allocation explainer, then submit my order** so that **I commit consciously and know what to expect next**.

**Why this priority**: Order submission is the conversion event. Without it there is no funnel.

**Independent Test**: From the Calculator with a valid amount, tap Continue; on the Confirmation screen, tap Confirm Order; verify the order appears in Portfolio under "IPO Orders (Pending)" and the user lands on the IPO Order Status screen.

**Acceptance Scenarios**:

18. **AC-18**: **Given** the user is on the Confirmation screen, **When** the screen renders, **Then** it displays the investment amount, estimated share range, trade date, settlement date with a T+2 indicator, fee breakdown, a prospectus reminder link, a "How allocation works" reminder, and a primary "Confirm Order" call-to-action.
19. **AC-19**: **Given** the user taps Confirm Order, **When** submission succeeds, **Then** the order is recorded with status "submitted", the user is navigated to the IPO Order Status screen, and the order appears in Portfolio under "IPO Orders (Pending)".
20. **AC-20**: **Given** the user already has an open order for this offering on this account, **When** they tap Confirm Order, **Then** submission is rejected and the screen shows "You already have an order for this offering — replace it instead" with a deep-link to the existing order.

---

### User Story 6 — Modifying or cancelling within the modification window (Priority: P1)

**User Story**:
As a **user with a pending IPO order**, I want to **modify or cancel my order during the brokerage partner's defined modification window** so that **I can adjust my commitment if final pricing or my own conviction has changed before the order becomes binding**.

**Why this priority**: The modification window is contractually mandated by the brokerage partner; surfacing it incorrectly creates regulatory and customer-experience exposure. Cancel-rate above 40% is a guardrail trigger.

**Independent Test**: With a pending order for a test offering, force the modification-window-open event; verify the push notification fires, the IPO Order Status screen shows a countdown and enabled Replace and Cancel actions; force the window-close event and verify both actions disable within 5 seconds.

**Acceptance Scenarios**:

21. **AC-21**: **Given** the modification window has opened for an offering and the user has a pending order on it, **When** the event arrives, **Then** a push notification is sent ("Your modification window is open. You have 60 minutes to change or cancel your [Company] order"), and on the IPO Order Status screen Replace and Cancel actions are enabled with a live minutes-and-seconds countdown computed from the window's expiration time.
22. **AC-22**: **Given** the countdown reaches zero, or the allocation event has fired, **When** the IPO Order Status screen is open, **Then** Replace and Cancel actions are disabled within 5 seconds and the explainer copy updates to "Modification window closed".
23. **AC-23**: **Given** the user taps Cancel, **When** the brokerage partner reports the window has already closed, **Then** the screen shows a non-blocking error and refreshes the order state from the authoritative order endpoint to reflect the current status.
24. **AC-24**: **Given** the user is viewing the Stock Detail page for an IPO with a pending order during the modification window, **When** the page renders, **Then** Buy and Sell are hidden, Replace and Cancel actions are shown, and an inline banner displays the remaining countdown.

---

### User Story 7 — Receiving and understanding the allocation result (Priority: P1)

**User Story**:
As a **user with a binding IPO order**, I want to **see the allocation outcome — full, partial with refund, or zero — explained clearly, with the final price and refund destination** so that **I trust the outcome and can plan next steps without confusion**.

**Why this priority**: The allocation moment defines whether the user comes back for the next deal or churns. Zero and partial states must feel intentional, not broken.

**Independent Test**: Trigger an allocation event in each variant (full, partial, zero, offering-cancellation) against a test order; verify the push notification fires with the correct copy and the IPO Order Status screen reflects the correct state.

**Acceptance Scenarios**:

25. **AC-25**: **Given** an allocation event arrives with allocated shares equal to the implied share count, **When** the user opens the IPO Order Status screen, **Then** the screen shows allocated shares, final price, total allocated USD, and the message "Shares will appear in your portfolio on trade date".
26. **AC-26**: **Given** an allocation event arrives with allocated shares greater than zero but less than the ordered notional implies, **When** the user opens the IPO Order Status screen, **Then** the screen shows allocated shares, final price, total allocated USD, refund amount (ordered notional minus allocated amount), refund destination (USD wallet), and a plain-language explanation of why allocation was partial.
27. **AC-27**: **Given** an allocation event arrives with allocated shares equal to zero, **When** the user opens the IPO Order Status screen, **Then** the screen shows "Your order was not allocated. Your $X has been returned to your USD wallet" with the original notional, refund destination, and a non-pejorative tone.
28. **AC-28**: **Given** an offering-cancellation event fires before any allocation event for the user's order, **When** the user opens the IPO Order Status screen, **Then** the screen shows "[Company] withdrew the offering. Your $X has been returned to your USD wallet" framed neutrally (not as a failure), and a push notification with the same framing has been delivered.

---

### User Story 8 — Tracking pending and allocated IPO state in Portfolio (Priority: P1)

**User Story**:
As a **user with one or more pending or allocated IPO orders**, I want to **see them in a dedicated Portfolio section separate from my regular holdings** so that **I can track the multi-day cycle without confusing IPO orders with normal stock positions**.

**Why this priority**: Without a separate section, T+2 confusion drives customer-support tickets ("why can't I sell my shares?"). The forecast is approximately 1,500 IPO tickets per deal at scale.

**Independent Test**: Submit a pending order; verify it appears in a section labelled "IPO Orders (Pending)" with the total pending amount; force allocation and trade-date events; verify the position migrates out of the IPO Orders section and into the regular portfolio under the live ticker.

**Acceptance Scenarios**:

29. **AC-29**: **Given** the user has one or more pending IPO orders, **When** they open Portfolio, **Then** an "IPO Orders (Pending)" section is shown above or below regular holdings with the total pending USD amount and one card per order showing company name, amount invested, status badge, and estimated share range.
30. **AC-30**: **Given** the user taps an IPO order card, **When** the navigation completes, **Then** the IPO Order Status screen for that order is opened.
31. **AC-31**: **Given** an IPO order has been allocated and the offering's trade date has been reached, **When** the user opens Portfolio, **Then** the allocated position has migrated from the "IPO Orders (Pending)" section into the regular portfolio under the live ticker, with T+2 settlement gating withdrawability; on the Stock Detail page for that ticker, standard Buy and Sell actions are now available.

---

### User Story 9 — Resolving an IPO customer ticket in Hubble (Priority: P1)

**User Story**:
As a **Customer Support or Pay Operations agent**, I want to **see a customer's IPO order with offering details, modification-window status, allocation outcome, and eligibility confirmation in one place inside Hubble** so that **I can resolve incoming tickets without escalating to Tech**.

**Why this priority**: At a forecast 1,500 tickets per deal, CS cannot operate blind. Without Hubble tooling, every ticket escalates — operational load becomes unsustainable.

**Independent Test**: Open Hubble, filter orders by IPO asset class, open a test user's order, verify the four panels (Offering, Modification Window, Allocation, Eligibility) all populate.

**Acceptance Scenarios**:

32. **AC-32**: **Given** an agent opens the Hubble orders view, **When** they apply the "IPO" asset-class filter, **Then** only IPO orders are returned and each row indicates the offering, the user, and the current status.
33. **AC-33**: **Given** an agent opens an IPO order, **When** the order detail renders, **Then** four grouped panels are shown: Offering (company, price range, trade date, availability), Modification Window (open and close timestamps, current state), Allocation (allocated shares, final price, refund amount if any), and Eligibility (confirmation timestamp, terms version, source IP).
34. **AC-34**: **Given** an agent performs an admin action to revoke or reset a user's eligibility, **When** the action completes, **Then** the user's next Invest tap re-shows the eligibility flow; a new audit record is created on next confirmation; the prior record is retained.

---

### Key Entities

| Entity | Description | Key Attributes |
|--------|------------|----------------|
| **IPO Offering** | A single live or upcoming primary-market IPO sourced from the brokerage partner | Issuer name, expected ticker, price range, minimum / maximum / step ticket size, expected trade date, settlement date, prospectus document reference, underwriters, availability state |
| **Indication-of-Interest Order (IOI)** | A buy-only, notional-only USD order placed by a user against an IPO offering before allocation | User, offering, ordered notional USD, status (submitted / window-open / window-closed / allocated / cancelled / refunded), placement timestamp |
| **Allocation Result** | The brokerage partner's per-account outcome for a given IOI | Order reference, allocated shares (may be zero), final price, total allocated USD, refund amount, refund destination |
| **Eligibility Record** | A persisted attestation by a user across the three FINRA / risk checkpoints | User identifier, confirmation timestamp (UTC), eligibility terms version, source IP, source user-agent |
| **Modification Window** | A bounded period during which a user may replace or cancel a pending IPO order | Offering reference, opens-at timestamp, expires-at timestamp, current state |

### Functional Requirements

- **FR-1**: The system MUST record every eligibility confirmation as an immutable audit record retained for at least 7 years (final retention per `[OPEN-LEGAL-3]`).
- **FR-2**: The system MUST emit analytics events for prospectus-viewed, eligibility-confirmed, order-submitted, order-modified, order-cancelled, allocation-received, and refund-issued — each carrying offering reference, user identifier, and timestamp.
- **FR-3**: The system MUST provide a platform-wide visibility kill-switch that hides the IPO surface across Home, Markets, and Search within 5 minutes of being toggled, and a per-offering kill-switch independent of the brokerage partner's availability flag.
- **FR-4**: The system MUST provide a cohort-gating mechanism that exposes the IPO surface only to a defined subset of users (used for the closed-beta phase).
- **FR-5**: The system MUST treat the brokerage partner's modification-window-open event as the authoritative signal for window state and reconcile against the authoritative order endpoint when the live event stream is degraded.

---

## 3. Non-Goals

- **MXN-funded IPO orders with auto-conversion at order time** — deferred to Phase 2 (or a Phase-1 amendment currently under review).
- **Follow-on / secondary offerings** of already-listed companies (FPOs).
- **Direct listings, SPACs, ADRs** treated as IPO product.
- **Pre-IPO or venture-fund-style products** (for example, retail venture-fund equivalents).
- **Allocation policy or quality gating** — selling-group decisions remain the brokerage partner's responsibility.
- **Share-quantity input on the Calculator** — Phase 1 is notional-USD only.
- **Sell orders during the modification window** — buy-only.
- **Greenshoe / over-allotment handling.**
- **Pre-registration / advance indication-of-interest before an offering goes live** — Phase 4.
- **IPO Hub** (dedicated discovery surface, calendar, history, education) — Phase 3.
- **Advanced filtering and sorting on the Markets IPO carousel** — Phase 3.
- **Multi-country expansion** — Phase 1 is Mexico only.

---

## 4. Edge Cases

- **EC-1 — No live offerings (steady state)**: When no offering has availability "available", the Home banner, Markets carousel, and Search "IPO" badge are all hidden; the entire feature is invisible. Expected behavior: no empty state, no ghost surface.
- **EC-2 — Offering becomes unavailable mid-flow**: If availability flips to "not_available" or "closed", or the modification window opens, while the user is on Detail, Calculator, or Confirmation, an inline notice is shown and the next-step action is disabled. Expected behavior: never silently fail at submit.
- **EC-3 — Offering cancelled by issuer**: All open orders are auto-rejected and refunded; push notification is sent framed non-negatively. Expected behavior: user sees "[Company] withdrew the offering. Your $X has been returned".
- **EC-4 — Modification window missed**: Modify or cancel attempts after window close return a window-closed error. Expected behavior: friendly inline error and refresh of order state from the authoritative endpoint.
- **EC-5 — Partial allocation**: Display allocated shares, final price, refund amount, and refund destination, with a plain-language explanation of partial outcome.
- **EC-6 — Zero allocation**: Display "Your order was not allocated. Your $X has been returned to your USD wallet" — non-pejorative tone, refund destination explicit.
- **EC-7 — Final price outside the original range**: Display the actual final price (not the original range) in both the allocation push and the IPO Order Status screen.
- **EC-8 — Step-size or min/max violation**: Inline error with the violated rule, plus two suggested nearest valid amounts (for example, "Try $500 or $550").
- **EC-9 — Account not in good standing**: Bitso's existing internal account-status check hides the IPO surface for accounts that are not open, are anti-money-laundering blocked, or are trading-restricted.
- **EC-10 — Live event stream drops during the modification window**: Reconcile order state via the authoritative order endpoint; if the live stream cannot be re-established within 30 seconds during an active window, a degraded-experience banner is shown.
- **EC-11 — Insufficient USD balance at order time**: Block at validation using the existing notional-balance check; surface a path to add USD funds.
- **EC-12 — User attempts to withdraw USD that would leave balance below a pending IPO order's notional**: Block via the existing reserve-of-funds pattern.
- **EC-13 — Duplicate order attempt on the same offering by the same account**: Surface "You already have an order for this offering — replace it instead" with a deep-link to the existing order.
- **EC-14 — Account in middle of MXN-to-USD conversion when the modification window opens**: Submission is blocked post-window; the conversion completes but the user must wait for the next offering. A push notification explains the timing miss.

---

## 5. Success Criteria

| ID | Metric | Baseline | Target | Measurement Method |
|----|--------|----------|--------|--------------------|
| **SC-1** | Affluent acquisition north-star — new Bitso Stocks accounts with first deposit ≥ MXN 20K attributable to IPO Access, retained MAU at 90 days | `[OPEN-BI-1]` — quarterly rate of new accounts ≥ MXN 20K first deposit, pending from BI | +50–250 at 90 days post-GA · +200–1,000 at 12 months | Analytics attribution via source parameter on account creation; BI dashboard with cohort retention at 90 days |
| **SC-2** | Secondary north-star — IPO participation rate — percent of Monthly Trading Users placing ≥ 1 IPO order in calendar months with ≥ 1 live offering | New product (no baseline) | 5–10% at 90 days · 10–20% at 12 months | Analytics on order-submitted events divided by MTU in months with `availability=available` |
| **SC-3** | IPO order conversion rate — Detail-page views to confirmed orders | New product | ≥ 8% at 90 days · ≥ 12% at 12 months | Analytics funnel: Detail-page-viewed → order-submitted |
| **SC-4** | Average order value per offering | New product | ≥ USD 300 at 90 days · ≥ USD 500 at 12 months | Mean of ordered notional USD on submitted orders per deal |
| **SC-5** *(guardrail)* | 1-year cohort return delta — median 1-year return of users whose first stock purchase was an IPO vs. matched cohort whose first purchase was a stock or ETF | New product | Trigger if delta < −10pp after 3rd allocated deal | BI cohort analysis; if triggered, pause new offerings and re-scope |
| **SC-6** *(guardrail)* | Order cancellation rate during the modification window | New product | < 40% per deal | Analytics on order-cancelled events / orders entering window |
| **SC-7** *(guardrail)* | Eligibility-confirmation drop-off rate at any single checkpoint | New product | < 30% drop at any single checkpoint | Analytics funnel across the three checkpoints |
| **SC-8** *(guardrail)* | Customer Support ticket volume tagged "IPO" / "OPI" per deal | Existing level-upgrade tickets ~1,200 per deal at comparable scale | < 1,500 per deal | CS ticket-tagging dashboard |
| **SC-9** *(guardrail)* | Live event stream uptime during US market hours | New surface | ≥ 99.0% over rolling 7-day window | Operational monitoring; if breached, degrade IPO surface to read-only until restored |

---

## 6. Assumptions

- **A-1**: The brokerage partner's IPO offering pipeline will surface at least 3 viable Tier-2 deals in the first 12 months (Cerebras, Discord, Strava as current candidates). If fewer than 2 deals reach the user-facing surface in the first 12 months, the affluent-acquisition north-star becomes unfalsifiable and the strategic case must be revisited.
- **A-2**: Brokerage-partner enablement is at the correspondent (instance) level — once Bitso's correspondent is approved for IPOs, every Bitso account in good standing is eligible by default. No per-account enablement call is required.
- **A-3**: The brokerage partner does not impose jurisdictional pre-conditions on MX accounts beyond Bitso's existing account-good-standing check; FINRA Rule 5130/5131 restricted-person attestation is captured via the in-app eligibility flow.
- **A-4**: Legal and Compliance will approve disclosure copy referencing the academic underperformance evidence (Gempesaw et al. 2025) in the eligibility "Risk understanding" learn-more disclosure. If Compliance disallows this disclosure entirely, the "truth-first" positioning falls away and the brand narrative is revisited.
- **A-5**: The current Operations Reports CNBV pipeline can either accommodate primary-market IPO subscriptions as an event type without schema changes, or a parallel pipeline can be stood up before launch.
- **A-6**: There is no revenue share with the brokerage partner on IPO concessions. The commercial alignment is on enablement and deal access, not on margin.
- **A-7**: Phase 1 ships USD-only. If the MXN-funded amendment is accepted before design completes, AC-14 through AC-17 and AC-26 through AC-28 will be revised; the change is bounded but material and is treated as a scope decision, not a discovery.
- **A-8**: Eligibility audit-record retention of 7 years (FINRA minimum) is acceptable for the MX context; longer retention may be required pending `[OPEN-LEGAL-3]`.

---

## 7. Constraints & Guardrails

| Category | Constraint | Source |
|----------|-----------|--------|
| **Performance** | The IPO surface must not degrade existing Home, Markets, or Search load times measurably (no perceptible regression) | §2 Intent (discovery surfaces are pre-existing) |
| **Engagement** | Existing Stocks engagement metrics (DAU, trade frequency on non-IPO instruments) must not decrease as a result of IPO surfacing | §5 Success Criteria |
| **Security** | Eligibility audit records (user identifier, timestamp, terms version, source IP, source user-agent) must be stored with integrity protection; admin actions on eligibility must be logged separately | §8 Risks |
| **Compliance — Disclosure** | Prospectus link prominence above the Invest call-to-action is mandatory before the user can place an order (AC-5) | §2 Intent · Legal |
| **Compliance — Eligibility** | All three eligibility checkpoints must be confirmed before any order can be placed, and the confirmation must be persisted before navigation to Calculator (AC-11) | §2 Intent · Compliance |
| **Compliance — Truth-First** | The "Risk understanding" disclosure must include Compliance-approved language on academic underperformance evidence (AC-10) | §2 Intent · `[OPEN-LEGAL-1]` |
| **Data Freshness** | The modification-window state must reflect the brokerage partner's authoritative event stream; polled availability fields may lag by up to 15 minutes and are not authoritative | §2 Intent · FR-5 |
| **Reliability** | Live event stream uptime ≥ 99.0% during US market hours over a rolling 7-day window; below threshold, the IPO surface degrades to read-only | §5 SC-9 |
| **Operational** | Platform-wide visibility kill-switch must take effect within 5 minutes of being toggled (FR-3) | §2 Intent |

---

## 8. Risks & Dependencies

| Risk | Impact | Mitigation |
|------|--------|------------|
| Academic 1-year underperformance evidence materializes for Bitso users — customer-experience, brand, and regulatory exposure | High | Mandatory disclosure at point of subscription (AC-10); guardrail metric with kill criterion (SC-5); deal-quality discipline from the squad. |
| Single brokerage-partner dependency fails (partner outage, allocation loss, partner relationship sours) | High | No fallback broker for Phase 1; strong operational monitoring on the partner's offering and allocation surfaces; commercial relationship management via Strategic Alliances. |
| Modification-window UX confusion → high cancellation rate or missed deadline | Medium | Authoritative event-driven signal (not polled), live countdown, push notification at window open, post-window error copy. Guardrail SC-6. |
| Affluent acquisition story does not materialize | High | Track north-star monthly; if affluent-cohort acquisition is < 50% of base case after 3 deals, re-scope to affluent-targeted marketing or sunset. |
| FINRA Rule 5130/5131 disqualifies a large share of MX retail | High | Compliance review pre-launch; eligibility flow captures user attestation; partner does not impose additional jurisdictional gates (A-3). |
| Allocation lottery perceived as unfair → customer-experience volume + churn | Medium | "How allocation works" disclosure on Detail and Confirmation; transparent partial-fill explanation (AC-26); non-pejorative zero-allocation copy (AC-27). |
| US tax withholding / W-8BEN treatment of allocations not aligned with current MX retail flow | High | `[OPEN-LEGAL-2]` — Compliance and Tax review pre-launch. |
| Push and email fan-out at allocation creates Operations load | Medium | CS readiness — Help Center articles, ticket-volume forecast (~1,500 per deal at scale). |
| Mass-market user with low balance attempts an IPO and is harmed | Medium | No hard balance gate (deliberate); mitigated via disclosure (AC-10) and per-deal eligibility messaging. Re-evaluate after 3 deals if guardrail SC-5 fires. |
| MXN-funded amendment changes scope during design | Medium | Treat the amendment as a scope decision pre-design; if accepted, revise AC-14 through AC-17 and AC-26 through AC-28 in a single PR; do not interleave with design. |

### Stakeholder Dependencies

- **Legal — blocking.** Sign-off on prospectus prominence, eligibility disclosure copy (including academic underperformance disclosure), audit-trail completeness.
- **Compliance — blocking.** FINRA Rule 5130/5131 framing, CNBV alignment, W-8BEN treatment, tax-event handling. `[OPEN-LEGAL-1]`, `[OPEN-LEGAL-2]`.
- **Risk — blocking.** Pre-funding and reserve-of-funds model, partial-allocation refund flow, T+2 settlement vs. Bitso's T+0 default.
- **Ops - Customer Support — blocking.** Help Center articles for "How IPOs work", "Eligibility requirements", "60-min window", "Allocation process"; ticket-volume forecast per deal; staffing impact. `[OPEN-CX-1]`.
- **Cybersecurity / Infosec — blocking.** Audit trail security (eligibility confirmations, source IP, source user-agent), live event stream authentication handling.
- **Business Intelligence — blocking.** North-star and guardrail event schema; affluent-acquisition attribution model; 1-year cohort return tracking. `[OPEN-BI-1]`.
- **Ops - Strategic Alliances — hard external dependency (non-sign-off).** Brokerage-partner commercial relationship — production correspondent enablement, deal pipeline visibility, service-level alignment on the live event stream and IPO order endpoints.
- **Marketing — hard non-sign-off dependency.** Affluent-acquisition motion — landing page, referral incentives, segment-targeted campaigns. The strategic case depends on this.

---

## 9. Timeline / Milestones

| Milestone | Target Date | Status |
|-----------|-------------|--------|
| Brokerage-partner commercial gate closed (production correspondent enablement, deal pipeline visibility, service-level alignment) | TBD | Planned |
| Leadership alignment gate closed (sign-off that affluent-acquisition + category-leadership case justifies known user-outcome risk) | TBD | Planned |
| Spec sign-off (this document) | TBD | Planned |
| Design complete | TBD | Planned |
| Architecture approved | TBD | Planned |
| Implementation plan approved | TBD | Planned |
| Compliance + Legal sign-off | TBD | Planned |
| Closed-beta launch (1 deal, ≤ 500 invited affluent users) | TBD | Planned |
| Soft GA launch | TBD | Planned |
| GA launch with marketing motion | TBD | Planned |

> Concrete dates intentionally omitted until the brokerage-partner commercial gate closes — committing to dates before that conversation risks a multi-quarter dead end.

---

## 10. Glossary

| Term | Definition |
|------|-----------|
| **IPO** | Initial Public Offering — the first sale of a company's stock to the public at a defined offer price, before secondary-market trading begins. |
| **Primary market** | Sale of newly-issued securities directly from the issuer to investors at the offer price, before the security trades on an exchange. |
| **Offer price** | The price at which shares are sold in the primary market — typically determined the night before the trade date. |
| **Indication of Interest (IOI)** | A non-binding-then-binding USD order placed by a user against an IPO offering, settled upon allocation. |
| **Modification window** | A bounded period (in current partner contract, 60 minutes around the close-of-business event) during which a user may replace or cancel a pending IPO order before allocation becomes binding. |
| **Allocation** | The brokerage partner's per-account outcome assigning a number of shares — may be full, partial, or zero. |
| **Partial allocation** | The user receives fewer shares than the ordered notional would imply at the final price; the unfilled USD is refunded. |
| **T+2 settlement** | Settlement occurs two business days after trade date; the user cannot withdraw or sell the shares until settled (diverges from Bitso's T+0 default for regular sells). |
| **FINRA Rule 5130/5131** | US Financial Industry Regulatory Authority rules restricting certain categories of "restricted persons" from purchasing IPO shares. |
| **Restricted person** | A user who, under FINRA Rule 5130/5131, is not permitted to purchase IPO shares (typically broker-dealer employees and certain affiliates). |
| **Flipping policy** | The brokerage partner's policy penalising sale of allocated shares within a defined post-allocation window (commonly 30 days). |
| **Hubble** | Bitso's internal back-office tool used by Customer Support and Pay Operations agents. |
| **Markets section** | Section of the Bitso app that lists tradeable instruments grouped by asset class. |
| **Insights / Portfolio** | Section of the Bitso app where a user sees their holdings, positions, and pending orders. |

---

## 11. References

- Source PRD: [PRD: IPO Access (Bitso México)](https://bitsomx.atlassian.net/wiki/spaces/RET/pages/5965479953/PRD+IPO+Access+Bitso+M+xico)
- Ticket: [RBKR-1608](https://bitsomx.atlassian.net/browse/RBKR-1608)
- Academic risk source: [Gempesaw, Henry, Pisciotta, Xiao (2025): "Retail IPO Access: High Hopes, Low Returns"](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4961899)
- Global benchmarks: [Robinhood IPO Access](https://robinhood.com/us/en/support/articles/ipo-access/), [SoFi IPO Center](https://support.sofi.com/hc/en-us/articles/4402700350861-SoFi-IPO-Center-Current-Offerings)
- Companion design artifact: Use Cases & MLP (generated 2026-05-18 from the source PRD)

---

## 12. Changelog

| Date | Change | Author |
|------|--------|--------|
| 2026-05-18 | Initial draft — converted from PRD and Use Cases & MLP companion artifact | @juan.galindo |

---

## Spec Review Checklist

### Business Context
- [x] Objective is clear and ties to a strategic goal (first-mover MX IPO access ahead of Nu México)
- [x] North-star metric has a specific baseline (`[OPEN-BI-1]`) and directional targets (90-day, 12-month)
- [x] CBTM sections (Customer, Business, Team) are substantive and non-overlapping
- [x] Phasing strategy is defined with clear scope for this spec (Phase 1 USD-only)

### Intent Quality
- [x] Feature Overview provides a 3–5 sentence end-to-end narrative
- [x] Business Flows included (money flow + transactional flow)
- [x] Every user story uses a real user persona — Retail user / first-time IPO subscriber / eligible IPO subscriber / Customer Support agent / Pay Operations agent
- [x] Every user story follows "As a [role], I want [action] so that [benefit]"
- [x] Every user story has a priority assigned with rationale
- [x] Every user story has an independent test description
- [x] Acceptance scenarios use Given/When/Then format
- [x] Acceptance scenarios are numbered AC-1 through AC-34 in a single sequence
- [x] Every AC is measurable and testable
- [x] ACs describe observable behavior, not implementation
- [ ] No unresolved `[OPEN-*]` markers remain — open items documented in Risks, Assumptions, and SC-1 baseline

### Key Entities & Functional Requirements
- [x] Key entities listed (IPO Offering, Indication-of-Interest Order, Allocation Result, Eligibility Record, Modification Window)
- [x] Entities describe concepts, not schemas
- [x] Functional requirements listed for cross-cutting system concerns (audit, analytics, kill-switches, cohort gating, authoritative-signal rule)

### Non-Goals & Edge Cases
- [x] Non-Goals section lists capabilities explicitly excluded
- [x] Deferred features, out-of-scope use cases, and phase boundaries are documented
- [x] Edge cases cover error states, empty states, boundary conditions, and platform differences (EC-1 through EC-14)

### Success Criteria & Constraints
- [x] North-star metric defined with baseline (pending BI) and targets
- [x] Guardrail metrics defined with acceptable thresholds (SC-5 through SC-9)
- [x] Measurement method specified for each criterion
- [x] Assumptions are explicit and falsifiable (A-1 through A-8)
- [x] Constraints & Guardrails table is populated with source references

### Risks & Dependencies
- [x] Risk matrix includes impact assessment and mitigation for each risk
- [x] Cross-squad dependencies identified with blocking / non-blocking classification
- [x] Stakeholder dependency checklist reviewed (Legal, Compliance, Ops, Finance, Infosec, BI, Strategic Alliances, Marketing)

### Sign-off & Traceability
- [ ] Sign-off table has named DRPs for all relevant areas — pending stakeholder assignments
- [x] Irrelevant sign-off areas marked N/A with justification (Fraud, KYC, Treasury)
- [ ] Timeline milestones — concrete dates pending brokerage-partner commercial gate
- [x] No architecture or implementation details in the spec
- [x] Spec `id` matches the feature folder name (`F-001-ipo-access`)
- [x] Spec `owner` matches the team responsible for delivery
- [x] Changelog has at least the initial draft entry
