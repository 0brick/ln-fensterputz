<script setup>
// Renders as a native <button> by default, but flips to an <a> when `href`
// is passed so it also works as a call-to-action link without a second
// component. `tag` lets a consuming app swap in router-link etc.
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'accent', 'outline', 'ghost', 'link', 'danger'].includes(v)
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v)
  },
  tag: { type: [String, Object], default: null },
  href: { type: String, default: null },
  type: { type: String, default: 'button' },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  block: { type: Boolean, default: false }
})

const resolvedTag = computed(() => props.tag ?? (props.href ? 'a' : 'button'))
</script>

<template>
  <component
    :is="resolvedTag"
    class="cui-btn"
    :class="[`cui-btn--${variant}`, `cui-btn--${size}`, { 'cui-btn--block': block, 'cui-btn--loading': loading }]"
    :href="href"
    :type="resolvedTag === 'button' ? type : undefined"
    :disabled="resolvedTag === 'button' ? disabled || loading : undefined"
    :aria-disabled="resolvedTag !== 'button' && (disabled || loading) ? 'true' : undefined"
    :aria-busy="loading ? 'true' : undefined"
  >
    <span v-if="loading" class="cui-btn__spinner" aria-hidden="true" />
    <span class="cui-btn__label"><slot /></span>
  </component>
</template>

<style scoped>
.cui-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--cui-space-2);
  font-family: var(--cui-font-sans);
  font-weight: 700;
  border-radius: var(--cui-radius-md);
  border: 1.5px solid transparent;
  cursor: pointer;
  text-decoration: none;
  transition:
    background-color var(--cui-duration) var(--cui-ease),
    color var(--cui-duration) var(--cui-ease),
    border-color var(--cui-duration) var(--cui-ease),
    transform var(--cui-duration-fast) var(--cui-ease);
  white-space: nowrap;
}

.cui-btn:active:not(:disabled) {
  transform: translateY(1px);
}

.cui-btn:disabled,
.cui-btn[aria-disabled='true'] {
  cursor: not-allowed;
  opacity: 0.55;
}

/* sizes */
.cui-btn--sm {
  padding: 0.7rem 1.4rem;
  font-size: 1.3rem;
}
.cui-btn--md {
  padding: 1.1rem 2.2rem;
  font-size: 1.5rem;
}
.cui-btn--lg {
  padding: 1.4rem 2.8rem;
  font-size: 1.7rem;
}
.cui-btn--block {
  display: flex;
  width: 100%;
}

/* variants */
.cui-btn--primary {
  background: var(--cui-color-navy);
  color: var(--cui-color-white);
}
.cui-btn--primary:hover:not(:disabled) {
  background: var(--cui-color-navy-700);
}

.cui-btn--accent {
  background: var(--cui-color-yellow);
  color: var(--cui-color-navy);
}
.cui-btn--accent:hover:not(:disabled) {
  background: var(--cui-accent-hover);
}

.cui-btn--outline {
  background: transparent;
  border-color: var(--cui-color-navy);
  color: var(--cui-color-navy);
}
.cui-btn--outline:hover:not(:disabled) {
  background: var(--cui-color-navy);
  color: var(--cui-color-white);
}

.cui-btn--ghost {
  background: transparent;
  color: var(--cui-text);
}
.cui-btn--ghost:hover:not(:disabled) {
  background: var(--cui-bg-muted);
}

.cui-btn--link {
  background: transparent;
  color: var(--cui-link);
  padding-inline: 0;
  border-radius: 0;
}
.cui-btn--link:hover:not(:disabled) {
  color: var(--cui-link-hover);
  text-decoration: underline;
}

.cui-btn--danger {
  background: var(--cui-color-danger);
  color: var(--cui-color-white);
}
.cui-btn--danger:hover:not(:disabled) {
  filter: brightness(0.9);
}

.cui-btn__spinner {
  width: 1.4em;
  height: 1.4em;
  border-radius: 50%;
  border: 2px solid currentColor;
  border-right-color: transparent;
  animation: cui-btn-spin 0.7s linear infinite;
}

@keyframes cui-btn-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
