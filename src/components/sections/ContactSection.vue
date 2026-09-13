<script setup>
import { reactive, ref } from "vue";
import { PhEnvelopeSimple as EnvelopeSimple, PhInstagramLogo as InstagramLogo } from "@phosphor-icons/vue";

const STATICFORMS_API_KEY = "sf_9caf363f9a44f41fd6c58c8b";
const STATICFORMS_URL = "https://api.staticforms.dev/submit";

const form = reactive({
  name: "",
  email: "",
  phone: "",
  street: "",
  houseNumber: "",
  zip: "",
  city: "",
  message: "",
  privacyAccepted: false,
  honeypot: "",
});

const status = ref("idle"); // idle | sending | success | error

let cityAutoFilled = false;
let plzLookupController = null;

async function lookupCity() {
  const zip = form.zip.trim();
  if (!/^\d{5}$/.test(zip)) return;
  plzLookupController?.abort();
  plzLookupController = new AbortController();
  try {
    const response = await fetch(`https://api.zippopotam.us/de/${zip}`, {
      signal: plzLookupController.signal,
    });
    if (!response.ok) return;
    const data = await response.json();
    const place = data.places?.[0]?.["place name"];
    if (place && (!form.city || cityAutoFilled)) {
      form.city = place;
      cityAutoFilled = true;
    }
  } catch {
    // Nachschlagen ist nur eine Hilfe, Ort bleibt manuell editierbar
  }
}

function onCityInput() {
  cityAutoFilled = false;
}

async function submitForm() {
  if (form.honeypot) return;
  status.value = "sending";
  const address = `${form.street} ${form.houseNumber}, ${form.zip} ${form.city}`.trim();
  try {
    const response = await fetch(STATICFORMS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apiKey: STATICFORMS_API_KEY,
        subject: "Terminanfrage über die Website",
        replyTo: "@",
        name: form.name,
        email: form.email,
        phone: form.phone,
        address,
        message: form.message,
        honeypot: form.honeypot,
      }),
    });
    const data = await response.json();
    status.value = data.success ? "success" : "error";
  } catch {
    status.value = "error";
  }
}
</script>

<template>
  <section id="kontakt" class="contact">
    <div class="container">
      <div class="center contact-head" v-reveal>
        <h2>Bereit für klare Sicht?</h2>
        <p class="center">Kurze Angaben zu Gebäude und Wunschtermin genügen, wir melden uns mit einem Vorschlag.</p>
      </div>

      <div class="contact-grid">
        <form class="contact-form" @submit.prevent="submitForm">
          <div class="form-row">
            <div class="field">
              <label for="cf-name">Name</label>
              <input id="cf-name" v-model="form.name" type="text" required autocomplete="name" />
            </div>
            <div class="field">
              <label for="cf-phone">Telefon (optional)</label>
              <input id="cf-phone" v-model="form.phone" type="tel" autocomplete="tel" />
            </div>
          </div>

          <div class="field">
            <label for="cf-email">E-Mail</label>
            <input id="cf-email" v-model="form.email" type="email" required autocomplete="email" />
          </div>

          <div class="form-row form-row-street">
            <div class="field">
              <label for="cf-street">Straße</label>
              <input id="cf-street" v-model="form.street" type="text" required autocomplete="address-line1" />
            </div>
            <div class="field">
              <label for="cf-house-number">Nr.</label>
              <input
                id="cf-house-number"
                v-model="form.houseNumber"
                type="text"
                required
                autocomplete="address-line2"
              />
            </div>
          </div>

          <div class="form-row form-row-zip">
            <div class="field">
              <label for="cf-zip">PLZ</label>
              <input
                id="cf-zip"
                v-model="form.zip"
                type="text"
                required
                inputmode="numeric"
                pattern="[0-9]{5}"
                maxlength="5"
                autocomplete="postal-code"
                @input="lookupCity"
              />
            </div>
            <div class="field">
              <label for="cf-city">Ort</label>
              <input
                id="cf-city"
                v-model="form.city"
                type="text"
                required
                autocomplete="address-level2"
                @input="onCityInput"
              />
            </div>
          </div>

          <div class="field">
            <label for="cf-message">Nachricht</label>
            <textarea
              id="cf-message"
              v-model="form.message"
              required
              placeholder="Gebäude, Fenster und gewünschter Zeitraum"
            ></textarea>
          </div>

          <input
            v-model="form.honeypot"
            type="text"
            name="honeypot"
            class="visually-hidden"
            tabindex="-1"
            autocomplete="off"
            aria-hidden="true"
          />

          <label class="field-checkbox">
            <input v-model="form.privacyAccepted" type="checkbox" required />
            <span>
              Ich habe die
              <router-link :to="{ path: '/datenschutz' }" target="_blank" rel="noopener noreferrer"
                >Datenschutzerklärung</router-link
              >
              zur Kenntnis genommen und bin mit der Verarbeitung meiner Daten zur Bearbeitung meiner
              Anfrage einverstanden.
            </span>
          </label>

          <button type="submit" class="btn btn-primary" :disabled="status === 'sending'">
            {{ status === "sending" ? "Wird gesendet…" : "Termin anfragen" }}
          </button>

          <p v-if="status === 'success'" class="form-status form-status-success">
            Danke, wir melden uns in der Regel innerhalb von 24h.
          </p>
          <p v-if="status === 'error'" class="form-status form-status-error">
            Das hat leider nicht geklappt. Schreibt uns gern direkt an info@ln-fensterputz.de.
          </p>
        </form>

        <div class="contact-direct" v-reveal="{ delay: 160 }">
          <p class="contact-direct-lead">Lieber direkt schreiben?</p>
          <ul class="contact-list">
            <li>
              <EnvelopeSimple :size="19" weight="regular" aria-hidden="true" />
              <a href="mailto:info@ln-fensterputz.de">info@ln-fensterputz.de</a>
            </li>
            <li>
              <InstagramLogo :size="19" weight="regular" aria-hidden="true" />
              <a href="https://www.instagram.com/ln.fensterputz/" target="_blank" rel="noopener noreferrer"
                >@ln.fensterputz<span class="visually-hidden"> (öffnet in neuem Tab)</span></a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact {
  padding-block: 96px 120px;
}

.contact-head h2 {
  font-size: clamp(2.1rem, 4.4vw, 3rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.12;
}

.contact-head p {
  margin-top: 16px;
  font-size: 1.05rem;
  line-height: 1.6;
  color: var(--ink-soft);
  max-width: 44ch;
  margin-inline: auto;
}

.contact-grid {
  margin-top: 56px;
  display: grid;
  gap: 24px;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 22px;
  background: var(--paper-sunken);
  border: 1px solid var(--line);
}

.form-row {
  display: grid;
  gap: 18px;
  grid-template-columns: 1fr;
}

.field-checkbox {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 0.88rem;
  line-height: 1.5;
  color: var(--ink-soft);
}

.field-checkbox input {
  margin-top: 3px;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  accent-color: var(--ink);
}

.field-checkbox a {
  color: var(--ink);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.contact-form .btn {
  align-self: stretch;
  text-align: center;
}

.contact-direct {
  position: relative;
  padding: 36px;
  background: var(--navy-mid);
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;
}

.contact-direct-lead {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.2rem;
  letter-spacing: -0.01em;
}

.contact-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.contact-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1rem;
}

.contact-list svg {
  flex-shrink: 0;
  color: #cfe3f2;
}

.contact-list a:hover {
  text-decoration: underline;
}

@media (min-width: 480px) {
  .form-row.form-row-street {
    grid-template-columns: 2.2fr 1fr;
  }

  .form-row.form-row-zip {
    grid-template-columns: 1fr 1.8fr;
  }

  .contact-form .btn {
    align-self: flex-start;
  }
}

@media (min-width: 640px) {
  .form-row {
    grid-template-columns: 1fr 1fr;
  }

  .contact-form {
    padding: 36px;
  }
}

@media (min-width: 900px) {
  .contact-grid {
    grid-template-columns: 1.3fr 1fr;
    align-items: start;
  }
}
</style>
