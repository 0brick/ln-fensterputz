<script setup>
// Wraps a control (usually the default slot's <input>) with prepend/append
// addons — icons, units, an inline button — all sharing one visual border.
defineProps({
  label: { type: String, default: '' }
})
</script>

<template>
  <div class="cui-field">
    <label v-if="label" class="cui-field__label">{{ label }}</label>
    <div class="cui-input-group">
      <span v-if="$slots.prepend" class="cui-input-group__addon"><slot name="prepend" /></span>
      <slot />
      <span v-if="$slots.append" class="cui-input-group__addon"><slot name="append" /></span>
    </div>
  </div>
</template>

<style scoped>
.cui-field__label {
  display: block;
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.6rem;
}

.cui-input-group {
  display: flex;
  align-items: stretch;
  border: 1.5px solid var(--cui-border);
  border-radius: var(--cui-radius-md);
  overflow: hidden;
  background: var(--cui-color-white);
  transition: border-color var(--cui-duration) var(--cui-ease);
}

.cui-input-group:focus-within {
  border-color: var(--cui-color-teal);
}

.cui-input-group :deep(input),
.cui-input-group :deep(select) {
  flex: 1;
  border: none;
  padding: 1.1rem 1.4rem;
  font-size: 1.5rem;
  background: transparent;
  min-width: 0;
}
.cui-input-group :deep(input:focus),
.cui-input-group :deep(select:focus) {
  outline: none;
}

.cui-input-group__addon {
  display: flex;
  align-items: center;
  padding: 0 1.4rem;
  background: var(--cui-bg-subtle);
  color: var(--cui-text-muted);
  font-size: 1.4rem;
  font-weight: 600;
  white-space: nowrap;
}
</style>
