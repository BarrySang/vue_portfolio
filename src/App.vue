<script setup>
import { ref } from 'vue'
import HeroSection from './components/HeroSection.vue'
import ProfileHeader from './components/ProfileHeader.vue'
import GithubRepos from './components/GithubRepos.vue'
import WorkHistory from './components/WorkHistory.vue'
import AcademicHistory from './components/AcademicHistory.vue'
import AppFooter from './components/AppFooter.vue'

const isDarkMode = ref(document.documentElement.classList.contains('dark'))

function toggleTheme() {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('dark', isDarkMode.value)
  localStorage.setItem('portfolio-theme', isDarkMode.value ? 'dark' : 'light')
}
</script>

<template>
  <div class="max-w-6xl mx-auto px-3 sm:px-6">
    <div class="flex justify-end pt-4">
      <button
        type="button"
        :aria-pressed="isDarkMode"
        @click="toggleTheme"
        class="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-navy transition-colors hover:bg-navy-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      >
        <svg
          v-if="isDarkMode"
          aria-hidden="true"
          class="h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <circle cx="12" cy="12" r="4" />
          <path stroke-linecap="round" d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
        </svg>
        <svg
          v-else
          aria-hidden="true"
          class="h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M20.5 15.5A8.5 8.5 0 0 1 8.5 3.5 8.5 8.5 0 1 0 20.5 15.5Z" />
        </svg>
        {{ isDarkMode ? 'Use light theme' : 'Use dark theme' }}
      </button>
    </div>

    <HeroSection />

    <div class="h-px bg-gradient-to-r from-transparent via-teal/40 to-transparent my-6"></div>

    <section class="flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,320px)_1fr] lg:items-start">
      <div class="lg:sticky lg:top-6">
        <ProfileHeader />
      </div>

      <div class="flex min-w-0 flex-col gap-6">
        <WorkHistory />

        <AcademicHistory />

        <div class="h-px bg-gradient-to-r from-transparent via-teal/40 to-transparent"></div>

        <div id="github-repos">
          <GithubRepos />
        </div>
      </div>
    </section>

    <AppFooter />
  </div>
</template>
