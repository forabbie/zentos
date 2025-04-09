<template>
  <Toast />
  <DataTable
    ref="dt"
    :value="transactions"
    :rows="5"
    pt:root="custom-dt"
    pt:header="custom-dt-header"
    pt:table="custom-dt-table"
    pt:footer="custom-dt-footer"
  >
    <template #header>
      <div class="flex items-center justify-between">
        <h2 class="card-title">Transactions</h2>
        <div>
          <Button
            label="New"
            icon="pi pi-plus"
            @click="openNew"
            pt:root="custom-button"
            pt:label="custom-button-label"
            pt:icon="custom-button-icon"
            class="mr-2"
          />
          <Button
            icon="pi pi-external-link"
            label="Export"
            @click="exportCSV($event)"
            pt:root="custom-button"
            pt:label="custom-button-label"
            pt:icon="custom-button-icon"
          />
        </div>
      </div>
    </template>
    <Column field="category" header="Category" :exportable="false" :showFilterMenu="false">
      <template #body="{ data }">
        <div class="flex w-full items-center gap-2">
          <i :class="[returnColor(data?.category?.appearance.color).text]">
            <IconSquareRounded />
          </i>
          <span class="flex w-full text-sm font-medium capitalize">{{ data?.category?.name }}</span>
        </div>
      </template>
    </Column>
    <Column
      v-for="(field, index) in fields"
      :key="index"
      :field="field.key"
      :header="field.label"
      :showFilterMenu="false"
    >
      <template #body="{ data }">
        <div v-if="data && data.note" class="text-sm capitalize">
          <span v-if="field.key === 'amount'"> {{ formatToCurrency(data[field.key]) }}</span>
          <span v-else-if="field.key === 'date'"> {{ convertDateToWords(data[field.key]) }}</span>
          <div v-else>
            <span>{{ data[field.key] }}</span>
          </div>
        </div>
      </template>
    </Column>
    <Column :exportable="false" bodyStyle="text-align:center;" style="width: 5rem">
      <template #body="slotProps">
        <div class="flex">
          <Button
            icon="pi pi-pencil"
            rounded
            @click="editTransaction(slotProps.data)"
            pt:root="p-datatable-row-editor-init p-button p-component p-button-icon-only p-button-secondary p-button-rounded p-button-text"
          />
          <Button
            icon="pi pi-trash"
            rounded
            @click="confirmDeleteTransaction(slotProps.data)"
            pt:root="p-datatable-row-editor-cancel p-button p-component p-button-icon-only p-button-secondary p-button-rounded p-button-text"
          />
        </div>
      </template>
    </Column>
    <template #empty>
      <div v-if="transactionStore.loading" class="text-center text-[11px] text-[#7086A4]">
        No transaction found.
      </div>
    </template>
    <template #footer>
      <Paginator
        :rows="limit"
        :totalRecords="totalTransactions"
        :currentPageReportTemplate="'Showing {first} to {last} of {totalRecords}'"
        :template="'PrevPageLink CurrentPageReport NextPageLink'"
        @page="onPage"
        pt:root="custom-paginator"
      >
        <!-- <template #start>
          <span class="text-xs text-white">Show</span>
        </template>
        <template #previcon>
          <i class="pi pi-chevron-left text-xs"></i>
        </template>
        <template #nexticon>
          <i class="pi pi-chevron-right text-xs"></i>
        </template> -->
      </Paginator>
    </template>
  </DataTable>

  <Dialog
    v-model:visible="transactionDialog"
    :style="{ width: '450px' }"
    header="Transaction Details"
    :modal="true"
    pt:root="custom-dialog"
    pt:header="custom-dialog-header"
    pt:content="custom-dialog-content"
    pt:footer="custom-dialog-footer"
  >
    <div class="flex flex-col gap-6 pt-2 text-sm">
      <div>
        <span class="mb-3 block font-bold">From Account: </span>
        <Select
          v-model="transaction.account_id"
          :options="walletOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="Select a account"
          fluid
          pt:root="custom-select"
          pt:label="custom-select-label"
          pt:overlay="custom-select-overlay"
          pt:option="custom-select-option"
        >
          <template #option="slotProps">
            <span class="text-sm capitalize">{{ slotProps.option.label }}</span>
          </template>
        </Select>
        <small v-if="submitted && !transaction.account_id" class="text-red-500"
          >From Account is required.</small
        >
      </div>

      <div>
        <span class="mb-4 block font-bold">Transaction Type</span>
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-6 flex items-center gap-2">
            <RadioButton
              inputId="tincome"
              v-model="transaction.type"
              name="type"
              value="income"
              pt:root="custom-radiobutton"
            />
            <label for="tincome" class="text-sm">Income</label>
          </div>
          <div class="col-span-6 flex items-center gap-2">
            <RadioButton
              inputId="texpense"
              v-model="transaction.type"
              name="type"
              value="expense"
              pt:root="custom-radiobutton"
            />
            <label for="texpense" class="text-sm">Expense</label>
          </div>
        </div>
        <small v-if="submitted && !transaction.type" class="text-red-500"
          >Transaction type is required.</small
        >
      </div>

      <div>
        <span class="mb-3 block font-bold">Category</span>
        <Select
          id="tcategory"
          v-model="transaction.category_id"
          :options="categoryOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="Select a category"
          fluid
          pt:root="custom-select"
          pt:label="custom-select-label"
          pt:overlay="custom-select-overlay"
          pt:option="custom-select-option"
        >
          <template #option="slotProps">
            <span class="text-sm capitalize">{{ slotProps.option.label }}</span>
          </template>
        </Select>
        <small v-if="submitted && !transaction.category_id" class="text-red-500"
          >Category is required.</small
        >
      </div>

      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-6">
          <label for="tamount" class="mb-3 block font-bold">Amount</label>
          <InputNumber
            v-model="transaction.amount"
            inputId="tamount"
            mode="currency"
            currency="PHP"
            locale="en-PH"
            fluid
            pt:root="custom-inputnumber"
          />
          <small v-if="submitted && !transaction.amount" class="text-red-500"
            >Amount is required.</small
          >
        </div>
        <div class="col-span-6">
          <label for="tdate" class="mb-3 block font-bold">Date</label>
          <DatePicker
            inputId="tdate"
            v-model="transaction.date"
            :manualInput="false"
            dateFormat="MM dd, yy"
            fluid
            pt:root="custom-datepicker form"
            pt:pcInputText:root="custom-inputtext"
            pt:panel="custom-datepicker-panel"
            pt:header="custom-datepicker-header"
            pt:title="custom-datepicker-title"
            pt:weekday="custom-datepicker-weekday"
            pt:day="custom-datepicker-day"
          />
        </div>
      </div>

      <div>
        <label for="tnote" class="mb-3 block font-bold">Note</label>
        <InputText id="tnote" v-model="transaction.note" fluid pt:root="custom-inputtext" />
      </div>
    </div>

    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        text
        @click="hideDialog"
        pt:root="custom-button cancel"
        pt:label="custom-button-label"
        pt:icon="custom-button-icon"
      />
      <Button
        label="Save"
        icon="pi pi-check"
        @click="saveTransaction"
        pt:root="custom-button save"
        pt:label="custom-button-label"
        pt:icon="custom-button-icon"
      />
    </template>
  </Dialog>

  <Dialog
    v-model:visible="deleteTransactionDialog"
    :style="{ width: '450px' }"
    header="Confirm"
    :modal="true"
    pt:root="custom-dialog"
    pt:header="custom-dialog-header"
    pt:content="custom-dialog-content"
    pt:footer="custom-dialog-footer"
  >
    <div class="">
      <span
        >Are you sure you want to delete
        <b class="text-indigo-500">{{ transaction.category.name }}</b
        >?</span
      >
    </div>
    <template #footer>
      <Button
        label="No"
        text
        @click="deleteTransactionDialog = false"
        pt:root="custom-button cancel"
        pt:label="custom-button-label"
        pt:icon="custom-button-icon"
      />
      <Button
        label="Yes"
        @click="deleteTransaction"
        pt:root="custom-button save"
        pt:label="custom-button-label"
        pt:icon="custom-button-icon"
      />
    </template>
  </Dialog>
</template>

<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Toast from 'primevue/toast'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Select from 'primevue/select'
import DatePicker from 'primevue/datepicker'
import RadioButton from 'primevue/radiobutton'
import Paginator from 'primevue/paginator'

import IconPiggyBank from '@/components/icons/IconPiggyBank.vue'
import IconCreditCard from '@/components/icons/IconCreditCard.vue'
import IconDollar from '@/components/icons/IconDollar.vue'
import IconSquareRounded from '@/components/icons/IconSquareRounded.vue'

import { ref, onMounted, markRaw } from 'vue'
import { useToast } from 'primevue/usetoast'

import { convertDateToWords } from '@/utils/date'
import { formatToCurrency } from '@/utils/format'
import { returnColor } from '@/utils/styles'
import { createId } from '@/utils/helper'

import { useTransactionStore } from '@/stores/transactions.store'
import { useCategoryStore } from '@/stores/categories.store'
import { useWalletStore } from '@/stores/wallets.store'

const toast = useToast()
const transactionStore = useTransactionStore()
const categoryStore = useCategoryStore()
const walletStore = useWalletStore()

const fields = [
  { key: 'note', label: ' Details', inputType: 'text' },
  { key: 'type', label: 'Type', inputType: 'text' },
  { key: 'amount', label: 'Amount', inputType: 'text' },
  { key: 'date', label: 'Date', inputType: 'date' },
]

const dt = ref(null)
const submitted = ref(false)
const transactions = ref([])
const totalTransactions = ref(null)
const limit = ref(10)
const page = ref(1)

const categories = ref([])
const wallets = ref([])

const categoryOptions = ref([{ label: '', value: 0 }])
const walletOptions = ref([{ label: '', value: 0 }])

const mapToOptionsValue = (items) => {
  return items.map((item) => ({
    label: item.name,
    value: item.id,
  }))
}

onMounted(async () => {
  await getTransactions(limit.value, page.value)

  await categoryStore.getCategories().then((data) => {
    categories.value = data.response
  })

  await walletStore.getWallets().then((data) => {
    wallets.value = data.response
  })

  categoryOptions.value = mapToOptionsValue(categories.value)
  walletOptions.value = mapToOptionsValue(wallets.value)
})

const getTransactions = async (limit, page) => {
  await transactionStore.getTransactions({ limit, page }).then((data) => {
    totalTransactions.value = data.total
    transactions.value = data.response
  })
}

const transaction = ref({})
const transactionDialog = ref(false)
const deleteTransactionDialog = ref(false)

const openNew = () => {
  transaction.value = {}
  submitted.value = false
  transactionDialog.value = true
}

const hideDialog = () => {
  transactionDialog.value = false
  submitted.value = false
}

const saveTransaction = () => {
  submitted.value = true

  if (transaction.value.category_id && transaction.value.account_id && transaction.value.amount) {
    const storedTransactions = transactionStore.getTransactionsDataFromLocalStorage()
    if (transaction.value.id) {
      transactions.value[transaction.value.id - 1] = transactionStore.mapTransaction({
        ...transaction.value,
      })

      storedTransactions[transaction.value.id - 1] = {
        id: transaction.value.id,
        type: transaction.value.type,
        category_id: transaction.value.category_id,
        account_id: transaction.value.account_id,
        amount: transaction.value.amount,
        note: transaction.value.note,
        date: transaction.value.date,
      }

      transactionStore.saveTransactionsDataToLocalStorage(storedTransactions)

      getTransactions(limit.value, page.value)

      toast.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Transaction Updated',
        life: 3000,
      })
    } else {
      transaction.value.id = createId(totalTransactions.value)
      transactions.value.push(transactionStore.mapTransaction(transaction.value))

      storedTransactions.push({ ...transaction.value })
      transactionStore.saveTransactionsDataToLocalStorage(storedTransactions)

      getTransactions(limit.value, page.value)

      toast.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Transaction Created',
        life: 3000,
      })
    }

    submitted.value = false
    transactionDialog.value = false
    transaction.value = {}
  }
}

const editTransaction = (data) => {
  console.log(data)

  transaction.value = {
    id: data.id,
    type: data.type,
    category_id: data.category_id,
    category: { ...data.category },
    account_id: data.account_id,
    account: { ...data.account },
    amount: data.amount,
    note: data.note,
    date: data.date,
  }
  transactionDialog.value = true
}

const confirmDeleteTransaction = (data) => {
  transaction.value = data
  deleteTransactionDialog.value = true
}

const deleteTransaction = () => {
  const storedTransactions = transactionStore.getTransactionsDataFromLocalStorage()
  const updatedTransactions = storedTransactions.filter((t) => t.id !== transaction.value.id)

  transactionStore.saveTransactionsDataToLocalStorage(updatedTransactions)
  transactions.value = transactions.value.filter((t) => t.id !== transaction.value.id)

  getTransactions(limit.value, page.value)

  toast.add({
    severity: 'success',
    summary: 'Successful',
    detail: 'Transaction Deleted',
    life: 3000,
  })

  deleteTransactionDialog.value = false
  transaction.value = {}
}

const exportCSV = () => {
  dt.value.exportCSV()
}

const onPage = (event) => {
  page.value = event.page + 1
  limit.value = event.rows

  getTransactions(limit.value, page.value)
}

const returnIcon = (icon) => {
  switch (icon) {
    case 'expense':
      return markRaw(IconDollar)

    case 'income':
      return markRaw(IconPiggyBank)

    default:
      return markRaw(IconCreditCard)
  }
}
</script>
