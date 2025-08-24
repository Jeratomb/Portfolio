<template>
  <div class="flex flex-col min-h-screen p-10 mt-10">
    <!-- HERO / PITCH (picked up by SectionNav) -->
    <section id="pitch" class="flex flex-col items-center text-center gap-6">
      <h1 class="text-5xl font-bold">Well, Hello there!</h1>
      <p class="max-w-2xl text-gray-300 text-lg">
        Seems like you've found me. Do you want to play a game? If you're up for the challenge, go ahead. If the answer is no, then you know which one to choose.
      </p>

      <div class="mt-8">
        <PillChoice />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import PillChoice from '@/components/PillChoice.vue'

const router = useRouter()
const visible = ref(false)

function enter() {
  router.push('/home')
}

onMounted(() => {
  // small reveal to match other views
  setTimeout(() => (visible.value = true), 60)
})
</script>