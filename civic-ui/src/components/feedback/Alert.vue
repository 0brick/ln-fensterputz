<script setup>
import { ref } from 'vue'
import CloseButton from '../button/CloseButton.vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'info',
    validator: (v) => ['info', 'success', 'warning', 'danger', 'neutral'].includes(v)
  },
  title: { type: String, default: '' },
  dismissible: { type: Boolean, default: false }
})
const emit = defineEmits(['dismiss'])

const visible = ref(true)
function dismiss() {
  visible.value = false
  emit('dismiss')
}
</script>

<template>
  <div v-if="visible" class="cui-alert" :class="`cui-alert--${variant}`" role="alert">
    <span class="cui-alert__icon" aria-hidden="true">
      <svg v-if="variant === 'success'" viewBox="0 0 20 20" width="20" height="20"><path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
      <svg v-else-if="variant === 'danger'" viewBox="0 0 20 20" width="20" height="20"><path d="M10 2l9 16H1L10 2zM10 8v4M10 15h.01" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
      <svg v-else-if="variant === 'warning'" viewBox="0 0 20 20" width="20" height="20"><path d="M10 2l9 16H1L10 2zM10 8v4M10 15h.01" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
      <svg v-else viewBox="0 0 20 20" width="20" height="20"><circle cx="10" cy="10" r="8.5" fill="none" stroke="currentColor" stroke-width="1.6" /><path d="M10 9v5M10 6h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>
    </span>
    <div class="cui-alert__body">
      <p v-if="title" class="cui-alert__title">{{ title }}</p>
      <div class="cui-alert__text"><slot /></div>
    </div>
    <CloseButton v-if="dismissible" class="cui-alert__close" label="Dismiss alert" @click="dismiss" />
  </div>
</template>

<style scoped>
.cui-alert {
  display: flex;
  align-items: flex-start;
  gap: var(--cui-space-3);
  padding: var(--cui-space-4);
  border-radius: var(--cui-radius-md);
  border: 1.5px solid transparent;
  border-left-width: 4px;
  font-size: 1.4rem;
  line-height: 1.55;
}

.cui-alert__icon {
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.cui-alert__title {
  margin: 0 0 0.2rem;
  font-weight: 700;
}

.cui-alert__text {
  flex: 1;
}
.cui-alert__text > :last-child {
  margin-bottom: 0;
}

.cui-alert__close {
  margin: -0.4rem -0.4rem -0.4rem auto;
  flex-shrink: 0;
}

.cui-alert--info {
  background: #e6f4f5;
  border-color: var(--cui-color-teal);
  color: #023a3f;
}
.cui-alert--success {
  background: #e7f5ec;
  border-color: var(--cui-color-success);
  color: #0e4326;
}
.cui-alert--warning {
  background: #fdf1dc;
  border-color: var(--cui-color-warning);
  color: #5c3600;
}
.cui-alert--danger {
  background: #fbe9e8;
  border-color: var(--cui-color-danger);
  color: #6b1512;
}
.cui-alert--neutral {
  background: var(--cui-bg-subtle);
  border-color: var(--cui-border);
  color: var(--cui-text);
}
</style>
