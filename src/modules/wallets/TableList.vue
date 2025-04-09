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
      <Column
        :exportable="false"
        field="apperance"
        header="Display Icon"
        :showFilterMenu="false"
        style="width: 8rem"
      >
        <template #body="{ data }">
          <div
            :class="[
              'flex size-10 shrink-0 items-center justify-center rounded-xl',
              returnColor(data.appearance.color).bg,
            ]"
          >
            <i :class="[returnColor(data.appearance.color).text]">
              <component :is="returnIcon(data.appearance.icon)" />
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
      header="Product Details"
      :modal="true"
      pt:root="!bg-white !text-black"
    >
      <div class="flex flex-col gap-6">
        <!-- <img
          v-if="product.image"
          :src="`https://primefaces.org/cdn/primevue/images/product/${product.image}`"
          :alt="product.image"
          class="m-auto block pb-4"
        /> -->
        <div v-show="false">
          <InputText v-model="wallet.appearance.color" fluid pt:root="custom-inputtext" />
        </div>
        <div v-show="false">
          <Select
            v-model="wallet.appearance.icon"
            :options="iconOptions"
            optionLabel="label"
            optionValue="value"
            placeholder="Select a icons"
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
        </div>

        <div>
          <label for="name" class="mb-3 block font-bold">Account Name</label>
          <InputText v-model="wallet.name" fluid pt:root="custom-inputtext" />
          <small v-if="submitted && !wallet.name" class="text-red-500">Name is required.</small>
        </div>

        <div>
          <span class="mb-4 block font-bold">Account Type</span>
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
import Tag from 'primevue/tag'
import Button from 'primevue/button'
import Select from 'primevue/select'
import RadioButton from 'primevue/radiobutton'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Toast from 'primevue/toast'
import Toolbar from 'primevue/toolbar'
import Dialog from 'primevue/dialog'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'

import IconPiggyBank from '@/components/icons/IconPiggyBank.vue'
import IconCreditCard from '@/components/icons/IconCreditCard.vue'
import IconWallet from '@/components/icons/IconWallet.vue'

import { ref, onMounted, markRaw } from 'vue'
import { useToast } from 'primevue/usetoast'

import { returnColor } from '@/utils/styles'
import { formatToCurrency } from '@/utils/format'
import { createId } from '@/utils/helper'

import { useWalletStore } from '@/stores/wallets.store'

const toast = useToast()
const walletStore = useWalletStore()

const wallet = ref({
  appearance: {
    icon: '',
    color: '',
  },
})
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

const iconOptions = [
  { label: 'Wallet', value: 'wallet' },
  { label: 'Savings', value: 'credit-card' },
  { label: 'Savings', value: 'piggy-bank' },
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
    appearance: {
      icon: '',
      color: '',
    },
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
      wallet.value.appearance.icon =
        wallet.value.type.toLowerCase() === 'savings' ? 'piggy-bank' : 'wallet'
      wallet.value.appearance.color =
        wallet.value.type.toLowerCase() === 'savings' ? 'green' : 'orange'
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
      wallet.value.appearance.icon =
        wallet.value.type.toLowerCase() === 'savings' ? 'piggy-bank' : 'wallet'
      wallet.value.appearance.color =
        wallet.value.type.toLowerCase() === 'savings' ? 'green' : 'orange'
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
    wallet.value = {
      appearance: {
        icon: '',
        color: '',
      },
    }
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
  wallet.value = {
    appearance: {
      icon: '',
      color: '',
    },
  }
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

    // case 'credit-card':
    //   return markRaw(IconCreditCard)

    case 'piggy-bank':
      return markRaw(IconPiggyBank)

    default:
      return markRaw(IconCreditCard)
  }
}
</script>
