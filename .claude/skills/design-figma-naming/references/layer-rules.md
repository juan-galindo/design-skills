# Layer Naming Rules — Bitso Design System Cheat Sheet

Source: Bitso Contribution Guidelines (zeroheight) + Way of Working Figma file

---

## The 3 Layer Types

### 1. Wrapper Layers (Frames & Groups)

> "When naming wrapper layers, we should always think of the main element (or elements)
> of the label followed by the suffix `Wrapper`."

**Format:** `PascalCase` + `Wrapper` suffix

**Examples:**
```
LabelWrapper
InputWrapper
HintWrapper
FormFieldsWrapper
ContentWrapper
FixedTopWrapper
FixedBottomWrapper
MethodsListWrapper
ContactsListWrapper
AmountMethodWrapper
BalanceWrapper
CryptoSectionWrapper
```

**Accepted structural suffixes** (when `Wrapper` would be redundant or unnatural):
- `Card`    — e.g. `SPEIInfoCard`
- `Group`   — e.g. `FaceIDLayersGroup`
- `Section` — e.g. `CryptoSection` (if it doesn't contain sub-wrappers)
- `Panel`   — e.g. `InfoPanel` (MDS pattern)
- `Bar`     — e.g. `AppBar` (MDS component, do not rename)
- `Sheet`   — e.g. `BottomSheet` (MDS component, do not rename)

**Never:**
- Lowercase: ~~`contentWrapper`~~ → `ContentWrapper`
- Spaces: ~~`Button group`~~ → `ButtonWrapper`
- camelCase: ~~`formFieldsContainer`~~ → `FormFieldsWrapper`
- No suffix: ~~`CalculatorAmount`~~ → `CalculatorAmountWrapper`
- Emojis: ~~`💰 Amount`~~ → `AmountWrapper`
- Generic: ~~`Frame 2087324012`~~ → `InputSearchWrapper`
- UUIDs: ~~`DACEC38C-D9C0-4C78-94FB-B1B4EEA291F5`~~ → rename semantically

---

### 2. Text Layers

> "Text layers should describe what the text is representing."
> "In Figma, the text layer by default names itself after its value — change it to what it represents."

**Format:** `PascalCase`, describing the role of the text

**Examples:**
```
Placeholder      ← not "Search accounts..."
Header           ← not "Withdraw MXN"
Description      ← not "Enter the amount you want to send"
VersionNumber    ← not "V3.84.0"
AmountValue      ← not "0.00"
CurrencyLabel    ← not "MXN"
CharCount        ← not "14 / 25"
```

**Never:**
- Value-as-name: ~~`"625,343.09 MXN"`~~ → `BalanceAmount`
- Figma defaults: ~~`Text`~~ → rename to what it represents

---

### 3. Media Layers (Shapes, Icons, Images, Video)

> "These are named using the main characteristic of the layer and the type of media it is as the suffix."

**Format:** `PascalCase` + media type suffix

**Common suffixes:**
| Type | Suffix | Example |
|---|---|---|
| Image / photo | `Image` | `HeroImage`, `AvatarImage` |
| Background shape | `Background` | `AccentBackground`, `OverlayBackground` |
| Decorative shape | `Shape` | `CardTopShape`, `DividerShape` |
| Spacer / padding shape | `Spacer` | `TopSpacer` |
| Mask | `Mask` | `AvatarMask` |
| Reference screenshot | `Screenshot` | `ReferenceScreenshot` |

**Never:**
- UUID names: ~~`DACEC38C-...`~~ → rename to describe what the image shows
- Auto-named: ~~`image 40`~~ → `[Subject]Image`
- Lowercase: ~~`accent background`~~ → `AccentBackground`
- OS screenshot names: ~~`Captura de pantalla 2026-03-03...`~~ → `ReferenceScreenshot`

---

## Edge Cases

> "If you find yourself in a very specific situation where none of the types defined
> previously fits your case, just make sure that you make the name as understandable
> as possible in Pascal case."
> "Be aware of designers and developers when you choose a name."
> "Never add emojis to the layer names."

---

## What NOT to Rename

These layer types should always be left as-is:

| Pattern | Reason |
|---|---|
| `MDS *` | MDS library component instances |
| `System / iOS / *` | System UI components |
| `[DOC_ONLY] *` | Documentation-only frames |
| `[Archive] *` | Already archived (unless content is a real flow step) |
| Connector lines / arrows | Flow diagram navigation |
| Layers with `I` prefix in node ID | Inside a component instance — never touch |
| `[LOCAL-*]` | Local library components |
