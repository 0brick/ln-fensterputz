<script setup></script>

<template>
  <section class="hero">
    <picture class="hero-media">
      <source media="(min-width: 900px)" srcset="/media/hero-wide.webp" type="image/webp" />
      <source media="(min-width: 900px)" srcset="/media/hero-wide.jpg" type="image/jpeg" />
      <source srcset="/media/hero-tall.webp" type="image/webp" />
      <img src="/media/hero-tall.jpg" alt="" aria-hidden="true" fetchpriority="high" />
    </picture>
    <div class="hero-veil" aria-hidden="true"></div>

    <div class="container hero-content">
      <h1>Fensterreinigung rund um den Bodensee</h1>
      <p>
        Fenster, Rahmen und Fensterbänke für Privathaushalte und Gewerbe – günstiger und
        flexibler als große Gebäudereinigungen, ohne feste Vertragsbindung.
      </p>
      <div class="hero-actions">
        <router-link :to="{ path: '/', hash: '#kontakt' }" class="btn btn-on-dark">Termin anfragen</router-link>
        <router-link :to="{ path: '/', hash: '#leistungen' }" class="btn btn-ghost-dark">Leistungen ansehen</router-link>
      </div>
    </div>

    <a :href="'#leistungen'" class="hero-scroll" aria-label="Zu den Leistungen scrollen">
      <span></span>
    </a>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: calc(100vh - var(--nav-height));
  max-height: 900px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: var(--navy-deep);
}

.hero-media {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 62% 30%;
  filter: grayscale(1) contrast(1.08) brightness(0.92);
}

.hero-veil {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(180deg, rgba(0, 29, 53, 0.62) 0%, rgba(0, 29, 53, 0.58) 38%, rgba(0, 29, 53, 0.84) 100%);
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-block: 64px;
}

.hero-content h1 {
  font-size: clamp(2.4rem, 6.4vw, 5.2rem);
  font-weight: 900;
  letter-spacing: -0.025em;
  line-height: 1.05;
  color: #fff;
  max-width: 20ch;
}

.hero-content p {
  margin-top: 24px;
  font-size: clamp(1.02rem, 1.5vw, 1.18rem);
  line-height: 1.6;
  max-width: 46ch;
  color: rgba(255, 255, 255, 0.86);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 14px;
  margin-top: 38px;
}

.btn-ghost-dark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 15px 28px;
  border-radius: var(--radius-md);
  font-size: 0.96rem;
  font-weight: 600;
  border: 1.5px solid transparent;
  color: rgba(255, 255, 255, 0.78);
  transition: color 0.2s var(--ease-out);
}

.btn-ghost-dark:hover {
  color: #fff;
}

.hero-scroll {
  position: absolute;
  left: 50%;
  bottom: 28px;
  transform: translateX(-50%);
  z-index: 2;
  width: 26px;
  height: 42px;
  border: 1.5px solid rgba(255, 255, 255, 0.55);
  border-radius: 20px;
  display: none;
}

.hero-scroll span {
  position: absolute;
  left: 50%;
  top: 8px;
  width: 3px;
  height: 8px;
  background: #fff;
  border-radius: 2px;
  transform: translateX(-50%);
  animation: scroll-cue 1.8s ease-in-out infinite;
}

@keyframes scroll-cue {
  0% { opacity: 1; top: 8px; }
  70% { opacity: 0; top: 20px; }
  100% { opacity: 0; top: 8px; }
}

@media (prefers-reduced-motion: reduce) {
  .hero-scroll span {
    animation: none;
  }
}

@media (min-width: 640px) {
  .hero-scroll {
    display: block;
  }
}

@media (min-width: 900px) {
  .hero {
    min-height: calc(100vh - var(--nav-height));
  }
}
</style>
