<script setup>
import { ref, computed, onMounted } from 'vue'
import { getRepos, parseRepoName, OTHER_TECH } from '../data/portfolio.js'
import { ACCENTS } from '../theme/accents.js'
import SectionToggle from './SectionToggle.vue'

const ALL = 'All'

// Closest of the three accents to each tech's own brand colour
const TECH_ACCENTS = {
  React: ACCENTS.cyan,
  Python: ACCENTS.cyan,
  PHP: ACCENTS.cyan,
  Vue: ACCENTS.teal,
  Svelte: ACCENTS.amber,
  JavaScript: ACCENTS.amber
}

const repos = ref([])
const error = ref(null)
const loading = ref(true)
const activeTech = ref(ALL)

function accentFor(tech) {
  return TECH_ACCENTS[tech] ?? ACCENTS.neutral
}

const relativeTime = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
const TIME_UNITS = [
  ['year', 365 * 24 * 3600],
  ['month', 30 * 24 * 3600],
  ['week', 7 * 24 * 3600],
  ['day', 24 * 3600],
  ['hour', 3600],
  ['minute', 60]
]

// "2026-08-01T..." -> "3 months ago"
function timeAgo(date) {
  const seconds = (new Date(date) - Date.now()) / 1000
  for (const [unit, size] of TIME_UNITS) {
    if (Math.abs(seconds) >= size) {
      return relativeTime.format(Math.round(seconds / size), unit)
    }
  }
  return 'just now'
}

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
    { tech: ALL, count: repos.value.length, accent: null },
    ...techs.map(tech => ({ tech, count: counts[tech], accent: accentFor(tech) }))
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
        .map(repo => {
          const parsed = parseRepoName(repo.name)
          return { ...repo, ...parsed, accent: accentFor(parsed.tech) }
        })
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
  <SectionToggle
    title="Github Repositories"
    subtitle="Side projects, filtered by the stack they're built with."
  >
    <template #icon>
      <svg
        class="h-7 w-7 text-cyan-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="6" cy="5" r="2.5" />
        <circle cx="6" cy="19" r="2.5" />
        <circle cx="18" cy="7" r="2.5" />
        <path d="M6 7.5v9M18 9.5a6 6 0 0 1-6 6H6" />
      </svg>
    </template>

    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="n in 6"
        :key="n"
        class="min-h-40 bg-card border border-border rounded-2xl p-5 animate-pulse"
      >
        <div class="h-4 bg-border/80 rounded w-2/3 mb-2"></div>
        <div class="h-3 bg-border/50 rounded w-full mb-1.5"></div>
        <div class="h-3 bg-border/50 rounded w-1/3"></div>
      </div>
    </div>

    <div v-else-if="error" class="bg-card border border-border rounded-2xl p-4">
      <p class="font-semibold text-navy">An error occurred, please reload the page.</p>
      <p class="text-sm text-muted mt-2 border-t border-border pt-2">{{ error }}</p>
    </div>

    <div v-else>
      <div class="flex flex-wrap gap-2 mb-5" role="group" aria-label="Filter repositories by technology">
        <button
          v-for="filter in techFilters"
          :key="filter.tech"
          type="button"
          :aria-pressed="activeTech === filter.tech"
          class="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          :class="activeTech === filter.tech
            ? (filter.accent ? filter.accent.badge : 'border-transparent bg-navy-light text-navy')
            : 'border-border bg-card text-muted hover:text-navy'"
          @click="activeTech = filter.tech"
        >
          <span
            v-if="filter.accent"
            aria-hidden="true"
            class="h-2 w-2 rounded-full"
            :class="filter.accent.dot"
          ></span>
          {{ filter.tech }}
          <span class="text-xs opacity-70">{{ filter.count }}</span>
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <a
          v-for="repo in visibleRepos"
          :key="repo.id"
          :href="repo.html_url"
          target="_blank"
          rel="noopener noreferrer"
          class="group relative min-h-40 overflow-hidden rounded-2xl border border-border bg-card p-5 flex flex-col justify-between transition-[border-color,box-shadow,transform] duration-300 motion-safe:hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          :class="repo.accent.hover"
        >
          <span aria-hidden="true" class="absolute inset-x-0 top-0 h-1" :class="repo.accent.dot"></span>
          <div>
            <div class="flex items-center justify-between gap-3">
              <span
                class="rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider"
                :class="repo.accent.badge"
              >
                {{ repo.tech }}
              </span>
              <span v-if="repo.stargazers_count > 0" class="flex items-center gap-1 text-xs text-muted">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
                {{ repo.stargazers_count }}
              </span>
            </div>
            <h3 class="mt-3 text-lg font-bold leading-snug text-navy break-words">{{ repo.title }}</h3>
            <p v-if="repo.description" class="text-sm text-muted mt-2 leading-relaxed line-clamp-3">{{ repo.description }}</p>
          </div>
          <div class="flex items-center justify-between gap-3 mt-4 pt-3 border-t border-border text-xs text-muted">
            <span class="whitespace-nowrap">Updated {{ timeAgo(repo.updated_at) }}</span>
            <span class="inline-flex items-center gap-1 whitespace-nowrap font-medium transition-colors group-hover:text-navy">
              GitHub
              <svg
                aria-hidden="true"
                class="h-3.5 w-3.5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M7 17 17 7M8 7h9v9" />
              </svg>
            </span>
          </div>
        </a>
      </div>
    </div>
  </SectionToggle>
</template>
