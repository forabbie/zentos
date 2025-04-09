<template>
  <div class="flex flex-col gap-4">
    <div class="">
      <Greetings />
    </div>
    <div class="flex gap-4">
      <div class="flex h-full w-full flex-col gap-4">
        <AccountOverview />
        <div class="flex gap-4">
          <Savings class="w-full" />
          <TotalBalance class="w-full" />
        </div>
        <div class="card">
          <Transactions />
        </div>
      </div>
      <div class="flex w-2/5 flex-col gap-4">
        <ExpensesChart />
        <ActivityLog />
      </div>
    </div>
  </div>
</template>

<script setup>
import Greetings from '@/modules/dashboard/Greetings.vue'
import AccountOverview from '@/modules/dashboard/AccountOverview.vue'
import ExpensesChart from '@/modules/dashboard/ExpensesChart.vue'
import Transactions from '@/modules/dashboard/Transactions.vue'
import TotalBalance from '@/modules/dashboard/TotalBalance.vue'
import Savings from '@/modules/dashboard/Savings.vue'
import ActivityLog from '@/modules/dashboard/ActivityLog.vue'
</script>
