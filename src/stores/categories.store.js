import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getCategoriesData } from '@/data/categories.data'

export const useCategoryStore = defineStore('category', () => {
  const loading = ref(true)
  const categories = getCategoriesData()

  const getCategories = ({ head, name } = {}) => {
    let filteredCategories = categories

    if (head) {
      filteredCategories = filteredCategories.find((category) => category.head === head)
    }

    if (name) {
      filteredCategories = filteredCategories.filter((category) => category.name === name)
    }

    const total = filteredCategories.length

    return Promise.resolve({
      total,
      response: filteredCategories,
    })
  }

  const getCategoryById = (id) => {
    return categories.find((category) => category.id === id)
  }

  return { loading, getCategories, getCategoryById }
})
