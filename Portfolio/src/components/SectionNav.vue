<template>
  <nav v-if="items.length" class="kfDSgG" aria-label="Main navigation." id="section-nav">
    <ul>
      <li v-for="(it, i) in items" :key="it.selector">
        <button
          type="button"
          :aria-label="`Go to section: ${it.label}.`"
          class="nav-bullet"
          :class="{ current: activeIndex === i }"
          @click="scrollTo(it.selector)"
        ></button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const candidates = [
  { label: 'Pitch', selector: '#pitch' },
  { label: 'Cornerstone', selector: '#next-content' },
  { label: 'Experience', selector: '#about-section' },
  { label: 'Projects', selector: '#projects-section' },
  { label: 'Contact', selector: '#contact-section' },
]

const items = ref([])
const activeIndex = ref(0)
let observer = null

function scrollTo(selector) {
  const el = document.querySelector(selector)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function handleIntersections(entries) {
  const visible = entries.filter(e => e.isIntersecting)
  if (visible.length === 0) return
  visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio)
  const idx = items.value.findIndex(i => i.selector === `#${visible[0].target.id}`)
  if (idx >= 0) activeIndex.value = idx
}

function buildItems() {
  // disconnect old observer before rebuilding
  if (observer) {
    observer.disconnect()
    observer = null
  }

  items.value = candidates
    .filter(c => document.querySelector(c.selector))
    .map(c => ({ label: c.label, selector: c.selector }))

  if (!items.value.length) return

  observer = new IntersectionObserver((entries) => {
    window.requestAnimationFrame(() => handleIntersections(entries))
  }, {
    root: null,
    rootMargin: '0px',
    threshold: [0.25, 0.5, 0.75, 1.0]
  })

  items.value.forEach(i => {
    const el = document.querySelector(i.selector)
    if (el) observer.observe(el)
  })
}

let stopWatch = null

onMounted(async () => {
  // first build after DOM updates
  await nextTick()
  buildItems()

  // in some cases the view renders slightly later; add a small fallback
  setTimeout(() => {
    if (!items.value.length) buildItems()
  }, 120)

  // rebuild whenever the route changes
  stopWatch = watch(() => route.fullPath, async () => {
    await nextTick()
    buildItems()
  })
})

onUnmounted(() => {
  if (observer) observer.disconnect()
  if (stopWatch) stopWatch()
})
</script>