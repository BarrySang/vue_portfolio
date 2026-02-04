<script setup>
import ProfileHeader from './components/ProfileHeader.vue'
import GithubRepos from './components/GithubRepos.vue'
import WorkHistory from './components/WorkHistory.vue'
import AcademicHistory from './components/AcademicHistory.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<template>
  <div class="max-w-4xl mx-auto px-3 sm:px-6">
    <ProfileHeader />
    <section class="flex flex-col gap-3">
      <div class="flex flex-col gap-3 sm:grid sm:grid-cols-2">
        <WorkHistory />
        <AcademicHistory />
      </div>
      <div id="github-repos" class="overflow-y-auto max-h-[600px]">
        <GithubRepos />
      </div>
    </section>
    <AppFooter />
  </div>
</template>
