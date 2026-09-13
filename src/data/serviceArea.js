// Data source for scripts/generate-pages.mjs (static per-city SEO landing pages).
// Not used by the Vue app anymore — the homepage stays generic/city-agnostic on purpose.

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
export const priorityCities = [
  { slug: "fensterreinigung-friedrichshafen", name: "Friedrichshafen" },
  { slug: "fensterreinigung-ravensburg", name: "Ravensburg" },
  { slug: "fensterreinigung-ueberlingen", name: "Überlingen" },
  { slug: "fensterreinigung-meersburg", name: "Meersburg" },
  { slug: "fensterreinigung-salem", name: "Salem" },
];

// Vollständige Liste für die Umgebungs-/Einsatzgebiet-Seite: alle Orte, die wir
// mit einem Radius von ca. 30 km um Markdorf noch gut anfahren können.
// Entfernungen sind gerundete Luftlinien-Richtwerte, keine exakten Fahrstrecken.
export const hubTowns = {
  "Direkt am Bodenseeufer": [
    { name: "Immenstaad am Bodensee", distanceKm: 7 },
    { name: "Hagnau am Bodensee", distanceKm: 7 },
    { name: "Friedrichshafen", distanceKm: 9, slug: "fensterreinigung-friedrichshafen" },
    { name: "Meersburg", distanceKm: 9, slug: "fensterreinigung-meersburg" },
    { name: "Uhldingen-Mühlhofen", distanceKm: 15 },
    { name: "Überlingen", distanceKm: 18, slug: "fensterreinigung-ueberlingen" },
    { name: "Sipplingen", distanceKm: 23 },
    { name: "Langenargen", distanceKm: 17 },
    { name: "Kressbronn am Bodensee", distanceKm: 20 },
    { name: "Konstanz (per Fähre ab Meersburg)", distanceKm: 18 },
  ],
  "Markdorfer Umland": [
    { name: "Bermatingen", distanceKm: 5 },
    { name: "Oberteuringen", distanceKm: 6 },
    { name: "Salem", distanceKm: 11, slug: "fensterreinigung-salem" },
    { name: "Deggenhausertal", distanceKm: 11 },
    { name: "Frickingen", distanceKm: 13 },
    { name: "Heiligenberg", distanceKm: 18 },
    { name: "Owingen", distanceKm: 20 },
    { name: "Herdwangen-Schönach", distanceKm: 22 },
    { name: "Pfullendorf", distanceKm: 25 },
  ],
  "Richtung Ravensburg & Allgäu": [
    { name: "Eriskirch", distanceKm: 12 },
    { name: "Meckenbeuren", distanceKm: 14 },
    { name: "Tettnang", distanceKm: 16 },
    { name: "Ravensburg", distanceKm: 18, slug: "fensterreinigung-ravensburg" },
    { name: "Bodnegg", distanceKm: 19 },
    { name: "Weingarten", distanceKm: 21 },
    { name: "Neukirch", distanceKm: 21 },
    { name: "Waldburg", distanceKm: 21 },
    { name: "Baienfurt", distanceKm: 22 },
    { name: "Amtzell", distanceKm: 27 },
  ],
};
