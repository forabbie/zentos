export const getWalletsData = () => {
  return [
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
        color: 'red',
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
        color: 'green',
        icon: 'piggy-bank',
      },
    },
  ]
}

export const getWallets = ({ type } = {}) => {
  let filteredWallets = getWalletsData()

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
  return getWalletsData().find((wallet) => wallet.id === id)
}
