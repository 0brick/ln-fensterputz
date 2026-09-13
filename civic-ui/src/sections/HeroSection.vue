<script setup>
// The full-bleed navy hero with an image/video backdrop, styled after both
// references: LN Fensterputz's hero structure (media + veil + centered
// copy) rebuilt with a navy/yellow institutional palette and left-aligned,
// editorial heading treatment.
import AppButton from '../components/button/AppButton.vue'

defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  text: { type: String, default: '' },
  image: { type: String, default: '' },
  primaryAction: { type: Object, default: null }, // { label, href }
  secondaryAction: { type: Object, default: null }
})
</script>

<template>
  <section class="cui-hero" :style="image ? { '--cui-hero-image': `url(${image})` } : {}">
    <div class="cui-hero__media" aria-hidden="true" />
    <div class="cui-hero__veil" aria-hidden="true" />

    <div class="cui-container cui-hero__content">
      <span v-if="eyebrow" class="cui-hero__eyebrow">{{ eyebrow }}</span>
      <h1 class="cui-hero__title">{{ title }}</h1>
      <p v-if="text" class="cui-hero__text">{{ text }}</p>
      <div v-if="primaryAction || secondaryAction" class="cui-hero__actions">
        <AppButton v-if="primaryAction" variant="accent" size="lg" :href="primaryAction.href">
          {{ primaryAction.label }}
        </AppButton>
        <AppButton v-if="secondaryAction" variant="outline" size="lg" :href="secondaryAction.href" class="cui-hero__ghost">
          {{ secondaryAction.label }}
        </AppButton>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cui-hero {
  position: relative;
  min-height: 68vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: var(--cui-color-navy);
  color: var(--cui-color-white);
}

.cui-hero__media {
  position: absolute;
  inset: 0;
  z-index: 0;
  background-image: var(--cui-hero-image, none);
  background-size: cover;
  background-position: center;
  opacity: 0.55;
}

.cui-hero__veil {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(100deg, rgba(0, 29, 53, 0.96) 30%, rgba(0, 29, 53, 0.55) 100%);
}

.cui-hero__content {
  position: relative;
  z-index: 2;
  padding-block: var(--cui-space-8);
  max-width: 780px;
}

.cui-hero__eyebrow {
  display: inline-block;
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--cui-color-yellow);
  margin-bottom: var(--cui-space-3);
}

.cui-hero__title {
  color: var(--cui-color-white);
  font-size: var(--cui-fz-h1);
  max-width: 18ch;
}

.cui-hero__text {
  margin-top: var(--cui-space-4);
  font-size: 1.8rem;
  line-height: 1.6;
  max-width: 52ch;
  color: rgba(255, 255, 255, 0.86);
}

.cui-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--cui-space-3);
  margin-top: var(--cui-space-6);
}

.cui-hero__ghost {
  color: var(--cui-color-white);
  border-color: rgba(255, 255, 255, 0.6);
}
.cui-hero__ghost:hover {
  background: var(--cui-color-white);
  color: var(--cui-color-navy);
}
</style>
