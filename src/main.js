import { createLnApp } from "./app";
import { createAppRouter } from "./router";
import "./style.css";

// The HTML files in dist/ already contain the prerendered page (scripts/prerender.mjs),
// so crawlers see the full content without JavaScript. mount() replaces that markup
// with the live app; the result is identical.
const router = createAppRouter();

router.afterEach((to) => {
  if (to.meta.title) document.title = to.meta.title;
});

const app = createLnApp(router);
app.mount("#app");
