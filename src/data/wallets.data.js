export const getWalletsData = () => {
  return [
    {
      id: 1,
      name: 'Cash on Hand',
      type: 'spending',
      balance: 0,
      currency: 'PHP',
      appearance: {
        color: 'blue',
        icon: 'wallet',
      },
    },
    {
      id: 2,
      name: 'Cash on Bank',
      type: 'savings',
      balance: 0,
      currency: 'PHP',
      appearance: {
        color: 'green',
        icon: 'piggy-bank',
      },
    },
  ]
  /* [
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
  ] */
}
