<script setup>
// Drop this once near the root of the app (e.g. in App.vue) and every
// `useToast().push(...)` call anywhere in the app renders here.
import Toast from './Toast.vue'
import { useToast } from '../../composables/useToast'

defineProps({
  position: {
    type: String,
    default: 'top-right',
    validator: (v) => ['top-right', 'top-left', 'bottom-right', 'bottom-left'].includes(v)
  }
})

const { toasts, dismiss } = useToast()
</script>

<template>
  <teleport to="body">
    <div class="cui-toast-container" :class="`cui-toast-container--${position}`">
      <transition-group name="cui-toast-list" tag="div" class="cui-toast-list">
        <Toast
          v-for="t in toasts"
          :key="t.id"
          :variant="t.variant"
          :title="t.title"
          @dismiss="dismiss(t.id)"
        >
          {{ t.message }}
        </Toast>
      </transition-group>
    </div>
  </teleport>
</template>

<style scoped>
.cui-toast-container {
  position: fixed;
  z-index: var(--cui-z-toast);
  padding: var(--cui-space-4);
  pointer-events: none;
}
.cui-toast-container :deep(.cui-toast) {
  pointer-events: auto;
  margin-bottom: var(--cui-space-2);
}

.cui-toast-container--top-right {
  top: 0;
  right: 0;
}
.cui-toast-container--top-left {
  top: 0;
  left: 0;
}
.cui-toast-container--bottom-right {
  bottom: 0;
  right: 0;
}
.cui-toast-container--bottom-left {
  bottom: 0;
  left: 0;
}

.cui-toast-list-enter-active,
.cui-toast-list-leave-active {
  transition: all var(--cui-duration) var(--cui-ease);
}
.cui-toast-list-enter-from,
.cui-toast-list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
