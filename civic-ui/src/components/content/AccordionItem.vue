<script setup>
import { inject } from 'vue'
import { useId } from '../../composables/useId'

const props = defineProps({
  title: { type: String, required: true }
})

const id = useId('accordion')
const accordion = inject('cui-accordion')
</script>

<template>
  <div class="cui-accordion-item">
    <h3 class="cui-accordion-item__heading">
      <button
        type="button"
        class="cui-accordion-item__trigger"
        :aria-expanded="accordion.isOpen(id)"
        :aria-controls="`${id}-panel`"
        @click="accordion.toggle(id)"
      >
        {{ title }}
        <span class="cui-accordion-item__icon" aria-hidden="true" />
      </button>
    </h3>
    <div v-show="accordion.isOpen(id)" :id="`${id}-panel`" class="cui-accordion-item__panel" role="region">
      <div class="cui-accordion-item__panel-inner">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.cui-accordion-item {
  border-bottom: 1px solid var(--cui-border);
}

.cui-accordion-item__heading {
  margin: 0;
}

.cui-accordion-item__trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--cui-space-3);
  padding: var(--cui-space-4) 0;
  background: none;
  border: none;
  text-align: left;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--cui-text);
  cursor: pointer;
}

.cui-accordion-item__icon {
  flex-shrink: 0;
  width: 1.6rem;
  height: 1.6rem;
  position: relative;
}
.cui-accordion-item__icon::before,
.cui-accordion-item__icon::after {
  content: '';
  position: absolute;
  background: currentColor;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.cui-accordion-item__icon::before {
  width: 100%;
  height: 2px;
}
.cui-accordion-item__icon::after {
  width: 2px;
  height: 100%;
  transition: transform var(--cui-duration) var(--cui-ease);
}
.cui-accordion-item__trigger[aria-expanded='true'] .cui-accordion-item__icon::after {
  transform: translate(-50%, -50%) rotate(90deg);
  opacity: 0;
}

.cui-accordion-item__panel-inner {
  padding-bottom: var(--cui-space-4);
  color: var(--cui-text-muted);
  font-size: 1.4rem;
  line-height: 1.6;
}
</style>
