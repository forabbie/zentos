<template>
  <div>
    <apexchart
      height="350"
      type="bar"
      :options="unique_visitor_options"
      :series="unique_visitor_series"
    ></apexchart>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const unique_visitor_series = ref([
  { name: 'Direct', data: [58, 44, 55, 57, 56, 61, 58, 63, 60, 66, 56, 63] },
  { name: 'Organic', data: [91, 76, 85, 101, 98, 87, 105, 91, 114, 94, 66, 70] },
])
const unique_visitor_options = computed(() => {
  const is_dark = false
  return {
    chart: { toolbar: { show: false } },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ['transparent'] },
    colors: ['#5c1ac3', '#ffbb44'],
    dropShadow: { enabled: true, opacity: 0.3, blur: 1, left: 1, top: 1, color: '#515365' },
    plotOptions: { bar: { horizontal: false, columnWidth: '55%', borderRadius: 10 } },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '14px',
      markers: { width: 12, height: 12 },
      itemMargin: { horizontal: 0, vertical: 8 },
    },
    grid: { borderColor: is_dark ? '#191e3a' : '#e0e6ed' },
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      axisBorder: { show: true, color: is_dark ? '#3b3f5c' : '#e0e6ed' },
    },
    yaxis: {
      tickAmount: 6,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: is_dark ? 'dark' : 'light',
        type: 'vertical',
        shadeIntensity: 0.3,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 0.8,
        stops: [0, 100],
      },
    },
    tooltip: {
      theme: is_dark ? 'dark' : 'light',
      y: {
        formatter: function (val) {
          return val
        },
      },
    },
  }
})
</script>
