<script setup>
import { ref } from "vue";

const open = ref(false);

const links = [
  { label: "Leistungen", hash: "#leistungen" },
  { label: "Einsatzgebiet", hash: "#einsatzgebiet" },
  { label: "Kontakt", hash: "#kontakt" },
];

function closeMenu() {
  open.value = false;
}
</script>

<template>
  <header class="nav">
    <div class="container nav-row">
      <router-link to="/" class="brand" @click="closeMenu">
        <span>LN Fensterputz</span>
      </router-link>

      <nav class="links" aria-label="Hauptnavigation">
        <router-link
          v-for="link in links"
          :key="link.hash"
          :to="{ path: '/', hash: link.hash }"
          >{{ link.label }}</router-link
        >
      </nav>


      <button
        class="burger"
        :aria-expanded="open"
        :aria-label="open ? 'Menü schließen' : 'Menü öffnen'"
        aria-controls="mobile-menu"
        @click="open = !open"
      >
        <span></span><span></span>
      </button>
    </div>

    <transition name="drop">
      <nav v-if="open" id="mobile-menu" class="mobile-menu" aria-label="Mobile Navigation">
        <router-link
          v-for="link in links"
          :key="link.hash"
          :to="{ path: '/', hash: link.hash }"
          @click="closeMenu"
          >{{ link.label }}</router-link
        >
        <router-link :to="{ path: '/', hash: '#kontakt' }" class="btn btn-primary" @click="closeMenu">
          Termin anfragen
        </router-link>
      </nav>
    </transition>
  </header>
</template>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 40;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: saturate(160%) blur(10px);
  -webkit-backdrop-filter: saturate(160%) blur(10px);
  border-bottom: 1px solid var(--line);
}

.nav-row {
  height: var(--nav-height);
  display: flex;
  align-items: center;
  gap: 28px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.06rem;
  letter-spacing: -0.01em;
  color: var(--ink);
  margin-right: auto;
}

.links {
  display: none;
  align-items: center;
  gap: 32px;
  font-size: 0.86rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: var(--ink-soft);
}

.links a {
  position: relative;
  padding-block: 4px;
  transition: color 0.2s var(--ease-out);
}

.links a::after {
  content: "";
  position: absolute;
  left: 0;
  right: 100%;
  bottom: 0;
  height: 2px;
  background: var(--accent);
  transition: right 0.25s var(--ease-out);
}

.links a:hover {
  color: var(--ink);
}

.links a:hover::after {
  right: 0;
}

.nav-cta {
  display: none;
  padding: 11px 22px;
  font-size: 0.86rem;
}

.burger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  margin-left: auto;
}

.burger span {
  display: block;
  height: 2px;
  background: var(--ink);
}

.mobile-menu {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px 24px 20px;
  background: var(--paper);
  border-bottom: 1px solid var(--line);
}

.mobile-menu a {
  padding: 13px 2px;
  font-size: 1rem;
  font-weight: 600;
  border-bottom: 1px solid var(--line);
}

.mobile-menu .btn {
  margin-top: 14px;
  align-self: flex-start;
}

.drop-enter-active,
.drop-leave-active {
  transition: opacity 0.2s var(--ease-out), transform 0.2s var(--ease-out);
}

.drop-enter-from,
.drop-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (min-width: 900px) {
  .links {
    display: flex;
  }
  .nav-cta {
    display: inline-flex;
  }
  .burger {
    display: none;
  }
}
</style>
