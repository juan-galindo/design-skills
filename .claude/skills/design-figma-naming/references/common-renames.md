# Common Renames Lookup Table

Quick reference of frequently seen bad names and their correct equivalents.
These are **patterns**, not file-specific names. Apply the same logic to any equivalent
layer in any Figma file — the rule is always: PascalCase + Wrapper suffix for frames,
"what it represents" for text, "characteristic + type suffix" for media.

---

## Casing fixes (camelCase → PascalCase)

| Before | After | Rule |
|---|---|---|
| `contentWrapper` | `ContentWrapper` | First letter must be uppercase |
| `formFieldsContainer` | `FormFieldsWrapper` | camelCase + wrong suffix |
| `fixedTop` | `FixedTopWrapper` | camelCase + missing suffix |
| `fixedBottom` | `FixedBottomWrapper` | camelCase + missing suffix |
| `balanceWrapper` | `BalanceWrapper` | First letter uppercase |
| `bottomWrapper` | `BottomWrapper` | First letter uppercase |
| `menuOptionsWrapper` | `MenuOptionsWrapper` | First letter uppercase |
| `wrapper` | `ContentWrapper` | Lowercase + no descriptor |

---

## Missing Wrapper suffix

| Before | After | Rule |
|---|---|---|
| `BottomContent` | `BottomContentWrapper` | Add suffix |
| `ReceiptDetails` | `ReceiptDetailsWrapper` | Add suffix |
| `FavoriteContacts` | `FavoriteContactsWrapper` | Add suffix |
| `AllAccounts` | `AllAccountsWrapper` | Add suffix |
| `SavedAccounts` | `SavedAccountsWrapper` | Add suffix |
| `FoundAccounts` | `FoundAccountsWrapper` | Add suffix |
| `contactsList` | `ContactsListWrapper` | camelCase + add suffix |
| `currencyList` | `[DescriptiveName]ListWrapper` | camelCase + rename to describe content |
| `secondList` | `[DescriptiveName]Wrapper` | Rename to describe content |
| `transferDetails` | `TransferDetailsWrapper` | camelCase + add suffix |
| `BalanceDetail` | `BalanceDetailWrapper` | Add suffix |
| `NewAccount` (frame) | `NewAccountWrapper` | Add suffix |
| `Contents` | `ContentsWrapper` | Add suffix |

---

## Spaces / special characters in names

| Before | After | Rule |
|---|---|---|
| `Button group` | `ButtonWrapper` | Remove spaces, PascalCase |
| `CTA + legal disclaimer` | `CTAWrapper` | Remove special chars |
| `version app` | `VersionWrapper` | Remove spaces, PascalCase |
| `[Any name] / [subname]` | `[DescriptiveName]Wrapper` | Remove slashes |
| `[Name] - [Keyboard/Chips]` | `KeyboardWrapper` | Remove special chars |
| `[Name] Info Card` | `[Name]InfoCard` | Remove spaces |
| `[Name] Wrapper` | `[Name]Wrapper` | Remove space before Wrapper |

---

## Typos (fix the word, keep the intent)

| Before | After |
|---|---|
| `criptoCards` | `CryptoCardsWrapper` |
| `topItens` | `TopItemsWrapper` |
| `InfoPannel` | `InfoPanelWrapper` |
| `Dinamic` | `Dynamic` |

---

## Generic / auto-generated names

These appear when Figma auto-names layers from copy-paste or default creation.
Always rename to describe the content of that specific frame.

| Pattern | How to rename |
|---|---|
| `Frame 1234567` | Look at contents → rename to `[Content]Wrapper` |
| `Group 1`, `Group 88` | Look at contents → rename to `[Content]Group` or `[Content]Wrapper` |
| `Rectangle 3718` | Look at role → rename to `[Role]Shape` or `[Role]Background` |
| `UUID-named layer` (e.g. `DACEC38C-...`) | Look at what the image shows → rename to `[Subject]Image` |
| `image 40`, `image 41` | Look at what the image shows → rename to `[Subject]Image` |
| `Screenshot 2024-...` | `ReferenceScreenshot` |
| `Captura de pantalla...` | `ReferenceScreenshot` |

---

## Text layers (value → role)

| Before | After | Rule |
|---|---|---|
| Any text node named after its value | Rename to what it *represents* | "what it represents" rule |
| `"V3.84.0"` | `VersionNumber` | Represents the version |
| `"14. 25"` (char count) | `CharCount` | Represents a count |
| `"0.00"` | `AmountValue` | Represents an amount |
| `"MXN"` (currency tag) | `CurrencyLabel` | Represents a label |
| `Header` (inside a card, named after its value) | `[Card]InfoLabel` | Represents a label |
| `Text` (Figma default) | Rename to what it represents | Never leave as "Text" |

---

## Media layers (non-semantic → semantic)

| Pattern | Rule | Example result |
|---|---|---|
| UUID image name | Describe what the image shows + `Image` suffix | `FaceIDBackground` |
| `image N` | Describe the subject + `Image` suffix | `HeroImage` |
| `accent background` | PascalCase + `Background` suffix | `AccentBackground` |
| `topSpacer` | PascalCase | `TopSpacer` |
| `Rectangle N` | Describe the role + `Shape`/`Background` suffix | `OverlayBackground` |
| `Card Top` | PascalCase + `Shape` suffix | `CardTopShape` |

---

## Navigation wrapper patterns (consistent across any file)

| Before | After |
|---|---|
| `fixedTop` / `TopNavWrapper` | `FixedTopWrapper` |
| `fixedBottom` / `BottomNavWrapper` | `FixedBottomWrapper` |
| `topItems` / `topItens` | `TopItemsWrapper` |
| `SnackBar` (frame) | `SnackbarWrapper` |

---

## Component-internal layers (PascalCase → camelCase + standard vocab)

These rules apply **only to layers inside an MDS/WDS component**. Outside of
components (in flows, screens, wrappers), keep PascalCase.

| Before | After | Rule |
|---|---|---|
| `Label` | `label` | camelCase, standard vocab |
| `LabelText` | `label` | Drop redundant suffix, use vocab |
| `Text` | `label` | Figma default → name by role |
| `HelperText` | `helperText` | camelCase |
| `LeftIcon` / `IconLeft` | `iconLeading` | Use canonical vocab |
| `RightIcon` / `IconRight` | `iconTrailing` | Use canonical vocab |
| `LeadingIcon` | `iconLeading` | Standardize order: noun + position |
| `TrailingIcon` | `iconTrailing` | Standardize order: noun + position |
| `Pressable` / `Touchable` / `ClickArea` | `pressable` | One canonical name for the hit target |
| `Container` / `Wrapper` (inside a component) | `container` | Inside a component, use `container`, not `Wrapper` |
| `Row` / `HStack` | `row` | camelCase |
| `MDSButton` (instance ref inside another component) | `mdsButton` | Components nested **by role** are camelCased |
| `ButtonWrapper` (inside `MDSCard`) | `mdsButton` | Inside a component, refer to nested MDS components by camelCase role |

---

## Slot layers (declare the plug-in point)

| Before | After | Rule |
|---|---|---|
| `Leading` | `leadingSlot` | Add `Slot` suffix, camelCase |
| `Trailing` | `trailingSlot` | Add `Slot` suffix, camelCase |
| `Content` (an exposed slot) | `contentSlot` | Add `Slot` suffix |
| `LeadingSlot` | `leadingSlot` | camelCase, not PascalCase |
| `leading_slot` / `leading-slot` | `leadingSlot` | No separators |
| `IconSlot` (inside button) | `leadingSlot` or `trailingSlot` | Name by **position**, not by what plugs in |
