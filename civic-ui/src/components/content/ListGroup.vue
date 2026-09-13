<script setup>
// items: [{ label, description, href, to, active, disabled, badge }]
// Falls back to the default slot for fully custom markup per item.
defineProps({
  items: { type: Array, default: () => [] },
  flush: { type: Boolean, default: false }
})
</script>

<template>
  <ul class="cui-list-group" :class="{ 'cui-list-group--flush': flush }">
    <slot>
      <li v-for="(item, i) in items" :key="i">
        <component
          :is="item.href ? 'a' : item.to ? 'router-link' : 'div'"
          v-bind="item.href ? { href: item.href } : item.to ? { to: item.to } : {}"
          class="cui-list-group__item"
          :class="{ 'cui-list-group__item--active': item.active, 'cui-list-group__item--disabled': item.disabled }"
        >
          <span>
            <strong>{{ item.label }}</strong>
            <span v-if="item.description" class="cui-list-group__desc">{{ item.description }}</span>
          </span>
          <span v-if="item.badge" class="cui-list-group__badge">{{ item.badge }}</span>
        </component>
      </li>
    </slot>
  </ul>
</template>

<style scoped>
.cui-list-group {
  list-style: none;
  margin: 0;
  padding: 0;
  border: 1px solid var(--cui-border);
  border-radius: var(--cui-radius-md);
  overflow: hidden;
}

.cui-list-group--flush {
  border: none;
  border-radius: 0;
}

.cui-list-group__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--cui-space-3);
  padding: var(--cui-space-3) var(--cui-space-4);
  background: var(--cui-color-white);
  border-bottom: 1px solid var(--cui-border);
  text-decoration: none;
  color: var(--cui-text);
  font-size: 1.4rem;
  transition: background-color var(--cui-duration-fast) var(--cui-ease);
}

.cui-list-group li:last-child .cui-list-group__item {
  border-bottom: none;
}

a.cui-list-group__item:hover {
  background: var(--cui-bg-subtle);
}

.cui-list-group__desc {
  display: block;
  color: var(--cui-text-muted);
  font-weight: 400;
  font-size: 1.3rem;
}

.cui-list-group__item--active {
  background: var(--cui-color-navy);
  color: var(--cui-color-white);
}

.cui-list-group__item--disabled {
  opacity: 0.5;
  pointer-events: none;
}

.cui-list-group__badge {
  flex-shrink: 0;
}
</style>
