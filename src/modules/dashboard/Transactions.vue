<script setup>
import Menu from 'primevue/menu'
import Button from 'primevue/button'

import { ref } from 'vue'

const menu = ref(null)

const items = ref([
  { label: 'Add New', icon: 'pi pi-fw pi-plus' },
  { label: 'Remove', icon: 'pi pi-fw pi-trash' },
])
</script>

<template>
  <div class="card">
    <div class="mb-6 flex items-center justify-between">
      <div class="text-xl font-semibold">Transactions</div>
      <div>
        <Button
          icon="pi pi-ellipsis-v"
          class="p-button-text p-button-plain p-button-rounded"
          @click="$refs.menu.toggle($event)"
        ></Button>
        <Menu ref="menu" popup :model="items" class="!min-w-40"></Menu>
      </div>
    </div>
    <ul class="m-0 list-none p-0">
      <li class="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <span class="dark:text-gray-0 mr-2 mb-1 font-medium text-gray-900 md:mb-0"
            >Space T-Shirt</span
          >
          <div class="text-muted-color mt-1">Clothing</div>
        </div>
        <div class="mt-2 flex items-center md:mt-0">
          <div class="w-40 overflow-hidden rounded bg-gray-300 lg:w-24" style="height: 8px">
            <div class="h-full bg-orange-500" style="width: 50%"></div>
          </div>
          <span class="ml-4 font-medium text-orange-500">%50</span>
        </div>
      </li>
      <!-- <li class="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <span class="dark:text-gray-0 mr-2 mb-1 font-medium text-gray-900 md:mb-0"
            >Portal Sticker</span
          >
          <div class="text-muted-color mt-1">Accessories</div>
        </div>
        <div class="mt-2 ml-0 flex items-center md:mt-0 md:ml-20">
          <div class="w-40 overflow-hidden rounded bg-gray-300 lg:w-24" style="height: 8px">
            <div class="h-full bg-cyan-500" style="width: 16%"></div>
          </div>
          <span class="ml-4 font-medium text-cyan-500">%16</span>
        </div>
      </li>
      <li class="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <span class="dark:text-gray-0 mr-2 mb-1 font-medium text-gray-900 md:mb-0"
            >Supernova Sticker</span
          >
          <div class="text-muted-color mt-1">Accessories</div>
        </div>
        <div class="mt-2 ml-0 flex items-center md:mt-0 md:ml-20">
          <div class="w-40 overflow-hidden rounded bg-gray-300 lg:w-24" style="height: 8px">
            <div class="h-full bg-pink-500" style="width: 67%"></div>
          </div>
          <span class="ml-4 font-medium text-pink-500">%67</span>
        </div>
      </li>
      <li class="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <span class="dark:text-gray-0 mr-2 mb-1 font-medium text-gray-900 md:mb-0"
            >Wonders Notebook</span
          >
          <div class="text-muted-color mt-1">Office</div>
        </div>
        <div class="mt-2 ml-0 flex items-center md:mt-0 md:ml-20">
          <div class="w-40 overflow-hidden rounded bg-gray-300 lg:w-24" style="height: 8px">
            <div class="h-full bg-green-500" style="width: 35%"></div>
          </div>
          <span class="text-primary ml-4 font-medium">%35</span>
        </div>
      </li>
      <li class="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <span class="dark:text-gray-0 mr-2 mb-1 font-medium text-gray-900 md:mb-0"
            >Mat Black Case</span
          >
          <div class="text-muted-color mt-1">Accessories</div>
        </div>
        <div class="mt-2 ml-0 flex items-center md:mt-0 md:ml-20">
          <div class="w-40 overflow-hidden rounded bg-gray-300 lg:w-24" style="height: 8px">
            <div class="h-full bg-purple-500" style="width: 75%"></div>
          </div>
          <span class="ml-4 font-medium text-purple-500">%75</span>
        </div>
      </li>
      <li class="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <span class="dark:text-gray-0 mr-2 mb-1 font-medium text-gray-900 md:mb-0"
            >Robots T-Shirt</span
          >
          <div class="text-muted-color mt-1">Clothing</div>
        </div>
        <div class="mt-2 ml-0 flex items-center md:mt-0 md:ml-20">
          <div class="w-40 overflow-hidden rounded bg-gray-300 lg:w-24" style="height: 8px">
            <div class="h-full bg-teal-500" style="width: 40%"></div>
          </div>
          <span class="ml-4 font-medium text-teal-500">%40</span>
        </div>
      </li> -->
    </ul>
  </div>
</template>
