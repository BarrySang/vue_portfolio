<script setup>
</script>

<template>
  <div class="flex flex-col items-center sm:items-start gap-6 w-full bg-navy-light rounded-lg p-6 sm:p-8 font-sans">
    <img
      src="/profile/profile-2.jpeg"
      class="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover shadow"
      alt="Profile picture"
    />

    <div class="flex flex-col gap-2 text-center sm:text-left w-full">
      <h2 class="text-xl sm:text-2xl font-bold text-navy">Barnabas Kipruto</h2>
      <p class="text-sm text-muted">Nairobi, Kenya</p>

      <div class="flex flex-col gap-2 mt-3 text-gray-700 w-full">
        <a href="https://github.com/barrysang" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 justify-center sm:justify-start hover:text-navy transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 shrink-0 text-teal" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
          </svg>
          <span class="text-sm sm:text-base break-all">github.com/barrysang</span>
        </a>
      </div>
    </div>
  </div>
</template>
