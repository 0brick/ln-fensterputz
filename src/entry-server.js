// Build-time only: renders a route of the Vue app to static HTML.
// Built with `vite build --ssr` and used by scripts/prerender.mjs.
import { createMemoryHistory } from "vue-router";
import { renderToString } from "vue/server-renderer";
import { createLnApp } from "./app";
import { createAppRouter, routes } from "./router";

export { routes };

export async function render(url) {
  const router = createAppRouter(createMemoryHistory());
  const app = createLnApp(router);
  await router.push(url);
  await router.isReady();
  return renderToString(app);
}
