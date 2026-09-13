// Shared "close me when you click elsewhere" behavior for Dropdown, Popover
// and Select — one listener implementation instead of three slightly
// different ones.
import { onMounted, onBeforeUnmount } from 'vue'

export function useClickOutside(elRef, callback) {
  function handler(event) {
    const el = elRef.value
    if (el && !el.contains(event.target)) callback(event)
  }

  onMounted(() => document.addEventListener('click', handler, true))
  onBeforeUnmount(() => document.removeEventListener('click', handler, true))
}
