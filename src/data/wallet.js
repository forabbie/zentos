const wallets = [
  {
    id: 1,
    name: 'Cash on Hand',
    type: 'spending',
    balance: 1000,
    currency: 'PHP',
    appearance: {
      color: 'blue',
      icon: 'wallet',
    },
  },
  {
    id: 2,
    name: 'Bank Account',
    type: 'spending',
    balance: 5000,
    currency: 'PHP',
    appearance: {
      color: 'green',
      icon: 'credit-card',
    },
  },
  {
    id: 3,
    name: 'Savings Account',
    type: 'savings',
    balance: 20000,
    currency: 'PHP',
    appearance: {
      color: 'orange',
      icon: 'piggy-bank',
    },
  },
]

export const getWallets = ({ type } = {}) => {
  let filteredWallets = wallets

  // Filter by type if provided
  if (type) {
    filteredWallets = filteredWallets.filter((wallet) => wallet.type === type)
  }

  const total = filteredWallets.reduce((acc, wallet) => acc + wallet.balance, 0)

  return {
    total,
    response: filteredWallets,
  }
}

export const getWalletById = (id) => {
  return wallets.find((wallet) => wallet.id === id)
}

// export const getWalletByName = (name) => {
//   return wallets.find((wallet) => wallet.name === name)
// }

// export const getWalletByType = (type) => {
//   return wallets.filter((wallet) => wallet.type === type)
// }
