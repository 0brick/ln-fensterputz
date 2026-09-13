<script setup>
// Like Tooltip but click-triggered and holds rich content (a heading + a
// body slot) instead of a single line of text.
import { ref } from 'vue'
import { useClickOutside } from '../../composables/useClickOutside'

defineProps({
  title: { type: String, default: '' },
  placement: { type: String, default: 'bottom', validator: (v) => ['top', 'bottom', 'left', 'right'].includes(v) }
})

const open = ref(false)
const root = ref(null)
useClickOutside(root, () => (open.value = false))
</script>

<template>
  <span ref="root" class="cui-popover-wrap">
    <span @click="open = !open">
      <slot name="trigger" :open="open" />
    </span>
    <transition name="cui-popover-fade">
      <div v-if="open" class="cui-popover" :class="`cui-popover--${placement}`" role="dialog">
        <p v-if="title" class="cui-popover__title">{{ title }}</p>
        <div class="cui-popover__body"><slot /></div>
      </div>
    </transition>
  </span>
</template>

<style scoped>
.cui-popover-wrap {
  position: relative;
  display: inline-flex;
}

.cui-popover {
  position: absolute;
  z-index: var(--cui-z-popover);
  width: 260px;
  padding: var(--cui-space-4);
  background: var(--cui-color-white);
  border: 1px solid var(--cui-border);
  border-radius: var(--cui-radius-md);
  box-shadow: var(--cui-shadow-md);
}

.cui-popover--top {
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
}
.cui-popover--bottom {
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
}
.cui-popover--left {
  right: calc(100% + 10px);
  top: 0;
}
.cui-popover--right {
  left: calc(100% + 10px);
  top: 0;
}

.cui-popover__title {
  margin: 0 0 0.6rem;
  font-weight: 700;
  font-size: 1.4rem;
}

.cui-popover__body {
  font-size: 1.3rem;
  color: var(--cui-text-muted);
}

.cui-popover-fade-enter-active,
.cui-popover-fade-leave-active {
  transition: opacity var(--cui-duration-fast) var(--cui-ease), transform var(--cui-duration-fast) var(--cui-ease);
}
.cui-popover-fade-enter-from,
.cui-popover-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -4px);
}
</style>
