<script setup>
// A styled wrapper around the native <select> rather than a custom
// listbox — keeps full keyboard/screen-reader/mobile-picker behavior for
// free while still matching the rest of the field styling.
import { useId } from '../../composables/useId'

defineProps({
  modelValue: { type: [String, Number], default: '' },
  label: { type: String, default: '' },
  options: { type: Array, required: true }, // [{ value, label }] or plain strings
  placeholder: { type: String, default: '' },
  hint: { type: String, default: '' },
  error: { type: String, default: '' },
  required: { type: Boolean, default: false }
})
defineEmits(['update:modelValue'])

const id = useId('select')
</script>

<template>
  <div class="cui-field">
    <label v-if="label" :for="id" class="cui-field__label">
      {{ label }}
      <span v-if="required" class="cui-field__required" aria-hidden="true">*</span>
    </label>
    <div class="cui-select">
      <select
        :id="id"
        class="cui-select__control"
        :class="{ 'cui-select__control--error': error }"
        :value="modelValue"
        :required="required"
        :aria-invalid="!!error"
        @change="$emit('update:modelValue', $event.target.value)"
      >
        <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
        <option v-for="opt in options" :key="opt.value ?? opt" :value="opt.value ?? opt">
          {{ opt.label ?? opt }}
        </option>
      </select>
      <span class="cui-select__chevron" aria-hidden="true" />
    </div>
    <p v-if="error" class="cui-field__error">{{ error }}</p>
    <p v-else-if="hint" class="cui-field__hint">{{ hint }}</p>
  </div>
</template>

<style scoped>
.cui-field {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.cui-field__label {
  font-size: 1.3rem;
  font-weight: 700;
}
.cui-field__required {
  color: var(--cui-color-danger);
}
.cui-field__hint {
  margin: 0;
  font-size: 1.2rem;
  color: var(--cui-text-muted);
}
.cui-field__error {
  margin: 0;
  font-size: 1.2rem;
  color: var(--cui-color-danger);
  font-weight: 600;
}

.cui-select {
  position: relative;
}

.cui-select__control {
  width: 100%;
  padding: 1.1rem 3.6rem 1.1rem 1.4rem;
  border: 1.5px solid var(--cui-border);
  border-radius: var(--cui-radius-md);
  background: var(--cui-color-white);
  font-size: 1.5rem;
  appearance: none;
  cursor: pointer;
}
.cui-select__control:focus {
  border-color: var(--cui-color-teal);
}
.cui-select__control--error {
  border-color: var(--cui-color-danger);
}

.cui-select__chevron {
  position: absolute;
  right: 1.4rem;
  top: 50%;
  width: 1rem;
  height: 1rem;
  transform: translateY(-65%) rotate(45deg);
  border-right: 2px solid var(--cui-text);
  border-bottom: 2px solid var(--cui-text);
  pointer-events: none;
}
</style>
