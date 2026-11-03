<script setup>
import { ref, useId } from 'vue'

defineProps({
  title: String,
  subtitle: String
})

const headingId = useId()
const contentId = useId()
const isOpen = ref(false)

// Collapsing only applies on mobile; from `sm` up the content is always shown
function toggle() {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <section class="font-sans" :aria-labelledby="headingId">
    <div class="flex items-center gap-3 cursor-pointer sm:cursor-default" @click="toggle">
      <span class="shrink-0" aria-hidden="true">
        <slot name="icon" />
      </span>
      <h2 :id="headingId" class="min-w-0 flex-1 text-2xl font-bold tracking-tight text-navy sm:text-3xl">
        {{ title }}
      </h2>
      <button
        type="button"
        class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-colors hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal sm:hidden"
        :aria-expanded="isOpen"
        :aria-controls="contentId"
        :aria-label="`${isOpen ? 'Hide' : 'Show'} ${title}`"
      >
        <svg
          class="h-4 w-4 transition-transform duration-300 motion-reduce:transition-none"
          :class="{ 'rotate-90': isOpen }"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
    <p v-if="subtitle" class="mt-2 text-muted">{{ subtitle }}</p>
    <div
      :id="contentId"
      class="mt-5 rounded-3xl border border-border bg-card/60 p-4 sm:block sm:p-6"
      :class="{ 'hidden': !isOpen }"
    >
      <slot />
    </div>
  </section>
</template>
