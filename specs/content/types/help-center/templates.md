# Help Center — Templates

Source: ZeroHeight — https://bitsodesign.zeroheight.com/styleguide/s/136102/p/036c6c-templates

Templates provide ready-made frameworks for help center articles. They ensure consistency across documentation and speed up the writing process.

---

## General guidelines

- Produce one file per locale. Supported locales: `es-mx` (lead — always first), `es-ar`, `es-co`, `pt-br`, `en-us`. Per-locale rules live in `specs/content/localization/`.
- Use H1 for main section subtitles, H2 for sub-sections within a section. The article title is plain text (not a heading).
- Use sentence case everywhere — titles, subtitles, CTAs, bullets. Never title case. Full rule: `specs/content/guidelines/capitalization.md`.

---

## Title decision rule

Choose the title type based on whether the user can perform an action:

| Type | When to use | Pattern | Example |
|------|-------------|---------|---------|
| **Direct question** | User can perform the action described | "How do I [verb] [object]?" | "How do I buy my first stock?" |
| **Indirect statement** | Informational — user cannot act or change it | "How [object] works." | "How market hours work." |

---

## Formatting rules (inline summary)

**Bold** — use on complete scannable ideas, not single words. Exception: labels, CTAs, and section names in the app may be bolded as single words (e.g., tap **Buy**). Full rule: `specs/content/guidelines/bold.md`.

**Bullets** — use when information splits into clear, separate items. Add a period at the end of bullets that contain a conjugated verb. Skip periods for single words, phrases, or infinitive-form verbs. Full rule: `specs/content/guidelines/bullets.md`.

**Numbered lists** — use for sequential steps only. End each step with a period. Close with a confirmation line (e.g., "That's it! Your order will be processed.").

**UI references** — bold section names and CTA labels when referenced in FAQs (e.g., tap **Transferir**, go to **Actividad**).

---

## Article template

```
[Title — sentence case, direct or indirect question per rule above]

[Intro — 1–2 short paragraphs. State what the article covers and why it matters to the user.]


[H1 Subtitle]
[Body text. Use short paragraphs. Prefer bullets when listing 3+ items.]

- [Bullet one — period if conjugated verb.]
- [Bullet two — period if conjugated verb.]
- [Bullet three — period if conjugated verb.]


[H1 Subtitle — for step-by-step sections]

1. [Step one label]: Description of what the user does.
2. [Step two label]: Description.
3. [Step three label]: Description.
4. [Step four label]: Description.
5. [Closing line]: Confirm the outcome or next state.
```

---

## Example

**Title**
How do I buy a stock on Bitso?

**Intro**
Buying stocks on Bitso takes just a few steps. Here's how to place your first order from the app.

**H1 — Before you start**
Make sure your account is verified and you have funds available. You can deposit from **Actividad** > **Depositar**.

**H1 — How to buy a stock**

1. Choose the stock you want to buy: You can do this from the "Buy/Sell" button, the search bar, or by selecting **Markets** and then **Stocks** to find the company you're interested in.
2. Select the stock and tap **Buy**.
3. Set the amount: Enter the amount of money or the number of shares you want to buy.
4. Review and confirm: Check the summary of your transaction and select **Buy**.
5. That's it! Your order will be sent to the market, and your portfolio will update once it's completed.

---

## New listings article template

See [`templates-new-listings.md`](./templates-new-listings.md) for the full new listings template, guidelines, and example.
