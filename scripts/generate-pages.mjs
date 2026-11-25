// Generates public/sitemap.xml and the redirect pages for retired URLs
// (public/<slug>/index.html), from the data in src/data/serviceArea.js.
//
// The pages themselves (/, the city pages, /impressum/, /datenschutz/) are Vue routes
// (src/router.js) that scripts/prerender.mjs renders to static HTML after `vite build`.
// The city pages are the homepage with a city-specific H1 and <head>, so they always
// match the homepage.
//
// Run via `npm run generate` (also wired as a pre-hook for `dev` and `build`).

import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { business, priorityCities, REDIRECTS } from "../src/data/serviceArea.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, "../public");

function url(slug = "") {
  return slug ? `${business.domain}/${slug}/` : `${business.domain}/`;
}

// GitHub Pages has no server-side redirects. A noindex page with an instant meta refresh
// and a canonical to the target is treated by Google like a permanent redirect.
function redirectPage(target) {
  const to = `${business.domain}${target}`;
  return `<!doctype html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="robots" content="noindex" />
    <link rel="canonical" href="${to}" />
    <meta http-equiv="refresh" content="0; url=${target}" />
    <title>Weiterleitung – ${business.name}</title>
  </head>
  <body>
    <p>Diese Seite ist umgezogen: <a href="${target}">${to}</a></p>
  </body>
</html>
`;
}

function sitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = [
    { loc: url(), priority: "1.0", changefreq: "monthly" },
    ...priorityCities.map((c) => ({ loc: url(c.slug), priority: "0.8", changefreq: "monthly" })),
    { loc: url("impressum"), priority: "0.2", changefreq: "yearly" },
    { loc: url("datenschutz"), priority: "0.2", changefreq: "yearly" },
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (u) => `<url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
    )
    .join("\n  ")}
</urlset>
`;
}

for (const [slug, target] of Object.entries(REDIRECTS)) {
  const dir = path.join(publicDir, slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, "index.html"), redirectPage(target), "utf-8");
  console.log(`generated redirect /${slug}/ -> ${target}`);
}
writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap(), "utf-8");
console.log("generated sitemap.xml");
