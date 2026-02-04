<script setup>
import { ref } from 'vue'

defineProps({
  title: String
})

const isOpen = ref(false)

function toggle() {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div>
    <div
      class="rounded-lg bg-accent/60 p-3 text-black font-sans flex items-center gap-2 cursor-pointer sm:cursor-default"
      @click="toggle"
    >
      <svg
        class="w-5 h-5 shrink-0 sm:hidden transition-transform duration-300"
        :class="{ 'rotate-90': isOpen }"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
      </svg>
      <h2 class="text-lg font-semibold">{{ title }}</h2>
    </div>
    <div class="mt-3 sm:block" :class="{ 'hidden': !isOpen }">
      <slot />
    </div>
  </div>
</template>
