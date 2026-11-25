// Post-build step: prerenders every Vue route with meta.prerender into a real HTML file
// (/ -> dist/index.html, /impressum/ -> dist/impressum/index.html, ...). That puts the
// content in the raw HTML for crawlers that don't run JavaScript (Bing, AI crawlers, link
// previews), and gives GitHub Pages (no server rewrites) a file to serve for each URL.
//
// Runs after `vite build` (client) and `vite build --ssr src/entry-server.js` (see package.json).
// The SSR build lands in dist-ssr/ and is deleted afterwards.

import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import { business } from "../src/data/serviceArea.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

const { render, routes } = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);
const template = readFileSync(path.join(dist, "index.html"), "utf-8");

const placeholder = '<div id="app"></div>';
if (!template.includes(placeholder)) {
  throw new Error(`prerender: "${placeholder}" not found in dist/index.html`);
}

function escapeAttr(s) {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

// Swap the homepage's <head> values for the route's own title/description/URL.
function applyHead(html, { title, description, url }) {
  const replacements = [
    [/<title>[\s\S]*?<\/title>/, `<title>${escapeAttr(title)}</title>`],
    [/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`],
    [/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`],
    [/(<meta property="og:title" content=")[^"]*(")/, `$1${escapeAttr(title)}$2`],
    [/(<meta name="twitter:title" content=")[^"]*(")/, `$1${escapeAttr(title)}$2`],
    [/(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${escapeAttr(description)}$2`],
    [/(<meta\s+property="og:description"\s+content=")[^"]*(")/, `$1${escapeAttr(description)}$2`],
    [/(<meta\s+name="twitter:description"\s+content=")[^"]*(")/, `$1${escapeAttr(description)}$2`],
  ];
  for (const [re, replacement] of replacements) {
    if (!re.test(html)) throw new Error(`prerender: ${re} not found in dist/index.html`);
    html = html.replace(re, replacement);
  }
  return html;
}

for (const route of routes.filter((r) => r.meta?.prerender)) {
  const urlPath = route.meta.prerender;
  const appHtml = await render(urlPath);
  let html = template.replace(placeholder, `<div id="app">${appHtml}</div>`);
  if (urlPath !== "/") {
    html = applyHead(html, {
      title: route.meta.title,
      description: route.meta.description,
      url: `${business.domain}${urlPath}`,
    });
  }
  const outDir = path.join(dist, urlPath);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(path.join(outDir, "index.html"), html, "utf-8");
  console.log(`prerendered ${urlPath} (${appHtml.length} chars)`);
}

rmSync(ssrDir, { recursive: true, force: true });
