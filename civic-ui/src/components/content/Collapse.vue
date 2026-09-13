<script setup>
// The standalone building block behind AccordionItem — use this directly
// when you just need one show/hide toggle (e.g. "show more details") and
// don't want the whole Accordion group-state machinery.
defineProps({
  modelValue: { type: Boolean, default: false },
  label: { type: String, required: true }
})
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="cui-collapse">
    <button
      type="button"
      class="cui-collapse__trigger"
      :aria-expanded="modelValue"
      @click="$emit('update:modelValue', !modelValue)"
    >
      {{ label }}
    </button>
    <transition name="cui-collapse-slide">
      <div v-show="modelValue" class="cui-collapse__panel">
        <div class="cui-collapse__panel-inner"><slot /></div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.cui-collapse__trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: none;
  border: none;
  padding: 0;
  font-weight: 700;
  font-size: 1.4rem;
  color: var(--cui-color-teal);
  cursor: pointer;
}

.cui-collapse__panel-inner {
  padding-top: var(--cui-space-3);
}
</style>
