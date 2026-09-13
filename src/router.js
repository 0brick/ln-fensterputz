import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./views/Home.vue";
import Impressum from "./views/Impressum.vue";
import Datenschutz from "./views/Datenschutz.vue";
import NotFound from "./views/NotFound.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", name: "home", component: Home },
    { path: "/impressum", name: "impressum", component: Impressum },
    { path: "/datenschutz", name: "datenschutz", component: Datenschutz },
    { path: "/:pathMatch(.*)*", name: "not-found", component: NotFound },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) return { el: to.hash, behavior: "smooth" };
    return { top: 0 };
  },
});

export default router;
