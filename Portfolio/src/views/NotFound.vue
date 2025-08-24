<template>
  <div class="min-h-screen flex items-center justify-center p-8">
    <div class="text-center max-w-xl">
      <h1 class="text-5xl font-bold text-white mb-4">404</h1>
      <p class="text-lg text-gray-300 mb-6">Page not found.</p>
      <div class="flex gap-3 justify-center">
        <RouterLink to="/" class="px-4 py-2 rounded bg-indigo-600 text-white">Back</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
</style>