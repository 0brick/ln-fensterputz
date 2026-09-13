const observer =
  typeof window !== "undefined"
    ? new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
      )
    : null;

export const reveal = {
  mounted(el, binding) {
    el.classList.add("reveal");
    if (binding.value?.delay) {
      el.style.transitionDelay = `${binding.value.delay}ms`;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }
    observer?.observe(el);
  },
  unmounted(el) {
    observer?.unobserve(el);
  },
};
