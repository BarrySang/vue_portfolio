<script setup>
import { getAcademicData } from '../data/portfolio.js'
import SectionToggle from './SectionToggle.vue'

const academicData = getAcademicData()
</script>

<template>
  <SectionToggle title="Academic Qualifications">
    <div class="flex flex-col gap-3">
      <div
        v-for="(item, index) in academicData"
        :key="index"
        class="bg-card border border-border rounded-lg p-4 shadow-sm font-sans border-l-4 border-l-teal hover:shadow-md transition-shadow"
      >
        <p class="font-semibold text-navy">{{ item.course }}</p>
        <p class="text-navy/80">{{ item.school }}</p>
        <p class="text-sm text-muted mt-1">{{ item.duration }}</p>
        <div v-if="item.coursework?.length" class="mt-3">
          <p class="text-sm font-medium text-navy">Relevant coursework</p>
          <ul class="mt-2 flex flex-wrap gap-2" aria-label="Relevant coursework">
            <li
              v-for="subject in item.coursework"
              :key="subject"
              class="rounded-full bg-teal-light px-2.5 py-1 text-xs font-medium text-teal"
            >
              {{ subject }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </SectionToggle>
</template>
