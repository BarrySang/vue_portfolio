<script setup>
import { getAcademicData } from '../data/portfolio.js'
import SectionToggle from './SectionToggle.vue'

const academicData = getAcademicData()
</script>

<template>
  <SectionToggle title="Academic Qualifications">
    <div>
      <div
        v-for="(item, index) in academicData"
        :key="index"
        class="bg-[rgba(231,236,238,0.418)] rounded p-2 m-[5px] sm:p-2.5 font-sans"
      >
        <p>{{ item.course }}</p>
        <p>{{ item.school }}</p>
        <p class="sm:text-base">{{ item.duration }}</p>
      </div>
    </div>
  </SectionToggle>
</template>
