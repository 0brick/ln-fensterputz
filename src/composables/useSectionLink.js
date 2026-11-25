import { useRoute } from "vue-router";

// Links to sections (#leistungen, #kontakt, …) stay on the current page when it is a
// landing page (homepage or a city page) and go to the homepage from everywhere else
// (Impressum, Datenschutz, 404).
export function useSectionLink() {
  const route = useRoute();
  return (hash) => ({ path: route.meta.landing ? route.path : "/", hash });
}
