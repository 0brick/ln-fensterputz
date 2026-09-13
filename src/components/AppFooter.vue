<script setup>
import { PhInstagramLogo as InstagramLogo, PhEnvelopeSimple as EnvelopeSimple, PhTiktokLogo as TiktokLogo } from "@phosphor-icons/vue";
import { business, priorityCities } from "../data/serviceArea.js";

const year = new Date().getFullYear();
</script>

<template>
  <footer class="footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <span class="footer-name">LN Fensterputz</span>
        <address class="footer-address">
          {{ business.street }}<br />
          {{ business.zip }} {{ business.city }}
        </address>
      </div>

      <nav class="footer-links" aria-label="Footer Navigation">
        <router-link :to="{ path: '/', hash: '#leistungen' }">Leistungen</router-link>
        <router-link :to="{ path: '/', hash: '#ablauf' }">Ablauf</router-link>
        <router-link :to="{ path: '/', hash: '#einsatzgebiet' }">Einsatzgebiet</router-link>
        <router-link :to="{ path: '/', hash: '#kontakt' }">Kontakt</router-link>
      </nav>

      <nav class="footer-links" aria-label="Einsatzgebiet Navigation">
        <a href="/fensterreinigung-bodenseekreis/">Fensterreinigung in der Umgebung</a>
        <a v-for="c in priorityCities" :key="c.slug" :href="`/${c.slug}/`">Fensterreinigung {{ c.name }}</a>
      </nav>

      <div class="footer-contact">
        <a href="mailto:info@ln-fensterputz.de" class="footer-icon-link">
          <EnvelopeSimple :size="18" weight="regular" aria-hidden="true" />
          info@ln-fensterputz.de
        </a>
        <a
          href="https://www.instagram.com/ln.fensterputz/"
          target="_blank"
          rel="noopener noreferrer"
          class="footer-icon-link"
        >
          <InstagramLogo :size="18" weight="regular" aria-hidden="true" />
          @ln.fensterputz<span class="visually-hidden"> (öffnet in neuem Tab)</span>
        </a>

        <a
          href="https://www.tiktok.com/@fensterputzln"
          target="_blank"
          rel="noopener noreferrer"
          class="footer-icon-link"
        >
            <TiktokLogo :size="18" weight="regular" aria-hidden="true" />
            @fensterputzln<span class="visually-hidden"> (öffnet in neuem Tab)</span>
        </a>
      </div>
    </div>

    <div class="container footer-bottom">
      <span>© {{ year }} LN Fensterputz GbR</span>
      <router-link to="/impressum">Impressum</router-link>
      <router-link to="/datenschutz">Datenschutz</router-link>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--navy-deep);
  color: rgba(255, 255, 255, 0.68);
  padding-top: 72px;
}

.footer-grid {
  display: grid;
  gap: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.14);
}

.footer-name {
  display: block;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.15rem;
  letter-spacing: -0.01em;
  color: #fff;
}

.footer-address {
  display: block;
  margin-top: 12px;
  font-size: 0.9rem;
  font-style: normal;
  line-height: 1.6;
}

.footer-links,
.footer-contact {
  display: flex;
  flex-direction: column;
  gap: 13px;
  font-size: 0.92rem;
}

.footer-links a:hover,
.footer-icon-link:hover {
  color: #fff;
}

.footer-icon-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.footer-bottom {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 24px;
  justify-content: space-between;
  padding-block: 20px;
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.46);
}

.footer-bottom a:hover {
  color: #fff;
}

@media (min-width: 720px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 1000px) {
  .footer-grid {
    grid-template-columns: 1.1fr 1fr 1fr 1fr;
  }
}
</style>
