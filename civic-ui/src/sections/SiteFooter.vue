<script setup>
// Multi-column footer: brand blurb, link columns, social row, legal row —
// the same shape many institutional footers use (sitemap columns + Impressum/Datenschutz
// + social icons). Columns come from a prop so this stays data-driven.
defineProps({
  columns: { type: Array, default: () => [] }, // [{ title, links: [{ label, href }] }]
  legalLinks: { type: Array, default: () => [] },
  socialLinks: { type: Array, default: () => [] }, // [{ label, href, icon }]
  copyright: { type: String, default: '' }
})
</script>

<template>
  <footer class="cui-footer">
    <div class="cui-container cui-footer__top">
      <div class="cui-footer__brand">
        <slot name="brand" />
      </div>
      <div class="cui-footer__columns">
        <div v-for="col in columns" :key="col.title" class="cui-footer__col">
          <h3>{{ col.title }}</h3>
          <ul>
            <li v-for="link in col.links" :key="link.label"><a :href="link.href">{{ link.label }}</a></li>
          </ul>
        </div>
      </div>
    </div>

    <div v-if="socialLinks.length" class="cui-container cui-footer__social">
      <a v-for="s in socialLinks" :key="s.label" :href="s.href" :aria-label="s.label" class="cui-footer__social-link">
        <span v-html="s.icon" />
      </a>
    </div>

    <div class="cui-footer__bottom">
      <div class="cui-container cui-footer__bottom-inner">
        <p class="cui-footer__copyright">{{ copyright }}</p>
        <nav class="cui-footer__legal" aria-label="Legal">
          <a v-for="link in legalLinks" :key="link.label" :href="link.href">{{ link.label }}</a>
        </nav>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.cui-footer {
  background: var(--cui-color-navy);
  color: rgba(255, 255, 255, 0.8);
}

.cui-footer__top {
  display: grid;
  gap: var(--cui-space-6);
  padding-block: var(--cui-space-7);
}

.cui-footer__brand {
  color: var(--cui-color-white);
  max-width: 420px;
}

.cui-footer__columns {
  display: grid;
  gap: var(--cui-space-5);
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
}

.cui-footer__col h3 {
  color: var(--cui-color-white);
  font-size: 1.4rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: var(--cui-space-3);
}

.cui-footer__col ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.cui-footer__col a {
  color: inherit;
  text-decoration: none;
  font-size: 1.35rem;
}
.cui-footer__col a:hover {
  color: var(--cui-color-yellow);
}

.cui-footer__social {
  display: flex;
  gap: var(--cui-space-3);
  padding-bottom: var(--cui-space-6);
}

.cui-footer__social-link {
  width: 3.8rem;
  height: 3.8rem;
  border-radius: 50%;
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--cui-color-white);
  transition: border-color var(--cui-duration) var(--cui-ease), background-color var(--cui-duration) var(--cui-ease);
}
.cui-footer__social-link:hover {
  background: var(--cui-color-yellow);
  border-color: var(--cui-color-yellow);
  color: var(--cui-color-navy);
}

.cui-footer__bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.15);
}

.cui-footer__bottom-inner {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--cui-space-3);
  padding-block: var(--cui-space-4);
  font-size: 1.2rem;
}

.cui-footer__legal {
  display: flex;
  gap: var(--cui-space-4);
}
.cui-footer__legal a {
  color: inherit;
  text-decoration: none;
}
.cui-footer__legal a:hover {
  color: var(--cui-color-yellow);
}

@media (min-width: 900px) {
  .cui-footer__top {
    grid-template-columns: 1fr 2fr;
  }
}
</style>
