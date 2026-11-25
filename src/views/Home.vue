<script setup>
import HeroSection from "../components/sections/HeroSection.vue";
import ServicesSection from "../components/sections/ServicesSection.vue";
import AnnualOfferSection from "../components/sections/AnnualOfferSection.vue";
import AreaSection from "../components/sections/AreaSection.vue";
import ContactSection from "../components/sections/ContactSection.vue";

// city: set by the city routes in src/router.js, empty on the homepage
defineProps({ city: { type: String, default: "" } });
</script>

<template>
  <main id="main-content" tabindex="-1">
    <HeroSection :city="city" />
    <ServicesSection />
    <AnnualOfferSection />
    <AreaSection />
    <ContactSection />
  </main>
</template>
