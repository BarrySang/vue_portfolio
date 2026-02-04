<script setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer class="flex flex-col items-center justify-center gap-1 py-8 mt-6 border-t border-gray-200">
    <p class="text-sm text-muted font-sans">&copy; {{ year }} Barnabas Kipruto</p>
    <p class="text-xs text-muted/70 font-sans">Built with Vue</p>
  </footer>
</template>
