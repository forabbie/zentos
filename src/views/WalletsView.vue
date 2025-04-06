<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-4 rounded-xl bg-white pt-4 shadow-sm">
      <h2 class="mx-4 text-xl font-bold">Wallets</h2>
      <TableList />
    </div>
  </div>
</template>

<script setup>
import TableList from '@/modules/wallets/TableList.vue'
</script>
