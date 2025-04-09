<template>
  <div class="widget widget-active-log card">
    <div class="mb-6 flex items-center justify-between">
      <h2 class="card-title">Activity Log</h2>
      <RouterLink to="/transactions" class="flex items-center gap-2 text-sm hover:text-indigo-500">
        View All
        <i class="pi pi-arrow-circle-right"></i>
      </RouterLink>
    </div>
    <div class="h-full max-h-75 min-h-75 !overflow-auto">
      <div v-if="transactions.length <= 0" class="flex min-h-75 items-center justify-center">
        <div class="mb-10 text-center text-base text-[#7086A4]">No transaction found.</div>
      </div>
      <Timeline
        v-else
        :value="transactions"
        class="customized-timeline"
        pt:root="custom-timeline "
        pt:eventopposite="custom-timeline-eventopposite !hidden"
        pt:eventconnector="custom-timeline-eventconnector !bg-gray-500"
      >
        <template #marker="slotProps">
          <span
            class="z-10 flex h-8 w-8 items-center justify-center rounded-full text-white shadow-sm"
            :class="[returnColor(slotProps.item?.category.appearance.color).bg]"
          >
            <i
              :class="[
                returnIcon(slotProps.item.type),
                returnColor(slotProps.item?.category.appearance.color).text,
              ]"
            ></i>
          </span>
        </template>
        <template #content="slotProps">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-sm font-semibold">{{ slotProps.item.category?.name }}</div>
              <small class="text-xs">{{ convertDateToWords(slotProps.item.date) }}</small>
            </div>
            <div class="text-md">
              {{ formatToCurrency(slotProps.item.amount) }}
            </div>
          </div>
        </template>
      </Timeline>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'

import Timeline from 'primevue/timeline'

import { returnColor } from '@/utils/styles'
import { convertDateToWords } from '@/utils/date'
import { formatToCurrency } from '@/utils/format'

import { useGlobalStore } from '@/stores/global.store'
import { useTransactionStore } from '@/stores/transactions.store'

const globalStore = useGlobalStore()
const transactionStore = useTransactionStore()

const transactions = ref([])
const selectedDate = computed(() => globalStore.selectedDate)

watch(selectedDate, async () => {
  await getTransactions({ month: selectedDate.value })
})

onMounted(async () => {
  await getTransactions({ month: selectedDate.value })
})

const getTransactions = async (month) => {
  const data = await transactionStore.getTransactions(month)
  transactions.value = data.response
}

const events = ref([
  {
    status: 'Ordered',
    date: '15/10/2020 10:30',
    icon: 'pi pi-shopping-cart',
    color: '#9C27B0',
    image: 'game-controller.jpg',
  },
  { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
  { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
  { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' },
])

const returnIcon = (key) => {
  switch (key) {
    case 'expense':
      return 'pi pi-shopping-cart'
      break

    default:
      return 'pi pi-check'
  }
}
</script>
