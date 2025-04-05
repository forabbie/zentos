<template>
  <apexchart type="area" :options="chartOptions" :series="series" height="120"></apexchart>
</template>

<script setup>
import { ref } from 'vue'
import { getCurrentMonthDays } from '@/utils/date'

const monthDays = [...Array(getCurrentMonthDays()).keys()].map((day) => day + 1)

const dataValues1 = ref([78, 24, 61, 94])
const dataValues2 = ref(monthDays.map(() => Math.floor(Math.random() * 100)))

const series = ref([
  {
    type: 'area',
    name: 'Spent',
    data: dataValues1.value,
  },
  {
    type: 'line',
    name: 'Average',
    data: dataValues2.value,
  },
])

const chartOptions = ref({
  chart: {
    type: 'area',
    sparkline: {
      enabled: true,
    },
  },
  stroke: { show: true, curve: 'smooth', width: 2, lineCap: 'square' },
  dropShadow: { enabled: true, opacity: 0.2, blur: 10, left: -7, top: 22 },
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  legend: {
    position: 'top',
    horizontalAlign: 'left',
    offsetY: 0,
    fontSize: '16px',
    fontFamily: 'Nunito, sans-serif',
    markers: {
      width: 10,
      height: 10,
      strokeWidth: 0,
      strokeColor: '#000',
      fillColors: undefined,
      radius: 12,
      onClick: undefined,
      offsetX: 0,
      offsetY: 0,
    },
    itemMargin: { horizontal: 20, vertical: 5 },
  },
  fill: {
    opacity: 1,
    // type: 'gradient',
    // gradient: {
    //   type: 'vertical',
    //   shadeIntensity: 1,
    //   inverseColors: !1,
    //   opacityFrom: 0.3,
    //   opacityTo: 0.1,
    //   stops: [45, 100],
    // },
  },
  xaxis: {
    crosshairs: {
      width: 0,
    },
    categories: monthDays,
    axisBorder: { show: false },
    axisTicks: { show: false },
    crosshairs: { show: true },
    labels: {
      offsetX: 0,
      offsetY: 5,
      style: {
        fontSize: '12px',
        fontFamily: 'Nunito, sans-serif',
        cssClass: 'apexcharts-xaxis-title',
      },
    },
  },
  yaxis: {
    min: 0,
  },
  title: {
    text: '$135,965',
    offsetX: 0,
    style: {
      fontSize: '24px',
    },
  },
  subtitle: {
    text: 'Net Worth',
    offsetX: 0,
    style: {
      fontSize: '14px',
    },
  },
  tooltip: { theme: 'dark', marker: { show: true }, x: { show: false } },
})
</script>
