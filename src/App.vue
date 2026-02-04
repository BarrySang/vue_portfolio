<script setup>
import ProfileHeader from './components/ProfileHeader.vue'
import GithubRepos from './components/GithubRepos.vue'
import WorkHistory from './components/WorkHistory.vue'
import AcademicHistory from './components/AcademicHistory.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<template>
  <div class="lg:w-3/4 lg:mx-auto">
    <ProfileHeader />
    <section class="sm:grid sm:grid-cols-2 lg:grid-rows-2">
      <div id="github-repos" class="overflow-y-auto border h-fit sm:h-[1000px] sm:col-start-1 sm:col-end-2 sm:row-start-1 sm:row-end-3">
        <GithubRepos />
      </div>
      <div id="work-history" class="sm:col-start-2 sm:col-end-3 sm:row-start-1 sm:row-end-2 sm:mb-0">
        <WorkHistory />
      </div>
      <div id="academic-history" class="sm:col-start-2 sm:col-end-3 sm:row-start-2 sm:row-end-3">
        <AcademicHistory />
      </div>
    </section>
    <AppFooter />
  </div>
</template>
