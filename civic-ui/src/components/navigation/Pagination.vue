<script setup>
// Numeric pager with ellipsis collapsing for large page counts. Purely
// controlled — pass `modelValue` and listen for `update:modelValue`.
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: Number, required: true },
  total: { type: Number, required: true },
  siblingCount: { type: Number, default: 1 }
})
const emit = defineEmits(['update:modelValue'])

const pages = computed(() => {
  const { modelValue: current, total, siblingCount } = props
  const totalVisible = siblingCount * 2 + 5
  if (total <= totalVisible) return Array.from({ length: total }, (_, i) => i + 1)

  const left = Math.max(current - siblingCount, 2)
  const right = Math.min(current + siblingCount, total - 1)
  const result = [1]

  if (left > 2) result.push('…')
  for (let p = left; p <= right; p++) result.push(p)
  if (right < total - 1) result.push('…')
  result.push(total)

  return result
})

function go(page) {
  if (typeof page !== 'number' || page === props.modelValue) return
  emit('update:modelValue', page)
}
</script>

<template>
  <nav class="cui-pagination" aria-label="Pagination">
    <button type="button" class="cui-pagination__nav" :disabled="modelValue === 1" @click="go(modelValue - 1)" aria-label="Previous page">
      ‹
    </button>
    <ul>
      <li v-for="(page, i) in pages" :key="`${page}-${i}`">
        <span v-if="page === '…'" class="cui-pagination__ellipsis">…</span>
        <button
          v-else
          type="button"
          class="cui-pagination__item"
          :class="{ 'cui-pagination__item--active': page === modelValue }"
          :aria-current="page === modelValue ? 'page' : undefined"
          @click="go(page)"
        >
          {{ page }}
        </button>
      </li>
    </ul>
    <button type="button" class="cui-pagination__nav" :disabled="modelValue === total" @click="go(modelValue + 1)" aria-label="Next page">
      ›
    </button>
  </nav>
</template>

<style scoped>
.cui-pagination {
  display: flex;
  align-items: center;
  gap: var(--cui-space-2);
}

.cui-pagination ul {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.cui-pagination__item,
.cui-pagination__nav {
  min-width: 3.4rem;
  height: 3.4rem;
  padding: 0 0.6rem;
  border: 1.5px solid var(--cui-border);
  border-radius: var(--cui-radius-md);
  background: var(--cui-color-white);
  font-weight: 600;
  font-size: 1.4rem;
  cursor: pointer;
  transition: all var(--cui-duration-fast) var(--cui-ease);
}

.cui-pagination__item:hover,
.cui-pagination__nav:hover:not(:disabled) {
  border-color: var(--cui-color-navy);
}

.cui-pagination__item--active {
  background: var(--cui-color-navy);
  border-color: var(--cui-color-navy);
  color: var(--cui-color-white);
}

.cui-pagination__nav:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.cui-pagination__ellipsis {
  display: inline-flex;
  min-width: 3.4rem;
  justify-content: center;
  color: var(--cui-color-grey-500);
}
</style>
