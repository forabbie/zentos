<template>
  <div class="flex flex-col gap-4">
    <div class="">
      <Greetings />
    </div>
    <div class="flex gap-4">
      <div class="flex h-full w-full flex-col gap-4">
        <Finances />
        <div class="flex gap-4">
          <Networth class="w-full" />
          <Savings class="w-full" />
        </div>
        <div v-if="true">
          <Transactions />
        </div>
      </div>
      <div class="card w-2/5">
        <Expenses />
      </div>
    </div>
  </div>
</template>

<script setup>
import Greetings from '@/modules/dashboard/Greetings.vue'
import Finances from '@/modules/dashboard/Finances.vue'
import Spendings from '@/modules/dashboard/Spendings.vue'
import Expenses from '@/modules/dashboard/Expenses.vue'
import Transactions from '@/modules/dashboard/Transactions.vue'
import Balance from '@/modules/dashboard/Balance.vue'
import Savings from '@/modules/dashboard/Savings.vue'
import Networth from '@/modules/dashboard/Networth.vue'
</script>
