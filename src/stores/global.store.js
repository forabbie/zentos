import { ref } from 'vue'
import { defineStore } from 'pinia'

import { convertToMonthYear } from '@/utils/date'

export const useGlobalStore = defineStore('global', () => {
  const now = new Date()
  const formattedDate = now.toLocaleDateString('en-PH')

  const selectedDate = ref(convertToMonthYear(now))

  return { now, formattedDate, selectedDate }
})
