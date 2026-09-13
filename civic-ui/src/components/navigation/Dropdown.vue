<script setup>
// Generic dropdown: the trigger is whatever you put in the `trigger` slot,
// the menu is whatever you put in the default slot. Used standalone for
// menus, and internally by Select.
import { ref } from 'vue'
import { useClickOutside } from '../../composables/useClickOutside'

const props = defineProps({
  align: { type: String, default: 'start', validator: (v) => ['start', 'end'].includes(v) }
})

const open = ref(false)
const root = ref(null)

function toggle() {
  open.value = !open.value
}
function close() {
  open.value = false
}

useClickOutside(root, close)

defineExpose({ close, open })
</script>

<template>
  <div ref="root" class="cui-dropdown" @keydown.escape="close">
    <div class="cui-dropdown__trigger" @click="toggle">
      <slot name="trigger" :open="open" :toggle="toggle" />
    </div>
    <transition name="cui-dropdown-fade">
      <div v-if="open" class="cui-dropdown__menu" :class="`cui-dropdown__menu--${align}`" role="menu" @click="close">
        <slot :close="close" />
      </div>
    </transition>
  </div>
</template>

<style scoped>
.cui-dropdown {
  position: relative;
  display: inline-block;
}

.cui-dropdown__menu {
  position: absolute;
  top: calc(100% + 6px);
  min-width: 200px;
  background: var(--cui-color-white);
  border: 1px solid var(--cui-border);
  border-radius: var(--cui-radius-md);
  box-shadow: var(--cui-shadow-md);
  padding: var(--cui-space-2);
  z-index: var(--cui-z-dropdown);
}

.cui-dropdown__menu--start {
  left: 0;
}
.cui-dropdown__menu--end {
  right: 0;
}

.cui-dropdown__menu :deep(a),
.cui-dropdown__menu :deep(button) {
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.8rem 1rem;
  border-radius: var(--cui-radius-sm);
  border: none;
  background: none;
  font-size: 1.4rem;
  color: var(--cui-text);
  cursor: pointer;
  text-decoration: none;
}

.cui-dropdown__menu :deep(a:hover),
.cui-dropdown__menu :deep(button:hover) {
  background: var(--cui-bg-subtle);
}

.cui-dropdown-fade-enter-active,
.cui-dropdown-fade-leave-active {
  transition:
    opacity var(--cui-duration-fast) var(--cui-ease),
    transform var(--cui-duration-fast) var(--cui-ease);
}
.cui-dropdown-fade-enter-from,
.cui-dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
