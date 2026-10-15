<script setup></script>

<template>
  <section id="jahresangebot" class="annual-offer">
    <div class="container">
      <div class="annual-offer-shell">
        <div class="section-head" v-reveal>
          <h2>Jahresangebot</h2>
          <p>Planbare Fensterpflege über das Jahr hinweg – zuverlässig, terminsicher und mit klar kalkulierbarem Umfang.</p>
        </div>

        <div class="annual-offer-grid">
          <ul class="annual-offer-list">
            <li v-reveal="{ delay: 70 }">
              <h3>3 Reinigungen pro Jahr</h3>
              <p>Regelmäßige Pflege ohne zusätzlichen Organisationsaufwand.</p>
            </li>
            <li v-reveal="{ delay: 130 }">
              <h3>Frühjahr · Sommer · Herbst</h3>
              <p>Abgestimmte Zeitfenster für konstant gepflegte Fensterflächen.</p>
            </li>
            <li class="annual-offer-highlight" v-reveal="{ delay: 190 }">
              <h3>15% Rabatt</h3>
              <p>Auf den Gesamtumfang des Jahrespakets.</p>
            </li>
          </ul>

          <div class="annual-offer-cta" v-reveal="{ delay: 220 }">
            <p>Gern beraten wir Sie, ob das Jahresangebot zu Gebäude und Nutzungsrhythmus passt.</p>
            <router-link :to="{ path: '/', hash: '#kontakt' }" class="btn btn-ghost">Jahresangebot anfragen</router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.annual-offer {
  padding-block: 96px;
}

.annual-offer-shell {
  padding: 36px;
  border: 1px solid var(--line);
  background: var(--paper-sunken);
}

.annual-offer-grid {
  margin-top: 36px;
  display: grid;
  gap: 26px;
}

.annual-offer-list {
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid var(--line);
}

.annual-offer-list li {
  padding-block: 20px;
  border-bottom: 1px solid var(--line);
}

.annual-offer-list h3 {
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.annual-offer-list p {
  margin-top: 8px;
  font-size: 0.95rem;
  line-height: 1.55;
  color: var(--ink-soft);
  max-width: 46ch;
}

.annual-offer-highlight h3 {
  font-size: 1.28rem;
  font-weight: 800;
}

.annual-offer-cta {
  padding: 22px;
  border: 1px solid var(--line);
  background: var(--paper-raised);
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
}

.annual-offer-cta p {
  font-size: 0.98rem;
  line-height: 1.55;
  color: var(--ink-soft);
  max-width: 44ch;
}

@media (min-width: 640px) {
  .annual-offer-shell {
    padding: 48px;
  }
}

@media (min-width: 900px) {
  .annual-offer-grid {
    grid-template-columns: 1.2fr 0.8fr;
    align-items: start;
    gap: 34px;
  }
}
</style>
