<script setup></script>

<template>
  <main id="main-content" class="legal" tabindex="-1">
    <div class="container legal-inner">
      <h1>Impressum</h1>

      <section>
        <h2>Angaben gemäß § 5 DDG</h2>
        <p>
          LN Fensterputz GbR<br />
          Döllenstraße 22<br />
          88677 Markdorf
        </p>
      </section>

      <section>
        <h2>Vertreten durch</h2>
        <p>Linus Kurz</p>
      </section>

      <section>
        <h2>Kontakt</h2>
        <p>
          E-Mail: <a href="mailto:info@ln-fensterputz.de">info@ln-fensterputz.de</a>
        </p>
      </section>

      <section>
        <h2>Technische Umsetzung der Website</h2>
        <p>
          Bei technischen Fragen oder Problemen mit dieser Website wenden Sie sich bitte an:<br />
          E-Mail: <a href="mailto:felixlohse@proton.me">felixlohse@proton.me</a>
        </p>
      </section>

      <section>
        <h2>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
        <p>
          Wir nehmen nicht an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
          teil und sind dazu auch nicht verpflichtet.
        </p>
      </section>

      <section>
        <h2>Haftungsausschluss</h2>
        <h3>Haftung für Links</h3>
        <p>
          Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir
          keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine
          Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige
          Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden
          zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige
          Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente
          inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte
          einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen
          werden wir derartige Links umgehend entfernen.
        </p>
      </section>

      <router-link to="/" class="legal-back">Zurück zur Startseite</router-link>
    </div>
  </main>
</template>

<style scoped>
.legal {
  padding-block: 64px 100px;
  min-height: 60vh;
}

.legal-inner {
  max-width: 640px;
}

.legal h1 {
  font-size: clamp(2rem, 4vw, 2.6rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 44px;
}

.legal section {
  margin-bottom: 32px;
  padding-top: 24px;
  border-top: 1px solid var(--line);
}

.legal h2 {
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.legal h3 {
  font-size: 0.96rem;
  font-weight: 600;
  color: var(--ink-soft);
  margin-bottom: 8px;
}

.legal p {
  font-size: 0.98rem;
  line-height: 1.65;
  color: var(--ink-soft);
}

.legal a {
  color: var(--ink);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.legal-back {
  display: inline-block;
  margin-top: 12px;
  font-weight: 600;
  color: var(--ink);
}

.legal-back:hover {
  text-decoration: underline;
}
</style>
