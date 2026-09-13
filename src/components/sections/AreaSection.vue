<script setup>
import { priorityCities, hubTowns } from "../../data/serviceArea.js";

const bbox = "9.20,47.66,9.50,47.80";
const marker = "47.7177,9.3939"; // Marktplatz Markdorf (Ortszentrum, nicht die Geschäftsadresse)
const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${marker}`;

const allTowns = Object.values(hubTowns).flat();
</script>

<template>
  <section id="einsatzgebiet" class="area">
    <div class="container area-grid">
      <div class="area-text" v-reveal>
        <span class="eyebrow">Einsatzgebiet</span>
        <h2>Fensterreinigung in der Umgebung</h2>
        <p>
          Mit Sitz in Markdorf sind wir im gesamten Bodenseekreis und dem näheren Umland
          unterwegs – von Friedrichshafen und Meersburg bis Überlingen, Salem und Ravensburg.
        </p>

        <ul class="area-city-links">
          <li v-for="c in priorityCities" :key="c.slug">
            <a :href="`/${c.slug}/`">Fensterreinigung {{ c.name }}</a>
          </li>
          <li>
            <a href="/fensterreinigung-bodenseekreis/" class="area-city-links-all"
              >Alle Orte im Umkreis von 30&nbsp;km ansehen →</a
            >
          </li>
        </ul>
      </div>

      <div class="area-visual" v-reveal="{ delay: 100 }">
        <iframe
          class="area-map"
          :src="mapSrc"
          title="Standort Markdorf am Bodensee"
          loading="lazy"
        ></iframe>
      </div>
    </div>

    <div class="container area-towns" v-reveal="{ delay: 160 }">
      <span v-for="t in allTowns" :key="t.name" class="area-town-chip">{{ t.name }}</span>
    </div>
  </section>
</template>

<style scoped>
.area {
  padding-block: 96px;
  background: var(--paper-sunken);
}

.area-grid {
  display: grid;
  gap: 40px;
  align-items: center;
}

.area-text .eyebrow {
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-faint);
  margin-bottom: 14px;
}

.area-text h2 {
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.12;
  max-width: 16ch;
}

.area-text > p {
  margin-top: 16px;
  font-size: 1.02rem;
  line-height: 1.55;
  color: var(--ink-soft);
  max-width: 44ch;
}

.area-city-links {
  margin: 24px 0 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.area-city-links a {
  display: inline-flex;
  padding: 10px 16px;
  border: 1.5px solid var(--line-strong);
  border-radius: 999px;
  font-size: 0.88rem;
  font-weight: 600;
  transition: border-color 0.2s var(--ease-out);
}

.area-city-links a:hover {
  border-color: var(--ink);
}

.area-city-links-all {
  border-color: transparent !important;
  text-decoration: underline;
  text-underline-offset: 2px;
  padding-inline: 4px !important;
}

.area-visual {
  width: 100%;
}

.area-map {
  width: 100%;
  aspect-ratio: 4 / 3;
  display: block;
  border: 1px solid var(--line);
}

.area-towns {
  margin-top: 56px;
  padding-top: 40px;
  border-top: 1px solid var(--line);
  display: flex;
  flex-wrap: wrap;
  gap: 10px 12px;
}

.area-town-chip {
  font-size: 0.86rem;
  color: var(--ink-soft);
}

.area-town-chip:not(:last-child)::after {
  content: "·";
  margin-left: 12px;
  color: var(--ink-faint);
}

@media (min-width: 860px) {
  .area-grid {
    grid-template-columns: 1fr 0.95fr;
    gap: 64px;
  }
  .area-map {
    aspect-ratio: 1 / 1;
  }
}
</style>
