<template>
  <DataTable
    :value="products"
    ref="dt"
    pt:root="custom-dt"
    pt:header="custom-dt-header"
    pt:table="custom-dt-table"
  >
    <template #header>
      <div class="flex items-center justify-between">
        <h2 class="card-title">Transactions</h2>
        <Button
          icon="pi pi-external-link"
          label="Export"
          @click="exportCSV($event)"
          pt:root="custom-button"
          pt:label="custom-button-label"
          pt:icon="custom-button-icon"
        />
      </div>
    </template>
    <Column field="code" header="Code" exportHeader="Product Code"></Column>
    <Column field="name" header="Name"></Column>
    <Column field="category" header="Category"></Column>
    <Column field="quantity" header="Quantity"></Column>
  </DataTable>
</template>

<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'

import { ref, onMounted } from 'vue'
import { ProductService } from '@/data/ProductService'

onMounted(() => {
  ProductService.getProductsMini().then((data) => (products.value = data))
})

const dt = ref()
const products = ref()
const exportCSV = () => {
  dt.value.exportCSV()
}
</script>
