<template>
  <div>
    <div class="mb-6 flex items-center justify-between">
      <h2 class="card-title">Transactions</h2>
      <div>
        <Button
          icon="pi pi-ellipsis-v"
          class="p-button-text p-button-plain p-button-rounded"
          @click="$refs.menu.toggle($event)"
        ></Button>
        <Menu ref="menu" popup :model="items" class="!min-w-40"></Menu>
      </div>
    </div>
    <div class="h-32 overflow-y-auto">
      <span class="mb-4 block font-medium text-gray-500">TODAY</span>
      <ul class="mx-0 mt-0 mb-6 list-none p-0">
        <li class="border-surface flex items-center py-2">
          <div
            class="mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-400/10"
          >
            <i class="pi pi-dollar !text-xl text-blue-500"></i>
          </div>
          <span class="flex w-full items-center justify-between">
            <div class="">
              <h3 class="text-lg leading-5 font-bold">dasd</h3>
              <p class="leading-5 text-slate-500">asdap</p>
            </div>
            <span class="text-xl font-bold">$79.00</span>
          </span>
        </li>
      </ul>
    </div>
    <div class="flex items-center justify-center">
      <button type="button" class="flex gap-2">
        <span>View All</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-arrow-right"
        >
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const menu = ref(null)

const items = ref([
  { label: 'Add New', icon: 'pi pi-fw pi-plus' },
  { label: 'Remove', icon: 'pi pi-fw pi-trash' },
])
</script>
