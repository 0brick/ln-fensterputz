import { createApp } from "vue";
import App from "./App.vue";
import { reveal } from "./directives/reveal";

// Shared by the browser entry (main.js) and the build-time prerender (entry-server.js).
export function createLnApp(router) {
  const app = createApp(App);
  app.directive("reveal", reveal);
  app.use(router);
  return app;
}
