<script setup>
// A general-purpose top nav bar: brand on the left, nav items in the
// middle/right, and an automatic hamburger that opens the nav items in an
// Offcanvas below the `mobileBreakpoint`. Bring your own items via slots so
// this works for a simple 3-link nav or a full institutional mega menu.
import { ref } from 'vue'
import Offcanvas from './Offcanvas.vue'

defineProps({
  sticky: { type: Boolean, default: true },
  dark: { type: Boolean, default: false }
})

const mobileOpen = ref(false)
</script>

<template>
  <header class="cui-navbar" :class="{ 'cui-navbar--sticky': sticky, 'cui-navbar--dark': dark }">
    <div class="cui-container cui-navbar__inner">
      <div class="cui-navbar__brand">
        <slot name="brand" />
      </div>

      <nav class="cui-navbar__links cui-navbar__links--desktop" aria-label="Main">
        <slot name="links" />
      </nav>

      <div class="cui-navbar__actions">
        <slot name="actions" />
        <button
          type="button"
          class="cui-navbar__toggle"
          aria-label="Toggle navigation menu"
          :aria-expanded="mobileOpen"
          @click="mobileOpen = true"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </div>

    <Offcanvas v-model="mobileOpen" placement="end" title="Menu">
      <nav class="cui-navbar__links cui-navbar__links--mobile" aria-label="Main (mobile)" @click="mobileOpen = false">
        <slot name="links" />
      </nav>
    </Offcanvas>
  </header>
</template>

<style scoped>
.cui-navbar {
  background: var(--cui-color-white);
  border-bottom: 1px solid var(--cui-border);
}

.cui-navbar--sticky {
  position: sticky;
  top: 0;
  z-index: var(--cui-z-sticky);
}

.cui-navbar--dark {
  background: var(--cui-color-navy);
  border-bottom-color: rgba(255, 255, 255, 0.12);
  color: var(--cui-color-white);
}

.cui-navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--cui-space-4);
  min-height: 7.2rem;
}

.cui-navbar__brand :deep(a) {
  display: flex;
  align-items: center;
  gap: var(--cui-space-2);
  font-weight: 700;
  font-size: 1.8rem;
  color: inherit;
  text-decoration: none;
}

.cui-navbar__links--desktop {
  display: none;
  align-items: center;
  gap: var(--cui-space-5);
}

.cui-navbar__links :deep(a) {
  font-weight: 600;
  font-size: 1.4rem;
  color: inherit;
  text-decoration: none;
  padding: 0.6rem 0;
  border-bottom: 2px solid transparent;
}
.cui-navbar__links :deep(a:hover),
.cui-navbar__links :deep(a.router-link-active) {
  border-color: var(--cui-color-yellow);
}

.cui-navbar__actions {
  display: flex;
  align-items: center;
  gap: var(--cui-space-3);
}

.cui-navbar__toggle {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 4rem;
  height: 4rem;
  border: 1.5px solid var(--cui-border);
  border-radius: var(--cui-radius-md);
  background: none;
  cursor: pointer;
}
.cui-navbar__toggle span {
  display: block;
  height: 2px;
  background: currentColor;
  margin-inline: 1rem;
}

.cui-navbar__links--mobile {
  display: flex;
  flex-direction: column;
  gap: var(--cui-space-4);
}

@media (min-width: 900px) {
  .cui-navbar__links--desktop {
    display: flex;
  }
  .cui-navbar__toggle {
    display: none;
  }
}
</style>
