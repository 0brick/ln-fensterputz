// Single source of truth for business info + service area, used by:
// - the Vue app (AreaSection, schema)
// - scripts/generate-pages.mjs (static city pages + sitemap.xml)

export const business = {
  name: "LN Fensterputz",
  legalName: "LN Fensterputz GbR",
  owner: "Linus Kurz",
  street: "Döllenstraße 22",
  zip: "88677",
  city: "Markdorf",
  email: "info@ln-fensterputz.de",
  instagram: "https://www.instagram.com/ln.fensterputz/",
  instagramHandle: "@ln.fensterputz",
  tiktok: "https://www.tiktok.com/@fensterputzln",
  tiktokHandle: "@fensterputzln",
  domain: "https://ln-fensterputz.de",
  // Marktplatz Markdorf (Ortszentrum) – hinreichend genau für eine Kleinstadt dieser Größe
  lat: 47.7177,
  lon: 9.3939,
};

// Fünf Zielstädte mit eigener Landingpage. Auswahl nach Einwohnerzahl + Entfernung
// im 30-km-Radius (siehe hubTowns unten für die vollständige Umgebungsliste).
export const priorityCities = [
  {
    slug: "fensterreinigung-friedrichshafen",
    name: "Friedrichshafen",
    distanceKm: 9,
    driveMinutes: 15,
    population: "rund 60.000",
    tagline: "Die größte Stadt am Bodensee – von der Uferpromenade bis Fischbach und Kluftern.",
    intro:
      "Friedrichshafen ist mit rund 60.000 Einwohnern die größte Stadt am Bodensee und liegt nur wenige Autominuten von unserem Standort in Markdorf entfernt. Ob Altbauwohnung in Hafennähe, Bürofassade am Fallenbrunnen oder Einfamilienhaus in Fischbach, Kluftern, Ailingen oder Manzell – wir sind schnell vor Ort.",
    localNote:
      "Gerade in den Stadtteilen mit viel Glasfassade – etwa rund um den Hafen und die Zeppelin-Bürostandorte – lohnt sich eine regelmäßige Reinigung von außen sichtbaren Scheiben besonders.",
    faq: {
      q: "Wie schnell seid ihr in Friedrichshafen vor Ort?",
      a: "Von Markdorf nach Friedrichshafen sind es nur rund 9 km bzw. 15 Autominuten – kurzfristige Termine sind deshalb meistens problemlos möglich, auch in Fischbach, Kluftern oder Ailingen.",
    },
  },
  {
    slug: "fensterreinigung-ravensburg",
    name: "Ravensburg",
    distanceKm: 18,
    driveMinutes: 25,
    population: "rund 50.000",
    tagline: "Türmestadt mit historischer Altstadt, Weststadt und Oberzell.",
    intro:
      "Ravensburg mit seiner bekannten Altstadt rund um Mehlsack und Blaserturm ist etwa 18 km bzw. 25 Autominuten von Markdorf entfernt. Wir reinigen Fenster in der historischen Altstadt genauso wie in Weststadt, Oberzell oder Schmalegg – bei Privathaushalten und Gewerbe.",
    localNote:
      "Historische Fensterrahmen in der Altstadt und großflächige Schaufenster in der Innenstadt behandeln wir unterschiedlich sorgfältig – Erfahrung mit beidem bringen wir mit.",
    faq: {
      q: "Kommt ihr auch in die Ravensburger Altstadt?",
      a: "Ja. Enge Gassen oder historische Fensterrahmen sind kein Problem – wir bringen das passende Equipment mit und richten uns nach den örtlichen Gegebenheiten.",
    },
  },
  {
    slug: "fensterreinigung-ueberlingen",
    name: "Überlingen",
    distanceKm: 18,
    driveMinutes: 25,
    population: "rund 23.000",
    tagline: "Kurstadt am Bodensee mit Seepromenade, Münster und Therme.",
    intro:
      "Überlingen liegt rund 18 km westlich von Markdorf, direkt am Bodensee-Ufer. Als Kurstadt mit Seepromenade, Münster St. Nikolaus und der Therme Überlingen hat der Ort viele Ferienwohnungen, Gewerbeflächen und Wohnhäuser mit Seeblick – und entsprechend große Fensterflächen.",
    localNote:
      "In Überlingen und den Ortsteilen Nußdorf und Andelshofen reinigen wir regelmäßig Ferienwohnungen zwischen zwei Vermietungen – schnell, zuverlässig und ohne dass ihr selbst anreisen müsst.",
    faq: {
      q: "Bietet ihr auch Reinigung zwischen Feriengast-Wechseln in Überlingen an?",
      a: "Ja, das ist bei uns keine Ausnahme. Kurzfristige Termine zwischen zwei Vermietungen lassen sich in der Regel gut einrichten – einfach mit Wunschzeitraum anfragen.",
    },
  },
  {
    slug: "fensterreinigung-meersburg",
    name: "Meersburg",
    distanceKm: 9,
    driveMinutes: 15,
    population: "rund 5.700",
    tagline: "Altstadt, Ober- und Unterstadt, Neues Schloss und Fähre nach Konstanz.",
    intro:
      "Meersburg mit seiner malerischen Altstadt liegt nur etwa 9 km von Markdorf entfernt. Zwischen Oberstadt, Unterstadt und den Steillagen der Weinberge stehen viele historische Gebäude sowie hochwertig sanierte Häuser mit Seeblick – beides reinigen wir behutsam und gründlich.",
    localNote:
      "Für Häuser in Hanglage oder mit schwer zugänglichen Fenstern zur Fähre hin bringen wir das passende Equipment mit, statt euch das selbst zuzumuten.",
    faq: {
      q: "Fahrt ihr von Meersburg aus auch mit der Fähre nach Konstanz?",
      a: "Ja – über die Autofähre Meersburg–Konstanz erreichen wir auch Adressen auf der Konstanzer Seite in vertretbarer Zeit. Einfach anfragen, dann sagen wir dir, ob ein Termin passt.",
    },
  },
  {
    slug: "fensterreinigung-salem",
    name: "Salem",
    distanceKm: 11,
    driveMinutes: 18,
    population: "rund 11.000",
    tagline: "Schloss Salem, Affenberg und die Ortsteile Mimmenhausen, Neufrach, Grasbeuren.",
    intro:
      "Salem mit dem bekannten Schloss Salem und dem Affenberg liegt rund 11 km von Markdorf entfernt und besteht aus mehreren Ortsteilen wie Mimmenhausen, Neufrach, Grasbeuren und Beuren. Viele freistehende Häuser mit großen Fensterflächen im Grünen gehören hier zu unserem Alltag.",
    localNote:
      "Gerade in den ländlicheren Ortsteilen rund um Salem sind Fenster oft stärker durch Pollen, Landwirtschaft und Wetter beansprucht – ein Grund mehr für regelmäßige Termine.",
    faq: {
      q: "Kommt ihr auch in die einzelnen Ortsteile von Salem?",
      a: "Ja, ob Mimmenhausen, Neufrach, Grasbeuren oder ein anderer Ortsteil – Entfernung innerhalb der Gemeinde Salem macht für uns keinen Unterschied.",
    },
  },
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

export const faqs = [
  {
    q: "Was kostet Fensterputzen bei LN Fensterputz?",
    a: "Der Preis hängt von Fensteranzahl, Größe und Zugänglichkeit ab. Weil wir ohne große Verwaltung und ohne Zwischenhändler arbeiten, sind wir in der Regel günstiger als große Komplett-Reinigungsfirmen. Schreib uns kurz dein Anliegen – du bekommst ein unverbindliches Angebot.",
  },
  {
    q: "Muss ich einen Vertrag abschließen?",
    a: "Nein. Du kannst uns einmalig für einen Termin buchen oder einen regelmäßigen Rhythmus vereinbaren – ganz ohne feste Mindestlaufzeit oder Kündigungsfrist.",
  },
  {
    q: "In welchen Orten rund um Markdorf seid ihr aktiv?",
    a: "Wir sind in Markdorf ansässig und fahren den gesamten Bodenseekreis sowie das nähere Umland an – unter anderem Friedrichshafen, Überlingen, Meersburg, Salem, Ravensburg und viele weitere Orte im Umkreis von rund 30 km.",
  },
  {
    q: "Was ist bei einem Termin inklusive?",
    a: "Glasflächen innen und außen, Rahmen, Falz und Fensterbänke – in einem Termin. Auf Wunsch ergänzen wir weitere Bereiche.",
  },
  {
    q: "Wie oft sollte man Fenster reinigen lassen?",
    a: "Für die meisten Haushalte reichen zwei bis vier Termine im Jahr. An stark befahrenen Lagen oder bei Gewerbeflächen mit Kundenlaufkommen kann häufiger sinnvoll sein. Wir beraten dich gern individuell.",
  },
  {
    q: "Wie schnell bekomme ich einen Termin?",
    a: "Da wir flexibel und ohne große Verwaltung arbeiten, sind kurzfristige Termine oft möglich. Am schnellsten geht's über das Kontaktformular oder direkt per E-Mail.",
  },
];
