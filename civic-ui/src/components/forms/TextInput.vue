<script setup>
// The baseline text field every other form control in here builds on top
// of (InputGroup wraps it, FloatingLabel restyles it). Handles label, hint
// and error text itself so most forms never need custom markup at all.
import { computed } from 'vue'
import { useId } from '../../composables/useId'

const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  label: { type: String, default: '' },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  hint: { type: String, default: '' },
  error: { type: String, default: '' },
  required: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false }
})
defineEmits(['update:modelValue'])

const id = useId('input')
const describedBy = computed(() => {
  if (props.error) return `${id}-error`
  if (props.hint) return `${id}-hint`
  return undefined
})
</script>

<template>
  <div class="cui-field">
    <label v-if="label" :for="id" class="cui-field__label">
      {{ label }}
      <span v-if="required" class="cui-field__required" aria-hidden="true">*</span>
    </label>
    <input
      :id="id"
      class="cui-field__control"
      :class="{ 'cui-field__control--error': error }"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :aria-invalid="!!error"
      :aria-describedby="describedBy"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <p v-if="error" :id="`${id}-error`" class="cui-field__error">{{ error }}</p>
    <p v-else-if="hint" :id="`${id}-hint`" class="cui-field__hint">{{ hint }}</p>
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

.cui-field__control {
  width: 100%;
  padding: 1.1rem 1.4rem;
  border: 1.5px solid var(--cui-border);
  border-radius: var(--cui-radius-md);
  background: var(--cui-color-white);
  font-size: 1.5rem;
  transition: border-color var(--cui-duration) var(--cui-ease);
}

.cui-field__control:hover {
  border-color: var(--cui-color-grey-500);
}

.cui-field__control:focus {
  border-color: var(--cui-color-teal);
}

.cui-field__control:disabled {
  background: var(--cui-bg-muted);
  cursor: not-allowed;
}

.cui-field__control--error {
  border-color: var(--cui-color-danger);
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
</style>
