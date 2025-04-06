<template>
  <aside class="flex">
    <div class="nav-content">
      <!-- Logo Section -->
      <section class="w-full">
        <div class="logo-wrapper">
          <img src="/logo.svg" alt="Company Logo" class="logo" height="40" width="40" />
        </div>
        <BaseDivider />
      </section>

      <!-- Navigation -->
      <nav class="nav p-2.5" role="navigation" aria-label="Main menu">
        <ul class="flex w-full flex-col gap-2">
          <li v-for="item in routes" :key="item.label" class="nav-item">
            <router-link
              :to="item.route"
              class="link group"
              :aria-label="item.label"
              active-class="router-link-active"
            >
              <div
                class="icon-wrapper group-hover:bg-indigo-100/25 group-hover:shadow-sm group-hover:shadow-indigo-300/25"
              >
                <i aria-hidden="true" class="group-hover:text-indigo-600">
                  <component :is="item.icon" />
                </i>
              </div>
              <span class="label text-2xs group-hover:text-indigo-600">{{ item.label }}</span>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Vertical Divider -->
    <BaseDivider layout="vertical" />
  </aside>
</template>

<script setup>
import BaseDivider from '@/components/common/BaseDivider.vue'
import IconDashboard from '@/components/icons/IconDashboard.vue'
import IconSwapHorizontal from '@/components/icons/IconSwapHorizontal.vue'
import IconWallet from '@/components/icons/IconWallet.vue'
import { markRaw } from 'vue'

const routes = [
  {
    label: 'Dashboard',
    icon: markRaw(IconDashboard),
    route: '/dashboard',
  },
  {
    label: 'Activities',
    icon: markRaw(IconSwapHorizontal),
    route: '/transactions',
  },
  {
    label: 'Wallets',
    icon: markRaw(IconWallet),
    route: '/wallets',
  },
]
</script>

<style scoped>
@reference "tailwindcss";

.logo-wrapper {
  @apply m-2.5 flex items-center justify-center;
}

.nav-content > .nav {
  @apply flex flex-col items-center;
}

i {
  @apply size-5 group-hover:scale-125;
  display: flex;
  place-items: center;
  place-content: center;
}

.nav-item > .link {
  @apply flex flex-col items-center justify-center focus:outline-none focus-visible:ring-0;
}

.link > .icon-wrapper {
  @apply flex items-center justify-center rounded-xl p-2.5;
}

.link > .label {
  @apply mt-1 font-semibold;
}

.router-link-active {
  @apply text-indigo-600;
}

.router-link-active .icon-wrapper {
  @apply bg-indigo-100/25 shadow-sm shadow-indigo-400/25;
}

.router-link-active i {
  @apply scale-125;
}
</style>
