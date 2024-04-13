import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Recipe } from '~/server/api/recipe'

export const useRecipeStore = defineStore('recipes', () => {
  const recipes = ref<Recipe[]>([])

  const fetchRecipes = async () => {
    const data = await $fetch<Recipe>('/api/recipe/1')

    if (!data) {
      console.warn('Failed to fetch recipes')
      return
    }

    console.log('Fetched recipes:', data)
    recipes.value = [data]
  }

  fetchRecipes()

  return { recipes, fetchRecipes }
})
