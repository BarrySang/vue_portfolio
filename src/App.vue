<script setup>
import HeroSection from './components/HeroSection.vue'
import ProfileHeader from './components/ProfileHeader.vue'
import GithubRepos from './components/GithubRepos.vue'
import WorkHistory from './components/WorkHistory.vue'
import AcademicHistory from './components/AcademicHistory.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<template>
  <div class="max-w-6xl mx-auto px-3 sm:px-6">
    <HeroSection />

    <div class="h-px bg-gradient-to-r from-transparent via-accent to-transparent my-6"></div>

    <section class="flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,320px)_1fr] lg:items-start">
      <div class="lg:sticky lg:top-6">
        <ProfileHeader />
      </div>

      <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-6 sm:grid sm:grid-cols-2">
          <WorkHistory />
          <AcademicHistory />
        </div>

        <div class="h-px bg-gradient-to-r from-transparent via-accent to-transparent"></div>

        <div id="github-repos">
          <GithubRepos />
        </div>
      </div>
    </section>

    <AppFooter />
  </div>
</template>
