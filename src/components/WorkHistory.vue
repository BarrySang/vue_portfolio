<script setup>
import { computed, ref, watch } from 'vue'
import { getWorkExperience } from '../data/portfolio.js'
import SectionToggle from './SectionToggle.vue'

const workData = getWorkExperience()
const selectedTrack = ref('all')
const selectedIndex = ref(0)
const expandedEntries = ref({})

const trackOptions = [
  { label: 'All Tracks', value: 'all' },
  { label: 'Mechanical / Tech', value: 'mechanical' },
  { label: 'Software / IT', value: 'software' }
]

const filteredWork = computed(() => {
  if (selectedTrack.value === 'all') {
    return workData
  }

  return workData.filter(item => item.track === selectedTrack.value)
})

const activeItem = computed(() => {
  if (!filteredWork.value.length) return null
  return filteredWork.value[selectedIndex.value] || filteredWork.value[0]
})

watch(selectedTrack, () => {
  selectedIndex.value = 0
})

function toggleDetails(index) {
  expandedEntries.value[index] = !expandedEntries.value[index]
}

function selectEntry(index) {
  selectedIndex.value = index
}
</script>

<template>
  <SectionToggle title="Work History">
    <div class="rounded-2xl border border-white/10 bg-[rgba(11,27,38,0.7)] p-3 shadow-[0_10px_30px_rgba(2,6,23,0.35)] backdrop-blur-sm">
      <div class="grid grid-cols-1 gap-2 rounded-2xl border border-white/10 bg-white/[0.02] p-2 sm:grid-cols-3">
        <button
          v-for="option in trackOptions"
          :key="option.value"
          type="button"
          class="rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all duration-200"
          :class="selectedTrack === option.value
            ? 'bg-[linear-gradient(135deg,#0284c7_0%,#06b6d4_50%,#14b8a6_100%)] text-slate-950 shadow-[0_0_0_1px_rgba(255,255,255,0.15)]'
            : 'text-slate-200/80 hover:bg-white/[0.03] hover:text-white'"
          @click="selectedTrack = option.value"
        >
          <span class="flex items-center gap-2">
            <span v-if="option.value === 'all'" class="text-base">✦</span>
            <span v-else-if="option.value === 'mechanical'" class="text-base">⚙</span>
            <span v-else class="text-base">&lt;/&gt;</span>
            {{ option.label }}
          </span>
        </button>
      </div>

      <div v-if="filteredWork.length" class="mt-5 grid gap-4 sm:grid-cols-2">
        <button
          v-for="(item, index) in filteredWork"
          :key="`${item.organization}-${item.position}`"
          type="button"
          class="group rounded-2xl border p-4 text-left transition-all duration-200"
          :class="selectedIndex === index
            ? 'border-[#fbbf24] bg-[linear-gradient(135deg,rgba(146,91,21,0.45),rgba(24,27,32,0.6))] shadow-[0_0_0_1px_rgba(251,191,36,0.38)]'
            : 'border-white/10 bg-white/[0.01] hover:border-cyan-400/40 hover:bg-white/[0.02]'"
          @click="selectEntry(index)"
        >
          <div class="flex items-center justify-between gap-3">
            <span class="text-2xl font-bold text-slate-50">{{ item.year }}</span>
            <span
              class="h-3 w-3 rounded-full"
              :class="selectedIndex === index ? 'bg-[#fbbf24] shadow-[0_0_15px_rgba(251,191,36,0.75)]' : 'bg-slate-500/60'"
            />
          </div>

          <h3 class="mt-6 text-xl font-bold leading-snug text-slate-100">
            {{ item.position }}
          </h3>
          <p class="mt-1 text-sm text-slate-300">{{ item.organization }}</p>
          <span class="mt-6 inline-flex items-center text-sm font-semibold text-[#fbbf24] group-hover:text-[#fcd34d]">
            View details <span class="ml-1">→</span>
          </span>
        </button>
      </div>

      <div v-if="activeItem" class="mt-6 rounded-2xl border border-white/10 bg-[rgba(8,24,36,0.82)] p-5 sm:p-6">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <span class="inline-flex items-center rounded-full border border-[#fbbf24]/60 bg-[#fbbf24]/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-[#fbbf24]">
            {{ activeItem.track === 'mechanical' ? 'Mechanical & Technical Role' : 'Software / IT Role' }}
          </span>
          <button
            v-if="activeItem.duration"
            type="button"
            class="inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-sm text-slate-300"
          >
            <span class="text-base">🗓</span>
            {{ activeItem.duration }}
          </button>
        </div>

        <h3 class="mt-5 text-3xl font-black leading-tight text-white sm:text-4xl">
          <span class="bg-[linear-gradient(90deg,#f8fafc_0%,#dbeafe_35%,#67e8f9_100%)] bg-clip-text text-transparent">
            {{ activeItem.position }}
          </span>
        </h3>

        <p class="mt-3 text-xl font-semibold text-cyan-300">{{ activeItem.organization }}</p>

        <button
          type="button"
          class="mt-5 inline-flex items-center justify-center rounded-full border border-cyan-300/30 bg-transparent px-4 py-2 text-sm font-semibold text-cyan-200 transition-colors hover:border-cyan-300/50 hover:bg-cyan-300/5"
          :aria-expanded="Boolean(expandedEntries[selectedIndex])"
          :aria-controls="`work-details-${selectedIndex}`"
          @click="toggleDetails(selectedIndex)"
        >
          {{ expandedEntries[selectedIndex] ? 'Hide responsibilities & skills' : 'View responsibilities & skills' }}
        </button>

        <div
          v-if="expandedEntries[selectedIndex]"
          :id="`work-details-${selectedIndex}`"
          class="mt-5 space-y-6 border-t border-white/10 pt-5"
        >
          <div>
            <h4 class="text-xs font-black uppercase tracking-[0.18em] text-slate-300">Key responsibilities</h4>
            <ul class="mt-3 space-y-3 pl-5 text-base leading-relaxed text-slate-200">
              <li v-for="responsibility in activeItem.responsibilities" :key="responsibility" class="list-disc marker:text-cyan-300">
                {{ responsibility }}
              </li>
            </ul>
          </div>

          <div>
            <h4 class="text-xs font-black uppercase tracking-[0.18em] text-slate-300">Tools & skills utilized</h4>
            <div class="mt-3 flex flex-wrap gap-3">
              <span
                v-for="skill in activeItem.skills"
                :key="skill"
                class="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm font-medium text-slate-200"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </SectionToggle>
</template>
