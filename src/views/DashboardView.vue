<template>
  <div class="flex flex-col gap-4">
    <div class="">
      <Greetings />
    </div>
    <div class="flex gap-4">
      <div class="flex h-full w-full flex-col gap-4">
        <Finances />
        <div class="hidden gap-4">
          <Balance class="card w-full" />
          <Balance class="card w-full" />
        </div>
        <div class="card">
          <Spendings />
        </div>
      </div>
      <div class="card w-1/3">
        <Expenses />
      </div>
      <!-- <div class="col-span-1 row-span-3">
        <Expenses />
      </div>
      <div class="col-span-3">
        <Transactions />
      </div>
      <div class="card col-span-1">
        <Spendings />
      </div> -->
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
</script>
