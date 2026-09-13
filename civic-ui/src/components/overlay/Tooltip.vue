<script setup>
// CSS-only positioning (no floating-ui dependency) — good enough for short
// text hints anchored to a single trigger element. Wrap whatever you want
// the tooltip attached to in the default slot.
import { ref } from 'vue'

defineProps({
  text: { type: String, required: true },
  placement: { type: String, default: 'top', validator: (v) => ['top', 'bottom', 'left', 'right'].includes(v) }
})

const visible = ref(false)
</script>

<template>
  <span
    class="cui-tooltip-wrap"
    @mouseenter="visible = true"
    @mouseleave="visible = false"
    @focusin="visible = true"
    @focusout="visible = false"
  >
    <slot />
    <span v-if="visible" class="cui-tooltip" :class="`cui-tooltip--${placement}`" role="tooltip">
      {{ text }}
    </span>
  </span>
</template>

<style scoped>
.cui-tooltip-wrap {
  position: relative;
  display: inline-flex;
}

.cui-tooltip {
  position: absolute;
  z-index: var(--cui-z-tooltip);
  padding: 0.6rem 1rem;
  background: var(--cui-color-navy);
  color: var(--cui-color-white);
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: var(--cui-radius-sm);
  white-space: nowrap;
  pointer-events: none;
  animation: cui-tooltip-in var(--cui-duration-fast) var(--cui-ease);
}

.cui-tooltip--top {
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
}
.cui-tooltip--bottom {
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
}
.cui-tooltip--left {
  right: calc(100% + 8px);
  top: 50%;
  transform: translateY(-50%);
}
.cui-tooltip--right {
  left: calc(100% + 8px);
  top: 50%;
  transform: translateY(-50%);
}

@keyframes cui-tooltip-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
