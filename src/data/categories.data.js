export const getCategoriesData = () => {
  return [
    {
      id: 1,
      name: 'transfer',
      head: 'misceleneous',
      appearance: {
        color: 'gray',
      },
    },
    {
      id: 2,
      name: 'misceleneous',
      head: 'misceleneous',
      appearance: {
        color: 'gray',
      },
    },
    {
      id: 3,
      name: 'Clothes',
      head: 'misceleneous',
      appearance: {
        color: 'gray',
      },
    },
    {
      id: 4,
      name: 'Food',
      head: 'food & drinks',
      appearance: {
        color: 'blue',
      },
    },
    {
      id: 5,
      name: 'Drinks',
      head: 'food & drinks',
      appearance: {
        color: 'blue',
      },
    },
    {
      id: 6,
      name: 'Groceries',
      head: 'food & drinks',
      appearance: {
        color: 'blue',
      },
    },
    {
      id: 7,
      name: 'Restaurants',
      head: 'food & drinks',
      appearance: {
        color: 'blue',
      },
    },
    {
      id: 8,
      name: 'Coffee',
      head: 'food & drinks',
      appearance: {
        color: 'blue',
      },
    },
    {
      id: 9,
      name: 'Bills',
      head: 'housing',
      appearance: {
        color: 'orange',
      },
    },
    {
      id: 10,
      name: 'Rent',
      head: 'housing',
      appearance: {
        color: 'orange',
      },
    },
    {
      id: 11,
      name: 'Mortgage',
      head: 'housing',
      appearance: {
        color: 'orange',
      },
    },
    {
      id: 12,
      name: 'Utilities',
      head: 'housing',
      appearance: {
        color: 'orange',
      },
    },
    {
      id: 13,
      name: 'Gas',
      head: 'transportation',
      appearance: {
        color: 'green',
      },
    },
    {
      id: 14,
      name: 'Public Transport',
      head: 'transportation',
      appearance: {
        color: 'green',
      },
    },
    {
      id: 15,
      name: 'Car Maintenance',
      head: 'transportation',
      appearance: {
        color: 'green',
      },
    },
    {
      id: 16,
      name: 'Car Insurance',
      head: 'transportation',
      appearance: {
        color: 'green',
      },
    },
    {
      id: 17,
      name: 'Car Payment',
      head: 'transportation',
      appearance: {
        color: 'green',
      },
    },
    {
      id: 18,
      name: 'Gasoline',
      head: 'transportation',
      appearance: {
        color: 'green',
      },
    },
    {
      id: 19,
      name: 'Entertainment',
      head: 'entertainment',
      appearance: {
        color: 'purple',
      },
    },
    {
      id: 20,
      name: 'Movies',
      head: 'entertainment',
      appearance: {
        color: 'purple',
      },
    },
    {
      id: 21,
      name: 'Concerts',
      head: 'entertainment',
      appearance: {
        color: 'purple',
      },
    },
    {
      id: 22,
      name: 'Subscriptions',
      head: 'entertainment',
      appearance: {
        color: 'purple',
      },
    },
    {
      id: 23,
      name: 'Streaming Services',
      head: 'entertainment',
      appearance: {
        color: 'purple',
      },
    },
    {
      id: 24,
      name: 'Hobbies',
      head: 'entertainment',
      appearance: {
        color: 'purple',
      },
    },
    {
      id: 25,
      name: 'Health & Fitness',
      head: 'health & fitness',
      appearance: {
        color: 'red',
      },
    },
    {
      id: 26,
      name: 'Gym Memberships',
      head: 'health & fitness',
      appearance: {
        color: 'red',
      },
    },
    {
      id: 27,
      name: 'Medical Bills',
      head: 'health & fitness',
      appearance: {
        color: 'red',
      },
    },
    {
      id: 28,
      name: 'Health Insurance',
      head: 'health & fitness',
      appearance: {
        color: 'red',
      },
    },
    {
      id: 29,
      name: 'Medications',
      head: 'health & fitness',
      appearance: {
        color: 'red',
      },
    },
    {
      id: 30,
      name: 'Savings',
      head: 'savings',
      appearance: {
        color: 'yellow',
      },
    },
    {
      id: 31,
      name: 'Investments',
      head: 'savings',
      appearance: {
        color: 'yellow',
      },
    },
    {
      id: 32,
      name: 'Emergency Fund',
      head: 'savings',
      appearance: {
        color: 'yellow',
      },
    },
    {
      id: 33,
      name: 'Retirement Fund',
      head: 'savings',
      appearance: {
        color: 'yellow',
      },
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
  return categories.filter((category) => category.appearance.color === color)
}
export const getCategoriesById = (ids) => {
  return categories.filter((category) => ids.includes(category.id))
}
