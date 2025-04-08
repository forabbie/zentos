<template>
  <div class="card flex justify-end dark:!bg-[#2c2c40] dark:text-text-dark">
    <Paginator
      :rows="rows"
      :totalRecords="totalRecords"
      :rowsPerPageOptions="rowsPerPageOptions"
      @page="onPage"
      :template="paginationTemplate"
      :currentPageReportTemplate="currentPageReportTemplate"
      :ptOptions="ptOptions"
      :pt="preset"
    >
      <template #start v-if="isShow">
        <span class="text-[11px] text-[#232327] dark:text-text-dark">Show</span>
      </template>
      <template #previcon>
        <font-awesome-icon icon="play" rotation="180" class="icon-small dark:text-text-dark" />
      </template>
      <template #nexticon>
        <font-awesome-icon icon="play" class="icon-small dark:text-text-dark" />
      </template>
    </Paginator>
  </div>
</template>

<script setup>
import Paginator from 'primevue/paginator'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBackward, faPlay, faForward } from '@fortawesome/free-solid-svg-icons'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'

library.add(faBackward, faPlay, faForward)

defineProps({
  rows: {
    type: Number,
    required: true
  },
  totalRecords: {
    type: Number,
    required: true
  },
  rowsPerPageOptions: {
    type: Array,
    default: () => [20, 50, 100]
  },
  onPage: {
    type: Function,
    required: true
  }
})

const currentPageReportTemplate = '{first} to {last} of {totalRecords}'
const paginationTemplate = ref()
const isShow = ref()
const ptOptions = { mergeSections: true, mergeProps: true }
const route = useRoute()

const preset = {
  root: {
    class: ['dark:!bg-container-dark']
  },
  first: () => ({ class: '!min-w-7 !h-7 !m-1' }),
  prev: ({ context }) => ({
    class: [
      '!min-w-6 !h-6 !m-1 dark:!rounded-full'
      // {
      //   'hover:bg-surface-50 dark:hover:bg-surface-700/70': !context.disabled,
      //   'focus:outline-none focus:outline-offset-0 focus:!ring-0 focus:!none dark:focus:!none':
      //     !context.disabled
      // }
    ]
  }),
  last: () => ({ class: '!min-w-7 !h-7 !m-1' }),
  next: ({ context }) => ({
    class: [
      '!min-w-6 !h-6 !m-1 dark:!rounded-full'
      // {
      //   'hover:bg-surface-50 dark:hover:bg-surface-700/70': !context.disabled,
      //   'focus:outline-none focus:outline-offset-0 focus:!ring-0 focus:!none dark:focus:!none':
      //     !context.disabled
      // }
    ]
  }),
  contentStart: '!mr-5 !text-sm',
  contentEnd: 'ml-auto',
  content: '!text-sm !text-center !items-center !flex text-[#232327] dark:text-text-dark'
}

const routeChange = (routes) => {
  if (routes.fullPath === '/calendar') {
    isShow.value = false
    preset.content = '!text-sm !text-center !mx-[-23.5px] !items-center !flex'
    paginationTemplate.value = 'PrevPageLink CurrentPageReport NextPageLink'
  } else {
    isShow.value = true
    paginationTemplate.value = 'RowsPerPageDropdown PrevPageLink CurrentPageReport NextPageLink'
  }

  if (routes.fullPath === '/dashboard') {
    isShow.value = false
    preset.content = '!text-sm !text-center !mx-[-23.5px] !items-center !flex'
    paginationTemplate.value = 'PrevPageLink CurrentPageReport NextPageLink'
  }
}

onMounted(() => {
  routeChange(route)
})
</script>

<style scoped>
:deep(.icon-small) {
  /* font-size: small; */
  @apply text-[11px];
}

:deep(:disabled[data-pc-section='next']),
:deep(:disabled[data-pc-section='prev']) {
  @apply !text-[#ADB9D8];
}

:deep([data-pc-section='next']),
:deep([data-pc-section='prev']) {
  @apply !text-[#232327];
}

:deep([data-pc-name='pcrowperpagedropdown']) {
  @apply !max-h-7 !max-w-24 !items-center;
}
:deep([data-pc-section='label']) {
  @apply text-xs leading-none;
}
:deep([data-pc-section='dropdown']) {
  @apply h-8 w-10;
}
:deep([data-pc-section='paginatorcontainer'] div) {
  @apply py-0;
}
:deep([data-pc-section='current']) {
  @apply text-[11px];
}
:deep([data-pc-group-section='pagedropdown'] span) {
  @apply text-[11px];
}
:deep([data-pc-section='listcontainer']) {
  @apply !text-[11px];
}
:deep([data-pc-name='pcrowperpagedropdown']) {
  @apply !max-h-7 !max-w-24 !items-center !rounded dark:!border-[#4f4f73] dark:!bg-[#222333];
}
</style>
<style>
[data-pc-section='list'] {
  @apply !rounded-lg !pb-[10px] !pt-[10px] text-[11px] dark:!border-[#4f4f73] dark:!bg-[#222333];
}
[data-pc-section='overlay'] {
  @apply !mt-[8px] dark:!border-[#4f4f73];
}
</style>
