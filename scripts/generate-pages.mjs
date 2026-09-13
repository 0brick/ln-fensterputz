// Generates static, fully-crawlable local-SEO landing pages into public/<slug>/index.html
// plus public/sitemap.xml, from the single data source in src/data/serviceArea.js.
//
// Why static files instead of Vue routes: this site runs on GitHub Pages (no server,
// see CNAME + public/404.html) and src/router.js uses hash-based routing so it never
// needs server rewrites. Hash routes (/#/...) are effectively invisible to search
// engines as distinct URLs, so every page that should rank on its own gets a real,
// pre-rendered HTML file here instead — served with a genuine 200 status and full
// content with no JavaScript required.
//
// Run via `npm run generate` (also wired as a pre-hook for `dev` and `build`).

import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { business, priorityCities, hubTowns, faqs } from "../src/data/serviceArea.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, "../public");

const HUB_SLUG = "fensterreinigung-bodenseekreis";
const HUB_TITLE = "Fensterreinigung in der Umgebung";
const OG_IMAGE = `${business.domain}/media/og-image.png`;

function url(slug = "") {
  return slug ? `${business.domain}/${slug}/` : `${business.domain}/`;
}

function renderHead({ title, description, slug }) {
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
    <meta name="twitter:image" content="${OG_IMAGE}" />`;
}

function jsonLd(obj) {
  return `<script type="application/ld+json">${JSON.stringify(obj)}</script>`;
}

function breadcrumbLd(items) {
  return jsonLd({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: item.href ? url(item.href) : undefined,
    })),
  });
}

function localBusinessLd(areaServedNames) {
  return jsonLd({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    image: OG_IMAGE,
    url: url(),
    email: business.email,
    sameAs: [business.instagram, business.tiktok],
    priceRange: "€",
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

function faqLd(items) {
  return jsonLd({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  });
}

function renderBreadcrumb(items) {
  return `<nav class="container breadcrumb" aria-label="Breadcrumb">
      ${items
        .map((item, i) =>
          item.href
            ? `<a href="${item.href}">${item.label}</a><span aria-hidden="true">/</span>`
            : `<span aria-current="page">${item.label}</span>`
        )
        .join("\n      ")}
    </nav>`;
}

function renderHeader() {
  return `<header class="site-header">
      <div class="container">
        <a href="/" class="brand">${business.name}</a>
        <a href="/#/#kontakt" class="btn btn-primary header-cta">Termin anfragen</a>
      </div>
    </header>`;
}

function renderFooter() {
  return `<footer class="site-footer">
      <div class="container footer-grid">
        <div>
          <span class="footer-name">${business.name}</span>
          <p class="footer-address">
            ${business.street}<br />
            ${business.zip} ${business.city}
          </p>
        </div>
        <nav class="footer-col" aria-label="Leistungsgebiet">
          <a href="/${HUB_SLUG}/">Fensterreinigung in der Umgebung</a>
          ${priorityCities.map((c) => `<a href="/${c.slug}/">Fensterreinigung ${c.name}</a>`).join("\n          ")}
        </nav>
        <div class="footer-col">
          <a href="mailto:${business.email}">${business.email}</a>
          <a href="${business.instagram}" target="_blank" rel="noopener noreferrer">Instagram ${business.instagramHandle}</a>
          <a href="${business.tiktok}" target="_blank" rel="noopener noreferrer">TikTok ${business.tiktokHandle}</a>
        </div>
      </div>
      <div class="container footer-bottom">
        <span>© ${new Date().getFullYear()} ${business.legalName}</span>
        <a href="/#/impressum">Impressum</a>
        <a href="/#/datenschutz">Datenschutz</a>
      </div>
    </footer>`;
}

function renderCta(cityName) {
  return `<section class="section cta-band">
      <div class="container">
        <h2>${cityName ? `Termin in ${cityName} anfragen` : "Jetzt Termin anfragen"}</h2>
        <p class="lede">Kurze Angaben zu Gebäude und Wunschtermin genügen, wir melden uns mit einem Vorschlag.</p>
        <div class="actions">
          <a href="/#/#kontakt" class="btn btn-on-dark">Termin anfragen</a>
          <a href="mailto:${business.email}" class="btn btn-ghost-dark">Direkt E-Mail schreiben</a>
        </div>
      </div>
    </section>`;
}

function renderFaqList(items) {
  return `<ul class="faq-list">
      ${items
        .map(
          (f) => `<li>
        <h3>${f.q}</h3>
        <p>${f.a}</p>
      </li>`
        )
        .join("\n      ")}
    </ul>`;
}

function page({ title, description, slug, breadcrumb, ld, body }) {
  return `<!doctype html>
<html lang="de">
  <head>
    ${renderHead({ title, description, slug })}
    ${ld.join("\n    ")}
  </head>
  <body>
    ${renderHeader()}
    ${renderBreadcrumb(breadcrumb)}
    ${body}
    ${renderFooter()}
  </body>
</html>
`;
}

function cityPage(city) {
  const title = `Fensterreinigung & Fensterputzen in ${city.name} | ${business.name}`;
  const description = `${city.name} Fensterputzen & Fensterreinigung – günstig und flexibel, ohne Vertragsbindung. Fenster, Rahmen & Fensterbänke von ${business.name} aus Markdorf. Jetzt Termin anfragen.`;

  const body = `<main>
      <section class="local-hero container">
        <span class="eyebrow">Fensterreinigung ${city.name}</span>
        <h1>Fensterputzen &amp; Fensterreinigung in ${city.name}</h1>
        <p class="tagline">${city.tagline}</p>
        <p class="intro">${city.intro}</p>
        <div class="actions">
          <a href="/#/#kontakt" class="btn btn-primary">Termin in ${city.name} anfragen</a>
          <a href="/${HUB_SLUG}/" class="btn btn-ghost">Ganzes Einsatzgebiet ansehen</a>
        </div>
      </section>

      <section class="section container">
        <h2>Warum LN Fensterputz statt großer Reinigungsfirma?</h2>
        <p class="lede">Anders als große Gebäudereinigungen mit Rahmenverträgen und Callcenter-Buchung: Du sprichst direkt mit uns, bekommst ein faires Angebot ohne versteckte Kosten und bist nicht an lange Vertragslaufzeiten gebunden.</p>
        <ul class="diff-list">
          <li>
            <h3>Günstiger</h3>
            <p>Ohne große Verwaltung und ohne Zwischenhändler – die Ersparnis geben wir an dich weiter.</p>
          </li>
          <li>
            <h3>Flexibler</h3>
            <p>Einmalig oder wiederkehrend, ganz nach Bedarf – ohne Mindestlaufzeit oder Kündigungsfrist.</p>
          </li>
        </ul>
        <div class="local-note">${city.localNote}</div>
      </section>

      <section class="section container">
        <h2>Leistungen in ${city.name}</h2>
        <p class="lede">Glasflächen innen und außen, Rahmen, Falz und Fensterbänke – in einem Termin, für Privathaushalte und Gewerbe in ${city.name} und den umliegenden Ortsteilen.</p>
      </section>

      <section class="section container">
        <h2>Häufige Frage aus ${city.name}</h2>
        ${renderFaqList([city.faq])}
        <p class="hub-note">Weitere Fragen zu Preisen, Ablauf und unserem gesamten Einsatzgebiet beantworten wir auf der <a href="/${HUB_SLUG}/">Übersichtsseite zur Umgebung</a>.</p>
      </section>

      ${renderCta(city.name)}
    </main>`;

  return page({
    title,
    description,
    slug: city.slug,
    breadcrumb: [
      { label: "Startseite", href: "/" },
      { label: HUB_TITLE, href: `/${HUB_SLUG}/` },
      { label: city.name },
    ],
    ld: [
      localBusinessLd([city.name, business.city]),
      breadcrumbLd([
        { label: "Startseite", href: "" },
        { label: HUB_TITLE, href: HUB_SLUG },
        { label: city.name },
      ]),
      faqLd([city.faq]),
    ],
    body,
  });
}

function hubPage() {
  const title = `${HUB_TITLE} – Bodenseekreis & Umland | ${business.name}`;
  const description = `Günstiger Fensterputzservice im Umkreis von rund 30 km um Markdorf: Friedrichshafen, Überlingen, Ravensburg, Meersburg, Salem und viele weitere Orte am Bodensee. Jetzt anfragen.`;

  const allTownNames = Object.values(hubTowns).flatMap((list) => list.map((t) => t.name));

  const body = `<main>
      <section class="local-hero container">
        <span class="eyebrow">Einsatzgebiet</span>
        <h1>${HUB_TITLE}</h1>
        <p class="tagline">Mit Sitz in Markdorf sind wir im gesamten Bodenseekreis und dem näheren Umland unterwegs – kurze Anfahrtswege dank zentraler Lage.</p>
        <p class="intro">Unten findest du die Orte im Umkreis von rund 30 km, die wir regelmäßig anfahren, gruppiert nach Richtung. Für die größeren Städte gibt es eine eigene Seite mit mehr Details – ist dein Ort nicht dabei, frag einfach an, meistens lässt sich trotzdem ein Termin einrichten.</p>
        <div class="actions">
          <a href="/#/#kontakt" class="btn btn-primary">Termin anfragen</a>
        </div>
      </section>

      <section class="section container">
        <h2>Orte im Einsatzgebiet</h2>
        <p class="lede">Alle Angaben als Luftlinie ab Markdorf, gerundete Richtwerte.</p>
        <div class="town-groups">
          ${Object.entries(hubTowns)
            .map(
              ([group, towns]) => `<div class="town-group">
            <h3>${group}</h3>
            <ul class="town-list">
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
        </div>
        <p class="hub-note">Dein Ort ist weiter entfernt oder nicht gelistet? Kein Problem – schreib uns kurz, wir sagen dir, ob ein Termin machbar ist.</p>
      </section>

      <section class="section container">
        <h2>Ausführliche Seiten für größere Städte</h2>
        <ul class="city-links">
          ${priorityCities.map((c) => `<li><a href="/${c.slug}/">Fensterreinigung ${c.name}</a></li>`).join("\n          ")}
        </ul>
      </section>

      <section class="section container">
        <h2>Häufige Fragen</h2>
        ${renderFaqList(faqs)}
      </section>

      ${renderCta()}
    </main>`;

  return page({
    title,
    description,
    slug: HUB_SLUG,
    breadcrumb: [{ label: "Startseite", href: "/" }, { label: HUB_TITLE }],
    ld: [
      localBusinessLd(["Bodenseekreis", business.city, ...allTownNames]),
      breadcrumbLd([{ label: "Startseite", href: "" }, { label: HUB_TITLE }]),
      faqLd(faqs),
    ],
    body,
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
