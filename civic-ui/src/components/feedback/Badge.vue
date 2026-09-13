<script setup>
defineProps({
  variant: {
    type: String,
    default: 'neutral',
    validator: (v) => ['neutral', 'primary', 'accent', 'success', 'warning', 'danger', 'outline'].includes(v)
  },
  pill: { type: Boolean, default: false }
})
</script>

<template>
  <span class="cui-badge" :class="[`cui-badge--${variant}`, { 'cui-badge--pill': pill }]">
    <slot />
  </span>
</template>

<style scoped>
.cui-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.8rem;
  border-radius: var(--cui-radius-sm);
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: 0.01em;
  border: 1px solid transparent;
}

.cui-badge--pill {
  border-radius: var(--cui-radius-pill);
}

.cui-badge--neutral {
  background: var(--cui-bg-muted);
  color: var(--cui-text);
}
.cui-badge--primary {
  background: var(--cui-color-navy);
  color: var(--cui-color-white);
}
.cui-badge--accent {
  background: var(--cui-color-yellow);
  color: var(--cui-color-navy);
}
.cui-badge--success {
  background: #e7f5ec;
  color: #0e4326;
}
.cui-badge--warning {
  background: #fdf1dc;
  color: #5c3600;
}
.cui-badge--danger {
  background: #fbe9e8;
  color: #6b1512;
}
.cui-badge--outline {
  background: transparent;
  border-color: currentColor;
  color: var(--cui-text);
}
</style>
