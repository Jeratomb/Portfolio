<template>
  <section class="gate">
    <div class="gate-content">
      <h1>Prove you’re human (and curious) 🧩</h1>
      <p>Enter the correct 3-word phrase (hint on landing page, easter egg, etc.).</p>

      <form @submit.prevent="submit">
        <input
          v-model.trim="answer"
          placeholder="type the phrase"
          autocomplete="off"
          spellcheck="false"
          class="input"
        />
        <button class="btn">Unlock</button>
      </form>

      <p v-if="error" class="err">Nope—try again.</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const CORRECT = 'test'

const route = useRoute()
const router = useRouter()
const answer = ref('')
const error = ref(false)

function markSolved() {
  localStorage.setItem('portfolio_gate', '1')
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString()
  document.cookie = `portfolio_gate=1; Path=/; Expires=${expires}; SameSite=Lax`
}

async function submit() {
  if (answer.value.toLowerCase() === CORRECT) {
    error.value = false
    markSolved()
    const redirect = (route.query.redirect as string) || '/home'
    await router.replace(redirect)
  } else {
    error.value = true
  }
}
</script>

<style>
/* keep only gate-content / input styles here (no star CSS) */
.gate {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 6rem 1rem;
  color: #fff;
  background: transparent; /* backdrop handled globally by StarBackdrop */
}

.gate-content {
  text-align: center;
  max-width: 720px;
  padding: 2rem;
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
  border-radius: 12px;
  backdrop-filter: blur(6px) saturate(120%);
  box-shadow: 0 8px 40px rgba(0,0,0,0.6);
}

.input {
  padding: .7rem 1rem;
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: .5rem;
  min-width: min(90vw, 360px);
  background: rgba(255,255,255,0.02);
  color: #fff;
  outline: none;
}
.input::placeholder { color: rgba(255,255,255,0.45); }

.btn {
  margin-left: .5rem;
  padding: .7rem 1rem;
  border-radius: .5rem;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.03);
  color: #fff;
  cursor: pointer;
}
.err { color: #ff6b6b; margin-top: .6rem; }
</style>
