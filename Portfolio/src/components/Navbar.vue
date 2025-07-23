<template>
  <nav class="fixed top-0 left-0 w-full z-50 bg-gray-800 text-white shadow-md">
    <div class="px-4 py-3 flex justify-between items-center">
      <!-- Left: Brand and Navigation links -->
      <div class="flex items-center gap-8">
        <RouterLink to="/" class="text-2xl font-bold">Home</RouterLink>
        <ul class="flex items-center gap-8">
          <li>
            <RouterLink
              to="/projects"
              class="px-3 py-2 rounded hover:bg-gray-700 transition"
              active-class="font-semibold"
            >
              Projekte
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/contact"
              class="px-3 py-2 rounded hover:bg-gray-700 transition"
              active-class="font-semibold"
            >
              Kontakt
            </RouterLink>
          </li>
        </ul>
      </div>
      <!-- Right: Search -->
      <div class="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search"
          class="text-white bg-gray-700 rounded px-2 py-1 text-sm focus:outline-none"
        />
        <button
          type="submit"
          class="bg-gray-800 px-3 py-1 rounded text-sm hover:bg-gray-700 border border-gray-700"
        >
          Search
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
