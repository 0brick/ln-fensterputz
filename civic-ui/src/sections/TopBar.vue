<script setup>
// The thin utility strip above the main navbar — accessibility toggles,
// language switcher, secondary links — a common institutional header
// pattern: real navigation lives below this, this row is meta/utility only.
defineProps({
  links: { type: Array, default: () => [] } // [{ label, href }]
})
</script>

<template>
  <div class="cui-topbar">
    <div class="cui-container cui-topbar__inner">
      <nav class="cui-topbar__links" aria-label="Utility navigation">
        <a v-for="link in links" :key="link.label" :href="link.href">{{ link.label }}</a>
      </nav>
      <div class="cui-topbar__meta">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.cui-topbar {
  background: var(--cui-color-navy);
  color: rgba(255, 255, 255, 0.85);
  font-size: 1.2rem;
}

.cui-topbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--cui-space-4);
  min-height: 4rem;
  flex-wrap: wrap;
}

.cui-topbar__links {
  display: flex;
  gap: var(--cui-space-4);
  flex-wrap: wrap;
}

.cui-topbar__links a {
  color: inherit;
  text-decoration: none;
  font-weight: 600;
}
.cui-topbar__links a:hover {
  color: var(--cui-color-yellow);
}

.cui-topbar__meta {
  display: flex;
  align-items: center;
  gap: var(--cui-space-3);
}
</style>
