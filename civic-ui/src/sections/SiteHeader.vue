<script setup>
// The full header pattern: utility TopBar + main Navbar stacked together,
// a common pattern for institutional sites. Use Navbar directly
// instead if a project doesn't need the utility strip.
import TopBar from './TopBar.vue'
import Navbar from '../components/navigation/Navbar.vue'

defineProps({
  utilityLinks: { type: Array, default: () => [] }
})
</script>

<template>
  <div class="cui-site-header">
    <TopBar :links="utilityLinks">
      <slot name="utility" />
    </TopBar>
    <Navbar>
      <template #brand><slot name="brand" /></template>
      <template #links><slot name="links" /></template>
      <template #actions><slot name="actions" /></template>
    </Navbar>
  </div>
</template>
