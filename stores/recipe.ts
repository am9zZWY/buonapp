import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Recipe } from '~/types/recipe'

export const useRecipeStore = defineStore('recipes', () => {
  const recipeList = ref<Recipe[]>()
  const recipeMap = ref<Record<string, Recipe>>()

  const fetchRecipes = async () => {
    const data = await $fetch<Recipe[]>('/api/recipe/1')

    if (!data) {
      console.warn('Failed to fetch recipes')
      return
    }

    console.log('Fetched recipes:', data)
    recipeList.value = data
    recipeMap.value = data.reduce((acc, recipe) => {
      acc[recipe.id] = recipe
      return acc
    }, {} as Record<string, Recipe>)
  }

  fetchRecipes()

  return { recipes: recipeList, recipeMap }
})
