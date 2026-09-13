<script setup>
const bbox = "9.20,47.66,9.50,47.80";
const marker = "47.7177,9.3939"; // Marktplatz Markdorf (Ortszentrum, nicht die Geschäftsadresse)
const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${marker}`;
</script>

<template>
  <section id="einsatzgebiet" class="area">
    <div class="container area-grid">
      <div class="area-text" v-reveal>
        <h2>Einsatzgebiet</h2>
        <p>Mit Sitz in Markdorf, unterwegs im gesamten Umkreis rund um den Bodensee.</p>
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

.area-text h2 {
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.12;
  max-width: 14ch;
}

.area-text p {
  margin-top: 16px;
  font-size: 1.02rem;
  line-height: 1.55;
  color: var(--ink-soft);
  max-width: 40ch;
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
