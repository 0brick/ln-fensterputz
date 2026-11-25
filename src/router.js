import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import Impressum from "./views/Impressum.vue";
import Datenschutz from "./views/Datenschutz.vue";
import NotFound from "./views/NotFound.vue";
import { priorityCities } from "./data/serviceArea.js";

const SITE = "LN Fensterputz";

// meta.landing: page with the homepage sections (section links stay on the page).
// meta.title/description are used for document.title in the browser and for the
// <head> of the prerendered pages (scripts/prerender.mjs). Routes with meta.prerender
// get a real file in dist/ (e.g. dist/impressum/index.html), which GitHub Pages
// needs because it has no server-side rewrites. Links use the trailing-slash form
// ("/impressum/") because that's the URL GitHub Pages serves without a redirect.
export const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    // title must match <title> in index.html (the homepage's <head> is maintained there)
    meta: { landing: true, prerender: "/", title: `${SITE} – Günstige Fensterreinigung am Bodensee` },
  },
  // City landing pages: the homepage with a city-specific H1 and <head>.
  ...priorityCities.map((c) => ({
    path: `/${c.slug}`,
    name: c.slug,
    component: Home,
    props: { city: c.name },
    meta: {
      landing: true,
      prerender: `/${c.slug}/`,
      title: `Fensterreinigung & Fensterputzen in ${c.name} | ${SITE}`,
      description: `Fensterreinigung in ${c.name}: Glas, Rahmen & Fensterbänke für Privat und Gewerbe. Einzeltermine ohne Vertrag, Fensterputzer aus Markdorf (${c.distanceKm} km).`,
    },
  })),
  {
    path: "/impressum",
    name: "impressum",
    component: Impressum,
    meta: {
      prerender: "/impressum/",
      title: `Impressum | ${SITE}`,
      description: "Impressum der LN Fensterputz GbR, Döllenstraße 22, 88677 Markdorf – Fensterreinigung am Bodensee.",
    },
  },
  {
    path: "/datenschutz",
    name: "datenschutz",
    component: Datenschutz,
    meta: {
      prerender: "/datenschutz/",
      title: `Datenschutzerklärung | ${SITE}`,
      description: "Datenschutzerklärung der LN Fensterputz GbR: welche Daten wir beim Besuch der Website und bei Anfragen verarbeiten.",
    },
  },
  { path: "/:pathMatch(.*)*", name: "not-found", component: NotFound, meta: { title: `Seite nicht gefunden | ${SITE}` } },
];

// The history is injectable so the build-time prerender (src/entry-server.js)
// can render the same routes with a memory history.
export function createAppRouter(history = createWebHistory()) {
  return createRouter({
    history,
    routes,
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) return savedPosition;
      if (to.hash) return { el: to.hash, behavior: "smooth" };
      return { top: 0 };
    },
  });
}
