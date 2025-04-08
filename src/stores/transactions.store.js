import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getTransactionsData } from '@/data/transactions.data'

import { useCategoryStore } from '@/stores/categories.store'
import { useWalletStore } from '@/stores/wallets.store'

export const useTransactionStore = defineStore('transaction', () => {
  const loading = ref(true)
  const transactions = getTransactionsData()

  const categoryStore = useCategoryStore()
  const walletStore = useWalletStore()

  const mapTransaction = (transaction) => {
    const category = categoryStore.getCategoryById(transaction.category_id)
    const wallet = walletStore.getWalletById(transaction.account_id)

    return {
      id: transaction.id,
      type: transaction.type,
      category_id: transaction.category_id,
      account_id: transaction.account_id,
      category: { ...category },
      account: { ...wallet },
      amount: transaction.amount,
      note: transaction.note,
      date: transaction.date,
    }
  }

  const getTransactions = ({ month, type, page, limit } = {}) => {
    let filteredTransactions = transactions

    // Filter by month if provided
    if (month) {
      filteredTransactions = filteredTransactions.filter((transaction) =>
        transaction.date.startsWith(month),
      )
    }

    // Filter by type if provided
    if (type) {
      filteredTransactions = filteredTransactions.filter((transaction) => transaction.type === type)
    }

    const total = filteredTransactions.length

    // If page or limit are not specified, return all data
    if (page && limit) {
      const startIndex = (page - 1) * limit
      const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + limit)
      const mappedTransactions = paginatedTransactions.map(mapTransaction)

      return Promise.resolve({
        total,
        page,
        limit,
        response: mappedTransactions,
      })
    }

    // If no pagination parameters are provided, return all transactions
    const mappedTransactions = filteredTransactions.map(mapTransaction)

    return Promise.resolve({
      total,
      page: 1, // Default page if not specified
      limit: total, // Limit is the total length if no limit specified
      response: mappedTransactions,
    })
  }

  return { loading, getTransactions, mapTransaction }
})
