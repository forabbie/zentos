<template>
  <Toast pt:root="custom-toast" />
  <div class="">
    <DataTable
      :value="wallets"
      ref="dt"
      dataKey="id"
      pt:root="custom-dt"
      pt:header="custom-dt-header"
      pt:table="custom-dt-table"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="card-title">Wallets</h2>
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
      <Column :exportable="false" header="Display Icon" :showFilterMenu="false" style="width: 8rem">
        <template #body="{ data }">
          <div
            :class="['flex size-10 shrink-0 items-center justify-center rounded-xl']"
            :style="{
              'background-color': `rgba(${hexToRgb(data.color).r}, ${hexToRgb(data.color).g}, ${hexToRgb(data.color).b}, ${0.1})`,
            }"
          >
            <i class="w-6" :style="{ color: data.color }">
              <component :is="returnIcon(data.icon)" />
            </i>
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
          <span v-if="field.key === 'balance'"> {{ formatToCurrency(data[field.key]) }}</span>
          <div v-else class="capitalize">
            <span>{{ data[field.key] }}</span>
          </div>
        </template>
      </Column>

      <Column :exportable="false" bodyStyle="text-align:center;" style="width: 5rem">
        <template #body="slotProps">
          <div class="flex">
            <Button
              icon="pi pi-pencil"
              rounded
              @click="editWallet(slotProps.data)"
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
        <div v-if="walletStore.loading" class="text-center text-[11px] text-[#7086A4]">
          No data found.
        </div>
      </template>
    </DataTable>

    <Dialog
      v-model:visible="walletDialog"
      :style="{ width: '450px' }"
      header="Account Details"
      :modal="true"
      pt:root="!bg-white !text-black"
    >
      <div class="flex flex-col gap-6">
        <div class="grid w-full grid-cols-12 gap-4">
          <div
            :class="['col-span-5 flex size-34 shrink-0 items-center justify-center rounded-xl']"
            :style="{
              'background-color': `rgba(${hexToRgb(wallet.color).r}, ${hexToRgb(wallet.color).g}, ${hexToRgb(wallet.color).b}, ${0.1})`,
            }"
          >
            <i class="w-24" :style="{ color: wallet.color }">
              <component :is="returnIcon(wallet.icon)" />
            </i>
          </div>
          <div class="col-span-7">
            <span class="mb-4 block font-bold">Icon Color</span>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="item in colorOptions"
                :key="item.title"
                :title="item.title"
                type="button"
                class="h-5 w-5 rounded-md border border-black/16 outline-0 outline-offset-2 dark:border-white/12"
                :class="{
                  'outline-1': wallet.color === item.value,
                }"
                :style="{
                  'background-color': `rgba(${hexToRgb(item.value).r}, ${hexToRgb(item.value).g}, ${hexToRgb(item.value).b}, 1)`,
                  'outline-color': `rgba(${hexToRgb(item.value).r}, ${hexToRgb(item.value).g}, ${hexToRgb(item.value).b}, 1)`,
                }"
                @click.prevent="wallet.color = item.value"
              />
            </div>
          </div>
        </div>
        <div>
          <span class="mb-4 block font-bold">Icon</span>
          <div class="grid grid-cols-12 gap-4">
            <div class="col-span-4 flex items-center gap-2">
              <RadioButton
                id="wallet"
                v-model="wallet.icon"
                name="wallet"
                value="wallet"
                pt:root="custom-radiobutton"
              />
              <label for="wallet">Wallet</label>
            </div>
            <div class="col-span-4 flex items-center gap-2">
              <RadioButton
                id="credit-card"
                v-model="wallet.icon"
                name="credit-card"
                value="credit-card"
                pt:root="custom-radiobutton"
              />
              <label for="credit-card">Credit Card</label>
            </div>
            <div class="col-span-4 flex items-center gap-2">
              <RadioButton
                id="piggy-bank"
                v-model="wallet.icon"
                name="piggy-bank"
                value="piggy-bank"
                pt:root="custom-radiobutton"
              />
              <label for="piggy-bank">Piggy Bank</label>
            </div>
          </div>
          <small v-if="submitted && !wallet.icon" class="text-red-500">Icon is required.</small>
        </div>

        <div>
          <label for="name" class="mb-3 block font-bold">Name</label>
          <InputText v-model="wallet.name" fluid pt:root="custom-inputtext" />
          <small v-if="submitted && !wallet.name" class="text-red-500">Name is required.</small>
        </div>

        <div>
          <span class="mb-4 block font-bold">Type</span>
          <div class="grid grid-cols-12 gap-4">
            <div class="col-span-6 flex items-center gap-2">
              <RadioButton
                id="savings"
                v-model="wallet.type"
                name="type"
                value="savings"
                pt:root="custom-radiobutton"
              />
              <label for="savings">Savings</label>
            </div>
            <div class="col-span-6 flex items-center gap-2">
              <RadioButton
                id="spending"
                v-model="wallet.type"
                name="type"
                value="spending"
                pt:root="custom-radiobutton"
              />
              <label for="spending">Spending</label>
            </div>
          </div>
          <small v-if="submitted && !wallet.type" class="text-red-500"
            >Account Type is required.</small
          >
        </div>

        <div>
          <label for="balance" class="mb-3 block font-bold">Balance</label>
          <InputNumber
            id="balance"
            v-model="wallet.balance"
            mode="currency"
            currency="PHP"
            locale="en-PH"
            fluid
            pt:root="custom-inputnumber"
          />
          <small v-if="submitted && !wallet.balance" class="text-red-500"
            >Balance is required.</small
          >
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
          @click="saveWallet"
          pt:root="custom-button save"
          pt:label="custom-button-label"
          pt:icon="custom-button-icon"
        />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteWalletDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
      pt:root="!bg-white !text-black"
    >
      <div class="">
        <span
          >Are you sure you want to delete <b class="text-indigo-500">{{ wallet.name }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          text
          @click="deleteWalletDialog = false"
          pt:root="custom-button cancel"
          pt:label="custom-button-label"
          pt:icon="custom-button-icon"
        />
        <Button
          label="Yes"
          @click="deleteWallet"
          pt:root="custom-button save"
          pt:label="custom-button-label"
          pt:icon="custom-button-icon"
        />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import Button from 'primevue/button'
import RadioButton from 'primevue/radiobutton'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Toast from 'primevue/toast'
import Dialog from 'primevue/dialog'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'

import IconPiggyBank from '@/components/icons/IconPiggyBank.vue'
import IconCreditCard from '@/components/icons/IconCreditCard.vue'
import IconWallet from '@/components/icons/IconWallet.vue'

import { ref, onMounted, markRaw } from 'vue'
import { useToast } from 'primevue/usetoast'

import { createId, formatToCurrency, hexToRgb } from '@/utils/helper'

import { useWalletStore } from '@/stores/wallets.store'

const toast = useToast()
const walletStore = useWalletStore()

const wallet = ref({})
const wallets = ref(null)
const submitted = ref(false)

const fields = [
  { key: 'name', label: ' Account Name', inputType: 'text' },
  {
    key: 'type',
    label: 'Account Type',
    inputType: 'select',
    options: [
      { label: 'Spending', value: 'spending' },
      { label: 'Savings', value: 'savings' },
    ],
  },
  { key: 'balance', label: 'Balance', inputType: 'text' },
]

const colorOptions = [
  {
    title: 'emerald',
    value: '#10b981',
  },
  {
    title: 'green',
    value: '#22c55e',
  },
  {
    title: 'lime',
    value: '#84cc16',
  },
  {
    title: 'orange',
    value: '#f97316',
  },
  {
    title: 'amber',
    value: '#f59e0b',
  },
  {
    title: 'yellow',
    value: '#eab308',
  },
  {
    title: 'teal',
    value: '#14b8a6',
  },
  {
    title: 'cyan',
    value: '#06b6d4',
  },
  {
    title: 'sky',
    value: '#0ea5e9',
  },
  {
    title: 'blue',
    value: '#3b82f6',
  },
  {
    title: 'indigo',
    value: '#6366f1',
  },
  {
    title: 'violet',
    value: '#8b5cf6',
  },
  {
    title: 'purple',
    value: '#a855f7',
  },
  {
    title: 'fuchsia',
    value: '#d946ef',
  },
  {
    title: 'pink',
    value: '#ec4899',
  },
  {
    title: 'rose',
    value: '#f43f5e',
  },
]

onMounted(async () => {
  await getWallets()
})

const getWallets = async () => {
  await walletStore.getWallets().then((data) => {
    wallets.value = data.response
  })
}

const walletDialog = ref(false)
const deleteWalletDialog = ref(false)

const openNew = () => {
  wallet.value = {
    type: 'savings',
    icon: 'wallet',
    color: '#10b981',
  }
  submitted.value = false
  walletDialog.value = true
}

const hideDialog = () => {
  walletDialog.value = false
  submitted.value = false
}

const saveWallet = () => {
  submitted.value = true

  if (wallet?.value.name?.trim()) {
    const storedWallets = walletStore.getWalletsDataFromLocalStorage()

    if (wallet.value.id) {
      wallets.value[wallet.value.id - 1] = { ...wallet.value }

      storedWallets[wallet.value.id - 1] = { ...wallet.value }

      toast.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Account Wallet Updated',
        life: 3000,
      })
    } else {
      wallet.value.id = createId(wallets.value.length)
      wallets.value.push(wallet.value)

      storedWallets.push({ ...wallet.value })

      toast.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Account Wallet Created',
        life: 3000,
      })
    }

    walletStore.saveWalletsDataToLocalStorage(storedWallets)

    getWallets()

    walletDialog.value = false
    wallet.value = {}
  }
}

const editWallet = (data) => {
  wallet.value = { ...data }
  walletDialog.value = true
}

const confirmDeleteTransaction = (data) => {
  wallet.value = data
  deleteWalletDialog.value = true
}

const deleteWallet = () => {
  const storedWallets = walletStore.getWalletsDataFromLocalStorage()
  const updatedWallets = storedWallets.filter((w) => w.id !== wallet.value.id)

  walletStore.saveWalletsDataToLocalStorage(updatedWallets)

  wallets.value = wallets.value.filter((w) => w.id !== wallet.value.id)

  getWallets()

  deleteWalletDialog.value = false
  wallet.value = {}

  toast.add({
    severity: 'success',
    summary: 'Successful',
    detail: 'Account Wallet Deleted',
    life: 3000,
  })
}

const dt = ref(null)
const exportCSV = () => {
  dt.value.exportCSV()
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
</script>
