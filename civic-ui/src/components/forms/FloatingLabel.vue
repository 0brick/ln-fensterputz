<script setup>
// The label starts inside the field and floats up above it once the field
// has a value or focus — a compact pattern used in dense appointment
// and contact forms where vertical space is tight.
import { ref, computed } from 'vue'
import { useId } from '../../composables/useId'

const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  label: { type: String, required: true },
  type: { type: String, default: 'text' },
  error: { type: String, default: '' }
})
defineEmits(['update:modelValue'])

const id = useId('floating')
const focused = ref(false)
const floated = computed(() => focused.value || `${props.modelValue}`.length > 0)
</script>

<template>
  <div class="cui-floating" :class="{ 'cui-floating--floated': floated, 'cui-floating--error': error }">
    <input
      :id="id"
      class="cui-floating__control"
      :type="type"
      :value="modelValue"
      placeholder=" "
      @focus="focused = true"
      @blur="focused = false"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <label :for="id" class="cui-floating__label">{{ label }}</label>
    <p v-if="error" class="cui-floating__error">{{ error }}</p>
  </div>
</template>

<style scoped>
.cui-floating {
  position: relative;
}

.cui-floating__control {
  width: 100%;
  height: 5.6rem;
  padding: 2rem 1.4rem 0.6rem;
  border: 1.5px solid var(--cui-border);
  border-radius: var(--cui-radius-md);
  background: var(--cui-color-white);
  font-size: 1.5rem;
  transition: border-color var(--cui-duration) var(--cui-ease);
}

.cui-floating__control:focus-visible {
  border-color: var(--cui-color-teal);
}

.cui-floating--error .cui-floating__control {
  border-color: var(--cui-color-danger);
}

.cui-floating__label {
  position: absolute;
  left: 1.4rem;
  top: 1.8rem;
  font-size: 1.5rem;
  color: var(--cui-text-muted);
  pointer-events: none;
  transform-origin: left top;
  transition: transform var(--cui-duration) var(--cui-ease), color var(--cui-duration) var(--cui-ease);
}

.cui-floating--floated .cui-floating__label {
  transform: translateY(-1rem) scale(0.75);
  color: var(--cui-color-teal);
}

.cui-floating__error {
  margin: 0.6rem 0 0;
  font-size: 1.2rem;
  color: var(--cui-color-danger);
  font-weight: 600;
}
</style>
