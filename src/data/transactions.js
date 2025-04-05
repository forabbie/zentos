const transactions = [
  {
    id: 1,
    typeof: 'expense',
    category_id: 6,
    account_id: 1,
    amount: 1500,
    note: 'Weekly grocery shopping',
    date: '2025-01-04:00:00',
  },
  {
    id: 2,
    typeof: 'expense',
    category_id: 7,
    account_id: 1,
    amount: 2000,
    note: 'Dinner at a restaurant',
    date: '2025-01-02:00:00',
  },
  {
    id: 3,
    typeof: 'expense',
    category_id: 8,
    account_id: 1,
    amount: 500,
    note: 'Coffee with friends',
    date: '2025-02-03:00:00',
  },
  {
    id: 4,
    typeof: 'expense',
    category_id: 9,
    account_id: 2,
    amount: 3000,
    note: 'Electricity bill payment',
    date: '2025-03-04:00:00',
  },
  {
    id: 5,
    typeof: 'expense',
    category_id: 10,
    account_id: 2,
    amount: 8000,
    note: 'Rent payment for October',
    date: '2025-03-05:00:00',
  },
  {
    id: 6,
    typeof: 'expense',
    category_id: 11,
    account_id: 2,
    amount: 2000,
    note: 'Internet bill payment',
    date: '2025-04-06:00:00',
  },
  {
    id: 7,
    typeof: 'expense',
    category_id: 12,
    account_id: 3,
    amount: 1000,
    note: 'Clothes shopping',
    date: '2025-04-07:00:00',
  },
  {
    id: 8,
    typeof: 'expense',
    category_id: 13,
    account_id: 3,
    amount: 500,
    note: 'Miscellaneous expenses',
    date: '2025-04-08:00:00',
  },
  {
    id: 9,
    typeof: 'income',
    category_id: 14,
    account_id: 1,
    amount: 2000,
    note: 'Salary for October',
    date: '2025-04-09:00:00',
  },
  {
    id: 10,
    typeof: 'income',
    category_id: 15,
    account_id: 2,
    amount: 5000,
    note: 'Freelance project payment',
    date: '2025-04-10:00:00',
  },
  {
    id: 11,
    typeof: 'income',
    category_id: 16,
    account_id: 3,
    amount: 3000,
    note: 'Investment income',
    date: '2025-04-11:00:00',
  },
  {
    id: 12,
    typeof: 'income',
    category_id: 17,
    account_id: 1,
    amount: 1500,
    note: 'Gift from a friend',
    date: '2025-04-12:00:00',
  },
  {
    id: 13,
    typeof: 'income',
    category_id: 18,
    account_id: 2,
    amount: 2500,
    note: 'Bonus from work',
    date: '2025-04-13:00:00',
  },
  {
    id: 14,
    typeof: 'income',
    category_id: 19,
    account_id: 3,
    amount: 3500,
    note: 'Rental income',
    date: '2025-04-14:00:00',
  },
  {
    id: 15,
    typeof: 'income',
    category_id: 20,
    account_id: 1,
    amount: 4000,
    note: 'Sale of old furniture',
    date: '2025-04-15:00:00',
  },
  {
    id: 16,
    typeof: 'income',
    category_id: 21,
    account_id: 2,
    amount: 6000,
    note: 'Stock dividends',
    date: '2025-04-16:00:00',
  },
  {
    id: 17,
    typeof: 'income',
    category_id: 22,
    account_id: 3,
    amount: 7000,
    note: 'Interest from savings account',
    date: '2025-04-17:00:00',
  },
  {
    id: 18,
    typeof: 'income',
    category_id: 23,
    account_id: 1,
    amount: 8000,
    note: 'Side business income',
    date: '2025-04-18:00:00',
  },
  {
    id: 19,
    typeof: 'income',
    category_id: 24,
    account_id: 2,
    amount: 9000,
    note: 'Affiliate marketing income',
    date: '2025-04-19:00:00',
  },
  {
    id: 20,
    typeof: 'expense',
    category_id: 25,
    account_id: 3,
    amount: 10000,
    note: 'Online course sales',
    date: '2025-04-20:00:00',
  },
  {
    id: 21,
    typeof: 'income',
    category_id: 26,
    account_id: 1,
    amount: 11000,
    note: 'Consulting fees',
    date: '2025-04-21:00:00',
  },
  {
    id: 22,
    typeof: 'expense',
    category_id: 27,
    account_id: 2,
    amount: 12000,
    note: 'E-book sales',
    date: '2025-04-22:00:00',
  },
  {
    id: 23,
    typeof: 'income',
    category_id: 28,
    account_id: 3,
    amount: 13000,
    note: 'Web development project payment',
    date: '2025-04-23:00:00',
  },
  {
    id: 24,
    typeof: 'expense',
    category_id: 12,
    account_id: 3,
    amount: 1000,
    note: 'Clothes shopping',
    date: '2025-04-08:00:00',
  },
]

import { getCategoryById } from '@/data/categories'
import { getWalletById } from '@/data/wallets'

function mapTransaction(transaction) {
  const category = getCategoryById(transaction.category_id)
  const wallet = getWalletById(transaction.account_id)

  return {
    transaction_id: transaction.id,
    type: transaction.typeof,
    category: { ...category },
    account: { ...wallet },
    amount: transaction.amount,
    note: transaction.note,
    date: transaction.date,
  }
}

export function getTransactions({ month, type, page = 1, limit = 5 } = {}) {
  let filteredTransactions = transactions

  // Filter by month if provided
  if (month) {
    filteredTransactions = filteredTransactions.filter((transaction) =>
      transaction.date.startsWith(month),
    )
  }

  // Filter by type if provided
  if (type) {
    filteredTransactions = filteredTransactions.filter((transaction) => transaction.typeof === type)
  }

  const total = filteredTransactions.length
  const startIndex = (page - 1) * limit
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + limit)
  const mappedTransactions = paginatedTransactions.map(mapTransaction)

  return {
    total,
    page,
    limit,
    response: mappedTransactions,
  }
}
