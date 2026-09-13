// Generates static, fully-crawlable local-SEO landing pages into public/<slug>/index.html
// plus public/sitemap.xml, from the data in src/data/serviceArea.js.
//
// Why static files instead of Vue routes: this site runs on GitHub Pages (no server,
// see CNAME + public/404.html) and src/router.js uses hash-based routing so it never
// needs server rewrites. Hash routes (/#/...) are effectively invisible to search
// engines as distinct URLs, so every page that should rank on its own gets a real,
// pre-rendered HTML file here instead — served with a genuine 200 status and full
// content with no JavaScript required for the content itself (site.js only adds the
// interactive bits: mobile nav, reveal-on-scroll, the contact form).
//
// Each generated page is a structural clone of the homepage (src/components/AppNav.vue,
// sections/HeroSection.vue, ServicesSection.vue, AreaSection.vue, ContactSection.vue,
// AppFooter.vue) — only the Hero headline/intro and the <head> metadata are personalized
// per city, on request, so the site's look stays exactly what it was before. The homepage
// itself is intentionally NOT linked to these pages (no nav/footer cross-links) — they're
// only reachable via search / sitemap.xml, by design.
//
// Run via `npm run generate` (also wired as a pre-hook for `dev` and `build`).

import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { business, priorityCities, hubTowns } from "../src/data/serviceArea.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, "../public");

const HUB_SLUG = "fensterreinigung-bodenseekreis";
const OG_IMAGE = `${business.domain}/media/og-image.png`;

// Raw Phosphor "regular" weight paths (viewBox 0 0 256 256), copied from
// node_modules/@phosphor-icons/vue so the static pages use the identical icons.
const ICONS = {
  envelope:
    "M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.43,64,128,133.15,52.57,64ZM216,192H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z",
  instagram:
    "M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z",
  tiktok:
    "M224,72a48.05,48.05,0,0,1-48-48,8,8,0,0,0-8-8H128a8,8,0,0,0-8,8V156a20,20,0,1,1-28.57-18.08A8,8,0,0,0,96,130.69V88a8,8,0,0,0-9.4-7.88C50.91,86.48,24,119.1,24,156a76,76,0,0,0,152,0V116.29A103.25,103.25,0,0,0,224,128a8,8,0,0,0,8-8V80A8,8,0,0,0,224,72Zm-8,39.64a87.19,87.19,0,0,1-43.33-16.15A8,8,0,0,0,160,102v54a60,60,0,0,1-120,0c0-25.9,16.64-49.13,40-57.6v27.67A36,36,0,1,0,136,156V32h24.5A64.14,64.14,0,0,0,216,87.5Z",
};

function icon(name, size = 18) {
  return `<svg viewBox="0 0 256 256" width="${size}" height="${size}" fill="currentColor" aria-hidden="true"><path d="${ICONS[name]}"/></svg>`;
}

function url(slug = "") {
  return slug ? `${business.domain}/${slug}/` : `${business.domain}/`;
}

function jsonLd(obj) {
  return `<script type="application/ld+json">${JSON.stringify(obj)}</script>`;
}

function localBusinessLd(areaServedNames) {
  return jsonLd({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    image: OG_IMAGE,
    url: url(),
    email: business.email,
    priceRange: "€",
    sameAs: [business.instagram, business.tiktok],
    address: {
      "@type": "PostalAddress",
      streetAddress: business.street,
      postalCode: business.zip,
      addressLocality: business.city,
      addressCountry: "DE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.lat,
      longitude: business.lon,
    },
    areaServed: areaServedNames.map((name) => ({ "@type": "Place", name })),
  });
}

function renderHead({ title, description, slug, ld }) {
  return `<meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#ffffff" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${url(slug)}" />
    <link rel="stylesheet" href="/local-pages.css" />

    <title>${title}</title>
    <meta name="description" content="${description}" />

    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${url(slug)}" />
    <meta property="og:image" content="${OG_IMAGE}" />
    <meta property="og:locale" content="de_DE" />
    <meta property="og:site_name" content="${business.name}" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${OG_IMAGE}" />

    <link rel="preload" href="/fonts/fira-sans-900.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="preload" href="/fonts/fira-sans-500.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="preload" href="/media/hero-wide.webp" as="image" type="image/webp" />

    ${ld}`;
}

function renderNav() {
  return `<header class="nav">
      <div class="container nav-row">
        <a href="/" class="brand"><span>${business.name}</span></a>

        <nav class="links" aria-label="Hauptnavigation">
          <a href="#leistungen">Leistungen</a>
          <a href="#einsatzgebiet">Einsatzgebiet</a>
          <a href="#kontakt">Kontakt</a>
        </nav>

        <button class="burger" aria-expanded="false" aria-label="Menü öffnen" aria-controls="mobile-menu">
          <span></span><span></span>
        </button>
      </div>

      <nav id="mobile-menu" class="mobile-menu" aria-label="Mobile Navigation">
        <a href="#leistungen">Leistungen</a>
        <a href="#einsatzgebiet">Einsatzgebiet</a>
        <a href="#kontakt">Kontakt</a>
        <a href="#kontakt" class="btn btn-primary">Termin anfragen</a>
      </nav>
    </header>`;
}

function renderHero(h1, p) {
  return `<section class="hero">
      <picture class="hero-media">
        <source media="(min-width: 900px)" srcset="/media/hero-wide.webp" type="image/webp" />
        <source media="(min-width: 900px)" srcset="/media/hero-wide.jpg" type="image/jpeg" />
        <source srcset="/media/hero-tall.webp" type="image/webp" />
        <img src="/media/hero-tall.jpg" alt="" aria-hidden="true" fetchpriority="high" />
      </picture>
      <div class="hero-veil" aria-hidden="true"></div>

      <div class="container hero-content">
        <h1>${h1}</h1>
        <p>${p}</p>
        <div class="hero-actions">
          <a href="#kontakt" class="btn btn-on-dark">Termin anfragen</a>
          <a href="#leistungen" class="btn btn-ghost-dark">Leistungen ansehen</a>
        </div>
      </div>

      <a href="#leistungen" class="hero-scroll" aria-label="Zu den Leistungen scrollen"><span></span></a>
    </section>`;
}

function renderServices() {
  const services = [
    { title: "Rundum-Reinigung", text: "Glas, Rahmen, Falz und Fensterbank in einem Termin." },
    { title: "Einzel- oder Serientermin", text: "Einmalig oder wiederkehrend, ganz nach Bedarf." },
  ];
  return `<section id="leistungen" class="services">
      <div class="container services-grid">
        <div class="services-media" data-reveal>
          <picture>
            <source srcset="/media/services-windows.webp" type="image/webp" />
            <img src="/media/services-windows.jpg" alt="Fensterfront mit blau reflektierenden Scheiben" loading="lazy" />
          </picture>
        </div>

        <div class="services-content">
          <div class="section-head" data-reveal>
            <h2>Leistungen im Überblick</h2>
          </div>

          <ul class="services-list">
            ${services
              .map(
                (s, i) => `<li data-reveal data-reveal-delay="${i * 70}">
              <h3>${s.title}</h3>
              <p>${s.text}</p>
            </li>`
              )
              .join("\n            ")}
          </ul>
        </div>
      </div>
    </section>`;
}

function renderArea({ extraTowns } = {}) {
  const bbox = "9.20,47.66,9.50,47.80";
  const marker = `${business.lat},${business.lon}`;
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${marker}`;

  const townsBlock = extraTowns
    ? `<div class="area-towns">
          ${Object.entries(hubTowns)
            .map(
              ([group, towns]) => `<div class="area-town-group">
            <h3>${group}</h3>
            <ul class="area-town-list">
              ${towns
                .map(
                  (t) => `<li>
                ${t.slug ? `<a href="/${t.slug}/">${t.name}</a>` : `<span>${t.name}</span>`}
                <span class="km">ca. ${t.distanceKm} km</span>
              </li>`
                )
                .join("\n              ")}
            </ul>
          </div>`
            )
            .join("\n          ")}
        </div>`
    : "";

  return `<section id="einsatzgebiet" class="area">
      <div class="container area-grid">
        <div class="area-text" data-reveal>
          <h2>Einsatzgebiet</h2>
          <p>Mit Sitz in Markdorf, unterwegs im gesamten Umkreis rund um den Bodensee.</p>
        </div>

        <div class="area-visual" data-reveal data-reveal-delay="100">
          <iframe class="area-map" src="${mapSrc}" title="Standort Markdorf am Bodensee" loading="lazy"></iframe>
        </div>
      </div>
      ${townsBlock ? `<div class="container">${townsBlock}</div>` : ""}
    </section>`;
}

function renderContact() {
  return `<section id="kontakt" class="contact">
      <div class="container">
        <div class="center contact-head" data-reveal>
          <h2>Bereit für klare Sicht?</h2>
          <p class="center">Kurze Angaben zu Gebäude und Wunschtermin genügen, wir melden uns mit einem Vorschlag.</p>
        </div>

        <div class="contact-grid">
          <form class="contact-form">
            <div class="form-row">
              <div class="field">
                <label for="cf-name">Name</label>
                <input id="cf-name" name="name" type="text" required autocomplete="name" />
              </div>
              <div class="field">
                <label for="cf-phone">Telefon (optional)</label>
                <input id="cf-phone" name="phone" type="tel" autocomplete="tel" />
              </div>
            </div>

            <div class="field">
              <label for="cf-email">E-Mail</label>
              <input id="cf-email" name="email" type="email" required autocomplete="email" />
            </div>

            <div class="form-row form-row-street">
              <div class="field">
                <label for="cf-street">Straße</label>
                <input id="cf-street" name="street" type="text" required autocomplete="address-line1" />
              </div>
              <div class="field">
                <label for="cf-house-number">Nr.</label>
                <input id="cf-house-number" name="houseNumber" type="text" required autocomplete="address-line2" />
              </div>
            </div>

            <div class="form-row form-row-zip">
              <div class="field">
                <label for="cf-zip">PLZ</label>
                <input
                  id="cf-zip"
                  name="zip"
                  type="text"
                  required
                  inputmode="numeric"
                  pattern="[0-9]{5}"
                  maxlength="5"
                  autocomplete="postal-code"
                />
              </div>
              <div class="field">
                <label for="cf-city">Ort</label>
                <input id="cf-city" name="city" type="text" required autocomplete="address-level2" />
              </div>
            </div>

            <div class="field">
              <label for="cf-message">Nachricht</label>
              <textarea id="cf-message" name="message" required placeholder="Gebäude, Fenster und gewünschter Zeitraum"></textarea>
            </div>

            <input type="text" name="honeypot" class="visually-hidden" tabindex="-1" autocomplete="off" aria-hidden="true" />

            <label class="field-checkbox">
              <input type="checkbox" required />
              <span>
                Ich habe die
                <a href="/#/datenschutz" target="_blank" rel="noopener noreferrer">Datenschutzerklärung</a>
                zur Kenntnis genommen und bin mit der Verarbeitung meiner Daten zur Bearbeitung meiner
                Anfrage einverstanden.
              </span>
            </label>

            <button type="submit" class="btn btn-primary">Termin anfragen</button>

            <p class="form-status form-status-success" hidden>Danke, wir melden uns in der Regel innerhalb von 24h.</p>
            <p class="form-status form-status-error" hidden>Das hat leider nicht geklappt. Schreibt uns gern direkt an ${business.email}.</p>
          </form>

          <div class="contact-direct" data-reveal data-reveal-delay="160">
            <p class="contact-direct-lead">Lieber direkt schreiben?</p>
            <ul class="contact-list">
              <li>
                ${icon("envelope", 19)}
                <a href="mailto:${business.email}">${business.email}</a>
              </li>
              <li>
                ${icon("instagram", 19)}
                <a href="${business.instagram}" target="_blank" rel="noopener noreferrer"
                  >@ln.fensterputz<span class="visually-hidden"> (öffnet in neuem Tab)</span></a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>`;
}

function renderFooter() {
  const year = new Date().getFullYear();
  return `<footer class="footer">
      <div class="container footer-grid">
        <div class="footer-brand">
          <span class="footer-name">${business.name}</span>
        </div>

        <nav class="footer-links" aria-label="Footer Navigation">
          <a href="#leistungen">Leistungen</a>
          <a href="#ablauf">Ablauf</a>
          <a href="#einsatzgebiet">Einsatzgebiet</a>
          <a href="#kontakt">Kontakt</a>
        </nav>

        <div class="footer-contact">
          <a href="mailto:${business.email}" class="footer-icon-link">
            ${icon("envelope")}
            ${business.email}
          </a>
          <a href="${business.instagram}" target="_blank" rel="noopener noreferrer" class="footer-icon-link">
            ${icon("instagram")}
            @ln.fensterputz<span class="visually-hidden"> (öffnet in neuem Tab)</span>
          </a>
          <a href="${business.tiktok}" target="_blank" rel="noopener noreferrer" class="footer-icon-link">
            ${icon("tiktok")}
            @fensterputzln<span class="visually-hidden"> (öffnet in neuem Tab)</span>
          </a>
        </div>
      </div>

      <div class="container footer-bottom">
        <span>© ${year} ${business.legalName}</span>
        <a href="/#/impressum">Impressum</a>
        <a href="/#/datenschutz">Datenschutz</a>
      </div>
    </footer>`;
}

function page({ title, description, slug, ld, h1, intro, area }) {
  return `<!doctype html>
<html lang="de">
  <head>
    ${renderHead({ title, description, slug, ld })}
  </head>
  <body>
    ${renderNav()}
    <main id="main-content">
      ${renderHero(h1, intro)}
      ${renderServices()}
      ${renderArea(area)}
      ${renderContact()}
    </main>
    ${renderFooter()}
    <script src="/site.js" defer><\/script>
  </body>
</html>
`;
}

function cityPage(city) {
  const title = `Fensterreinigung & Fensterputzen in ${city.name} | ${business.name}`;
  const description = `${city.name} Fensterputzen & Fensterreinigung – günstig und flexibel, ohne Vertragsbindung. Fenster, Rahmen & Fensterbänke von ${business.name} aus Markdorf. Jetzt Termin anfragen.`;

  return page({
    title,
    description,
    slug: city.slug,
    ld: localBusinessLd([city.name, business.city]),
    h1: `Fensterreinigung in ${city.name} rund um den Bodensee`,
    intro: `Fenster, Rahmen und Fensterbänke für Privathaushalte und Gewerbe in ${city.name}.`,
  });
}

function hubPage() {
  const title = `Fensterreinigung in der Umgebung – Bodenseekreis | ${business.name}`;
  const description = `Günstiger Fensterputzservice im Umkreis von rund 30 km um Markdorf: Friedrichshafen, Überlingen, Ravensburg, Meersburg, Salem und viele weitere Orte am Bodensee. Jetzt anfragen.`;
  const allTownNames = Object.values(hubTowns).flatMap((list) => list.map((t) => t.name));

  return page({
    title,
    description,
    slug: HUB_SLUG,
    ld: localBusinessLd(["Bodenseekreis", business.city, ...allTownNames]),
    h1: "Fensterreinigung in der Umgebung rund um den Bodensee",
    intro: "Fenster, Rahmen und Fensterbänke für Privathaushalte und Gewerbe im gesamten Bodenseekreis.",
    area: { extraTowns: true },
  });
}

function sitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = [
    { loc: url(), priority: "1.0", changefreq: "monthly" },
    { loc: url(HUB_SLUG), priority: "0.9", changefreq: "monthly" },
    ...priorityCities.map((c) => ({ loc: url(c.slug), priority: "0.8", changefreq: "monthly" })),
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

function writePage(slug, html) {
  const dir = path.join(publicDir, slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, "index.html"), html, "utf-8");
  console.log(`generated /${slug}/index.html`);
}

for (const city of priorityCities) {
  writePage(city.slug, cityPage(city));
}
writePage(HUB_SLUG, hubPage());
writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap(), "utf-8");
console.log("generated sitemap.xml");
