<script setup>
import { computed } from 'vue'
import { useId } from '../../composables/useId'

const props = defineProps({
  modelValue: { type: Number, required: true },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  step: { type: Number, default: 1 },
  label: { type: String, default: '' },
  showValue: { type: Boolean, default: true }
})
defineEmits(['update:modelValue'])

const id = useId('range')
const fillPercent = computed(() => ((props.modelValue - props.min) / (props.max - props.min)) * 100)
</script>

<template>
  <div class="cui-range">
    <div v-if="label || showValue" class="cui-range__meta">
      <label v-if="label" :for="id">{{ label }}</label>
      <span v-if="showValue">{{ modelValue }}</span>
    </div>
    <input
      :id="id"
      type="range"
      class="cui-range__control"
      :style="{ '--cui-range-fill': `${fillPercent}%` }"
      :min="min"
      :max="max"
      :step="step"
      :value="modelValue"
      @input="$emit('update:modelValue', Number($event.target.value))"
    />
  </div>
</template>

<style scoped>
.cui-range__meta {
  display: flex;
  justify-content: space-between;
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
}

.cui-range__control {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 6px;
  border-radius: var(--cui-radius-pill);
  background: linear-gradient(
    to right,
    var(--cui-color-teal) 0%,
    var(--cui-color-teal) var(--cui-range-fill, 0%),
    var(--cui-bg-muted) var(--cui-range-fill, 0%),
    var(--cui-bg-muted) 100%
  );
  cursor: pointer;
}

.cui-range__control::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: var(--cui-color-white);
  border: 2px solid var(--cui-color-navy);
  box-shadow: var(--cui-shadow-sm);
  margin-top: -0.1px;
}

.cui-range__control::-moz-range-thumb {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: var(--cui-color-white);
  border: 2px solid var(--cui-color-navy);
  box-shadow: var(--cui-shadow-sm);
}
</style>
