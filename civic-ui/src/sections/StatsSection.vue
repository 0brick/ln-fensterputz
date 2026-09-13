<script setup>
// A row of key figures ("X employees, Y locations…") — common on agency
// "about us" pages to establish scale without a wall of text.
defineProps({
  title: { type: String, default: '' },
  stats: { type: Array, required: true } // [{ value, label }]
})
</script>

<template>
  <section class="cui-section cui-section--dark">
    <div class="cui-container">
      <h2 v-if="title" class="cui-stats__title">{{ title }}</h2>
      <div class="cui-grid cui-grid--4 cui-stats__grid">
        <div v-for="stat in stats" :key="stat.label" class="cui-stats__item">
          <p class="cui-stats__value">{{ stat.value }}</p>
          <p class="cui-stats__label">{{ stat.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cui-stats__title {
  color: var(--cui-color-white);
  margin-bottom: var(--cui-space-6);
}

.cui-stats__item {
  text-align: center;
}

.cui-stats__value {
  font-size: clamp(3rem, 4vw, 4.6rem);
  font-weight: 700;
  color: var(--cui-color-yellow);
  margin: 0;
}

.cui-stats__label {
  margin: var(--cui-space-2) 0 0;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.4rem;
}
</style>
