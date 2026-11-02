<script setup>
import { ref, computed, onMounted } from 'vue'
import { getRepos, parseRepoName, OTHER_TECH } from '../data/portfolio.js'
import SectionToggle from './SectionToggle.vue'

const ALL = 'All'

const repos = ref([])
const error = ref(null)
const loading = ref(true)
const activeTech = ref(ALL)

// Most-used techs first, "Other" always last
const techFilters = computed(() => {
  const counts = {}
  for (const repo of repos.value) {
    counts[repo.tech] = (counts[repo.tech] || 0) + 1
  }
  const techs = Object.keys(counts).sort((a, b) => {
    if (a === OTHER_TECH) return 1
    if (b === OTHER_TECH) return -1
    return counts[b] - counts[a] || a.localeCompare(b)
  })
  return [
    { tech: ALL, count: repos.value.length },
    ...techs.map(tech => ({ tech, count: counts[tech] }))
  ]
})

const visibleRepos = computed(() =>
  activeTech.value === ALL
    ? repos.value
    : repos.value.filter(repo => repo.tech === activeTech.value)
)

onMounted(() => {
  getRepos()
    .then(data => {
      repos.value = data
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        .map(repo => ({ ...repo, ...parseRepoName(repo.name) }))
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
      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="n in 6"
          :key="n"
          class="min-h-40 bg-card border border-border rounded-xl p-5 animate-pulse"
        >
          <div class="h-4 bg-border/80 rounded w-2/3 mb-2"></div>
          <div class="h-3 bg-border/50 rounded w-full mb-1.5"></div>
          <div class="h-3 bg-border/50 rounded w-1/3"></div>
        </div>
      </div>

      <div v-else-if="error" class="bg-card border border-border rounded-lg p-4 shadow-sm font-sans">
        <p class="font-semibold text-navy">An error occurred, please reload the page.</p>
        <p class="text-sm text-muted mt-2 border-t border-border pt-2">{{ error }}</p>
      </div>

      <div v-else>
        <div class="flex flex-wrap gap-2 mb-4 font-sans" role="group" aria-label="Filter repositories by technology">
          <button
            v-for="filter in techFilters"
            :key="filter.tech"
            type="button"
            :aria-pressed="activeTech === filter.tech"
            class="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
            :class="activeTech === filter.tech
              ? 'bg-teal border-teal text-card'
              : 'bg-card border-border text-navy hover:border-teal/50'"
            @click="activeTech = filter.tech"
          >
            {{ filter.tech }}
            <span class="text-xs" :class="activeTech === filter.tech ? 'opacity-80' : 'text-muted'">{{ filter.count }}</span>
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            v-for="repo in visibleRepos"
            :key="repo.id"
            :href="repo.html_url"
            target="_blank"
            rel="noopener noreferrer"
            class="min-h-40 bg-card border border-border rounded-xl p-5 shadow-sm font-sans flex flex-col justify-between transition-[border-color,box-shadow] hover:border-teal/50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
          >
            <div>
              <p class="text-lg font-semibold leading-snug text-navy break-words">{{ repo.title }}</p>
              <p v-if="repo.description" class="text-sm text-muted mt-2 leading-relaxed line-clamp-3">{{ repo.description }}</p>
            </div>
            <div class="flex items-center gap-4 mt-3 pt-2 border-t border-border text-xs text-muted">
              <span class="inline-flex items-center rounded-full bg-teal-light px-2.5 py-1 text-xs font-medium text-teal">
                {{ repo.tech }}
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
    </div>
  </SectionToggle>
</template>
