<script setup>
// The topic-card grid section ("Cybersecurity / Regions / Careers…" style
// layout) built on top of the plain Card component.
import Card from '../components/content/Card.vue'

defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  intro: { type: String, default: '' },
  items: { type: Array, required: true } // [{ title, text, image, href }]
})
</script>

<template>
  <section class="cui-section">
    <div class="cui-container">
      <div class="cui-teaser-grid__intro">
        <span v-if="eyebrow" class="cui-eyebrow">{{ eyebrow }}</span>
        <h2>{{ title }}</h2>
        <p v-if="intro" class="cui-teaser-grid__lead">{{ intro }}</p>
      </div>
      <div class="cui-grid cui-grid--3">
        <Card v-for="item in items" :key="item.title" :image="item.image" :title="item.title" :href="item.href">
          {{ item.text }}
        </Card>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cui-teaser-grid__intro {
  max-width: 640px;
  margin-bottom: var(--cui-space-6);
}

.cui-teaser-grid__lead {
  font-size: 1.7rem;
  color: var(--cui-text-muted);
}
</style>
