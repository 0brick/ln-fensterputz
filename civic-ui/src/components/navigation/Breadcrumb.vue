<script setup>
// items: [{ label, to | href }]. The last item renders as plain text (the
// current page shouldn't be a link) regardless of what's passed for it.
defineProps({
  items: { type: Array, required: true }
})
</script>

<template>
  <nav class="cui-breadcrumb" aria-label="Breadcrumb">
    <ol>
      <li v-for="(item, i) in items" :key="i">
        <component
          :is="i === items.length - 1 ? 'span' : (item.to ? 'router-link' : 'a')"
          v-bind="i === items.length - 1 ? { 'aria-current': 'page' } : (item.to ? { to: item.to } : { href: item.href })"
        >
          {{ item.label }}
        </component>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.cui-breadcrumb ol {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 1.3rem;
}

.cui-breadcrumb li {
  display: flex;
  align-items: center;
}

.cui-breadcrumb li:not(:last-child)::after {
  content: '/';
  margin: 0 0.8rem;
  color: var(--cui-color-grey-500);
}

.cui-breadcrumb a {
  color: var(--cui-color-teal);
  text-decoration: none;
  font-weight: 600;
}
.cui-breadcrumb a:hover {
  text-decoration: underline;
}

.cui-breadcrumb span[aria-current] {
  color: var(--cui-text-muted);
  font-weight: 600;
}
</style>
