# Content Strategy — Template

Use this template for every new content strategy document. Name the file: **[Initiative name] content strategy**.

Example: *Margin Wallet content strategy*

---

## 1. Overview

### Purpose

This document establishes the official messaging framework for the [Initiative name] product. It serves as the single source of truth for external communications such as CLM or Marketing rollout campaigns, ensuring consistency, compliance, and clarity across all touchpoints.

### Scope

- **Internal audience:** [Product marketing, Customer support, Legal/Compliance]
- **Target audience:** [Bitso Alpha trading users in Mexico, Colombia, Argentina and Brazil]
- **Languages:** [SP-MX/CO/AR, EN and PT-BR]

### UX objective

[Initiative name] enables [experienced traders to amplify their trading opportunities through leveraged positions while maintaining strict risk management and educational transparency].

### Important links

- PRD
- Figma file
- User journey map
- Benchmark
- [Content strategy template (Google Doc)](https://docs.google.com/document/d/12Uy2Aqj22CIV8XZ-NmpNLDpY-o8DY8Yo-lq6joR1rEI/edit?tab=t.dbofnookna3h)
- Confluence page: [pending]

---

## 2. Product overview

Quick summary of the product/feature PRD.

| | |
|---|---|
| **What** | [Explain the product or feature in a few words.] |
| **When** | [Release date] |
| **Why** | [Feature/product objective — e.g., To increase xx AUM and enable up to xxx] |

---

## 3. Content touchpoints

Maps content strategy to user journey stages: awareness, consideration, onboarding, activation, and retention.

### Journey stage: Consideration
**Goal:** Help users understand value and decide to try.

| Touch point | Channel | Message focus | FEEL framework | Rationale | Owner |
|---|---|---|---|---|---|
| Landing page | Marketing | Feature benefits, use cases | Functional + Emotional | Converts awareness to activation | PMM + Content Designer |
| Help center | Support | How it works, FAQs | Educational + Functional | Answers questions before activation | Content Designer |

### Journey stage: Onboarding
**Goal:** Guide first-time setup and ensure understanding.

| Touch point | Channel | Message focus | FEEL framework | Rationale | Owner |
|---|---|---|---|---|---|
| Welcome modal | Product | Setup steps, key concepts | Educational + Functional | Sets expectations for activation | Content Designer |
| Onboarding email | CLM | Next steps after sign up | Functional + Emotional | Reinforces value and guides action | Content Designer |

### Journey stage: Activation
**Goal:** Drive first successful use.

| Touch point | Channel | Message focus | FEEL framework | Rationale | Owner |
|---|---|---|---|---|---|
| Push notification | CLM | Prompt first action | Functional + Emotional | Timely nudge to complete activation | Content Designer |
| Success confirmation | Product | Celebrate milestone | Emotional + Educational | Reinforces positive behavior | Content Designer |

### Journey stage: Retention
**Goal:** Build habit and deepen engagement.

| Touch point | Channel | Message focus | FEEL framework | Rationale | Owner |
|---|---|---|---|---|---|
| Re-engagement push | CLM | Return prompt for inactive users | Emotional | Brings back lapsed users | PMM |

---

## 4. FEEL framework application

See `core/feel-framework.md` for full FEEL definitions. Document tone decisions for this initiative here.

| Context | Tone | Examples |
|---|---|---|
| Product education | Functional + Educational | "Margin level shows your account health. Keep it above 130% to avoid liquidation warnings." |
| Risk warnings | Functional | "Your positions will be liquidated if your margin level falls below 100%. You can lose more than your initial deposit." |
| Feature benefits | Functional + Emotional | "Access up to 5x leverage to amplify your trading strategies." |
| Error states | Functional + Emotional | "You don't have enough trading power for this order. Add more funds or reduce your order size." |
| Celebratory | Functional + Educational | "Position opened successfully. Monitor your margin level regularly." |

---

## 5. Core messaging pillars

Defined together with PMM and Design. Establishes what we can (and cannot) say about the initiative.

| Core pillar | Do: What we can say | Don't: What we should never say |
|---|---|---|
| Opportunity and empowerment | "Unlock more trading opportunities with leverage" · "Amplify your trading power up to [X]x" · "Trade with borrowed funds to access larger positions" | "Guaranteed profits" or "guaranteed returns" · "Get rich quick" or "easy money" · "Risk-free leverage" · "Everyone can make money with margin" |
| Control and transparency | "Monitor your margin level in real-time" · "Clear visibility into borrowing costs and interest rates" · "Full control over your positions" | Anything implying we control user decisions · Hidden fees language · "Automatic profit protection" |
| [Pillar 3] | | |
| [Pillar 4] | | |

---

## 6. Terminology

### Glossary
Product-specific terms with approved translations.

| SP-MX | SP-CO | SP-AR | PT-BR | EN |
|---|---|---|---|---|
| [Wallet de margen] | [Wallet de margen] | [Wallet de margen] | [Wallet de margem] | [Margin Wallet] |

### Expressions
Key phrases used throughout the experience.

| SP-MX | SP-CO | SP-AR | PT-BR | EN |
|---|---|---|---|---|
| [Comienza a construir tu portafolio] | [Comienza a construir tu portafolio] | [Comenzá a construir tu portafolio] | [Comece a construir seu portfólio] | [Start building your portfolio] |

### Lokalise tags & keys

| | |
|---|---|
| **Project tags** | |
| **UI keys** | Keys |

---

## 7. Marketing & GTM strategy

**Lead:** PMM  
**Collaborators:** Content Design, Marketing, Growth

| Asset | Channel | Audience | Message | Launch date | Owner |
|---|---|---|---|---|---|
| Launch blog post | Web | All users | Feature announcement | Day 0 | PMM |
| Landing page | Web | Prospective users | Value prop + CTA | Day 0 | PMM + Content Designer |
| Email campaign | CLM | Segmented lists | Targeted activation | Day 0 | PMM |
| In-app banner | Product | Active users | Feature discovery | Day 0 | Content Designer |
| Social posts | Social media | Community | Awareness + engagement | Day 0–7 | Marketing |

---

## 8. Compliance & legal

**Legal reviewer:** [Name]

Requirement varies by market. Legal/Compliance must review all messaging.

| Region | Must include | Cannot say | Review status |
|---|---|---|---|
| Mexico | Risk warnings about losses exceeding deposits · Clear statement about borrowed funds · Interest rate disclosure (APR) · Liquidation mechanism explanation · Link to full risk disclosure | Any profit guarantees · Minimize/downplay risks · Compare to banking without context · "Investment/financial advice" | Pending |
| Colombia | | | Pending |
| Argentina | | | Pending |
| Brazil | | | Pending |
| International | | | Pending |

> See `localization/compliance-mx.md` for Mexico-specific CNBV/CONDUSEF requirements.

---

## 9. Roadmap

| Phase | Goal | Deliverables | Date | Owner |
|---|---|---|---|---|
| Discovery | Understand product needs | FigJam with user journey · PRD review with PM | [MM/DD] | Content Designer + Product Designer |
| Strategy creation | Establish the official messaging framework | Content strategy document | [MM/DD] | Content Designer |
| Benchmark | Understand competitor behavior and market trends | Benchmark analysis | [MM/DD] | Content Designer + Product Designer |
| Content definition | Finalize all copy | UI copy in Figma · Email/push templates | [MM/DD] | Content Designer |
| Localization | Translate & QA all markets | Translated copy in all markets · Localization QA completed | [MM/DD] | Content Designer |
| Legal review | Compliance approval | Approved messaging per market | [MM/DD] | Legal |
| HC articles | Create help center FAQs | HC articles (drafts) | [MM/DD] | Content Designer |

---

## 10. Help center articles

Required topics:

- What is [feature name]?
- How does [core concept] work?
- Understanding [key metric/term]
- [Risk/limitation] explained
- [Costs/fees] breakdown
- [Best practice] strategies

> Follow `types/help-center/index.md` for article structure, tone, and writing guidelines.
