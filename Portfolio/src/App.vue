<template>
  <StarBackdrop />

  <!-- show Navbar on all routes except Landing and PuzzleGate -->
  <Navbar v-if="showNavbar" />

  <div class="app-content">
    <SectionNav />
    <main class="px-6 pt-4">
      <RouterView />
    </main>
    <DevReset v-if="isDev" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import StarBackdrop from '@/components/StarBackdrop.vue'
import Navbar from './components/Navbar.vue'
import { RouterView } from 'vue-router'
import SectionNav from './components/SectionNav.vue'
import DevReset from '@/components/DevReset.vue'

const isDev = import.meta.env.DEV

const route = useRoute()
// hide navbar on Landing and PuzzleGate (by name)
const hideOn = ['Landing', 'PuzzleGate']
const showNavbar = computed(() => {
  const name = route.name ? String(route.name) : ''
  return !hideOn.includes(name)
})
</script>
