<template>
  <nav class="navbar">
    <div class="bar" :class="{ open: isOpen }">
      <div class="nav-inner px-4 py-3 flex justify-between items-center">
        <RouterLink to="/" class="brand">Jeratomb</RouterLink>

        <ul class="nav-links items-center">
          <li><RouterLink to="/projects" class="nav-link" active-class="active" @click="close">Projekte</RouterLink></li>
          <li><RouterLink to="/contact"  class="nav-link" active-class="active" @click="close">Kontakt</RouterLink></li>
          <li><RouterLink to="/home"     class="nav-link" active-class="active" @click="close">Portfolio</RouterLink></li>
        </ul>
      </div>
    </div>

    <button
      class="burger"
      :class="{ open: isOpen }"
      :aria-expanded="isOpen ? 'true' : 'false'"
      aria-controls="nav-bar"
      aria-label="Toggle navigation"
      @click="toggle"
    >
      <span class="line"></span>
      <span class="line"></span>
      <span class="line"></span>
    </button>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const isOpen = ref(false)
const router = useRouter()

function toggle() { isOpen.value = !isOpen.value }
function close()  { isOpen.value = false }

let cleanup: (() => void) | null = null

onMounted(() => {
  const mq = window.matchMedia('(min-width: 768px)')
  const sync = () => { isOpen.value = mq.matches }
  sync()
  mq.addEventListener('change', sync)

  const removeAfter = router.afterEach(() => close())

  const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
  window.addEventListener('keydown', onKey)

  cleanup = () => {
    mq.removeEventListener('change', sync)
    window.removeEventListener('keydown', onKey)
    removeAfter()
  }
})

onBeforeUnmount(() => cleanup?.())
</script>

<style scoped>

.navbar {
  position: fixed; inset: 0 auto auto 0; right: 0; top: 12px;
  margin: 0 1rem;
  height: 64px;
  z-index: 60;
  background: transparent; 
  box-shadow: none; border: none;
}

.bar {
  position: absolute;
  inset: 0; 
  border-radius: 14px;
  background: linear-gradient(90deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02));
  backdrop-filter: blur(12px) saturate(130%);
  -webkit-backdrop-filter: blur(12px) saturate(130%);
  box-shadow: 0 6px 24px rgba(2,6,23,0.45);
  border: 1px solid rgba(255,255,255,0.08);

  transform-origin: right center;
  transform: scaleX(0);
  opacity: 0;
  pointer-events: none;
  transition:
    transform 0.6s cubic-bezier(.16,1.05,.3,1),
    opacity 0.32s ease;
  will-change: transform, opacity;
}


.bar.open {
  transform: scaleX(1);
  opacity: 1;
  pointer-events: auto;
}

.nav-inner {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: flex-start;
}


.nav-links {
  display: flex;
  gap: 2.25rem;
  margin-left: auto;
}


.brand {
  margin-left: 8px;
}


.brand, .nav-link {
  opacity: 0;
  transform: translateY(-2px);
  transition: transform 0.35s ease, opacity 0.35s ease;
}
.bar.open .brand, .bar.open .nav-link {
  opacity: 1;
  transform: translateY(0);
}

.bar.open .nav-link:nth-child(1) { transition-delay: .12s; }
.bar.open .nav-link:nth-child(2) { transition-delay: .18s; }
.bar.open .nav-link:nth-child(3) { transition-delay: .24s; }


.nav-link{
  position:relative; display:inline-block; color:rgba(255,255,255,0.92);
  text-decoration:none; padding:.4rem .6rem; font-weight:600; letter-spacing:.2px;
  transition: color .22s ease, transform .22s ease, text-shadow .22s ease;
}
.nav-link::after{
  content:""; position:absolute; left:10%; right:10%; bottom:-8px; height:3px; border-radius:999px;
  background: linear-gradient(90deg, rgba(96,165,250,0), rgba(96,165,250,0));
  transform-origin:left center; transform:scaleX(0); opacity:0;
  transition: transform .36s cubic-bezier(.2,.9,.2,1), background .32s ease, opacity .28s ease;
}
.nav-link:hover, .nav-link:focus{ color:#fff; transform:translateY(-2px); outline:none; }
.nav-link:hover::after, .nav-link:focus::after{
  transform:scaleX(1); opacity:1;
  background: linear-gradient(90deg, rgba(99,102,241,0.95), rgba(59,130,246,0.95));
  box-shadow:0 8px 28px rgba(59,130,246,0.12), 0 2px 6px rgba(99,102,241,0.06) inset;
}
.nav-link.active{ color:#fff; }
.nav-link.active::after{ transform:scaleX(1); opacity:1; background:linear-gradient(90deg, rgba(99,102,241,.95), rgba(59,130,246,.95)); }

.burger{
  position: absolute; top: 50%; right: 12px; transform: translateY(-50%);
  z-index: 2;
  width:42px; height:42px; display:grid; place-items:center;
  border-radius:10px; background:rgba(255,255,255,0.06);
  border:1px solid rgba(255,255,255,0.1);
  transition: background 0.28s ease, transform 0.36s cubic-bezier(.2,.9,.2,1), box-shadow .28s ease;
  box-shadow: 0 6px 20px rgba(0,0,0,.25);
}
.burger:hover { background:rgba(255,255,255,0.1); }
.burger:active{ transform: translateY(-50%) scale(.97); }

.burger .line{
  width:22px; height:2px; border-radius:999px; background:rgba(255,255,255,.92);
  transition: transform .36s cubic-bezier(.2,.9,.2,1), opacity .28s ease;
}
.burger .line + .line{ margin-top:5px; }
.burger.open .line:nth-child(1){ transform: translateY(7px) rotate(45deg); }
.burger.open .line:nth-child(2){ opacity:0; }
.burger.open .line:nth-child(3){ transform: translateY(-7px) rotate(-45deg); }

@media (min-width: 768px){
  .navbar { height: 68px; }
}
</style>
