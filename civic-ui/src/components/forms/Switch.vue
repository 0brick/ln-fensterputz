<script setup>
// A toggle switch — same boolean v-model contract as Checkbox, styled as a
// pill/slider instead. Handy extra alongside Checks & Radios for on/off
// settings rather than list selections.
import { useId } from '../../composables/useId'

defineProps({
  modelValue: { type: Boolean, default: false },
  label: { type: String, required: true },
  disabled: { type: Boolean, default: false }
})
defineEmits(['update:modelValue'])

const id = useId('switch')
</script>

<template>
  <label class="cui-switch" :class="{ 'cui-switch--disabled': disabled }" :for="id">
    <input
      :id="id"
      type="checkbox"
      class="cui-switch__input"
      role="switch"
      :checked="modelValue"
      :disabled="disabled"
      :aria-checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
    <span class="cui-switch__track" aria-hidden="true"><span class="cui-switch__thumb" /></span>
    <span class="cui-switch__label">{{ label }}</span>
  </label>
</template>

<style scoped>
.cui-switch {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  font-size: 1.4rem;
}

.cui-switch--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.cui-switch__input {
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
}

.cui-switch__track {
  flex-shrink: 0;
  width: 4rem;
  height: 2.2rem;
  border-radius: var(--cui-radius-pill);
  background: var(--cui-border);
  position: relative;
  transition: background-color var(--cui-duration) var(--cui-ease);
}

.cui-switch__thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 50%;
  background: var(--cui-color-white);
  box-shadow: var(--cui-shadow-sm);
  transition: transform var(--cui-duration) var(--cui-ease);
}

.cui-switch__input:checked + .cui-switch__track {
  background: var(--cui-color-teal);
}
.cui-switch__input:checked + .cui-switch__track .cui-switch__thumb {
  transform: translateX(1.8rem);
}

.cui-switch__input:focus-visible + .cui-switch__track {
  outline: 3px solid var(--cui-focus-ring);
  outline-offset: 2px;
}
</style>
