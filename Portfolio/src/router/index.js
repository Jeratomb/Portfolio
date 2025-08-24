// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const Landing    = () => import('@/views/Landing.vue')
const PuzzleGate = () => import('@/views/PuzzleGate.vue') // create this view if you don't have it yet
const Home       = () => import('@/views/Home.vue')
// const NotFound   = () => import('@/views/NotFound.vue')    // optional: create a simple NotFound view

function hasSolvedGate() {
  let lc = false
  let cookieOK = false

  try {
    lc = typeof localStorage !== 'undefined' && localStorage.getItem('portfolio_gate') === '1'
  } catch (e) {
    lc = false
  }

  try {
    cookieOK = typeof document !== 'undefined' && /(?:^|;\s*)portfolio_gate=1(?:;|$)/.test(document.cookie)
  } catch (e) {
    cookieOK = false
  }

  return lc || cookieOK
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/',        name: 'Landing',    component: Landing,    meta: { public: true } },
    { path: '/gate',    name: 'PuzzleGate', component: PuzzleGate, meta: { public: true } },
    { path: '/home',    name: 'Home',       component: Home,       meta: { requiresSolved: true } },
    // { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound, meta: { public: true } },
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

router.beforeEach((to) => {
  const solved = hasSolvedGate()

  if (to.meta && to.meta.requiresSolved && !solved) {
    return { name: 'PuzzleGate', query: { redirect: to.fullPath } }
  }

  if (solved && (to.name === 'Landing' || to.name === 'PuzzleGate')) {
    const redirect = (to.query && to.query.redirect) ? String(to.query.redirect) : '/home'
    return redirect
  }

  return true
})

export default router
