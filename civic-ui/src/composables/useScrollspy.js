// Tracks which of a set of section ids is currently in view, using
// IntersectionObserver (cheaper and jank-free compared to a scroll
// listener). Feed the returned `activeId` into any nav to highlight the
// current section — see <ScrollspyNav> for the ready-made version.
import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useScrollspy(ids, { rootMargin = '-20% 0px -70% 0px' } = {}) {
  const activeId = ref(ids[0] ?? null)
  let observer = null

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting)
        if (visible) activeId.value = visible.target.id
      },
      { rootMargin, threshold: 0 }
    )

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
  })

  onBeforeUnmount(() => observer?.disconnect())

  return { activeId }
}
