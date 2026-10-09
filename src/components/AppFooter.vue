<script setup>
const year = new Date().getFullYear()

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/barrysang' }
]
</script>

<template>
  <footer class="flex flex-col items-center justify-center gap-4 py-8 mt-6 border-t border-border font-sans">
    <div class="flex items-center gap-5">
      <a
        v-for="link in socialLinks"
        :key="link.label"
        :href="link.href"
        target="_blank"
        rel="noopener noreferrer"
        class="text-sm text-muted hover:text-navy transition-colors"
      >
        {{ link.label }}
      </a>
    </div>
    <p class="text-sm text-muted">&copy; {{ year }} Barnabas Kipruto</p>
    <p class="text-xs text-muted/70">Built with Vue &amp; Tailwind</p>
  </footer>
</template>
