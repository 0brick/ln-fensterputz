<script setup>
// Groups a row of AppButtons into one visually joined control (segmented
// button / toolbar pattern). Just wraps children — it doesn't manage state,
// so it works with plain buttons or v-for'd AppButtons alike.
defineProps({
  vertical: { type: Boolean, default: false },
  ariaLabel: { type: String, default: 'Button group' }
})
</script>

<template>
  <div class="cui-btn-group" :class="{ 'cui-btn-group--vertical': vertical }" role="group" :aria-label="ariaLabel">
    <slot />
  </div>
</template>

<style scoped>
.cui-btn-group {
  display: inline-flex;
}

.cui-btn-group--vertical {
  flex-direction: column;
}

.cui-btn-group :deep(.cui-btn) {
  border-radius: 0;
}

.cui-btn-group:not(.cui-btn-group--vertical) :deep(.cui-btn:not(:last-child)) {
  border-right: 1.5px solid rgba(255, 255, 255, 0.2);
}

.cui-btn-group--vertical :deep(.cui-btn:not(:last-child)) {
  border-bottom: 1.5px solid rgba(255, 255, 255, 0.2);
}

.cui-btn-group:not(.cui-btn-group--vertical) :deep(.cui-btn:first-child) {
  border-top-left-radius: var(--cui-radius-md);
  border-bottom-left-radius: var(--cui-radius-md);
}
.cui-btn-group:not(.cui-btn-group--vertical) :deep(.cui-btn:last-child) {
  border-top-right-radius: var(--cui-radius-md);
  border-bottom-right-radius: var(--cui-radius-md);
}

.cui-btn-group--vertical :deep(.cui-btn:first-child) {
  border-top-left-radius: var(--cui-radius-md);
  border-top-right-radius: var(--cui-radius-md);
}
.cui-btn-group--vertical :deep(.cui-btn:last-child) {
  border-bottom-left-radius: var(--cui-radius-md);
  border-bottom-right-radius: var(--cui-radius-md);
}
</style>
