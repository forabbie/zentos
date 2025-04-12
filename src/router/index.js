import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: { name: 'dashboard' } },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/DashboardView.vue'),
  },
  {
    path: '/transactions',
    name: 'transactions',
    component: () => import('@/views/TransactionsView.vue'),
  },
  {
    path: '/wallets',
    name: 'wallets',
    component: () => import('@/views/WalletsView.vue'),
  },
  {
    path: '/misc',
    name: 'misc',
    component: () => import('@/views/MiscView.vue'),
  },
  {
    path: '/:catchAll(.*)',
    redirect: { name: 'dashboard' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
