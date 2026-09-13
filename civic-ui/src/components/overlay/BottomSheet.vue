<script setup>
// A mobile-pattern sheet that slides up from the bottom edge, with a drag
// handle. Functionally similar to Offcanvas placement="bottom" but styled
// and sized for the "quick action panel on a phone" use case specifically.
import { watch } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
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
    <transition name="cui-sheet-fade">
      <div v-if="modelValue" class="cui-sheet-backdrop" @click="close" />
    </transition>
    <transition name="cui-sheet-slide">
      <div v-if="modelValue" class="cui-sheet" role="dialog" aria-modal="true" :aria-label="title" @keydown.escape="close">
        <div class="cui-sheet__handle" @click="close" />
        <div v-if="title" class="cui-sheet__header">
          <h2 class="cui-sheet__title">{{ title }}</h2>
        </div>
        <div class="cui-sheet__body">
          <slot />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style scoped>
.cui-sheet-backdrop {
  position: fixed;
  inset: 0;
  z-index: var(--cui-z-offcanvas);
  background: rgba(0, 29, 53, 0.5);
}

.cui-sheet {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: calc(var(--cui-z-offcanvas) + 1);
  max-height: 85vh;
  overflow-y: auto;
  background: var(--cui-color-white);
  border-radius: var(--cui-radius-lg) var(--cui-radius-lg) 0 0;
  box-shadow: var(--cui-shadow-lg);
  padding-bottom: var(--cui-space-5);
}

.cui-sheet__handle {
  width: 4rem;
  height: 4px;
  border-radius: var(--cui-radius-pill);
  background: var(--cui-border);
  margin: var(--cui-space-3) auto;
  cursor: pointer;
}

.cui-sheet__header {
  padding: 0 var(--cui-space-5) var(--cui-space-3);
}

.cui-sheet__title {
  margin: 0;
  font-size: 1.9rem;
}

.cui-sheet__body {
  padding: 0 var(--cui-space-5);
}

.cui-sheet-fade-enter-active,
.cui-sheet-fade-leave-active {
  transition: opacity var(--cui-duration) var(--cui-ease);
}
.cui-sheet-fade-enter-from,
.cui-sheet-fade-leave-to {
  opacity: 0;
}

.cui-sheet-slide-enter-active,
.cui-sheet-slide-leave-active {
  transition: transform var(--cui-duration-slow) var(--cui-ease);
}
.cui-sheet-slide-enter-from,
.cui-sheet-slide-leave-to {
  transform: translateY(100%);
}
</style>
