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
        <div class="card">
          <Transactions v-show="false" />
          <VerticalBar />
        </div>
      </div>
      <div class="flex w-2/5 flex-col gap-4">
        <Expenses />
        <ActivityLog />
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
import ActivityLog from '@/modules/dashboard/ActivityLog.vue'
import VerticalBar from '@/components/charts/VerticalBar.vue'
</script>
