import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getTransactionsData } from '@/data/transactions.data'

import { useCategoryStore } from '@/stores/categories.store'
import { useWalletStore } from '@/stores/wallets.store'

export const useTransactionStore = defineStore('transaction', () => {
  const loading = ref(true)

  const getTransactionsDataFromLocalStorage = () => {
    const transactions = JSON.parse(localStorage.getItem('transactions')) || []
    return transactions
  }

  const saveTransactionsDataToLocalStorage = (transactions) => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
  }

  const transactions = getTransactionsDataFromLocalStorage()

  if (transactions.length === 0) {
    saveTransactionsDataToLocalStorage(getTransactionsData())
    transactions.push(...getTransactionsData())
  }

  const categoryStore = useCategoryStore()
  const walletStore = useWalletStore()

  const mapTransaction = (transaction) => {
    const category = categoryStore.getCategoryById(transaction.category_id)
    const wallet = walletStore.getWalletById(transaction.account_id)

    const utcDate = new Date(transaction.date)
    const phTime = new Date(utcDate.getTime() + 8 * 60 * 60 * 1000)

    return {
      id: transaction.id,
      type: transaction.type,
      category_id: transaction.category_id,
      account_id: transaction.account_id,
      category: { ...category },
      account: { ...wallet },
      amount: transaction.amount,
      note: transaction.note,
      date: phTime,
    }
  }

  const getTransactions = ({ month, type = null, page = 1, limit } = {}) => {
    let filteredTransactions = getTransactionsDataFromLocalStorage()

    // Filter by month if provided
    if (month) {
      filteredTransactions = filteredTransactions.filter((transaction) =>
        transaction.date.startsWith(month),
      )
    }

    // Filter by type if provided
    if (type) {
      filteredTransactions = filteredTransactions.filter(
        (transaction) => transaction.type.toLowerCase() === type.toLowerCase(),
      )
    }

    filteredTransactions.sort((a, b) => new Date(b.date) - new Date(a.date))

    const total = filteredTransactions.length

    const effectiveLimit = limit !== undefined ? limit : total

    const startIndex = (page - 1) * effectiveLimit
    const paginatedTransactions = filteredTransactions.slice(
      startIndex,
      startIndex + effectiveLimit,
    )
    const mappedTransactions = paginatedTransactions.map(mapTransaction)

    const result = {
      total,
      page,
      response: mappedTransactions,
    }

    if (limit !== undefined) {
      result.limit = limit
    }

    return Promise.resolve(result)
  }

  return {
    loading,
    getTransactions,
    mapTransaction,
    getTransactionsDataFromLocalStorage,
    saveTransactionsDataToLocalStorage,
  }
})
