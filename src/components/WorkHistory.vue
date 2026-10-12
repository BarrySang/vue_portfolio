<script setup>
import { ref } from 'vue'
import { getWorkExperience } from '../data/portfolio.js'
import SectionToggle from './SectionToggle.vue'

const workData = getWorkExperience()
const expandedEntries = ref({})

function toggleDetails(index) {
  expandedEntries.value[index] = !expandedEntries.value[index]
}
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
        <p class="text-navy/80">{{ item.position }}</p>
        <p v-if="item.duration" class="text-sm text-muted mt-1">{{ item.duration }}</p>
        <button
          type="button"
          class="mt-3 text-sm font-medium text-teal underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
          :aria-expanded="Boolean(expandedEntries[index])"
          :aria-controls="`work-details-${index}`"
          :aria-label="`${expandedEntries[index] ? 'Hide' : 'View'} responsibilities and skills for ${item.position} at ${item.organization}`"
          @click="toggleDetails(index)"
        >
          {{ expandedEntries[index] ? 'Hide responsibilities & skills' : 'View responsibilities & skills' }}
        </button>
        <div v-if="expandedEntries[index]" :id="`work-details-${index}`" class="mt-4 border-t border-border pt-3">
          <h3 :id="`work-responsibilities-${index}`" class="text-sm font-semibold text-navy">Responsibilities</h3>
          <ul :aria-labelledby="`work-responsibilities-${index}`" class="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted">
            <li v-for="responsibility in item.responsibilities" :key="responsibility">
              {{ responsibility }}
            </li>
          </ul>
          <h3 :id="`work-skills-${index}`" class="mt-4 text-sm font-semibold text-navy">Skills</h3>
          <ul :aria-labelledby="`work-skills-${index}`" class="mt-2 flex flex-wrap gap-2">
            <li
              v-for="skill in item.skills"
              :key="skill"
              class="rounded-full bg-teal-light px-2.5 py-1 text-xs font-medium text-teal"
            >
              {{ skill }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </SectionToggle>
</template>
