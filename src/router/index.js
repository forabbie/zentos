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
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
