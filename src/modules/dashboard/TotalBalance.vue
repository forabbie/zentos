<template>
  <div class="rounded-lg bg-white shadow-md">
    <div class="widget widget-total-balance">
      <div class="widget-content">
        <div class="account-box">
          <div class="info">
            <div class="inv-title">
              <h5>Total Balance</h5>
            </div>
            <div class="inv-balance-info">
              <p class="inv-balance">{{ formatToCurrency(savings) ?? 0 }}</p>
              <span class="inv-stats balance-credited"
                >{{ income >= 0 ? '+' : '-' }} {{ formatToCurrency(income) }}</span
              >
            </div>
          </div>
          <div class="acc-action">
            <div class="flex gap-2">
              <RouterLink to="wallets">
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
                  class="feather feather-plus"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'

import { formatToCurrency } from '@/utils/format'

import { useTransactionStore } from '@/stores/transactions.store'
import { useGlobalStore } from '@/stores/global.store'
import { useWalletStore } from '@/stores/wallets.store'

const transactionStore = useTransactionStore()
const globalStore = useGlobalStore()
const walletStore = useWalletStore()

const transIncome = ref(null)
const savingsList = ref(null)

const selectedDate = computed(() => globalStore.selectedDate)

watch(selectedDate, async () => {
  transIncome.value = await getTransactions({ month: selectedDate.value, type: 'income' })
})

onMounted(async () => {
  transIncome.value = await getTransactions({ month: selectedDate.value, type: 'income' })
  savingsList.value = await getWallets()
})

const getTransactions = async (month, type) => {
  const data = await transactionStore.getTransactions(month, type)
  return data.response
}

const getWallets = async (type) => {
  const data = await walletStore.getWallets(type)
  return data.response
}

const income = computed(() => {
  return transIncome.value?.reduce((sum, t) => sum + t.amount, 0) ?? 0
})

const savings = computed(() => {
  return savingsList.value?.reduce((sum, t) => sum + t.balance, 0) ?? 0
})
</script>

<style scoped>
.widget {
  position: relative;
  background: #fff;
  border: 1px solid #e0e6ed;
  box-shadow: 0 0 40px 0 rgba(94, 92, 154, 0.06);
  border-radius: 6px;
  color: #212529;
  height: 100%;
}
.widget.widget-total-balance {
  z-index: 0;
  overflow: hidden;
  background-image: linear-gradient(0deg, #00c6fb -227%, #005bea) !important;
}
.widget.widget-total-balance:before {
  content: '';
  position: absolute;
  height: 382px;
  width: 382px;
  background-color: #1937cc;
  top: -76px;
  left: 50%;
  z-index: 1;
  border-radius: 50%;
}
.widget.widget-total-balance .widget-content .account-box {
  position: relative;
  z-index: 1;
  padding: 1rem;
  color: white;
}
.widget.widget-total-balance .widget-content .account-box .info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 56px;
}
.widget.widget-total-balance .widget-content .account-box .acc-action {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.widget.widget-total-balance .widget-content .account-box .info h5 {
  color: #e0e6ed;
  margin-bottom: 0;
  font-size: 16px;
  font-weight: 400;
  margin-top: 5px;
}
.widget.widget-total-balance .widget-content .account-box .acc-action a:first-child {
  margin-right: 4px;
}
.widget.widget-total-balance .widget-content .account-box .info .inv-balance-info {
  text-align: right;
}
.widget.widget-total-balance .widget-content .account-box .info .inv-balance-info p {
  color: #e0e6ed;
  margin-bottom: 4px;
  font-size: 26px;
}
.widget.widget-total-balance .widget-content .account-box .info .inv-balance-info .inv-stats {
  padding: 4px 5px;
  background: #4361ee;
  color: #d3d3d3;
  font-size: 12px;
  font-weight: 600;
  border-radius: 4px;
}
.widget.widget-total-balance .widget-content .account-box .acc-action a {
  display: inline-flex;
  align-items: center;
  padding: 6px;
  border-radius: 6px;
  color: #e0e6ed;
  box-shadow: 0 0 2px 0 #bfc9d4;
}
.widget.widget-total-balance .widget-content .account-box .acc-action a svg {
  width: 17px;
  height: 17px;
  stroke-width: 1.7;
}
</style>
