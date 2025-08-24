<template>
  <div class="fixed bottom-4 left-4 z-50 flex flex-col gap-2">
    <button
      class="px-3 py-1 rounded bg-red-600 text-white text-sm hover:bg-red-500"
      @click="clearGate"
      title="Remove portfolio gate cookie + key and reload"
    >
      Clear Gate (cookie + localStorage)
    </button>

    <button
      class="px-3 py-1 rounded bg-gray-700 text-white text-sm hover:bg-gray-600"
      @click="clearAll"
      title="Clear all localStorage and all cookies (dev only)"
    >
      Clear All Storage
    </button>
  </div>
</template>

<script setup>
/**
 * Dev helper: remove the gate cookie/localStorage and reload.
 * This component is intended to be mounted only in development.
 */

function clearGate() {
  try { localStorage.removeItem('portfolio_gate') } catch (e) { /* ignore */ }

  // remove cookie for current host/path
  document.cookie = 'portfolio_gate=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;'

  // try removing with domain fallback (some setups set cookie with domain)
  try {
    const host = location.hostname
    if (host) {
      document.cookie = `portfolio_gate=; domain=${host}; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;`
    }
  } catch (e) { /* ignore */ }

  location.reload()
}

function clearAll() {
  // clear localStorage
  try { localStorage.clear() } catch (e) { /* ignore */ }

  // expire all cookies (simple approach)
  const cookies = document.cookie.split(';')
  for (const c of cookies) {
    const eqPos = c.indexOf('=')
    const name = eqPos > -1 ? c.substr(0, eqPos).trim() : c.trim()
    if (!name) continue
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;`
    try {
      const host = location.hostname
      if (host) {
        document.cookie = `${name}=; domain=${host}; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;`
      }
    } catch (e) { /* ignore */ }
  }

  location.reload()
}
</script>

<style scoped>
/* keep it unobtrusive, visible in dev */
</style>