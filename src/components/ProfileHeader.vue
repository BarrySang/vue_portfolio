<script setup>
</script>

<template>
  <header class="flex flex-col sm:flex-row items-center gap-6 w-full bg-accent rounded-lg p-6 sm:p-8 mb-3 font-sans">
    <div class="shrink-0">
      <img
        src="/profile/profile-2.jpeg"
        class="w-36 h-36 sm:w-40 sm:h-40 rounded-full object-cover shadow"
        alt="Profile picture"
      />
    </div>
    <div class="flex flex-col gap-2 text-center sm:text-left">
      <h1 class="text-2xl sm:text-3xl font-semibold text-gray-900">Barnabas Kipruto</h1>

      <div class="flex flex-col gap-1.5 mt-2 text-gray-700">
        <a href="mailto:barrysang8@gmail.com" class="flex items-center gap-2 justify-center sm:justify-start hover:text-gray-900 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 16 16">
            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
          </svg>
          <span class="text-sm sm:text-base">barrysang8@gmail.com</span>
        </a>

        <a href="tel:+254745905538" class="flex items-center gap-2 justify-center sm:justify-start hover:text-gray-900 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
          </svg>
          <span class="text-sm sm:text-base">0745905538</span>
        </a>

        <a href="https://github.com/barrysang" target="_blank" class="flex items-center gap-2 justify-center sm:justify-start hover:text-gray-900 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
          </svg>
          <span class="text-sm sm:text-base">github.com/barrysang</span>
        </a>
      </div>
    </div>
  </header>
</template>
