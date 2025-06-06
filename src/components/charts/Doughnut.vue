<template>
  <div class="flex flex-col justify-center">
    <h2 class="card-title">Expenses</h2>
    <div class="relative">
      <Chart
        ref="chartRef"
        type="doughnut"
        :data="chartData"
        :options="chartOptions"
        class="absolute z-10 mb-8 w-full px-8"
      />
      <div class="absolute top-0 right-0 bottom-0 left-0 flex flex-col items-center justify-center">
        <h3 class="text-2xl font-bold text-gray-800">{{ totalExpense }}</h3>
        <p>Total Expense</p>
      </div>
    </div>
  </div>
  <ul class="list-none overflow-scroll p-0">
    <li
      class="mb-6 flex flex-col border-b border-gray-200 pb-1 md:flex-row md:items-center md:justify-between"
      v-for="item in expenses"
      :key="item.id"
    >
      <div class="flex w-full items-center gap-2">
        <span
          class="size-4 rounded-sm bg-gray-500 md:mb-0"
          :style="{ backgroundColor: item.color }"
        ></span>
        <div class="text-muted-color flex w-full font-medium capitalize">{{ item.head }}</div>
      </div>
      <div class="mt-2 flex items-center md:mt-0">
        <span class="ml-4 font-medium">{{ formatToCurrency(item.totalAmount) ?? 0 }}</span>
      </div>
    </li>
  </ul>
</template>

<script setup>
import Chart from 'primevue/chart'

import { ref, onMounted, computed } from 'vue'

import { formatToCurrency } from '@/utils/helper'
import { currentMonth } from '@/utils/date'

import { useTransactionStore } from '@/stores/transactions.store'

const transactionStore = useTransactionStore()

const transactions = ref(null)

onMounted(async () => {
  await getTransactions({ month: currentMonth, type: 'expense' })
  chartData.value = setChartData()
  chartOptions.value = setChartOptions()
})

const getTransactions = async (month, type) => {
  const data = await transactionStore.getTransactions(month, type)
  transactions.value = data.response
}

const totalExpense = computed(() => {
  return formatToCurrency(transactions.value?.reduce((sum, t) => sum + t.amount, 0)) ?? 0
})

let expenses = null

const calculateCategoryHeadTotals = (transactions) => {
  // Step 1: Group transactions by category head
  const groupedByHead = transactions.reduce((acc, transaction) => {
    const { head } = transaction.category

    if (!acc[head]) {
      acc[head] = []
    }
    acc[head].push(transaction)
    return acc
  }, {})

  // Step 2: Calculate total amount per head and store them in an object
  const headTotals = Object.keys(groupedByHead).map((head) => {
    const transactionsInHead = groupedByHead[head]

    // Calculate total amount for this category head
    const totalAmountForHead = transactionsInHead.reduce(
      (sum, transaction) => sum + transaction.amount,
      0,
    )

    // Build object for each head with the categories within it
    const totalHead = {
      head,
      totalAmount: totalAmountForHead,
      categories: [],
      color: '',
    }

    // Step 3: For each category in the head, calculate its total and add to the totalHead object
    transactionsInHead.forEach((transaction) => {
      const { category } = transaction
      const existingCategory = totalHead.categories.find((c) => c.name === category.name)

      if (existingCategory) {
        existingCategory.totalAmount += transaction.amount
      } else {
        totalHead.categories.push({
          name: category.name,
          totalAmount: transaction.amount,
          color: category.color,
        })
      }
    })

    // Set the head color to the first category's color (or any other logic)
    if (totalHead.categories.length > 0) {
      totalHead.color = totalHead.categories[0].color
    }

    return totalHead
  })

  // Step 4: Calculate the overall total amount
  const overallTotal = transactions.reduce((sum, transaction) => sum + transaction.amount, 0)

  // Step 5: Calculate the percentage for each head based on the overall total
  headTotals.forEach((totalHead) => {
    totalHead.percentage = ((totalHead.totalAmount / overallTotal) * 100).toFixed(2) // Round to two decimals
  })

  return headTotals
}

const chartRef = ref(null)
const chartData = ref(null)
const chartOptions = ref(null)

const setChartData = () => {
  const documentStyle = getComputedStyle(document.body)
  expenses = calculateCategoryHeadTotals(transactions.value)

  const labels = expenses.map((item) => item.head)
  const data = expenses.map((item) => item.totalAmount)

  const backgroundColor =
    expenses.map((item) => item.color) ?? documentStyle.getPropertyValue('--p-gray-500')

  const hoverBackgroundColor =
    expenses.map((item) => item.color) ?? documentStyle.getPropertyValue('--p-gray-400')

  return {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: backgroundColor,
        hoverBackgroundColor: hoverBackgroundColor,
      },
    ],
  }
}

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement)
  const textColor = documentStyle.getPropertyValue('--p-text-black')

  return {
    plugins: {
      legend: false,
      // legend: {
      //   labels: {
      //     point: 'circle',
      //     usePointStyle: true,
      //     color: textColor,
      //   },
      // },
    },
    cutout: '70%',
    spacing: 5,
  }
}
</script>
