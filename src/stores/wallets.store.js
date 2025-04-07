import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getWalletsData } from '@/data/wallets.data'

export const useWalletStore = defineStore('wallet', () => {
  const loading = ref(true)
  const wallets = getWalletsData()

  const getWallets = ({ type } = {}) => {
    let filteredWallets = wallets

    if (type) {
      filteredWallets = filteredWallets.filter((wallet) => wallet.type === type)
    }

    const total = filteredWallets.reduce((acc, wallet) => acc + wallet.balance, 0)

    return Promise.resolve({
      total,
      response: filteredWallets,
    })
  }

  const getWalletById = (id) => {
    return wallets.find((wallet) => wallet.id === id)
  }

  const getWalletByName = (name) => {
    return wallets.find((wallet) => wallet.name === name)
  }

  return { loading, getWallets, getWalletById, getWalletByName }
})
