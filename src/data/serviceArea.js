// Data for the city landing pages (routes in src/router.js) and scripts/generate-pages.mjs (sitemap, redirects).
// The Vue app uses priorityCities to link those pages from the footer
// (AppFooter) – without internal links they would be orphan pages.

export const business = {
  name: "LN Fensterputz",
  legalName: "LN Fensterputz GbR",
  street: "Döllenstraße 22",
  zip: "88677",
  city: "Markdorf",
  email: "info@ln-fensterputz.de",
  instagram: "https://www.instagram.com/ln.fensterputz/",
  tiktok: "https://www.tiktok.com/@fensterputzln",
  domain: "https://ln-fensterputz.de",
  // Marktplatz Markdorf (Ortszentrum) – hinreichend genau für eine Kleinstadt dieser Größe
  lat: 47.7177,
  lon: 9.3939,
};

// Fünf Zielstädte mit eigener Landingpage (Auswahl nach Einwohnerzahl + Entfernung,
// mit dem Kunden abgestimmt). Jede Seite ist ansonsten ein Klon der Startseite.
// distanceKm: gerundete Luftlinie ab Markdorf (für die Meta Description).
export const priorityCities = [
  { slug: "fensterreinigung-friedrichshafen", name: "Friedrichshafen", distanceKm: 9 },
  { slug: "fensterreinigung-ravensburg", name: "Ravensburg", distanceKm: 18 },
  { slug: "fensterreinigung-ueberlingen", name: "Überlingen", distanceKm: 18 },
  { slug: "fensterreinigung-meersburg", name: "Meersburg", distanceKm: 9 },
  { slug: "fensterreinigung-salem", name: "Salem", distanceKm: 11 },
];

// Die frühere Umgebungsseite /fensterreinigung-bodenseekreis/ gibt es nicht mehr; die Startseite
// übernimmt ihre Rolle. Die alte URL wird per Weiterleitungsseite auf / umgeleitet.
export const REDIRECTS = { "fensterreinigung-bodenseekreis": "/" };

