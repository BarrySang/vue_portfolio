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
        class="bg-card rounded-lg p-4 shadow-sm font-sans"
      >
        <p class="font-semibold text-gray-900">{{ item.course }}</p>
        <p class="text-gray-700">{{ item.school }}</p>
        <p class="text-sm text-muted mt-1">{{ item.duration }}</p>
      </div>
    </div>
  </SectionToggle>
</template>
