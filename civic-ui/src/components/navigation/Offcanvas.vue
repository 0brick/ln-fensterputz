<script setup>
// Slide-in panel, used for the mobile nav drawer but generic enough for
// filter panels, cart drawers etc. Controlled via v-model like Modal.
import { watch } from 'vue'
import CloseButton from '../button/CloseButton.vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  placement: { type: String, default: 'end', validator: (v) => ['start', 'end', 'top', 'bottom'].includes(v) },
  title: { type: String, default: '' }
})
const emit = defineEmits(['update:modelValue'])

function close() {
  emit('update:modelValue', false)
}

watch(
  () => props.modelValue,
  (open) => {
    document.body.style.overflow = open ? 'hidden' : ''
  }
)
</script>

<template>
  <teleport to="body">
    <transition name="cui-offcanvas-backdrop">
      <div v-if="modelValue" class="cui-offcanvas-backdrop" @click="close" />
    </transition>
    <transition :name="`cui-offcanvas-${placement}`">
      <div
        v-if="modelValue"
        class="cui-offcanvas"
        :class="`cui-offcanvas--${placement}`"
        role="dialog"
        aria-modal="true"
        :aria-label="title"
        @keydown.escape="close"
      >
        <div class="cui-offcanvas__header">
          <h2 class="cui-offcanvas__title">{{ title }}</h2>
          <CloseButton label="Close panel" @click="close" />
        </div>
        <div class="cui-offcanvas__body">
          <slot />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style scoped>
.cui-offcanvas-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 29, 53, 0.5);
  z-index: var(--cui-z-offcanvas);
}

.cui-offcanvas {
  position: fixed;
  z-index: calc(var(--cui-z-offcanvas) + 1);
  background: var(--cui-color-white);
  display: flex;
  flex-direction: column;
  box-shadow: var(--cui-shadow-lg);
}

.cui-offcanvas--start,
.cui-offcanvas--end {
  top: 0;
  bottom: 0;
  width: min(340px, 88vw);
}
.cui-offcanvas--start {
  left: 0;
}
.cui-offcanvas--end {
  right: 0;
}

.cui-offcanvas--top,
.cui-offcanvas--bottom {
  left: 0;
  right: 0;
  max-height: 80vh;
}
.cui-offcanvas--top {
  top: 0;
}
.cui-offcanvas--bottom {
  bottom: 0;
}

.cui-offcanvas__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--cui-space-4) var(--cui-space-4) var(--cui-space-3);
  border-bottom: 1px solid var(--cui-border);
}

.cui-offcanvas__title {
  font-size: 1.8rem;
  margin: 0;
}

.cui-offcanvas__body {
  padding: var(--cui-space-4);
  overflow-y: auto;
}

.cui-offcanvas-backdrop-enter-active,
.cui-offcanvas-backdrop-leave-active {
  transition: opacity var(--cui-duration) var(--cui-ease);
}
.cui-offcanvas-backdrop-enter-from,
.cui-offcanvas-backdrop-leave-to {
  opacity: 0;
}

.cui-offcanvas-start-enter-active,
.cui-offcanvas-start-leave-active,
.cui-offcanvas-end-enter-active,
.cui-offcanvas-end-leave-active,
.cui-offcanvas-top-enter-active,
.cui-offcanvas-top-leave-active,
.cui-offcanvas-bottom-enter-active,
.cui-offcanvas-bottom-leave-active {
  transition: transform var(--cui-duration-slow) var(--cui-ease);
}

.cui-offcanvas-start-enter-from,
.cui-offcanvas-start-leave-to {
  transform: translateX(-100%);
}
.cui-offcanvas-end-enter-from,
.cui-offcanvas-end-leave-to {
  transform: translateX(100%);
}
.cui-offcanvas-top-enter-from,
.cui-offcanvas-top-leave-to {
  transform: translateY(-100%);
}
.cui-offcanvas-bottom-enter-from,
.cui-offcanvas-bottom-leave-to {
  transform: translateY(100%);
}
</style>
