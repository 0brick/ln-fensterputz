<script setup>
import { useId } from '../../composables/useId'

defineProps({
  modelValue: { type: [String, Number, Boolean], default: null },
  value: { type: [String, Number, Boolean], required: true },
  name: { type: String, required: true },
  label: { type: String, required: true },
  disabled: { type: Boolean, default: false }
})
defineEmits(['update:modelValue'])

const id = useId('radio')
</script>

<template>
  <label class="cui-radio" :class="{ 'cui-radio--disabled': disabled }" :for="id">
    <input
      :id="id"
      type="radio"
      class="cui-radio__input"
      :name="name"
      :checked="modelValue === value"
      :disabled="disabled"
      @change="$emit('update:modelValue', value)"
    />
    <span class="cui-radio__dot" aria-hidden="true" />
    <span class="cui-radio__label">{{ label }}</span>
  </label>
</template>

<style scoped>
.cui-radio {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  font-size: 1.4rem;
}

.cui-radio--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.cui-radio__input {
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
}

.cui-radio__dot {
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 1.5px solid var(--cui-border-strong);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--cui-color-white);
}

.cui-radio__dot::after {
  content: '';
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background: var(--cui-color-navy);
  transform: scale(0);
  transition: transform var(--cui-duration-fast) var(--cui-ease);
}

.cui-radio__input:checked + .cui-radio__dot::after {
  transform: scale(1);
}

.cui-radio__input:focus-visible + .cui-radio__dot {
  outline: 3px solid var(--cui-focus-ring);
  outline-offset: 2px;
}
</style>
