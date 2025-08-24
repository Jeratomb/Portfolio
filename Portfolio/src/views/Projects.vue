<!-- Projects.vue -->
<template>
  <div class="min-h-screen p-10">
    <!-- Projects page root section so SectionNav can detect it when this view is active -->
    <section id="projects-section" class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-4">💻 Projekte</h1>
      <p class="mb-6 text-gray-300">Hier sind meine bisherigen Arbeiten.</p>

      <!-- add project cards or placeholders here -->
      <div class="grid gap-6">
        <div class="p-6 bg-white/5 rounded-lg">
          <h3 class="font-semibold">FitMe Mobile App</h3>
          <p class="text-sm text-gray-400">A fitness app built with React Native & Expo — demo / link.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
/* simple static view — expand as needed */
</script>

<style scoped>
/* add any component-specific styles here */
</style>
