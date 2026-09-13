<script setup>
// Also doubles as "Nav" — pass `pills` for a nav-pills look instead of the
// underlined tab look. Tabs own their own active state via v-model so a
// page can read/react to the current tab if needed.
import { ref, watch } from 'vue'

const props = defineProps({
  tabs: { type: Array, required: true }, // [{ id, label, disabled }]
  modelValue: { type: String, default: null },
  pills: { type: Boolean, default: false },
  fill: { type: Boolean, default: false }
})
const emit = defineEmits(['update:modelValue'])

const active = ref(props.modelValue ?? props.tabs[0]?.id)
watch(
  () => props.modelValue,
  (v) => {
    if (v) active.value = v
  }
)

function select(tab) {
  if (tab.disabled) return
  active.value = tab.id
  emit('update:modelValue', tab.id)
}
</script>

<template>
  <div class="cui-tabs">
    <div class="cui-tabs__list" :class="{ 'cui-tabs__list--pills': pills, 'cui-tabs__list--fill': fill }" role="tablist">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        type="button"
        role="tab"
        class="cui-tabs__tab"
        :class="{ 'cui-tabs__tab--active': active === tab.id }"
        :aria-selected="active === tab.id"
        :disabled="tab.disabled"
        @click="select(tab)"
      >
        {{ tab.label }}
      </button>
    </div>
    <div class="cui-tabs__panel" role="tabpanel">
      <slot :name="active" :active="active" />
    </div>
  </div>
</template>

<style scoped>
.cui-tabs__list {
  display: flex;
  gap: var(--cui-space-2);
  border-bottom: 2px solid var(--cui-border);
  overflow-x: auto;
}

.cui-tabs__list--fill .cui-tabs__tab {
  flex: 1;
}

.cui-tabs__tab {
  padding: var(--cui-space-3) var(--cui-space-4);
  border: none;
  background: none;
  font-weight: 700;
  font-size: 1.4rem;
  color: var(--cui-text-muted);
  cursor: pointer;
  border-bottom: 3px solid transparent;
  margin-bottom: -2px;
  white-space: nowrap;
  transition: color var(--cui-duration) var(--cui-ease), border-color var(--cui-duration) var(--cui-ease);
}

.cui-tabs__tab:hover:not(:disabled) {
  color: var(--cui-text);
}

.cui-tabs__tab--active {
  color: var(--cui-color-navy);
  border-color: var(--cui-color-teal);
}

.cui-tabs__tab:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.cui-tabs__list--pills {
  border-bottom: none;
  gap: var(--cui-space-2);
}
.cui-tabs__list--pills .cui-tabs__tab {
  border: none;
  border-radius: var(--cui-radius-pill);
  background: var(--cui-bg-muted);
  margin-bottom: 0;
}
.cui-tabs__list--pills .cui-tabs__tab--active {
  background: var(--cui-color-navy);
  color: var(--cui-color-white);
}

.cui-tabs__panel {
  padding-top: var(--cui-space-5);
}
</style>
