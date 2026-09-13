// Tiny global toast queue. Kept outside any component so `useToast()` works
// the same whether it's called from a page, a form handler, or a store —
// there's exactly one queue for the whole app, rendered by <ToastContainer>.
import { reactive } from 'vue'

let uid = 0
const toasts = reactive([])

function push(message, { variant = 'info', title = '', duration = 4000 } = {}) {
  const id = ++uid
  toasts.push({ id, message, variant, title })
  if (duration > 0) {
    setTimeout(() => dismiss(id), duration)
  }
  return id
}

function dismiss(id) {
  const index = toasts.findIndex((t) => t.id === id)
  if (index !== -1) toasts.splice(index, 1)
}

export function useToast() {
  return {
    toasts,
    push,
    dismiss,
    success: (message, opts) => push(message, { ...opts, variant: 'success' }),
    danger: (message, opts) => push(message, { ...opts, variant: 'danger' }),
    warning: (message, opts) => push(message, { ...opts, variant: 'warning' }),
    info: (message, opts) => push(message, { ...opts, variant: 'info' })
  }
}
