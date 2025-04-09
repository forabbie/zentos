<template>
  <div class="flex items-end justify-between">
    <div class="flex flex-col">
      <h2 class="text-xl font-bold">Overview</h2>
      <p>Get summary of your monthly online transactions here.</p>
    </div>
    <div class="flex justify-center">
      <DatePicker
        v-model="date"
        showIcon
        fluid
        iconDisplay="input"
        view="month"
        dateFormat="MM, yy"
        :manualInput="false"
        pt:pcInputText:root="!bg-indigo-500 hover:!bg-indigo-600 !border-transparent cursor-pointer !text-sm"
        pt:inputIcon="text-white"
        pt:panel="!text-sm"
      >
        <template #root="slotProps">
          <Button class="p-0" aria-label="Months" @click="slotProps.clickCallback">
            <span>{{ date }}</span>
          </Button>
        </template>
      </DatePicker>
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button'
import DatePicker from 'primevue/datepicker'

import { computed, ref, watch } from 'vue'

import { convertToMonthYear } from '@/utils/date'

import { useGlobalStore } from '@/stores/global.store'

const globalStore = useGlobalStore()

const date = ref(globalStore.selectedDate)

watch(date, (newVal) => {
  globalStore.selectedDate = convertToMonthYear(newVal)
})
</script>
