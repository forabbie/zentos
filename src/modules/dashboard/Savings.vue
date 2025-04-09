<template>
  <div class="rounded-lg bg-white shadow-md">
    <div class="px-4 pt-4 pb-0 text-black">
      <h2 class="">Total Savings</h2>
      <p class="text-3xl font-bold">{{ formatToCurrency(savings) }}</p>
    </div>
    <apexchart
      v-if="savingsOptions"
      height="120"
      type="area"
      :options="savingsOptions"
      :series="savingsSeries"
    ></apexchart>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

import { formatToCurrency } from '@/utils/format'

import { useGlobalStore } from '@/stores/global.store'
import { useTransactionStore } from '@/stores/transactions.store'
import { useWalletStore } from '@/stores/wallets.store'

const globalStore = useGlobalStore()
const transactionStore = useTransactionStore()
const walletStore = useWalletStore()

const savingsSeries = ref([])
const savingsOptions = ref(null)

const transIncome = ref([])
const savingsList = ref(null)

const selectedDate = computed(() => globalStore.selectedDate)

watch(selectedDate, async () => {
  await getTransactions({ month: selectedDate.value, type: 'income' })
  plotChartData()
  plotChartOptions()
})

onMounted(async () => {
  await getTransactions({ month: selectedDate.value, type: 'income' })
  savingsList.value = await getWallets({ type: 'savings' })
  console.log(savingsList.value)

  plotChartData()
  plotChartOptions()
})

const getTransactions = async (month) => {
  const data = await transactionStore.getTransactions(month)
  transIncome.value = data.response
}

const getWallets = async (type) => {
  const data = await walletStore.getWallets(type)
  return data.response
}

const plotChartData = () => {
  const dailyIncomeMap = {}

  transIncome.value.forEach((transaction) => {
    const transactionDate = new Date(transaction.date)
    const dateKey = transactionDate.toISOString().split('T')[0]

    if (!dailyIncomeMap[dateKey]) {
      dailyIncomeMap[dateKey] = 0
    }
    dailyIncomeMap[dateKey] += transaction.amount
  })

  const monthStart = new Date(selectedDate.value)
  const monthEnd = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0)
  const allDaysInMonth = []

  for (let day = 1; day <= monthEnd.getDate(); day++) {
    const dayString = `${monthStart.getFullYear()}-${String(monthStart.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    allDaysInMonth.push(dayString)
  }

  const incomeData = allDaysInMonth.map((day) => dailyIncomeMap[day] || 0)

  savingsSeries.value = [{ name: 'Income', data: incomeData }]
}

const plotChartOptions = () => {
  savingsOptions.value = {
    chart: { sparkline: { enabled: true } },
    stroke: { curve: 'smooth', width: 2 },
    colors: ['#6610f2'],
    yaxis: { min: 0, show: false },
    grid: { padding: { top: 0, right: 0, bottom: 0, left: 0 } },
    fill: {
      opacity: 1,
      type: 'gradient',
      gradient: {
        type: 'vertical',
        shadeIntensity: 1,
        inverseColors: !1,
        opacityFrom: 0.4,
        opacityTo: 0.5,
        stops: [45, 100],
      },
    },
    tooltip: { x: { show: false }, theme: 'dark' },
  }
}

const income = computed(() => {
  return transIncome.value?.reduce((sum, t) => sum + t.amount, 0) ?? 0
})

const savings = computed(() => {
  return savingsList.value?.reduce((sum, t) => sum + t.balance, 0) ?? 0
})
</script>
