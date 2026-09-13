<script setup>
import { faqs } from "../../data/serviceArea.js";

// Nur die ersten drei hier zeigen (Preis, Vertrag, Gebiet – die drei mit der größten
// Such- und Kaufrelevanz). Die vollständige Liste steht auf /fensterreinigung-bodenseekreis/.
// Muss mit dem FAQPage-Script in index.html übereinstimmen (sichtbarer Inhalt = Schema-Inhalt).
const homeFaqs = faqs.slice(0, 3);
</script>

<template>
  <section id="faq" class="faq">
    <div class="container">
      <div class="section-head" v-reveal>
        <h2>Häufige Fragen</h2>
      </div>

      <ul class="faq-list">
        <li v-for="(f, i) in homeFaqs" :key="f.q" v-reveal="{ delay: i * 70 }">
          <h3>{{ f.q }}</h3>
          <p>{{ f.a }}</p>
        </li>
      </ul>

      <p class="faq-more">
        Weitere Fragen und alle Orte im Einsatzgebiet gibt es auf der
        <a href="/fensterreinigung-bodenseekreis/">Übersichtsseite zur Umgebung</a>.
      </p>
    </div>
  </section>
</template>

<style scoped>
.faq {
  padding-block: 96px;
}

.faq-list {
  margin: 40px 0 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
}

.faq-list li {
  padding-block: 22px;
  border-top: 1px solid var(--line);
}

.faq-list li:last-child {
  border-bottom: 1px solid var(--line);
}

.faq-list h3 {
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.faq-list p {
  margin-top: 8px;
  font-size: 0.96rem;
  line-height: 1.55;
  color: var(--ink-soft);
  max-width: 60ch;
}

.faq-more {
  margin-top: 28px;
  font-size: 0.92rem;
  color: var(--ink-soft);
}

.faq-more a {
  color: var(--ink);
  text-decoration: underline;
  text-underline-offset: 2px;
}
</style>
