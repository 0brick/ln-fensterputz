<script setup>
import CloseButton from '../button/CloseButton.vue'

defineProps({
  variant: { type: String, default: 'info' },
  title: { type: String, default: '' }
})
defineEmits(['dismiss'])
</script>

<template>
  <div class="cui-toast" :class="`cui-toast--${variant}`" role="status" aria-live="polite">
    <div class="cui-toast__body">
      <p v-if="title" class="cui-toast__title">{{ title }}</p>
      <div class="cui-toast__text"><slot /></div>
    </div>
    <CloseButton label="Dismiss notification" @click="$emit('dismiss')" />
  </div>
</template>

<style scoped>
.cui-toast {
  display: flex;
  align-items: flex-start;
  gap: var(--cui-space-3);
  min-width: 280px;
  max-width: 380px;
  padding: var(--cui-space-3) var(--cui-space-3) var(--cui-space-3) var(--cui-space-4);
  background: var(--cui-color-white);
  border-left: 4px solid var(--cui-color-teal);
  border-radius: var(--cui-radius-md);
  box-shadow: var(--cui-shadow-lg);
  font-size: 1.35rem;
  animation: cui-toast-in var(--cui-duration-slow) var(--cui-ease);
}

.cui-toast__title {
  margin: 0 0 0.2rem;
  font-weight: 700;
}

.cui-toast__body {
  flex: 1;
}

.cui-toast--success {
  border-left-color: var(--cui-color-success);
}
.cui-toast--warning {
  border-left-color: var(--cui-color-warning);
}
.cui-toast--danger {
  border-left-color: var(--cui-color-danger);
}

@keyframes cui-toast-in {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
