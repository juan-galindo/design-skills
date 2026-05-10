# Key naming reference

The skill generates keys of the form:

```
{feature}.{screenSlug}.{component}.{elementType}
```

All segments are camelCase. Dots separate segments; no other punctuation.

## Segment sources

| Segment | Source | Notes |
|---|---|---|
| `feature` | Figma `SECTION` name on the Experience page (fallback: `{initiativeTag}`) | camelCase, strip leading numbers and special chars |
| `screenSlug` | Figma `FRAME` name | strip leading number/separator (`1300 - Confirmation` → `confirmation`) |
| `component` | Closest MDS ancestor in the layer tree, mapped via the abbreviation table below | Falls back to `wrapper` if no MDS ancestor exists |
| `elementType` | The text layer's own name, mapped via the element-type table below | |

## Component abbreviation table

The closest MDS ancestor is matched (case-insensitive, ignoring anything after a `/` and any `MDS`/`mds` prefix) against this table. First hit wins. The list mirrors the MDS Mobile Core Components library — keep it in sync with `specs/figma-catalog/mobile-components.md`.

| Figma component name (any variant) | Abbreviation |
|---|---|
| `Accordion` | `accordion` |
| `AppBar` | `appBar` |
| `Avatar` | `avatar` |
| `AssetBalance` | `assetBalance` |
| `AssetStatistics` | `assetStats` |
| `Balance` | `balance` |
| `BalanceBreakdown` | `balanceBreakdown` |
| `BottomCTAs` | `ctas` |
| `FixedCTAs` / `Buttons - Fixed CTAs` | `ctas` |
| `BottomNavigation` | `bottomNav` |
| `BottomSheet` | `bottomSheet` |
| `BottomSheet - DropdownMenu` | `bottomSheet` |
| `Button` / `Button/layoutAdaptive` | `primaryBtn` |
| `IconButton` | `btn` |
| `CircularButton` | `btn` |
| `PrimaryButton` | `primaryBtn` |
| `SecondaryButton` | `secondaryBtn` |
| `TextButton` | `secondaryBtn` |
| `CircularButtonGroup` | `btnGroup` |
| `Calculator Amounts` | `calculator` |
| `Card` and any variant (`Product Recommendation`, `CrossSell`, `EarningsEntrypoint`, `Product Entry point`, `Feedback`, `Selection`) | `card` |
| `Checkbox` | `checkbox` |
| `Chips` | `chip` |
| `CoachMark` | `coachMark` |
| `Confirmation Header` / `ConfirmationHeader` | `confirmationHeader` |
| `Headers` / `Header` / `MDSHeader` | `header` |
| `CurrencyField` (incl. `[New] CurrencyField`) | `currencyField` |
| `Dropdown` | `dropdown` |
| `EmptyState` | `emptyState` |
| `FeaturedAsset` | `featuredAsset` |
| `FileUploader` | `fileUploader` |
| `Icon` | `icon` |
| `InfoPanel` / `MDSInfoPanel` | `infoPanel` |
| `InfoBanner` | `banner` |
| `InlineNotification` | `notification` |
| `InputField` | `input` |
| `List Item` / `ListItem` | `listItem` |
| `NumericPad` | `numericPad` |
| `PageIndicator` | `pageIndicator` |
| `PasswordField` | `passwordField` |
| `PriceChangePercentage` | `change` |
| `PnL` / `PnL2` | `pnl` |
| `ProgressBar` | `progressBar` |
| `ProgressLimitsBar` | `limitsBar` |
| `ProgressStepper` | `stepper` |
| `StepIndicator` | `steps` |
| `PulsingDot` | `pulsingDot` |
| `ReadOnly` / `ReadOnlyHorizontal` | `readOnly` |
| `ReadOnlyList` | `readOnlyList` |
| `SearchField` | `search` |
| `SegmentedButtons` | `segmented` |
| `SelectField` | `select` |
| `Snackbar` | `snackbar` |
| `StackableAsset` | `stackableAsset` |
| `StoryTracker` | `storyTracker` |
| `Switch` | `switch` |
| `Tabs` | `tabs` |
| `Tag` | `tag` |
| `TextField` | `textField` |
| `Timeframes` / `Timeframe` | `timeframes` |
| `Toast` | `toast` |
| Unknown `MDS …` component | camelCased name (flag in report so this table can be extended) |
| Non-MDS ancestor | `wrapper` |

**Deprecated and internal components.** Components prefixed `[Deprecated]`, `_`, or `[Doc_Only]` should not appear inside production prototypes; if the scanner finds one, treat it as an unknown MDS component, surface it in the report, and let the designer fix the file rather than baking the deprecated name into a key.

## Element-type rules

The text layer's own name is lowercased and matched against these prefixes. First match wins.

| Layer name prefix | `elementType` |
|---|---|
| `heading`, `title` | `title` |
| `paragraph`, `body`, `description` | `body` |
| `label` (incl. `label/bold`, `label/default`) | `label` |
| `caption` | `caption` |
| `hint`, `helper`, `tooltip` | `hint` |
| `placeholder` | `placeholder` |
| `error` | `error` |
| `amount` | `amount` |
| `currency` | `currency` |
| `percentage` | `percentage` |
| `status`, `state`, `abierto` | `status` |
| `con` | `context` |
| anything else | camelCased layer name (flag in report) |

**Button special case.** When the closest MDS ancestor is `MDS Button`, the text layer is always literally `Label`; force `elementType = label`. So a button inside `MDS BottomCTAs` produces `…ctas.label`, which is the convention engineers expect.

## Collisions

Two kinds:

**Same key generated twice.** If `feature.screenSlug.component.elementType` would match more than one node, every occurrence gets a numeric suffix attached *directly* to the element type — `title1`, `title2`. Single occurrences stay un-suffixed. The number attaches with no period:

```
❌ warrants.successful.header.title.1
✅ warrants.successful.header.title1
```

This keeps the key visually parseable: dots always separate semantic segments, never sequence numbers.

**Same MDS component used multiple times on the same screen.** Adding numeric suffixes here would produce ambiguous keys (`btn1`, `btn2` tells you nothing). Instead, replace the component segment with `{component}{Descriptor}`, where `Descriptor` is the camelCased name of the closest non-MDS ancestor — e.g. `primaryBtn`, `secondaryBtn`, `wrapperInfo`, `wrapperBanner`. The non-MDS ancestor names usually carry the designer's own intent (`CTAWrapper`, `AltContentWrapper`), which makes the resulting key meaningful.

**Exception: Tags and text in headers.** When `MDS Tag` or `MDSHeader` text appears with `TitleWrapper` as the closest non-MDS ancestor, do not apply the descriptor rule. Use the component name directly (`tag` or `header`), even if multiple instances appear on the same screen. `TitleWrapper` is an internal implementation detail of the header structure, not a meaningful semantic descriptor. This keeps keys like `header.title` and `tag.label` semantically clean.

## Skip list

Text never produces a key when any of these conditions hold. The goal is to keep the JSON output focused on real, translatable copy — system chrome, dynamic data, and decorative layers all live elsewhere in the codebase.

**Hidden layers**

- Any node with `visible = false`.

**System chrome and decorative components** — text inside these is drawn by the OS or is purely decorative:

- `StatusBar`
- `NativeNavigation`
- `MDSIllustrationFullScreen`

**Data-only components** — text inside these is dynamic content, not copy. Engineers populate it from APIs at runtime; localizing the design-time samples would create dead keys:

- `MDS Timeframes` / `Timeframe`
- `MDS Switch`
- `MDS SpinLoader`
- `MDS PulsingDot`
- `MDS StepIndicator` / `ProgressStepper`
- `MDS ProgressBar`
- `MDS Graph - Line` / `Graph - Bars` / `Graph - PieChart`
- `MDS Icon`
- `MDS CurrencyPrice`
- `MDS PnL` / `PnL2`
- `MDS priceChangePercentage`

**Dynamic field values in specific components:**
- Text layers named `currency` inside `MDS ConfirmationHeader` (e.g., "MXN", "USD" — determined at runtime by user portfolio)

**Numeric / data-shaped text values** — text nodes with only digits or with more than 2 digits are treated as sample data and skipped:

- Skipped: `"200 MXN"`, `"-233M USD"`, `"0.84"`, `"1.31x"`, `"4.77"` (pure numbers or >2 digits)
- Generated: `"1D"`, `"6M"`, `"Q4"` (≤2 digits + text)

This rule assumes real copy uses `[%s]` placeholders for dynamic values and never bakes literal numbers in. Timeframe labels and similar mixed content with few digits are localizable. If a string really must contain a literal number (e.g. a year, a phone country code), wrap it in `[%s]` in the design and add the mapping to `references/icu-lookup.md`.

**Decorative glyphs and separators** — any text node whose trimmed content is two characters or fewer and has no Latin letters is treated as decoration:

- `"|"`, `"↓"`, `"↑"`, `"·"`, `"•"`, `"—"`, empty strings

Real labels are always at least a Latin word (`"OK"`, `"Sí"`), so this rule has very low false-skip risk. Lone currency symbols (`"€"`, `"$"`) would also match, but in practice those appear inside `MDS CurrencyPrice`, which is already skipped.
