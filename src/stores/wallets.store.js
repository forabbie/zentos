import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getWalletsData } from '@/data/wallets.data'

export const useWalletStore = defineStore('wallet', () => {
  const loading = ref(true)

  const getWalletsDataFromLocalStorage = () => {
    const wallets = JSON.parse(localStorage.getItem('wallets')) || []
    return wallets
  }

  const saveWalletsDataToLocalStorage = (wallets) => {
    localStorage.setItem('wallets', JSON.stringify(wallets))
  }

  const wallets = getWalletsDataFromLocalStorage()

  if (wallets.length === 0) {
    saveWalletsDataToLocalStorage(getWalletsData())
    wallets.push(...getWalletsData())
  }

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

  const updateWalletBalance = (transaction) => {
    if (!transaction) {
      console.error('Transaction not found!')
      return
    }

    const wallet = getWalletById(transaction.account_id)
    let currentWalletBalance = wallet.balance

    if (transaction.type === 'income') {
      currentWalletBalance += transaction.amount
    } else if (transaction.type === 'expense') {
      currentWalletBalance -= transaction.amount
    } else {
      console.error('Unknown transaction type!')
      return
    }

    wallet.balance = currentWalletBalance

    const storedWallets = getWalletsDataFromLocalStorage()

    storedWallets[wallet.id - 1] = { ...wallet }

    saveWalletsDataToLocalStorage(storedWallets)

    console.log(`Wallet balance updated: ${currentWalletBalance}`)

    return currentWalletBalance
  }

  return {
    loading,
    getWallets,
    getWalletById,
    getWalletsDataFromLocalStorage,
    saveWalletsDataToLocalStorage,
    updateWalletBalance,
  }
})
