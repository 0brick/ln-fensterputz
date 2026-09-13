# Civic UI — Documentation

A Vue 3 component library with a calm, high-trust institutional visual language: navy ink, a bright yellow accent, teal links, generous whitespace, strict focus states. It ships as plain `.vue` single-file components plus a small set of composables — no CSS framework dependency, no build-time magic beyond standard Vite/Vue tooling.

## Table of contents

1. [Installation & setup](#installation--setup)
2. [Theming](#theming)
3. [Design tokens reference](#design-tokens-reference)
4. [Buttons](#buttons)
5. [Feedback](#feedback)
6. [Navigation](#navigation)
7. [Overlays](#overlays)
8. [Content](#content)
9. [Forms](#forms)
10. [Sections](#sections)
11. [Composables](#composables)
12. [Accessibility notes](#accessibility-notes)

---

## Installation & setup

```bash
npm install civic-ui vue
```

Two ways to consume the library:

**A. Global plugin** — registers every component under a `Cui*` tag (kebab-case in templates: `<cui-button>`, `<cui-hero-section>`, …):

```js
import { createApp } from 'vue'
import CivicUI from 'civic-ui'
createApp(App).use(CivicUI).mount('#app')
```

**B. Named imports** — tree-shakeable, explicit:

```vue
<script setup>
import { AppButton, Card, HeroSection } from 'civic-ui'
</script>
```

Both approaches load the same stylesheet (bundled into `dist/civic-ui.css`, pulled in automatically by `src/index.js`). If you only import a couple of components directly from their `.vue` files (bypassing `index.js`), import the stylesheet yourself once:

```js
import 'civic-ui/style.css'
```

---

## Theming

Every visual value the components use is a CSS custom property defined in `src/styles/tokens.css`, scoped to `:root`. Override any subset of them in your own global stylesheet, loaded **after** the library's:

```css
:root {
  --cui-color-navy: #0b2540;      /* swap the primary ink */
  --cui-color-yellow: #ffcc00;    /* swap the accent */
  --cui-font-sans: 'Inter', sans-serif;
}
```

Components never hard-code a color or font — they all read `var(--cui-*)` — so a full re-skin needs no component edits.

A dark-surface variant is available via `[data-cui-theme="dark"]` on any ancestor element, which flips `--cui-text`, `--cui-bg`, etc. for content sitting on a navy background.

### Font choice

Civic UI uses **Source Sans 3** (body) and **Source Serif 4** (optional serif accents), both SIL Open Font License, loaded from Google Fonts in `src/styles/base.css`. They're a clean, neutral grotesque/serif pairing that reads as institutional and professional without depending on any restrictively licensed typeface — swap them for your own brand fonts via `--cui-font-sans` / `--cui-font-serif` any time.

---

## Design tokens reference

| Token | Value | Use |
|---|---|---|
| `--cui-color-navy` | `#001d35` | Primary ink, headings, dark surfaces |
| `--cui-color-teal` | `#02767f` | Links, secondary accents |
| `--cui-color-yellow` | `#ffed3e` | Primary CTA / highlight accent |
| `--cui-color-purple` / `--cui-color-violet` | `#3b2781` / `#6e57ce` | Deep accents, hover states |
| `--cui-color-sky` | `#80cdeb` | Light illustrative accent |
| `--cui-color-grey-50/100/300/500/700` | greyscale ramp | Surfaces, borders, muted text |
| `--cui-font-sans` | Source Sans 3 stack | Body copy, UI text |
| `--cui-font-serif` | Source Serif 4 stack | Optional editorial headings |
| `--cui-space-1`…`--cui-space-8` | 0.4rem – 6.4rem | Spacing scale |
| `--cui-radius-sm/md/lg/pill` | 2px – 999px | Corner radii |
| `--cui-shadow-sm/md/lg` | — | Elevation |
| `--cui-z-*` | 1000–1080 | Stacking order for dropdown → tooltip → toast |

The palette and spacing rhythm (`--cui-gutter`, container width `1248px`) are tuned to feel calm and institutional at a glance, without leaning on any single brand's exact values.

---

## Buttons

### AppButton

The base action element. Renders `<button>` by default, or `<a>` automatically when `href` is set.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `variant` | `primary \| accent \| outline \| ghost \| link \| danger` | `primary` | |
| `size` | `sm \| md \| lg` | `md` | |
| `href` | `string` | — | Renders as `<a>` |
| `tag` | `string \| object` | — | Override the rendered element (e.g. `router-link`) |
| `type` | `string` | `button` | Native `type` when rendered as `<button>` |
| `disabled` | `boolean` | `false` | |
| `loading` | `boolean` | `false` | Shows a spinner, disables the button |
| `block` | `boolean` | `false` | Full width |

```vue
<AppButton variant="accent" size="lg" href="/kontakt">Termin anfragen</AppButton>
```

### ButtonGroup

Visually joins a row of `AppButton`s into one segmented control.

| Prop | Type | Default |
|---|---|---|
| `vertical` | `boolean` | `false` |
| `ariaLabel` | `string` | `'Button group'` |

```vue
<ButtonGroup>
  <AppButton variant="primary">Day</AppButton>
  <AppButton variant="primary">Week</AppButton>
</ButtonGroup>
```

### CloseButton

The "×" dismiss control used by `Alert`, `Modal`, `Offcanvas`, `Toast`.

| Prop | Type | Default |
|---|---|---|
| `label` | `string` | `'Close'` |
| `dark` | `boolean` | `false` |

Emits `click`.

---

## Feedback

### Alert

| Prop | Type | Default |
|---|---|---|
| `variant` | `info \| success \| warning \| danger \| neutral` | `info` |
| `title` | `string` | — |
| `dismissible` | `boolean` | `false` |

Emits `dismiss`. Default slot is the alert body.

### Badge

| Prop | Type | Default |
|---|---|---|
| `variant` | `neutral \| primary \| accent \| success \| warning \| danger \| outline` | `neutral` |
| `pill` | `boolean` | `false` |

### Toast / ToastContainer

Global toast queue driven by the `useToast()` composable (see [Composables](#composables)). Mount `<ToastContainer />` once near your app root; call `useToast().push(...)` (or `.success/.danger/.warning/.info`) from anywhere.

`ToastContainer` prop: `position` — `top-right | top-left | bottom-right | bottom-left` (default `top-right`).

### Spinner

| Prop | Type | Default |
|---|---|---|
| `size` | `sm \| md \| lg` | `md` |
| `label` | `string` | `'Loading…'` (screen-reader only text) |

### Placeholder

Skeleton-loading block.

| Prop | Type | Default |
|---|---|---|
| `width` | `string` | `'100%'` |
| `height` | `string` | `'1.6rem'` |
| `rounded` | `sm \| md \| lg \| pill` | `md` |
| `animated` | `boolean` | `true` |

### ProgressBar

| Prop | Type | Default |
|---|---|---|
| `value` | `number` | `0` |
| `max` | `number` | `100` |
| `variant` | `primary \| accent \| success \| warning \| danger` | `primary` |
| `label` | `string` | — |
| `showValue` | `boolean` | `false` |
| `striped` | `boolean` | `false` |

---

## Navigation

### Navbar

General-purpose top nav bar with a built-in mobile hamburger (opens an `Offcanvas`).

| Prop | Type | Default |
|---|---|---|
| `sticky` | `boolean` | `true` |
| `dark` | `boolean` | `false` |

Slots: `brand`, `links`, `actions`.

### Breadcrumb

| Prop | Type | Notes |
|---|---|---|
| `items` | `{ label, href? \| to? }[]` | Last item renders as plain (non-link) current-page text |

### Pagination

Controlled numeric pager with ellipsis collapsing.

| Prop | Type | Default |
|---|---|---|
| `modelValue` | `number` | — (required) |
| `total` | `number` | — (required) |
| `siblingCount` | `number` | `1` |

Emits `update:modelValue`.

### Tabs

Doubles as "Navs" — pass `pills` for the pill-nav look.

| Prop | Type | Default |
|---|---|---|
| `tabs` | `{ id, label, disabled? }[]` | — (required) |
| `modelValue` | `string` | first tab id |
| `pills` | `boolean` | `false` |
| `fill` | `boolean` | `false` |

Content per tab is provided via a named slot matching the tab's `id`:

```vue
<Tabs :tabs="[{ id: 'a', label: 'Overview' }, { id: 'b', label: 'Details' }]">
  <template #a>Overview…</template>
  <template #b>Details…</template>
</Tabs>
```

### Dropdown

Headless-ish menu: you provide the trigger and the menu content.

| Prop | Type | Default |
|---|---|---|
| `align` | `start \| end` | `start` |

```vue
<Dropdown>
  <template #trigger><AppButton variant="outline">Options ▾</AppButton></template>
  <a href="#">Edit</a>
  <button type="button">Delete</button>
</Dropdown>
```

### Offcanvas

Slide-in panel, controlled via `v-model`.

| Prop | Type | Default |
|---|---|---|
| `modelValue` | `boolean` | `false` |
| `placement` | `start \| end \| top \| bottom` | `end` |
| `title` | `string` | — |

### ScrollspyNav

Highlights the in-view section in a vertical "on this page" nav, backed by `useScrollspy`.

| Prop | Type | Notes |
|---|---|---|
| `items` | `{ id, label }[]` | `id` must match a real element id in the page |

---

## Overlays

### Modal

| Prop | Type | Default |
|---|---|---|
| `modelValue` | `boolean` | `false` |
| `title` | `string` | — |
| `size` | `sm \| md \| lg \| full` | `md` |
| `closeOnBackdrop` | `boolean` | `true` |

Slots: default (body), `footer` (scoped with `{ close }`).

### BottomSheet

Mobile-pattern sheet sliding up from the bottom edge, with a drag handle.

| Prop | Type | Default |
|---|---|---|
| `modelValue` | `boolean` | `false` |
| `title` | `string` | — |

### Tooltip

CSS-positioned hover/focus hint, no external positioning library.

| Prop | Type | Default |
|---|---|---|
| `text` | `string` | — (required) |
| `placement` | `top \| bottom \| left \| right` | `top` |

Wrap the trigger element in the default slot.

### Popover

Click-triggered, richer than Tooltip (title + body).

| Prop | Type | Default |
|---|---|---|
| `title` | `string` | — |
| `placement` | `top \| bottom \| left \| right` | `bottom` |

Slots: `trigger`, default (body).

---

## Content

### Card

The general-purpose teaser card content grids are built from.

| Prop | Type | Default |
|---|---|---|
| `image` | `string` | — |
| `imageAlt` | `string` | — |
| `eyebrow` | `string` | — |
| `title` | `string` | — |
| `href` | `string` | — (renders the whole card as a link when set) |
| `variant` | `default \| outlined \| flat` | `default` |

Slots: default (body text), `footer`.

### Accordion / AccordionItem

`Accordion` manages which `AccordionItem`s are open (single-open by default; pass `multiple` to allow several).

`Accordion` prop: `multiple` (`boolean`, default `false`).
`AccordionItem` prop: `title` (`string`, required).

```vue
<Accordion>
  <AccordionItem title="Question one">Answer…</AccordionItem>
  <AccordionItem title="Question two">Answer…</AccordionItem>
</Accordion>
```

### Collapse

A single standalone show/hide toggle (the primitive `AccordionItem` is built on).

| Prop | Type | Default |
|---|---|---|
| `modelValue` | `boolean` | `false` |
| `label` | `string` | — (required) |

### ListGroup

| Prop | Type | Default |
|---|---|---|
| `items` | `{ label, description?, href?, to?, active?, disabled?, badge? }[]` | `[]` |
| `flush` | `boolean` | `false` |

Use the default slot instead of `items` for fully custom row markup.

### Carousel

Scroll-snap based slider — no JS drag library, works with native touch swipe.

| Prop | Type | Default |
|---|---|---|
| `slideCount` | `number` | — (required, must match the number of default-slot children) |
| `autoplay` | `boolean` | `false` |
| `interval` | `number` | `6000` (ms) |

```vue
<Carousel :slide-count="3">
  <Card title="One">…</Card>
  <Card title="Two">…</Card>
  <Card title="Three">…</Card>
</Carousel>
```

---

## Forms

All form fields follow the same contract: `v-model`, a `label` prop, and `hint` / `error` props for helper/validation text.

### TextInput

| Prop | Type | Default |
|---|---|---|
| `modelValue` | `string \| number` | `''` |
| `label`, `placeholder`, `hint`, `error` | `string` | — |
| `type` | `string` | `text` |
| `required`, `disabled` | `boolean` | `false` |

### Textarea

Same shape as `TextInput` plus `rows` (`number`, default `4`).

### FloatingLabel

Bootstrap-style floating label field (label starts inline, floats above on focus/value).

| Prop | Type | Default |
|---|---|---|
| `modelValue` | `string \| number` | `''` |
| `label` | `string` | — (required) |
| `type` | `string` | `text` |
| `error` | `string` | — |

### InputGroup

Wraps a control with prepend/append addons sharing one border.

| Prop | Type |
|---|---|
| `label` | `string` |

Slots: `prepend`, default (the `<input>`/`<select>`), `append`.

```vue
<InputGroup label="Website">
  <template #prepend>https://</template>
  <input type="text" placeholder="example.com" />
</InputGroup>
```

### Select

Styled wrapper around the native `<select>`.

| Prop | Type | Default |
|---|---|---|
| `modelValue` | `string \| number` | `''` |
| `options` | `(string \| { value, label })[]` | — (required) |
| `label`, `placeholder`, `hint`, `error` | `string` | — |
| `required` | `boolean` | `false` |

### Checkbox

`v-model` accepts a plain boolean, or (with `value` set) participates in an array-valued group `v-model` exactly like native checkboxes.

| Prop | Type | Default |
|---|---|---|
| `modelValue` | `boolean \| array` | `false` |
| `value` | `string \| number \| boolean` | — |
| `label` | `string` | — (required) |
| `disabled` | `boolean` | `false` |

### Radio

| Prop | Type | Default |
|---|---|---|
| `modelValue` | `string \| number \| boolean` | — |
| `value` | same | — (required) |
| `name` | `string` | — (required — groups radios) |
| `label` | `string` | — (required) |
| `disabled` | `boolean` | `false` |

### Switch

Boolean toggle, same contract as `Checkbox` (plain boolean only), styled as a pill switch. A convenience extra alongside Checks & Radios for settings-style on/off controls.

| Prop | Type | Default |
|---|---|---|
| `modelValue` | `boolean` | `false` |
| `label` | `string` | — (required) |
| `disabled` | `boolean` | `false` |

### RangeSlider

| Prop | Type | Default |
|---|---|---|
| `modelValue` | `number` | — (required) |
| `min` / `max` / `step` | `number` | `0` / `100` / `1` |
| `label` | `string` | — |
| `showValue` | `boolean` | `true` |

---

## Sections

Pre-assembled, page-ready blocks built from the components above — the fastest path from "empty project" to "looks like a real site."

### HeroSection

Full-bleed navy hero with an optional background image, eyebrow, heading and two CTAs.

| Prop | Type |
|---|---|
| `eyebrow`, `title`, `text`, `image` | `string` |
| `primaryAction`, `secondaryAction` | `{ label, href }` |

### TopBar

Thin utility strip (accessibility toggles, language switcher, secondary links) — sits above the main `Navbar`.

| Prop | Type |
|---|---|
| `links` | `{ label, href }[]` |

Default slot: right-aligned meta content (e.g. a language switcher).

### SiteHeader

Combines `TopBar` + `Navbar` into the full header pattern. Slots: `utility`, `brand`, `links`, `actions`.

### SiteFooter

Multi-column footer: brand blurb, link columns, social icons, legal row.

| Prop | Type |
|---|---|
| `columns` | `{ title, links: { label, href }[] }[]` |
| `legalLinks` | `{ label, href }[]` |
| `socialLinks` | `{ label, href, icon }[]` (`icon` is raw SVG markup) |
| `copyright` | `string` |

Slot: `brand`.

### TeaserGrid

The topic-card grid section (Cybersecurity / Regions / … pattern).

| Prop | Type |
|---|---|
| `eyebrow`, `title`, `intro` | `string` |
| `items` | `{ title, text, image?, href }[]` |

### CtaBanner

Full-width yellow banner for one strong call to action.

| Prop | Type |
|---|---|
| `title`, `text` | `string` |
| `action` | `{ label, href }` |

### StatsSection

A row of key figures on a dark background.

| Prop | Type |
|---|---|
| `title` | `string` |
| `stats` | `{ value, label }[]` |

### NewsletterSection

Email subscribe block; emits `submit` with the entered address.

| Prop | Type |
|---|---|
| `title`, `text` | `string` |

---

## Composables

### `useToast()`

```js
const toast = useToast()
toast.push('Message', { variant: 'info', title: '', duration: 4000 })
toast.success('Saved.')
toast.danger('Failed.')
toast.warning('Careful.')
toast.info('FYI.')
```

Requires a `<ToastContainer />` mounted somewhere in the app.

### `useClickOutside(elRef, callback)`

Runs `callback` when a click lands outside the element referenced by `elRef`. Used internally by `Dropdown` and `Popover`.

### `useId(prefix?)`

Returns a stable, unique string id (`${prefix}-${n}`) for wiring `aria-*` attributes between a control and its label/panel.

### `useScrollspy(ids, { rootMargin? })`

IntersectionObserver-based section tracker. Returns `{ activeId }`. Used internally by `ScrollspyNav`.

---

## Accessibility notes

- Every interactive component has a visible focus ring (`--cui-focus-ring`, 3px, high contrast) built to WCAG 2.1 AA conformance.
- `Modal`, `Offcanvas` and `BottomSheet` set `role="dialog"` / `aria-modal="true"` and lock body scroll while open — wire in your own focus trap if you need strict keyboard containment (not bundled, to avoid a hard dependency).
- Form fields associate label, hint and error text via `id` / `aria-describedby` / `aria-invalid` automatically.
- `Accordion`, `Tabs` and `ScrollspyNav` use `aria-expanded` / `aria-selected` / `role="tablist"` where applicable.
- Add a skip link (`.cui-skip-link`, provided in `base.css`) at the top of your page shell:

```vue
<a href="#main" class="cui-skip-link">Skip to main content</a>
```
