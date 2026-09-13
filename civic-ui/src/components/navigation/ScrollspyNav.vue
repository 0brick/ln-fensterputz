<script setup>
// A vertical "on this page" nav that highlights the section currently in
// view — used for long-form policy/report pages
// plenty of. Pass the same ids you put on your <section id="..."> elements.
import { useScrollspy } from '../../composables/useScrollspy'

const props = defineProps({
  items: { type: Array, required: true } // [{ id, label }]
})

const { activeId } = useScrollspy(props.items.map((i) => i.id))
</script>

<template>
  <nav class="cui-scrollspy" aria-label="On this page">
    <a
      v-for="item in items"
      :key="item.id"
      :href="`#${item.id}`"
      class="cui-scrollspy__link"
      :class="{ 'cui-scrollspy__link--active': activeId === item.id }"
    >
      {{ item.label }}
    </a>
  </nav>
</template>

<style scoped>
.cui-scrollspy {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  border-left: 2px solid var(--cui-border);
}

.cui-scrollspy__link {
  padding: 0.6rem 0 0.6rem 1.6rem;
  margin-left: -2px;
  border-left: 2px solid transparent;
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--cui-text-muted);
  text-decoration: none;
  transition: color var(--cui-duration) var(--cui-ease), border-color var(--cui-duration) var(--cui-ease);
}

.cui-scrollspy__link:hover {
  color: var(--cui-text);
}

.cui-scrollspy__link--active {
  color: var(--cui-color-navy);
  border-color: var(--cui-color-teal);
}
</style>
