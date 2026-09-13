<script setup>
import { watch } from 'vue'
import CloseButton from '../button/CloseButton.vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: '' },
  size: { type: String, default: 'md', validator: (v) => ['sm', 'md', 'lg', 'full'].includes(v) },
  closeOnBackdrop: { type: Boolean, default: true }
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
    <transition name="cui-modal-fade">
      <div v-if="modelValue" class="cui-modal-backdrop" @click="closeOnBackdrop && close()">
        <div
          class="cui-modal"
          :class="`cui-modal--${size}`"
          role="dialog"
          aria-modal="true"
          :aria-label="title"
          @click.stop
          @keydown.escape="close"
        >
          <div class="cui-modal__header">
            <h2 class="cui-modal__title">{{ title }}</h2>
            <CloseButton label="Close dialog" @click="close" />
          </div>
          <div class="cui-modal__body">
            <slot />
          </div>
          <div v-if="$slots.footer" class="cui-modal__footer">
            <slot name="footer" :close="close" />
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style scoped>
.cui-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: var(--cui-z-modal);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--cui-space-4);
  background: rgba(0, 29, 53, 0.55);
}

.cui-modal {
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  background: var(--cui-color-white);
  border-radius: var(--cui-radius-lg);
  box-shadow: var(--cui-shadow-lg);
}

.cui-modal--sm {
  max-width: 420px;
}
.cui-modal--md {
  max-width: 620px;
}
.cui-modal--lg {
  max-width: 900px;
}
.cui-modal--full {
  max-width: none;
  width: 96vw;
  height: 92vh;
}

.cui-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--cui-space-4) var(--cui-space-5);
  border-bottom: 1px solid var(--cui-border);
}

.cui-modal__title {
  margin: 0;
  font-size: 2rem;
}

.cui-modal__body {
  padding: var(--cui-space-5);
  overflow-y: auto;
}

.cui-modal__footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--cui-space-3);
  padding: var(--cui-space-4) var(--cui-space-5);
  border-top: 1px solid var(--cui-border);
}

.cui-modal-fade-enter-active,
.cui-modal-fade-leave-active {
  transition: opacity var(--cui-duration) var(--cui-ease);
}
.cui-modal-fade-enter-from,
.cui-modal-fade-leave-to {
  opacity: 0;
}
.cui-modal-fade-enter-active .cui-modal,
.cui-modal-fade-leave-active .cui-modal {
  transition: transform var(--cui-duration) var(--cui-ease);
}
.cui-modal-fade-enter-from .cui-modal,
.cui-modal-fade-leave-to .cui-modal {
  transform: translateY(16px) scale(0.98);
}
</style>
