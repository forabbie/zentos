<template>
  <div class="rounded-lg bg-white shadow-md">
    <div class="px-4 pt-4 pb-0 text-black">
      <h2 class="">Net Worth</h2>
      <p class="text-3xl font-bold">$320.023</p>
    </div>
    <apexchart
      height="100"
      type="area"
      :options="total_orders_options"
      :series="total_orders_series"
    ></apexchart>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getCurrentMonthDays } from '@/utils/date'

const monthDays = [...Array(getCurrentMonthDays()).keys()].map((day) => day + 1)

const dataValues1 = ref(monthDays.map(() => Math.floor(Math.random() * 100)))

const total_orders_series = ref([
  { name: 'Income', data: [28, 40, 36, 52, 38, 60, 38, 52, 36, 40] },
])

//Total Orders
const total_orders_options = computed(() => {
  const is_dark = false
  return {
    chart: { sparkline: { enabled: true } },
    stroke: { curve: 'smooth', width: 2 },
    colors: is_dark ? ['#EE5F1A'] : ['#6610f2'],
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    yaxis: { min: 0, show: false },
    grid: { padding: { top: 0, right: 0, bottom: 0, left: 0 } },
    fill: {
      opacity: 1,
      type: 'gradient',
      gradient: {
        type: 'vertical',
        shadeIntensity: 1,
        inverseColors: !1,
        opacityFrom: is_dark ? 0.3 : 0.4,
        opacityTo: 0.05,
        stops: is_dark ? [100, 100] : [45, 100],
      },
    },
    tooltip: { x: { show: false }, theme: 'dark' },
  }
})
</script>
