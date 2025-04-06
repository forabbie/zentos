<template>
  <div class="">
    <DataTable
      v-model:editingRows="editingRows"
      :value="products"
      editMode="row"
      dataKey="id"
      @row-edit-save="onRowEditSave"
      pt:root="custom-dt"
      pt:header="custom-dt-header"
      pt:table="custom-dt-table"
    >
      <Column field="code" header="Code" style="width: 20%">
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
              <!-- <Tag
                :value="slotProps.option.value"
                :severity="getStatusLabel(slotProps.option.value)"
              /> -->
              <span class="text-xs">{{ slotProps.option.value }}</span>
            </template>
          </Select>
        </template>
        <template #body="slotProps">
          <!-- <Tag
            :value="slotProps.data.inventoryStatus"
            :severity="getStatusLabel(slotProps.data.inventoryStatus)"
          /> -->
          <span>{{ slotProps.data.inventoryStatus }}</span>
        </template>
      </Column>
      <Column field="price" header="Price" style="width: 20%">
        <template #body="{ data, field }">
          {{ formatCurrency(data[field]) }}
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
      </Column>
      <Column
        :rowEditor="true"
        style="width: 10%; min-width: 8rem"
        bodyStyle="text-align:center"
      ></Column>
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

import { ref, onMounted } from 'vue'
import { ProductService } from '@/data/ProductService'

const pt = {
  table: { style: 'min-width: 50rem' },
  column: {
    bodycell: ({ state }) => ({
      style: state['d_editing'] && 'padding-top: 0.75rem; padding-bottom: 0.75rem',
    }),
  },
}

const products = ref()
const editingRows = ref([])
const statuses = ref([
  { label: 'In Stock', value: 'INSTOCK' },
  { label: 'Low Stock', value: 'LOWSTOCK' },
  { label: 'Out of Stock', value: 'OUTOFSTOCK' },
])

onMounted(() => {
  ProductService.getProductsMini().then((data) => (products.value = data))
})

const onRowEditSave = (event) => {
  let { newData, index } = event

  products.value[index] = newData
}
const getStatusLabel = (status) => {
  switch (status) {
    case 'INSTOCK':
      return 'success'

    case 'LOWSTOCK':
      return 'warn'

    case 'OUTOFSTOCK':
      return 'danger'

    default:
      return null
  }
}
const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
}
</script>

<style scoped>
/* @reference "tailwindcss"; */
/* 
:deep(.p-select),
:deep(.p-inputtext),
:deep(.p-datatable-header-cell),
:deep(.p-datatable-tbody tr) {
  @apply bg-white !text-black;
}

:deep(.p-datatable-table) {
  @apply border-t border-t-gray-200;
}

:deep(.p-datatable-table td),
:deep(.p-datatable-table th) {
  @apply border-b border-b-gray-200;
}

:deep(.p-datatable-table td) {
  @apply px-4 py-0 text-sm;
}

:deep(.p-datatable-table th) {
  @apply px-4 py-2 text-sm font-bold;
}

:deep(.p-select),
:deep(.p-inputtext) {
  @apply border-1 border-slate-200 bg-slate-100 px-2 py-1.5 text-sm hover:border-indigo-600;
}

:deep(.p-inputtext:enabled:focus),
:deep(.p-select:not(.p-disabled).p-focus) {
  @apply border-indigo-500 shadow-none;
}

:deep(.p-inputtext),
:deep(.p-select:not(.p-disabled)) {
  @apply hover:border-indigo-600;
}

:deep(.p-select-label) {
  @apply p-0;
}

:deep(.p-select-label),
:deep(.p-button-text.p-button-secondary) {
  @apply text-black;
}
*/
</style>
