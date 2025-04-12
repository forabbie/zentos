export const getCategoriesData = () => {
  return [
    {
      id: 1,
      name: 'transfer',
      head: 'misceleneous',
      color: '#64748b',
    },
    {
      id: 2,
      name: 'misceleneous',
      head: 'misceleneous',
      color: '#64748b',
    },
    {
      id: 3,
      name: 'Clothes',
      head: 'misceleneous',
      color: '#64748b',
    },
    {
      id: 4,
      name: 'Food',
      head: 'food & drinks',
      color: '#0ea5e9',
    },
    {
      id: 5,
      name: 'Drinks',
      head: 'food & drinks',
      color: '#0ea5e9',
    },
    {
      id: 6,
      name: 'Groceries',
      head: 'food & drinks',
      color: '#0ea5e9',
    },
    {
      id: 7,
      name: 'Restaurants',
      head: 'food & drinks',
      color: '#0ea5e9',
    },
    {
      id: 8,
      name: 'Coffee',
      head: 'food & drinks',
      color: '#0ea5e9',
    },
    {
      id: 9,
      name: 'Bills',
      head: 'housing',
      color: '#f97316',
    },
    {
      id: 10,
      name: 'Rent',
      head: 'housing',
      color: '#f97316',
    },
    {
      id: 11,
      name: 'Mortgage',
      head: 'housing',
      color: '#f97316',
    },
    {
      id: 12,
      name: 'Utilities',
      head: 'housing',
      color: '#f97316',
    },
    {
      id: 13,
      name: 'Gas',
      head: 'transportation',
      color: '#22c55e',
    },
    {
      id: 14,
      name: 'Public Transport',
      head: 'transportation',
      color: '#22c55e',
    },
    {
      id: 15,
      name: 'Car Maintenance',
      head: 'transportation',
      color: '#22c55e',
    },
    {
      id: 16,
      name: 'Car Insurance',
      head: 'transportation',
      color: '#22c55e',
    },
    {
      id: 17,
      name: 'Car Payment',
      head: 'transportation',
      color: '#22c55e',
    },
    {
      id: 18,
      name: 'Gasoline',
      head: 'transportation',
      color: '#22c55e',
    },
    {
      id: 19,
      name: 'Entertainment',
      head: 'entertainment',
      color: '#a855f7',
    },
    {
      id: 20,
      name: 'Movies',
      head: 'entertainment',
      color: '#a855f7',
    },
    {
      id: 21,
      name: 'Concerts',
      head: 'entertainment',
      color: '#a855f7',
    },
    {
      id: 22,
      name: 'Subscriptions',
      head: 'entertainment',
      color: '#a855f7',
    },
    {
      id: 23,
      name: 'Streaming Services',
      head: 'entertainment',
      color: '#a855f7',
    },
    {
      id: 24,
      name: 'Hobbies',
      head: 'entertainment',
      color: '#a855f7',
    },
    {
      id: 25,
      name: 'Health & Fitness',
      head: 'health & fitness',
      color: '#ef4444',
    },
    {
      id: 26,
      name: 'Gym Memberships',
      head: 'health & fitness',
      color: '#ef4444',
    },
    {
      id: 27,
      name: 'Medical Bills',
      head: 'health & fitness',
      color: '#ef4444',
    },
    {
      id: 28,
      name: 'Health Insurance',
      head: 'health & fitness',
      color: '#ef4444',
    },
    {
      id: 29,
      name: 'Medications',
      head: 'health & fitness',
      color: '#ef4444',
    },
    {
      id: 30,
      name: 'Savings',
      head: 'savings',
      color: '#f59e0b',
    },
    {
      id: 31,
      name: 'Investments',
      head: 'savings',
      color: '#f59e0b',
    },
    {
      id: 32,
      name: 'Emergency Fund',
      head: 'savings',
      color: '#f59e0b',
    },
    {
      id: 33,
      name: 'Retirement Fund',
      head: 'savings',
      color: '#f59e0b',
    },
    {
      id: 34,
      name: 'Others',
      head: 'misceleneous',
      color: '#64748b',
    },
  ]
}

export const getCategoryById = (id) => {
  return getCategoriesData().find((category) => category.id === id)
}
export const getCategoriesByHead = (head) => {
  return categories.filter((category) => category.head === head)
}
export const getCategoryByName = (name) => {
  return categories.find((category) => category.name === name)
}
export const getCategoriesByAppearance = (color) => {
  return categories.filter((category) => category.color === color)
}
export const getCategoriesById = (ids) => {
  return categories.filter((category) => ids.includes(category.id))
}
