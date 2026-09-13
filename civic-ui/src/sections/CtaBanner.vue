<script setup>
// Full-width banner for a single strong call to action (careers page,
// newsletter push, "apply now" — the yellow-block pattern often used to
// break up long content pages).
import AppButton from '../components/button/AppButton.vue'

defineProps({
  title: { type: String, required: true },
  text: { type: String, default: '' },
  action: { type: Object, required: true } // { label, href }
})
</script>

<template>
  <section class="cui-cta">
    <div class="cui-container cui-cta__inner">
      <div>
        <h2 class="cui-cta__title">{{ title }}</h2>
        <p v-if="text" class="cui-cta__text">{{ text }}</p>
      </div>
      <AppButton variant="primary" size="lg" :href="action.href">{{ action.label }}</AppButton>
    </div>
  </section>
</template>

<style scoped>
.cui-cta {
  background: var(--cui-color-yellow);
}

.cui-cta__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--cui-space-5);
  padding-block: var(--cui-space-7);
}

.cui-cta__title {
  color: var(--cui-color-navy);
  margin-bottom: var(--cui-space-2);
}

.cui-cta__text {
  color: var(--cui-color-navy);
  font-size: 1.6rem;
  margin: 0;
  max-width: 60ch;
}
</style>
