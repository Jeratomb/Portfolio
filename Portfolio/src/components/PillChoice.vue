<template>
  <div class="flex flex-col items-center justify-center gap-6 select-none">
    <div class="flex items-center justify-center gap-12">
      <a
        class="relative group block outline-none"
        role="button"
        aria-label="Choose red pill"
        tabindex="0"
        href="/home"
        @keydown.enter.prevent="onLeft"
        @keydown.space.prevent="onLeft"
        @click="onLeft"
      >
        <img
          :src="redPill"
          alt="Red pill"
          class="w-[280px] md:w-[340px] transition-transform duration-200 ease-out group-hover:scale-105 group-focus:scale-105 drop-shadow-lg"
          draggable="false"
        />
      </a>

      <a
        class="relative group block outline-none"
        role="button"
        aria-label="Choose blue pill"
        tabindex="0"
        href="/home"
        @keydown.enter.prevent="onBlueClick"
        @keydown.space.prevent="onBlueClick"
        @click.prevent="onBlueClick"
      >
        <img
          :src="bluePill"
          alt="Blue pill"
          class="w-[280px] md:w-[340px] transition-transform duration-200 ease-out group-hover:scale-105 group-focus:scale-105 drop-shadow-lg"
          :class="{ shake: shaking }"
          draggable="false"
        />
      </a>
    </div>

    <transition name="fade">
      <div
        v-if="showMessage"
        class="mt-2 px-4 py-2 rounded bg-white/10 text-white text-sm backdrop-blur-sm shadow"
        role="status"
        aria-live="polite"
      >
        Haha - you thought
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import bluePill from '@/assets/Blue_Pill.png'
import redPill from '@/assets/Red_Pill.png'

const showMessage = ref(false)
const shaking = ref(false)

function onLeft() {
  window.location.assign('/gate')
}

function onBlueClick() {
  if (shaking.value) return 

  shaking.value = true
  showMessage.value = true

  setTimeout(() => {
    showMessage.value = false
    setTimeout(() => (shaking.value = false), 200)
  }, 1200)
}
</script>

<style scoped>
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }
  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 400ms ease, transform 400ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
