<template>
  <div class="">
    <DataTable
      v-model:editingRows="editingRows"
      :value="wallets"
      editMode="row"
      dataKey="id"
      pt:root="custom-dt"
      pt:header="custom-dt-header"
      pt:table="custom-dt-table"
      @row-edit-save="onRowEditSave"
    >
      <!-- <Column field="code" header="Code" style="width: 20%">
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" fluid pt:root="custom-inputtext" />
        </template>
      </Column>
      <Column field="name" header="Name" style="width: 20%">
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" fluid pt:root="custom-inputtext" />
        </template>
      </Column>
      <Column field="inventoryStatus" header="Status" style="width: 20%">
        <template #editor="{ data, field }">
          <Select
            v-model="data[field]"
            :options="statuses"
            optionLabel="label"
            optionValue="value"
            placeholder="Select a Status"
            fluid
            pt:root="custom-select"
            pt:label="custom-select-label"
            pt:overlay="custom-select-overlay"
            pt:option="custom-select-option"
          >
            <template #option="slotProps">
              <span class="text-xs">{{ slotProps.option.value }}</span>
            </template>
          </Select>
        </template>
        <template #body="slotProps">
          <span>{{ slotProps.data.inventoryStatus }}</span>
        </template>
      </Column>
      <Column field="price" header="Price" style="width: 20%">
        <template #body="{ data, field }">
          {{ formatToCurrency(data[field]) }}
        </template>
        <template #editor="{ data, field }">
          <InputNumber
            v-model="data[field]"
            mode="currency"
            currency="USD"
            locale="en-US"
            fluid
            pt:root="custom-inputnumber"
          />
        </template>
      </Column> -->

      <Column
        v-for="(field, index) in fields"
        :key="index"
        :field="field.key"
        :header="field.label"
        :showFilterMenu="false"
      >
        <template #body="{ data }">
          <span v-if="field.key === 'balance'"> {{ formatToCurrency(data[field.key]) }}</span>
          <div v-else class="capitalize">
            <div v-if="field.key === 'name'" class="flex items-center justify-baseline">
              <div
                :class="[
                  'mr-4 flex size-12 shrink-0 items-center justify-center rounded-xl',
                  returnColor(data.appearance.color).bg,
                ]"
              >
                <i :class="[returnColor(data.appearance.color).text]">
                  <component :is="returnIcon(data.appearance.icon)" />
                </i>
              </div>
              <span>{{ data[field.key] }}</span>
            </div>
            <span v-else>{{ data[field.key] }}</span>
          </div>
        </template>
        <template #editor="{ data }">
          <InputText
            v-if="field.inputType === 'text'"
            v-model="data[field.key]"
            fluid
            pt:root="custom-inputtext"
          />
          <Select
            v-if="field.inputType === 'select'"
            v-model="data[field.key]"
            :options="field.options"
            optionLabel="label"
            optionValue="value"
            placeholder="Select a Type"
            fluid
            pt:root="custom-select"
            pt:label="custom-select-label"
            pt:overlay="custom-select-overlay"
            pt:option="custom-select-option"
          >
            <template #option="slotProps">
              <span class="text-sm capitalize">{{ slotProps.option.value }}</span>
            </template>
          </Select>
        </template>
      </Column>
      <Column
        :rowEditor="true"
        style="width: 10%; min-width: 8rem"
        bodyStyle="text-align:center"
      ></Column>
      <template #empty>
        <!-- <div v-if="!loading" class="text-center text-[11px] text-[#7086A4]">No data found.</div> -->
      </template>
    </DataTable>
  </div>
</template>

<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

import Tag from 'primevue/tag'
import Select from 'primevue/select'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'

import IconPiggyBank from '@/components/icons/IconPiggyBank.vue'
import IconCreditCard from '@/components/icons/IconCreditCard.vue'
import IconWallet from '@/components/icons/IconWallet.vue'

import { ref, onMounted, markRaw } from 'vue'
import { getWallets } from '@/data/wallet'

const pt = {
  table: { style: 'min-width: 50rem' },
  column: {
    bodycell: ({ state }) => ({
      style: state['d_editing'] && 'padding-top: 0.75rem; padding-bottom: 0.75rem',
    }),
  },
}

const wallets = ref()
const fields = [
  // { key: '#', label: ' #', inputType: 'text' },
  // { key: 'appearance', label: 'Icon', inputType: 'image' },
  { key: 'name', label: ' Name', inputType: 'text' },
  {
    key: 'type',
    label: 'Type',
    inputType: 'select',
    options: [
      { label: 'Spending', value: 'spending' },
      { label: 'Savings', value: 'savings' },
    ],
  },
  { key: 'balance', label: 'Balance', inputType: 'text' },
]
const editingRows = ref([])
const types = ref([
  { label: 'savings', value: 'Savings' },
  { label: 'Spending', value: 'Spending' },
])

onMounted(() => {
  wallets.value = getWallets().response
  // ProductService.getProductsMini().then((data) => (products.value = data))
})

const onRowEditSave = (event) => {
  let { newData, index } = event

  products.value[index] = newData
}

const returnIcon = (icon) => {
  switch (icon) {
    case 'wallet':
      return markRaw(IconWallet)

    case 'credit-card':
      return markRaw(IconCreditCard)

    case 'piggy-bank':
      return markRaw(IconPiggyBank)

    default:
      return markRaw(IconWallet)
  }
}

const returnColor = (icon) => {
  switch (icon) {
    case 'blue':
      return { text: 'text-blue-500', bg: 'bg-blue-50' }

    case 'red':
      return { text: 'text-red-500', bg: 'bg-red-50' }

    case 'orange':
      return { text: 'text-orange-500', bg: 'bg-orange-50' }

    case 'green':
      return { text: 'text-green-500', bg: 'bg-green-50' }

    case 'blue':
      return { text: 'text-blue-500', bg: 'bg-blue-50' }

    case 'violet':
      return { text: 'text-violet-500', bg: 'bg-violet-50' }

    case 'purple':
      return { text: 'text-purple-500', bg: 'bg-purple-50' }

    case 'pink':
      return { text: 'text-pink-500', bg: 'bg-pink-50' }

    case 'rose':
      return { text: 'text-rose-500', bg: 'bg-rose-50' }

    default:
      return { text: 'text-blue-500', bg: 'bg-blue-50' }
  }
}

const formatToCurrency = (value) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
}
</script>
