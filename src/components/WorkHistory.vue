<script setup>
import { getWorkExperience } from '../data/portfolio.js'
import SectionToggle from './SectionToggle.vue'

const workData = getWorkExperience()
</script>

<template>
  <SectionToggle title="Work History">
    <div>
      <div
        v-for="(item, index) in workData"
        :key="index"
        class="bg-[rgba(231,236,238,0.418)] rounded p-2.5 m-[5px] font-sans"
      >
        <p>{{ item.organization }}</p>
        <p>{{ item.position }}</p>
        <p v-if="item.duration">{{ item.duration }}</p>
      </div>
    </div>
  </SectionToggle>
</template>
