<script setup>
import { ref, onMounted } from 'vue'
import { getRepos } from '../data/portfolio.js'
import SectionToggle from './SectionToggle.vue'

const repos = ref([])
const error = ref(null)

onMounted(() => {
  getRepos()
    .then(data => {
      repos.value = data
    })
    .catch(err => {
      error.value = err.message || String(err)
    })
})
</script>

<template>
  <SectionToggle title="Github Repositories">
    <div>
      <div v-if="error" class="bg-[rgba(231,236,238,0.418)] rounded p-[5px] font-sans">
        <p>An error occured, please reload the page.</p>
        <h1 class="border-t">Error details</h1>
        <div>
          <p>{{ error }}</p>
        </div>
      </div>
      <div
        v-for="repo in repos"
        :key="repo.id"
        :id="repo.name"
        class="bg-[rgba(231,236,238,0.418)] rounded h-[50px] p-2 m-[5px] sm:p-[5px] lg:p-2"
      >
        <p class="text-base font-sans">{{ repo.name }}</p>
      </div>
    </div>
  </SectionToggle>
</template>
