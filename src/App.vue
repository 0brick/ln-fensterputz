<script setup>
import AppNav from "./components/AppNav.vue";
import AppFooter from "./components/AppFooter.vue";

function skipToContent() {
  const main = document.getElementById("main-content");
  if (!main) return;
  main.focus();
  main.scrollIntoView({ behavior: "smooth", block: "start" });
}
</script>

<template>
  <a href="#main-content" class="skip-link" @click.prevent="skipToContent">Zum Inhalt springen</a>
  <AppNav />
  <router-view />
  <AppFooter />
</template>
