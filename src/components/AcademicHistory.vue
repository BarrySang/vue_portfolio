<script setup>
import { getAcademicData } from '../data/portfolio.js'
import { ACCENTS } from '../theme/accents.js'
import SectionToggle from './SectionToggle.vue'

// Same colour meaning as the career timeline
const TRACK_ACCENTS = {
  mechanical: ACCENTS.amber,
  software: ACCENTS.cyan
}

const academicData = getAcademicData().map(item => ({
  ...item,
  accent: TRACK_ACCENTS[item.track] ?? ACCENTS.teal
}))
</script>

<template>
  <SectionToggle
    title="Academic Qualifications"
    subtitle="The degree and certification behind the hands-on work."
  >
    <template #icon>
      <svg
        class="h-7 w-7 text-teal"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M22 9 12 4 2 9l10 5 10-5Z" />
        <path d="M6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5M22 9v6" />
      </svg>
    </template>

    <ol class="relative" aria-label="Academic qualifications, most recent first">
      <li
        v-for="(item, index) in academicData"
        :key="item.course"
        class="relative pl-8"
        :class="{ 'pb-5': index < academicData.length - 1 }"
      >
        <span
          v-if="index < academicData.length - 1"
          aria-hidden="true"
          class="absolute left-[7px] top-9 bottom-0 w-px bg-border sm:top-10"
        ></span>
        <span
          aria-hidden="true"
          class="absolute left-0.5 top-6 h-3 w-3 rounded-full ring-4 ring-card sm:top-7"
          :class="item.accent.dot"
        ></span>

        <div
          class="rounded-2xl border border-border bg-card p-4 transition-[border-color,box-shadow] duration-300 sm:p-5"
          :class="item.accent.hover"
        >
          <div class="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span
              v-if="item.type"
              class="rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider"
              :class="item.accent.badge"
            >
              {{ item.type }}
            </span>
            <span class="inline-flex items-center gap-1.5 text-sm text-muted">
              <svg
                aria-hidden="true"
                class="h-4 w-4 shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M3 10h18M8 3v4m8-4v4" />
              </svg>
              {{ item.duration }}
            </span>
          </div>

          <h3 class="mt-3 text-lg font-bold leading-snug text-navy sm:text-xl">{{ item.course }}</h3>
          <p class="mt-1 font-semibold" :class="item.accent.text">{{ item.school }}</p>

          <div v-if="item.coursework?.length" class="mt-4">
            <h4 class="text-xs font-bold uppercase tracking-widest text-muted">Relevant coursework</h4>
            <ul class="mt-2 flex flex-wrap gap-2">
              <li
                v-for="subject in item.coursework"
                :key="subject"
                class="rounded-lg border border-border bg-surface/60 px-3 py-1.5 text-sm text-navy"
              >
                {{ subject }}
              </li>
            </ul>
          </div>
        </div>
      </li>
    </ol>
  </SectionToggle>
</template>
