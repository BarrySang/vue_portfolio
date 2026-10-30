<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { getWorkExperience } from '../data/portfolio.js'

const TRACKS = {
  mechanical: {
    badge: 'Mechanical & Technical Role',
    drawerBadge: 'Mechanical Track',
    badgeClass:
      'border-amber-500/50 bg-amber-500/10 text-amber-700 dark:text-amber-300',
    dotClass: 'bg-amber-500',
    selectedCardClass:
      'border-amber-500 bg-amber-500/10 shadow-[0_0_18px_rgba(245,158,11,0.25)]',
    orgClass: 'text-amber-700 dark:text-amber-300'
  },
  software: {
    badge: 'Software Development & IT Role',
    drawerBadge: 'Software / IT Track',
    badgeClass:
      'border-cyan-500/50 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300',
    dotClass: 'bg-cyan-500',
    selectedCardClass:
      'border-cyan-500 bg-cyan-500/10 shadow-[0_0_18px_rgba(6,182,212,0.25)]',
    orgClass: 'text-cyan-700 dark:text-cyan-300'
  }
}

const filters = [
  { value: 'all', label: 'All Tracks' },
  { value: 'mechanical', label: 'Mechanical / Tech' },
  { value: 'software', label: 'Software / IT' }
]

const entries = getWorkExperience().map((item, id) => ({
  ...item,
  id,
  year: item.duration.match(/\d{4}/)?.[0] ?? '',
  trackInfo: TRACKS[item.track] ?? TRACKS.mechanical
}))

const activeFilter = ref('all')
const selectedId = ref(entries[0]?.id ?? 0)
const drawerOpen = ref(false)

const scroller = ref(null)
const closeButton = ref(null)
const thumbWidth = ref(100)
const thumbLeft = ref(0)

const cardEls = {}
let lockUntil = 0
let rafId = 0
let triggerEl = null

const visibleEntries = computed(() =>
  activeFilter.value === 'all'
    ? entries
    : entries.filter(entry => entry.track === activeFilter.value)
)

const selected = computed(
  () => visibleEntries.value.find(entry => entry.id === selectedId.value) ?? visibleEntries.value[0]
)

function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

function setCardRef(id, el) {
  if (el) cardEls[id] = el
}

function updateProgress() {
  const el = scroller.value
  if (!el || !el.scrollWidth) return
  const ratio = el.clientWidth / el.scrollWidth
  thumbWidth.value = Math.min(100, ratio * 100)
  thumbLeft.value = ratio >= 1 ? 0 : (el.scrollLeft / el.scrollWidth) * 100
}

function syncSelection() {
  const el = scroller.value
  const list = visibleEntries.value
  if (!el || !list.length || Date.now() < lockUntil) return

  let target
  if (el.scrollLeft <= 1) {
    target = list[0]
  } else if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 1) {
    target = list[list.length - 1]
  } else {
    const center = el.scrollLeft + el.clientWidth / 2
    let best = Infinity
    for (const entry of list) {
      const card = cardEls[entry.id]
      if (!card) continue
      const distance = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center)
      if (distance < best) {
        best = distance
        target = entry
      }
    }
  }
  if (target) selectedId.value = target.id
}

function onScroll() {
  cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(() => {
    updateProgress()
    syncSelection()
  })
}

function centerCard(id) {
  const el = scroller.value
  const card = cardEls[id]
  if (!el || !card) return
  el.scrollTo({
    left: card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2,
    behavior: prefersReducedMotion() ? 'auto' : 'smooth'
  })
}

function selectEntry(id) {
  selectedId.value = id
  lockUntil = Date.now() + 800
  centerCard(id)
}

function setFilter(value) {
  activeFilter.value = value
}

watch(activeFilter, async () => {
  const first = visibleEntries.value[0]
  if (first) selectedId.value = first.id
  lockUntil = Date.now() + 300
  await nextTick()
  scroller.value?.scrollTo({ left: 0, behavior: 'auto' })
  updateProgress()
})

async function openDrawer(id, event) {
  selectedId.value = id
  triggerEl = event?.currentTarget ?? null
  drawerOpen.value = true
  await nextTick()
  closeButton.value?.focus()
}

function closeDrawer() {
  drawerOpen.value = false
  triggerEl?.focus?.()
  triggerEl = null
}

function onKeydown(event) {
  if (event.key === 'Escape' && drawerOpen.value) closeDrawer()
}

watch(drawerOpen, open => {
  document.body.style.overflow = open ? 'hidden' : ''
})

onMounted(() => {
  updateProgress()
  window.addEventListener('resize', updateProgress)
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId)
  window.removeEventListener('resize', updateProgress)
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <section class="font-sans" aria-labelledby="career-timeline-title">
    <div class="flex items-center gap-3">
      <svg
        aria-hidden="true"
        class="h-7 w-7 shrink-0 text-amber-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="17" cy="5" r="2.5" />
        <path d="M17 7.5V10a3 3 0 0 1-3 3H8a3 3 0 0 0-3 3v0a3 3 0 0 0 3 3h3" />
        <circle cx="5" cy="19" r="0.5" />
      </svg>
      <h2 id="career-timeline-title" class="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
        Career Journey Timeline
      </h2>
    </div>
    <p class="mt-2 text-muted">
      Click milestone nodes on the track to focus on roles &amp; trigger detail drawers.
    </p>

    <!-- Track filter -->
    <div
      class="mt-5 grid grid-cols-3 gap-1 rounded-2xl border border-border bg-card p-1"
      role="group"
      aria-label="Filter career timeline by track"
    >
      <button
        v-for="filter in filters"
        :key="filter.value"
        type="button"
        :aria-pressed="activeFilter === filter.value"
        class="flex flex-col items-center justify-center gap-1 rounded-xl px-2 py-2.5 text-center text-sm font-medium leading-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal sm:flex-row sm:gap-2"
        :class="
          activeFilter === filter.value
            ? 'bg-navy-light text-navy'
            : 'text-muted hover:text-navy'
        "
        @click="setFilter(filter.value)"
      >
        <svg
          v-if="filter.value === 'all'"
          aria-hidden="true"
          class="h-4 w-4 shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
        </svg>
        <svg
          v-else-if="filter.value === 'mechanical'"
          aria-hidden="true"
          class="h-4 w-4 shrink-0 text-amber-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="9" cy="9" r="3" />
          <path d="M9 2v2m0 10v2M2 9h2m10 0h2M4.1 4.1l1.4 1.4m7 7 1.4 1.4m0-9.8-1.4 1.4m-7 7-1.4 1.4" />
          <circle cx="17" cy="17" r="2" />
          <path d="M17 12.5v1m0 7v1m-4.5-4.5h1m7 0h1" />
        </svg>
        <svg
          v-else
          aria-hidden="true"
          class="h-4 w-4 shrink-0 text-cyan-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />
        </svg>
        <span>{{ filter.label }}</span>
      </button>
    </div>

    <!-- Timeline + detail -->
    <div class="mt-6 rounded-3xl border border-border bg-card/60 p-4 sm:p-6">
      <div
        ref="scroller"
        class="timeline-scroll relative flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth py-3"
        role="list"
        aria-label="Career milestones"
        @scroll.passive="onScroll"
      >
        <div
          v-for="entry in visibleEntries"
          :key="entry.id"
          :ref="el => setCardRef(entry.id, el)"
          role="listitem"
          class="w-44 shrink-0 snap-center rounded-2xl border p-4 transition-[border-color,background-color,box-shadow] duration-300 sm:w-56"
          :class="
            selected?.id === entry.id
              ? entry.trackInfo.selectedCardClass
              : 'border-border bg-card hover:border-teal/50'
          "
        >
          <button
            type="button"
            class="block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            :aria-current="selected?.id === entry.id ? 'true' : undefined"
            :aria-label="`${entry.year}: ${entry.position} at ${entry.organization}`"
            @click="selectEntry(entry.id)"
          >
            <span class="flex items-center justify-between">
              <span class="text-sm font-medium text-muted">{{ entry.year }}</span>
              <span
                aria-hidden="true"
                class="h-2.5 w-2.5 rounded-full"
                :class="entry.trackInfo.dotClass"
              ></span>
            </span>
            <span class="mt-3 block truncate font-semibold text-navy">{{ entry.position }}</span>
            <span class="mt-0.5 block truncate text-sm text-muted">{{ entry.organization }}</span>
          </button>
          <button
            type="button"
            class="mt-4 text-sm text-muted transition-colors hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
            :aria-label="`View details for ${entry.position} at ${entry.organization}`"
            @click="openDrawer(entry.id, $event)"
          >
            View details &rarr;
          </button>
        </div>
      </div>

      <!-- scroll position indicator -->
      <div class="mt-1 h-2 w-full rounded-full bg-border/40" aria-hidden="true">
        <div
          class="h-2 rounded-full bg-muted/50 transition-[left,width] duration-150"
          :style="{ width: thumbWidth + '%', marginLeft: thumbLeft + '%' }"
        ></div>
      </div>

      <div class="my-5 h-px bg-border"></div>

      <div v-if="selected" aria-live="polite">
        <div class="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span
            class="rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider"
            :class="selected.trackInfo.badgeClass"
          >
            {{ selected.trackInfo.badge }}
          </span>
          <span class="inline-flex items-center gap-1.5 text-sm text-muted">
            <svg
              aria-hidden="true"
              class="h-4 w-4 shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M3 10h18M8 3v4m8-4v4" />
            </svg>
            {{ selected.duration }}
          </span>
        </div>

        <h3 class="mt-4 text-2xl font-bold leading-tight text-navy sm:text-3xl">
          {{ selected.position }}
        </h3>
        <p class="mt-2 text-lg font-semibold" :class="selected.trackInfo.orgClass">
          {{ selected.organization }}
        </p>

        <button
          type="button"
          class="mt-5 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-navy-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          @click="openDrawer(selected.id, $event)"
        >
          View responsibilities &amp; skills
        </button>

        <p v-if="selected.summary" class="mt-5 leading-relaxed text-muted">
          {{ selected.summary }}
        </p>
      </div>
      <p v-else class="text-sm text-muted">No roles in this track.</p>
    </div>

    <!-- Detail drawer -->
    <Teleport to="body">
      <Transition name="drawer">
        <div
          v-if="drawerOpen && selected"
          class="fixed inset-0 z-50 flex justify-end font-sans"
          role="dialog"
          aria-modal="true"
          aria-labelledby="work-drawer-title"
        >
          <div class="drawer-backdrop absolute inset-0 bg-black/60" @click="closeDrawer"></div>
          <aside
            class="drawer-panel relative h-full w-full max-w-lg overflow-y-auto border-l border-border bg-surface p-6 text-navy shadow-2xl"
          >
            <div class="flex items-center justify-between gap-4">
              <span
                class="rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider"
                :class="selected.trackInfo.badgeClass"
              >
                {{ selected.trackInfo.drawerBadge }}
              </span>
              <button
                ref="closeButton"
                type="button"
                class="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:bg-navy-light hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
                aria-label="Close details"
                @click="closeDrawer"
              >
                <svg
                  aria-hidden="true"
                  class="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                >
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>

            <div class="my-5 h-px bg-border"></div>

            <p class="inline-flex items-center gap-1.5 text-sm text-muted">
              <svg
                aria-hidden="true"
                class="h-4 w-4 shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M3 10h18M8 3v4m8-4v4" />
              </svg>
              {{ selected.duration }}
            </p>
            <h3 id="work-drawer-title" class="mt-2 text-2xl font-bold leading-tight">
              {{ selected.position }}
            </h3>
            <p class="mt-1 font-semibold" :class="selected.trackInfo.orgClass">
              {{ selected.organization }}
            </p>

            <h4 class="mt-8 text-xs font-bold uppercase tracking-widest text-muted">
              Key responsibilities
            </h4>
            <ul class="mt-3 space-y-2.5">
              <li
                v-for="responsibility in selected.responsibilities"
                :key="responsibility"
                class="flex items-start gap-2.5 text-sm leading-relaxed"
              >
                <svg
                  aria-hidden="true"
                  class="mt-0.5 h-4 w-4 shrink-0 text-teal"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m5 12 5 5 9-10" />
                </svg>
                <span class="text-navy/90">{{ responsibility }}</span>
              </li>
            </ul>

            <h4 class="mt-8 text-xs font-bold uppercase tracking-widest text-muted">
              Tools &amp; skills utilized
            </h4>
            <ul class="mt-3 flex flex-wrap gap-2">
              <li
                v-for="skill in selected.skills"
                :key="skill"
                class="rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-navy"
              >
                {{ skill }}
              </li>
            </ul>
          </aside>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
.timeline-scroll {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.timeline-scroll::-webkit-scrollbar {
  display: none;
}

.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.25s ease;
}
.drawer-enter-active .drawer-panel,
.drawer-leave-active .drawer-panel {
  transition: transform 0.3s ease;
}
.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}
.drawer-enter-from .drawer-panel,
.drawer-leave-to .drawer-panel {
  transform: translateX(100%);
}

@media (prefers-reduced-motion: reduce) {
  .drawer-enter-active,
  .drawer-leave-active,
  .drawer-enter-active .drawer-panel,
  .drawer-leave-active .drawer-panel {
    transition: none;
  }
}
</style>
