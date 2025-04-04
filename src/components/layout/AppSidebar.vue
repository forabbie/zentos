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
            <RouterLink :to="item.route" class="link group" :aria-label="item.label">
              <div class="icon-wrapper group-hover:bg-indigo-400/25">
                <i aria-hidden="true">
                  <component :is="item.icon" />
                </i>
              </div>
              <span class="label text-2xs">{{ item.label }}</span>
            </RouterLink>
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
import WalletIcon from '@/components/icons/IconWallet.vue'
import { ref } from 'vue'

const routes = ref([
  {
    label: 'Dashboard',
    icon: IconDashboard,
    route: '/dashboard',
  },
  {
    label: 'Activity',
    icon: IconSwapHorizontal,
    route: '/',
  },
  {
    label: 'Wallet',
    icon: WalletIcon,
    route: '/',
  },
])
</script>

<style scoped>
@reference "tailwindcss";

.text-2xs {
  font-size: 0.5em;
}

.logo-wrapper {
  @apply m-2.5 flex items-center justify-center;
}

.nav-content > .nav {
  @apply flex flex-col items-center;
}

i {
  @apply size-4.5 group-hover:scale-125;
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
</style>
