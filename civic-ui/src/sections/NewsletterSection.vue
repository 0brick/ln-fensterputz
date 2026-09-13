<script setup>
// Subscribe block for a newsletter footer callout.
// Emits `submit` with the entered email — hook it up to whatever backend
// the consuming project uses.
import { ref } from 'vue'
import TextInput from '../components/forms/TextInput.vue'
import AppButton from '../components/button/AppButton.vue'

defineProps({
  title: { type: String, default: 'Newsletter' },
  text: { type: String, default: '' }
})
const emit = defineEmits(['submit'])

const email = ref('')
function onSubmit() {
  emit('submit', email.value)
}
</script>

<template>
  <section class="cui-section cui-section--subtle">
    <div class="cui-container cui-newsletter">
      <div class="cui-newsletter__copy">
        <h2>{{ title }}</h2>
        <p v-if="text">{{ text }}</p>
      </div>
      <form class="cui-newsletter__form" @submit.prevent="onSubmit">
        <TextInput v-model="email" type="email" placeholder="you@example.com" label="Email address" required />
        <AppButton type="submit" variant="primary">Subscribe</AppButton>
      </form>
    </div>
  </section>
</template>

<style scoped>
.cui-newsletter {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--cui-space-5);
}

.cui-newsletter__copy {
  max-width: 420px;
}

.cui-newsletter__form {
  display: flex;
  align-items: flex-end;
  gap: var(--cui-space-3);
  flex-wrap: wrap;
}

.cui-newsletter__form :deep(.cui-field) {
  min-width: 260px;
}
</style>
