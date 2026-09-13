<script setup>
const services = [
  {
    title: "Rundum-Reinigung",
    text: "Glas, Rahmen, Falz und Fensterbank in einem Termin.",
  },
  {
    title: "Einzel- oder Serientermin",
    text: "Einmalig oder wiederkehrend, ganz nach Bedarf.",
  },
];
</script>

<template>
  <section id="leistungen" class="services">
    <div class="container services-grid">
      <div class="services-media" v-reveal>
        <picture>
          <source srcset="/media/services-windows.webp" type="image/webp" />
          <img src="/media/services-windows.jpg" alt="Fensterfront mit blau reflektierenden Scheiben" loading="lazy" />
        </picture>
      </div>

      <div class="services-content">
        <div class="section-head" v-reveal>
          <h2>Leistungen im Überblick</h2>
        </div>

        <ul class="services-list">
          <li v-for="(s, i) in services" :key="s.title" v-reveal="{ delay: i * 70 }">
            <h3>{{ s.title }}</h3>
            <p>{{ s.text }}</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services {
  padding-block: 96px;
}

.services-grid {
  display: grid;
  gap: 40px;
}

.services-media {
  border: 1px solid var(--line);
}

.services-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 4 / 5;
}

.services-list {
  margin: 40px 0 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
}

.services-list li {
  padding-block: 22px;
  border-top: 1px solid var(--line);
}

.services-list li:last-child {
  border-bottom: 1px solid var(--line);
}

.services-list h3 {
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.services-list p {
  margin-top: 8px;
  font-size: 0.96rem;
  line-height: 1.55;
  color: var(--ink-soft);
  max-width: 44ch;
}

@media (min-width: 900px) {
  .services-grid {
    grid-template-columns: 0.85fr 1.15fr;
    gap: 64px;
    align-items: center;
  }
}
</style>
