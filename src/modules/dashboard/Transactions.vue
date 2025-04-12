<template>
  <div>
    <div class="mb-6 flex items-center justify-between">
      <h2 class="card-title">Transactions</h2>
      <RouterLink to="/transactions" class="flex items-center gap-2 text-sm hover:text-indigo-500">
        View All
        <i class="pi pi-arrow-circle-right"></i>
      </RouterLink>
    </div>
    <div v-if="loading" class="flex h-[350px] items-center justify-center">
      <i class="pi pi-spin pi-spinner text-2xl text-indigo-500"></i>
    </div>
    <apexchart
      v-else
      height="350"
      type="bar"
      :options="transactionOption"
      :series="transactionSeries"
    ></apexchart>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useTransactionStore } from '@/stores/transactions.store'
import { useGlobalStore } from '@/stores/global.store'

const globalStore = useGlobalStore()
const transactionStore = useTransactionStore()

const transExpense = ref([])
const transIncome = ref([])

const transactionSeries = ref([])
const allDaysInMonth = ref([])
const categories = ref([])

const loading = ref(false)
const selectedDate = computed(() => globalStore.selectedDate)

const getTransactions = async (month, type) => {
  const data = await transactionStore.getTransactions(month, type)
  return data.response
}

const fetchTransactions = async () => {
  loading.value = true
  try {
    const [expense, income] = await Promise.all([
      getTransactions({ month: selectedDate.value, type: 'expense' }),
      getTransactions({ month: selectedDate.value, type: 'income' }),
    ])
    transExpense.value = expense
    transIncome.value = income
    plotTransactionData()
  } catch (error) {
    console.error('Error fetching transactions:', error)
  } finally {
    loading.value = false
  }
}

onMounted(fetchTransactions)
watch(selectedDate, fetchTransactions)

const plotTransactionData = () => {
  const dailyIncomeMap = {}
  const dailyExpenseMap = {}

  transIncome.value.forEach((t) => {
    const dateKey = new Date(t.date).toISOString().split('T')[0]
    dailyIncomeMap[dateKey] = (dailyIncomeMap[dateKey] || 0) + t.amount
  })

  transExpense.value.forEach((t) => {
    const dateKey = new Date(t.date).toISOString().split('T')[0]
    dailyExpenseMap[dateKey] = (dailyExpenseMap[dateKey] || 0) + t.amount
  })

  const monthStart = new Date(selectedDate.value)
  const monthEnd = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0)

  allDaysInMonth.value = []
  categories.value = []

  for (let day = 1; day <= monthEnd.getDate(); day++) {
    const dayString = `${monthStart.getFullYear()}-${String(monthStart.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    allDaysInMonth.value.push(dayString)
    categories.value.push(String(day).padStart(2, '0'))
  }

  const incomeData = allDaysInMonth.value.map((day) => dailyIncomeMap[day] || 0)
  const expenseData = allDaysInMonth.value.map((day) => dailyExpenseMap[day] || 0)

  const filteredIncomeData = []
  const filteredExpenseData = []
  const filteredCategories = []

  allDaysInMonth.value.forEach((day, index) => {
    if (incomeData[index] !== 0 || expenseData[index] !== 0) {
      filteredIncomeData.push(incomeData[index])
      filteredExpenseData.push(expenseData[index])
      filteredCategories.push(categories.value[index])
    }
  })

  transactionSeries.value = [
    { name: 'Income', data: filteredIncomeData },
    { name: 'Expense', data: filteredExpenseData },
  ]
  categories.value = filteredCategories
}

const transactionOption = computed(() => ({
  chart: { toolbar: { show: false } },
  dataLabels: { enabled: false },
  stroke: { show: true, width: 2, colors: ['transparent'] },
  colors: ['#5c1ac3', '#ffbb44'],
  dropShadow: { enabled: true, opacity: 0.3, blur: 1, left: 1, top: 1, color: '#515365' },
  plotOptions: { bar: { horizontal: false, columnWidth: '60%', borderRadius: 8 } },
  legend: {
    position: 'bottom',
    horizontalAlign: 'center',
    fontSize: '14px',
    markers: { width: 12, height: 12 },
    itemMargin: { horizontal: 0, vertical: 8 },
  },
  grid: { borderColor: '#e0e6ed' },
  xaxis: {
    categories: categories.value,
    axisBorder: { show: true, color: '#e0e6ed' },
  },
  yaxis: { tickAmount: 6 },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'light',
      type: 'vertical',
      shadeIntensity: 0.3,
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 0.9,
      stops: [0, 100],
    },
  },
  tooltip: {
    theme: 'light',
    y: {
      formatter: (val) => val,
    },
  },
}))
</script>
