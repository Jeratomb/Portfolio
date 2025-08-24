<template>
  <div ref="wrap" class="star-backdrop" aria-hidden="true"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const wrap = ref(null)
let createdStars = []
let resizeHandler = null

onMounted(() => {
  const el = wrap.value
  if (!el) return

  const STAR_COUNT = 120

  const makeStars = () => {
    // cleanup previous
    createdStars.forEach(s => s.remove())
    createdStars = []

    for (let i = 0; i < STAR_COUNT; i++) {
      const s = document.createElement('span')
      s.className = 'star'
      const size = 0.6 + Math.random() * 2.6
      s.style.width = `${size}px`
      s.style.height = `${size}px`
      s.style.left = `${Math.random() * 100}%`
      s.style.top = `${Math.random() * 100}%`

      const dur = 1.2 + Math.random() * 3.0
      const delay = -Math.random() * 4
      s.style.animationDuration = `${dur}s`
      s.style.animationDelay = `${delay}s`

      const alpha = 0.4 + Math.random() * 0.9
      s.style.opacity = `${alpha}`

      const glow = Math.random() > 0.86 ? 6 + Math.random() * 10 : 0
      if (glow > 0) {
        s.style.boxShadow = `0 0 ${glow}px rgba(255,255,255,${Math.min(0.6, alpha)})`
      }

      el.appendChild(s)
      createdStars.push(s)
    }
  }

  makeStars()

  resizeHandler = () => {
    // mildly reposition stars on resize for variety without re-creating DOM
    createdStars.forEach(s => {
      s.style.left = `${Math.random() * 100}%`
      s.style.top = `${Math.random() * 100}%`
    })
  }
  window.addEventListener('resize', resizeHandler)
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeHandler)
  createdStars.forEach(s => s.remove())
  createdStars = []
})
</script>