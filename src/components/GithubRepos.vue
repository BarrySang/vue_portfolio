<script setup>
import { ref, onMounted } from 'vue'
import { getRepos } from '../data/portfolio.js'
import SectionToggle from './SectionToggle.vue'

const repos = ref([])
const error = ref(null)
const loading = ref(true)

onMounted(() => {
  getRepos()
    .then(data => {
      repos.value = data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    })
    .catch(err => {
      error.value = err.message || String(err)
    })
    .finally(() => {
      loading.value = false
    })
})
</script>

<template>
  <SectionToggle title="Github Repositories">
    <div>
      <div v-if="loading" class="flex flex-col gap-3">
        <div
          v-for="n in 5"
          :key="n"
          class="bg-card rounded-lg p-4 animate-pulse"
        >
          <div class="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
          <div class="h-3 bg-gray-200 rounded w-full mb-1.5"></div>
          <div class="h-3 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>

      <div v-else-if="error" class="bg-card rounded-lg p-4 shadow-sm font-sans">
        <p class="font-semibold text-gray-900">An error occurred, please reload the page.</p>
        <p class="text-sm text-muted mt-2 border-t pt-2">{{ error }}</p>
      </div>

      <div v-else class="flex flex-col gap-3">
        <a
          v-for="repo in repos"
          :key="repo.id"
          :href="repo.html_url"
          target="_blank"
          class="bg-card rounded-lg p-4 shadow-sm font-sans block hover:shadow transition-shadow"
        >
          <p class="font-semibold text-gray-900">{{ repo.name }}</p>
          <p v-if="repo.description" class="text-sm text-gray-700 mt-1">{{ repo.description }}</p>
          <div class="flex items-center gap-4 mt-2 text-xs text-muted">
            <span v-if="repo.language" class="flex items-center gap-1">
              <span class="w-2.5 h-2.5 rounded-full bg-accent inline-block"></span>
              {{ repo.language }}
            </span>
            <span v-if="repo.stargazers_count > 0" class="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
              </svg>
              {{ repo.stargazers_count }}
            </span>
          </div>
        </a>
      </div>
    </div>
  </SectionToggle>
</template>
