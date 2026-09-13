<script setup>
import { getWorkExperience } from '../data/portfolio.js'
import SectionToggle from './SectionToggle.vue'

const workData = getWorkExperience()
</script>

<template>
  <SectionToggle title="Work History">
    <div class="flex flex-col gap-3">
      <div
        v-for="(item, index) in workData"
        :key="index"
        class="bg-card border border-border rounded-lg p-4 shadow-sm font-sans border-l-4 border-l-teal hover:shadow-md transition-shadow"
      >
        <p class="font-semibold text-navy">{{ item.organization }}</p>
        <p class="text-gray-700">{{ item.position }}</p>
        <p v-if="item.duration" class="text-sm text-muted mt-1">{{ item.duration }}</p>
      </div>
    </div>
  </SectionToggle>
</template>
