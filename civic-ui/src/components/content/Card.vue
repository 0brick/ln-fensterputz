<script setup>
// The workhorse teaser card most content grids
// from: optional image on top, eyebrow/kicker, heading, text, then an
// optional footer (usually a link). Every part is a slot so it degrades
// gracefully — no image, no footer, whatever the page needs.
defineProps({
  image: { type: String, default: '' },
  imageAlt: { type: String, default: '' },
  eyebrow: { type: String, default: '' },
  title: { type: String, default: '' },
  href: { type: String, default: '' },
  variant: { type: String, default: 'default', validator: (v) => ['default', 'outlined', 'flat'].includes(v) }
})
</script>

<template>
  <component :is="href ? 'a' : 'div'" :href="href || undefined" class="cui-card" :class="`cui-card--${variant}`">
    <div v-if="image" class="cui-card__media">
      <img :src="image" :alt="imageAlt" loading="lazy" />
    </div>
    <div class="cui-card__body">
      <span v-if="eyebrow" class="cui-eyebrow">{{ eyebrow }}</span>
      <h3 v-if="title" class="cui-card__title">{{ title }}</h3>
      <div class="cui-card__content"><slot /></div>
      <div v-if="$slots.footer" class="cui-card__footer"><slot name="footer" /></div>
    </div>
  </component>
</template>

<style scoped>
.cui-card {
  display: flex;
  flex-direction: column;
  background: var(--cui-color-white);
  border-radius: var(--cui-radius-lg);
  overflow: hidden;
  color: inherit;
  text-decoration: none;
  transition: transform var(--cui-duration) var(--cui-ease), box-shadow var(--cui-duration) var(--cui-ease);
  height: 100%;
}

.cui-card--default {
  box-shadow: var(--cui-shadow-sm);
}
.cui-card--outlined {
  border: 1.5px solid var(--cui-border);
}
.cui-card--flat {
  background: transparent;
}

a.cui-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--cui-shadow-md);
}

.cui-card__media {
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: var(--cui-bg-muted);
}
.cui-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cui-card__body {
  padding: var(--cui-space-5);
  display: flex;
  flex-direction: column;
  flex: 1;
}

.cui-card__title {
  font-size: 2rem;
  margin: 0 0 var(--cui-space-2);
}

.cui-card__content {
  flex: 1;
  color: var(--cui-text-muted);
  font-size: 1.4rem;
}

.cui-card__footer {
  margin-top: var(--cui-space-4);
}
</style>
