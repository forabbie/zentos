<template>
  <header class="h-fit w-full">
    <div class="px-4 py-2.5">
      <div
        class="flex h-[40px] items-center justify-between gap-2 rounded-lg bg-[url(/images/header-bg.svg)] bg-cover bg-left-top bg-no-repeat px-4 py-2"
      >
        <div class="page-title flex items-center gap-2">
          <i class="pi pi-chart-bar text-white" style="font-size: 1rem" aria-hidden="true"></i>
          <h1 class="text-base font-bold text-white">Dashboard</h1>
        </div>
      </div>
    </div>
    <BaseDivider />
  </header>
</template>

<script setup>
import BaseDivider from '@/components/common/BaseDivider.vue'
</script>
