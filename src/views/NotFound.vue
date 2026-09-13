<script setup></script>

<template>
  <main id="main-content" class="notfound" tabindex="-1">
    <picture class="notfound-media">
      <img src="/media/404-bg.jpg" alt="" aria-hidden="true" />
    </picture>
    <div class="notfound-veil" aria-hidden="true"></div>

    <div class="container notfound-inner">
      <span class="eyebrow">Fehler 404</span>
      <h1>Hier ist wohl geputzt worden.</h1>
      <p>Diese Seite gibt es nicht oder sie wurde verschoben. Zurück zur Startseite geht’s wieder klar weiter.</p>
      <div class="notfound-actions">
        <router-link to="/" class="btn btn-on-dark">Zur Startseite</router-link>
      </div>
    </div>
  </main>
</template>

<style scoped>
.notfound {
  position: relative;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: var(--navy-deep);
}

.notfound-media {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.notfound-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  filter: grayscale(1) contrast(1.08) brightness(0.92);
}

.notfound-veil {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(180deg, rgba(0, 29, 53, 0.7) 0%, rgba(0, 29, 53, 0.6) 38%, rgba(0, 29, 53, 0.88) 100%);
}

.notfound-inner {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 520px;
  margin-inline: auto;
  padding-block: 96px;
  color: #fff;
}

.notfound-inner .eyebrow {
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.68);
  margin-bottom: 14px;
}

.notfound h1 {
  font-size: clamp(2rem, 5vw, 2.8rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  line-height: 1.15;
  color: #fff;
}

.notfound p {
  margin-top: 18px;
  font-size: 1.02rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.86);
}

.notfound-actions {
  margin-top: 36px;
}
</style>
