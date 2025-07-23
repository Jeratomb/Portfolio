<template>
  <Navbar />
<main class="px-6 pt-4">
    <RouterView />
  </main>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import { RouterView } from 'vue-router'
</script>

