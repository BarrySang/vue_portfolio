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
  <div class="sm:h-[500px]">
    <div
      class="rounded m-[5px] bg-[rgb(238,231,231)] p-2.5 text-black font-sans grid grid-cols-[0.1fr_0.9fr] cursor-pointer sm:block sm:cursor-default"
      @click="toggle"
    >
      <div>
        <svg
          class="block mt-5 sm:hidden transition-transform duration-300"
          :class="{ 'rotate-90': isOpen }"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm5.5 10a.5.5 0 0 0 .832.374l4.5-4a.5.5 0 0 0 0-.748l-4.5-4A.5.5 0 0 0 5.5 4z"
          />
        </svg>
      </div>
      <h1 class="font-light sm:font-normal">{{ title }}</h1>
    </div>
    <div class="sm:block" :class="{ 'hidden': !isOpen }">
      <slot />
    </div>
  </div>
</template>
