# Civic UI

A clean, professional Vue 3 component library with a calm, high-trust institutional design language — deep navy ink, a strong yellow accent, generous whitespace, high-contrast focus states. Drop it into a new project and build a real, accessible site with it; every part is themeable through CSS custom properties.

> **Font note:** ships with **Source Sans 3 / Source Serif 4** (fully open source) — see [`docs/DOCUMENTATION.md`](./docs/DOCUMENTATION.md#theming) to swap in your own.

## Install

```bash
npm install civic-ui vue
```

## Quick start

```js
// main.js
import { createApp } from 'vue'
import CivicUI from 'civic-ui'
import App from './App.vue'

createApp(App).use(CivicUI).mount('#app')
```

```vue
<template>
  <cui-hero-section title="Welcome" text="Built with Civic UI." />
</template>
```

Or import only what you need:

```vue
<script setup>
import { AppButton, Card } from 'civic-ui'
</script>
```

## Develop locally

```bash
npm install
npm run dev      # playground app showcasing every component
npm run build    # builds the publishable library into dist/
```

## Documentation

Full component reference, props, events, slots and theming guide: [`docs/DOCUMENTATION.md`](./docs/DOCUMENTATION.md).
