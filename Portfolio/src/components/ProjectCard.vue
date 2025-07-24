<template>
  <div
    class="max-w-sm bg-gray-800 text-white rounded-xl shadow-lg overflow-hidden transform transition hover:scale-105 hover:shadow-2xl"
  >
    <img :src="imgSrc" :alt="imgAlt" class="w-full h-48 object-cover" />

    <div class="p-5">
      <h3 class="text-xl font-semibold mb-2">{{ title }}</h3>
      <p class="text-gray-300 mb-4">{{ description }}</p>
      <a
        :href="link"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors duration-200"
      >
        {{ buttonText }}
      </a>
    </div>
  </div>
</template>

<script setup>
defineProps({
  imgSrc: String,
  imgAlt: String,
  title: String,
  description: String,
  link: String,
  buttonText: {
    type: String,
    default: "Learn more",
  },
});
</script>
