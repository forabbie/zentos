<template>
  <div class="card flex h-full min-h-101 flex-col justify-start">
    <h2 class="card-title">Expenses</h2>
    <div v-if="transactions.length <= 0" class="flex h-full items-center justify-center">
      <div class="mb-10 text-center text-base text-[#7086A4]">No data found.</div>
    </div>
    <apexchart
      v-else
      type="donut"
      height="360"
      :options="expensesDonutOptions"
      :series="expensesDonutSeries"
    ></apexchart>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'

import { formatToCurrency } from '@/utils/format'

import { useGlobalStore } from '@/stores/global.store'
import { useTransactionStore } from '@/stores/transactions.store'

const globalStore = useGlobalStore()
const transactionStore = useTransactionStore()

const expensesDonutSeries = ref([])
const expensesDonutOptions = ref({})

const transactions = ref([])
const selectedDate = computed(() => globalStore.selectedDate)

watch(selectedDate, async () => {
  await getTransactions({ month: selectedDate.value, type: 'expense' })
  plotChartData()
  plotChartOptions()
})

onMounted(async () => {
  await getTransactions({ month: selectedDate.value, type: 'expense' })
  plotChartData()
  plotChartOptions()
})

const getTransactions = async (month) => {
  const data = await transactionStore.getTransactions(month)
  transactions.value = data.response
}

const plotChartData = () => {
  expensesDonutSeries.value = setChartData().data
}

const plotChartOptions = () => {
  let option = {
    chart: {},
    dataLabels: { enabled: false },
    expandOnClick: false,
    stroke: { show: true, width: 15, colors: '#fff' },
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '14px',
      markers: { width: 10, height: 10 },
      height: 50,
      offsetY: -20,
      itemMargin: { horizontal: 8, vertical: 0 },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          background: 'transparent',
          labels: {
            show: true,
            name: { show: true, fontSize: '29px', fontFamily: 'Nunito, sans-serif', offsetY: -20 },
            value: {
              show: true,
              fontSize: '26px',
              fontFamily: 'Nunito, sans-serif',
              color: '#000',
              offsetY: 0,
              formatter: function (val) {
                return formatToCurrency(val)
              },
            },
            total: {
              show: true,
              label: 'Total',
              color: '#888ea8',
              fontSize: '19px',
              formatter: function (w) {
                const total = w.globals.seriesTotals.reduce((a, b) => a + b, 0)
                return formatToCurrency(total)
              },
            },
          },
        },
      },
    },
    labels: setChartData().labels,
  }
  expensesDonutOptions.value = option
}

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
    const capitalizedWord = head.charAt(0).toUpperCase() + head.slice(1)

    const totalHead = {
      head: capitalizedWord, // Capitalize the head label
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
          color: category.appearance.color,
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

const setChartData = () => {
  let expenses = calculateCategoryHeadTotals(transactions.value)

  const labels = expenses.map((item) => item.head)
  const data = expenses.map((item) => item.totalAmount)

  return {
    labels: labels,
    data: data,
  }
}
</script>
