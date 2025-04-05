<template>
  <header class="h-fit w-full">
    <div class="px-4 py-2.5">
      <div
        class="flex h-[40px] items-center justify-between gap-2 rounded-lg bg-[url(/images/header-bg.svg)] bg-cover bg-left-top bg-no-repeat px-4 py-2"
      >
        <div class="page-title flex items-center gap-2">
          <i class="text-white" style="font-size: 1rem" aria-hidden="true">
            <component :is="activeItem.icon" />
          </i>
          <h1 class="text-base font-bold text-white">{{ activeItem.label }}</h1>
        </div>
      </div>
    </div>
    <BaseDivider />
  </header>
</template>

<script setup>
import BaseDivider from '@/components/common/BaseDivider.vue'
import IconDashboard from '@/components/icons/IconDashboard.vue'
import IconSwapHorizontal from '@/components/icons/IconSwapHorizontal.vue'
import WalletIcon from '@/components/icons/IconWallet.vue'

import { markRaw, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

const items = [
  {
    label: 'Dashboard',
    icon: markRaw(IconDashboard),
  },
  {
    label: 'Transactions',
    icon: markRaw(IconSwapHorizontal),
  },
  {
    label: 'Wallets',
    icon: markRaw(WalletIcon),
  },
]

const activeItem = ref(items[0])

const route = useRoute()

watchEffect(() => {
  if (!route.name) {
    return
  }
  const active = items.find((item) => item?.label.toLowerCase() === route?.name.toLowerCase())
  if (active) {
    activeItem.value = active
  }
})
</script>
