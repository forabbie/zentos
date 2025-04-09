<template>
  <div class="flex w-full gap-4">
    <div class="card flex w-full items-center gap-4" v-for="item in items" :key="item.label">
      <div :class="[item.bg, 'rounded-xl p-2.5']">
        <component class="size-10" :is="item.icon" />
      </div>
      <div :class="{ 'text-red-500': false }">
        <h2 class="text-2xl font-semibold">{{ formatToCurrency(item.balance) ?? 0 }}</h2>
        <p class="text-xs text-gray-500 uppercase">{{ item.label }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import IconIncome from '@/components/icons/IconIncome.vue'
import IconExpense from '@/components/icons/IconExpense.vue'
import IconSpentLeft from '@/components/icons/IconSpentLeft.vue'
import { computed, markRaw, ref, onMounted, watch } from 'vue'
import { formatToCurrency } from '@/utils/format'

import { useTransactionStore } from '@/stores/transactions.store'
import { useGlobalStore } from '@/stores/global.store'

const globalStore = useGlobalStore()
const transactionStore = useTransactionStore()

const transExpense = ref(null)
const transIncome = ref(null)

const selectedDate = computed(() => globalStore.selectedDate)

watch(selectedDate, async () => {
  transExpense.value = await getTransactions({ month: selectedDate.value, type: 'expense' })
  transIncome.value = await getTransactions({ month: selectedDate.value, type: 'income' })
})

onMounted(async () => {
  transExpense.value = await getTransactions({ month: selectedDate.value, type: 'expense' })
  transIncome.value = await getTransactions({ month: selectedDate.value, type: 'income' })
})

const getTransactions = async (month, type) => {
  const data = await transactionStore.getTransactions(month, type)
  return data.response
}

const expence = computed(() => {
  return transExpense.value?.reduce((sum, t) => sum + t.amount, 0) ?? 0
})

const income = computed(() => {
  return transIncome.value?.reduce((sum, t) => sum + t.amount, 0) ?? 0
})

const left = computed(() => {
  return income.value - expence.value
})

const items = computed(() => [
  {
    label: 'income',
    icon: markRaw(IconIncome),
    balance: income.value,
    bg: 'bg-indigo-100/50',
  },
  {
    label: 'expense',
    icon: markRaw(IconExpense),
    balance: expence.value,
    bg: 'bg-purple-100/50',
  },
  {
    label: 'left',
    icon: markRaw(IconSpentLeft),
    balance: left.value,
    bg: 'bg-green-100/50',
  },
])
</script>
