<script setup>
// Simple slide-based carousel (one slide visible at a time, scroll-snap
// under the hood so touch swiping works for free). Each slide is whatever
// markup you put in the default slot's <template #slide> — see docs.
import { ref, computed } from 'vue'

const props = defineProps({
  slideCount: { type: Number, required: true },
  autoplay: { type: Boolean, default: false },
  interval: { type: Number, default: 6000 }
})

const active = ref(0)
const track = ref(null)

function goTo(index) {
  active.value = (index + props.slideCount) % props.slideCount
  track.value?.children[active.value]?.scrollIntoView({ behavior: 'smooth', inline: 'start' })
}

let timer = null
if (props.autoplay) {
  timer = setInterval(() => goTo(active.value + 1), props.interval)
}

const dots = computed(() => Array.from({ length: props.slideCount }, (_, i) => i))
</script>

<template>
  <div class="cui-carousel">
    <div class="cui-carousel__viewport">
      <div ref="track" class="cui-carousel__track">
        <slot />
      </div>
    </div>

    <button type="button" class="cui-carousel__nav cui-carousel__nav--prev" aria-label="Previous slide" @click="goTo(active - 1)">‹</button>
    <button type="button" class="cui-carousel__nav cui-carousel__nav--next" aria-label="Next slide" @click="goTo(active + 1)">›</button>

    <div class="cui-carousel__dots" role="tablist">
      <button
        v-for="d in dots"
        :key="d"
        type="button"
        class="cui-carousel__dot"
        :class="{ 'cui-carousel__dot--active': d === active }"
        :aria-label="`Go to slide ${d + 1}`"
        role="tab"
        :aria-selected="d === active"
        @click="goTo(d)"
      />
    </div>
  </div>
</template>

<style scoped>
.cui-carousel {
  position: relative;
}

.cui-carousel__viewport {
  overflow: hidden;
}

.cui-carousel__track {
  display: flex;
  gap: var(--cui-space-4);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}
.cui-carousel__track::-webkit-scrollbar {
  display: none;
}

.cui-carousel__track :deep(> *) {
  flex: 0 0 100%;
  scroll-snap-align: start;
}

.cui-carousel__nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 4.4rem;
  height: 4.4rem;
  border-radius: 50%;
  border: none;
  background: var(--cui-color-white);
  box-shadow: var(--cui-shadow-md);
  font-size: 2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cui-carousel__nav--prev {
  left: -1.4rem;
}
.cui-carousel__nav--next {
  right: -1.4rem;
}

.cui-carousel__dots {
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  margin-top: var(--cui-space-4);
}

.cui-carousel__dot {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  border: none;
  background: var(--cui-border);
  cursor: pointer;
  padding: 0;
}
.cui-carousel__dot--active {
  background: var(--cui-color-navy);
}
</style>
